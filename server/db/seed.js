import { MOCK_PROBLEMS } from '../../client/src/services/mockData.js';
import { pool, withTransaction } from '../src/db.js';

function splitArguments(input) {
  const parts = [];
  let start = 0;
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === '\\' && quote) {
      escaped = true;
      continue;
    }

    if (quote) {
      if (char === quote) quote = null;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
    } else if ('[({'.includes(char)) {
      depth++;
    } else if (']})'.includes(char)) {
      depth--;
    } else if (char === ',' && depth === 0) {
      parts.push(input.slice(start, i).trim());
      start = i + 1;
    }
  }

  parts.push(input.slice(start).trim());
  return parts;
}

function parseInput(input) {
  return splitArguments(input).map((part) => {
    const equalsIndex = part.indexOf('=');
    const value = equalsIndex >= 0
      ? part.slice(equalsIndex + 1).trim()
      : part;

    return JSON.parse(value);
  });
}

try {
  let totalTests = 0;
  let totalStarterCodes = 0;

  await withTransaction(async (client) => {
    for (const problem of MOCK_PROBLEMS) {
      await client.query(
        `INSERT INTO problems (
          id, slug, title, difficulty, topic, description,
          input_format, output_format, examples, constraints,
          hints, is_premium, time_limit_ms, memory_limit_mb
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, FALSE, $12, $13
        )
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          difficulty = EXCLUDED.difficulty,
          topic = EXCLUDED.topic,
          description = EXCLUDED.description,
          input_format = EXCLUDED.input_format,
          output_format = EXCLUDED.output_format,
          examples = EXCLUDED.examples,
          constraints = EXCLUDED.constraints,
          hints = EXCLUDED.hints,
          time_limit_ms = EXCLUDED.time_limit_ms,
          memory_limit_mb = EXCLUDED.memory_limit_mb`,
        [
          problem.id,
          problem.slug,
          problem.title,
          problem.difficulty,
          problem.topic,
          problem.description,
          problem.inputFormat,
          problem.outputFormat,
          JSON.stringify(problem.examples),
          JSON.stringify(problem.constraints),
          JSON.stringify(problem.hints),
          parseInt(problem.timeLimit, 10),
          parseInt(problem.memoryLimit, 10),
        ]
      );

      for (const [language, code] of Object.entries(problem.starterCode)) {
        await client.query(
          `INSERT INTO problem_starter_code (problem_id, language, code)
           VALUES ($1, $2, $3)
           ON CONFLICT (problem_id, language)
           DO UPDATE SET code = EXCLUDED.code`,
          [problem.id, language, code]
        );
        totalStarterCodes++;
      }

      await client.query(
        'DELETE FROM test_cases WHERE problem_id = $1',
        [problem.id]
      );

      for (let i = 0; i < problem.testCases.length; i++) {
        const test = problem.testCases[i];
        const inputArgs = parseInput(test.input);

        await client.query(
          `INSERT INTO test_cases (
            problem_id, sort_order, display_input,
            input_args, expected, is_hidden, explanation
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            problem.id,
            i + 1,
            test.input,
            JSON.stringify(inputArgs),
            JSON.stringify(test.expectedOutput),
            test.isHidden,
            test.explanation || null,
          ]
        );

        totalTests++;
      }
    }
  });

  console.log('Seed successful!');
  console.log('Problems:', MOCK_PROBLEMS.length);
  console.log('Starter codes:', totalStarterCodes);
  console.log('Test cases:', totalTests);
} catch (error) {
  console.error('Seed failed:', error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
