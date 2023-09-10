let currentImageIndex = 0;
let imagesLoaded = [];

const images = Array.from({ length: 288 }, (_, i) => `url("background_images/00${String(i + 1).padStart(3, '0')}.jpg")`);

images.forEach(imageUrl => {
    const img = new Image();
    img.src = imageUrl.substring(5, imageUrl.length - 2);
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
let specialKujiDisplayed = false;

function increaseCount() {
    switchCount++;
    document.getElementById("count-display").innerText = switchCount;
}

function isSpecialKuji(imageUrl) {
    return imageUrl.includes("kuji00001.jpg") ||
           imageUrl.includes("kuji00002.jpg") ||
           imageUrl.includes("kuji00003.jpg") ||
           imageUrl.includes("kuji00004.jpg") ||
           imageUrl.includes("kuji00005.jpg");
}

function changeKujiImage() {
    const imageDisplayElement = document.getElementById('image-display');
    if (kujiImagesLoaded.length > 0) {
        const randomIndex = Math.floor(Math.random() * kujiImagesLoaded.length);
        imageDisplayElement.style.backgroundImage = kujiImagesLoaded[randomIndex];
        
        const imageUrl = imageDisplayElement.style.backgroundImage;
        if (isSpecialKuji(imageUrl)) {
            specialKujiDisplayed = true;
        } else {
            specialKujiDisplayed = false;
        }
    }
    increaseCount();
}

let autoInterval = null;

function updateAutoButtonText(isRunning) {
    const autoButton = document.getElementById("auto-button");
    if (isRunning) {
        autoButton.innerHTML = "一時停止<br>";
    } else {
        autoButton.innerHTML = "オススメ！<br>自動 de<br>おみくじ";
    }
}

function resetCounter() {
    switchCount = 0;
    document.getElementById("count-display").innerText = switchCount;
}

document.getElementById('manual-button').addEventListener('click', function() {
    if (specialKujiDisplayed) {
        resetCounter();
    }
    changeKujiImage();
});

function startAutoKuji() {
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
        updateAutoButtonText(false);
    } else {
        resetCounter();
        autoInterval = setInterval(() => {
            changeKujiImage();
            if (specialKujiDisplayed) {
                clearInterval(autoInterval);
                autoInterval = null;
                updateAutoButtonText(false);
            }
        }, 500);
        updateAutoButtonText(true);
    }
}

document.getElementById("auto-button").addEventListener("click", startAutoKuji);
