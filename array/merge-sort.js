/**
* Sort list A into order, and return result.
*/
function mergeSort(arr) {
    var n = arr.length;

    if(n == 1) return arr;

    var mid = Math.floor(n / 2);
    var leftPart = arr.slice(0, mid);
    var rightPart = arr.slice(mid, n);

    return _mergeFn(mergeSort(leftPart), mergeSort(rightPart));
}

/**
 * Given two sorted sequences "a" and "b", return their merge.
 */
function _mergeFn(a, b) {
    var i = 0;
    var j = 0;
    var aLen = a.length;
    var bLen = b.length;
    var result = [];

    while(i < aLen && j < bLen) {
        if(a[i] < b[j]) {
            result.push(a[i]);
            i += 1;
        }
        else {
            result.push(b[j]);
            j += 1;
        }
    }

    if(i < aLen) {
        result.push.apply(result, a.slice(i, aLen));
    }
    if(j < bLen) {
        result.push.apply(result, b.slice(j, bLen));
    }

    return result;
}


var arr = [];
for(var i = 0, n = 10; i < n; i++) {
    arr.push(Math.round(Math.random() * n));
}
var case1 = new Date();
var arr1 = mergeSort(arr);
console.log(new Date() - case1, arr1);
var arr2 = [];
for(var i = 0, n = 10; i < n; i++) {
    arr2.push(Math.round(Math.random() * n));
}
var case2 = new Date();
arr2.sort();
console.log(new Date() - case2, arr2);
