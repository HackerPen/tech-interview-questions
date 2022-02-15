## Solution for Spiral Matrix

### Approach 1: Simulate traversal and record elements. Define boundaries

**algorithm**

- Update boundaries and shrink the spiral as you traverse. Direction changes will only occur at intersections of boundaries.
- use top,right,bottom,left.
  - go left to right along top
  - go top to bottom down right side
  - go right to left along bottom
  - go bottom to top along left side
  - at each direction change, shrink boundaries so as not to double count
- record output while traversing and return

**implementation**

```java
class Solution {
    public List<Integer> spiral(int[][] matrix) {
        if (matrix == null || matrix.length == 0) return new ArrayList();
        List<Integer> result = new ArrayList<Integer>();
        int m = matrix.length;
		int n = matrix[0].length;
		int total = m*n;
		int top = 0;
		int bottom = m-1;
		int left = 0;
		int right = n-1;

		while (result.size() < total){
			for (int col = left; col <= right && result.size() < total; col++){
				result.add(matrix[top][col]);
			}
			top++;
			for (int row = top; row <= bottom && result.size() < total; row++){
				result.add(matrix[row][right]);
			}
			right--;
			for (int col = right; col >= left && result.size() < total; col--){
				result.add(matrix[bottom][col]);
			}
			bottom--;
			for (int row = bottom; row >= top && result.size() < total; row--){
				result.add(matrix[row][left]);
			}
			left++;
		}
		return result;
  }
}
```

```python
class Solution:
    def spiral(self, matrix: List[List[int]]) -> List[int]:
        if not matrix: return []
        m,n = len(matrix), len(matrix[0])
        top,right,bottom,left = 0,n-1,m-1,0
        spiral_order = []
        total = m*n
        while len(spiral_order) < total:
            col = left
            while col <= right and len(spiral_order) < total:
                spiral_order.append(matrix[top][col])
                col += 1
            top += 1
            row = top
            while row <= bottom and len(spiral_order) < total:
                spiral_order.append(matrix[row][right])
                row += 1
            right -= 1
            col = right
            while col >= left and len(spiral_order) < total:
                spiral_order.append(matrix[bottom][col])
                col -= 1
            bottom -= 1
            row = bottom
            while row >= top and len(spiral_order) < total:
                spiral_order.append(matrix[row][left])
                row -= 1
            left += 1

        return spiral_order
```

```javascript
const spiral = (matrix) => {
    if (matrix === null || matrix.length === 0) return [];
    const spiralOrder = [], m = matrix.length, n = matrix[0].length, total = m*n;
    let left = 0, top = 0, right = n-1, bottom = m-1;
    while (spiralOrder.length < total){
        for (let col = left; col <= right && spiralOrder.length < total; col++){
            spiralOrder.push(matrix[top][col]);
        }
        top++;
        for (let row = top; row <= bottom && spiralOrder.length < total; row++){
            spiralOrder.push(matrix[row][right]);
        }
        right--;
        for (let col = right; col >= left && spiralOrder.length < total; col--){
            spiralOrder.push(matrix[bottom][col]);
        }
        bottom--;
        for (let row = bottom; row >= top && spiralOrder.length < total; row--){
            spiralOrder.push(matrix[row][left]);
        }
        left++;
    }
    return spiralOrder;
}
```

**complexity**

- Time complexity: O(M\*N) for M by N matrix. Every element is visited once

- Space complexity: O(1). No additional data structures used.
