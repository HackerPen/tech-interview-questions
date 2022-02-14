## Solution for Valid Anagram

### Approach 1: Sorting

**algorithm**

If we sort both strings, they are anagrams if they are identical. A common corner case is checking string lengths to be equivalent. Also, depending on the interviewer, treatment of capital letters versus lower case letters, as well as extra punctuation and symbols and numbers, can be different and should be clarified before coding.

**implementation**

```python
class Solution:
    def isValidAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t): return False
        return "".join(sorted(s)) == "".join(sorted(t))
```

**complexity**

- Time complexity: O(N log N). For N length of string, sorting will be O(N log N) and comparing string equality will be O(N)

- Space complexity: O(1). Space depends on sorting implementation.


### Approach 2: Hash Table

**algorithm**

For anagrams, both character and character frequency must match. If we're restricted to just letters, an array of size 26 or 52 is enough. Once more elements are included in strings, a hash table is more flexible than allocating a large sized array.

We can reduce space by limiting our hash table to be just one rather than two. We increment frequency for one string and decrement for the other. If character frequencies are equivalent, all values in the hash table will be zero.

Hash table solution provided in python and array solution provided in javascript

**implementation**

```python
class Solution:
    def isValidAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t): return False
        freq_map = {}
        n = len(s)
        for i in range(n):
            if s[i] in freq_map:
                freq_map[s[i]] += 1
            else:
                freq_map[s[i]] = 1
            if t[i] in freq_map:
                freq_map[t[i]] -= 1
            else:
                freq_map[t[i]] = -1

        for char,freq in freq_map.items():
            if freq != 0:
                return False
        return True
```

```javascript
const isValidAnagram = (s, t) => {
    if (s.length !== t.length) return false;
    const charsBucket = new Array(26).fill(0), n = s.length;
    for (let i = 0; i < n; i++){
        const indexCharS = s.charCodeAt(i)-'a'.charCodeAt(0);
        const indexCharT = t.charCodeAt(i)-'a'.charCodeAt(0);
        charsBucket[indexCharS]++;
        charsBucket[indexCharT]--;
    }
    return charsBucket.every(value => value === 0);
}
```

**complexity**

- Time complexity: O(N). For N length of string, we can do 1 pass through both strings simultaneously to update the hash table. 1 more O(N) pass is required to check values in table

- Space complexity: O(1). While we are using space in the hash table, the hash table size stays constant no matter the size of the input. For example, if inputs are only lowercase letters, the hash table never exceeds size of 26. So we are using constant space.
