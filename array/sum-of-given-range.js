/**
 * A simple solution is to run a loop from Start to End
 * and calculate sum of elements in given range.
 * To update a value, simply do arr[i] = x.
 * The first operation takes O(n) time and second operation takes O(1) time.
 */
function getSumWithLoop(arr, s, e) {
  var result = 0;

  for(var i = s; i <= e; i++) {
    result += arr[i];
  }

  return result;
}

/**
 * Another solution is to create another array and store sum in this array.
 * Sum of a given range can now be calculated in O(1) time,
 * but update operation takes O(n) time now.
 * This works well if the number of query operations are large and very few updates.
 */
function getSumWithArrayOfSum(arr) {
  var sums = [ arr[0] ];

  for(var i = 1, len = arr.length; i < len; i++) {
    sums[i] = sums[i - 1] + arr[i];
  }

  return function (s, e) {
    return sums[e] - sums[s - 1];
  };
}


/**
 * Using Segment Tree we can obtain O(logN) complexity for getting sum and elements updating.
 */
function getSumWithSegmentTree(arr) {
  /**
   * A recursive function to get the sum of values in given range of the array.
   * @param {Segment Tree} st
   * @param {Number} ss Starting index of the segment represented by current node, i.e., st[index]
   * @param {Number} se Ending index of the segment represented by current node, i.e., st[index]
   * @param {Number} qs Starting index of query range
   * @param {Number} qe Ending index of query range
   * @param {Number} index Index of current node in the segment tree.
   *                       Initially 0 is passed as root is always at index 0
   */
  function _getSum(st, ss, se, qs, qe, index) {
    // If segment of this node is a part of given range, then return the sum of the segment
    if(qs <= ss && qe >= se) {
      return st[index];
    }

    // If segment of this node is outside the given range
    if(se < qs || ss > qe) {
      return 0;
    }

    // If a part of this segment overlaps with the given range
    var mid = getMiddleIndex(ss, se);

    return _getSum(st, ss, mid, qs, qe, 2 * index + 1) +
           _getSum(st, mid + 1, se, qs, qe, 2 * index + 2);
  }

  /**
   * Returns sum of elements in range from index qs (quey start) to qe (query end). It mainly uses _getSum
   * @param {Segment Tree} st
   * @param {Number} n Total number of elements.
   * @param {Number} qs Starting index of query range
   * @param {Number} qe Ending index of query range
   */
  function getSum(st, n, qs, qe) {
    // Check input values for correctness
    if(qs < 0 || qe > n - 1 || qs > qe) {
      return -1;
    }

    return _getSum(st, 0, n - 1, qs, qe, 0);
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
    return getSum(st, arr.length, qs, qe);
  };
}

function getSumWithFenwickTree(arr) {
  var t = [];
  var len = arr.length;

  function g(x) {
    return x & ( x + 1 );
  }

  for(var i = 0; i < len; i++) {
    t[i] = 0;
    for(var j = g(i); j <= i; j++) {
      t[i] += arr[j];
    }
  }

  return {
    getSum: function (qs, qe) {
      var result = 0;
      var l = qs - 1;
      var r = qe;

      while(r >= 0) {
        result += t[r];
        r = g(r) - 1;
      }
      while(l >= 0) {
        result -= t[l];
        l = g(l) - 1;
      }

      return result;
    },
    update: function (index, val) {
      arr[index] += val;

      while(index < n) {
        t[index] += val;
        index = index | (index + 1);
      }
    }
  };
}

/**
 * A Fenwick tree or binary indexed tree is a data structure providing efficient methods
 * for calculation and manipulation of the prefix sums of a table of values.
 *
 * Space complexity for fenwick tree is O(n)
 * Time complexity to create fenwick tree is O(nlogn)
 * Time complexity to update value is O(logn)
 * Time complexity to get prefix sum is O(logn)
 *
 * References
 * http://www.geeksforgeeks.org/binary-indexed-tree-or-fenwick-tree-2/
 * https://www.topcoder.com/community/data-science/data-science-tutorials/binary-indexed-trees/
 * http://en.wikipedia.org/wiki/Fenwick_tree
*/
function getPrefixSumByFenwickTree(arr) {
  var t = [];
  var n = arr.length;

  function update(index, val) {
    // index in t[] is 1 more than the index in arr[]
    index = index + 1;

    // Traverse all ancestors and add 'val'
    while(index <= n) {
      // Add 'val' to current node of t[]
      t[index] += val;
      // Update index to that of parent
      index = getNext(index);
    }
  }

  function getNext(index) {
    return index + (index & -index);
  }

  function getSum(index) {
    var result = 0; // Iniialize result
    // index in t[] is 1 more than the index in arr[]
    index = index + 1;

    // Traverse ancestors of t[index]
    while(index > 0) {
      // Add current element of t[] to result
      result += t[index];
      // Move index to parent node
      index = getParent(index);
    }

    return result;
  }

  function getParent(index) {
    return index - (index & -index);
  }

  for(var i = 1; i <= n; i++) {
    t[i] = 0;
  }
  for(var i = 0; i < n; i++) {
    update(i, arr[i]);
  }

  return {
    getSum: getSum,
    update: update
  };
}

var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(getSumWithLoop(arr, 1, 3));
console.log(getSumWithArrayOfSum(arr)(1, 3));
console.log(getSumWithSegmentTree(arr)(1, 3));
console.log(getSumWithFenwickTree(arr).getSum(1, 3));
console.log(getPrefixSumByFenwickTree(arr).getSum(3));
