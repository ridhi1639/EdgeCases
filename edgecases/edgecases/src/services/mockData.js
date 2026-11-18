// Edge Cases — Mock Data Service for DSA Problems, Leaderboards, and Battles

export const INITIAL_USER = {
  id: 'usr_devkiran',
  fullName: 'Kiran Patel',
  username: 'dev_kiran',
  email: 'kiran@edgecases.dev',
  rating: 1840,
  ratingChange: '+24',
  tier: 'Specialist',
  battlesCount: 50,
  wins: 38,
  losses: 12,
  draws: 0,
  winRate: '76.0%',
  streak: 20,
  virtualCoins: 420,
  preferredLanguage: 'python',
  editorPreferences: {
    theme: 'vs-dark',
    fontSize: 14,
    tabSize: 4,
    keybindings: 'standard',
    minimap: false,
  },
  solvedProblemIds: ['longest-unique-substring', 'two-sum-sorted', 'valid-parentheses'],
};

export const MOCK_PROBLEMS = [
  {
    id: 'longest-unique-substring',
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    acceptanceRate: '34.2%',
    timeLimit: '1000 ms',
    memoryLimit: '256 MB',
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.

A substring is a contiguous non-empty sequence of characters within a string. Your algorithm must handle extreme edge cases such as empty strings, single repeated characters, and strings containing ASCII symbols and whitespaces.`,
    inputFormat: 'A single string s consisting of English letters, digits, symbols, and spaces.',
    outputFormat: 'Return an integer representing the maximum length of a non-repeating substring.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence, not a substring.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    hints: [
      'Think about using a sliding window with two pointers (left and right).',
      'Store the last seen index of each character in a hash map to skip repeated characters in O(1) time.'
    ],
    starterCode: {
      python: `def lengthOfLongestSubstring(s: str) -> int:
    # Write your solution here
    char_index = {}
    max_len = 0
    left = 0
    
    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1
        char_index[char] = right
        max_len = max(max_len, right - left + 1)
        
    return max_len
`,
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (seen.has(char) && seen.get(char) >= left) {
      left = seen.get(char) + 1;
    }
    seen.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
`,
      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> seen;
        int maxLen = 0;
        int left = 0;
        for (int right = 0; right < s.length(); right++) {
            if (seen.count(s[right]) && seen[s[right]] >= left) {
                left = seen[s[right]] + 1;
            }
            seen[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
`,
      java: `import java.util.HashMap;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> seen = new HashMap<>();
        int maxLen = 0;
        int left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (seen.containsKey(c) && seen.get(c) >= left) {
                left = seen.get(c) + 1;
            }
            seen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
`
    },
    testCases: [
      { id: '1', input: '"abcabcbb"', expectedOutput: '3', isHidden: false, explanation: 'Standard mixed repeating characters' },
      { id: '2', input: '"bbbbb"', expectedOutput: '1', isHidden: false, explanation: 'All identical characters' },
      { id: '3', input: '"pwwkew"', expectedOutput: '3', isHidden: false, explanation: 'Duplication in middle of substring' },
      { id: '4', input: '""', expectedOutput: '0', isHidden: true, explanation: 'Empty string edge case' },
      { id: '5', input: '" "', expectedOutput: '1', isHidden: true, explanation: 'Single whitespace edge case' },
      { id: '6', input: '"abcdefghijklmnopqrstuvwxyz"', expectedOutput: '26', isHidden: true, explanation: 'Completely unique stream' }
    ]
  },
  {
    id: 'two-sum-sorted',
    slug: 'two-sum-ii-input-array-is-sorted',
    title: 'Two Sum II — Input Array Is Sorted',
    difficulty: 'Easy',
    topic: 'Two Pointers',
    acceptanceRate: '61.4%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `Given a 1-indexed array of integers \`numbers\` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific \`target\` number.

Return the indices of the two numbers, \`index1\` and \`index2\`, added by one as an integer array \`[index1, index2]\` of length 2. The tests are generated such that there is exactly one solution. You may not use the same element twice. Your solution must use only constant extra space.`,
    inputFormat: 'An array of integers numbers and an integer target.',
    outputFormat: 'Return an array of two 1-based indices [index1, index2].',
    examples: [
      {
        input: 'numbers = [2,7,11,15], target = 9',
        output: '[1,2]',
        explanation: 'The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.'
      },
      {
        input: 'numbers = [2,3,4], target = 6',
        output: '[1,3]',
        explanation: 'The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3.'
      }
    ],
    constraints: [
      '2 <= numbers.length <= 3 * 10^4',
      '-1000 <= numbers[i] <= 1000',
      'numbers is sorted in non-decreasing order.',
      '-1000 <= target <= 1000',
      'The tests are generated such that there is exactly one solution.'
    ],
    hints: [
      'Since the array is already sorted, can we use two pointers starting at the extremes?'
    ],
    starterCode: {
      python: `from typing import List

def twoSum(numbers: List[int], target: int) -> List[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
        curr_sum = numbers[left] + numbers[right]
        if curr_sum == target:
            return [left + 1, right + 1]
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return []
`,
      javascript: `/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [];
}
`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0, right = numbers.size() - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return {left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        return {};
    }
};
`,
      java: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1};
            if (sum < target) left++;
            else right--;
        }
        return new int[]{};
    }
}
`
    },
    testCases: [
      { id: '1', input: 'numbers = [2,7,11,15], target = 9', expectedOutput: '[1,2]', isHidden: false },
      { id: '2', input: 'numbers = [2,3,4], target = 6', expectedOutput: '[1,3]', isHidden: false },
      { id: '3', input: 'numbers = [-1,0], target = -1', expectedOutput: '[1,2]', isHidden: false },
      { id: '4', input: 'numbers = [-1000, 1000], target = 0', expectedOutput: '[1,2]', isHidden: true }
    ]
  },
  {
    id: 'trapping-rain-water',
    slug: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    topic: 'Two Pointers',
    acceptanceRate: '59.8%',
    timeLimit: '1500 ms',
    memoryLimit: '256 MB',
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    inputFormat: 'An array of non-negative integers height.',
    outputFormat: 'Return an integer representing total units of trapped rain water.',
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.'
      },
      {
        input: 'height = [4,2,0,3,2,5]',
        output: '9',
        explanation: 'Water trapped between 4 and 5 is 9 units total.'
      }
    ],
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    hints: [
      'For each element, how much water can be stored above it? It depends on the minimum of max-height to its left and max-height to its right.'
    ],
    starterCode: {
      python: `from typing import List

def trap(height: List[int]) -> int:
    if not height:
        return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water
`,
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
  if (!height.length) return 0;
  let left = 0, right = height.length - 1;
  let leftMax = height[left], rightMax = height[right];
  let water = 0;
  while (left < right) {
    if (leftMax < rightMax) {
      left++;
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
    } else {
      right--;
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
    }
  }
  return water;
}
`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        if (height.empty()) return 0;
        int left = 0, right = height.size() - 1;
        int leftMax = height[left], rightMax = height[right];
        int water = 0;
        while (left < right) {
            if (leftMax < rightMax) {
                left++;
                leftMax = max(leftMax, height[left]);
                water += leftMax - height[left];
            } else {
                right--;
                rightMax = max(rightMax, height[right]);
                water += rightMax - height[right];
            }
        }
        return water;
    }
};
`,
      java: `class Solution {
    public int trap(int[] height) {
        if (height.length == 0) return 0;
        int left = 0, right = height.length - 1;
        int leftMax = height[left], rightMax = height[right];
        int water = 0;
        while (left < right) {
            if (leftMax < rightMax) {
                left++;
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
            } else {
                right--;
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
            }
        }
        return water;
    }
}
`
    },
    testCases: [
      { id: '1', input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6', isHidden: false },
      { id: '2', input: 'height = [4,2,0,3,2,5]', expectedOutput: '9', isHidden: false },
      { id: '3', input: 'height = [1,2,3,4,5]', expectedOutput: '0', isHidden: true, explanation: 'Strictly increasing slope traps 0 water' },
      { id: '4', input: 'height = [5,4,3,2,1]', expectedOutput: '0', isHidden: true, explanation: 'Strictly decreasing slope traps 0 water' }
    ]
  },
  {
    id: 'median-two-sorted-arrays',
    slug: 'median-of-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    topic: 'Binary Search',
    acceptanceRate: '38.1%',
    timeLimit: '2000 ms',
    memoryLimit: '256 MB',
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.`,
    inputFormat: 'Two integer arrays nums1 and nums2.',
    outputFormat: 'Return a float representing the median value.',
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.'
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
      }
    ],
    constraints: [
      'nums1.length == m, nums2.length == n',
      '0 <= m <= 1000, 0 <= n <= 1000',
      '1 <= m + n <= 2000',
      '-10^6 <= nums1[i], nums2[i] <= 10^6'
    ],
    hints: [
      'Binary search on the smaller array to partition both arrays into two halves.'
    ],
    starterCode: {
      python: `from typing import List

def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:
    # Binary search partitioning
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    left, right = 0, m
    while left <= right:
        i = (left + right) // 2
        j = (m + n + 1) // 2 - i
        max_left_1 = float('-inf') if i == 0 else nums1[i - 1]
        min_right_1 = float('inf') if i == m else nums1[i]
        max_left_2 = float('-inf') if j == 0 else nums2[j - 1]
        min_right_2 = float('inf') if j == n else nums2[j]
        if max_left_1 <= min_right_2 and max_left_2 <= min_right_1:
            if (m + n) % 2 == 1:
                return float(max(max_left_1, max_left_2))
            return (max(max_left_1, max_left_2) + min(min_right_1, min_right_2)) / 2.0
        elif max_left_1 > min_right_2:
            right = i - 1
        else:
            left = i + 1
    return 0.0
`,
      javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const m = nums1.length, n = nums2.length;
  let low = 0, high = m;
  while (low <= high) {
    const i = (low + high) >> 1;
    const j = Math.floor((m + n + 1) / 2) - i;
    const maxLeft1 = i === 0 ? -Infinity : nums1[i - 1];
    const minRight1 = i === m ? Infinity : nums1[i];
    const maxLeft2 = j === 0 ? -Infinity : nums2[j - 1];
    const minRight2 = j === n ? Infinity : nums2[j];

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if ((m + n) % 2 === 1) return Math.max(maxLeft1, maxLeft2);
      return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
    } else if (maxLeft1 > minRight2) {
      high = i - 1;
    } else {
      low = i + 1;
    }
  }
  return 0.0;
}
`,
      cpp: `#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.size(), n = nums2.size();
        int low = 0, high = m;
        while (low <= high) {
            int i = (low + high) / 2;
            int j = (m + n + 1) / 2 - i;
            int maxLeft1 = (i == 0) ? INT_MIN : nums1[i - 1];
            int minRight1 = (i == m) ? INT_MAX : nums1[i];
            int maxLeft2 = (j == 0) ? INT_MIN : nums2[j - 1];
            int minRight2 = (j == n) ? INT_MAX : nums2[j];

            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                if ((m + n) % 2 == 1) return max(maxLeft1, maxLeft2);
                return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0;
            } else if (maxLeft1 > minRight2) {
                high = i - 1;
            } else {
                low = i + 1;
            }
        }
        return 0.0;
    }
};
`,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.length, n = nums2.length;
        int low = 0, high = m;
        while (low <= high) {
            int i = (low + high) / 2;
            int j = (m + n + 1) / 2 - i;
            int maxLeft1 = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];
            int minRight1 = (i == m) ? Integer.MAX_VALUE : nums1[i];
            int maxLeft2 = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];
            int minRight2 = (j == n) ? Integer.MAX_VALUE : nums2[j];

            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                if ((m + n) % 2 == 1) return Math.max(maxLeft1, maxLeft2);
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;
            } else if (maxLeft1 > minRight2) {
                high = i - 1;
            } else {
                low = i + 1;
            }
        }
        return 0.0;
    }
}
`
    },
    testCases: [
      { id: '1', input: 'nums1 = [1,3], nums2 = [2]', expectedOutput: '2.00000', isHidden: false },
      { id: '2', input: 'nums1 = [1,2], nums2 = [3,4]', expectedOutput: '2.50000', isHidden: false },
      { id: '3', input: 'nums1 = [], nums2 = [1]', expectedOutput: '1.00000', isHidden: true },
      { id: '4', input: 'nums1 = [2], nums2 = []', expectedOutput: '2.00000', isHidden: true }
    ]
  },
  {
    id: 'valid-parentheses',
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Stack',
    acceptanceRate: '40.3%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by the same type of brackets and in the correct order.`,
    inputFormat: 'A string s containing bracket characters.',
    outputFormat: 'Return true if valid, false otherwise.',
    examples: [
      { input: 's = "()"', output: 'true', explanation: 'Matching simple parenthesis.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'Matching sequential bracket pairs.' },
      { input: 's = "(]"', output: 'false', explanation: 'Mismatched closing bracket.' }
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only: ()[]{}'],
    hints: ['Use a stack. Push opening brackets; pop and check match on closing.'],
    starterCode: {
      python: `def isValid(s: str) -> bool:\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top:\n                return False\n        else:\n            stack.append(char)\n    return not stack\n`,
      javascript: `function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (const c of s) {\n    if (map[c]) {\n      if (stack.pop() !== map[c]) return false;\n    } else {\n      stack.push(c);\n    }\n  }\n  return stack.length === 0;\n}\n`
    },
    testCases: [
      { id: '1', input: 's = "()"', expectedOutput: 'true', isHidden: false },
      { id: '2', input: 's = "()[]{}"', expectedOutput: 'true', isHidden: false },
      { id: '3', input: 's = "(]"', expectedOutput: 'false', isHidden: false },
      { id: '4', input: 's = "([)]"', expectedOutput: 'false', isHidden: true }
    ]
  },
  {
    id: 'reverse-linked-list',
    slug: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    topic: 'Linked List',
    acceptanceRate: '75.2%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    inputFormat: 'The head node of a singly-linked list.',
    outputFormat: 'Return the head of the reversed list.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]', explanation: 'Reversed order of elements.' },
      { input: 'head = [1,2]', output: '[2,1]', explanation: 'Two nodes reversed.' }
    ],
    constraints: ['0 <= Number of nodes <= 5000', '-5000 <= Node.val <= 5000'],
    hints: ['Iteratively redirect the next pointer to the previous node.'],
    starterCode: {
      python: `def reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev\n`,
      javascript: `function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}\n`
    },
    testCases: [
      { id: '1', input: 'head = [1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]', isHidden: false },
      { id: '2', input: 'head = []', expectedOutput: '[]', isHidden: true }
    ]
  },
  {
    id: 'container-with-most-water',
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    topic: 'Two Pointers',
    acceptanceRate: '54.5%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `Given an integer array \`height\` of length \`n\`, find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.`,
    inputFormat: 'Array of integers height.',
    outputFormat: 'Return maximum area integer.',
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'Max area between index 1 and 8: min(8, 7) * 7 = 49.' }
    ],
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    hints: ['Two pointers at start and end. Move the pointer pointing to the shorter vertical line.'],
    starterCode: {
      python: `def maxArea(height: list[int]) -> int:\n    left, right = 0, len(height) - 1\n    max_area = 0\n    while left < right:\n        area = min(height[left], height[right]) * (right - left)\n        max_area = max(max_area, area)\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    return max_area\n`,
      javascript: `function maxArea(height) {\n  let l = 0, r = height.length - 1, max = 0;\n  while (l < r) {\n    max = Math.max(max, Math.min(height[l], height[r]) * (r - l));\n    if (height[l] < height[r]) l++; else r--;\n  }\n  return max;\n}\n`
    },
    testCases: [
      { id: '1', input: 'height = [1,8,6,2,5,4,8,3,7]', expectedOutput: '49', isHidden: false },
      { id: '2', input: 'height = [1,1]', expectedOutput: '1', isHidden: false }
    ]
  },
  {
    id: 'maximum-subarray',
    slug: 'maximum-subarray',
    title: 'Maximum Subarray (Kadane’s)',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    acceptanceRate: '50.3%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    inputFormat: 'Array of integers nums.',
    outputFormat: 'Return maximum subarray sum integer.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'Subarray [4,-1,2,1] has the largest sum 6.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    hints: ['Kadane\'s algorithm: current_sum = max(num, current_sum + num).'],
    starterCode: {
      python: `def maxSubArray(nums: list[int]) -> int:\n    cur_sum = max_sum = nums[0]\n    for x in nums[1:]:\n        cur_sum = max(x, cur_sum + x)\n        max_sum = max(max_sum, cur_sum)\n    return max_sum\n`,
      javascript: `function maxSubArray(nums) {\n  let cur = nums[0], max = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    cur = Math.max(nums[i], cur + nums[i]);\n    max = Math.max(max, cur);\n  }\n  return max;\n}\n`
    },
    testCases: [
      { id: '1', input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6', isHidden: false },
      { id: '2', input: 'nums = [5,4,-1,7,8]', expectedOutput: '23', isHidden: false }
    ]
  },
  {
    id: 'three-sum',
    slug: '3sum',
    title: '3Sum',
    difficulty: 'Medium',
    topic: 'Two Pointers',
    acceptanceRate: '33.8%',
    timeLimit: '1500 ms',
    memoryLimit: '256 MB',
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.`,
    inputFormat: 'Array of integers nums.',
    outputFormat: 'Return a list of integer triplets.',
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]', explanation: 'The distinct triplets are [-1,0,1] and [-1,-1,2].' }
    ],
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    hints: ['Sort array first, iterate one element and solve 2Sum with two pointers.'],
    starterCode: {
      python: `def threeSum(nums: list[int]) -> list[list[int]]:\n    nums.sort()\n    res = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i-1]:\n            continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s < 0: l += 1\n            elif s > 0: r -= 1\n            else:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l+1]: l += 1\n                while l < r and nums[r] == nums[r-1]: r -= 1\n                l += 1; r -= 1\n    return res\n`,
      javascript: `function threeSum(nums) {\n  nums.sort((a,b)=>a-b);\n  const res = [];\n  for(let i=0; i<nums.length-2; i++){\n    if(i>0 && nums[i]===nums[i-1]) continue;\n    let l=i+1, r=nums.length-1;\n    while(l<r){\n      const sum = nums[i]+nums[l]+nums[r];\n      if(sum===0){\n        res.push([nums[i], nums[l], nums[r]]);\n        while(l<r && nums[l]===nums[l+1]) l++;\n        while(l<r && nums[r]===nums[r-1]) r--;\n        l++; r--;\n      } else if(sum<0) l++;\n      else r--;\n    }\n  }\n  return res;\n}\n`
    },
    testCases: [
      { id: '1', input: 'nums = [-1,0,1,2,-1,-4]', expectedOutput: '[[-1,-1,2],[-1,0,1]]', isHidden: false }
    ]
  },
  {
    id: 'search-rotated-sorted-array',
    slug: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    topic: 'Binary Search',
    acceptanceRate: '39.9%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`. You must write an algorithm with O(log n) runtime complexity.`,
    inputFormat: 'Rotated sorted integer array nums and integer target.',
    outputFormat: 'Return index integer or -1.',
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4', explanation: 'Target 0 exists at index 4.' }
    ],
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4'],
    hints: ['One half of the array will always be strictly sorted. Determine which half and check target.'],
    starterCode: {
      python: `def search(nums: list[int], target: int) -> int:\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target: return mid\n        if nums[low] <= nums[mid]:\n            if nums[low] <= target < nums[mid]: high = mid - 1\n            else: low = mid + 1\n        else:\n            if nums[mid] < target <= nums[high]: low = mid + 1\n            else: high = mid - 1\n    return -1\n`,
      javascript: `function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while(l <= r) {\n    const mid = Math.floor((l+r)/2);\n    if (nums[mid] === target) return mid;\n    if (nums[l] <= nums[mid]) {\n      if (nums[l] <= target && target < nums[mid]) r = mid - 1;\n      else l = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[r]) l = mid + 1;\n      else r = mid - 1;\n    }\n  }\n  return -1;\n}\n`
    },
    testCases: [
      { id: '1', input: 'nums = [4,5,6,7,0,1,2], target = 0', expectedOutput: '4', isHidden: false },
      { id: '2', input: 'nums = [4,5,6,7,0,1,2], target = 3', expectedOutput: '-1', isHidden: false }
    ]
  },
  {
    id: 'merge-two-sorted-lists',
    slug: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topic: 'Linked List',
    acceptanceRate: '63.2%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`. Merge the two lists into one sorted list. Return the head of the merged linked list.`,
    inputFormat: 'Heads of two sorted linked lists.',
    outputFormat: 'Head of merged sorted linked list.',
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]', explanation: 'Merged sequential elements.' }
    ],
    constraints: ['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100'],
    hints: ['Create a dummy node and iterate with two pointers.'],
    starterCode: {
      python: `def mergeTwoLists(list1, list2):\n    dummy = ListNode(0)\n    cur = dummy\n    while list1 and list2:\n        if list1.val < list2.val:\n            cur.next = list1\n            list1 = list1.next\n        else:\n            cur.next = list2\n            list2 = list2.next\n        cur = cur.next\n    cur.next = list1 or list2\n    return dummy.next\n`,
      javascript: `function mergeTwoLists(list1, list2) {\n  let dummy = { val: 0, next: null }, cur = dummy;\n  while(list1 && list2) {\n    if(list1.val < list2.val) { cur.next = list1; list1 = list1.next; }\n    else { cur.next = list2; list2 = list2.next; }\n    cur = cur.next;\n  }\n  cur.next = list1 || list2;\n  return dummy.next;\n}\n`
    },
    testCases: [
      { id: '1', input: 'list1 = [1,2,4], list2 = [1,3,4]', expectedOutput: '[1,1,2,3,4,4]', isHidden: false }
    ]
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    topic: 'Array',
    acceptanceRate: '54.2%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`-th day. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    inputFormat: 'Array of integer prices.',
    outputFormat: 'Return maximum profit integer.',
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' }
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    hints: ['Track minimum price seen so far and maximum difference.'],
    starterCode: {
      python: `def maxProfit(prices: list[int]) -> int:\n    min_p, max_p = float('inf'), 0\n    for p in prices:\n        if p < min_p: min_p = p\n        elif p - min_p > max_p: max_p = p - min_p\n    return max_p\n`,
      javascript: `function maxProfit(prices) {\n  let min = Infinity, max = 0;\n  for(const p of prices) {\n    if (p < min) min = p;\n    else if (p - min > max) max = p - min;\n  }\n  return max;\n}\n`
    },
    testCases: [
      { id: '1', input: 'prices = [7,1,5,3,6,4]', expectedOutput: '5', isHidden: false },
      { id: '2', input: 'prices = [7,6,4,3,1]', expectedOutput: '0', isHidden: false }
    ]
  },
  {
    id: 'invert-binary-tree',
    slug: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    topic: 'Tree',
    acceptanceRate: '76.8%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `Given the root of a binary tree, invert the tree, and return its root.`,
    inputFormat: 'Root node of a binary tree.',
    outputFormat: 'Root node of inverted binary tree.',
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]', explanation: 'Left and right children are swapped recursively.' }
    ],
    constraints: ['Number of nodes in tree is in range [0, 100]', '-100 <= Node.val <= 100'],
    hints: ['Recursively swap left and right subtrees for every node.'],
    starterCode: {
      python: `def invertTree(root):\n    if not root: return None\n    root.left, root.right = invertTree(root.right), invertTree(root.left)\n    return root\n`,
      javascript: `function invertTree(root) {\n  if(!root) return null;\n  const temp = invertTree(root.left);\n  root.left = invertTree(root.right);\n  root.right = temp;\n  return root;\n}\n`
    },
    testCases: [
      { id: '1', input: 'root = [4,2,7,1,3,6,9]', expectedOutput: '[4,7,2,9,6,3,1]', isHidden: false }
    ]
  },
  {
    id: 'lowest-common-ancestor-bst',
    slug: 'lowest-common-ancestor-of-a-binary-search-tree',
    title: 'Lowest Common Ancestor of a BST',
    difficulty: 'Medium',
    topic: 'Tree',
    acceptanceRate: '62.7%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.`,
    inputFormat: 'Root node and target nodes p and q.',
    outputFormat: 'LCA node.',
    examples: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6', explanation: 'LCA of 2 and 8 is 6.' }
    ],
    constraints: ['Number of nodes is in range [2, 10^5]', 'All Node.val are unique'],
    hints: ['Use BST property: if p and q are on opposite sides of root, root is LCA.'],
    starterCode: {
      python: `def lowestCommonAncestor(root, p, q):\n    while root:\n        if p.val < root.val and q.val < root.val: root = root.left\n        elif p.val > root.val and q.val > root.val: root = root.right\n        else: return root\n`,
      javascript: `function lowestCommonAncestor(root, p, q) {\n  while(root) {\n    if (p.val < root.val && q.val < root.val) root = root.left;\n    else if (p.val > root.val && q.val > root.val) root = root.right;\n    else return root;\n  }\n}\n`
    },
    testCases: [
      { id: '1', input: 'root = [6,2,8], p = 2, q = 8', expectedOutput: '6', isHidden: false }
    ]
  },
  {
    id: 'climbing-stairs',
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    topic: 'Dynamic Programming',
    acceptanceRate: '52.7%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    inputFormat: 'Integer n representing number of steps.',
    outputFormat: 'Integer number of distinct ways.',
    examples: [
      { input: 'n = 2', output: '2', explanation: '1. 1 step + 1 step; 2. 2 steps' },
      { input: 'n = 3', output: '3', explanation: '1+1+1, 1+2, 2+1' }
    ],
    constraints: ['1 <= n <= 45'],
    hints: ['Recognize this is Fibonacci: ways(n) = ways(n-1) + ways(n-2).'],
    starterCode: {
      python: `def climbStairs(n: int) -> int:\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b\n`,
      javascript: `function climbStairs(n) {\n  if(n <= 2) return n;\n  let a = 1, b = 2;\n  for(let i = 3; i <= n; i++) {\n    const temp = a + b;\n    a = b;\n    b = temp;\n  }\n  return b;\n}\n`
    },
    testCases: [
      { id: '1', input: 'n = 2', expectedOutput: '2', isHidden: false },
      { id: '2', input: 'n = 3', expectedOutput: '3', isHidden: false }
    ]
  },
  {
    id: 'valid-anagram',
    slug: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    topic: 'Hash Map',
    acceptanceRate: '63.9%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.`,
    inputFormat: 'Two strings s and t.',
    outputFormat: 'Boolean true or false.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Characters match in frequencies.' }
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
    hints: ['Count letter frequencies with a hash map or 26-length array.'],
    starterCode: {
      python: `def isAnagram(s: str, t: str) -> bool:\n    if len(s) != len(t): return False\n    counts = {}\n    for c in s: counts[c] = counts.get(c, 0) + 1\n    for c in t:\n        if c not in counts or counts[c] == 0: return False\n        counts[c] -= 1\n    return True\n`,
      javascript: `function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (const c of s) count[c] = (count[c] || 0) + 1;\n  for (const c of t) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}\n`
    },
    testCases: [
      { id: '1', input: 's = "anagram", t = "nagaram"', expectedOutput: 'true', isHidden: false },
      { id: '2', input: 's = "rat", t = "car"', expectedOutput: 'false', isHidden: false }
    ]
  },
  {
    id: 'product-of-array-except-self',
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    topic: 'Array',
    acceptanceRate: '65.2%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`. You must write an algorithm that runs in O(n) time and without using the division operation.`,
    inputFormat: 'Array of integers nums.',
    outputFormat: 'Array of integer products.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]', explanation: 'Product of other elements.' }
    ],
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30'],
    hints: ['Compute prefix product array and multiply with running suffix product.'],
    starterCode: {
      python: `def productExceptSelf(nums: list[int]) -> list[int]:\n    n = len(nums)\n    res = [1] * n\n    for i in range(1, n):\n        res[i] = res[i - 1] * nums[i - 1]\n    r = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= r\n        r *= nums[i]\n    return res\n`,
      javascript: `function productExceptSelf(nums) {\n  const res = new Array(nums.length).fill(1);\n  for (let i = 1; i < nums.length; i++) res[i] = res[i - 1] * nums[i - 1];\n  let r = 1;\n  for (let i = nums.length - 1; i >= 0; i--) {\n    res[i] *= r;\n    r *= nums[i];\n  }\n  return res;\n}\n`
    },
    testCases: [
      { id: '1', input: 'nums = [1,2,3,4]', expectedOutput: '[24,12,8,6]', isHidden: false },
      { id: '2', input: 'nums = [-1,1,0,-3,3]', expectedOutput: '[0,0,9,0,0]', isHidden: false }
    ]
  },
  {
    id: 'coin-change',
    slug: 'coin-change',
    title: 'Coin Change',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    acceptanceRate: '43.1%',
    timeLimit: '1500 ms',
    memoryLimit: '128 MB',
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.`,
    inputFormat: 'Array of coins and target amount.',
    outputFormat: 'Minimum count of coins or -1.',
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' }
    ],
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    hints: ['DP array of size amount + 1. dp[i] = min(dp[i], dp[i - coin] + 1).'],
    starterCode: {
      python: `def coinChange(coins: list[int], amount: int) -> int:\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for coin in coins:\n        for x in range(coin, amount + 1):\n            dp[x] = min(dp[x], dp[x - coin] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1\n`,
      javascript: `function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (const c of coins) {\n    for (let i = c; i <= amount; i++) dp[i] = Math.min(dp[i], dp[i - c] + 1);\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}\n`
    },
    testCases: [
      { id: '1', input: 'coins = [1,2,5], amount = 11', expectedOutput: '3', isHidden: false },
      { id: '2', input: 'coins = [2], amount = 3', expectedOutput: '-1', isHidden: false }
    ]
  },
  {
    id: 'group-anagrams',
    slug: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    topic: 'Hash Map',
    acceptanceRate: '67.4%',
    timeLimit: '1500 ms',
    memoryLimit: '256 MB',
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.`,
    inputFormat: 'Array of strings strs.',
    outputFormat: 'List of string groups.',
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: 'Grouped by sorted signature.' }
    ],
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100'],
    hints: ['Sort each string alphabetically to use as the hash map dictionary key.'],
    starterCode: {
      python: `from collections import defaultdict\n\ndef groupAnagrams(strs: list[str]) -> list[list[str]]:\n    ans = defaultdict(list)\n    for s in strs:\n        ans[tuple(sorted(s))].append(s)\n    return list(ans.values())\n`,
      javascript: `function groupAnagrams(strs) {\n  const map = {};\n  for (const s of strs) {\n    const k = s.split('').sort().join('');\n    if (!map[k]) map[k] = [];\n    map[k].push(s);\n  }\n  return Object.values(map);\n}\n`
    },
    testCases: [
      { id: '1', input: 'strs = ["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]', isHidden: false }
    ]
  },
  {
    id: 'binary-tree-level-order-traversal',
    slug: 'binary-tree-level-order-traversal',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    topic: 'BFS',
    acceptanceRate: '66.1%',
    timeLimit: '1000 ms',
    memoryLimit: '128 MB',
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
    inputFormat: 'Root node of binary tree.',
    outputFormat: '2D array of node values per level.',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]', explanation: 'Traversed level by level with queue.' }
    ],
    constraints: ['Number of nodes is in range [0, 2000]', '-1000 <= Node.val <= 1000'],
    hints: ['Use a queue to process level by level. In each iteration, pop queue length nodes.'],
    starterCode: {
      python: `from collections import deque\n\ndef levelOrder(root):\n    if not root: return []\n    res, q = [], deque([root])\n    while q:\n        level = []\n        for _ in range(len(q)):\n            node = q.popleft()\n            level.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n        res.append(level)\n    return res\n`,
      javascript: `function levelOrder(root) {\n  if(!root) return [];\n  const res = [], q = [root];\n  while(q.length) {\n    const len = q.length, level = [];\n    for(let i=0; i<len; i++) {\n      const n = q.shift();\n      level.push(n.val);\n      if(n.left) q.push(n.left);\n      if(n.right) q.push(n.right);\n    }\n    res.push(level);\n  }\n  return res;\n}\n`
    },
    testCases: [
      { id: '1', input: 'root = [3,9,20,null,null,15,7]', expectedOutput: '[[3],[9,20],[15,7]]', isHidden: false }
    ]
  }
];

