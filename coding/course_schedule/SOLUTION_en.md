## Solution for course schedule

### Approach 1: Backtracking

**algorithm**

The problem could be modeled as a graph traversal problem, where each course can be represented as a vertex in a graph and the dependency between the courses can be modeled as a directed edge between two vertex.

A typical strategy for graph traversal problems would be backtracking or simply DFS (depth-first search).

Here let us start with the backtracking algorithm, which arguably might be more intuitive.

> As a reminder, backtracking is a general algorithm that is often applied to solve the constraint satisfaction problems, which incrementally builds candidates to the solutions, and abandons a candidate (i.e. backtracks) as soon as it determines that the candidate would not lead to a valid solution.

The general idea here is that we could enumerate each course (vertex), to check if it could form cyclic dependencies (i.e. a cyclic path) starting from this course.

The check of cyclic dependencies for each course could be done via backtracking, where we incrementally follow the dependencies until either there is no more dependency or we come across a previously visited course along the path.

The overall structure of the algorithm is simple, which consists of three main steps:

1. we build a graph data structure from the given list of course dependencies. Here we adopt the adjacency list data structure as shown below to represent the graph, which can be implemented via hashmap or dictionary. Each entry in the adjacency list represents a node which consists of a node index and a list of neighbors nodes that follow from the node.

2. we then enumerate each node (course) in the constructed graph, to check if we could form a dependency cycle starting from the node.

3. we perform the cyclic check via backtracking, where we breadcrumb our path (i.e. mark the nodes we visited) to detect if we come across a previously visited node (hence a cycle detected). We also remove the breadcrumbs for each iteration.

**implementation**

```java
class Solution {
  public boolean canFinish(int numCourses, int[][] prerequisites) {

    // course -> list of next courses
    HashMap<Integer, List<Integer>> courseDict = new HashMap<>();

    // build the graph first
    for (int[] relation : prerequisites) {
      // relation[0] depends on relation[1]
      if (courseDict.containsKey(relation[1])) {
        courseDict.get(relation[1]).add(relation[0]);
      } else {
        List<Integer> nextCourses = new LinkedList<>();
        nextCourses.add(relation[0]);
        courseDict.put(relation[1], nextCourses);
      }
    }

    boolean[] path = new boolean[numCourses];

    for (int currCourse = 0; currCourse < numCourses; ++currCourse) {
      if (this.isCyclic(currCourse, courseDict, path)) {
        return false;
      }
    }

    return true;
  }


  /*
   * backtracking method to check that no cycle would be formed starting from currCourse
   */
  protected boolean isCyclic(
      Integer currCourse,
      HashMap<Integer, List<Integer>> courseDict,
      boolean[] path) {

    if (path[currCourse]) {
      // come across a previously visited node, i.e. detect the cycle
      return true;
    }

    // no following courses, no loop.
    if (!courseDict.containsKey(currCourse))
      return false;

    // before backtracking, mark the node in the path
    path[currCourse] = true;

    // backtracking
    boolean ret = false;
    for (Integer nextCourse : courseDict.get(currCourse)) {
      ret = this.isCyclic(nextCourse, courseDict, path);
      if (ret)
        break;
    }
    // after backtracking, remove the node from the path
    path[currCourse] = false;
    return ret;
  }
}
```


```python
class Solution(object):
    def canFinish(self, numCourses, prerequisites):
        """
        :type numCourses: int
        :type prerequisites: List[List[int]]
        :rtype: bool
        """
        from collections import defaultdict
        courseDict = defaultdict(list)

        for relation in prerequisites:
            nextCourse, prevCourse = relation[0], relation[1]
            courseDict[prevCourse].append(nextCourse)

        path = [False] * numCourses
        for currCourse in range(numCourses):
            if self.isCyclic(currCourse, courseDict, path):
                return False
        return True


    def isCyclic(self, currCourse, courseDict, path):
        """
        backtracking method to check that no cycle would be formed starting from currCourse
        """
        if path[currCourse]:
            # come across a previously visited node, i.e. detect the cycle
            return True

        # before backtracking, mark the node in the path
        path[currCourse] = True

        # backtracking
        ret = False
        for child in courseDict[currCourse]:
            ret = self.isCyclic(child, courseDict, path)
            if ret: break

        # after backtracking, remove the node from the path
        path[currCourse] = False
        return ret
```

**complexity**

Time Complexity: O(∣E∣+∣V∣)^2, where ∣E∣ is the number of dependencies, ∣V∣ is the number of courses and dd is the maximum length of acyclic paths in the graph.

First of all, it would take us ∣E∣ steps to build a graph in the first step.
For a single round of backtracking, in the worst case where all the nodes chained up in a line, it would take us maximum ∣V∣ steps to terminate the backtracking.

Space Complexity: O(∣E∣+∣V∣), with the same denotation as in the above time complexity.


### Approach 2: Postorder DFS (Depth-First Search)

**algorithm**

We could implement the postorder DFS based on the above backtracking algorithm, by simply adding another bitmap (i.e. checked[node_index]) which indicates whether we have done the cyclic check starting from a particular node.

