import {JetView} 	from "webix-jet";
import outplugins 	from "views/menus/export";
import formview 	from "views/menus/formview";
import paging 		from "views/modules/paging";
import staFilter 	from "views/modules/order_statesfilter";
import staTemplate 	from "views/templates/order_states";

export default class OrderView extends JetView {
    config() {
        return layout;
    }
    init(view) {
        $$('order-form').bind($$('order-order'));        
    }
}

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " день " : d < 5 ? " дня " : " дней ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " час " : h < 5 ? " часа " : " часов ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " минута " : m < 5 ? " минуты " : "минут ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " секунда" : " секунд") : "";
    return dDisplay + hDisplay + mDisplay;
}

function sortByAge(a, b) {
    a = a._Age;
    b = b._Age;
    return a > b ? 1 : (a < b ? -1 : 0);
}

webix.ui.datafilter.ageFilter = webix.extend({
    render: function (master, column) {
        //console.log(column);
        column.css = "webix_ss_filter";
        var html = "<input "
                + (column.placeholder ? ('placeholder="' + column.placeholder + '" ') : "")
                + (column.tooltip ? ('title="' + column.tooltip + '" ') : "")
                + "type='text'>";
        return html;
    }
}, webix.ui.datafilter.textFilter);

function agePrepare(filterValue, filterObject) {

    return filterValue;
}

function ageCompare(columnValue, filterValue) {
    // дополним, чтоб все было в днях
    let value = columnValue.indexOf('дн') === -1 ? '0дн ' + columnValue.toString().toLowerCase() : columnValue.toString().toLowerCase();
    // оставим для сравнения только дни
    value = value.slice(0, value.indexOf('дн'));
    let filter = filterValue.toString().toLowerCase();
    let compareMethod = filter.match(/[\=\<\>]/);

    if (compareMethod !== null) {
        filter = filter.substr(filter.indexOf(compareMethod[0]) + 1);
        // filter = filter.match(/[0-9]/);
        //console.log(value, compareMethod[0], filter);
        switch (compareMethod[0]) {
            case '=' :
                return (value + 'дн').indexOf(filter + 'дн') === 0;
            case '>' :
                return Number(value) > Number(filter);
            case '<' :
                return Number(value) < Number(filter);
            default :
                return value.indexOf(filter) !== -1;
        }
    } else
        return value.indexOf(filter) !== -1;
}

const grid = {
    id: "order-order",
    view: "datatable",
    select: "row",
    clipboard: "selection",
    editable: false,
    checkboxRefresh: true,
    pager: "pagerA",
    "export": true,
    tooltip:true,
    columns: [
        {id: "TicketID", header: "#", sort: "int", width: 50, tooltip: false},
        {id: "TicketNumber", header: ["Заявка", {content: "textFilter"}], sort: "int", minWidth: 120, fillspace: 2, tooltip: false},
        {id: "Queue", header: ["Очередь", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 2, tooltip: false},
        {id: "CustomerID", header: ["Заказчик", {content: "selectFilter"}], sort: "string", minWidth: 120, fillspace: 2, tooltip: false},
        {id: "Title", header: ["Название", {content: "textFilter"}], sort: "string", minWidth: 120, fillspace: 2, tooltip: false},
        // Возраст приходит готовый с сервера, для сортировки используется возраст в секундах _Age
        {id: "Age", header: ["Возраст", {content: "ageFilter", prepare: agePrepare, compare: ageCompare, tooltip: "Используйте < > = перед количеством дней"}],
            sort: sortByAge, minWidth: 100, fillspace: 2, tooltip: false},
        // При необходимости можно вычислять возраст непосредственно в скрипте в разделе $init
        //{id: "_age", header: ["Возраст", {content: "textFilter"}], sort: sortByAge, minWidth: 100, fillspace: 2 },
        {id: "StateType", header: ["Статус", {content: "staFilter", css: "webix_ss_filter"}], sort: "int", minWidth: 100, fillspace: 1,
            editor: "inline-checkbox", template: staTemplate, tooltip: false},
        {id: "edit", header: "<span class='webix_icon mdi mdi-file-document-box'></span>", width: 35, tooltip: 'Просмотр заявки',
            template: "<span  style=' cursor:pointer;' class='webix_icon mdi mdi-file-document-box'></span>"
        },
    ],
    scheme: {
        $init: function (obj) {
            // Будет работать если раскомментировать поле _age
            obj._age = secondsToDhms(obj._Age);
        }
    },
    url: "index.php?route=order/order/getTicketList&token=" + token,
    onClick: {
        "mdi-file-document-box": function (e, id) {
            this.select(id);
            $$('paging').hide();
            $$('edit-tools').hide();
            $$('edit-form-icon').show();
            $$('order-form').show();
        }
    },
    ready: function () {
        webix.extend(this, webix.ProgressBar);
    }
};

const iform = {
    view: "form",
    id: "order-form",
    multiview: {keepViews: true},   
    elements: [

        {cols: [
                {view: "text", name: "TicketID", label: "ID заявки", labelWidth: 80, width: 160, readonly: true},
                {view: "text", name: "TicketNumber", label: "Номер заявки", labelWidth: 120, labelAlign: "right", readonly: true},
                {view: "text", name: "Created", label: "Создана", labelWidth: 80, labelAlign: "right", readonly: true},
            ]},
        {view: "text", name: "Queue", label: "Очередь", labelWidth: 170, readonly: true},
        {cols: [
                {view: "text", name: "CustomerID", label: "Заказчик", labelWidth: 170, readonly: true},
                {view: "text", name: "Owner", label: "Агент", labelWidth: 170, labelAlign: "right", readonly: true},
            ]},
        {cols: [
                {view: "text", name: "Title", label: "Название", labelWidth: 170, readonly: true},
                        //{ view:"text", name:"contactname", label:"Контактное лицо", labelWidth:170, labelAlign: "right", readonly:true },
            ]},
        {cols: [
                {view: "textarea", name: "Request", height: 200, label: "Текст заявки", labelPosition: "top"},
                {view: "textarea", name: "Response", height: 200, label: "Текст ответа", labelPosition: "top"},
            ]},
        {cols: [
                {view: "text", name: "Age", label: "Возраст", labelWidth: 170, readonly: true},
                {view: "select", name: "StateType", label: "Статус", labelWidth: 170, labelAlign: "right", disabled: true,
                    options: [
                        {id: 'closed', value: "<span class='webix_table_checkbox order-status order-closed'> Закрыта </span>"},
                        {id: 'open', value: "<span class='webix_table_checkbox order-status order-open'> Открыта </span>"},
                    ],
                },
            ]},

        {
            margin: 10,
            cols: [
                {},
                {view: "button", value: "Отменить", width: 120, click: function () {
                        $$("order-views").back();
                        $$('paging').show();
                        $$('edit-form-icon').hide();
                        $$('edit-tools').show();
                    }},
            ]
        }
    ],
};

const order_views = {
    view: "multiview",
    id: "order-views",
    cells: [grid, iform]
};

const layout = {
    id: "layout",
    type: "space",
    rows: [
        {height: 40, id: "edit-tools", cols: outplugins},
        {height: 40, id: "edit-form-icon", cols: formview, hidden: true},
        {rows: [order_views, paging]}
    ]
};