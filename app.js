/*===================SELECTORS==================*/
let cardArray = require('./data.js')
const grid = document.querySelector('.grid')
const h2 = document.querySelector('h2')
const resultDisplay = document.querySelector('span')
/*===================GLOBAL VARIABLES==================*/
let cardChosen = []
let cardName_array = []
let cardId_array = []
let point = 0
/*===================EVENTS==================*/
document.addEventListener('DOMContentLoaded', () => {
	//Get Random array
	const shuffle = arr => arr.reduceRight((r,_,__,s) => (r.push(s.splice(0|Math.random()*s.length,1)[0]), r),[]);
	cardArray = shuffle(cardArray);

	for (var i = 0; i < cardArray.length; i++) {
		const card = document.createElement('img')
		card.setAttribute('src', 'images/blank.png')
		card.setAttribute('card-id',i)
		card.setAttribute('class','')
		card.addEventListener('click',flipCard)
		grid.appendChild(card)
	}
})
/*===================FUNCTIONS==================*/
const flipCard = (e)=>{
	const clickedCard = e.target;
	const card_Id = clickedCard.getAttribute('card-id')
	const card_Name = cardArray[card_Id].name;

	cardChosen.push(clickedCard)
	cardId_array.push(card_Id)
	cardName_array.push(card_Name)

	clickedCard.setAttribute('src',`${cardArray[card_Id].img}`)
	if (cardName_array.length === 2)
		setTimeout(checkForMatch,500) 

}
const checkForMatch = ()=>{
	if (cardId_array[0] === cardId_array[1]){
		alert('you are clicked the same image')
		cardChosen.forEach(card=> card.setAttribute('src','images/blank.png'))
	}

	else if (cardName_array[0] === cardName_array[1]) {
		alert('you found a match')
		const star = document.createElement('img')
		star.setAttribute('src','./images/star.png')
		h2.append(star)
		resultDisplay.textContent = `${++point}`

		cardChosen.forEach(card=> {
			card.setAttribute('src','images/white.png')
			card.setAttribute('class','hidden')
			card.removeEventListener('click', flipCard);})

		if ( point === cardArray.length/2 )
			resultDisplay.textContent = 'Congratulations! You found them all!'
	}
	else{
		alert('Sorry, try again')
		cardChosen.forEach(card=> card.setAttribute('src','images/blank.png'))
	}
	cardName_array = []
	cardId_array = []
	cardChosen = []
}