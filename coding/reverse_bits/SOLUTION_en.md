## Solution for Reverse Bit

### Approach 1: Bit by Bit

**algorithm**

Though the question is not difficult, it often serves as a warm-up question to kick off the interview. The point is to test one's basic knowledge on data type and bit operations.

We iterate through the bit string of the input integer, from right to left (i.e. n = n >> 1). To retrieve the right-most bit of an integer, we apply the bit AND operation `(n & 1)`.

For each bit, we reverse it to the correct position (i.e. (n & 1) << power). Then we accumulate this reversed bit to the final result.

When there is no more bits of one left (i.e. n == 0), we terminate the iteration.

**implementation**

```python
class Solution:
    # @param n, an integer
    # @return an integer
    def reverseBits(self, n):
        ret, power = 0, 31
        while n:
            ret += (n & 1) << power
            n = n >> 1
            power -= 1
        return ret
```

```go
func reverseBits(num uint32) uint32 {
    ret := uint32(0)
    power := uint32(31)
    for num != 0 {
        ret += (num & 1) << power
        num = num >> 1
        power -= 1
    }
    return ret
}
```

```cpp
class Solution {
  public:
  uint32_t reverseBits(uint32_t n) {
    uint32_t ret = 0, power = 31;
    while (n != 0) {
      ret += (n & 1) << power;
      n = n >> 1;
      power -= 1;
    }
    return ret;
  }
};
```

**complexity**

Time complexity: `O(1)`. Though we have a loop in the algorithm, the number of iteration is fixed regardless the input, since the integer is of fixed-size (32-bits) in our problem.

Space complexity: `O(1)`. The consumption of memory is constant regardless the input.
