export const CODING_PROBLEMS = [
  {
    id: 'two-sum',
    title: 'Two Sum (Target Pair Lookup)',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptance: '52.4%',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'nums[1] + nums[2] == 6, so return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      javascript: `// JavaScript (Node.js)
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `# Python 3
def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`,
      cpp: `// C++ 17
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `// Java 17
import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
      c: `// C (C11)
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* result = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}`
    },
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1], isHidden: false },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2], isHidden: false },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1], isHidden: false },
      { input: { nums: [1, 5, 8, 12, 19], target: 20 }, expected: [0, 4], isHidden: true },
      { input: { nums: [-3, 4, 3, 90], target: 0 }, expected: [0, 2], isHidden: true }
    ],
    optimalComplexity: {
      time: 'O(N) with Hash Map lookup',
      space: 'O(N) space for hash table'
    }
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses (Stack Matching)',
    difficulty: 'Easy',
    category: 'Stacks & Strings',
    acceptance: '64.1%',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true', explanation: 'Matching simple round brackets.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'All opening brackets closed in order.' },
      { input: 's = "(]"', output: 'false', explanation: 'Mismatched closing bracket type.' }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"'
    ],
    starterCode: {
      javascript: `// JavaScript (Node.js)
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  
  for (const ch of s) {
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack.pop() !== map[ch]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}`,
      python: `# Python 3
def is_valid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top_element = stack.pop() if stack else '#'
            if mapping[char] != top_element:
                return False
        else:
            stack.append(char)
    return not stack`,
      cpp: `// C++ 17
#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                if (c == ')' && st.top() != '(') return false;
                if (c == '}' && st.top() != '{') return false;
                if (c == ']' && st.top() != '[') return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
      java: `// Java 17
import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      c: `// C (C11)
#include <stdbool.h>
#include <string.h>

bool isValid(char* s) {
    int len = strlen(s);
    char stack[10001];
    int top = -1;
    for (int i = 0; i < len; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') {
            stack[++top] = c;
        } else {
            if (top == -1) return false;
            char open = stack[top--];
            if (c == ')' && open != '(') return false;
            if (c == '}' && open != '{') return false;
            if (c == ']' && open != '[') return false;
        }
    }
    return top == -1;
}`
    },
    testCases: [
      { input: { s: '()' }, expected: true, isHidden: false },
      { input: { s: '()[]{}' }, expected: true, isHidden: false },
      { input: { s: '(]' }, expected: false, isHidden: false },
      { input: { s: '([{}])' }, expected: true, isHidden: true },
      { input: { s: '[(])' }, expected: false, isHidden: true }
    ],
    optimalComplexity: {
      time: 'O(N) single pass through string',
      space: 'O(N) for the character stack'
    }
  },
  {
    id: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window / HashMap',
    acceptance: '44.8%',
    description: `Given a string \`s\`, find the length of the **longest substring** without duplicate characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", length 3.' }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    starterCode: {
      javascript: `// JavaScript (Node.js)
function lengthOfLongestSubstring(s) {
  let left = 0, maxLen = 0;
  const lastIndex = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (lastIndex.has(char) && lastIndex.get(char) >= left) {
      left = lastIndex.get(char) + 1;
    }
    lastIndex.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      python: `# Python 3
def length_of_longest_substring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
      cpp: `// C++ 17
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> map;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.size(); ++right) {
            if (map.count(s[right]) && map[s[right]] >= left) {
                left = map[s[right]] + 1;
            }
            map[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
      java: `// Java 17
import java.util.HashMap;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c) && map.get(c) >= left) {
                left = map.get(c) + 1;
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
      c: `// C (C11)
#include <string.h>

int lengthOfLongestSubstring(char* s) {
    int lastPos[256];
    for (int i = 0; i < 256; i++) lastPos[i] = -1;
    int left = 0, maxLen = 0;
    int len = strlen(s);
    for (int right = 0; right < len; right++) {
        unsigned char c = (unsigned char)s[right];
        if (lastPos[c] >= left) {
            left = lastPos[c] + 1;
        }
        lastPos[c] = right;
        int cur = right - left + 1;
        if (cur > maxLen) maxLen = cur;
    }
    return maxLen;
}`
    },
    testCases: [
      { input: { s: 'abcabcbb' }, expected: 3, isHidden: false },
      { input: { s: 'bbbbb' }, expected: 1, isHidden: false },
      { input: { s: 'pwwkew' }, expected: 3, isHidden: false },
      { input: { s: 'tmmzuxt' }, expected: 5, isHidden: true },
      { input: { s: ' ' }, expected: 1, isHidden: true }
    ],
    optimalComplexity: {
      time: 'O(N) with two-pointer sliding window',
      space: 'O(min(m, n)) character index map'
    }
  },
  {
    id: 'invert-binary-tree',
    title: 'Invert Binary Tree (Tree Recursion)',
    difficulty: 'Easy',
    category: 'Trees & Recursion',
    acceptance: '76.2%',
    description: `Given the root of a binary tree, invert the tree, and return its root.

Swapping each left child with its right child recursively creates the mirror image of the tree.`,
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]', explanation: 'Every level is inverted from left to right.' },
      { input: 'root = [2,1,3]', output: '[2,3,1]', explanation: 'Left child 1 and right child 3 are swapped.' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100'
    ],
    starterCode: {
      javascript: `// JavaScript (Node.js)
function invertTree(root) {
  if (!root) return null;
  const temp = root.left;
  root.left = invertTree(root.right);
  root.right = invertTree(temp);
  return root;
}`,
      python: `# Python 3
def invert_tree(root):
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root`,
      cpp: `// C++ 17
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        TreeNode* temp = root->left;
        root->left = invertTree(root->right);
        root->right = invertTree(temp);
        return root;
    }
};`,
      java: `// Java 17
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);
        return root;
    }
}`,
      c: `// C (C11)
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