export const MOCK_LEADERBOARD = [
  { rank: 1, username: 'bit_wizard', rating: 2480, wins: 142, losses: 18, winRate: '88.8%', avatar: 'BW', tier: 'Grandmaster' },
  { rank: 2, username: 'null_pointer', rating: 2395, wins: 118, losses: 22, winRate: '84.3%', avatar: 'NP', tier: 'Grandmaster' },
  { rank: 3, username: 'edge_hunter', rating: 2310, wins: 96, losses: 19, winRate: '83.5%', avatar: 'EH', tier: 'Master' },
  { rank: 4, username: 'dev_kiran', rating: 1840, wins: 38, losses: 12, winRate: '76.0%', avatar: 'DK', tier: 'Specialist', isCurrentUser: true },
  { rank: 5, username: 'algo_rythm', rating: 1825, wins: 44, losses: 16, winRate: '73.3%', avatar: 'AR', tier: 'Specialist' },
  { rank: 6, username: 'syntax_samurai', rating: 1790, wins: 52, losses: 24, winRate: '68.4%', avatar: 'SS', tier: 'Specialist' },
  { rank: 7, username: 'memory_leak', rating: 1650, wins: 31, losses: 19, winRate: '62.0%', avatar: 'ML', tier: 'Apprentice' },
  { rank: 8, username: 'stack_overflow', rating: 1540, wins: 25, losses: 20, winRate: '55.6%', avatar: 'SO', tier: 'Apprentice' },
  { rank: 9, username: 'zero_day', rating: 1490, wins: 19, losses: 17, winRate: '52.7%', avatar: 'ZD', tier: 'Apprentice' },
  { rank: 10, username: 'byte_storm', rating: 1420, wins: 14, losses: 16, winRate: '46.6%', avatar: 'BS', tier: 'Apprentice' }
];

