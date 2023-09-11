const imageFolderPath = "background_images";
const kujiFolderPath = "kuji_images";
let imagesLoaded = [];
let kujiImagesLoaded = [];
let switchCount = 0;
let autoInterval = null;

function loadImages(path, total, format, collection) {
    const images = Array.from({ length: total }, (_, i) => `url("${path}/${String(i + 1).padStart(format, '0')}.jpg")`);

    images.forEach(imageUrl => {
        const img = new Image();
        img.src = imageUrl.slice(5, -2);
        img.onload = () => {
            collection.push(imageUrl);
        };
    });
}

function changeBackgroundImage() {
    const mainElement = document.querySelector('main');
    if (imagesLoaded.length) {
        mainElement.style.backgroundImage = imagesLoaded[Math.floor(Math.random() * imagesLoaded.length)];
    }
}

function increaseCount() {
    document.getElementById("count-display").innerText = ++switchCount;
}

function checkForSpecialKuji(imageUrl) {
    if (imageUrl.includes("kuji00001.jpg") || imageUrl.includes("kuji00005.jpg")) {
        showCongratulations();
    }
}

function displayRandomKujiImage() {
    const imageDisplayElement = document.getElementById('image-display');
    if (kujiImagesLoaded.length) {
        const selectedImageUrl = kujiImagesLoaded[Math.floor(Math.random() * kujiImagesLoaded.length)];
        imageDisplayElement.style.backgroundImage = selectedImageUrl;
        increaseCount();
        checkForSpecialKuji(selectedImageUrl);
    }
}

function updateAutoButtonText(isRunning) {
    document.getElementById("auto-button").innerHTML = isRunning ? "停止" : "オススメ！<br>自動 de<br>おみくじ";
}

function showCongratulations() {
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
        updateAutoButtonText(false);
    }

    // おめでとうモーダルとおみくじボタン関連の表示非表示の調整
    document.querySelector(".button-container").style.display = "none";
    document.getElementById('congratulations-modal').style.display = 'block';
    document.getElementById('retry-button').style.display = 'inline-block';
    
    document.getElementById('kuji-result').style.backgroundImage = document.getElementById('image-display').style.backgroundImage;
    document.getElementById('switch-count-result').innerText = `おみくじを引いた回数: ${switchCount}回`;
    const percentage = ((switchCount / kujiImages.length) * 100).toFixed(2);
    document.getElementById('percentage-result').innerText = `画像の総枚数に対する割合: ${percentage}%`;
}

function startAutoKuji() {
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
        updateAutoButtonText(false);
    } else {
        autoInterval = setInterval(displayRandomKujiImage, 500);
        updateAutoButtonText(true);
    }
}

loadImages(imageFolderPath, 288, 3, imagesLoaded);
loadImages(kujiFolderPath, 367, 5, kujiImagesLoaded);

setInterval(changeBackgroundImage, 1500);

document.getElementById('manual-button').addEventListener('click', displayRandomKujiImage);

document.getElementById('congratulations-modal').addEventListener('click', e => e.stopPropagation());

document.body.addEventListener('click', () => {
    if (document.getElementById('congratulations-modal').style.display === 'block') {
        document.getElementById('congratulations-modal').style.display = 'none';
    }
});

document.getElementById("auto-button").addEventListener("click", startAutoKuji);

document.getElementById("retry-button").addEventListener("click", function() {
    // 画面をリセットする処理
    document.querySelector(".button-container").style.display = "flex";
    document.getElementById('congratulations-modal').style.display = 'none';
    document.getElementById('retry-button').style.display = 'none';
    document.getElementById("count-display").innerText = "0";
    switchCount = 0;
    document.getElementById('image-display').style.backgroundImage = 'none';
});