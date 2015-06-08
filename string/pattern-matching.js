function matchPattern(s, p) {
  if(s.length == 0) {
    return p.length == 0 || p[0] == '*';
  }
  if(p.length == 0) {
    return s.length == 0;
  }
  var curReg = p[0];
  var nextReg = p.length > 1? p[1] : null;
  var curString = s[0];

  function match(reg, char) {
    return reg == char || reg == '.';
  }

  if(nextReg == null || nextReg != '*') {
    return match(curReg, curString) || matchPattern(p.substring(1), s.substring(1));
  }
  else {
    if(nextReg == '*') {
      return (match(curReg, curString) && matchPattern(p, s.substring(1))) || matchPattern(p.substring(2), s);
    }
    else {
      return false;
    }
  }
}

console.log(matchPattern("*ogle", "Google"), matchPattern("fragile*", "agile"));
