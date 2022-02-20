## Solution for Number of Islands


### Approach 1: DFS

**algorithm**

The grid is an undirected graph. Every "1" cell has an edge if it is connected to another "1" cell in one of four directions. Iterate through the grid. At every "1", depth first search in 4 directions and mark connected cells to avoid double counting them.
- if you cannot modify the input, a visited 2D array will be needed to mark cells as visited or seen. This will incur extra space O(m*n) for m x n grid.
- if you can modify, we can turn "1" to "0" and leave them marked
At every "1" after we mark connected land, we can increment an islands counter

**implementation**

```python
class Solution:
    def countIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0
        self.grid = grid
        self.m, self.n = len(grid), len(grid[0])
        self.directions = ((1,0),(0,1),(-1,0),(0,-1))
        islands = 0
        for i in range(self.m):
            for j in range(self.n):
                if grid[i][j] == "1":
                    self.markLands(i,j)
                    islands += 1

        return islands

    def markLands(self, i: int, j: int):
        self.grid[i][j] = "0"
        for di,dj in self.directions:
            newi, newj = i + di, j + dj
            if self.isValid(newi,newj):
                self.markLands(newi,newj)

    def isValid(self, i: int, j: int) -> bool:
        return (i >= 0 and i < self.m and j >= 0 and j < self.n and self.grid[i][j] == "1")
```

```javascript
const countIslands = (grid) => {
    if (grid === null || grid.length === 0) return 0;
    const m = grid.length, n = grid[0].length;
    const isValid = (i,j) => (i >= 0 && i < m && j >= 0 && j < n && grid[i][j] === "1");
    const directions = [[0,1],[1,0],[-1,0],[0,-1]];

    const markLand = (i,j) => {
        grid[i][j] = "0";
        for (const [di,dj] of directions){
            const newI = i + di, newJ = j + dj;
            if (isValid(newI,newJ)){
                markLand(newI,newJ);
            }
        }
    }

    let islands = 0;
    for (let i = 0; i < m; i++){
        for (let j = 0; j < n; j++){
            if (grid[i][j] === "1"){
                markLand(i,j);
                islands++;
            }
        }
    }
    return islands;
}
```
**complexity**

- Time complexity: O(M*N) for M x N grid.

- Space complexity: O(M*N) recursive stack space required in the worst case.

### Additional approaches: Both BFS and Union Find will perform in similar time and space complexity
