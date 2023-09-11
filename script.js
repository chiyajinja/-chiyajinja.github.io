let imagesLoaded = [];

const images = Array.from({ length: 288 }, (_, i) => `url("background_images/00${String(i + 1).padStart(3, '0')}.jpg")`);

images.forEach(imageUrl => {
    const img = new Image();
    img.src = imageUrl.substring(5, imageUrl.length - 2);  // "url()"を取り除く
    img.onload = () => {
        imagesLoaded.push(imageUrl);
    };
});

function changeBackgroundImage() {
    const mainElement = document.querySelector('main');
    if (imagesLoaded.length > 0) {
        const randomIndex = Math.floor(Math.random() * imagesLoaded.length);
        mainElement.style.backgroundImage = imagesLoaded[randomIndex];
    }
}

setInterval(changeBackgroundImage, 1500);

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

function displayRandomKujiImage() {
    const imageDisplayElement = document.getElementById('image-display');
    if (kujiImagesLoaded.length > 0) {
        const randomIndex = Math.floor(Math.random() * kujiImagesLoaded.length);
        imageDisplayElement.style.backgroundImage = kujiImagesLoaded[randomIndex];
        increaseCount();
    }
}


document.getElementById('manual-button').addEventListener('click', displayRandomKujiImage);

let autoInterval = null;

function updateAutoButtonText(isRunning) {
    const autoButton = document.getElementById("auto-button");
    if (isRunning) {
        autoButton.innerHTML = "一時停止<br>";
    } else {
        autoButton.innerHTML = "オススメ！<br>自動 de<br>おみくじ";
    }
}

function showCongratulations() {
    const imageUrl = document.getElementById('image-display').style.backgroundImage;
    document.getElementById('kuji-result').style.backgroundImage = imageUrl;

    document.getElementById('switch-count-result').innerText = `切り替わった画面の回数: ${switchCount}回`;

    const percentage = ((switchCount / kujiImages.length) * 100).toFixed(2);
    document.getElementById('percentage-result').innerText = `画像の総枚数に対する割合: ${percentage}%`;

    document.getElementById('congratulations-modal').style.display = 'block';
}

document.body.addEventListener('click', function() {
    if (document.getElementById('congratulations-modal').style.display === 'block') {
        document.getElementById('congratulations-modal').style.display = 'none';
    }
});

function startAutoKuji() {
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
        updateAutoButtonText(false);
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
                    updateAutoButtonText(false);
                    showCongratulations();
            }
        }, 500);
        updateAutoButtonText(true);
    }
}

document.getElementById("auto-button").addEventListener("click", startAutoKuji);

    const imageUrl = imageDisplayElement.style.backgroundImage;
    if (imageUrl.includes("kuji00001.jpg") ||
        imageUrl.includes("kuji00002.jpg") ||
        imageUrl.includes("kuji00003.jpg") ||
        imageUrl.includes("kuji00004.jpg") ||
        imageUrl.includes("kuji00005.jpg")) {
            showCongratulations();
    }
}
