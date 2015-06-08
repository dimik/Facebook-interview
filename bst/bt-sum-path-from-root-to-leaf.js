function calcSumPath(root) {
  if(root == null) {
    return 0;
  }

  function _calcSumPath(node) {
    if(node.left == null && node.right == null) {
      return node.value;
    }

    var sum = node.value;
    sum += node.left != null ? _calcSumPath(node.left) : 0;
    sum += node.right != null ? _calcSumPath(node.right) : 0;

    return sum;
}

  return _calcSumPath(root);
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
      value: 10
    }
   },
   right: {
     value: 28,
     left: {
       value: 22
     },
     right: {
       value: 34
     }
   }
};

console.log(calcSumPath(root));
