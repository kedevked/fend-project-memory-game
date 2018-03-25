/*
 * Create a list that holds all of your cards
 */
let cards = [...document.getElementsByClassName('card')];
let openCards = [...document.getElementsByClassName('match')]
					.map(element => element.firstElementChild.className);
let move = null;
init();

function init() {
	move = 0;
	displayStars(move);
	changeCardOrder();
}

function restart() {
	[...document.getElementsByClassName('match')].forEach(element => {
		element.classList.remove('match');
	});
	[...document.getElementsByClassName('fa-star-o')].forEach(element => {
		element.classList.remove('fa-star-o');
		element.classList.add('fa-star');
	})
	init();
	document.querySelector('.wrap').classList.add('wrap-hide');
}

document.querySelector('.restart').addEventListener('click', restart)
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
let previous = null;
function flipCard() {
	if(previous !== this.firstElementChild || !this.classList.contains('open')){
		displayMoveCounter()
		const cardClass = this.firstElementChild.className;
		openCards = [...openCards, cardClass];

		if(openCards.length % 2 === 1){
			this.classList.add('open', 'show');
		} else {
			this.classList.add('match');
			let open = document.querySelector('.open');
			open.classList.remove('open', 'show');
			open.classList.add('match');
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
	console.log('move', move);
	if (move === 0 || move === 17 || move === 34) {
		let star = document.querySelector('.fa-star');
		star.classList.remove('fa-star');
		star.classList.add('fa-star-o');
	}
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
