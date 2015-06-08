var BST = require('./bst');
var tree = new BST();

tree.insert(25);
tree.insert(15);
tree.insert(12);
tree.insert(10);
tree.insert(30);
tree.insert(36);

var logNode = function (node) { console.log(node.value) };
console.log('inorder');
tree.inorder(logNode);
console.log('preorder');
tree.preorder(logNode);
console.log('postorder');
tree.postorder(logNode);


var tree2 = new BST();
tree2.insert(50);
tree2.insert(30);
tree2.insert(20);
tree2.insert(40);
tree2.insert(70);
tree2.insert(60);
tree2.insert(80);

console.log('findKthLargest');
for(var i = 1; i <= 7; i++) {
  console.log(tree2.findKthLargest(i));
}

/*
var LRUCache = require('./array/lru-cache');

var cache = new LRUCache(4);
cache.set(1, 'a');
cache.set(2, 'b');
cache.set(3, 'c');
cache.set(1, 'd');
cache.set(4, 'e');
cache.set(5, 'f');

console.log(cache + "");

console.log(getLargestItem([1,2,3,4,4,4,1,2]));
*/
