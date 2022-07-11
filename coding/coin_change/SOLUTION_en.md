## Solution for coin change


### Approach 1: Brute force

**algorithm**

Enumerate all subsets of coin frequencies [x_0..x_(n - 1)] that satisfy the constraints above, compute their sums and return the minimum among them.

To apply this idea, the algorithm uses backtracking technique to generate all combinations of coin frequencies [x_0..x_(n - 1)], which satisfy the constraints above. It makes a sum of the combinations and returns their minimum or -1−1 in case there is no acceptable combination.

**implementation**

```ruby
def coin_change(coins, amount)
  # base case
  if coins.include?(amount)
    return 1
  end
  if coins.min > amount
    return -1
  end

  options = []
  coins.each do |coin|
    subchange = coin_change(coins, amount - coin)
    if subchange != -1
      options.push(subchange + 1)
    end
  end

  if options.empty? then -1 else options.min end
end
```

```java
public class Solution {

  public int coinChange(int[] coins, int amount) {
    return coinChange(0, coins, amount);
  }

  private int coinChange(int idxCoin, int[] coins, int amount) {
    if (amount == 0)
      return 0;
    if (idxCoin < coins.length && amount > 0) {
      int maxVal = amount/coins[idxCoin];
      int minCost = Integer.MAX_VALUE;
      for (int x = 0; x <= maxVal; x++) {
        if (amount >= x * coins[idxCoin]) {
          int res = coinChange(idxCoin + 1, coins, amount - x * coins[idxCoin]);
          if (res != -1)
            minCost = Math.min(minCost, res + x);
        }
      }
      return (minCost == Integer.MAX_VALUE)? -1: minCost;
    }
    return -1;
  }
}
```

**complexity**

Time complexity : O(S^n). In the worst case, complexity is exponential in the number of the coins n.
Space complexity : O(n). In the worst case the maximum depth of recursion is n. Therefore we need O(n) space used by the system recursive stack.

## Approach 2: Top down Dynamic programming with memoization

**algorithm**

* Optimal Substructure
To count the total number of solutions, we can divide all set solutions into two sets.
  - Solutions that do not contain mth coin (or Sm).
  - Solutions that contain at least one Sm.
Let count(S[], m, n) be the function to count the number of solutions, then it can be written as sum of count(S[], m-1, n) and count(S[], m, n-Sm).
Therefore, the problem has optimal substructure property as the problem can be solved using solutions to subproblems.

* Overlapping Subproblems
Following is a simple recursive implementation of the Coin Change problem. The implementation simply follows the recursive structure mentioned above.

* Approach (Algorithm)

See, here each coin of a given denomination can come an infinite number of times. (Repetition allowed), this is what we call UNBOUNDED KNAPSACK. We have 2 choices for a coin of a particular denomination, either i) to include, or ii) to exclude.  But here, the inclusion process is not for just once; we can include any denomination any number of times until N<0.

Basically, If we are at s[m-1], we can take as many instances of that coin ( unbounded inclusion ) i.e count(S, m, n – S[m-1] ) ; then we move to s[m-2]. After moving to s[m-2], we can’t move back and can’t make choices for s[m-1] i.e count(S, m-1, n ).

Finally, as we have to find the total number of ways, so we will add these 2 possible choices, i.e count(S, m, n – S[m-1] ) + count(S, m-1, n ) ; which will be our required answer.

**implementation**

```java
public class Solution {

  public int coinChange(int[] coins, int amount) {
    if (amount < 1) return 0;
    return coinChange(coins, amount, new int[amount]);
  }

  private int coinChange(int[] coins, int rem, int[] count) {
    if (rem < 0) return -1;
    if (rem == 0) return 0;
    if (count[rem - 1] != 0) return count[rem - 1];
    int min = Integer.MAX_VALUE;
    for (int coin : coins) {
      int res = coinChange(coins, rem - coin, count);
      if (res >= 0 && res < min)
        min = 1 + res;
    }
    count[rem - 1] = (min == Integer.MAX_VALUE) ? -1 : min;
    return count[rem - 1];
  }
}
```

**complexity**

Time complexity: O(S*n), where S is the amount, n is denomination count. In the worst case the recursive tree of the algorithm has height of S and the algorithm solves only S subproblems because it caches precalculated solutions in a table. Each subproblem is computed with nn iterations, one by coin denomination. Therefore there is O(S*n) time complexity.

Space complexity : O(S), where SS is the amount to change We use extra space for the memoization table.
