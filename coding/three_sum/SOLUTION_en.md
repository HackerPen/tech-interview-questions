## Solution for Three Sum

### Approach 1: Two Pointers

**algorithm**

Keep one number fixed using a for loop, and then use two pointers pattern from Two Sum. To use two pointers pattern, we need the array to be sorted. Sorting the array takes O(n log n) time for n elements in the array. As we are using two nested loops, the overall time complexity remains O(n^2).

corner cases to consider:
* null/empty input
* duplicates
* this is a problem with a lot of variations such as summing to a different target, not allowing to sort, etc
* if using built in sort, it will be good to know language's built in sort algorithm

**implementation**

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        if not nums:
            return []
        triplets = []
        n = len(nums)
        nums.sort()
        for i in range(n-2):
            if i > 0 and nums[i] == nums[i-1]: continue
            j, k = i + 1, n - 1
            while j < k:
                sum = nums[i] + nums[j] + nums[k]
                if sum == 0:
                    triplets.append([nums[i], nums[j], nums[k]])
                    j += 1
                    k -= 1
                    while j < k and nums[j] == nums[j-1]: j += 1
                elif sum < 0:
                    j += 1
                else:
                    k -= 1

        return triplets
```

```javascript
const threeSum = nums => {
  if (nums === null || nums.length < 3) return [];
  const triplets = [], n = nums.length;
  nums.sort((a,b) => a-b);
  for (let i = 0; i < n-2; i++){
      if (i > 0 && nums[i] === nums[i-1]) continue;
      let j = i + 1, k = n-1;
      while (j < k){
          let sum = nums[i] + nums[j] + nums[k];
          if (sum === 0){
              triplets.push([nums[i], nums[j], nums[k]]);
              j++;
              while (nums[j] === nums[j-1]) j++;
          } else if (sum < 0){
              j++;
              while (nums[j] === nums[j-1]) j++;
          } else {
              k--;
              while (nums[k] === nums[k+1]) k--;
          }
      }
  }

  return triplets;
}
```

***complexity***

* Time complexity: O(n log n + n^2). This is asymptotically O(n^2)

* Space complexity: O(log n) for recursive stack space of sorting algorithm. O(1) for pointers


