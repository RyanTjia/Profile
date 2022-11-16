const data = {
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
	var source = document.querySelector('#Education').innerHTML;
	var template = Handlebars.compile(source);
	var html = template(data);

	document.querySelector("#view_template").querySelector("div").innerHTML = html;
};

/*document.addEventListener("DOMContentLoaded", () => {

	//This is event delegation, any child member of "view_template" will trigger this
	document.querySelector(".info-tabs").onclick = (e) => {
		handle_event(e);
	};
});

function handle_event(e) {
	changeTemplate(e.target.id);
};*/

const changeTemplate = function(identifier, color) {

	var divElement = document.querySelector("#view_template").querySelector("div");
	divElement.style.borderColor = color;

	var source = document.querySelector(identifier).innerHTML;
	var template = Handlebars.compile(source);
	var html = template(data);

	document.querySelector("#view_template").querySelector("div").innerHTML = html;
};
