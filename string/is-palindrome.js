function isPalindrome(s) {
  // Zero- or one-character string is a palindrome.
  if(s.length < 2) {
    return true;
  }
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return s.split('').reverse().join('') === s;
}
