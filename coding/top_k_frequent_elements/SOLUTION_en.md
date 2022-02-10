``## Solution for Top K Frequent Elements


### Approach 1: Heap

**algorithm**

If k < N for N elements, a heap approach can have O(N log k) time complexity

 - build a hashmap with key->value pairs of element -> frequency. O(N) time needed to iterate through the list. O(N) space for the hashmap
 - build a heap of size k. Iterate through the hashmap and add each element to the heap. Adding first k elements is O(k) in average case and O(k log k) in the worst case. Time complexity of push/pop of heap of size k is O(log k). Adding the remaining (N-k) elements will take O((N-k) log k) time. As N gets large, the overall time complexity will be O(k log k) + O(N log k - k log k) which simplifies to O(N log k)
 - convert elements in heap to desired output. O(k log k) time to convert entire heap



**implementation**
# In Python heapq library provides our heap structure. heapq sorts tuples by first item in tuple

```python
import heapq
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        if k == len(nums):
            return nums
        # build frequency mapping
        freq_map = {}
        for num in nums:
            if num in freq_map:
                freq_map[num] += 1
            else:
                freq_map[num] = 1

        min_heap = []
        for num, count in freq_map.items():
            if len(min_heap) < k:
                heapq.heappush(min_heap, (count, num))
            else:
                # heap size >= k. pop smaller of top and current (num,count)
                heapq.heappushpop(min_heap, (count, num))

        return [num for count, num in min_heap]
```

# In JavaScript, there is no Heap data structure. One is provided here. A custom comparator function should be passed in when instantiated.
```javascript
class Heap{
    constructor(func){
        this.heap = [];
        this.func = func;
    }
    siftDown(idx,end,heap){
        let child1 = idx*2+1;
        while (child1 <= end){
            let child2 = idx*2+2 <= end ? idx*2+2 : -1;
            let swapIdx;
            if (child2 !== -1 && this.shouldSwap(child2,child1)){
                swapIdx = child2;
            } else {
                swapIdx = child1;
            }
            if (this.shouldSwap(swapIdx,idx)){
                this.swap(swapIdx,idx,heap);
                idx = swapIdx;
                child1 = idx*2+1;
            } else return;
        }
    }
    siftUp(idx, heap){
        let parent = Math.floor((idx-1)/2);
        while (idx > 0 && this.shouldSwap(idx,parent)){
            this.swap(idx,parent,heap);
            idx = parent;
            parent = Math.floor((idx-1)/2);
        }
    }
    peek(){
        return this.heap[0];
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
    isEmpty(){
        return this.heap.length === 0;
    }
    size(){
        return this.heap.length;
    }
    swap(i,j,heap){
        [heap[i],heap[j]] = [heap[j],heap[i]];
    }
    shouldSwap(idx1,idx2){
        return this.func(this.heap[idx1],this.heap[idx2]);
    }
}
```

```javascript
const topKFrequent = (nums, k) => {
    if (nums === null || nums.length === 0) return []
    const freq = new Map(), minHeap = new Heap((a,b) => a[1] < b[1]);
    // map frequency of each element
    nums.forEach(num => freq.set(num, (freq.get(num) || 0) + 1));
    // fill heap
    for (const [num,count] of freq){
        minHeap.offer([num, count]);
        if (minHeap.size() > k) minHeap.poll()
    }
    // empty heap
    const topK = [];
    while (!minHeap.isEmpty()) topK.push(minHeap.poll()[0]);
    return topK;
}
```

**complexity**

* Time complexity: O(N log k) for N elements. Unique case of k = N will be O(N log N)

* Space complexity: O(N + k) for hashmap + heap.

### Approach 2: Hashmap + Counting Sort

**algorithm**

The bottleneck in approach 1 is the heap. With careful counting, we can approach a linear solution. A hashmap can be mapped to a list that utilizes its indices for the frequency of the element.

 - build a hashmap with key->value pairs of element -> frequency. O(N) time needed to iterate through the list. O(N) space for the hashmap

 - convert hashmap entries to a list of size N+1 for N elements. No element will have a count greater than N+1. So every element will fit into a bucket whose index in the list represents the frequency in the hashmap. If we have {"a":2} in our hashamp, our list will have [[],[],["a"]]
 - iterate through bucket in reverse, selecting elements by greatest frequency.

**implementation**

```python
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        if k == n:
            return nums

        freq_map = {}
        for num in nums:
            if num in freq_map:
                freq_map[num] += 1
            else:
                freq_map[num] = 1

        counting_bucket = [None for i in range(n+2)]
        for num,count in freq_map.items():
            if counting_bucket[count] == None:
                counting_bucket[count] = []
            counting_bucket[count].append(num)

        index = n+1
        most_freq = []
        while index >= 0 and len(most_freq) < k:
            if counting_bucket[index] != None:
                for num in counting_bucket[index]:
                    most_freq.append(num)
            index -= 1

        return most_freq
```

```javascript
const topKFrequent = (nums, k) => {
    const freqMap = new Map();
    const bucket = new Array(nums.length+1).fill(null);
    const topK = [];

    for (const num of nums){
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    for (const [num,frequency] of freqMap){
        if (bucket[frequency] === null){
            bucket[frequency] = [];
        }
        bucket[frequency].push(num);
    }

    for (let i = bucket.length-1; i >= 0; i--){
        if (bucket[i] !== null) topK.push(...bucket[i]);
        if (topK.length === k) break;
    }
    return topK;
}
```

**complexity**

* Time complexity: O(N) for N elements. O(N) to build the hashmap, O(N) to map N entries to a list, O(k) to convert to output

* Space complexity: O(N) for N elements. O(N) for hashmap + O(N) for bucket list.
