var dfs = require('./dfs');
var bfs = require('./bfs');

var graph = [[1, 1, 0, 0, 1, 0],
             [1, 0, 1, 0, 1, 0],
             [0, 1, 0, 1, 0, 0],
             [0, 0, 1, 0, 1, 1],
             [1, 1, 0, 1, 0, 0],
             [0, 0, 0, 1, 0, 0]];
var shortestPath = bfs(graph, 1, 5);

console.log(shortestPath);

console.log(dfs(graph, 1, 5));
