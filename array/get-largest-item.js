var getLargestItem = function (items) {
    var cur = items[0];
    var idx = [0];

    for(var i = 0, len = items.length; i < len; i++) {
        if(i == 0 || items[i] > cur) {
            cur = items[i];
            idx = [i];
        }
        else if(items[i] == cur) {
            idx.push(i);
        }
    }

    return { val: cur, idx: idx };
};

module.exports = getLargestItem;
