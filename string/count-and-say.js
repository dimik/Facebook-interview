/**
 * @param {String} nums String of numbers '1121'
 * @return {String} '211211'
 */
var countAndSay = function(n) {
    var cur = n[0];
    var curNum = 1;
    var result = "";

    for(var i = 0, len = n.length; i < len; i++) {
        if(n[i + 1] == cur) {
            curNum++;
        }
        else {
            result += curNum + '' + cur;
            cur = n[i + 1];
            curNum = 1;
        }
    }

    return result;
};
