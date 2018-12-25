export function getQATeam(){
	return qateam;
}

const qateam = [
	{'id':1, 'text':"Объектов", 'value':'1100', 'icon':"car", 'css':"orders", 'route':"#!/app/report_stat"},
	{'id':2, 'text':"Подключенных", 'value':'500', 'icon':"eye", 'css':"users", 'route':"#!/app/report_stat"},
		{'id':4, 'text':"Новых заявок", 'value':"0", 'icon':"wrench", 'css':"feedbacks", 'route':"#!/app/dashboard"},
            {'id':3, 'text':"Исполненных", 'value':"0", 'icon':"check", 'css':"profit", 'route':"#!/app/dashboard"},
];
