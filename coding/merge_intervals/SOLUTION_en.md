## Solution for Merge Intervals

### Approach 1: Sorting

**algorithm**

If we sort intervals by start value, we can iterate through each interval knowing the one before is never starting after our current interval. So if our current interval start comes after the previous interval, we know they do not overlap. Otherwise, they overlap and we can merge them. When merging, make sure that we are taking the greater of the two ends. in the case of [[1,5], [2,3]], a merged interval will be [1,5]

**implementation**

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if not intervals: return []
        n = len(intervals)
        intervals.sort(key=lambda l:l[0])
        merged = [intervals[0]]
        for i in range(1, n):
            start,end = intervals[i]
            if start <= merged[-1][1]:
                merged[-1][1] = max(merged[-1][1], end)
            else:
                merged.append(intervals[i])
        return merged
```

```javascript
const merge = intervals => {
  if (intervals === null || intervals.length === 0) return [];
  const merged = [];
  intervals.sort((a, b) => a[0] - b[0]);
  for (const [start, end] of intervals) {
    let previousEnd = merged.length ? merged[merged.length - 1][1] : -Infinity;
    if (start <= previousEnd) {
      merged[merged.length - 1][1] = Math.max(end, previousEnd);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
};
```

**complexity**

- Time complexity: O(N log N) for N intervals for sort algorithm. O(N) for linear scan of intervals. Overall O(N log N) will dominate.

- Space complexity: O(log N) for recursive stack space of sort algorithm. Output array is not considered extra space here.
