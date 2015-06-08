/**
 * A simple recursive function to convert a given Binary tree to Doubly Linked List
 * This function does a simple inorder traversal so complexity is O(n)
 * @param {Node} root Root of Binary Tree
 */
function convertBT2DLL(root) {
  // Pointer to head node of created Doubly Linked List
  var head = null;
  // Initialize previously visited node as NULL. This is
  // static so that the same value is accessible in all recursive
  // calls
  var prev = null;

  function _convertBT2DLL(node) {
    // Base case
    if(node == null) {
      return;
    }

    // Recursively convert left subtree
    _convertBT2DLL(node.left);

    // Now convert this node
    if(prev == null) {
      head = node;
    }
    else {
      node.left = prev;
      prev.right = node;
    }
    prev = node;

    // Finally convert right subtree
    _convertBT2DLL(node.right);
  }

  function _printList(node) {
    while(node != null) {
      console.log(node.value);
      node = node.right;
    }
  }

  _convertBT2DLL(root);
  _printList(head);
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

convertBT2DLL(root);
