/**
 * Following is simple O(n) algorithm to find LCA of n1 and n2.
 * 1) Find path from root to n1 and store it in an array.
 * 2) Find path from root to n2 and store it in another array.
 * 3) Traverse both paths till the values in arrays are same.
 * Return the common element just before the mismatch.
 *
 * Time complexity of this solution is O(n).
 * The tree is traversed twice, and then path arrays are compared.
 */
function findLCAWithArray(root, n1, n2) {
  var path1 = [];
  var path2 = [];

  /**
   * Finds the path from root node to given root of the tree, Stores the
   * path in a array path[], returns true if path exists otherwise false
   */
  function findPath(node, path, val) {
    // base case
    if(node == null) {
      return false;
    }

    // Store this node in path array.
    // The node will be removed if not in path from root to node
    path.push(node);

    // See if the node value is equalt to the searched one
    if(node.value == val) {
      return true;
    }

    // Check if node is found in left or right sub-tree
    if( (node.left != null && findPath(node.left, path, val)) ||
        (node.right != null && findPath(node.right, path, val)) ) {
          return true;
    }

    // If not present in subtree rooted with the node, remove node from
    // path[] and return false
    path.pop();
    return false;
  }

  // Find paths from root to n1 and root to n1. If either n1 or n2 is not present, return -1
  if(!findPath(root, path1, n1) || !findPath(root, path2, n2)) {
    return -1;
  }

  // Compare the paths to get the first different value
  for(var i = 0; i < path1.length && i < path2.length; i++) {
    if(path1[i] != path2[i]) {
      break;
    }
  }

  return path1[i - 1];
}

/**
 * Method 2 (Using Single Traversal)
 * The method 1 finds LCA in O(n) time but requires 3 tree traversals
 * plus extra spaces for path arrays.
 *
 * If we assume that the node values n1 and n2 are present in Binary Tree,
 * we can find LCA using single traversal of Binary Tree
 * and without extra storage for path arrays.
 *
 * The idea is to traverse the tree starting from the root.
 * If any of the given node values (n1 or n2) matches with the processed node value,
 * then this node is LCA (assuming that both nodes are present in the BT).
 *
 * If the current node value doesn’t match with any of the n1 or n2 values, we reccur for left and right subtrees.
 * The node which has one value present in its left subtree and the other present in right subtree is the LCA.
 * If both values lie in the left subtree, then the left subtree has LCA as well, otherwise LCA lies in the right subtree.
 */
function findLCAWithSingleTraversal(root, n1, n2) {
  function _findLCA(node, n1, n2) {
    // Base case: node is NULL
    if(node == null) {
      return null;
    }

    // If either n1 or n2 matches with node, report
    // the presence by returning node (Note that if a node is
    // ancestor of other, then the ancestor key becomes LCA
    if(node.value == n1 || node.value == n2) {
        return node;
    }

    var leftLCA  = _findLCA(node.left, n1, n2);
    var rightLCA = _findLCA(node.right, n1, n2);

    // If both of the above calls return Non-NULL, then one key
    // is present in once subtree and other is present in other,
    // So this node is the LCA
    if(leftLCA != null && rightLCA != null) {
      return node;
    }

    // Otherwise check if left subtree or right subtree is LCA
    return leftLCA != null? leftLCA: rightLCA;
  }

  return _findLCA(root, n1, n2);
}

var root = {
  value: 16,
  left: {
    value: 8,
    left: {
      value: 5,
      left: { value: 3, left: { value: 2, left: { value: 1 } } },
      right: null
    },
    right: {
      value: 10,
      left: null,
      right: null
    }
   },
   right: {
     value: 28,
     left: {
       value: 22,
       left: null,
       right: null
     },
     right: {
       value: 34,
       left: null,
       right: null
     }
   }
};

console.log(findLCAWithArray(root, 34, 2).value);
console.log(findLCAWithSingleTraversal(root, 34, 2).value);
