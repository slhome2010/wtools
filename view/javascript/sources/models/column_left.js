export default function menudata(token){
    return webix.ajax("index.php?route=common/column_left&token="+token);
}