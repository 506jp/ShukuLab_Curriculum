let gameStarted = false;
let gameClear = false;
let startTime;
let score = 0;
function generateRandomChar() {
    const randomCharCode = Math.floor(Math.random() * 26) + 65;
    return String.fromCharCode(randomCharCode);
}
function generateQuestion() {
    const questionChar = generateRandomChar();
    const options = [];
    for (let i = 0; i < 4; i++) {
        options.push(generateRandomChar());
    }
    const answerIndex = Math.floor(Math.random() * 4);
    options[answerIndex] = questionChar;
    return {
        question: `次の文字の文字コードは何ですか？ "${questionChar}"`,
        options: options,
        answer: answerIndex
    };
}
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const clearTimeElement = document.getElementById("clear-time");
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        score = 0;
        startTime = new Date().getTime();
        showQuestion();
    }
}
function showQuestion() {
    if (gameClear) {
        const endTime = new Date().getTime();
        const totalTimeInSeconds = (endTime - startTime) / 1000;
        clearTimeElement.textContent = "クリアタイム: " + totalTimeInSeconds.toFixed(2) + "秒";
        resultElement.textContent = "クリア！スコア: " + score;
        gameStarted = false;
        return; // ゲームクリア時にはゲームを停止
    }
    resultElement.textContent = ""; // クリアメッセージをクリア
    const currentQuestion = generateQuestion();
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.addEventListener("click", () => checkAnswer(index, currentQuestion.answer));
        optionsElement.appendChild(optionButton);
    });
}
function checkAnswer(selectedOption, correctOption) {
    if (selectedOption === correctOption) {
        score++;
    }
    if (score >= 10) {
        gameClear = true;
    }
    scoreElement.textContent = score;
    showQuestion();
}