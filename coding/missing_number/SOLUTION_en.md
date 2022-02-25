## Solution for Missing Number


### Approach 1: Sorting

**algorithm**

If `nums` were in order, it would be easy to see which number is missing.

First, we sort nums. Then, we check the two special cases that can be handled in constant time - ensuring that 0 is at the beginning and that n is at the end. Given that those assumptions hold, the missing number must somewhere between (but not including) 0 and n. To find it, we ensure that the number we expect to be at each index is indeed there. Because we handled the edge cases, this is simply the previous number plus 1. Thus, as soon as we find an unexpected number, we can simply return the expected number.


**implementation**

```python
class Solution:
    def missingNumber(self, nums):
        nums.sort()

        # Ensure that n is at the last index
        if nums[-1] != len(nums):
            return len(nums)
        # Ensure that 0 is at the first index
        elif nums[0] != 0:
            return 0

        # If we get here, then the missing number is on the range (0, n)
        for i in range(1, len(nums)):
            expected_num = nums[i-1] + 1
            if nums[i] != expected_num:
                return expected_num
```

**complexity**

Time complexity: `O(NlogN)`. The only elements of the algorithm that have asymptotically nonconstant time complexity are the main for loop (which runs in O(N) time), and the sort invocation (which runs in O(NlogN) time for Python and Java). Therefore, the runtime is dominated by sort, and the entire runtime is O(NlogN).

Space complexity: `O(1) or O(N)`. In the sample code, we sorted `nums` in place, allowing us to avoid allocating additional space. If modifying nums is forbidden, we can allocate an `O(N)` size copy and sort that instead.

### Approach 2: HashSet

**algorithm**

A brute force method for solving this problem would be to simply check for the presence of each number that we expect to be present. The naive implementation might use a linear scan of the array to check for containment, but we can use a HashSet to get constant time containment queries and overall linear runtime.

**implementation**

```python
class Solution:
    def missingNumber(self, nums):
        num_set = set(nums)
        n = len(nums) + 1
        for number in range(n):
            if number not in num_set:
                return number
```

**complexity**

Time complexity: `O(n)`. Because the set allows for O(1) containment queries, the main loop runs in O(n) time. Creating num_set costs O(n) time, as each set insertion runs in amortized O(1) time, so the overall runtime is O(n+n)=O(n).

Space complexity: `O(N)`. `nums` contains `n−1` distinct elements, so it costs `O(n)` space to store a set containing all of them.
