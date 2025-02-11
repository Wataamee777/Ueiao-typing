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

let score = 0;
let gameActive = false;
let timerInterval;
let timeLeft = 60;
let mode = "kanji"; // 初期モードは漢字

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("modeSelect").addEventListener("change", updateMode);

function updateMode() {
    mode = document.getElementById("modeSelect").value;
}

function startGame() {
    gameActive = true;
    score = 0;
    document.getElementById("score").textContent = score;

    if (document.getElementById("timeSelect").value === "timed") {
        timeLeft = 60;
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

    nextWord();
}

function nextWord() {
    const currentWordSet = wordsList[Math.floor(Math.random() * wordsList.length)];
    const currentWord = currentWordSet[currentWordSet.length - 1]; // 漢字モードの単語を取得
    document.getElementById("word").textContent = currentWord;
    document.getElementById("inputText").textContent = "";
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    alert("ゲーム終了！スコア: " + score);
    if (score > 1000) {
        document.body.style.backgroundImage = "url('sushi_sushi_syouyu.jpg')";
    }
}

document.addEventListener("input", function (e) {
    if (!gameActive) return;

    const inputText = document.getElementById("inputText").textContent;
    const word = document.getElementById("word").textContent;

    if (inputText === word) {
        score += 10;
        document.getElementById("score").textContent = score;
        if (score > 1000) {
            document.body.style.backgroundImage = "url('sushi_sushi_syouyu.jpg')";
        }
        nextWord();
    }
});
