/**
 * Created by prs on 2017/6/13.
 */
function f1(hub,node){//fingerprint with hub
    if(graph[hub][node]===1||graph[node][hub]===1){
        return 1;
    }
    return 0;
}
// how to choose the hub and query???
// ...