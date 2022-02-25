## Title for the solution


### Approach 1: Memoization

**algorithm**

we can create a top-down recursive algorithm that looks like this in pseudocode:

```
define function LCS(text1, text2):
    # If either string is empty there, can be no common subsequence.
    if length of text1 or text2 is 0:
        return 0

    letter1 = the first letter in text1
    firstOccurence = first position of letter1 in text2

    # The case where the line *is not* part of the optimal solution
    case1 = LCS(text1.substring(1), text2)

    # The case where the line *is* part of the optimal solution
    case2 = 1 + LCS(text1.substring(1), text2.substring(firstOccurence + 1))

    return maximum of case1 and case2
```
You might notice from the pseudocode that there's one case we haven't handled: if letter1 isn't part of text2, then we can't solve the first subproblem. However, in this case, we can simply ignore the first subproblem as the line doesn't exist. This leaves us with:

```
define function LCS(text1, text2):
    # If either string is empty there can be no common subsequence
    if length of text1 or text2 is 0:
        return 0

    letter1 = the first letter in text1

    # The case where the line *is not* part of the optimal solution
    case1 = LCS(text1.substring(1), text2)

    case2 = 0
    if letter1 is in text2:
        firstOccurence = first position of letter1 in text2
        # The case where the line *is* part of the optimal solution
        case2 = 1 + LCS(text1.substring(1), text2.substring(firstOccurence + 1))

    return maximum of case1 and case2
```

**implementation**

```java
class Solution {

  private int[][] memo;
  private String text1;
  private String text2;

  public int longestCommonSubsequence(String text1, String text2) {
    // Make the memo big enough to hold the cases where the pointers
    // go over the edges of the strings.
    this.memo = new int[text1.length() + 1][text2.length() + 1];
    // We need to initialise the memo array to -1's so that we know
    // whether or not a value has been filled in. Keep the base cases
    // as 0's to simplify the later code a bit.
    for (int i = 0; i < text1.length(); i++) {
      for (int j = 0; j < text2.length(); j++) {
        this.memo[i][j] = -1;
      }
    }
    this.text1 = text1;
    this.text2 = text2;
    return memoSolve(0, 0);
  }

  private int memoSolve(int p1, int p2) {        
    // Check whether or not we've already solved this subproblem.
    // This also covers the base cases where p1 == text1.length
    // or p2 == text2.length.
    if (memo[p1][p2] != -1) {
      return memo[p1][p2];
    }

    // Option 1: we don't include text1[p1] in the solution.
    int option1 = memoSolve(p1 + 1, p2);

    // Option 2: We include text1[p1] in the solution, as long as
    // a match for it in text2 at or after p2 exists.
    int firstOccurence = text2.indexOf(text1.charAt(p1), p2);
    int option2 = 0;
    if (firstOccurence != -1) {
      option2 = 1 + memoSolve(p1 + 1, firstOccurence + 1);
    }

    // Add the best answer to the memo before returning it.
    memo[p1][p2] = Math.max(option1, option2);
    return memo[p1][p2];
  }
}
```

```python
from functools import lru_cache

class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:

        @lru_cache(maxsize=None)
        def memo_solve(p1, p2):

            # Base case: If either string is now empty, we can't match
            # up anymore characters.
            if p1 == len(text1) or p2 == len(text2):
                return 0

            # Option 1: We don't include text1[p1] in the solution.
            option_1 = memo_solve(p1 + 1, p2)

            # Option 2: We include text1[p1] in the solution, as long as
            # a match for it in text2 at or after p2 exists.
            first_occurence = text2.find(text1[p1], p2)
            option_2 = 0
            if first_occurence != -1:
                option_2 = 1 + memo_solve(p1 + 1, first_occurence + 1)

            # Return the best option.
            return max(option_1, option_2)

        return memo_solve(0, 0)
```

**complexity**

Time complexity: `O(M * N^2)`. `M` is the length of the first string, and `N` is the length of the second string.

We analyze a memoized-recursive function by looking at how many unique subproblems it will solve, and then what the cost of solving each subproblem is.
The input parameters to the recursive function are a pair of integers; representing a position in each string. There are MM possible positions for the first string, and NN for the second string. Therefore, this gives us `M⋅N` possible pairs of integers, and is the number of subproblems to be solved.
Solving each subproblem requires, in the worst case, an O(N)O(N) operation; searching for a character in a string of length NN. This gives us a total of `M*N^2`.

