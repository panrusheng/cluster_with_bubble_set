/**
 * Created by prs on 2017/6/7.
 */
function vertex_refinement_queries(query) {
    var k1 = query.k1;
    var k2 = query.k2;
    var k3 = query.k3;
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
            var equiv = [i];
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

    function get_H_from_h3(H,h0,danger,k){
        var h = new Array();
        for(var i = 0; i < h0.length;i++){
            h[i] = h0[i];
        }//copy h0 to h, make h0 avoid being modified
        for(var i = 0 ; i < h.length;i++){
            if(h[i]===0) continue;
            var is_same = true;
            var equiv = [i];
            for(var j = i+1 ; j < h.length;j++) {
                if(h[j]===0) continue;
                if(h[j].length !== h[i].length){
                    is_same = false;
                }
                else {
                    for(var l = 0; l < h[i].length; l++) {
                        if (h[i][l].toString() !== h[j][l].toString()) {
                            is_same = false;
                        }
                    }
                }
                if(is_same){
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
        for(var j = 0; j < graph.length; j++){
            if(graph[i][j]!==0){
                h3[i].push(h2[j]);
            }
        }
        h3[i].sort(compare_2);
    }

    var danger1 = new Set();
    var danger2 = new Set();
    var danger3 = new Set();
    var H1 = new Array();
    var H2 = new Array();
    var H3 = new Array();
    get_H_from_h(H1,h1,danger1,k1);
    get_H_from_h(H2,h2,danger2,k2);
    get_H_from_h3(H3,h3,danger3,k3);
    return {danger1:danger1,danger2:danger2,danger3:danger3}
}


// document.write("<br>Vertex Refinement Query : <br>");
// document.write("<br>k1 = ",k1,"<br>");
// for(var item of danger1){
//     document.write(nodes[item]);
//     document.write(", ");
// }
//
// document.write("<br>k2 = ",k2,"<br>");
// for(var item of danger2){
//     document.write(nodes[item]);
//     document.write(", ");
// }
//
// document.write("<br>k3 = ",k3,"<br>");
// for(var item of danger3){
//     document.write(nodes[item]);
//     document.write(", ");
// }
// document.write("<br>");
// document.write("<br>h1:&emsp;h2:&emsp;h3:<br>");
// for(var i = 0;i<SIZE;i++){
//     document.write(h1[i]);
//     document.write("&emsp;");
//     document.write("{");
//     document.write(h2[i]);
//     document.write("}");
//     document.write("&emsp;");
//     document.write("{");
//     for(var j = 0; j < h3[i].length-1;j++){
//         print_array(0,h3[i][j]);
//         document.write(", ");
//     }
//     print_array(0,h3[i][j]);
//     document.write("}<br>");
// }







