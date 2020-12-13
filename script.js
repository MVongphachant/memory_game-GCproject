
const frontSel = document.querySelectorAll('.front')
const cards = document.querySelectorAll('.card');
const startBtn = document.getElementById('start');

const timer = document.getElementById('timer');
let interval;

let hasFlippedCard = false;
let firstCard;
let secondCard;

let selOne;
let selTwo;


function frontVisibility() {
    this.style.visibility = 'hidden';
    if (!hasFlippedCard) {
        selOne = this;
    }

    selTwo = this;
};


function startTimer(){
    let seconds = 0;
    let minutes = 0;
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
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;

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
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
};


function unflipCards() {
    setTimeout(() => {
        selOne.style.visibility = 'visible';
        selTwo.style.visibility = 'visible';

        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 1000);
};

cards.forEach(card => card.addEventListener('click', flipCard))
frontSel.forEach(sel => sel.addEventListener('click', frontVisibility))

