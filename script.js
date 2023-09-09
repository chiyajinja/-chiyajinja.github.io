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
document.getElementById('change-image-button').addEventListener('click', changeKujiImage);

let autoInterval = null;

document.getElementById("manual-button").addEventListener("click", displayRandomKujiImage);
document.getElementById("auto-button").addEventListener("click", startAutoKuji);

function displayRandomKujiImage() {
    const kujiElement = document.querySelector('#kuji-image');
    const randomIndex = Math.floor(Math.random() * 367);
    kujiElement.src = `images/kuji/kuji${String(randomIndex + 1).padStart(5, '0')}.jpg`;
}

function startAutoKuji() {
    if (autoInterval) {
        clearInterval(autoInterval);  // If already running, stop it
        autoInterval = null;
    } else {
        autoInterval = setInterval(() => {
            displayRandomKujiImage();
            const kujiElement = document.querySelector('#kuji-image');
            if (kujiElement.src.includes("kuji00001.jpg") ||
                kujiElement.src.includes("kuji00002.jpg") ||
                kujiElement.src.includes("kuji00003.jpg") ||
                kujiElement.src.includes("kuji00004.jpg") ||
                kujiElement.src.includes("kuji00005.jpg")) {
                    clearInterval(autoInterval);
                    autoInterval = null;
            }
        }, 500);  // Change every 500ms
    }
}

