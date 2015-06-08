function mutateString(s) {
  if(s == null || s.length == 0) {
    return s;
  }

  var result = [];
  var currChar;

  for(var i = 0; i < s.length; i++) {
    currChar = s.charAt(i);

    if(currChar != 'b') {
      result.push(currChar);
      if(currChar == 'a') {
        result.push(currChar);
      }
    }
  }

  return result.join('');
}

console.log(mutateString('fibonacci'))