Space complexity: `O(M * N)`. `M` is the length of the first string, and `N` is the length of the second string.

We need to store the answer for each of the `M*N` subproblems. Each subproblem takes O(1)O(1) space to store. This gives us a total of `O(M*N)`

### Approach 2: Dynamic Programming

Remembering too that each subproblem is represented as a pair of indexes, and that there are `text1.length() * text2.length()` such possible subproblems, we can iterate through the subproblems, starting from the smallest ones, and storing the answer for each. When we get to the larger subproblems, the smaller ones that they depend on will already have been solved. The best way to do this is to use a 2D array.

![pic-1](https://leetcode.com/problems/longest-common-subsequence/Figures/1143/empty_bottom_up_grid.png)

Each cell represents one subproblem. For example, the below cell represents the subproblem lcs("attag", "gtgatcg").

![pic-2](https://leetcode.com/problems/longest-common-subsequence/Figures/1143/bottom_up_subproblem.png)

Remembering back to Approach 2, there were two cases.
- The first letter of each string is the same.
- The first letter of each string is different.

For the first case, we solve the subproblem that removes the first letter from each, and add 1. In the grid, this subproblem is always the diagonal immediately down and right.
![pic-3](https://leetcode.com/problems/longest-common-subsequence/Figures/1143/bottom_up_same_letter.png)

For the second case, we consider the subproblem that removes the first letter off the first word, and then the subproblem that removes the first letter off the second word. In the grid, these are subproblems immediately right and below.
![pic-4](https://leetcode.com/problems/longest-common-subsequence/Figures/1143/bottom_up_different_letter.png)

Putting this all together, we iterate over each column in reverse, starting from the last column (we could also do rows, the final result will be the same). For a cell (row, col), we look at whether or not text1.charAt(row) == text2.charAt(col) is true. if it is, then we set grid[row][col] = 1 + grid[row + 1][col + 1]. Otherwise, we set grid[row][col] = max(grid[row + 1][col], grid[row][col + 1]).

For ease of implementation, we add an extra row of zeroes at the bottom, and an extra column of zeroes to the right.

**implementation**

```java
class Solution {

  public int longestCommonSubsequence(String text1, String text2) {    

    // Make a grid of 0's with text2.length() + 1 columns
    // and text1.length() + 1 rows.
    int[][] dpGrid = new int[text1.length() + 1][text2.length() + 1];

    // Iterate up each column, starting from the last one.
    for (int col = text2.length() - 1; col >= 0; col--) {
      for (int row = text1.length() - 1; row >= 0; row--) {
        // If the corresponding characters for this cell are the same...
        if (text1.charAt(row) == text2.charAt(col)) {
          dpGrid[row][col] = 1 + dpGrid[row + 1][col + 1];
        // Otherwise they must be different...
        } else {
          dpGrid[row][col] = Math.max(dpGrid[row + 1][col], dpGrid[row][col + 1]);
        }
      }
    }

    // The original problem's answer is in dp_grid[0][0]. Return it.
    return dpGrid[0][0];
  }
}
```

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:

        # Make a grid of 0's with len(text2) + 1 columns
        # and len(text1) + 1 rows.
        dp_grid = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]

        # Iterate up each column, starting from the last one.
        for col in reversed(range(len(text2))):
            for row in reversed(range(len(text1))):
                # If the corresponding characters for this cell are the same...
                if text2[col] == text1[row]:
                    dp_grid[row][col] = 1 + dp_grid[row + 1][col + 1]
                # Otherwise they must be different...
                else:
                    dp_grid[row][col] = max(dp_grid[row + 1][col], dp_grid[row][col + 1])

        # The original problem's answer is in dp_grid[0][0]. Return it.
        return dp_grid[0][0]
```

**complexity**

Time complexity: `O(M * N)`. `M` is the length of the first string, and `N` is the length of the second string. We're solving `M*N` subproblems. Solving each subproblem is an `O(1)` operation.
Space complexity: `O(M * N)`. `M` is the length of the first string, and `N` is the length of the second string. We'e allocating a 2D array of size `M*N` to save the answers to subproblems.
