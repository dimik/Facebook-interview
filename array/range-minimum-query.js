/**
 * A simple solution is to run a loop from qs to qe and find minimum element in given range.
 * This solution takes O(n) time in worst case.
 */
function doRMQWithLoop(arr, qs, qe) {
  var result = arr[qs];

  for(var i = qs + 1; i <= qe; i++) {
    if(arr[i] < result) {
      result = arr[i];
    }
  }

  return result;
}

/**
 * Another solution is to create a 2D array where an entry [i, j] stores the minimum value in range arr[i..j].
 * Minimum of a given range can now be calculated in O(1) time,
 * but preprocessing takes O(n^2) time.
 * Also, this approach needs O(n^2) extra space which may become huge for large input arrays.
 */
function doRMQWith2DArray(arr) {
  var m = [];
  var len = arr.length;

  for(var i = 0; i < len; i++) {
    m[i] = [];
    m[i][i] = i;
    for(var j = i + 1; j < len; j++) {
      if(arr[m[i][j - 1]] < arr[j]) {
        m[i][j] = m[i][j - 1];
      }
      else {
        m[i][j] = j;
      }
    }
  }

  return function (qs, qe) {
    return arr[m[qs][qe]];
  };
}

function doRMQWithSegmentTree(arr) {
  /**
   * A recursive function to get the minimum value in a given range of array indexes.
   * @param {Segment Tree} st
   * @param {Number} ss Starting index of the segment represented by current node, i.e., st[index]
   * @param {Number} se Ending index of the segment represented by current node, i.e., st[index]
   * @param {Number} qs Starting index of query range
   * @param {Number} qe Ending index of query range
   * @param {Number} index Index of current node in the segment tree.
   *                       Initially 0 is passed as root is always at index 0
   */
  function _makeRMQ(st, ss, se, qs, qe, index) {
    // If segment of this node is a part of given range, then return the sum of the segment
    if(qs <= ss && qe >= se) {
      return st[index];
    }

    // If segment of this node is outside the given range
    if(se < qs || ss > qe) {
      return Infinity;
    }

    // If a part of this segment overlaps with the given range
    var mid = getMiddleIndex(ss, se);

    return Math.min(
      _makeRMQ(st, ss, mid, qs, qe, 2 * index + 1),
      _makeRMQ(st, mid + 1, se, qs, qe, 2 * index + 2)
    );
  }

  /**
   * Return minimum of elements in range from index qs (quey start) to qe (query end). It mainly uses _makeRMQ
   * @param {Segment Tree} st
   * @param {Number} n Total number of elements.
   * @param {Number} qs Starting index of query range
   * @param {Number} qe Ending index of query range
   */
  function makeRMQ(st, n, qs, qe) {
    // Check input values for correctness
    if(qs < 0 || qe > n - 1 || qs > qe) {
      return -1;
    }

    return _makeRMQ(st, 0, n - 1, qs, qe, 0);
  }

  /**
   * A recursive function that constructs Segment Tree for array[ss..se].
   * @param {Array} arr
   * @param {Segment Tree} st
   * @param {Number} ss Starting index of the segment represented by current node, i.e., st[index]
   * @param {Number} se Ending index of the segment represented by current node, i.e., st[index]
   * @param {Number} index Index of current node in Segment Tree
   */
  function _constructST(arr, st, ss, se, index) {
    // If there is one element in array, store it in current node of segment tree and return
    if(ss == se) {
      st[index] = arr[ss];
      return arr[ss];
    }

    // If there are more than one elements, then recur for left and
    // right subtrees and store the sum of values in this node
    var mid = getMiddleIndex(ss, se);

    st[index] = _constructST(arr, st, ss, mid, index * 2 + 1) +
             _constructST(arr, st, mid + 1, se, index * 2 + 2);

    return st[index];
  }

  /**
   * We start with a segment arr[0 . . . n-1] and every time we divide the current segment into two halves (if it has not yet become a segment of length 1),
   * and then call the same procedure on both halves, and for each such segment we store the sum in corresponding node.
   * All levels of the constructed segment tree will be completely filled except the last level.
   * Also, the tree will be a Full Binary Tree because we always divide segments in two halves at every level.
   * Since the constructed tree is always full binary tree with n leaves, there will be n - 1 internal nodes. So total number of nodes will be 2*n – 1.
   * Height of the segment tree will be st2. Since the tree is represented using array and relation between parent and child indexes must be maintained,
   * size of memory allocated for segment tree will be 2 * Math.pow(2, Math.log2(n)) - 1
   */
  function constructST(arr) {
    // Height of Segment Tree.
    var x = Math.ceil(Math.log2(arr.length));
    // Maximum size of segment tree
    var maxSize = 2 * Math.pow(2, x) - 1;
    var st = new Array(maxSize);

    // var st = [];

    _constructST(arr, st, 0, arr.length - 1, 0);

    return st;
  }

  function getMiddleIndex(s, e) {
    return Math.floor(s + (e - s) / 2);
  }

  var st = constructST(arr);

  return function (qs, qe) {
    return makeRMQ(st, arr.length, qs, qe);
  };
};


var arr = [10, 12, 22, 8, 444, 53, 16, 27, 12, 99];


console.log(doRMQWithLoop(arr, 5, 8));
console.log(doRMQWith2DArray(arr)(5, 8));
console.log(doRMQWithSegmentTree(arr)(5, 8));
