## Solution for buy and sell stocks

We need to find out the maximum difference (which will be the maximum profit) between two numbers in the given array. Also, the second number (selling price) must be larger than the first one (buying price).

In formal terms, we need to find max(prices[j]−prices[i]), for every i and j such that j > i.

### Approach 1: Brute Force

**implementation**

```java
public class Solution {
    public int maxProfit(int prices[]) {
        int maxprofit = 0;
        for (int i = 0; i < prices.length - 1; i++) {
            for (int j = i + 1; j < prices.length; j++) {
                int profit = prices[j] - prices[i];
                if (profit > maxprofit)
                    maxprofit = profit;
            }
        }
        return maxprofit;
    }
}
```

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_profit = 0
        for i in range(len(prices) - 1):
            for j in range(i + 1, len(prices)):
                profit = prices[j] - prices[i]
                if profit > max_profit:
                    max_profit = profit

        return max_profit
```

**Complexity Analysis**

- Time complexity: O(n^2)
- Space complexity: O(1). Only two variables - maxprofit and profit are used.

### Solution 2: track buy price and max profit
**algorithm**
Initialize two variables `buy_price=prices[0]` and `max_profit=0` 
Iterate through prices, and compare the price with buy price:
- if it's bigger than current buy price, then calculate `profit = price - buyer_price`, compare it with existing `max_profit`.
- if it's smaller than current buy price, then set it as the new buy price.

**implementation**

```ruby
def max_profit(prices)
  buy_price = prices[0]
  max_profit = 0

  prices.each do |price|
    if price > buy_price
      max_profit = [(price - buy_price), max_profit].max
    elsif price < buy_price
      buy_price = price
    end
  end

  max_profit
end
```

**Complexity Analysis**

- Time complexity: O(n), where n is the size of prices. It iterates through the prices once.
- Space complexity: O(1). Only two variables - `buy_price` and `max_profit` are used.

