const kujiImages = Array.from({ length: 367 }, (_, i) => `url("kuji_images/kuji${String(i + 1).padStart(5, '0')}.jpg")`);
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

function displayRandomKujiImage() {
    const imageElement = document.getElementById('kuji-img');
    if (kujiImagesLoaded.length > 0) {
        const randomIndex = Math.floor(Math.random() * kujiImagesLoaded.length);
        let selectedImageUrl = kujiImagesLoaded[randomIndex];
        
        // キャッシュを回避するためのパラメータ追加
        const cacheBuster = '?t=' + new Date().getTime();
        selectedImageUrl = selectedImageUrl.substring(5, selectedImageUrl.length - 2) + cacheBuster;

        imageElement.src = selectedImageUrl;
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

document.getElementById("auto-button").addEventListener("click", startAutoKuji);
