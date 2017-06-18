/**
 * Created by prs on 2017/6/13.
 */
const INF = 2*SIZE;
var path = new Array(SIZE);
for(var i = 0; i < path.length; i++){// initialize the 2D graph
    path[i] = new Array(SIZE);
    for(var j = 0; j < path[i].length; j++){
        path [i][j] = INF;
    }
    path[i][i] = 0;
}
for(var i = 0; i < path.length;i++){
    var queue = [i];
    while(queue.length){
        var tmp = queue[0];
        queue.shift();
        for(var j = 0; j < graph[tmp].length; j++){
            if(graph[tmp][j] === 1 && path[i][j] === INF) {
                path[i][j] = path[i][tmp]+1;
                queue.push(j);
            }
        }
    }
}
// for(var i in path){
//     document.write(path[i]);
//     document.write("<br><br>");
// }
function f(i,hub,node){//fingerprint with hub
    return (path[hub][node]>i) ? 0 : path[hub][node];
}
// var hub = [1,13,35,56,70];
var hub = [1,3,5,7];
var finger_print = new Array(SIZE);
for(var i = 0; i < SIZE; i++){
    var is_hub = 0;
    for(var j = 0; j < hub.length; j++){
        is_hub |= (i===hub[j]);
    }
    if(is_hub) {//jump the hub nodes
        finger_print[i] = 0;
        continue;
    }
    finger_print[i] = new Array(hub.length);
    for(var j = 0; j < hub.length; j++){
        finger_print[i][j] = f(1,hub[j],i);
    }
}
// for(var i in finger_print){
//     document.write(finger_print[i]);
//     document.write("<br><br>");
// }
var k = 10;
var d_F = new Set();
var finger_table = new Array();
var fp = new Array();
for(var i = 0; i < SIZE;i++){
    fp.push(finger_print[i]);
}
for(var i = 0 ;i < SIZE;i++){
    if(fp[i]===0) continue;
    var equiv = [i];
    var tmp = fp[i].toString();
    for(var j = i+1 ;j < SIZE;j++) {
        if(fp[j]===0) continue;
        if(fp[j].toString()===tmp){
            equiv.push(j);
            fp[j] = 0;
        }
    }
    finger_table.push([finger_print[i],equiv.length]);
    if(equiv.length < k){
        for(var l = 0;l<equiv.length;l++){
            d_F.add(equiv[l]);
        }
    }
}

document.write("<br>Hub Fingerprint Query : <br>");
document.write("<br>k = ",k,"<br> ");
for(var item of d_F){
    document.write(nodes[item]);
    document.write(", ");
}