/**
 * Using similar approch to QuickSort partition algorithm.
 * Do not preserve order but less assigments.
 * O(n log n)
 */
function moveZerosToTheEnd(arr) {
  for(var i = 0, j = arr.length - 1; i < j;) {
    if(arr[i] === 0) {
      if(arr[j] !== 0) {
        arr[i] = arr[j];
        arr[j] = 0;
        i++;
      }
      j--;
    }
    else {
      i++;
    }
  }

  return arr;
}

var arr = [0,1,2,3,0,0,4,5,0,0];
console.log(moveZerosToTheEnd(arr));
