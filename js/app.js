/*
* List of cards
*/
 const iconsList = [
   'fa fa-diamond',
   'fa fa-diamond',
   'fa fa-paper-plane-o',
   'fa fa-paper-plane-o',
   'fa fa-anchor',
   'fa fa-anchor',
   'fa fa-bolt',
   'fa fa-bolt',
   'fa fa-cube',
   'fa fa-cube',
   'fa fa-bomb',
   'fa fa-bomb',
   'fa fa-bicycle',
   'fa fa-bicycle',
   'fa fa-leaf',
   'fa fa-leaf'
 ];

let cardsContainter = document.querySelector('.deck');

let openedCards = [];
let matchedCards = [];

/*
* Shuffles icons on cards
*/
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

    return array;
}

/*
* Function for starting the game
* Shuffles the icons
* Creates the cards
* Adds event listener from click function
*/
function start() {

  const icons = shuffle(iconsList);
    const cardsFragment = document.createDocumentFragment();

  for(let i = 0; i < icons.length; i++) {
      const card = document.createElement('li');
      card.classList.add('card');
      card.innerHTML = `<i class='${icons[i]}'></i>`;
      cardsContainter.appendChild(card);

      // Add click event to each card
      click(card);
  }
}


/*
 * Click event
 */

 //Indicates first click
 let isFirstClick = true;

//Click function
function click(card) {

  //Card click event
  card.addEventListener('click',
  function() {

    if(isFirstClick) {

      // Start timer on first click
      startTimer();

      // Change value of first click
      isFirstClick = false;
    }

    const currentCard = this;
    const previousCard = openedCards[0];

      // Existing opened card
      if(openedCards.length === 1) {

        // Shows icon and pushes card to openedCards array
        card.classList.add('open', 'show', 'disable');
        openedCards.push(this);

        // Compares the cards in the openedCards array
        compare(currentCard, previousCard);

      } else {
      //No opened cards
         currentCard.classList.add('open', 'show', 'disable');
         openedCards.push(this);
      }

  });

}

/*
* Compare the 2 cards
*/

function compare(currentCard, previousCard) {

  // Match
  if(currentCard.innerHTML === previousCard.innerHTML) {

    // If the cards Match it adds the class match and the animation bounceIn and then adds thecards to the matchedCards array
    currentCard.classList.add('match', 'bounceIn', 'hide');
    previousCard.classList.add('match', 'bounceIn', 'hide');

    matchedCards.push(currentCard, previousCard);

    // Empties the openedCards array
    openedCards = [];

    // Checks if the game is over by running gameOver function
    gameOver();

   // No match
  } else {
    currentCard.classList.add('nomatch', 'shake');
    previousCard.classList.add('nomatch', 'shake');

     // Wait 600ms, then hide card
     setTimeout(function() {
       currentCard.classList.remove('open', 'show', 'hide', 'nomatch', 'shake');
       previousCard.classList.remove('open', 'show', 'hide', 'nomatch', 'shake');
     }, 600);

      openedCards = [];
  }

  // Add to move counter
  addMove();
}

/*
* Checks if the game is over
*/

function gameOver() {
  if(iconsList.length === matchedCards.length) {

    // Creates message for star ranking
    let msg = score == 1 ? score + ' star.' :score +' stars.';
    swal({
     allowEscapeKey: false,
     allowOutsideClick: false,
     title: 'Congratulations!',
     text: 'You completed the game in ' + moves + ' moves, it took you ' + totalSeconds + ' seconds and your score is ' + msg,
     confirmButtonColor: '#5e8a77',
     confirmButtonText: 'Play again'
    }).

    // If play again is selected, clears all cards, resets the game and then creates a new game
    then((isConfirm)=> {
      if (isConfirm) {
        clicks = 0;
        cardsContainter.innerHTML = '';
        reset();
        start();
      }
    })
  }
}


/*
* Adds move to counter
*/

const movesContainer = document.querySelector('.moves');
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;

  // Set star rating
  rating();
}



/*
* Star rating
*/

const starsContainer = document.querySelector('.stars');
const star = `<li><i class='fa fa-star'></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {

  // Changes star ranking based on number of moves
  if(moves < 10) {
    starsContainer.innerHTML = star + star + star;
    score = 3;
  } else if(moves < 15) {
    starsContainer.innerHTML = star + star;
    score = 2;
  } else {
    starsContainer.innerHTML = star;
    score = 1;
  }
  return {score};
}

/*
 * Timer
 */

 const timerContainer = document.querySelector('.timer');
 let liveTimer,
     totalSeconds = 0;

//Sets timer default value
timerContainer.innerHTML = totalSeconds + 's';

function startTimer() {
  liveTimer = setInterval(function() {

    //Increases timer by 1 second
    totalSeconds++;

    //Updates HTML with new time
    timerContainer.innerHTML = totalSeconds + 's';
  }, 1000);
}

function stopTimer () {
  clearInterval(liveTimer);
}




/*
 * Restart button
 */

const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function(){

  // Deletes all cards
  cardsContainter.innerHTML = '';

   // Creates new game
   start();

   // Resets the game
   reset();
  });


/*
 * Reset all game variables
 */

 function reset() {

   // Empties matched cards array
   matchedCards = [];

   //Reset moves
   moves = 0;
   movesContainer.innerHTML = moves;

   // Resets star rating
   starsContainer.innerHTML = star + star + star;

   // Resets the timer
   stopTimer();
   isFirstClick = true;
   totalSeconds = 0;
   timerContainer.innerHTML = totalSeconds + 's';
 }


// Starts the game for the first time
start();
