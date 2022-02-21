## Solution for Merge Two Sorted Linked Lists


### Approach 1: Recursive

**algorithm**

Base case is when either list is null. Return the non null list.
Else, find the smaller value at the heads of both lists. This will be the next value of the merged list. Recursively call on the next node and the other list.

**implementation**

```javascript
const mergeTwoLists = (l1,l2) => {
    if (l1 === null) return l2;
    if (l2 === null) return l1;

    let cur;
    if (l1.val <= l2.val){
        cur = l1;
        cur.next = mergeTwoLists(l1.next, l2);
    } else {
        cur = l2;
        cur.next = mergeTwoLists(l1, l2.next);
    }

    return cur;
}
```

**complexity**

* Time complexity: O(m+n) for lists of length m and n. There will be one recursive calls per node in both lists

* Space complexity: O(m+n) Recursive call stack will be one for each node. So m+n total calls


### Approach 2: Iteration

**algorithm**

- set up a sentinel node to start the merged list
- while both lists are not null, compare each head of list to see which is smaller and set next to smaller value.
- increment pointers to move ahead in the linked list
- at most one linked list will not be null. Connect remaining non null linked list

**implementation**

```python
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        if not list1: return list2
        if not list2: return list1
        sentinel = ListNode(-1)
        cur = sentinel
        while list1 and list2:
            if list1.val <= list2.val:
                cur.next = list1
                list1 = list1.next
            else:
                cur.next = list2
                list2 = list2.next
            cur = cur.next
        if not list1: cur.next = list2
        if not list2: cur.next = list1

        return sentinel.next
```

```java
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode sentinel = new ListNode(-1);
        ListNode prev = sentinel;

        while (l1 != null && l2 != null){
            if (l1.val <= l2.val){
                prev.next = l1;
                l1 = l1.next;
            } else {
                prev.next = l2;
                l2 = l2.next;
            }
            prev = prev.next;
        }
        prev.next = l1 == null ? l2 : l1;

        return sentinel.next;
    }
}
```

```javascript
const mergeTwoLists = (l1,l2) => {
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    const sentinel = new ListNode(null);
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
    if (l1 === null) cur.next = l2;
    if (l2 === null) cur.next = l1;

    return sentinel.next;
}
```

**complexity**

* Time complexity: O(m+n) each node is traversed once.

* Space complexity: O(1) for pointers
