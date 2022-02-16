## Solution for Word Search


### Approach 1: Backtracking

**algorithm**

Similar to DFS in this case, backtracking involves marking each visited cell and reverting the cell back when a word is not found. For each cell, we backtrack in available directions until the complete word is found.

- Recursive. Our base case is when we've reached the end of the word. We can save time complexity by keeping track of the index instead of repeatedly slicing a word for prefix/suffix.
- a helper function can abstract boundary checking
- We have to keep track of visited cells in a path. A 2D boolean array can be used if input cannot be modified, but this will incur extra space. Talk about this tradeoff with your interviewer. If we can modify the input, it will save space and be a little faster to code.
- If at any point in our backtracking, we hit our base case, we can return True. If we've searched the entire board without returning true, we can return False.

**implementation**

```python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        if not board: return False
        self.m = len(board)
        self.n = len(board[0])
        self.board = board
        self.word = word
        self.directions = [[1,0],[0,1],[-1,0],[0,-1]]

        for i in range(self.m):
            for j in range(self.n):
                if self.board[i][j] == word[0] and self.word_search(i,j, 0):
                    return True
        return False

    def word_search(self, i: int, j: int, index: int) -> bool:
        if index == len(self.word)-1:
            return True
        temp = self.board[i][j]
        self.board[i][j] = "#"
        for di,dj in self.directions:
            newI = i + di
            newJ = j + dj
            if self.is_valid(newI,newJ) and self.word[index+1] == self.board[newI][newJ] and self.word_search(newI,newJ,index+1):
                return True

        self.board[i][j] = temp
        return False

    def is_valid(self, i: int,j: int) -> bool:
        return (i >= 0 and i < self.m and j >= 0 and j < self.n)
```

#### cannot modify input
```python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        if not board: return False
        self.m = len(board)
        self.n = len(board[0])
        self.board = board
        self.word = word
        self.directions = [[1,0],[0,1],[-1,0],[0,-1]]
        self.seen = [[False for j in range(self.n)] for i in range(self.m)]

        for i in range(self.m):
            for j in range(self.n):
                if self.board[i][j] == word[0] and self.word_search(i,j, 0):
                    return True
        return False

    def word_search(self, i: int, j: int, index: int) -> bool:
        if index == len(self.word)-1:
            return True
        self.seen[i][j] = True
        for di,dj in self.directions:
            newI = i + di
            newJ = j + dj
            if self.is_valid(newI,newJ) and self.word[index+1] == self.board[newI][newJ] and self.word_search(newI,newJ,index+1):
                return True

        self.seen[i][j] = False
        return False

    def is_valid(self, i: int,j: int) -> bool:
        return (i >= 0 and i < self.m and j >= 0 and j < self.n and not self.seen[i][j])

```

```javascript
const wordSearch = (board, word) => {
    if (board === null || board.length === 0) return false;
    const m = board.length, n = board[0].length;
    const dirs = [[1,0],[0,1],[-1,0],[0,-1]];
    const isValid = (i,j) => (i < m && i >= 0 && j < n && j >= 0);

    const wordSearch = (i,j, index) => {
        if (index === word.length-1) return true;
        let temp = board[i][j];
        board[i][j] = "#";
        for (const [di,dj] of dirs){
            const newI = i + di, newJ = j + dj;
            if (isValid(newI,newJ) && board[newI][newJ] === word[index+1] && wordSearch(newI,newJ, index+1)) return true;
        }
        board[i][j] = temp;
        return false;
    }

    for (let i = 0; i < m; i++){
        for (let j = 0; j < n; j++){
            if (board[i][j] === word[0] && wordSearch(i,j,0)) return true;
        }
    }
    return false;
}
```

***complexity***

* Time complexity: O(N * 3^L) for N cells in board and L length of word. 3 is for every direction to explore from a cell. This can be visualized as a 3-ary tree. Total branches can be seen as total number of nodes in a full 3-ary tree ~= 3^L. Since we iterate through N cells in board, our worst case for backtracking recursive calls is N.

* Space complexity: There's a lot of boilerplate, but since they are all constant, we have O(1). If we cannot modify the input, we will require O(N) for a visited 2D board.
