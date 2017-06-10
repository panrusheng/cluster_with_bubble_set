/**
 * Created by prs on 2017/6/10.
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