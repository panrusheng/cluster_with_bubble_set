/**
 * Created by prs on 2017/6/7.
 */
var compare_1 = function (x, y) {//1-D
    if (x < y) {
        return -1;
    }
    if (x > y) {
        return 1;
    }
    return 0;
};

var compare_2 = function (x,y){//2-D:array
    if (x.toString() < y.toString()) {
        return -1;
    }
    if (x.toString() > y.toString()) {
        return 1;
    }
    return 0;
}

function get_H_from_h(H,h0,danger,k){
    var h = new Array();
    for(var i = 0; i < h0.length;i++){
        h[i] = h0[i];
    }//copy h0 to h, make h0 avoid being modified
    for(var i = 0 ;i < h.length;i++){
        if(h[i]===0) continue;
        var equiv = new Array();
        equiv.push(i);
        var tmp = h[i].toString();
        for(var j = i+1 ;j < h.length;j++) {
            if(h[j]===0) continue;
            if(h[j].toString()===tmp){
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

//get h1, h2, h3
var h1 = new Array(SIZE);//the degree of each node
var h2 = new Array(SIZE);//the multiset of each neighbour's degree
var h3 = new Array(SIZE);
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
    h2[i].sort(compare_1);
}
for(var i = 0; i < h3.length; i++){
    h3[i] = new Array();
    var tmp = new Array();
    for(var j = 0; j < graph.length; j++){
        if(graph[i][j]!==0){
            tmp.push(h2[j]);
        }
    }
    tmp.sort(compare_2);
    for(var j = 0; j < tmp.length; j++){
        for(var k = 0; k < tmp[j].length; k++){
            h3[i].push(tmp[j][k]);
        }
    }
}

var k1 = 2, k2 = 2 ,k3 = 2;
var danger1 = new Set();
var danger2 = new Set();
var danger3 = new Set();
var H1 = new Array();
var H2 = new Array();
var H3 = new Array();
get_H_from_h(H1,h1,danger1,k1);
get_H_from_h(H2,h2,danger2,k2);
get_H_from_h(H3,h3,danger3,k3);

document.write("<br>k1 = ",k1,"<br>");
for(var item of danger1){
    document.write(nodes[item]);
    document.write(", ");
}

document.write("<br>k2 = ",k2,"<br>");
for(var item of danger2){
    document.write(nodes[item]);
    document.write(", ");
}

document.write("<br>k3 = ",k3,"<br>");
for(var item of danger3){
    document.write(nodes[item]);
    document.write(", ");
}
document.write("<br>");
document.write("<br>h1:&emsp;h2:&emsp;h3:<br>");
for(var i = 0;i<SIZE;i++){
    document.write(h1[i]);
    document.write("&emsp;");
    document.write("{");
    document.write(h2[i]);
    document.write("}");
    document.write("&emsp;");
    document.write("{");
    document.write(h3[i]);
    document.write("}<br>");
}







