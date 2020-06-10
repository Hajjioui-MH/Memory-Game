/*===================SELECTORS==================*/
let cardArray = require('./data.js')
const grid = document.querySelector('.grid');
/*===================EVENTS==================*/
document.addEventListener('DOMContentLoaded', () => {
	//Get Random array
	const shuffle = arr => arr.reduceRight((r,_,__,s) => (r.push(s.splice(0|Math.random()*s.length,1)[0]), r),[]);
	cardArray = shuffle(cardArray);

	for (var i = 0; i < cardArray.length; i++) {
		const card = document.createElement('img')
		card.setAttribute('src', `${cardArray[i].img}`)
		card.setAttribute('card-id',i)
		grid.appendChild(card)
		card.addEventListener('click',flipCard);
	}
})
/*===================FUNCTIONS==================*/
const flipCard = (e)=>{
	const clickedCard = e.target;
	const card_Id = clickedCard.getAttribute('card-id')
	clickedCard.setAttribute('src',`${cardArray[card_Id].img}`)
}