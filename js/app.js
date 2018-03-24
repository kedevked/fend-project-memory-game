/*
 * Create a list that holds all of your cards
 */
let cards = [...document.getElementsByClassName('card')];

let openCards = [...document.getElementsByClassName('match')]
					.map(element => element.firstElementChild.className);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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
cards.forEach(function(card){
	card.addEventListener('click', flipCard);
})

function flipCard(){
	const cardClass = this.firstElementChild.className
	openCards = [...openCards, cardClass];
	this.classList.add('match');

	if(openCards.length > 1 && openCards.length % 2 === 0 && !matchCard()){
		setTimeout(() => {
			//iterate over the last two consecutives items
			// console.log('openCards.length', openCards.length);
			// console.log('openCards.indexOf(element)', openCards.indexOf(element));
			// console.log('slice', openCards.slice(openCards.indexOf(element) -1, -1));
			const ind = openCards.indexOf(cardClass);
			openCards.slice(ind -1, ind + 1).forEach((element, index) => {
				openCards.splice(openCards.indexOf(element), 1);
				[...document.getElementsByClassName(element)].forEach((elt) => {
					console.log('elt', elt);
					elt.parentNode.classList.remove('match');
				})
				//console.log(this);
				//this.classList.remove('match');
			});
		}, 500)
	} /*else {
		if (!matchCard()){
			this.classList.add('match');
			setTimeout(() => {
				openCards.slice(-2).forEach((element) => {
				openCards.splice(openCards.indexOf(this), 1);
				[...document.getElementsByClassName(element)].forEach((elt) => {
					console.log('elt', elt);
					elt.parentNode.classList.remove('match');
				})
				//console.log(this);
				//this.classList.remove('match');
			});
			}, 5000)
		}
	}
*/

	// if (!openCards.includes(this.firstElementChild.className)){
	// }else {
	// 	console.log(matchCard(this));
	// 	if (!matchCard(this)){
	// 		openCards.slice(-2).forEach((element) => {
	// 			openCards.splice(openCards.indexOf(this), 1);
	// 			[...document.getElementsByClassName(element)].forEach((elt) => {
	// 				console.log('elt', elt);
	// 				elt.parentNode.classList.remove('match');
	// 			})
	// 			//console.log(this);
	// 			//this.classList.remove('match');
	// 		});
			
	// 	}
	// }
}

function matchCard(){
	if(openCards[openCards.length-2] === 
		openCards[openCards.length-1]){
		return true;
	}else{
		return false
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
