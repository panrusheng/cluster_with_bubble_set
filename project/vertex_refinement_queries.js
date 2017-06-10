/**
 * Created by prs on 2017/6/7.
 */
function get_H_from_h(H,h0,danger,k){
    var h = new Array();
    for(var i = 0; i < h0.length;i++){
        h[i] = h0[i];
    }//copy h0 to h, make h0 avoid being modified
    for(var i = 0 ;i < h.length;i++){
        if(h[i]===0) continue;
        var equiv = new Array();
        equiv.push(i);
        for(var j = i+1 ;j < h.length;j++) {
            if(h[j]===0) continue;
            if(h[j].toString()===h[i].toString()){
                equiv.push(j);
                h[j] = 0;
            }
        }
        if(equiv.length<k){
            for(var l = 0;l<equiv.length;l++){
                danger.add(equiv[l]);
            }
        }
        H.push(equiv);
    }
}

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
//get h1, h2
var h1 = new Array(SIZE);//the degree of each node
var h2 = new Array(SIZE);//the degree of adjacent nodes of each node
for(var i = 0; i < h1.length; i++){
    h1[i] = 0;
    for(var j = 0; j < graph.length; j++){
        h1[i]+=graph[i][j];
    }
}
for(var i = 0; i < h2.length; i++){
    h2[i] = new Array();
    for(var j = 0; j < graph.length; j++){
        if(graph[i][j]!==0){
            h2[i].push(h1[j]);
        }
    }
}
var k = 3;
var danger1 = new Set();
var danger2 = new Set();
var H1 = new Array();
var H2 = new Array();
get_H_from_h(H1,h1,danger1,k);
get_H_from_h(H2,h2,danger2,k);

document.write("<br>k=",k,"<br>");
document.write("<br>k1:<br>");
for(var item of danger1){
    document.write(nodes[item]);
    document.write(", ");
}
document.write("<br>k2:<br>");
for(var item of danger2){
    document.write(nodes[item]);
    document.write(", ");
}
document.write("<br>");
document.write("<br>h1:&emsp;h2:<br>");
for(var i = 0;i<SIZE;i++){
    document.write(h1[i]);
    document.write("&emsp;");
    document.write("{");
    document.write(h2[i]);
    document.write("}<br>");
}







