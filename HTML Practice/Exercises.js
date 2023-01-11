var globalTimer = [];

//These two are timer functions for the two "games"
const CountDown = function(timerElement, index) {
	const html = document.querySelector(timerElement);
	const timer = parseInt(html.innerHTML) - 1;
	html.innerHTML = timer;

	if (timer == 0) {
		clearInterval(globalTimer[index]);
		const tableElement = timerElement.replace('timer', '')
		EndCountDown(tableElement);
	}
}

var EndCountDown = (tableElement) => {
	const table = document.querySelector(tableElement);

	//Prevent the player from clicking the cells
	for (let row of table.rows) {
		for (let cell of row.cells) {
			cell.classList.add('done');
		}
	}
}

//Function to create a table
function CreateTable(gameID, row, column, limit) {
	const table = document.querySelector(`#${gameID}`);
	table.textContent = '';
	table.classList.add('beginTable');

	for (var x = 0; x < row; x++) {
		table.appendChild(document.createElement('tr'));

		const row = table.rows[x];
		for (var y = 0; y < column; y++) {
			var tableColumn = document.createElement('td');
			tableColumn.classList.add('beginTable');
			tableColumn.innerHTML = Math.ceil(Math.random() * limit);

			row.appendChild(tableColumn);
		}
	}
}

//Event listener
document.addEventListener('click', (event) => {

	//Temporarily store the element object
	var element = event.target;

	//Detects if it's a table, therefore we should get the table element instead
	//and not the table cell
	if (element.localName == 'td') {
		element = element.parentElement.parentElement;
	}

	//This is for game 4
	else if (element.localName == 'img') {
		document.querySelector('#Four').onclick = (e) => {
			Game4(e);
		}
	}

	if (element.id == 'One') {
		document.querySelector('#One').onclick = (e) => {
			Game1(e);
		}
	}
	else if (element.id == 'Three') {
		document.querySelector('#Three').onclick = (e) => {
			Game3(e);
		}
	}
})

//================================================================================
function Game1(element) {
	if (element.target.localName == 'td' && element.target.innerHTML != '') {
		const targetValue = parseInt(document.querySelector('#valueOne').innerHTML);
		const score = document.querySelector('#scoreOne');
		const value = parseInt(element.target.innerHTML);
		const tableClass = element.target.classList;

		//Only works if the cell does not have a color
		if (tableClass.length < 2) {

			//Is a multiple
			if (value % targetValue == 0) {
				tableClass.add('correctCell');
				score.innerHTML = parseInt(score.innerHTML) + 1;
			}

			//Is not a multiple
			else {
				tableClass.add('incorrectCell');
			}
		}
	}
}

function StartOne() {
	CreateTable('One', 5, 5, 100);

	//This gives an HTML collection of the child elements of this element
	const elementUI = document.querySelector('#UIOne').children;
	document.querySelector('#UIOne').classList.add('fontSize');
	elementUI[0].innerHTML = 'Find the multiples of ';
	elementUI[1].innerHTML = Math.ceil(Math.random() * 7) + 2;
	elementUI[3].innerHTML = 'Timer:';
	elementUI[4].innerHTML = 30;
	elementUI[6].innerHTML = 'Score:';
	elementUI[7].innerHTML = 0;

	//Starts the timer
	clearInterval(globalTimer[0]);
	globalTimer[0] = setInterval(function() {
		CountDown('#timerOne', 0);
	}, 1000);
}

//================================================================================
var InstantCollapsible = function() {
	const collapsibleDiv = document.querySelector('#formTwo').children[3];

	//Show div
	if (collapsibleDiv.style.display == 'none') {
		collapsibleDiv.style.display = 'block';
	}
	//Hide div
	else {
		collapsibleDiv.style.display = 'none';
	}
}

function addThematic() {
	const inputThematic = document.querySelector('#thematicTwo');
	const listThematic = document.querySelector('#listTwo').value;
	inputThematic.value = inputThematic.value + ` ${listThematic}`;
}

const submitTwo = () => {
	const title = document.querySelector('#titleTwo');
	const author = document.querySelector('#authorsTwo');
	const thematic = document.querySelector('#thematicTwo');

	var thematicList = thematic.value.split(' ');
	thematicList.shift();

	//Can be submitted once a thematic is chosen
	if (thematicList.length > 0) {
		alert(`Title: ${title.value}\nAuthor(s): ${author.value}\nThematics: ${thematicList.toString()}`);

		//Resets
		title.value = '';
		author.value = '';
		thematic.value = '';
	}
}

//================================================================================
function Game3(element) {
	if (element.target.localName == 'td' && element.target.innerHTML != '') {
		const value = parseInt(element.target.innerHTML);
		const tableClass = element.target.classList;

		//Only works if the cell does not have a color
		if (tableClass.length < 2) {

			//Is a multiple
			if (value > 5) {
				tableClass.add('correctCell');
				var score = document.querySelector('#greenThree');
				score.innerHTML = parseInt(score.innerHTML) + 1;
			}

			//Is not a multiple
			else {
				tableClass.add('incorrectCell');
				var score = document.querySelector('#redThree');
				score.innerHTML = parseInt(score.innerHTML) + 1;
			}
		}
	}
}

function StartThree() {
	CreateTable('Three', 4, 4, 9);

	//This gives an HTML collection of the child elements of this element
	const elementUI = document.querySelector('#UIThree').children;
	document.querySelector('#UIThree').classList.add('fontSize');
	elementUI[0].innerHTML = 'Find numbers greater than 5';
	elementUI[2].innerHTML = 'Timer:';
	elementUI[3].innerHTML = 10;
	elementUI[5].innerHTML = 'Green:';
	elementUI[6].innerHTML = 0;
	elementUI[8].innerHTML = 'Red:';
	elementUI[9].innerHTML = 0;

	//Starts the timer
	clearInterval(globalTimer[1]);
	globalTimer[1] = setInterval(function() {
		CountDown('#timerThree', 1);
	}, 1000);
}

//================================================================================
function Game4(element) {
	var newElement = document.querySelector('#relocation').childNodes[1];
	var chosenElement = element.target.parentElement;

	if (chosenElement.localName == 'td') {
		newElement.appendChild(chosenElement);
	}

	document.querySelector('.button4').disabled = false;
	clearInterval(globalTimer[2]);
}

var ResetFour = function() {
	document.querySelector('.button4').disabled = true;
	var original = document.querySelector('#Four').childNodes[1].firstChild;
	var relocate = document.querySelector('#relocation').childNodes[1];

	globalTimer[2] = setInterval(function() {
		ReturnImg(original, relocate);
	}, 3000);
}

function ReturnImg(oldTable, newTable) {

	//Move the images back
	if (newTable.children.length > 1) {
		oldTable.appendChild(newTable.lastChild);
	}

	//Checks if there are any more images left
	if (newTable.children.length <= 1) {
		document.querySelector('.button4').disabled = false;
		clearInterval(globalTimer[2]);
	}
}