export const MOCK_BATTLES_HISTORY = [
  {
    id: 'match_9012',
    opponent: 'algo_rythm',
    opponentRating: 1825,
    problemId: 'longest-unique-substring',
    problemTitle: 'Longest Substring Without Repeating Characters',
    result: 'win',
    ratingDelta: '+24',
    duration: '06:14',
    date: 'Today, 14:22'
  },
  {
    id: 'match_8891',
    opponent: 'null_pointer',
    opponentRating: 2395,
    problemId: 'median-two-sorted-arrays',
    problemTitle: 'Median of Two Sorted Arrays',
    result: 'loss',
    ratingDelta: '-16',
    duration: '14:40',
    date: 'Yesterday'
  },
  {
    id: 'match_8720',
    opponent: 'syntax_samurai',
    opponentRating: 1790,
    problemId: 'two-sum-sorted',
    problemTitle: 'Two Sum II — Input Array Is Sorted',
    result: 'win',
    ratingDelta: '+22',
    duration: '04:18',
    date: '3 days ago'
  },
  {
    id: 'match_8654',
    opponent: 'memory_leak',
    opponentRating: 1650,
    problemId: 'trapping-rain-water',
    problemTitle: 'Trapping Rain Water',
    result: 'win',
    ratingDelta: '+18',
    duration: '11:05',
    date: '5 days ago'
  }
];

