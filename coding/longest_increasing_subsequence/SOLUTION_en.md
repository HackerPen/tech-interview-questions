## Solution for Longest Increasing Subsequence


### Approach 1: Dynamic Programming

**algorithm**

This problem has two important attributes that let us know it should be solved by dynamic programming. First, the question is asking for the maximum or minimum of something. Second, we have to make decisions that may depend on previously made decisions, which is very typical of a problem involving subsequences.

As we go through the input, each "decision" we must make is simple: is it worth it to consider this number? If we use a number, it may contribute towards an increasing subsequence, but it may also eliminate larger elements that came before it. For example, let's say we have nums = `[5, 6, 7, 8, 1, 2, 3]`. It isn't worth using the 1, 2, or 3, since using any of them would eliminate 5, 6, 7, and 8, which form the longest increasing subsequence. We can use dynamic programming to determine whether an element is worth using or not.

Typically, dynamic programming problems can be solved with three main components. If you're new to dynamic programming, this might be hard to understand but is extremely valuable to learn since most dynamic programming problems can be solved this way.

First, we need some function or array that represents the answer to the problem from a given state. For this problem, you will see this function/array named `dp`. Let's say that we have an array dp. As just stated, this array needs to represent the answer to the problem for a given state, so let's say that `dp[i]` represents the length of the longest increasing subsequence that ends with the `i_th` element. The "state" is one-dimensional since it can be represented with only one variable - the index i.

Second, we need a way to transition between states, such as `dp[5]` and `dp[7]`. This is called a recurrence relation and can sometimes be tricky to figure out. Let's say we know `dp[0]`, `dp[1]`, and `dp[2]`. How can we find `dp[3]` given this information? Well, since `dp[2]` represents the length of the longest increasing subsequence that ends with `nums[2]`, if `nums[3] > nums[2]`, then we can take the subsequence ending at `i = 2` and append `nums[3]` to it, increasing the length by 1. The same can be said for `nums[0]` and `nums[1]` if `nums[3]` is larger. Of course, we should try to maximize `dp[3]`, so we need to check all 3.

Formally, the recurrence relation is: `dp[i] = max(dp[j] + 1) for all j where nums[j] < nums[i] and j < i`

The third component is the simplest: we need a base case. For this problem, we can initialize every element of `dp` to 1, since every element on its own is technically an increasing subsequence.

**implementation**

```java
class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);

        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }

        int longest = 0;
        for (int c: dp) {
            longest = Math.max(longest, c);
        }

        return longest;
    }
}
```

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        dp = [1] * len(nums)
        for i in range(1, len(nums)):
            for j in range(i):
                if nums[i] > nums[j]:
                    dp[i] = max(dp[i], dp[j] + 1)

        return max(dp)
```

**complexity**

Time complexity: `O(N^2)`. We use two nested for loops resulting in 1 + 2 + 3 + 4 + ... + N = N*(N+1)/2
Space complexity: `O(N)`. The only extra space we use relative to input size is the `dp` array, which is the same length as `nums`.
