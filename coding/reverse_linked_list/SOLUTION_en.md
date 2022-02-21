## Solution for Reverse Linked List

### Approach 1: Iterate

**algorithm**

While you traverse the linked list, change current node's next pointer to point to the previous node.
Keep track of next node with a pointer. Store reference to previous node with a pointer. "Walk" forward making sure you move previous pointer to current node and then current node to the next node.

**implementation**

```python
class Solution:
    def reverseLinkedList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head:
            return head
        cur, pre = head, None
        while cur:
            nextNode = cur.next
            cur.next = pre
            pre = cur
            cur = nextNode
        return pre
```

```java
class Solution {
    public ListNode reverseLinkedList(ListNode head) {
        ListNode cur = head;
        ListNode pre = null;
        while (cur != null){
            ListNode nextNode = cur.next;
            cur.next = pre;
            pre = cur;
            cur = nextNode;
        }
        return pre;
    }
}
```

```javascript
const reverseLinkedList = head => {
  if (head === null) return head;
  let cur = head,
    pre = null;
  while (cur !== null) {
    const nextNode = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nextNode;
  }
  return pre;
};
```

**complexity**

- Time complexity: O(N) for N nodes in linked list

- Space complexity: O(1) for pointers
