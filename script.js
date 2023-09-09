let currentImageIndex = 0;
let imagesLoaded = [];

// 画像のファイル名を00001.jpgから00288.jpgまで配列に格納
const images = Array.from({ length: 288 }, (_, i) => `url("background_images/00${String(i + 1).padStart(3, '0')}.jpg")`);

// 画像のプリロード
images.forEach(imageUrl => {
    const img = new Image();
    img.src = imageUrl.substring(5, imageUrl.length - 2);  // "url()"を取り除く
    img.onload = () => {
        imagesLoaded.push(imageUrl);
    };
});

function changeBackgroundImage() {
    const mainElement = document.querySelector('main');

    // プリロードされた画像がある場合のみ、背景画像を変更
    if (imagesLoaded.length > 0) {
        const randomIndex = Math.floor(Math.random() * imagesLoaded.length);
        mainElement.style.backgroundImage = imagesLoaded[randomIndex];
    }
}

// 1.5秒毎にchangeBackgroundImage関数を実行
setInterval(changeBackgroundImage, 1500);

// 画像のファイル名をkuji00001.jpgからkuji00367.jpgまで配列に格納
const kujiImages = Array.from({ length: 367 }, (_, i) => `url("kuji_images/kuji${String(i + 1).padStart(5, '0')}.jpg")`);

let kujiImagesLoaded = [];

// くじ画像のプリロード
kujiImages.forEach(imageUrl => {
    const img = new Image();
    img.src = imageUrl.substring(5, imageUrl.length - 2);  // "url()"を取り除く
    img.onload = () => {
        kujiImagesLoaded.push(imageUrl);
    };
});

function changeKujiImage() {
    const imageDisplayElement = document.getElementById('image-display');

    // プリロードされたくじ画像がある場合のみ、画像を変更
    if (kujiImagesLoaded.length > 0) {
        const randomIndex = Math.floor(Math.random() * kujiImagesLoaded.length);
        imageDisplayElement.style.backgroundImage = kujiImagesLoaded[randomIndex];
    }
}

// ボタンがクリックされたときにchangeKujiImage関数を実行
document.getElementById('manual-button').addEventListener('click', changeKujiImage);

let autoInterval = null;

document.getElementById("auto-button").addEventListener("click", startAutoKuji);

let switchCount = 0; // 画像切り替え回数を保存する変数

function displayRandomKujiImage() {
    const imageDisplayElement = document.getElementById('image-display');
    if (kujiImagesLoaded.length > 0) {
        const randomIndex = Math.floor(Math.random() * kujiImagesLoaded.length);
        imageDisplayElement.style.backgroundImage = kujiImagesLoaded[randomIndex];
    }
    // おみくじ画像が切り替わったらカウントを増やす
    switchCount++;
    document.getElementById("count-display").innerText = switchCount;
}

function updateAutoButtonText(isRunning) {
    const autoButton = document.getElementById("auto-button");
    if (isRunning) {
        autoButton.innerHTML = "一時停止<br>"; // 画像が動作しているときのテキスト
    } else {
        autoButton.innerHTML = "オススメ！<br>自動 de<br>おみくじ"; // 画像が停止しているときの初期テキスト
    }
}

function startAutoKuji() {
    if (autoInterval) {
        clearInterval(autoInterval);  // If already running, stop it
        autoInterval = null;
        updateAutoButtonText(false);  // Update button text to initial state
    } else {
        autoInterval = setInterval(() => {
            displayRandomKujiImage();
            const imageUrl = document.getElementById('image-display').style.backgroundImage;
            if (imageUrl.includes("kuji00001.jpg") ||
                imageUrl.includes("kuji00002.jpg") ||
                imageUrl.includes("kuji00003.jpg") ||
                imageUrl.includes("kuji00004.jpg") ||
                imageUrl.includes("kuji00005.jpg")) {
                    clearInterval(autoInterval);
                    autoInterval = null;
                    updateAutoButtonText(false);  // Update button text to initial state
            }
        }, 500);  // Change every 500ms
        updateAutoButtonText(true);  // Update button text to indicate it's running
    }
}
