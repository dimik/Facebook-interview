/**
 * Simple Vector rotation implementation for Facebook interview
 * @class
 * @name Vector
 * @param {Array} data Vector data
 */
function Vector(data) {
  this._data = data;
  this._index = 0;
}

/**
 * Rotates Vector to the left or to the right (negative indexes) and returns Vector data
 * @function
 * @name Vector.rotate
 * @param {Number} index Rotation index
 * @returns {Array} Vector data
 */
Vector.prototype.rotate = function (index) {
  var n = this._data.length;
  var lastIndex = n - 1;
  index = this._normalize(index);

  if(n < 2 || index == 0) {
    return this._data;
  }
  // Store current index
  this._index += index;

  // At this step reverse whole data
  this.reverse(0, lastIndex);
  // Reverse sections around index
  this.reverse(0, lastIndex - index);
  this.reverse(n - index, lastIndex);

  return this._data;
};

/**
 * Normalizes rotation index
 * @private
 * @function
 * @name Vector._normalize
 * @param {Number} index Rotation index
 * @returns {Number} Normalized index
 */
Vector.prototype._normalize = function (index) {
  var n = this._data.length;
  var remainder = index % n;
  /**
   * Base case
   */
  if(remainder == 0) {
    return 0;
  }
  /**
   * Use remainder if index is larger than data length.
   */
  if(Math.abs(index) > n) {
    index = remainder;
  }
  /**
   * Fix negative indexes
   */
  if(index < 0) {
    return n + index;
  }

  return index;
};

/**
 * Swaps two indexes
 * @function
 * @name Vector.swap
 * @param {Number} index1
 * @param {Number} index2
 */
Vector.prototype.swap = function (index1, index2) {
  var data = this._data;
  var tmp = data[index1];

  data[index1] = data[index2];
  data[index2] = tmp;
};

/**
 * Reverse order of data segment from the start to the end
 * @function
 * @name Vector.reverse
 * @param {Number} start Index of start
 * @param {Number} end Index of end
 */
Vector.prototype.reverse = function (start, end) {
  while(start < end) {
    this.swap(start, end);
    start++;
    end--;
  }
};

/**
 * Reset Vector rotation to the initial.
 * @function
 * @name Vector.reset
 */
Vector.prototype.reset = function () {
  this.rotate(-this._index);
  this._index = 0;
};

var vec = new Vector(['a', 'b', 'c', 'd', 'e']);

console.log('Rotate Vector to the left');
console.log('[abcde] <= 3 ', vec.rotate(3));
vec.reset();
console.log('[abcde] <= 1 ', vec.rotate(1));
vec.reset();
console.log('Rotate Vector to the left more than data length');
console.log('[abcde] <= 7 ', vec.rotate(7));
vec.reset();
console.log('Rotate Vector to the right with negative index');
console.log('[abcde] => 1 (-1) ', vec.rotate(-1));
vec.reset();
console.log('Rotate Vector to the right more than data length');
console.log('[abcde] => 7 (-7) ', vec.rotate(-7));
