export default function chartdata(token){
    return webix.ajax("index.php?route=order/order/getDataForChart&token="+token);
}