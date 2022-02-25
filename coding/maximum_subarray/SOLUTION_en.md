## Solution for maximum subarray


### Approach 1: Brute Force

**algorithm**

- Initialize a variable `maxSubarray = -infinity` to keep track of the best subarray. We need to use negative infinity, not 0, because it is possible that there are only negative numbers in the array.
- Use a for loop that considers each index of the array as a starting point.
- For each starting point, create a variable currentSubarray = 0. Then, loop through the array from the starting index, adding each element to currentSubarray. Every time we add an element it represents a possible subarray - so continuously update maxSubarray to contain the maximum out of the currentSubarray and itself.
- Return maxSubarray.

**implementation**

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int maxSubarray = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            int currentSubarray = 0;
            for (int j = i; j < nums.length; j++) {
                currentSubarray += nums[j];
                maxSubarray = Math.max(maxSubarray, currentSubarray);
            }
        }

        return maxSubarray;
    }
}
```

**complexity analysis:**

* Time complexity: `O(N^2)`, where `N` is the length of `nums`. We use 2 nested for loops, with each loop iterating through `nums`.
* Space complexity: `O(1)`. No matter how big the input is, we are only ever using 2 variables: ans and currentSubarray.

### Approach 1: Dynamic Programming

**algorithm**

- Initialize 2 integer variables. Set both of them equal to the first value in the array.
  - `currentSubarray` will keep the running count of the current subarray we are focusing on.
  - `maxSubarray` will be our final return value. Continuously update it whenever we find a bigger subarray.
- Iterate through the array, starting with the 2nd element (as we used the first element to initialize our variables). For each number, add it to the `currentSubarray` we are building. If `currentSubarray` becomes negative, we know it isn't worth keeping, so throw it away. Remember to update `maxSubarray` every time we find a new maximum.
- Return maxSubarray.

**implementation**

```java
class Solution {
    public int maxSubArray(int[] nums) {
        // Initialize our variables using the first element.
        int currentSubarray = nums[0];
        int maxSubarray = nums[0];

        // Start with the 2nd element since we already used the first one.
        for (int i = 1; i < nums.length; i++) {
            int num = nums[i];
            // If current_subarray is negative, throw it away. Otherwise, keep adding to it.
            currentSubarray = Math.max(num, currentSubarray + num);
            maxSubarray = Math.max(maxSubarray, currentSubarray);
        }

        return maxSubarray;
    }
}
```

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Initialize our variables using the first element.
        current_subarray = max_subarray = nums[0]

        # Start with the 2nd element since we already used the first one.
        for num in nums[1:]:
            # If current_subarray is negative, throw it away. Otherwise, keep adding to it.
            current_subarray = max(num, current_subarray + num)
            max_subarray = max(max_subarray, current_subarray)

        return max_subarray
```
