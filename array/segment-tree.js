module.exports = SegmentTree;

function SegmentTree(arr, fn) {
  // Height of Segment Tree.
  var x = Math.ceil(Math.log2(arr.length));
  // Maximum size of segment tree
  var maxSize = 2 * Math.pow(2, x) - 1;

  this._leafs = arr;
  this._nodes = new Array(maxSize);

  this._createNode(0, 0, arr.length - 1, fn);
};

SegmentTree.prototype._find = function (ss, se, qs, qe, index, fn) {
  // If segment of this node is a part of given range, then return the value of the segment
  if(qs <= ss && qe >= se) {
    console.log(se, qs, ss, qe, 'inside');
    return this._nodes[index];
  }
  // If segment of this node is outside the given range
  if(se < qs || ss > qe) {
    console.log(se, qs, ss, qe, 'outside');
    // return 0;
    return Infinity;
  }

  // If a part of this segment overlaps with the given range
  var mid = this._getMiddleIndex(ss, se);

  return fn(
    this._find(ss, mid, qs, qe, 2 * index + 1, fn),
    this._find(mid + 1, se, qs, qe, 2 * index + 2, fn)
  );
};

SegmentTree.prototype.find = function (qs, qe, fn) {
  var n = this._leafs.length - 1;

  // Check input values for correctness
  if(qs < 0 || qe > n || qs > qe) {
    return -1;
  }

  return this._find(0, n, qs, qe, 0, fn);
};

SegmentTree.prototype._update = function (ss, se, leafIndex, diff, index) {
  // Base Case: If the input index lies outside the range of this segment
  if(leafIndex < ss || leafIndex > se) {
    return;
  }

  // If the input index is in range of this node, then update the value
  // of the node and its children
  this._nodes[index] = this._nodes[index] + diff;

  if(se != ss) {
    var mid = this._getMiddleIndex(ss, se);
    this._update(ss, mid, leafIndex, diff, 2 * index + 1);
    this._update(mid + 1, se, leafIndex, diff, 2 * index + 2);
  }
};

SegmentTree.prototype.update = function (index, value) {
  var leafs = this._leafs;
  var n = leafs.length - 1;

  // Check for erroneous input index
  if(index < 0 || index > n) {
    console.log("Invalid Input");
    return;
  }

  // Get the difference between new value and old value
  var diff = value - leafs[index];

  // Update the value in array
  leafs[index] = value;

  // Update the values of nodes in segment tree
  this._update(0, n, index, diff, 0);
};

SegmentTree.prototype._getMiddleIndex = function (s, e) {
  return Math.floor(s + (e - s) / 2);
};

SegmentTree.prototype._createNode = function (index, ss, se, fn) {
  // If there is one element in array, store it in current node of segment tree
  if(ss == se) {
    return this._nodes[index] = this._leafs[ss];
  }
  // If there are more than one elements, then recur for left and
  // right subtrees and store the sum of values in this node
  var mid = this._getMiddleIndex(ss, se);

  return this._nodes[index] = fn(
    this._createNode(index * 2 + 1, ss, mid, fn),
    this._createNode(index * 2 + 2, mid + 1, se, fn)
  );
};
