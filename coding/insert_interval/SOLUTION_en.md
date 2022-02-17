## Solution for Insert Interval

### Approach 1: Brute force

- append new interval
- sort by start
- merge intervals

**implementation**

Practice merge intervals and this should be pretty standard implementation.

### Approach 2: Greedy

**algorithm**

Brute force doesn't take advantage that the input is already sorted and the bottleneck is the sorting algorithm runs again for O(N logN).

We have three possible conditions:

- the new interval comes before any interval
- new interval is after all intervals
- new interval overlaps

- add all intervals starting before or after new interval
- overlapping intervals can be merged into new interval until next interval is no longer overlapping

**implementation**

```python
class Solution:
    def insert_interval(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        merged = []
        isMerged = False
        for start,end in intervals:
            if isMerged or end < newInterval[0]:
                merged.append([start,end])
            elif start > newInterval[1]:
                merged.append(newInterval)
                merged.append([start,end])
                isMerged = True
            else:
                newInterval = [min(newInterval[0], start), max(newInterval[1], end)]
        if not isMerged:
            merged.append(newInterval)
        return merged
```

```javascript
const insertInterval = (intervals, newInterval) => {
  const res = [];
  let isMerged = false;
  for (const [start, end] of intervals) {
    if (isMerged || end < newInterval[0]) res.push([start, end]);
    else if (start > newInterval[1]) {
      res.push(newInterval);
      res.push([start, end]);
      isMerged = true;
    } else {
      newInterval = [
        Math.min(newInterval[0], start),
        Math.max(newInterval[1], end)
      ];
    }
  }
  if (!isMerged) res.push(newInterval);
  return res;
};
```

**_complexity_**

- Time complexity: O(N) one pass through N intervals

- Space complexity: O(1) other than the output
