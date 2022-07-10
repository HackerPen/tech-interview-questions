## Knapsack

Given the weights and profits of `N` items, we are asked to put these items in a knapsack that has a capacity `C`. The goal is to get the maximum profit from the items in the knapsack. Each item can only be selected once, as we don’t have multiple quantities of any item.

Let’s take Merry’s example, who wants to carry some fruits in the knapsack to get maximum profit. Here are the weights and profits of the fruits:

```
Items: { Apple, Orange, Banana, Melon }
Weights: { 2, 3, 1, 4 }
Profits: { 4, 5, 3, 7 }
Knapsack capacity: 5
```

### Examples

Example 1
```
input: [1, 6, 10, 16], [1, 2, 3, 5], 7
output: 22
explanation: choose profits 6 and 16
```

Example 2
```
input: [1, 6, 10, 16], [1, 2, 3, 5], 6
output: 17
explanation: choose profits 1 and 16
```
