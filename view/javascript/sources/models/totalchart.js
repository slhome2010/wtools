export default function chartdata(token){
    return webix.ajax("index.php?route=report/total/getDataForTotalChart&token="+token);
}