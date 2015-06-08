var Node = require('./node');
var findKthLargest = require('./find-kth-largest');

module.exports = BST;

/**
 * Binary Search Tree.
 * @public
 * @constructor
 */
function BST() {
  this.root = null;
}

/**
 * Inserts a node into the Binary Search Tree.
 *
 * @public
 * @method
 * @param {Number|String} value Node value.
 * @param {Node} current Current node.
 */
BST.prototype.insert = function (value, current) {
  if(this.root === null) {
    this.root = new Node(value, null, null, null);
    return;
  }
  current = current || this.root;

  var insertKey = current.value > value? 'left' : 'right';

  if(!current[insertKey]) {
    current[insertKey] = new Node(value, null, null, current);
  }
  else {
    this.insert(value, current[insertKey]);
  }
};

/**
 * Removes node from the tree.
 *
 * @public
 * @param {Node} node to be removed
 * @returns {Boolean} True/false depending on whether the given node is removed.
 */
BST.prototype.remove = function (node) {
  if(!node) {
    return false;
  }
  if(node.left && node.right) {
    var min = this.findMin(node.right);
    var temp = node.value;
    node.value = min.value;
    min.value = temp;
    return this.remove(min);
  }
  else {
    if(node.left) {
      this._replaceChild(node.parent, node, node.left);
    }
    else if(node._right) {
      this._replaceChild(node.parent, node, node.right);
    }
    else {
      this.replaceChild(node.parent, node, null);
    }
    return true;
  }
};

/**
 * In-order traversal from the given node.
 *
 * @private
 * @param {Node} current Node from which to start the traversal.
 * @param {Function} callback Callback which will be called for each traversed node.
 */
BST.prototype._inorder = function (current, callback) {
  if(!current) {
    return;
  }
  this._inorder(current.left, callback);
  if(typeof callback === 'function') {
    callback(current);
  }
  this._inorder(current.right, callback);
};
/**
 * In-order traversal of the whole tree.
 *
 * @public
 * @method
 * @param {Function} callback Callback which will be
 * called for each traversed node.
 */
BST.prototype.inorder = function (callback) {
  return this._inorder(this.root, callback);
};
/**
 * Post-order traversal from the given node.
 *
 * @private
 * @param {Node} current Node from which to start the traversal.
 * @param {Function} callback Callback which will be called for each traversed node
 */
BST.prototype._postorder = function (current, callback) {
  if(!current) {
    return;
  }
  this._postorder(current.left, callback);
  this._postorder(current.right, callback);
  if(typeof callback === 'function') {
    callback(current);
  }
};
/**
 * Post-order traversal of the whole tree.
 *
 * @public
 * @param {Function} callback Callback which will be called for each traversed node.
 */
BST.prototype.postorder = function (callback) {
  return this._postorder(this.root, callback);
};
/**
 * Pre-order traversal of the tree from the given node.
 *
 * @private
 * @param {Node} current Node from which to start the traversal.
 * @param {Function} callback Callback which will be called for each traversed node.
 */
BST.prototype._preorder = function (current, callback) {
  if(!current) {
    return;
  }
  if(typeof callback === 'function') {
    callback(current);
  }
  this._preorder(current.left, callback);
  this._preorder(current.right, callback);
};
/**
 * Pre-order preorder traversal of the whole tree.
 *
 * @public
 * @param {Function} callback Callback which will
 * be called for each traversed node.
 */
BST.prototype.preorder = function (callback) {
  return this._preorder(this.root, callback);
};

BST.prototype.findKthLargest = function (k) {
  var result = findKthLargest(this.root, k);

  return result && result.value;
};

function inorderWithStack(node) {
  var stack = [ ];

   do {
    if(node == null) {
      node = stack.pop();
      console.log(node.value);
      node = node.right;
    }
    else {
      stack.push(node);
      node = node.left;
    }
  } while(stack.length || node != null)
}

/* complexity O(n) */
function inorderMorrisTraversal(node, n) {
  var pre;
  var cur = node;

  while(cur != null) {
    if(cur.left == null) {
      console.log(cur.value);
      cur = cur.right;
    }
    else {
      /* Find the inorder predecessor of current */
      pre = cur.left
      while(pre.right != null && pre.right != cur) {
        pre = pre.right;
      }
      /* Make current as right child of its inorder predecessor */
      if(pre.right == null) {
        pre.right = cur;
        cur = cur.left;
      }
      /* Revert the changes made in if part to restore the original tree i.e., fix the right child of predecssor */
      else {
        pre.right = null;
        console.log(cur.value);
        cur = cur.right;
      }
    }
  }
}
