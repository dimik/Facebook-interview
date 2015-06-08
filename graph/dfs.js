module.exports = function (graph, startNode, targetNode) {
  var stack = [];
  var visited = [];
  var current;

  stack.push(startNode);
  visited[startNode] = true;

  while(stack.length) {
    current = stack.pop();
    if(current === targetNode) {
      return true;
    }
    for(var i = 0; i < graph[current].length; i++) {
      if(i !== current && graph[current][i] && !visited[i]) {
        stack.push(i);
        visited[i] = true;
      }
    }
  }

  return false;
};
