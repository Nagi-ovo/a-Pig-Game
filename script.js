'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//initialize
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores,
  currentScore,
  activePlayer = 0,
  playing;

const init = function () {
  scores = [0, 0];
  playing = true;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  btnRoll.classList.toggle('hidden');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      setTimeout(aiTurn, 2000);
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
      setTimeout(aiTurn, 1000);
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
  switchPlayer();
});

const aiTurn = function () {
  if (activePlayer === 1 && playing) {
    btnRoll.classList.add('hidden');
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      let dice2 = Math.trunc(Math.random() * 6) + 1;
      diceEl.src = `images/dice-${dice}.png`;
      if (dice2 !== 1) {
        currentScore += dice2;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      }

      if (currentScore + scores[activePlayer] >= 100) {
        btnHold.click();
      } else {
        setTimeout(aiTurn, 1000);
        btnHold.click();
      }
    } else {
      switchPlayer();
    }
  }
};
