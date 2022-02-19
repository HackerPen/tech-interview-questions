## Solution for Search in a Rotated Sorted Array


### Approach 1: Binary Search

**algorithm**

- find index where it is rotated

- given a rotation pivot, compare each partition between first element and rotation pivot and rotation pivot to end to determine which range contains target.

- binary search the partition for the target

**implementation**

```java
class Solution {
    public int searchFor(int[] nums, int target) {
        if (nums.length == 0) return -1;
        int left = 0;
        int right = nums.length-1;
        while (left < right){
            int mid = left + (right-left)/2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < nums[right]){ // sorted right of mid
                right = mid;
            } else { // sorted left of mid
                left = mid + 1;
            }
        }
        int start = left;
        left = 0;
        right = nums.length-1;
        if (target <= nums[right]) {
            // target on right side
            left = start;
        } else {
            //target on left side of start
            right = start-1;
        }
        while (left <= right){
            int mid = left + (right-left)/2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target){
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}
```

**complexity**

- Time complexity: O(log N)

- Space complexity: O(1)

### Approach 2: Binary Search in one pass

**algorithm**

- make conditional checks while binary searching to narrow each partition.
- if array[mid] is the target, return index
- otherwise, either the partition to the left or to the right is sorted. compare mid to left element to see which partition is sorted
- if target is located in sorted partition, search there
- else search in other partition

- as with any binary search, find mid with left + (right-left)//2 to avoid integer overflow

**implementation**

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        if not nums: return -1
        left, right = 0, len(nums)-1
        while left <= right:
            mid = left + (right-left)//2
            if nums[mid] == target: return mid
            if nums[mid] >= nums[left]:
                if nums[mid] > target and target >= nums[left]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if nums[mid] < target and target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        return -1
```

```javascript
const searchFor = (nums, target) => {
    if (nums === null || nums.length === 0) return -1;
    let left = 0, right = nums.length-1;
    while (left <= right){
        let mid = left + Math.floor((right-left)/2);
        if (nums[mid] === target) return mid; // can no exclude target === nums[mid]
        if (nums[mid] >= nums[left]){ // if left side is sorted. NEEDS TO CHECK >= in case of 2 elements, needs to be ==
            if (target >= nums[left] && target < nums[mid]) right = mid - 1; // include left, exclude mid. if target in range, search here.
            else left = mid + 1;
        } else { // left side not sorted, check right side then. include right, exclude mid, target in range? search here.
            if (target > nums[mid] && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}
```

**complexity**

- Time complexity: O(log N)

- Space complexity: O(1)
