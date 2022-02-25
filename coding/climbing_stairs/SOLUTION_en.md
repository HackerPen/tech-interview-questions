## Solution for Climbing Stairs


### Approach 1: Brute Force

**algorithm**

In this brute force approach we take all possible step combinations i.e. 1 and 2, at every step. At every step we are calling the function `sclimbStairs` for step 1 and 2, and return the sum of returned values of both functions.

`climbStairs(i,n)=(i + 1, n) + climbStairs(i + 2, n)`

where `i` defines the current step and `n` defines the destination step.

**implementation**

```java
public class Solution {
    public int climbStairs(int n) {
        return climb_Stairs(0, n);
    }
    public int climb_Stairs(int i, int n) {
        if (i > n) {
            return 0;
        }
        if (i == n) {
            return 1;
        }
        return climb_Stairs(i + 1, n) + climb_Stairs(i + 2, n);
    }
}
```

**complexity**

Time complexity: `O(2^n)`. Size of the recursion tree will be 2^n.
Space complexity: `O(n)`. The depth of the recursion tree can go up to n.

### Approach 2: Recursion with Memoization

**algorithm**

In the previous approach we are redundantly calculating the result for every step. Instead, we can store the result at each step in `memo` array and directly returning the result from the memo array whenever that function is called again.

In this way we are pruning recursion tree with the help of `memo` array and reducing the size of recursion tree upto `n`.

**implementation**

```java
public class Solution {
    public int climbStairs(int n) {
        int memo[] = new int[n + 1];
        return climb_Stairs(0, n, memo);
    }
    public int climb_Stairs(int i, int n, int memo[]) {
        if (i > n) {
            return 0;
        }
        if (i == n) {
            return 1;
        }
        if (memo[i] > 0) {
            return memo[i];
        }
        memo[i] = climb_Stairs(i + 1, n, memo) + climb_Stairs(i + 2, n, memo);
        return memo[i];
    }
}
```

**complexity**

Time complexity: `O(n)`. Size of the recursion can go up to n.
Space complexity: `O(n)`. The depth of the recursion tree can go up to n.


### Approach 3: Dynamic Programming

**algorithm**

As we can see this problem can be broken into subproblems, and it contains the optimal substructure property i.e. its optimal solution can be constructed efficiently from optimal solutions of its subproblems, we can use dynamic programming to solve this problem.

One can reach `i_th` step in one of the two ways:
- Taking one step from `(i-1)_th` step
- Taking two steps from `(i-2)_th` step

So, the total number of ways to reach `i_th` is equal to sum of ways of reaching `(i-1)_th` step and ways of reaching `(i-2)_th` step.

**implementation**

```java
public class Solution {
    public int climbStairs(int n) {
        if (n == 1) {
            return 1;
        }
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}
```

**complexity**

Time complexity : `O(n)`. Single loop up to n.

Space complexity : `O(n)`. `dp` array of size n is used.
