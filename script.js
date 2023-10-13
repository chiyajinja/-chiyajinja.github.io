const kujiImages = Array.from({ length: 377 }, (_, i) => `url("kuji_images/kuji${String(i + 1).padStart(5, '0')}.jpg")`);
let kujiImagesLoaded = [];

kujiImages.forEach(imageUrl => {
    const img = new Image();
    img.src = imageUrl.substring(5, imageUrl.length - 2);
    img.onload = () => {
        kujiImagesLoaded.push(imageUrl);
    };
});

let switchCount = 0;

function increaseCount() {
    switchCount++;
    document.getElementById("count-display").innerText = switchCount;
}

function hideControls() {
    document.querySelector(".button-container").style.display = "none";
}

function playSpecialKujiSound() {
    const sound = new Audio('se/metronome00001.mp3');
    sound.volume = 0.5; // ボリュームを50%に設定 (0.0 〜 1.0 の範囲で指定)
    sound.play();
}

function checkForSpecialKuji(imageUrl) {
    if (imageUrl.includes("kuji00001.jpg") ||
        imageUrl.includes("kuji00002.jpg") ||
        imageUrl.includes("kuji00003.jpg") ||
        imageUrl.includes("kuji00004.jpg") ||
        imageUrl.includes("kuji00005.jpg")) {
            
            console.log("特定のおみくじ画像を検出!");
            hideControls();
            showCongratulations();
            playSpecialKujiSound();  // ここで効果音を再生
    }
}

let isCeilingEnabled = false;  // トグルボタンがオフの初期状態を示す

// 新しいトグルボタン用のイベントリスナー
document.getElementById("toggle-ceiling-input").addEventListener("change", function() {
    isCeilingEnabled = this.checked;
    console.log(isCeilingEnabled ? "天井オン" : "天井オフ");  // デバッグ用
});

function displayRandomKujiImage() {
    const imageElement = document.getElementById('kuji-img');
    if (kujiImagesLoaded.length > 0) {
        let selectedImageUrl;
        if (isCeilingEnabled && switchCount >= 49) {  // 50回目で天井が有効の場合
            // 5つの特定のおみくじ画像のURLを配列に格納
            const ceilingImages = [
                'url("kuji_images/kuji00001.jpg")',
                'url("kuji_images/kuji00002.jpg")',
                'url("kuji_images/kuji00003.jpg")',
                'url("kuji_images/kuji00004.jpg")',
                'url("kuji_images/kuji00005.jpg")'
            ];
            // 5つの画像の中からランダムに1つを選択
            selectedImageUrl = ceilingImages[Math.floor(Math.random() * ceilingImages.length)];
        } else {
            const randomIndex = Math.floor(Math.random() * kujiImagesLoaded.length);
            selectedImageUrl = kujiImagesLoaded[randomIndex];
        }

        imageElement.src = selectedImageUrl.substring(5, selectedImageUrl.length - 2);

        increaseCount();

        // ここで特定のおみくじ画像をチェック
        checkForSpecialKuji(selectedImageUrl);
    }
}

document.getElementById('manual-button').addEventListener('click', function(event) {
    event.stopPropagation();  // この行を追加
    displayRandomKujiImage();
});

let autoInterval = null;

function updateAutoButtonText(isRunning) {
    const autoButton = document.getElementById("auto-button");
    if (isRunning) {
        autoButton.innerHTML = "停止";
    } else {
        autoButton.innerHTML = "オススメ<br>自動 de<br>おみくじ";
    }
}

function showCongratulations() {
    // おみくじの結果を表示する前に自動切り替えを停止
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
        updateAutoButtonText(false);
    }
    
    console.log("showCongratulations関数が呼び出されました"); // このログを追加

    const imageUrl = document.getElementById('image-display').style.backgroundImage;
    // document.getElementById('kuji-result').style.backgroundImage = imageUrl;

    document.getElementById('switch-count-result').innerText = `おみくじを引いた回数: ${switchCount}回`;

    // おみくじの枚数(ここでは5と仮定します。実際の値に変更してください)
    const specialKujiCount = 5;
    const percentage = ((specialKujiCount / switchCount) * 100).toFixed(2);
    document.getElementById('percentage-result').innerText = `今回のおみくじ確率: ${percentage}%`;

    document.getElementById('congratulations-modal').style.display = 'block';
}

document.getElementById('congratulations-modal').addEventListener('click', function(event) {
    event.stopPropagation();
});

// おめでとう画面の外側をクリックすると、おめでとう画面が非表示になる
// document.body.addEventListener('click', function() {
    // if (document.getElementById('congratulations-modal').style.display === 'block') {
        // document.getElementById('congratulations-modal').style.display = 'none';
    // }
// });
document.getElementById("retry-button").addEventListener("click", function() {
    // button-containerを再表示する
    document.querySelector(".button-container").style.display = "flex"; 

    // カウンターを0に戻す
    document.getElementById("count-display").innerText = "0";

    // 画像の変更回数をカウントする変数を0にリセット
    switchCount = 0;

    // おめでとう画面を非表示にする
    document.getElementById("congratulations-modal").style.display = "none";
});

function startAutoKuji() {
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
        updateAutoButtonText(false);
    } else {
        autoInterval = setInterval(() => {
            displayRandomKujiImage();
        }, 500);
        updateAutoButtonText(true);
    }
}

// 決済ボタンの画像を自動で切り替える
document.addEventListener("DOMContentLoaded", function() {
    var paymentButton = document.getElementById("payment-button");
    var images = ["img/saisenbox0001a.jpg", "img/saisenbox0001b.jpg"];
    var currentIndex = 0;

    setInterval(function() {
        currentIndex = (currentIndex + 1) % images.length;
        paymentButton.src = images[currentIndex];
    }, 1000); // 1000ミリ秒（1秒）ごとに画像を切り替える
});


document.getElementById("auto-button").addEventListener("click", startAutoKuji);
