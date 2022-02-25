## Solution for Alien Dictionary


### Approach 1:  Breadth-First Search

**algorithm**

There are three parts to this problem.

- Getting as much information about the alphabet order as we can out of the input word list.
- Representing that information in a meaningful way.
- Assembling a valid alphabet ordering.

__Part 1: Extracting Information__

Let's start with a large example of a dictionary in an "alien language", and see how much we can conclude with some simple reasoning. This is likely to be your first step in tackling this question in a programming interview.

![words](https://leetcode.com/problems/alien-dictionary/Figures/269/words.png)

Remember that in an ordinary English dictionary, all the words starting with `a` are at the start, followed by all the ones starting with `b`, then `c`, `d`, `e`, and at the very end, `z`. In the "alien dictionary", we also expect the first letters of each word to be in alphabetical order. So, let's look at them.

![first_letters](https://leetcode.com/problems/alien-dictionary/Figures/269/first_letters.png)

Removing the duplicates, we get:

![first_letters_no_duplicates](https://leetcode.com/problems/alien-dictionary/Figures/269/first_letters_no_duplicates.png)

Going by this, we know the relative order of four letters in the "alien dictionary". However, we don't know how these four letters fit in with the other seven letters, or even how those other seven letters fit in with each other. To get more information, we'll need to look further.

Going back to the English dictionary analogy, the word `abacus` will appear before `algorithm`. This is because when the first letter of two words is the same, we instead look at the second letter; `b` and `l` in this case. `b` is before `l` in the alphabet.

Let's take a closer look at the first two words of the "alien dictionary"; `wxqkj` and `whgg`. Seeing as the first letters are the same, `w`, we look at the second letters. The first word has `x`, and the second word has `h`. Therefore, we know that `x` is before `h` in the alien dictionary. We know have two fragments of the letter-order.

![first_two_sequences](https://leetcode.com/problems/alien-dictionary/Figures/269/first_two_sequences.png)

We don't know yet how these two fragments could fit together into a single ordering. For example, we don't know whether `w` is before `x`, or `x` is before `w`, or even whether or not there's enough information available in the input for us to know.

Anyway, we've now gotten all the information we can out of the first two words. All letters after `x` in `wxqkj`, and after `h` in `whqg`, should be ignored because they did not impact the relative ordering of the two words (if you're confused, think back to `abacus` and `algorithm`. Because `b > l`, the `gorithm` and `acus` parts are unimportant for determining alphabetical ordering).

Hopefully, you're starting to see a pattern here. Where two words are adjacent, we need to look for the first difference between them. That difference tells us the relative order between two letters. Let's have a look at all the relations we can find by comparing adjacent words.

![words_relations](https://leetcode.com/problems/alien-dictionary/Figures/269/words_relations.png)

You might notice that we haven't included some rules, such as `w → j`. This is fine though, as we can still derive it from the rules we have: `w → c, c → k, k → j`.

This completes the first part. There is no further information we can extract from the input. Therefore, our task is now to put together what we know.

__Part 2: Representing the Relations__

We now have a set of relations stating how pairs of letters are ordered relative to each other.

![relations](https://leetcode.com/problems/alien-dictionary/Figures/269/relations.png)

How could we put these together? You may be tempted to start trying to build "chains" out of them. Here are a few possible chains.

![chains](https://leetcode.com/problems/alien-dictionary/Figures/269/chains.png)

The problem here though is that some letters are in more than one chain. Simply putting the chains into the output list one-after-the-other won't work. Some letters will be duplicated, which invalidates the ordering. Simply deleting the duplicates will not work either.

When we have a set of relations, often drawing a graph is the best way to visualize them. The nodes are the letters, and an edge between two letters, `A` and `B` represents that `A` is before `B` in the "alien alphabet".

![graph_bfs](https://leetcode.com/problems/alien-dictionary/Figures/269/graph_bfs_step_1.png)

__Part 3: Assembling a Valid Ordering__

As we can see from the graph, four of the letters have no arrows going into them. What this means is that there are no letters that have to be before any of these four (remember that the question states there could be multiple valid orderings, and if there are, then it's fine for us to return any of them).

Therefore, a valid start to the ordering we return would be:

![one_group_ordering](https://leetcode.com/problems/alien-dictionary/Figures/269/one_group_ordering.png)

We can now remove these letters and edges from the graph, because any other letters that required them first will now have this requirement satisfied.

![graph_bfs_step_2](https://leetcode.com/problems/alien-dictionary/Figures/269/graph_bfs_step_2.png)

On this new graph, there are now three new letters that have no in-arrows. We can add these to our output list.

![two_groups_ordering](https://leetcode.com/problems/alien-dictionary/Figures/269/two_groups_ordering.png)

Again, we can remove these from the graph.

![graph_bfs_step_2](https://leetcode.com/problems/alien-dictionary/Figures/269/graph_bfs_step_3.png)

Then add the two new letters with no in-arrows.

![three_groups_ordering](https://leetcode.com/problems/alien-dictionary/Figures/269/three_groups_ordering.png)

Which leaves the following graph.

![graph_bfs_step_4](https://leetcode.com/problems/alien-dictionary/Figures/269/graph_bfs_step_4.png)

With the final two letters.

![all_groups_ordering](https://leetcode.com/problems/alien-dictionary/Figures/269/all_groups_ordering.png)

Now that we have come up with an approach, we need to figure out how to implement it efficiently.

The first and second parts are straightforward; we'll leave you to look at the code for these. It should extract the order relations and then insert them into an adjacency list. The only thing we need to be careful of is ensuring that we've handled the "prefix" edge case correctly.

![adjacency_list](https://leetcode.com/problems/alien-dictionary/Figures/269/adjacency_list.png)

The third part is more complicated. We need to somehow identify which letters have no incoming links left. With the adjacency list format above, this is a bit annoying to do, because determining whether or not a particular letter has any incoming links requires repeatedly checking over the adjacency lists of all the other letters to see whether or not they feature that letter.

A naïve solution would be to do exactly this. While this would be efficient enough with at most 26 letters, it may result in your interviewer quickly telling you that we might want to use the same algorithm on an "alien language" with millions of unique letters.

An alternative is to keep two adjacency lists; one the same as above, and another that is the reverse, showing the incoming links. Then, each time we traverse an edge, we could remove the corresponding edge in the reverse adjacency list. Seeing when a letter has no more incoming links would now be straightforward.

![reverse_adjacency_list](https://leetcode.com/problems/alien-dictionary/Figures/269/reverse_adjacency_list.png)

However, we can do even better than that. Instead of keeping track of all the other letters that must be before a particular letter, we only need to keep track of how many of them there are! While building the forward adjacency list, we can also count up how many incoming edges each letter has. We call the number of incoming edges the indegree of a node.

![indegree_count_list](https://leetcode.com/problems/alien-dictionary/Figures/269/indegree_count_list.png)

We'll do a BFS for all letters that are reachable, adding each letter to the output as soon as it's reachable. A letter is reachable once all of the letters that need to be before it have been added to the output. To do a BFS, recall that we use a queue. We should initially put all letters with an in-degree of 0 onto that queue. Each time a letter gets down to an in-degree of 0, it is added to the queue.

We continue this until the queue is empty. After that, we check whether or not all letters were put in the output list. If some are missing, this is because we got to a point where all remaining letters had at least one edge going in; this means there must be a cycle! In that case, we should return "" as per the problem description. Otherwise, we should return the complete ordering we found.

One edge case we need to be careful of is where a word is followed by its own prefix. In these cases, it is impossible to come up with a valid ordering and so we should return "". The best place to detect it is in the loop that compares each adjacent pair of words.

Also, remember that not all letters will necessarily have an edge going into or out of them. These letters can go anywhere in the output. But we need to be careful to not forget about them in our implementation.


**implementation**

```java
public String alienOrder(String[] words) {

    // Step 0: Create data structures and find all unique letters.
    Map<Character, List<Character>> adjList = new HashMap<>();
    Map<Character, Integer> counts = new HashMap<>();
    for (String word : words) {
        for (char c : word.toCharArray()) {
            counts.put(c, 0);
            adjList.put(c, new ArrayList<>());
        }
    }

    // Step 1: Find all edges.
    for (int i = 0; i < words.length - 1; i++) {
        String word1 = words[i];
        String word2 = words[i + 1];
        // Check that word2 is not a prefix of word1.
        if (word1.length() > word2.length() && word1.startsWith(word2)) {
            return "";
        }
        // Find the first non match and insert the corresponding relation.
        for (int j = 0; j < Math.min(word1.length(), word2.length()); j++) {
            if (word1.charAt(j) != word2.charAt(j)) {
                adjList.get(word1.charAt(j)).add(word2.charAt(j));
                counts.put(word2.charAt(j), counts.get(word2.charAt(j)) + 1);
                break;
            }
        }
    }

    // Step 2: Breadth-first search.
    StringBuilder sb = new StringBuilder();
    Queue<Character> queue = new LinkedList<>();
    for (Character c : counts.keySet()) {
        if (counts.get(c).equals(0)) {
            queue.add(c);
        }
    }
    while (!queue.isEmpty()) {
        Character c = queue.remove();
        sb.append(c);
        for (Character next : adjList.get(c)) {
            counts.put(next, counts.get(next) - 1);
            if (counts.get(next).equals(0)) {
                queue.add(next);
            }
        }
    }

    if (sb.length() < counts.size()) {
        return "";
    }
    return sb.toString();
}
```

```python

from collections import defaultdict, Counter, deque

def alienOrder(self, words: List[str]) -> str:

    # Step 0: create data structures + the in_degree of each unique letter to 0.
    adj_list = defaultdict(set)
    in_degree = Counter({c : 0 for word in words for c in word})

    # Step 1: We need to populate adj_list and in_degree.
    # For each pair of adjacent words...
    for first_word, second_word in zip(words, words[1:]):
        for c, d in zip(first_word, second_word):
            if c != d:
                if d not in adj_list[c]:
                    adj_list[c].add(d)
                    in_degree[d] += 1
                break
        else: # Check that second word isn't a prefix of first word.
            if len(second_word) < len(first_word): return ""

    # Step 2: We need to repeatedly pick off nodes with an indegree of 0.
    output = []
    queue = deque([c for c in in_degree if in_degree[c] == 0])
    while queue:
        c = queue.popleft()
        output.append(c)
        for d in adj_list[c]:
            in_degree[d] -= 1
            if in_degree[d] == 0:
                queue.append(d)

    # If not all letters are in output, that means there was a cycle and so
    # no valid ordering. Return "" as per the problem description.
    if len(output) < len(in_degree):
        return ""
    # Otherwise, convert the ordering we found into a string and return it.
    return "".join(output)
```

**complexity**

Let `N` be the total number of strings in the input list.
Let `C` be the total length of all the words in the input list, added together.
Let `U` be the total number of unique letters in the alien alphabet. While this is limited to `26` in the question description, we'll still look at how it would impact the complexity if it was not limited (as this could potentially be a follow-up question).

Time complexity: `O(C)`.

There were three parts to the algorithm; identifying all the relations, putting them into an adjacency list, and then converting it into a valid alphabet ordering.

In the worst case, the first and second parts require checking every letter of every word (if the difference between two words was always in the last letter). This is `O(C)`.

For the third part, recall that a breadth-first search has a cost of `O(V+E)`, where `V` is the number of vertices and `E` is the number of edges. Our algorithm has the same cost as BFS, as it too is visiting each edge and node once (a node is visited once all of its edges are visited, unlike the traditional BFS where it is visited once one edge is visited). Therefore, determining the cost of our algorithm requires determining how many nodes and edges there are in the graph.

Space complexity: `O(1)` or `O(U+ min(U^2, N))`

The adjacency list uses the most auxiliary memory. This list uses `O(V+E)` memory, where `V` is the number of unique letters, and `E` is the number of relations.

### Approach 2:  Depth-First Search

**algorithm**

Another approach to the third part is to use a depth-first search. We still need to extract relations and then generate an adjacency list in the same way as before, but this time we don't need the `indegrees` map.

Recall that in a depth-first search, nodes are returned once they either have no outgoing links left, or all their outgoing links have been visited. Therefore, the order in which nodes are returned by the depth-first search will be the reverse of a valid alphabet order.

If we made a reverse adjacency list instead of a forward one, the output order would be correct (without needing to be reversed). Remember that when we reverse the edges of a directed graph, the nodes with no incoming edges became the ones with no outgoing edges. This means that the ones at the start of the alphabet will now be the ones returned first.

One issue we need to be careful of is cycles. In directed graphs, we often detect cycles by using graph coloring. All nodes start as white, and then once they're first visited they become grey, and then once all their outgoing nodes have been fully explored, they become black. We know there is a cycle if we enter a node that is currently grey (it works because all nodes that are currently on the stack are grey. Nodes are changed to black when they are removed from the stack).

**implementation**

```java
class Solution {

    private Map<Character, List<Character>> reverseAdjList = new HashMap<>();
    private Map<Character, Boolean> seen = new HashMap<>();
    private StringBuilder output = new StringBuilder();

    public String alienOrder(String[] words) {

        // Step 0: Put all unique letters into reverseAdjList as keys.
        for (String word : words) {
            for (char c : word.toCharArray()) {
                reverseAdjList.putIfAbsent(c, new ArrayList<>());
            }
        }

        // Step 1: Find all edges and add reverse edges to reverseAdjList.
        for (int i = 0; i < words.length - 1; i++) {
            String word1 = words[i];
            String word2 = words[i + 1];
            // Check that word2 is not a prefix of word1.
            if (word1.length() > word2.length() && word1.startsWith(word2)) {
                return "";
            }
            // Find the first non match and insert the corresponding relation.
            for (int j = 0; j < Math.min(word1.length(), word2.length()); j++) {
                if (word1.charAt(j) != word2.charAt(j)) {
                    reverseAdjList.get(word2.charAt(j)).add(word1.charAt(j));
                    break;
                }
            }
        }

        // Step 2: DFS to build up the output list.
        for (Character c : reverseAdjList.keySet()) {
            boolean result = dfs(c);
            if (!result) return "";
        }


        if (output.length() < reverseAdjList.size()) {
            return "";
        }
        return output.toString();
    }

    // Return true iff no cycles detected.
    private boolean dfs(Character c) {
        if (seen.containsKey(c)) {
            return seen.get(c); // If this node was grey (false), a cycle was detected.
        }
        seen.put(c, false);
        for (Character next : reverseAdjList.get(c)) {
            boolean result = dfs(next);
            if (!result) return false;
        }
        seen.put(c, true);
        output.append(c);
        return true;
    }    
}
```

```python

def alienOrder(self, words: List[str]) -> str:

    # Step 0: Put all unique letters into the adj list.
    reverse_adj_list = {c : [] for word in words for c in word}

    # Step 1: Find all edges and put them in reverse_adj_list.
    for first_word, second_word in zip(words, words[1:]):
        for c, d in zip(first_word, second_word):
            if c != d:
                reverse_adj_list[d].append(c)
                break
        else: # Check that second word isn't a prefix of first word.
            if len(second_word) < len(first_word):
                return ""

    # Step 2: Depth-first search.
    seen = {} # False = grey, True = black.
    output = []
    def visit(node):  # Return True iff there are no cycles.
        if node in seen:
            return seen[node] # If this node was grey (False), a cycle was detected.
        seen[node] = False # Mark node as grey.
        for next_node in reverse_adj_list[node]:
            result = visit(next_node)
            if not result:
                return False # Cycle was detected lower down.
        seen[node] = True # Mark node as black.
        output.append(node)
        return True

    if not all(visit(node) for node in reverse_adj_list):
        return ""

    return "".join(output)
```

**complexity**

Let `N` be the total number of strings in the input list.
Let `C` be the total length of all the words in the input list, added together.
Let `U` be the total number of unique letters in the alien alphabet. While this is limited to `26` in the question description, we'll still look at how it would impact the complexity if it was not limited (as this could potentially be a follow-up question).

Time complexity: `O(C)`.
Space complexity: `O(1)` or `O(U+ min(U^2, N))`
