/**
 * Created by prs on 2017/6/14.
 */
setTimeout(function(){
    simulation.stop();//等待力导图画完之后开始画bubbleSet
    var classes = new Array();//tag: 0表示单个画；1表示整块画。data为需要画bubbleSet的节点组
    query1 = hub_fingerprint_queries({
        k:10,
        depth:1,//set the i of f_i(x) as depth
        hub:[2,7,14,23,31,46,50,62,73]//hub nodes group
    });
    query2 = vertex_refinement_queries({
        k1:10,
        k2:10,
        k3:2
    });
    classes.push({tag:1,data:Array.from(query1.nodeSet)});
    classes.push({tag:1,data:Array.from(query2.danger1)});
    classes.push({tag:1,data:Array.from(query2.danger2)});
    classes.push({tag:0,data:Array.from(query2.danger3)});
    var bubble = {
        node:classes,
        size:2,
        pad:5
    };
    drawBubble(bubble);
},2000);//等待时间为2000ms