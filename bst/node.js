/**
 * Node of the tree.
 *
 * @public
 * @constructor
 * @param {Number|String} value Value of the node.
 * @param {Node} left Left sibling.
 * @param {Node} right Right sibling.
 * @param {Node} parent Parent of the node.
 */
function Node(value, left, right, parent) {
  this.value = value;
  this.left = left;
  this.right = right;
  this.parent = parent;
}

module.exports = Node;
