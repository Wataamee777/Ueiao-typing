const wordsList = [
    ["あおりいか", "アオリイカ", "障泥烏賊"],
    ["あかがい", "アカガイ", "赤貝"],
    ["あじ", "アジ", "鯵"],
    ["あなご", "アナゴ", "穴子"],
    ["あまえび", "甘エビ", "甘海老"],
    ["あわび", "アワビ", "鮑"],
    ["あん肝", "アンキモ"],
    ["いか", "イカ", "烏賊"],
    ["いくら", "イクラ"],
    ["いなりずし", "いなり寿司"],
    ["いわし", "イワシ", "鰯"],
    ["いわな", "イワナ", "岩魚"],
    ["うなぎ", "ウナギ", "鰻"],
    ["うに", "ウニ", "海胆"],
    ["えび", "エビ", "海老"],
    ["えんがわ", "エンガワ", "縁側"],
    ["おおとろ", "大トロ"],
    ["ちゅうとろ", "中トロ"],
    ["かいばしら", "カイバシラ", "貝柱"],
    ["かさご", "カサゴ", "鮋"],
    ["かずのこ", "カズノコ", "数の子"],
    ["かつお", "カツオ", "鰹"],
    ["かに", "カニ", "蟹"],
    ["かれい", "カレイ", "鰈"],
    ["かわはぎ", "カワハギ", "鮍"],
    ["かんぱち", "カンパチ", "間八"],
    ["きす", "キス", "鱚"],
    ["きんめだい", "キンメダイ", "金目鯛"],
    ["くじら", "クジラ", "鯨"],
    ["くるまえび", "クルマエビ", "車海老"],
    ["けんさきいか", "ケンサキイカ", "剣先烏賊"],
    ["こち", "コチ", "鯒"],
    ["こはだ", "コハダ", "小鰭"],
    ["さざえ", "サザエ", "栄螺"],
    ["さば", "サバ", "鯖"],
    ["さんま", "サンマ", "秋刀魚"],
    ["さーもん", "サーモン", "サケ", "鮭"],
    ["ししゃも", "シシャモ", "柳葉魚"],
    ["しまじ", "シマアジ", "縞鯵"],
    ["しゃこ", "シャコ", "蝦蛄"],
    ["しらうお", "シラウオ", "白魚"],
    ["しらこ", "シラコ", "白子"],
    ["しらす", "シラス"],
    ["すずき", "スズキ", "鱸"],
    ["するめいか", "スルメイカ", "鯣烏賊"],
    ["ずわいがに", "ズワイガニ", "楚蟹"],
    ["たい", "タイ", "鯛"],
    ["たこ", "タコ", "蛸"],
    ["たちうお", "タチウオ", "太刀魚"],
    ["たまご", "タマゴ", "玉子"],
    ["たらばがに", "タラバガニ", "鱈場蟹"],
    ["つぶがい", "ツブ貝", "ツブ"],
    ["とびうお", "トビウオ", "飛魚"],
    ["とびこ", "トビコ", "飛子"],
    ["にじます", "ニジマス", "虹鱒"],
    ["にしん", "ニシン", "鰊"],
    ["ねぎとろ", "ネギトロ"],
    ["のどぐろ", "ノドグロ", "アカムツ"],
    ["はまち", "ハマチ", "魬"],
    ["はも", "ハモ", "鱧"],
    ["ひらめ", "ヒラメ", "鮃"],
    ["びんちょうまぐろ", "ビンチョウマグロ", "鬢長鮪"],
    ["ふぐ", "フグ", "河豚"],
    ["ふなずし", "鮒寿司"],
    ["ぶり", "ブリ", "鰤"],
    ["ほたて", "ホタテ", "帆立"],
    ["ほたるいか", "ホタルイカ", "蛍烏賊"],
    ["ぼたんえび", "ボタンエビ", "牡丹海老"],
    ["まぐろ", "マグロ", "鮪"],
    ["ます", "マス", "鱒"],
    ["みるがい", "ミル貝", "海松貝"],
    ["やりいか", "ヤリイカ", "槍烏賊"]
];

let gameActive = false;
let score = 0;
let timeLeft = 60;
let timerInterval;
let currentWordSet = [];
let currentWord = "";
let userInput = "";
let mode = "kanji"; // 初期モードは "kanji" です

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("modeSelect").addEventListener("change", updateMode);
document.getElementById("instantFail").addEventListener("change", (e) => {
    instantFail = e.target.checked;
});

function updateMode() {
    mode = document.getElementById("modeSelect").value;
}

function startGame() {
    if (gameActive) return; // ゲームがすでに進行中なら何もしない

    gameActive = true;
    score = 0;
    timeLeft = 60;

    // スコア表示更新
    document.getElementById("score").textContent = score;

    // 時間制限モードが選ばれている場合
    if (document.getElementById("timeSelect").value === "timed") {
        document.getElementById("timer").textContent = timeLeft;
        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    } else {
        document.getElementById("timeLeft").textContent = "フリーモード";
    }

    nextWord(); // 最初の単語を表示
}

function nextWord() {
    currentWordSet = wordsList[Math.floor(Math.random() * wordsList.length)];
    if (mode === "kanji") {
        currentWord = currentWordSet[currentWordSet.length - 1]; // 最後の要素（漢字）
    } else if (mode === "hiragana") {
        currentWord = currentWordSet[0]; // ひらがな
    } else {
        currentWord = currentWordSet[1]; // カタカナ
    }

    userInput = "";
    document.getElementById("word").textContent = currentWord;
    document.getElementById("inputText").textContent = "";
}

document.addEventListener("keydown", (e) => {
    if (!gameActive) return;

    if (e.key === currentWord[userInput.length]) {
        userInput += e.key;
        document.getElementById("inputText").textContent = userInput;

        if (userInput === currentWord) {
            score++;
            document.getElementById("score").textContent = score;
            nextWord();
        }
    } else if (instantFail) {
        endGame();
    }
});

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);

    const resultText = `ゲーム終了！スコア: ${score}`;
    alert(resultText);

    // スコアを保存
    let savedScores = JSON.parse(localStorage.getItem("typingScores")) || [];
    savedScores.push({ score: score, date: new Date().toLocaleString() });
    localStorage.setItem("typingScores", JSON.stringify(savedScores));

    // 結果をコピー
    navigator.clipboard.writeText(resultText).then(() => {
        alert("結果がコピーされました！");
    }).catch(err => {
        console.error("コピーに失敗しました: ", err);
    });

    // 背景変更（スコアが1000を超えた場合）
    if (score >= 1000) {
        document.body.style.backgroundImage = "url('sushi_sushi_syouyu.jpg')";
    }
}
