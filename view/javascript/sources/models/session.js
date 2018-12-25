function status(){
	return webix.ajax().post("index.php?route=common/login&status&token="+token)
		.then(a => a.json());
}

function login(username, password){	
	return webix.ajax().post("index.php?route=common/login&login&token="+token, {username, password}).then(	a => a.json() );
}

function logout(){
	return webix.ajax().post("index.php?route=common/login&logout&token="+token);
		//.then(a => a.json());
}

export default {
	status, login, logout
}