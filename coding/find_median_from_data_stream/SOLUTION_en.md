## Solution for Find Median from Data Stream

### Approach 1: Sort

**algorithm**

Store numbers in a list. For every call to findMedian, sort the list and output the median.

**implementation**

```python
class MedianFinder:

    def __init__(self):
        self.data = []

    def addNum(self, num: int) -> None:
        self.data.append(num)

    def findMedian(self) -> float:
        sorted_data = sorted(self.data)
        n = len(sorted_data)
        middle = (n-1)//2

        if n%2 != 0:
            return sorted_data[middle]
        else:
            return (sorted_data[middle] + sorted_data[middle+1])/2
```

**complexity**

- Time complexity: O(Nlog N) for sorting N elements

- Space complexity : O(N) for list space to hold numbers. O(log N) for recursive stack space of sort algorithm

### Approach 2: Insertion Sort

Since we are using a data stream, we can maintain the list by inserting each number into its proper spot one at a time while keeping the list sorted. This is insertion sort.

The list will always be sorted, so we can find the correct index using binary search. When insertion queries <= median queries, this will work well.

**implementation**

```python
class MedianFinder:

    def __init__(self):
        self.data = []

    def addNum(self, num: int) -> None:
        if not self.data:
            self.data.append(num)
        else:
            index = self.binary_search(num)
            self.data[index:index] = [num]

    def binary_search(self, num) -> int:
        left, right = 0, len(self.data)-1
        while left <= right:
            mid = left + (right-left)//2
            if self.data[mid] <= num:
                left = mid + 1
            else:
                right = mid - 1
        return left

    def findMedian(self) -> float:
        n = len(self.data)
        middle = (n-1)//2
        if n%2 != 0:
            return self.data[middle]
        else:
            return (self.data[middle] + self.data[middle+1])/2

```

**complexity**

- Time complexity: O(N) for insertion sort. O(log N) for binary search through N elements.

- Space complexity : O(N) for list space to hold numbers.

### Approach 3: Two Heaps

Having consistent access to middle elements in constant time will reduce the time complexity. Having the entire list sorted is not necessary. You can use two heaps. A max heap will store the smaller numbers and a min heap will store the larger numbers.

- Both heaps needs to stay balanced or nearly balanced
- Max heap will hold the smaller half of numbers. At the top of the max heap. Min heap will hold the larger numbers
  [1,2,3,4,5,6]
  max heap: [3,1,2]
  min heap: [4,5,6]
  neither heap is guaranteed to be sorted, but the tops each will represent the numbers closest to the middle of a sorted array. This will hold true regardless of the order the numbers come in from the data stream.

When balancing the heaps:
It is simpler to consistently add to one heap and then balance. So we will add to the max heap first. We can compare the sizes of the two heaps. If the difference is greater than 1, take one from the bigger sized heap and move it to the smaller sized heap.

Finding the median will require comparing the sizes of the heaps. If sizes are equivalent, we have an even length list and need to average the top of each. Otherwise we can take the top of the larger sized heap.

**implementation**

```python
import heapq
class MedianFinder:

    def __init__(self):
        self.lowerHalf = [] # max heap
        self.upperHalf = [] # min heap

    def addNum(self, num: int) -> None:
        if not self.lowerHalf or -1*self.lowerHalf[0] >= num:
            heapq.heappush(self.lowerHalf, -1 * num)
        else:
            heapq.heappush(self.upperHalf, num)

        if abs(len(self.lowerHalf) - len(self.upperHalf)) > 1:
            if len(self.lowerHalf) > len(self.upperHalf):
                rebalance = -1 * heapq.heappop(self.lowerHalf)
                heapq.heappush(self.upperHalf, rebalance)
            else:
                rebalance = -1 * heapq.heappop(self.upperHalf)
                heapq.heappush(self.lowerHalf, rebalance)

    def findMedian(self) -> float:
        if len(self.lowerHalf) == len(self.upperHalf):
            return (-1 * self.lowerHalf[0] + self.upperHalf[0])/2
        else:
            if len(self.lowerHalf) > len(self.upperHalf):
                return -1 * self.lowerHalf[0]
            return self.upperHalf[0]

```

```javascript
class Heap {
  constructor(func) {
    this.heap = [];
    this.func = func;
  }
  siftDown(idx, end, heap) {
    let child1 = idx * 2 + 1;
    while (child1 <= end) {
      let child2 = idx * 2 + 2 <= end ? idx * 2 + 2 : -1;
      let swapIdx;
      if (child2 !== -1 && this.shouldSwap(child2, child1)) {
        swapIdx = child2;
      } else {
        swapIdx = child1;
      }
      if (this.shouldSwap(swapIdx, idx)) {
        this.swap(swapIdx, idx, heap);
        idx = swapIdx;
        child1 = idx * 2 + 1;
      } else return;
    }
  }
  siftUp(idx, heap) {
    let parent = Math.floor((idx - 1) / 2);
    while (idx > 0 && this.shouldSwap(idx, parent)) {
      this.swap(idx, parent, heap);
      idx = parent;
      parent = Math.floor((idx - 1) / 2);
    }
  }
  peek() {
    return this.heap[0];
  }
  poll() {
    this.swap(0, this.heap.length - 1, this.heap);
    let valueToReturn = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return valueToReturn;
  }
  offer(val) {
    this.heap.push(val);
    this.siftUp(this.heap.length - 1, this.heap);
  }
  isEmpty() {
    return this.heap.length === 0;
  }
  size() {
    return this.heap.length;
  }
  swap(i, j, heap) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
  }
  shouldSwap(idx1, idx2) {
    return this.func(this.heap[idx1], this.heap[idx2]);
  }
}

class MedianFinder {
  constructor() {
    this.lowerHalf = new Heap((a, b) => a > b);
    this.upperHalf = new Heap((a, b) => a < b);
  }
  addNum(num) {
    if (this.lowerHalf.isEmpty() || this.lowerHalf.peek() >= num) {
      this.lowerHalf.offer(num);
    } else {
      this.upperHalf.offer(num);
    }
    if (Math.abs(this.lowerHalf.size() - this.upperHalf.size()) > 1) {
      if (this.lowerHalf.size() > this.upperHalf.size())
        this.upperHalf.offer(this.lowerHalf.poll());
      else this.lowerHalf.offer(this.upperHalf.poll());
    }
  }
  findMedian() {
    if (this.lowerHalf.size() === this.upperHalf.size()) {
      return (this.lowerHalf.peek() + this.upperHalf.peek()) / 2;
    } else {
      return this.lowerHalf.size() > this.upperHalf.size()
        ? this.lowerHalf.peek()
        : this.upperHalf.peek();
    }
  }
}
```

**complexity**

- Time complexity: Overall time complexity is O(log N). There can be mutliple heap pushes and pops. Finding the median is O(1)

- Space complexity: O(N) for N numbers. Both heaps will hold a total of N elements
