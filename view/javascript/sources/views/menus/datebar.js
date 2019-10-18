const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daterange = {
    view: "form",
    id: "daterange",
    borderless: true,
    paddingY: 0,
    elements: [
        {
            cols: [
                {
                    view: "datepicker", name: "date_start", label: "Начало", labelWidth: 80, value: new Date(), format: "%d.%m.%Y",
                    on: {
                        "onChange": onChange2
                    }
                },
                {
                    view: "datepicker", name: "date_end", label: "Конец", labelWidth: 80, labelAlign: "right", value: new Date(), format: "%d.%m.%Y",
                    on: {
                        "onChange": onChange2
                    }
                },
            ]
        }
    ]
};

function onChange(newVal, oldVal) {
    let picker_form = this.getParentView().getParentView();    
    let grid = picker_form.getParentView().getParentView().queryView({ view: "datatable" });    
    let values = picker_form.getValues();

    if (values.date_start > values.date_end) {
        this.setValue(oldVal);
        return;
    }

    const dayMilliseconds = 24*60*60*1000;
    const validInterval = 60; // days
    let new_date = new Date(newVal);
    let diff1 = Math.abs(parseInt((new_date - new Date(values.date_start))/dayMilliseconds)) - validInterval;
    let diff2 = Math.abs(parseInt((new_date - new Date(values.date_end))/dayMilliseconds)) - validInterval;  
    
    if (diff2 > 0) { // date_start has been changed
        new_date.setDate(new_date.getDate() + validInterval);       
        picker_form.setValues({date_end:new_date},true);
    }
    if (diff1 > 0) { // date_end has been changed
        new_date.setDate(new_date.getDate() - validInterval);         
        picker_form.setValues({date_start:new_date},true);
    }
       
    values = picker_form.getValues();  // take new values
    let date_start = months[values.date_start.getMonth()] + ' ' + values.date_start.getDate() + 'th, ' + values.date_start.getFullYear();
    let date_end = months[values.date_end.getMonth()] + ' ' + values.date_end.getDate() + 'th, ' + values.date_end.getFullYear();
    
    grid.clearAll();
    grid.load(grid.config.url + "&date_start=" + date_start + "&date_end=" + date_end);
    
}

function onChange2(newVal, oldVal) {
    let picker_form = this.getParentView().getParentView();    
    let grid = picker_form.getParentView().getParentView().queryView({ view: "datatable" });    
    let values = picker_form.getValues();

    if (values.date_start > values.date_end) {
        this.setValue(oldVal);
        return;
    }
   
    let date_start = months[values.date_start.getMonth()] + ' ' + values.date_start.getDate() + 'th, ' + values.date_start.getFullYear();
    let date_end = months[values.date_end.getMonth()] + ' ' + values.date_end.getDate() + 'th, ' + values.date_end.getFullYear();
    
    grid.clearAll();
    grid.load(grid.config.url + "&date_start=" + date_start + "&date_end=" + date_end);
    
}

export default daterange;