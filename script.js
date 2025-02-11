const correctText = "うえいあお";
let userInput = "";
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

document.getElementById("highScore").textContent = highScore;

document.getElementById("typingInput").addEventListener("input", (e) => {
    userInput = e.target.value;

    if (userInput === correctText) {
        score++;
        document.getElementById("score").textContent = score;
        e.target.value = "";  // 入力リセット

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            document.getElementById("highScore").textContent = highScore;
        }
    } else if (!correctText.startsWith(userInput)) {
        alert(`ゲームオーバー！スコア: ${score}`);
        score = 0;
        document.getElementById("score").textContent = score;
        e.target.value = "";  // 入力リセット
    }
});
