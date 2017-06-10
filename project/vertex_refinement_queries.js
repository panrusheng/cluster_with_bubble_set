/**
 * Created by prs on 2017/6/7.
 */

var nodes_with_index = d3.range(nodes.length).map(function(i) {
    return {
           index: nodes[i]
    };
});
var links_with_index = d3.range(links.length).map(function(i) {
    return {
           source: nodes.indexOf(links[i].source),
           target: nodes.indexOf(links[i].target)
    };
});
var width = 800;
var height = 600;
var svg = d3.select("body")
    .append("svg")
    .attr("width",width)
    .attr("height",height);

// 通过布局来转换数据，然后进行绘制
var simulation = d3.forceSimulation(nodes_with_index)
    .force("link", d3.forceLink(links_with_index).distance(100))
    .force("charge",d3.forceManyBody())
    .force("center",d3.forceCenter(width/2, height/2));


var color = d3.scaleOrdinal(d3.schemeCategory20);
// 绘制
var svg_links_with_index = svg.selectAll("line")
    .data(links_with_index)
    .enter()
    .append("line")
    .style("stroke","#ccc")
    .style("stroke-width",1.5);

var svg_nodes_with_index = svg.selectAll("circle")
    .data(nodes_with_index)
    .enter()
    .append("circle")
    .attr("r",4)
    .style("fill",function(d,i){
        return color(i);
    })
    .attr("cx",function(d){return d.x;})
    .attr("cy",function(d){return d.y;});

var svg_text = svg.selectAll("text")
    .data(nodes_with_index)
    .enter()
    .append("text")
    .style("fill","#000")
    .attr("dx",20)
    .attr("dy",10)
    .text(function(d){return d.name;});

console.log("转换后的nodes_with_index links_with_index数据:");
console.log(nodes_with_index);
console.log(links_with_index);

function draw(){
    svg_nodes_with_index
        .attr("cx",function(d){console.log(d);return d.x;})
        .attr("cy",function(d){return d.y;});

    svg_text
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return d.y; });

    svg_links_with_index
        .attr("x1",function(d){return d.source.x; })
        .attr("y1",function(d){ return d.source.y; })
        .attr("x2",function(d){ return d.target.x; })
        .attr("y2",function(d){ return d.target.y; });
}
simulation.on("tick",draw);

// node analysis
function get_H_from_h(H,h0,danger, k){
    var h = h0;
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

document.write("<br>h1:  h2:<br>");
for(var i = 0;i<SIZE;i++){
    document.write(h1[i]);
    document.write("  ");
    document.write("{");
    document.write(h2[i]);
    document.write("}<br>");
}







