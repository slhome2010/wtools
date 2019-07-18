/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
export default webix.ui.datafilter.staFilter = {
    getInputNode: function (node) {
        return node.firstChild ? node.firstChild.firstChild : {value: null};
    },
    getValue: function (node) {
        return this.getInputNode(node).value;
    },
    setValue: function (node, value) {
        this.getInputNode(node).value = value.toString();
    },
    refresh: function (master, node, column) {
        master.registerFilter(node, column, this);
        column.compare = column.compare || function (value, filter) {
            if (filter === "")
                return true;
            else if (filter === "1")
                return value == 'open';
            else if (filter === "0")
                return value == 'closed';
        };
        node.onchange = function () {
            master.filterByAll();
        };
        node.onclick = webix.html.preventEvent;
    },
    render: function (a, b) {
        return  "<select id=" + b.columnId + ">" +
                "<option value=''></option>" +
                "<option value='1' class='order-status order-open'>Открыта</option>" +
                "<option value='0' class='order-status order-closed'>Закрыта</option>" +
                "</select>";
    }
};

