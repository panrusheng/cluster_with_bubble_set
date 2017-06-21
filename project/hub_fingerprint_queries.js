/**
 * Created by prs on 2017/6/13.
 */
function hub_fingerprint_queries(query){
    var hub = query.hub;
    var k = query.k;
    var index = query.depth;
    //calculate shortest path
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
    //def of function fi(x)
    function f(i,hub,node){//fingerprint with hub
        return (path[hub][node]>i) ? 0 : path[hub][node];
    }

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
            finger_print[i][j] = f(index,hub[j],i);
        }
    }
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
        finger_table.push([finger_print[i],equiv]);
        if(equiv.length < k){
            for(var l = 0;l<equiv.length;l++){
                d_F.add(equiv[l]);
            }
        }
    }
    return {nodeSet:d_F,fingerTable:finger_table};
}


// document.write("<br>Hub Fingerprint Query : <br>");
// document.write("<br>k = ",k,"<br> ");
// for(var item of d_F){
//     document.write(nodes[item]);
//     document.write(", ");
// }
// document.write("<br><br>finger table:<br>");
// for(var i = 0; i < finger_table.length; i++){
//     print_array(0,finger_table[i][0]);
//     document.write(": ");
//     document.write(finger_table[i][1].length,", ");
//     print_array(1,finger_table[i][1]);
//     document.write("<br>");
// }
