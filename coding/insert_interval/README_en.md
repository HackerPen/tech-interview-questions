## Insert Interval

You are given an array of non-overlapping intervals where each interval is [start,end] and the array is sorted in ascending order by start. You are also given a new interval.

Insert the new interval into the intervals such that intervals remain sorted in ascending order by start, and intervals does not have any overlapping intervals (merge any overlapping)

return intervals after insertion

### Examples

Example 1
```
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

Example 2
```
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
```
