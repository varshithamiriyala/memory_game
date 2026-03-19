const cards = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍉", "🍉", "🥝", "🥝", "🍒", "🍒", "🍍", "🍍", "🥥", "🥥"];
let shuffledCards = [];
let selectedCards = [];
let matchedCards = [];
let score = 0;
let timeLeft = 60;
let timer;

document.addEventListener("DOMContentLoaded", () => {
    shuffleCards();
    createBoard();
    startTimer();
    document.getElementById("reset").addEventListener("click", resetGame);
});

function shuffleCards() {
    shuffledCards = [...cards].sort(() => Math.random() - 0.5);
}

function createBoard() {
    const board = document.getElementById("game-board");
    board.innerHTML = "";
    shuffledCards.forEach((symbol, index) => {
        const card = document.createElement("div");
        card.classList.add("card", "hidden");
        card.dataset.index = index;
        card.innerText = symbol;
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

function flipCard(event) {
    const card = event.target;
    if (selectedCards.length < 2 && !card.classList.contains("matched") && !selectedCards.includes(card)) {
        card.classList.remove("hidden");
        selectedCards.push(card);
        if (selectedCards.length === 2) setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (selectedCards[0].innerText === selectedCards[1].innerText) {
        selectedCards.forEach(card => card.classList.add("matched"));
        matchedCards.push(...selectedCards);
        score += 10;
    } else {
        selectedCards.forEach(card => card.classList.add("hidden"));
    }
    selectedCards = [];
    document.getElementById("score").innerText = score;
    if (matchedCards.length === cards.length) alert("🎉 You win!");
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("⏳ Time's up! Try again.");
        }
    }, 1000);
}

function resetGame() {
    clearInterval(timer);
    timeLeft = 60;
    score = 0;
    selectedCards = [];
    matchedCards = [];
    document.getElementById("score").innerText = score;
    document.getElementById("timer").innerText = timeLeft;
    shuffleCards();
    createBoard();
    startTimer();
}
