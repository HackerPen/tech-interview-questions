## Solution for Knapsack


### Approach 1: Brute force recursion

**algorithm**

We can breakdown the large problem into smaller problems. Given an array of items to choose from. We iterate through each item.

For each item, there are only two possible outcomes: one, this item is not included; or two, this item is included.

We can include both outcomes in the set of possible outcomes, and then takes the maximum from that outcome.

**implementation**

```ruby
def solve_knapsack(profits, weights, capacity)
  # for each item, either it is included,
  # or it is not included in the solution
  # use a pointer to track where we are
  solve_knapsack_recursive(profits, weights, capacity, 0)
end

def solve_knapsack_recursive(profits, weights, capacity, current_index)
  # base case:
  # 0 if capacity <= 0 or current_index >= len(profits)
  if capacity <= 0 || current_index >= profits.size
    return 0
  end

  # option 1: include current item
  profit_1 = 0
  if capacity >= weights[current_index]
    updated_capacity = capacity - weights[current_index]
    profit_1 = profits[current_index] + solve_knapsack_recursive(profits, weights, updated_capacity, current_index+1)
  end
  # option 2: exclude the current item
  profit_2 = solve_knapsack_recursive(profits, weights, capacity, current_index+1)

  # choose max between option 1 and 2
  [profit_1, profit_2].max
end
```

**complexity**

Time complexity: O(2^n), the brute force recursion forms a recursion tree, which asymptotically equivalent to O(2^n).
Space complexity: O(N), the space will be used to store the recursion stack. Our recursion algorithm works in a depth-first fashion, which means, we can't have more than `n` recursive calls on the call stack at any time.

### Approach 2: Top down dynamic programming with memoization

**algorithm**

We can breakdown the large problem into smaller problems. Given an array of items to choose from. We iterate through each item.

For each item, there are only two possible outcomes: one, this item is not included; or two, this item is included.

We can include both outcomes in the set of possible outcomes, and then takes the maximum from that outcome.

Additionally, we will avoid solving the same subset of problems by memoizing the results in a hash table.

**implementation**

```ruby
def solve_knapsack(profits, weights, capacity)
  # for each item, either it is included,
  # or it is not included in the solution
  # use a pointer to track where we are
  #
  # in addition, we will pass on a hash table to memoize
  # solved subproblems
  #
  # because we have two changing variables: capacity and current index
  # we need to use a matrix (two-dimensional hash) for memoization

  mem = Hash.new{|h, k| h[k] = {}}
  solve_knapsack_recursive(mem, profits, weights, capacity, 0)
end

def solve_knapsack_recursive(mem, profits, weights, capacity, current_index)
  # base case:
  # 0 if capacity <= 0 or current_index >= len(profits)
  if capacity <= 0 || current_index >= profits.size
    return 0
  end

  # memoization: return if value already exists
  if mem[current_index][capacity]
    return mem[current_index][capacity]
  end

  # option 1: include current item
  profit_1 = 0
  if capacity >= weights[current_index]
    updated_capacity = capacity - weights[current_index]
    profit_1 = profits[current_index] + solve_knapsack_recursive(mem, profits, weights, updated_capacity, current_index+1)
  end
  # option 2: exclude the current item
  profit_2 = solve_knapsack_recursive(mem, profits, weights, capacity, current_index+1)

  # choose max between option 1 and 2
  # in addition, memoize the result
  mem[current_index][capacity] = [profit_1, profit_2].max
  mem[current_index][capacity]
end

puts(solve_knapsack([1, 6, 10, 16], [1, 2, 3, 5], 7))
puts(solve_knapsack([1, 6, 10, 16], [1, 2, 3, 5], 6))
```

**complexity**

time complexity: O(n*c), where n is the number of items, and c is the capacity. since our memoization table stores n*c, we will solve no more than n*c subproblems.
space complexity: O(n*c), which is asympotically the same as the memoization table.


### Approach 3: Bottom-up dynamic programming with tabulation

**algorithm**
We have two changing variables `current_index` and `capacity`, therefore we will populate a two-dimensional hash table `tab[i][c]`, which represents the **max profit with capacity c from the first i items.**

`tab[i][c]` can be result of one of the two outcomes. Outcome one, it includes the i element, or it doesn't include i element.

```
tab[i][c] = max(tab[i-1][c], profits[i] + tab[i-1][c - weights[i]])
```

**implementation**

```ruby
def solve_knapsack(profits, weights, capacity)
  # base case
  if profits.size == 0 || capacity <= 0
    return 0
  end

  # initialize tabulation
  tab = Hash.new{|h, k| h[k] = {}}
  profits.each_with_index do |_, index|
    tab[index][0] = 0 # when capacity is 0, profit is 0
  end

  # if we only have 1 item,
  # and the weight is not bigger than capacity
  # then fill in the weight
  for c in 0..capacity do
    if weights[0] <= c
      tab[0][c] = profits[0]
    end
  end

  # populate from bottom to up
  for i in 1..(profits.size-1) do
    for c in 1..capacity do
      # tab[i][c]
      # - profit_1 includes profits[i] if it is not more than capacity
      # - profit_2 does not include profits[i]
      profit_1, profit_2 = 0, 0
      if weights[i] <= c
        profit_1 = profits[i] + tab[i-1][c - weights[i]]
      end
      profit_2 = tab[i-1][c]

      tab[i][c] = [profit_1, profit_2].max
    end
  end

  return tab[profits.size-1][capacity]
end
```


**complexity**

time complexity: O(n*c), where n is the number of items, and c is the capacity. since the tabulation hash table stores n*c, we will run no more than n*c tabulations.
space complexity: O(n*c), which is asympotically the same as the tabluation table.