export const MOCK_RATING_TIMELINE = [
  { match: 1, rating: 1600 },
  { match: 2, rating: 1630 },
  { match: 3, rating: 1620 },
  { match: 4, rating: 1675 },
  { match: 5, rating: 1710 },
  { match: 6, rating: 1690 },
  { match: 7, rating: 1745 },
  { match: 8, rating: 1800 },
  { match: 9, rating: 1816 },
  { match: 10, rating: 1840 }
];

export const INTERVIEW_QUESTIONS = [
  {
    id: 'iq-1',
    title: 'Two Sum (Optimized)',
    difficulty: 'Easy',
    topic: 'Hash Map',
    company: ['Google', 'Amazon'],
    isPremium: true,
    acceptance: '49.1%',
    hints: ['Use a hash map to store complement values', 'Single pass is possible'],
    approach: 'O(n) time with hash map lookup',
  },
  {
    id: 'iq-2',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    topic: 'Sorting',
    company: ['Facebook', 'Microsoft'],
    isPremium: true,
    acceptance: '44.8%',
    hints: ['Sort by start time first', 'Check if current start <= prev end'],
    approach: 'O(n log n) sort + O(n) merge',
  },
  {
    id: 'iq-3',
    title: 'LRU Cache Design',
    difficulty: 'Medium',
    topic: 'Design',
    company: ['Amazon', 'Apple'],
    isPremium: true,
    acceptance: '39.2%',
    hints: ['Use a doubly linked list + hash map', 'O(1) get and put required'],
    approach: 'Doubly linked list + HashMap: O(1)',
  },
  {
    id: 'iq-4',
    title: 'Word Ladder',
    difficulty: 'Hard',
    topic: 'BFS',
    company: ['Google', 'Uber'],
    isPremium: true,
    acceptance: '35.1%',
    hints: ['Model as a graph problem', 'BFS finds shortest transformation'],
    approach: 'Bidirectional BFS: O(M²×N)',
  },
  {
    id: 'iq-5',
    title: 'Trapping Rain Water II',
    difficulty: 'Hard',
    topic: 'Two Pointers',
    company: ['Amazon', 'Goldman'],
    isPremium: true,
    acceptance: '57.3%',
    hints: ['Think about water trapped at each index', 'Two pointers from both ends'],
    approach: 'Two pointers: O(n) time O(1) space',
  },
  {
    id: 'iq-6',
    title: 'Serialize & Deserialize Binary Tree',
    difficulty: 'Hard',
    topic: 'Tree',
    company: ['Facebook', 'LinkedIn'],
    isPremium: true,
    acceptance: '55.2%',
    hints: ['Use BFS level-order traversal', 'Null markers help reconstruct'],
    approach: 'BFS with queue: O(n)',
  },
  {
    id: 'iq-7',
    title: 'Course Schedule II',
    difficulty: 'Medium',
    topic: 'Graph',
    company: ['Microsoft', 'Airbnb'],
    isPremium: true,
    acceptance: '47.5%',
    hints: ['Build adjacency list + in-degree array', 'Kahn\'s algorithm for topological sort'],
    approach: 'Topological sort (Kahn\'s): O(V+E)',
  },
  {
    id: 'iq-8',
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    topic: 'Sliding Window',
    company: ['Google', 'Snapchat'],
    isPremium: true,
    acceptance: '40.4%',
    hints: ['Expand right pointer, shrink left', 'Track character frequency counts'],
    approach: 'Sliding window: O(|S| + |T|)',
  },
  {
    id: 'iq-9',
    title: 'Find Median from Data Stream',
    difficulty: 'Hard',
    topic: 'Heap',
    company: ['Amazon', 'Twitter'],
    isPremium: true,
    acceptance: '50.8%',
    hints: ['Use two heaps: max-heap and min-heap', 'Balance sizes after each insertion'],
    approach: 'Two heaps: O(log n) insert, O(1) median',
  },
  {
    id: 'iq-10',
    title: 'Binary Tree Maximum Path Sum',
    difficulty: 'Hard',
    topic: 'DFS',
    company: ['Facebook', 'Google'],
    isPremium: true,
    acceptance: '38.7%',
    hints: ['Think about contribution of each node', 'DFS with global max tracker'],
    approach: 'DFS: O(n) time O(h) space',
  },
  {
    id: 'iq-11',
    title: 'Edit Distance',
    difficulty: 'Hard',
    topic: 'Dynamic Programming',
    company: ['Google', 'Nvidia'],
    isPremium: true,
    acceptance: '52.1%',
    hints: ['2D DP table: rows = s1, cols = s2', 'dp[i][j] = min edit ops for s1[:i] to s2[:j]'],
    approach: 'DP: O(m×n) time and space',
  },
  {
    id: 'iq-12',
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    topic: 'Deque',
    company: ['Amazon', 'Qualcomm'],
    isPremium: true,
    acceptance: '46.2%',
    hints: ['Use a monotonic decreasing deque', 'Remove out-of-window indices from front'],
    approach: 'Monotonic deque: O(n)',
  },
  {
    id: 'iq-13',
    title: 'Number of Islands (Grid Analysis)',
    difficulty: 'Medium',
    topic: 'BFS',
    company: ['Amazon', 'Bloomberg'],
    isPremium: true,
    acceptance: '55.6%',
    hints: ['DFS/BFS to flood-fill each island', 'Mark visited cells as 0'],
    approach: 'BFS: O(M×N) time and space',
  },
  {
    id: 'iq-14',
    title: 'Design Scalable Feed (Twitter)',
    difficulty: 'Medium',
    topic: 'Design',
    company: ['Twitter', 'Dropbox'],
    isPremium: true,
    acceptance: '37.8%',
    hints: ['Use heap for getNewsFeed top-10', 'HashMap for users/tweets'],
    approach: 'Min-heap of size k: O(N log k)',
  },
  {
    id: 'iq-15',
    title: 'Regular Expression Matching',
    difficulty: 'Hard',
    topic: 'Dynamic Programming',
    company: ['Google', 'Facebook'],
    isPremium: true,
    acceptance: '28.1%',
    hints: ['Think about * matching 0 or more of previous char', 'Recursive with memoization'],
    approach: 'DP: O(m×n) time and space',
  },
  {
    id: 'iq-16',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    topic: 'Hash Set',
    company: ['Amazon', 'Palantir'],
    isPremium: true,
    acceptance: '47.6%',
    hints: ['Use a hash set for O(1) lookup', 'Start sequence only from num-1 not in set'],
    approach: 'Hash set: O(n) time and space',
  },
  {
    id: 'iq-17',
    title: 'Alien Dictionary',
    difficulty: 'Hard',
    topic: 'Graph',
    company: ['Facebook', 'Airbnb'],
    isPremium: true,
    acceptance: '33.9%',
    hints: ['Build ordering graph from adjacent words', 'Topological sort gives alphabet order'],
    approach: 'BFS topological sort: O(C)',
  },
  {
    id: 'iq-18',
    title: 'Kth Largest Element in an Array',
    difficulty: 'Medium',
    topic: 'Heap',
    company: ['Amazon', 'Apple'],
    isPremium: true,
    acceptance: '65.3%',
    hints: ['Min-heap of size k is intuitive', 'Quickselect is O(n) average'],
    approach: 'Quickselect: O(n) avg, Heap: O(n log k)',
  },
  {
    id: 'iq-19',
    title: 'Word Search II (Trie)',
    difficulty: 'Hard',
    topic: 'Tree',
    company: ['Microsoft', 'Yandex'],
    isPremium: true,
    acceptance: '36.4%',
    hints: ['Build Trie from word list', 'DFS over board while traversing Trie'],
    approach: 'Trie + DFS: O(M × N × 4^L)',
  },
  {
    id: 'iq-20',
    title: 'Jump Game II (Min Jumps)',
    difficulty: 'Medium',
    topic: 'Greedy',
    company: ['Google', 'Coupang'],
    isPremium: true,
    acceptance: '39.8%',
    hints: ['Greedy: extend furthest reach at each step', 'Track current end and furthest reach'],
    approach: 'Greedy: O(n) time O(1) space',
  },
];
