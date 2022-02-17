## Solution for Meeting Rooms 2


### Approach 1: Heap

**algorithm**

- Meetings need to be processed to minimize rooms. If we iterate through meetings sorted by start time, every time we find an overlap, we will need a new room.
- As we have more rooms, how do we decide where to place the next room? We always want to choose the room where the meeting is ending first. If this room isn't available, we'll need a new room since all other rooms will not be available

- what data structure can help us keep the meeting ending first easily accessible? A Min heap

- sort meetings by start time
- iterate through sorted meetings and add to heap. Only end times matter to let us know which rooms will be free
- every meeting in the heap represents a room, so the size of the heap will be the number of rooms we need
- the minimum number of rooms we will need is the maximum size the heap reaches while iterating through meetings

**implementation**

```python
import heapq
class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        if not intervals:
            return 0
        n = len(intervals)
        intervals.sort(key=lambda x:x[0])
        min_heap = []
        heapq.heappush(min_heap, intervals[0][1])
        for i in range(1, n):
            start, end = intervals[i]
            if len(min_heap) and start >= min_heap[0]:
                heapq.heappop(min_heap)
            heapq.heappush(min_heap, end)
        return len(min_heap)
```

```java
class Solution {
    public int minRooms(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;
        PriorityQueue<Integer> endTimes = new PriorityQueue<>((a,b) -> a-b);
        Arrays.sort(intervals, (a,b) -> a[0]-b[0]);
        endTimes.offer(intervals[0][1]);
        for (int i = 1; i < intervals.length; i++){
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start >= endTimes.peek()){
                endTimes.poll();
            }
            endTimes.offer(end);
        }
        return endTimes.size();
    }
}
```

```javascript
class Heap{
    constructor(func){
        this.heap = [];
        this.func = func;
    }
    siftDown(idx, end, heap){
        let child1 = idx*2+1;
        while (child1 <= end){
            let child2 = idx*2+2 <= end ? idx*2+2 : -1;
            let swapIdx;
            if (child2 !== -1 && this.shouldSwap(child2, child1)){
                swapIdx = child2;
            } else {
                swapIdx = child1;
            }
            if (this.shouldSwap(swapIdx, idx)){
                this.swap(swapIdx, idx, heap);
                idx = swapIdx;
                child1 = idx*2+1;
            } else return;
        }
    }
    siftUp(idx, heap){
        let parent = Math.floor((idx-1)/2);
        while (idx > 0 && this.shouldSwap(idx, parent)){
            this.swap(idx, parent, heap);
            idx = parent;
            parent = Math.floor((idx-1)/2);
        }
    }
    poll(){
        this.swap(0, this.heap.length-1, this.heap);
        let valueToReturn = this.heap.pop();
        this.siftDown(0, this.heap.length-1, this.heap);
        return valueToReturn;
    }
    offer(val){
        this.heap.push(val);
        this.siftUp(this.heap.length-1, this.heap);
    }
    peek(){
        return this.heap[0];
    }
    size(){
         return this.heap.length;
    }
    isEmpty(){
        return this.heap.length === 0;
    }
    swap(i,j,heap){
        [heap[i],heap[j]] = [heap[j],heap[i]];
    }
    shouldSwap(idx1,idx2){
        return this.func(this.heap[idx1], this.heap[idx2]);
    }
}
const minRooms = (intervals) => {
    if (intervals === null || intervals.length === 0) return 0;
    let minRooms = 0;
    intervals.sort((a,b) => a[0] - b[0]);
    const minHeap = new Heap((a,b) => a[1] < b[1]);
    for (const [start,end] of intervals){
        if (!minHeap.isEmpty() && start >= minHeap.peek()[1]){
            minHeap.poll();
        }
        minHeap.offer([start,end]);
        minRooms = Math.max(minRooms, minHeap.size());
    }
    return minRooms;
}
```

**complexity**

- Time complexity: O(N log N) for N intervals for sort algorithm. While iterating through meetings, the worst case is every room overlaps. So we will have N operations of pushing and popping from heap for O(log N) each operation. Overall time complexity is O(N log N)

- Space complexity: O(N) for the size of the heap in the worst case. O(log N) for recursive stack space of sort algorithm.
