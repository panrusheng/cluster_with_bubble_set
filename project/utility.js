/**
 * Created by prs on 2017/6/18.
 */
function print_array(mode,a){
    document.write("{");
    if(mode===0) {//directly print
        for (var i = 0; i < a.length - 1; i++) {
            document.write(a[i], ", ");
        }
        document.write(a[i]);
    }
    else if(mode===1){//print with name
        for(var i=0; i < a.length - 1; i++){
            document.write(nodes[a[i]],", ");
        }
        document.write(nodes[a[i]]);
    }
    document.write("}");
}