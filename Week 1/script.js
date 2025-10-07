const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

function generateNumber() {
    let rand = Math.floor(Math.random() * numbers.length);
    document.getElementById("numberList").innerHTML += numbers[rand] + ", ";
}

function generateColor () {
	let rand = Math.floor(Math.random() * colors.length);
	document.getElementById("colorList").innerHTML += colors[rand] + ', ';
}

function generateNumberbox () {
	let rand = Math.floor(Math.random() * numbers.length);  
    new_box = "<div class='box'>" + numbers[rand] + "</div>";  
    document.getElementById("numberboxList").innerHTML += new_box;
}