Here are the breakdowns of the algorithm, where the first 2 steps are the same as in the previous backtracking algorithm.

1. We build a graph data structure from the given list of course dependencies.
2. We then enumerate each node (course) in the constructed graph, to check if we could form a dependency cycle starting from the node.
3. We check if the current node has been checked before, otherwise we enumerate through its child nodes via backtracking, where we breadcrumb our path (i.e. mark the nodes we visited) to detect if we come across a previously visited node (hence a cycle detected). We also remove the breadcrumbs for each iteration.
4. Once we visited all the child nodes (i.e. postorder), we mark the current node as checked.

**implementation**

```java
class Solution {
  public boolean canFinish(int numCourses, int[][] prerequisites) {

    // course -> list of next courses
    HashMap<Integer, List<Integer>> courseDict = new HashMap<>();

    // build the graph first
    for (int[] relation : prerequisites) {
      // relation[0] depends on relation[1]
      if (courseDict.containsKey(relation[1])) {
        courseDict.get(relation[1]).add(relation[0]);
      } else {
        List<Integer> nextCourses = new LinkedList<>();
        nextCourses.add(relation[0]);
        courseDict.put(relation[1], nextCourses);
      }
    }

    boolean[] checked = new boolean[numCourses];
    boolean[] path = new boolean[numCourses];

    for (int currCourse = 0; currCourse < numCourses; ++currCourse) {
      if (this.isCyclic(currCourse, courseDict, checked, path))
        return false;
    }

    return true;
  }


  /*
   * postorder DFS check that no cycle would be formed starting from currCourse
   */
  protected boolean isCyclic(
      Integer currCourse, HashMap<Integer, List<Integer>> courseDict,
      boolean[] checked, boolean[] path) {

    // bottom cases
    if (checked[currCourse])
      // this node has been checked, no cycle would be formed with this node.
      return false;
    if (path[currCourse])
      // come across a previously visited node, i.e. detect the cycle
      return true;

    // no following courses, no loop.
    if (!courseDict.containsKey(currCourse))
      return false;

    // before backtracking, mark the node in the path
    path[currCourse] = true;

    boolean ret = false;
    // postorder DFS, to visit all its children first.
    for (Integer child : courseDict.get(currCourse)) {
      ret = this.isCyclic(child, courseDict, checked, path);
      if (ret)
        break;
    }

    // after the visits of children, we come back to process the node itself
    // remove the node from the path
    path[currCourse] = false;

    // Now that we've visited the nodes in the downstream,
    // we complete the check of this node.
    checked[currCourse] = true;
    return ret;
  }
}
```

```python
class Solution(object):
    def canFinish(self, numCourses, prerequisites):
        """
        :type numCourses: int
        :type prerequisites: List[List[int]]
        :rtype: bool
        """
        from collections import defaultdict
        courseDict = defaultdict(list)

        for relation in prerequisites:
            nextCourse, prevCourse = relation[0], relation[1]
            courseDict[prevCourse].append(nextCourse)

        checked = [False] * numCourses
        path = [False] * numCourses

        for currCourse in range(numCourses):
            if self.isCyclic(currCourse, courseDict, checked, path):
                return False
        return True


    def isCyclic(self, currCourse, courseDict, checked, path):
        """   """
        # 1). bottom-cases
        if checked[currCourse]:
            # this node has been checked, no cycle would be formed with this node.
            return False
        if path[currCourse]:
            # came across a marked node in the path, cyclic !
            return True

        # 2). postorder DFS on the children nodes
        # mark the node in the path
        path[currCourse] = True

        ret = False
        # postorder DFS, to visit all its children first.
        for child in courseDict[currCourse]:
            ret = self.isCyclic(child, courseDict, checked, path)
            if ret: break

        # 3). after the visits of children, we come back to process the node itself
        # remove the node from the path
        path[currCourse] = False

        # Now that we've visited the nodes in the downstream,
        #   we complete the check of this node.
        checked[currCourse] = True
        return ret
```

**complexity**

Time Complexity: O(∣E∣+∣V∣) where ∣V∣ is the number of courses, and ∣E∣ is the number of dependencies.

As in the previous algorithm, it would take us ∣E∣ time complexity to build a graph in the first step.
Since we perform a postorder DFS traversal in the graph, we visit each vertex and each edge once and only once in the worst case, i.e. ∣E∣+∣V∣.

Space Complexity: O(∣E∣+∣V∣), with the same denotation as in the above time complexity.

We built a graph data structure in the algorithm, which would consume ∣E∣+∣V∣ space.
In addition, during the backtracking process, we employed two bitmaps (path and visited) to keep track of the visited path and the status of check respectively, which consumes 2⋅∣V∣ space.
Finally, since we implement the function in recursion, which would incur additional memory consumption on call stack. In the worst case where all nodes chained up in a line, the recursion would pile up |V|∣V∣ times.
Hence the overall space complexity of the algorithm would be O(∣E∣+4⋅∣V∣)=O(∣E∣+∣V∣).
