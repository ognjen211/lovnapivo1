// Dohvatanje elemenata
const character = document.getElementById('character');
const beer = document.getElementById('beer');
const scoreBoard = document.getElementById('score-board');
const gameContainer = document.getElementById('game-container');
const upBtn = document.getElementById('up');
const downBtn = document.getElementById('down');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

let score = 0;

// Početna pozicija lika
let characterPosition = { x: 275, y: 175 };

// Pomeranje lika pomoću tastature
document.addEventListener('keydown', (event) => {
    moveCharacter(event.key);
});

// Pomeranje lika pomoću dugmadi
upBtn.addEventListener('click', () => moveCharacter('ArrowUp'));
downBtn.addEventListener('click', () => moveCharacter('ArrowDown'));
leftBtn.addEventListener('click', () => moveCharacter('ArrowLeft'));
rightBtn.addEventListener('click', () => moveCharacter('ArrowRight'));

// Funkcija za pomeranje lika
function moveCharacter(direction) {
    const step = 10;

    if (direction === 'ArrowUp' && characterPosition.y > 0) {
        characterPosition.y -= step;
    }
    if (
        direction === 'ArrowDown' &&
        characterPosition.y < gameContainer.clientHeight - character.offsetHeight
    ) {
        characterPosition.y += step;
    }
    if (direction === 'ArrowLeft' && characterPosition.x > 0) {
        characterPosition.x -= step;
    }
    if (
        direction === 'ArrowRight' &&
        characterPosition.x < gameContainer.clientWidth - character.offsetWidth
    ) {
        characterPosition.x += step;
    }

    updateCharacterPosition();
    checkCollision();
}

// Ažuriranje pozicije lika
function updateCharacterPosition() {
    character.style.left = `${characterPosition.x}px`;
    character.style.top = `${characterPosition.y}px`;
}

// Nasumično pozicioniranje piva
function placeBeer() {
    const maxX = gameContainer.clientWidth - beer.offsetWidth;
    const maxY = gameContainer.clientHeight - beer.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    beer.style.left = `${randomX}px`;
    beer.style.top = `${randomY}px`;
}

// Provera sudara između lika i piva
function checkCollision() {
    const charRect = character.getBoundingClientRect();
    const beerRect = beer.getBoundingClientRect();

    if (
        charRect.left < beerRect.left + beerRect.width &&
        charRect.left + charRect.width > beerRect.left &&
        charRect.top < beerRect.top + beerRect.height &&
        charRect.top + charRect.height > beerRect.top
    ) {
        score++;
        scoreBoard.textContent = `Poeni: ${score}`;
        placeBeer();
    }
}

// Postavljanje piva na početnu poziciju
placeBeer();
