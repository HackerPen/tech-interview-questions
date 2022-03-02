## Copy Graph

Given any node from a undirected connected graph, create and return a **deep copy** of the entire graph (you can return the deep copy of the starting node).
A deep copy of a graph creates new nodes for every single node in the graph (as opposed to only cloning the first, or some graphs).

Definition of a node:

```python
class Node:
    def __init__(self, val=0, connections=[]):
        self.val = val
        self.connections = connections
```

### Examples

Example 1

```plaintext
Start at node with value 1
With an edge list: [[1,2],[1,3],[1,4]], there are 3 nodes, all connected via node with value 1.
Input: Node(val=1, connections=[2,3,4])
Output: Node(val=1, connections=[2,3,4]) # This node and it's connections are new nodes, with different memory addresses
```

**constraints**

- Each node has a unique value
- The graph has one "component" meaning you can visit the entire graph starting from any node