struct TreeNode* invertTree(struct TreeNode* root) {
    if (!root) return NULL;
    struct TreeNode* temp = root->left;
    root->left = invertTree(root->right);
    root->right = invertTree(temp);
    return root;
}`
    },
    testCases: [
      { input: { tree: [4, 2, 7, 1, 3, 6, 9] }, expected: [4, 7, 2, 9, 6, 3, 1], isHidden: false },
      { input: { tree: [2, 1, 3] }, expected: [2, 3, 1], isHidden: false },
      { input: { tree: [] }, expected: [], isHidden: true }
    ],
    optimalComplexity: {
      time: 'O(N) visiting each node once',
      space: 'O(H) recursion stack height'
    }
  }
];

export const FUNDAMENTALS_QUIZ = [
  {
    id: 'f1',
    topic: 'Variables & Data Types',
    question: 'In JavaScript / Python, what is the key difference between pass-by-value and pass-by-reference for primitive types vs objects?',
    options: [
      'Primitives are immutable and passed by value; objects are passed by reference (copy of reference)',
      'All variables are always passed by memory reference in modern languages',
      'Objects are cloned automatically during every function call',
      'Primitives can be mutated inside functions directly'
    ],
    correctAnswer: 0,
    explanation: 'Primitives (numbers, strings, booleans) are copied by value. Objects, arrays, and dictionaries have their reference copied, meaning mutations to properties persist outside the function.'
  },
  {
    id: 'f2',
    topic: 'Object Oriented Programming',
    question: 'Which OOP principle states that software entities (classes, modules) should be open for extension, but closed for modification?',
    options: [
      'Single Responsibility Principle (SRP)',
      'Open/Closed Principle (OCP)',
      'Liskov Substitution Principle (LSP)',
      'Dependency Inversion Principle (DIP)'
    ],
    correctAnswer: 1,
    explanation: 'The Open/Closed Principle (the "O" in SOLID) asserts that existing well-tested code should not need modification to add new behaviors; rather, new functionality is added via inheritance, interfaces, or polymorphism.'
  },
  {
    id: 'f3',
    topic: 'Time Complexity',
    question: 'What is the amortized time complexity of appending an element to a dynamic array (e.g. std::vector in C++, ArrayList in Java, list in Python)?',
    options: [
      'O(1) amortized',
      'O(N) every time',
      'O(log N)',
      'O(N^2)'
    ],
    correctAnswer: 0,
    explanation: 'Although array resizing takes O(N) when doubling capacity, it happens infrequently enough (every 2^k insertions) that the averaged cost per append over N operations is O(1).'
  },
  {
    id: 'f4',
    topic: 'Recursion & Memory',
    question: 'What condition causes a "Stack Overflow" error in recursive algorithms?',
    options: [
      'Too much memory allocated in the heap for objects',
      'Exceeding maximum call stack depth due to missing or unreachable base condition',
      'CPU clock frequency drops below minimum required threshold',
      'Array indexing out of boundary'
    ],
    correctAnswer: 1,
    explanation: 'Each function invocation allocates a stack frame on the thread call stack. Without a terminating base case, the stack exhausts allocated memory space, raising a Stack Overflow.'
  }
];

export const DSA_TOPICS_GUIDE = [
  { name: 'Arrays & Two Pointers', mastery: 85, icon: 'LayoutGrid', desc: 'Sliding window, prefix sums, binary search in sorted arrays' },
  { name: 'Linked Lists', mastery: 78, icon: 'GitCommit', desc: 'Floyd cycle detection, reversal, merge K-sorted lists' },
  { name: 'Stacks & Queues', mastery: 90, icon: 'Layers', desc: 'Monotonic stacks, min-stack design, BFS queue queues' },
  { name: 'Trees & BST', mastery: 68, icon: 'Network', desc: 'LCA, tree traversals (inorder, preorder, postorder), serialization' },
  { name: 'Graphs & BFS/DFS', mastery: 62, icon: 'Share2', desc: 'Dijkstra, topological sort, connected components, Union-Find' },
  { name: 'Dynamic Programming', mastery: 55, icon: 'Cpu', desc: 'Memoization, tabulation, knapsack, longest common subsequence' }
];
