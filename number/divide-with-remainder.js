function divAndMod_slow(y, x) {
  var r = 0;

// var op = 0;
  while(y >= x) {
    r += 1;
    y -= x;
// console.log('1:', op++);
  }

  return [r, y];
}

// implement divide operation without using built-in divide operator
function divAndMod(y, x) {
  var r = 0;

  // find the highest position of positive bit of the ratio
  var pos = -1;
var op = 0;
  while(y >= x) {
    pos += 1;
    x <<= 1;
console.log('1:', op++, x, y>x, x.toString(2), pos);
  }

  x >>= 1;
  console.log(x);
  // console.log("y=%d, x=%d, pos=%d", y, x, pos);

  if(pos == -1) {
    return [r, y];
  }

  while(pos >= 0) {
console.log('2:', op++);
    if(y >= x) {
      r += (1 << pos);
      y -= x;
    }

    // console.log("y=%d, x=%d, r=%d, pos=%d", y, x, r, pos);

    x >>= 1;
    pos -= 1;
  }

  return [r, y];
}

var start1 = new Date();
// var y = 100000000;
// var x = 7;
var y = 1;
var x = 3;

console.log('slow');
console.log(divAndMod_slow(y, x));
console.log(new Date() - start1);

var start2 = new Date();

console.log('fast');
console.log(divAndMod(y, x));
console.log(new Date() - start1);

/*
function divideby3(x) {
  var result = 0;

  do {
    x >>= 1;
    result += x;
    x = -x;
  } while(x);

  return result;
}

console.log('divide by 3', divideby3(1));

function divMod(a, b) {
  var tempb = b;
  var left = a;

  // left = a - b;

  for(var i = 0; left >= b; i++){
    left -= b;
  }

  if(left > 0){
    for(var j = 0; tempb > left; j++){
      tempb -= left;
    }
  }

  console.log("The answer is " + i + " and 1/" + j);
}

div(26, 6);
*/
