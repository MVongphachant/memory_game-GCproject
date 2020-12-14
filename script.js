
const frontSel = document.querySelectorAll('.front')
const cards = document.querySelectorAll('.card');
const startBtn = document.getElementById('start');

const timer = document.getElementById('timer');
let interval;
let seconds = 0;
let minutes = 0

let hasFlippedCard = false;
let firstCard;
let secondCard;

let selOne;
let selTwo;

let matchedCounter = 0;



function frontVisibility() {
    this.style.visibility = 'hidden';
    if (!hasFlippedCard) {
        selOne = this;
    }

    selTwo = this;
};



function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minutes+"mins " + seconds + "secs";
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds = 0;
        }
        if(minutes == 60){
            hour++;
            minutes = 0;
        }
    },1000);
};



function shuffle() {
    cards.forEach(card => {
        let randomOrder = Math.floor(Math.random() * 16);
        card.style.order = randomOrder;
    });
};



function startGame() {
    shuffle(cards);
    startTimer();
};



function flipCard() {
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
};



function checkForMatch() {
    if (firstCard.dataset.related === secondCard.dataset.related) {
        disableCards();
        return;
    }

    unflipCards();
};



function disableCards() {
    setTimeout(() => {
        firstCard.style.visibility = 'hidden'
        secondCard.style.visibility = 'hidden'

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        matchedCounter++;
        if (matchedCounter === 8) {
            clearInterval(interval);
            console.log('congrats')
        }

        resetGame();
    }, 1500)
};



function unflipCards() {
    setTimeout(() => {
        selOne.style.visibility = 'visible';
        selTwo.style.visibility = 'visible';

        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetGame();
    }, 1000);
};



function resetGame() {
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
}



function endGame() {
    if (matchedCounter === 8) {
        clearInterval(interval);

        // console.log('congrats')
    }
}


cards.forEach(card => card.addEventListener('click', flipCard))
frontSel.forEach(sel => sel.addEventListener('click', frontVisibility))





