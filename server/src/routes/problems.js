
import { Router } from 'express';
import { query } from '../db.js';
import { HttpError } from '../errors.js';

const router = Router();

// GET /api/problems
// Fetch all problems with optional filters
router.get('/', async (req, res, next) => {
  try {
    const { difficulty, topic, search } = req.query;

    const conditions = ['is_premium = FALSE'];
    const params = [];

    if (difficulty && difficulty !== 'All') {
      params.push(difficulty);
      conditions.push(`difficulty = $${params.length}`);
    }

    if (topic && topic !== 'All') {
      params.push(topic);
      conditions.push(`topic = $${params.length}`);
    }

    if (search && search.trim()) {
      params.push(`%${search.trim()}%`);
      conditions.push(
        `(title ILIKE $${params.length} OR topic ILIKE $${params.length})`
      );
    }

    const sql = `
      SELECT
        id,
        slug,
        title,
        difficulty,
        topic,
        description,
        input_format AS "inputFormat",
        output_format AS "outputFormat",
        examples,
        constraints,
        hints,
        time_limit_ms AS "timeLimitMs",
        memory_limit_mb AS "memoryLimitMb"
      FROM problems
      WHERE ${conditions.join(' AND ')}
      ORDER BY created_at DESC
    `;

    const result = await query(sql, params);

    const problems = result.rows.map((problem) => ({
      ...problem,
      timeLimit: `${problem.timeLimitMs} ms`,
      memoryLimit: `${problem.memoryLimitMb} MB`,
    }));

    res.json(problems);
  } catch (err) {
    next(err);
  }
});

// GET /api/problems/:idOrSlug
// Fetch one problem with starter code and test cases
router.get('/:idOrSlug', async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;

    const result = await query(
      `SELECT
        id,
        slug,
        title,
        difficulty,
        topic,
        description,
        input_format AS "inputFormat",
        output_format AS "outputFormat",
        examples,
        constraints,
        hints,
        time_limit_ms AS "timeLimitMs",
        memory_limit_mb AS "memoryLimitMb"
       FROM problems
       WHERE (id = $1 OR slug = $1)
         AND is_premium = FALSE
       LIMIT 1`,
      [idOrSlug]
    );

    if (result.rows.length === 0) {
      throw new HttpError(404, 'Problem not found');
    }

    const problem = result.rows[0];

    const starterResult = await query(
      `SELECT language, code
       FROM problem_starter_code
       WHERE problem_id = $1`,
      [problem.id]
    );

    const testResult = await query(
      `SELECT
        id,
        display_input AS input,
        expected AS "expectedOutput",
        is_hidden AS "isHidden",
        explanation
       FROM test_cases
       WHERE problem_id = $1
       ORDER BY sort_order ASC`,
      [problem.id]
    );

    const starterCode = {};
    for (const item of starterResult.rows) {
      starterCode[item.language] = item.code;
    }
    const testCases = testResult.rows.map((test) => ({
  ...test,
  expectedOutput:
    typeof test.expectedOutput === 'string'
      ? test.expectedOutput
      : JSON.stringify(test.expectedOutput),
}));

    res.json({
      ...problem,
      timeLimit: `${problem.timeLimitMs} ms`,
      memoryLimit: `${problem.memoryLimitMb} MB`,
      starterCode,
      testCases,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
