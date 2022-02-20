## Solution for Contains Duplicate


### Approach 1: brute force

**algorithm**

For every element, compare to every other element

**implementation**

```java
public boolean hasDuplicate(int[] nums) {
    for (int i = 0; i < nums.length; ++i) {
        for (int j = 0; j < i; ++j) {
            if (nums[j] == nums[i]) return true;
        }
    }
    return false;
}
```
**Complexity Analysis**

- Time complexity: O(N^2) for N elements
- Space complexity: O(1)

### Approach 2: Sort

**algorithm**

Sort array ascending. Compare each element to the element to its following element.

Make sure you're allowed to modify the input. Otherwise, make a copy and sort for this solution.

**implementation**

```java
public boolean hasDuplicate(int[] nums) {
    Arrays.sort(nums);
    for (int i = 0; i < nums.length - 1; ++i) {
        if (nums[i] == nums[i + 1]) return true;
    }
    return false;
}
```
**Complexity Analysis**

- Time complexity: O(N log N) for sorting N elements, O(N) to search. O(N log N) dominates
- Space complexity: O(log N) for recursive stack space of sort algorithm



### Approach 3: Hash Set

**algorithm**

What data structure has fast search and insert? Hash Set is perfect when dealing with duplicates.
Iterate through the array and check if we've already seen it. Otherwise add to hash set and keep checking. If we've iterated through the whole array without finding a duplicate, we can return false.

- make sure we use a hash set here instead of a hash table as there is no need for payload.
**implementation**

```python

class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        hash_set = set()
        for num in nums:
            if num in hash_set:
                return True
            hash_set.add(num)
        return False
```

```java
public boolean hasDuplicate(int[] nums) {
    Set<Integer> set = new HashSet<>(nums.length);
    for (int x: nums) {
        if (set.contains(x)) return true;
        set.add(x);
    }
    return false;
}
```

```javascript
const hasDuplicate = nums => {
    const hashSet = new Set();
    for (const num of nums){
        if (hashSet.has(num)) return true;
        hashSet.add(num);
    }
    return false;
}
```

**Complexity Analysis**

- Time complexity: O(N) for sorting N elements, O(N) to search. O(N log N) dominates
- Space complexity: O(N) for recursive stack space of sort algorithm
