module.exports = findKthLargest;

function findKthLargest(node, k) {
  var c = 0;
  var result = false;

  function _findKthLargest(node) {
    if(node == null || c >= k) {
      return;
    }

    _findKthLargest(node.right);
    c++;

    if(c === k) {
      result = node;
      return;
    }

    _findKthLargest(node.left);
  }

  _findKthLargest(node);

  return result;
}
