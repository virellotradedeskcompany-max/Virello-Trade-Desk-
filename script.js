const wordDB = ["AKANDE", "ENITAN", "VIRELLO", "NIGERIA", "DEVELOPER", "SUCCESS", "TREBEDIT", "CODING", "AJOKE", "GAMES"];
let currentTarget = "";
let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;

document.getElementById('best').innerText = bestScore;

function loadGame() {
    currentTarget = wordDB[Math.floor(Math.random() * wordDB.length)];
    let jumbled = currentTarget.split('').sort(() => 0.5 - Math.random()).join('');
    if(jumbled === currentTarget) { loadGame(); return; }
    
    document.getElementById('game-ui').innerHTML = `
        <div class="word-display">${jumbled}</div>
        <input type="text" id="userAns" maxlength="${currentTarget.length}" placeholder="_____" oninput="this.value = this.value.toUpperCase()">
        <button onclick="checkAnswer()">CHECK ARRANGEMENT</button>
    `;
}

function checkAnswer() {
    let input = document.getElementById('userAns').value;
    if (input === currentTarget) {
        score += 10;
        document.getElementById('score').innerText = score;
        if(score > bestScore) {
            bestScore = score;
            localStorage.setItem('bestScore', bestScore);
            document.getElementById('best').innerText = bestScore;
        }
        loadGame();
    } else {
        alert("Incorrect! Try rearranging again.");
    }
}

function showHint() {
    alert("The word starts with: " + currentTarget[0]);
}

loadGame();
