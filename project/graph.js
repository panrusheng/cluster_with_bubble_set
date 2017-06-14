/**
 * Created by prs on 2017/6/14.
 */
//nodes, links are defined in net_data.js
const SIZE = nodes.length;
var graph = new Array(SIZE);
for(var i = 0; i < graph.length; i++){// initialize the 2D graph
    graph[i] = new Array(SIZE);
    for(var j = 0; j < graph[i].length; j++){
        graph[i][j] = 0;
    }
}
for (var i in links) {// build the graph
    var a,b;
    a = nodes.indexOf(links[i].source);
    b = nodes.indexOf(links[i].target);
    graph[a][b] = 1;
    graph[b][a] = 1;
}