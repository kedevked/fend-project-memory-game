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
	document.querySelector('.moves').textContent = 0;
	displayStars(move);
	changeCardOrder();
}

function restart() {
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
let previous = null;
function flipCard() {
	if((previous !== this.firstElementChild || openCards.length %2 ===0) && 
		(!this.classList.contains('open') && !this.classList.contains('match'))) {
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
	if (move === 17 || move === 34 ) {
		const stars = document.querySelectorAll('.fa-star');
		let star = stars[stars.length - 1];
		star.classList.remove('fa-star');
		star.classList.add('fa-star-o');
		document.querySelector('.icon-align').classList.add('icon-hide');
	}
}

