var data = {
	course1: [
		{title:'test', progress:'complete'},
		{title:'test', progress:'complete'},
		{title:'test', progress:'complete'},
		{title:'test', progress:'complete'},
		{title:'test', progress:'complete'}
	],
	course2: [
		{title:'course', progress:'complete'},
		{title:'course', progress:'complete'},
		{title:'course', progress:'complete'},
		{title:'course', progress:'complete'}
	]
}


//Loads the main menu once the page is ready
window.onload = () => {
	changeTemplate('Profile');
};

var GetData = (info) => {
	data = {};
	var temp_data;

	fetch(`https://my-json-server.typicode.com/RyanTjia/ProfileData/${info}`)
	.then((response) => {
		return response.json();
	})
	.then((raw_data) => {

		//Calls a method to perform certain action with the data acquired
		if (info == "Education") {
			temp_data = raw_data[0]['courses'];
			let length = Math.ceil((temp_data.length) / 2);

			data['course1'] = temp_data.slice(0, length);
			data['course2'] = temp_data.slice(length, temp_data.length + 1);
		}

		else {
			data = raw_data;
		}
		
	})
	.then(() => {
		changeTemplate(info);
	})
}

const changeTemplate = function(identifier) {
	var source = document.querySelector(`#${identifier}`).innerHTML;
	var template = Handlebars.compile(source);
	var html = template(data);

	document.querySelector("#view_template").innerHTML = html;
};
