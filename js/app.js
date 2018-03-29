/*
 * Create a list that holds all of your cards
 */
 let cards = [...document.getElementsByClassName('card')];
 let openCards = [...document.getElementsByClassName('match')]
 .map(element => element.firstElementChild.className);
 let move = null;
 let time = null;
 let timeId = null;
 let previous = null; //contains the last card clicked before the current one

 init();

 function init() {
 	move = 0;
 	previous = null;
 	time = 0;
 	timeId = null;
 	document.querySelector('.moves').textContent = 0;
 	displayStars(move);
 	changeCardOrder();
 }

 function restart() {
 	stopTimer(); // will stop the timer if necessary.
 	[...document.getElementsByClassName('card')].forEach(element => {
 		element.className = 'card';
 	});
 	[...document.getElementsByClassName('fa-star-o')].forEach(element => {
 		element.classList.remove('fa-star-o');
 		element.classList.add('fa-star');
 	});
 	[...document.getElementsByClassName('icon-hide')].forEach(element => {
 		element.classList.remove('icon-hide');
 	});
 	openCards = [];
 	init();
 	document.querySelector('.wrap').classList.add('wrap-hide');
 	displayTimer();
 }

 document.querySelector('.restart').addEventListener('click', restart);
 document.querySelector('.button-restart').addEventListener('click', restart);

// Shuffle function from http://stackoverflow.com/a/2450976
function changeCardOrder() {
	cards = shuffle(cards);
	const deck = document.querySelector('.deck');
	const card = document.querySelector('.card');
	
	while (deck.firstChild) {
		deck.removeChild(deck.firstChild);
	}
	cards.forEach(card => deck.appendChild(card));
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

//Event listener for a card
cards.forEach(function(card) {
	card.addEventListener('click', flipCard);
})
//Event listener for moves

//start with the first click on a card
function startTimer(){
	if (!time) {
		timeId = window.setInterval(function(){
			time++;
			displayTimer();
		}, 1000);
	}
}

//stop the timer when all the cards match
function stopTimer() {
	clearInterval(timeId);
}

function displayTimer() {
	document.querySelector('.timer').textContent = 
			moment(new Date(null).setSeconds(time)).format('mm:ss');
}

function flipCard() {
	displayTimer();
	startTimer();
	if((previous !== this.firstElementChild || openCards.length %2 ===0) && 
		(!this.classList.contains('open') && !this.classList.contains('match'))) {
	const cardClass = this.firstElementChild.className;
	openCards = [...openCards, cardClass];

	if(openCards.length % 2 === 1){
		this.classList.add('open', 'show');
	} else {
		this.classList.add('match');
		let open = document.querySelector('.open');
		open.classList.remove('open', 'show');
		open.classList.add('match');
		displayMoveCounter();
	}

	if (openCards.length > 1 && openCards.length % 2 === 0 && !matchCard()) {
		setTimeout(() => {
				//iterate over the last two consecutives items
				const ind = openCards.indexOf(cardClass);
				openCards.slice(ind -1, ind + 1).forEach((element, index) => {
					openCards.splice(openCards.indexOf(element), 1);
					[...document.getElementsByClassName(element)].forEach((elt) => {
						console.log('elt', elt);
						elt.parentNode.classList.remove('match');
					})
				});
			}, 500)
	}
	previous = this.firstElementChild;
}

}

function matchCard() {
	if(openCards[openCards.length-2] === 
		openCards[openCards.length-1]){
		if (openCards.length === cards.length) {
			stopTimer();
			document.querySelector('.wrap-timer').textContent = 
			document.querySelector('.timer').textContent; //display time on the congrats div
			document.querySelector('.wrap-hide').classList.remove('wrap-hide');
		}
		return true;		
	} else {
		return false;
	}
}

function displayMoveCounter(){
	document.querySelector('.moves').textContent = ++move;
	displayStars(move);
}

function displayStars(move) {
	if (move === 17 || move === 34 ) {
		const stars = document.querySelectorAll('.fa-star');
		let star = stars[stars.length - 1];
		star.classList.remove('fa-star');
		star.classList.add('fa-star-o');
	}
	if(move === 17){
		document.querySelectorAll('.icon-align')[0].classList.add('icon-hide');
	}
	if(move === 34){
		document.querySelectorAll('.icon-align')[1].classList.add('icon-hide');
	}
}

