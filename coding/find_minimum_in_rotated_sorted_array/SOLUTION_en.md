## Solution for Find Minimum in Rotated Sorted Array

Brute force is to search the entire array. O(N) for N elements. But this won't take advantage of the nearly sorted state of the array.

### Approach 1: Binary Search

**algorithm**

Since we are dealing with unique elements in a nearly sorted array, we can use a modified binary search.

- test if array is rotated by comparing first and last elements.  If it is not rotated, we know the minimum element is first element and can return it

If the array is rotated, we binary search. We are looking for the first unsorted mid element.
- the mid in binary search could be the smallest number, so we have to make sure we include it in the search space OR evaluate it before continuing. Compare the mid to its direct left and right elements to see if either pair is in an unsorted state. If so, the smaller unmber is the minimum.  if mid > mid+1, our mid+1 is the minimum.  if mid-1 > mid, our mid is the minimum
- otherwise, compare the mid to the left element. If mid is larger than left, we know the left section is sorted. Since we are looking for the minimum, we can cut the search space in half and only search the right side.
- if mid is smaller than the left, we can search the left half.

- when calculating the mid, we use left + (right-left)//2 to guard against interger overflow

**implementation**

```python
class Solution:
    def findMinimum(self, nums: List[int]) -> int:
        if len(nums) <= 1 or nums[0] < nums[-1]:
            return nums[0]
        left, right = 0, len(nums)-1
        while left <= right:
            mid = left + (right-left)//2
            # evaluate mid
            if nums[mid] > nums[mid+1]:
                return nums[mid+1]
            if nums[mid-1] > nums[mid]:
                return nums[mid]
            # evaluate which side to search
            if nums[mid] > nums[left]:
                left = mid + 1
            else:
                right = mid - 1
        return -1
```

```java
class Solution {
    public int findMinimum(int[] nums) {
        if (nums == null || nums.length == 0) return -1;
        if (nums.length == 1) return nums[0];
        if (nums[0] < nums[nums.length-1]) return nums[0];

        int left = 0;
        int right = nums.length-1;
        while (left <= right){
            int mid = left + (right-left)/2;
            if (nums[mid] > nums[mid+1]) return nums[mid+1];
            if (nums[mid] < nums[mid-1]) return nums[mid];

            if (nums[mid] > nums[left]){
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}
```

```javascript
const findMinimum = nums => {
    if (nums.length <= 1 || nums[0] < nums[nums.length-1]) return nums[0];
    let left = 0, right = nums.length-1;
    while (left <= right){
        let mid = left + Math.floor((right-left)/2);
        if (nums[mid] > nums[mid+1]) return nums[mid+1];
        if (nums[mid-1] > nums[mid]) return nums[mid];
        if (nums[mid] > nums[left]) left = mid + 1;
        else right = mid - 1;
    }
    return nums[left];
}
```

**complexity**

- Time complexity: O(log N) for binary search

- Space complexity: O(1) for pointers
