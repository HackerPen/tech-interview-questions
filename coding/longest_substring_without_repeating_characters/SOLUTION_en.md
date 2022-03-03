## Solution for Longest Substring Without Repeating Characters


### Approach 1: Brute Force

**algorithm**

Suppose we have a function boolean `allUnique(String substring`) which will return true if the characters in the substring are all unique, otherwise false. We can iterate through all the possible substrings of the given string `s` and call the function `allUnique`. If it turns out to be true, then we update our answer of the maximum length of substring without duplicate characters.

Now let's fill the missing parts:

1. To enumerate all substrings of a given string, we enumerate the start and end indices of them. Suppose the start and end indices are `i` and `j`, respectively. Then we have `0 <= i <= j <= n` (here end index `j` is exclusive by convention). Thus, using two nested loops with `i` from `0` to `n - 1` and `j` from `i+1` to `n`, we can enumerate all the substrings of `s`.

2. To check if one string has duplicate characters, we can use a set. We iterate through all the characters in the string and put them into the `set` one by one. Before putting one character, we check if the set already contains it. If so, we return `false`. After the loop, we return `true`.

**implementation**

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        def check(start, end):
            chars = [0] * 128
            for i in range(start, end + 1):
                c = s[i]
                chars[ord(c)] += 1
                if chars[ord(c)] > 1:
                    return False
            return True

        n = len(s)

        res = 0
        for i in range(n):
            for j in range(i, n):
                if check(i, j):
                    res = max(res, j - i + 1)
        return res
```

```java
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length();

        int res = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                if (checkRepetition(s, i, j)) {
                    res = Math.max(res, j - i + 1);
                }
            }
        }

        return res;
    }

    private boolean checkRepetition(String s, int start, int end) {
        int[] chars = new int[128];

        for (int i = start; i <= end; i++) {
            char c = s.charAt(i);
            chars[c]++;
            if (chars[c] > 1) {
                return false;
            }
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int n = s.length();

        int res = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                if (checkRepetition(s, i, j)) {
                    res = max(res, j - i + 1);
                }
            }
        }

        return res;
    }

    bool checkRepetition(string& s, int start, int end) {
        vector<int> chars(128);

        for (int i = start; i <= end; i++) {
            char c = s[i];
            chars[c]++;
            if (chars[c] > 1) {
                return false;
            }
        }

        return true;
    }
};
```

**complexity**

Time complexity: `O(N^3)`
Space complexity: `O(min(N, M))`. We need `O(k)` space for checking a substring has no duplicate characters, where `k` is the size of the Set. The size of the Set is upper bounded by the size of the string `n` and the size of the charset/alphabet `m`.

### Approach 2: Sliding Window

**algorithm**

In the naive approaches, we repeatedly check a substring to see if it has duplicate character. But it is unnecessary. If a substring `s_ij` from index `i` to `j - 1` is already checked to have no duplicate characters. We only need to check if `s[j]` is already in the substring `s_ij`.
​
To check if a character is already in the substring, we can scan the substring, which leads to an `O(n^2)` algorithm. But we can do better.

By using HashSet as a sliding window, checking if a character in the current can be done in O(1)O(1).

A sliding window is an abstract concept commonly used in array/string problems. A window is a range of elements in the array/string which usually defined by the start and end indices, i.e. `[i,j)` (left-closed, right-open). A sliding window is a window "slides" its two boundaries to the certain direction. For example, if we slide `[i,j)` to the right by `1` element, then it becomes `[i+1, j+1)`(left-closed, right-open).

Back to our problem. We use HashSet to store the characters in current window `[i, j)` (j=i initially). Then we slide the index `j` to the right. If it is not in the HashSet, we slide `j` further. Doing so until `s[j]` is already in the HashSet. At this point, we found the maximum size of substrings without duplicate characters start with index `i`. If we do this for all `i`, we get our answer.

**implementation**
```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        chars = [0] * 128

        left = right = 0

        res = 0
        while right < len(s):
            r = s[right]
            chars[ord(r)] += 1

            while chars[ord(r)] > 1:
                l = s[left]
                chars[ord(l)] -= 1
                left += 1

            res = max(res, right - left + 1)

            right += 1
        return res
```

```java
public class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] chars = new int[128];

        int left = 0;
        int right = 0;

        int res = 0;
        while (right < s.length()) {
            char r = s.charAt(right);
            chars[r]++;

            while (chars[r] > 1) {
                char l = s.charAt(left);
                chars[l]--;
                left++;
            }

            res = Math.max(res, right - left + 1);

            right++;
        }
        return res;
    }
}
```

**complexity**
Time complexity : `O(2n) = O(n)`. In the worst case each character will be visited twice by `i` and `j`.

Space complexity : `O(min(m, n))`. Same as the previous approach. We need `O(k)` space for the sliding window, where `k` is the size of the Set. The size of the Set is upper bounded by the size of the string `n` and the size of the charset/alphabet `m`.
