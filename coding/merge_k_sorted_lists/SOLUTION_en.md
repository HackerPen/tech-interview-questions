## Solution for Merge k Sorted Lists


### Approach 1: Brute Force

**algorithm**

 - traverse each linked list and accumulate node values in a list
 - sort values
 - iterate through sorted values and build a new linked list

**implementation**

```javascript
const mergeKLists = (lists) => {
    if (lists.length === 0 || lists === null) return null;
    const mergedArr = [];
    const sentinel = new ListNode(-1);

    for (const list of lists){
        let cur = list;
        while (cur !== null){
            mergedArr.push(cur.val);
            cur = cur.next;
        }
    }

    let cur = sentinel;
    mergedArr.sort((a,b) => a - b);

    mergedArr.forEach(nodeValue => {
        const newNode = new ListNode(nodeValue);
        cur.next = newNode;
        cur = cur.next;
    })

    return sentinel.next;
};
```

**complexity**

* Time complexity: O(N log N) for sorting algorithm. O(N) to iterate through N total nodes. O(N) to iterate through all sorted values to create new linnked list

* Space complexity: O(N) to create new sorted list and build out new linked list. O(log N) recursive stack space for sorting algorithm

### Approach 2: Heap

**algorithm**

 - traverse each linked list and accumulate node values min heap
 - create new linked list while emptying heap

**implementation**
# In Python heapq library provides our heap structure. heapq sorts tuples by first item in tuple

```python
import heapq
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists: return None
        pq = []

        for lst in lists:
            cur = lst
            while cur:
                heapq.heappush(pq, cur.val)
                cur = cur.next
        sentinel = ListNode(-1)
        cur = sentinel
        while len(pq):
            cur.next = ListNode(heapq.heappop(pq))
            cur = cur.next

        return sentinel.next
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
const mergeKLists = (lists) => {
    if (lists === null || lists.length === 0) return null;
    const pq = new Heap((a,b) => a < b);
    for (const ll of lists){
        let cur = ll
        while (cur !== null){
            pq.offer(cur.val);
            cur = cur.next;
        }
    }

    const sentinel = new ListNode(-1);
    let cur = sentinel;
    while (!pq.isEmpty()){
        cur.next = new ListNode(pq.poll());
        cur = cur.next;
    }
    return sentinel.next;
}
```

**complexity**

* Time complexity: O(N log k) for N elements and k linked lists. Every push and pop in heap is O(log k)

* Space complexity: O(N) to create new linked list. O(N) for heap space


### Approach 3: Merge lists one by one

**algorithm**

 - merge two lists at a time. With k lists, we will make k-1 merges.

**implementation**

```python
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists: return None
        root = lists[0]
        for i in range(1,len(lists)):
            root = self.merge(root, lists[i])

        return root

    def merge(self, l1: List[Optional[ListNode]], l2: List[Optional[ListNode]]) -> Optional[ListNode]:
        sentinel = ListNode(-1)
        cur = sentinel
        while l1 and l2:
            if l1.val <= l2.val:
                cur.next = l1
                l1 = l1.next
            else:
                cur.next = l2
                l2 = l2.next
            cur = cur.next
        if not l1: cur.next = l2
        if not l2: cur.next = l1

        return sentinel.next
```

```javascript
const mergeKLists = lists => {
    if (lists === null || lists.length === 0) return null;
    let root = lists[0];

    for (let i = 1; i < lists.length; i++){
       root = merge(root, lists[i]);
    }
    return root

    function merge(l1, l2){
        if (l1 === null) return l2;
        if (l2 === null) return l1;

        const sentinel = new ListNode(0);
        let cur = sentinel;
        while (l1 !== null && l2 !== null){
            if (l1.val <= l2.val){
                cur.next = l1;
                l1 = l1.next;
            } else {
                cur.next = l2;
                l2 = l2.next;
            }
            cur = cur.next;
        }
        cur.next = l1 === null ? l2 : l1;
        return sentinel.next;
    }
}
```

**complexity**

* Time complexity: O(kN) for k lists and N nodes.

* Space complexity: O(1) since merges are all in O(1) space

### Approach 4: Divide and Conquer

**algorithm**

 - merge two lists at a time. Rather than merging the first list repeatedly, pair the lists and merge each pair. In this way, k lists are merged into k/2lists. And merge space halves continuously until 1 list remains.

**implementation**

```python
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists: return None

        while len(lists) > 1:
            lists.append(self.merge(lists.pop(0),lists.pop(0)))

        return lists[0]

    def merge(self, l1: List[Optional[ListNode]], l2: List[Optional[ListNode]]) -> Optional[ListNode]:
        sentinel = ListNode(-1)
        cur = sentinel
        while l1 and l2:
            if l1.val <= l2.val:
                cur.next = l1
                l1 = l1.next
            else:
                cur.next = l2
                l2 = l2.next
            cur = cur.next
        if not l1: cur.next = l2
        if not l2: cur.next = l1

        return sentinel.next
```

```javascript
const mergeKLists = lists => {
    if (lists === null || lists.length === 0) return null;
    const merge = (l1,l2) => {
        let sentinel = new ListNode();
        let cur = sentinel;
        while (l1 && l2){
            if (l1.val <= l2.val){
                cur.next = l1;
                l1 = l1.next;
            } else {
                cur.next = l2;
                l2 = l2.next;
            }
            cur = cur.next;
        }
        cur.next = l1 === null ? l2 : l1;
        return sentinel.next;
    }

    while (lists.length > 1){
        lists.push(merge(lists.shift(), lists.shift()));
    }
    return lists[0];
}
```

**complexity**

* Time complexity: O(N log k) for k lists and N nodes.

* Space complexity: O(1) since merges are all in O(1) space
