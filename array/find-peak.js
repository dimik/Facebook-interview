/**
 * We can use Divide and Conquer to find a peak in O(Logn) time.
 * The idea is Binary Search based, we compare middle element with its neighbors.
 * If middle element is greater than both of its neighbors, then we return it.
 * If the middle element is smaller than the its left neighbor,
 * then there is always a peak in left half
 */
function findPeak(arr) {
    function _findPeak(arr, left, right) {
        var mid = Math.floor((left + right) / 2);
        var val = arr[mid];

        if(mid > 0 && arr[mid - 1] > val) {
            return _findPeak(arr, left, mid - 1);
        }
        else if(mid + 1 < arr.length && arr[mid + 1] > val) {
            return _findPeak(arr, mid + 1, right);
        }

        return mid;
    }

    return _findPeak(arr, 0, arr.length - 1);
}

var arr = [1,3,5,1,3,5,1,2,3,8,2,5,7,9,1,1];
console.log(arr, findPeak(arr));

/**
 * For 2D matrix (n, m) the idea is pick middle column j = m/2
 * Find global max on column j at (i, j)
 * Compare (i, j - 1), (I, J), (I, J + 1)
 * Pick left cols if (i, j - 1) > (i, j) similar for the right
 * If (i, j) >= (i, j - 1), (i, j + 1) then (i, j) is 2D peak
 * Complexity O(n log2 m), for single column – O(n)
 */
function find2DPeak(matrix) {
    function _findGlobalMax(matrix, column) {
        var max = 0;
        var index = 0;

        for(var i = 0, len = matrix.length; i < len; i++) {
            if(max < matrix[i][column]) {
                max = matrix[i][column];
                index = i;
            }
        }

        return index;
    }

    function _find2DPeak(matrix, left, right) {
        var mid = Math.floor((left + right) / 2);
        var globalMax = _findGlobalMax(matrix, mid);
        var val = matrix[globalMax][mid];

        if(mid > 0 && matrix[globalMax][mid - 1] > val) {
            right = mid - 1;
            return _find2DPeak(matrix, left, right);
        }
        else if(mid + 1 < matrix[globalMax].length && matrix[globalMax][mid + 1] > val) {
            left = mid + 1;
            return _find2DPeak(matrix, left, right);
        }

        return val;
    }

    if(!matrix.length) {
        return false;
    }

    return _find2DPeak(matrix, 0, matrix[0].length);
}

var matrix = [
    [0, 0, 9, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 0, 0],
    [0, 4, 7, 0, 0, 0, 0]
];
console.log(find2DPeak(matrix));
