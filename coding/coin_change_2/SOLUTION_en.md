## Solution for Coin Change 2


### Approach 1: Dynamic Programming (bottom-up)

**algorithm**

To solve `coin_change(amount, coins)` problems, we must solve its subproblems.
For example, to know how to exchange $10 using $1, $2, $5 coins,
We first solve exchanging $1 using the same set of coins, then $2, $3..
And we store the solution to these sub-problems in an array `dp`.
`dp` is initialized with `0` for each amount as a placeholder solution.
Although one solution is true - `dp[0] = 1` because there is only one way to return changes to `$0`
It is to return no coins.

A generic solution emerges
`dp[amount] = dp[amount] + dp[amount-coin]` for all `coin < amount`

**implementation**

```ruby
def coin_change(amount, coins)
  dp = [0] * (amount + 1)
  dp[0] = 1

  coins.each do |coin|
    [coin..amount].to_a.each do |x|
      dp[x] = dp[x] + dp[x - coin]
    end
  end

  dp[amount]
end
```

**complexity**

Time complexity: O(N *S), where `N` is the amount, `S` is the number of coins
Space complexity: O(N), where `N` is the amount
