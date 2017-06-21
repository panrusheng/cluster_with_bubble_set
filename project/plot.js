/**
 * Created by prs on 2017/6/10.
 */

//part 1: node-link force
var fnodes = d3.range(nodes.length).map(function(i) {
    return {
       index: nodes[i]
    };
});
var flinks = d3.range(links.length).map(function(i) {
    return {
        source: nodes.indexOf(links[i].source),
        target: nodes.indexOf(links[i].target)
    };
});
var degree = new Array(SIZE);//the degree of each node
for(var i = 0; i < degree.length; i++){
    degree[i] = 0;
    for(var j = 0; j < graph.length; j++){
        degree[i]+=graph[i][j];
    }
}
var width = 1000;
var height = 1000;
var svg = d3.select("body")
    .append("svg")
    .attr("width",width)
    .attr("height",height)
    .attr("margin",0)
    .attr("padding",0)
    .attr("display","block");

// 通过布局来转换数据，然后进行绘制
var simulation = d3.forceSimulation(fnodes)
    .force("link", d3.forceLink(flinks).distance(150))
    .force("charge",d3.forceManyBody())
    .force("center",d3.forceCenter(width/2, height/2));

var color = d3.scaleOrdinal(d3.schemeCategory20);
// 绘制
var svgFlinks = svg.selectAll("line")
    .data(flinks)
    .enter()
    .append("line")
    .style("stroke","#ccc")
    .style("stroke-width",1.5);

var svgFnodes = svg.selectAll("circle")
    .data(fnodes)
    .enter()
    .append("circle")
    .attr("r",function (_,i) {
        var radix = Math.log(degree[i])/Math.log(d3.max(degree))*Math.sqrt(d3.max(degree));
        var min = 3;
        return radix>min?radix:min;
    })
    .style("fill",function(_,i){
        return color(i);
    });

var svgText = svg.selectAll("text")
    .data(fnodes)
    .enter()
    .append("text")
    .style("fill","#000")
    .attr("dx",2)
    .attr("dy",-2)
    .attr("font-size",9)
    .attr("text-anchor","middle")
    .text(function(_,i){return nodes[i];});

function draw(){
    svgFnodes
        .attr("cx",function(d){ return d.x;})
        .attr("cy",function(d){ return d.y;});

    svgFlinks
        .attr("x1",function(d){ return d.source.x; })
        .attr("y1",function(d){ return d.source.y; })
        .attr("x2",function(d){ return d.target.x; })
        .attr("y2",function(d){ return d.target.y; });

    svgText
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return d.y; });

}
simulation.on("tick",draw);

// part 2: bubblesets
function drawBubble(bubble){
    var classes = bubble.node;
    var pad = bubble.pad;
    var size = bubble.size;
    var bubbles = new BubbleSet();
    var allIxs = d3.range(nodes.length);
    var bubbleColor = d3.scaleOrdinal(d3.schemeCategory10);
    function ixToNode(ix) {
        return {
            "x": fnodes[ix].x,
            "y": fnodes[ix].y,
            "width": size,
            "height": size,
        };
    }
    function ixsToEdge(edge) {
        return {
            "x1": fnodes[edge.source].x,
            "y1": fnodes[edge.source].y,
            "x2": fnodes[edge.target].x,
            "y2": fnodes[edge.target].y,
        };
    }

    function getNodeSets(node, others) {
        var nSet = {};
        node.forEach(function(ix) {
            nSet[ix] = true;
        });
        var actualOthers = others.filter(function(ix) {
            return !nSet[ix]; // remove rectangles that are in our set
        });
        return [ node.map(ixToNode), actualOthers.map(ixToNode) ]
    }

    function getEdges(node) {
        var nSet = {};
        node.forEach(function(ix) {
            nSet[ix] = true;
        });
        return flinks.filter(function(e) {
            return nSet[e.source] && nSet[e.target]; // only consider fully contained edges
        }).map(ixsToEdge);
    }

    function doBubbles(node, others, elem) {
        var nodeSets = getNodeSets(node, others);
        var list = bubbles.createOutline(
            BubbleSet.addPadding(nodeSets[0], pad),
            BubbleSet.addPadding(nodeSets[1], pad),
            getEdges(node)
        );
        var outline = new PointPath(list).transform([
            new ShapeSimplifier(0.0),
            new BSplineShapeGenerator(),
            new ShapeSimplifier(0.0),
        ]);
        elem.attr("d", outline.toString());
    }

    for(var i = 0; i < classes.length; i++){
        if(classes[i].tag===1) {//整块画
            var bubblePath = svg.append("path")
                .attr("fill",bubbleColor(i*2%10))
                .attr("opacity","0.3")
                .attr("stroke","black");
            doBubbles(classes[i].data, allIxs, bubblePath);
        }
        else if(classes[i].tag===0){//单个画
            for(var j = 0;j<classes[i].data.length;j++){
                var class_t = [classes[i].data[j]];
                var path_t = svg.append("path")
                    .attr("fill",bubbleColor(i*2%10))
                    .attr("opacity","0.3")
                    .attr("stroke","black");
                doBubbles(class_t, allIxs, path_t);
            }
        }
    }
}





