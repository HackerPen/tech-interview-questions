## Solution for Meetings


### Approach 1: Brute force

**algorithm**

compare every two meetings and see if there is overlap.

**implementation**

```python
class Solution:
    def canGoToMeetings(self, intervals: List[List[int]]) -> bool:
        if not intervals:
            return True
        n = len(intervals)
        for i in range(n-1):
            for j in range(i+1, n):
                if self.overlap(intervals[i], intervals[j]):
                    return False
        return True
    def overlap(self, time1, time2) -> bool:
        start1, end1 = time1
        start2, end2 = time2
        return ((start1 >= start2 and start1 < end2) or (start2 >= start1 and start2 < end1))
```

**complexity**

- Time complexity: O(N^2) for N meetings.

- Space complexity: O(1). No additional space used.

### Approach 2: Sort

**algorithm**

- Sort by start time
- iterate through sorted meetings and check if current meeting starts after he previous one ends

**implementation**

```python
class Solution:
    def canGoToMeetings(self, intervals: List[List[int]]) -> bool:
        if not intervals:
            return True
        n = len(intervals)
        intervals.sort()
        previous_end = intervals[0][1]
        for i in range(1, n):
            start,end = intervals[i]
            if start < previous_end:
                return False
            previous_end = end
        return True
```

```java
class Solution {
    public boolean canGoToMeetings(int[][] intervals) {
        if (intervals.length < 2) return true;
        Arrays.sort(intervals, (a,b) -> a[0]-b[0]);
        int end = intervals[0][1];
        for (int i = 1; i < intervals.length; i++){
            if (intervals[i][0] < end) return false;
            end = intervals[i][1];
        }
        return true;
    }
}
```

```javascript

const canGoToMeetings = (intervals) => {
    if (intervals.length < 2) return true
    intervals.sort((a,b) => a[0]-b[0])
    let previousEnd = intervals[0][1];
    for (let i = 1; i < intervals.length; i++){
        const [start,end] = intervals[i];
        if (start < previousEnd) return false;
        previousEnd = end;
    }
    return true;
}
```
**complexity**

- Time complexity: O(N log N) for N meetings for sort algorithm. O(N) to iterate through sorted meetings once.

- Space complexity: O(log N) for recursive stack space in sorting algorithm. O(1) for no additional space used.
