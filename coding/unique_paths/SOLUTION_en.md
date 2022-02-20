## Solution for Unique Paths

Start with the recursive nature of the problem. The robot can only go down or right. If m or n is 1, there is only one path to take. For 2x2 grid, total paths are the sum of paths going down first + sum of paths going to the right first

```python
class Solution:
    def distinctPaths(self, m: int, n: int) -> int:
        if m == 1 or n == 1:
            return 1
        return self.uniquePaths(m-1,n) + self.uniquePaths(m, n-1)
```

For large grids, the recursive stack space can get fairly deep.

### Approach 1: Dynamic Programming

**algorithm**

Use a 2D table to tabulate the number of ways to reach each cell. For any m x n grid, there's only 1 way to reach any cell along the top row or the left most column. We can initiate every cell in the table with a 1.
- iterate starting at grid[1][1]
- every cell's count of paths will be the sum of the number of paths reaching the cell directly above + the number paths reaching the cell directly to the left. ways[row][col] = ways[row-1][col] + ways[row][col-1]
- after iterating through grid, our 2D table will have the sum of possible paths reaching the bottom right corner and we can return it.

**implementation**

```python
class Solution:
    def distinctPaths(self, m: int, n: int) -> int:
        ways = [[1] * n for _ in range(m)]

        for row in range(1,m):
            for col in range(1,n):
                ways[row][col] = ways[row-1][col] + ways[row][col-1]
        return ways[m-1][n-1]
```

```java
class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        dp[0][0] = 1;
        for (int row = 1; row < m; row++){
            dp[row][0] = 1;
        }
        for (int col = 1; col < n; col++){
            dp[0][col] = 1;
        }

        for (int row = 1; row < m; row++){
            for (int col = 1; col < n; col++){
                dp[row][col] = dp[row-1][col] + dp[row][col-1];
            }
        }
        return dp[m-1][n-1];
    }
}
```

```javascript
const distinctPaths = (m,n) => {
    const waysDP = new Array(m).fill().map(row => new Array(n).fill(0));
    waysDP[0][0] = 1;

    for (let i = 0; i < m; i++){
        for (let j = 0; j < n; j++){
            if (i > 0) waysDP[i][j] += waysDP[i-1][j];
            if (j > 0) waysDP[i][j] += waysDP[i][j-1];
        }
    }
    return waysDP[m-1][n-1];
}
```

**complexity**

* Time complexity: O(M x N) one pass through grid

* Space complexity: O(M x N) tabulation table space
