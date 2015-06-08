module.exports = function (graph, startNode, targetNode) {
  var parents = [];
  var queue = [];
  var visited = [];
  var current;

  queue.push(startNode);
  parents[startNode] = null;
  visited[startNode] = true;

  while(queue.length) {
    current = queue.shift();
    if(current === targetNode) {
      return buildPath(parents, targetNode);
    }
    for(var i = 0; i < graph[current].length; i++) {
      if(i !== current && graph[current][i] && !visited[i]) {
        parents[i] = current;
        visited[i] = true;
        queue.push(i);
      }
    }
  }
  return null;
};

function buildPath(parents, targetNode) {
  var result = [targetNode];

  while(parents[targetNode] !== null) {
    targetNode = parents[targetNode];
    result.push(targetNode);
  }

  return result.reverse();
}
