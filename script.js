const wordLevels = [
    ["CAT", "DOG", "SUN", "PEN"],
    ["CODE", "JAVA", "HTML", "GAME"],
    ["AJOKE", "AKANDE", "NIGERIA", "ENITAN"]
];

let currentLevel = 0;
let currentWordIndex = 0;
let score = 0;
let timer = 15;
let countdown;

function startGame() {
    // THIS IS WHERE THE AD GOES
    // When NitroPay gives you your "Interstitial" or "Pop" ad code, 
    // you will trigger it right here before showing the game.
    alert("Ad would load here!"); 
    
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    loadGame();
}

function loadGame() {
    clearInterval(countdown);
    timer = 15; 
    let word = wordLevels[currentLevel][currentWordIndex];
    let jumbled = word.split('').sort(() => 0.5 - Math.random()).join('');
    
    document.getElementById('game-ui').innerHTML = `
        <div class="timer">Time Left: <span id="time">${timer}</span></div>
        <div class="word-display">${jumbled}</div>
        <input type="text" id="userAns" placeholder="Enter word...">
        <button onclick="checkAnswer('${word}')">SUBMIT</button>
    `;
    
    countdown = setInterval(() => {
        timer--;
        document.getElementById('time').innerText = timer;
        if (timer <= 0) {
            clearInterval(countdown);
            alert("Time's up! Back to Home.");
            location.reload(); // Reload to start fresh
        }
    }, 1000);
}

function checkAnswer(correctWord) {
    let input = document.getElementById('userAns').value.toUpperCase();
    if (input === correctWord) {
        score += 10;
        document.getElementById('score').innerText = score;
        currentWordIndex++;
        if (currentWordIndex >= wordLevels[currentLevel].length) {
            currentLevel++;
            currentWordIndex = 0;
            alert("Level Up!");
        }
        loadGame();
    } else {
        alert("Try again!");
    }
}
