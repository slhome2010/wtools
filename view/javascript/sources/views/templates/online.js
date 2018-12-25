export default function(obj, common, value){				
	if (value == "1") 			
		return "<span class='tracker-online'> Online </span>";
	else 
		return "<span class='tracker-offline'> Offline </span>";	
}	