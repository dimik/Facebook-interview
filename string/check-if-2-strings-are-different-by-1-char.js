/**
 * Use hash to store symbols from string and their quantity
 */
function processStr(s1, s2) {
  // Use hash to store symbols from string and their quantity
  var t = {};
  var len1 = s1.length;
  var len2 = s2.length;

  // Base case
  // Proceed only if the difference in length of both strings is <= 1
  if(Math.abs(len1 - len2) > 1) {
    return false;
  }

  // Start iterating through the longer string
  var one = len1 > len2? s1 : s2;
  var another = len1 > len2? s2 : s1;

  console.log(one, another);
  for(var i = 0, len = one.length; i < len; i++) {
    var c = one.charAt(i);

    // If the character already exists, increase the value by 1
    if(c in t) {
      t[c]++;
    }
    else {
      t[c] = 1;
    }
  }

  // Iterate through the another string and instead of inserting,
  // delete the entries with each characters from the hash.
  for(var i = 0, len = another.length; i < len; i++) {
    var c = another.charAt(i);

    // Decrease the value by 1 and if it is already 1, remove the entry.
    if(c in t) {
      if(t[c] == 1) {
        delete t[c];
      }
      else {
        t[c]--;
      }
    }
  }

  // At the end, if the number of keys in hash is 1 and the value of that only key == 1, you return true
  var keys = Object.keys(t);

  return keys.length === 1 && t[keys[0]] === 1;
}

console.log(processStr("cas", "car"));
console.log(processStr("cas", "cars"));
console.log(processStr("cas", "care"));
