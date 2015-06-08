/**
 * complexity O(h)
 */
function lowestCommonAncestor(node, a, b) {
  if(root == null || a == null || b == null) {
    return null;
  }

  if(Math.max(a.value, b.value) < node.value) {
    // both nodes are on the left
    return lowestCommonAncestor(node.left, a, b);
  }
  else if(Math.min(a.value, b.value) > node.value) {
    // both nodes are on the right
    return lowestCommonAncestor(node.right, a, b);
  }
  else {
    // the nodes are on separate branches
    return node.value;
  }
}
