## Copy Graph


### Approach 1: Recursive Depth First Search (DFS)

**algorithm**

The intuition to use recursive DFS stems from a definition of deep copies. Deep copies ensure that the
entire object and all of it's subsidiaries/dependencies (here connections) are duplicated with new memory.
One way to think of this is that you will never use any references to an original object in your deep copy.
This is in contrast to shallow copies, which do not ensure all aspects of a copy are new.

Using DFS recursively naturally solves this problem in the following implementation

**implementation**

```python
def copy_graph(start_node):
  node_mapping = {}
  def dfs_copy(node):
    if node in node_mapping: # we already have a copy for this node
      return node_mapping[node]
    copy = Node(val=node.val)
    node_mapping[node] = copy
    # Add connection's duplicate to copy's connections
    for c in node.connections:
      copy.connections.append(copy_graph(c))
    return copy

  return copy_graph(start_node) if start_node else None
```

**complexity**
V = Number of nodes/vertices
E = Number of edges
Time complexity: O(V + E)
Space complexity: O(V) - At worse, a mapping of V nodes + a call stack of size V
