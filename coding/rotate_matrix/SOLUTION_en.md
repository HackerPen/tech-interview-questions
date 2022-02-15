## Solution for Rotate Matrix

### Approach 1: Reverse on diagonal and reverse left to right

**algorithm**
transpose and reflect:
- reverse across the diagonal
- reverse each row


**implementation**

```python
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        self.transpose(matrix)
        self.reflect(matrix)

    def transpose(self, matrix):
        n = len(matrix)
        for i in range(n):
            for j in range(i, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    def reflect(self, matrix):
        n = len(matrix)
        for i in range(n):
            matrix[i].reverse()
```

```javascript
const swap = (i,j, arr) => [arr[i][j],arr[j][i]] = [arr[j][i],arr[i][j]];
const rotate = (matrix) => {
    if (matrix === null || matrix.length === 0) return;
    const n = matrix.length;
    for (let i = 0; i < n; i++){
        for (let j = i; j < n; j++){
            swap(i,j, matrix)
        }
    }
    for (let i = 0; i < n; i++){
        matrix[i].reverse();
    }
    return;
};
```

**complexity**

consider M for NxN total cells in matrix
- Time complexity: O(M). Two passes required

- Space complexity: O(1) all operations are in place
