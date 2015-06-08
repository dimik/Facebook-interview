function generateCatalanSequence(n) {
    var result = [ 1 ];
    var i = 0;

    while(i < n) {
        result[i + 1] = result[i] * result[n - i];
        i++;
    }

    return result;
}
