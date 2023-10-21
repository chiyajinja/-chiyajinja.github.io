const kujiImages = Array.from({ length: 419 }, (_, i) => `url("kuji_images/kuji${String(i + 11).padStart(5, '0')}.jpg")`);
let kujiImagesLoaded = [];

kujiImages.forEach(imageUrl => {
    const img  = new Image();
    img.src = imageUrl.substring(5, imageUrl.length - 2);
    img.onload = () =>  {
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

// イラストNo.指定のコード
function checkForSpecialKuji(imageUrl) {
    const userSelectedKuji = document.getElementById('special-kuji-number').value;
    const userSelectedKujiPadded = String(userSelectedKuji).padStart(5, '0');

    // ユーザーが指定したおみくじが表示されたかを確認
    if (imageUrl.includes(`kuji${userSelectedKujiPadded}.jpg`)) {
        console.log("ユーザーが指定したおみくじ画像を検出!");
        playSpecialKujiSound();  // ここで効果音を再生
        showCongratulations();  // おめでとうのモーダルを表示
        
        // 手動・自動ボタンとカウンターを非表示にする
        document.querySelector(".button-container").style.display = "none";
        // イラストNo.指定部分を非表示にする
        const centeredContainers = document.querySelectorAll(".centered-container");
        centeredContainers.forEach(container => {
            container.style.display = "none";
        });

        if (autoInterval) {
            clearInterval(autoInterval); // 自動切り替えを停止
            autoInterval = null;
            updateAutoButtonText(false);
        }
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

        // 10回目で天井が有効の場合
        if (isCeilingEnabled && switchCount >= 9) { 
            const userSelectedKuji = document.getElementById('special-kuji-number').value;
            const userSelectedKujiPadded = String(userSelectedKuji).padStart(5, '0');
            selectedImageUrl = `url("kuji_images/kuji${userSelectedKujiPadded}.jpg")`;
        } else {
            const randomIndex = Math.floor(Math.random() * kujiImagesLoaded.length);
            selectedImageUrl = kujiImagesLoaded[randomIndex];
        }

        imageElement.src = selectedImageUrl.substring(5, selectedImageUrl.length - 2);
        increaseCount();
        checkForSpecialKuji(selectedImageUrl);
    }
}

document.getElementById('manual-button').addEventListener('click', function(event) {
    event.stopPropagation();  // この行を追加
    displayRandomKujiImage();

// 手動のおみくじボタンのクリックをトラッキング
    gtag('event', 'イラストclick', {
        'event_category': 'Omikuji',
        'event_label': 'イラストManual Button Click'
    });

});

document.getElementById('auto-button').addEventListener('click', function(event) {
    // 自動のおみくじボタンのクリックをトラッキング
    gtag('event', 'イラスト自動click', {
        'event_category': 'Omikuji',
        'event_label': 'イラストAuto Button Click'
    });
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

    // Google アナリティクスのイベントトラッキング
    gtag('event', 'イラストview', {
        'event_category': 'Modal',
        'event_label': 'イラストCongrats Modal'
    });


    const imageUrl = document.getElementById('image-display').style.backgroundImage;
    // document.getElementById('kuji-result').style.backgroundImage = imageUrl;

    document.getElementById('switch-count-result').innerText = `イラストにたどり着くまでの回数: ${switchCount}回`;

    // おみくじの枚数(ここでは5と仮定します。実際の値に変更してください)
    const specialKujiCount = 1;
    const percentage = ((specialKujiCount / switchCount) * 100).toFixed(2);
    document.getElementById('percentage-result').innerText = `今回のイラスト出現確率: ${percentage}%`;

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

    // イラストNo.指定部分を再表示する
    const centeredContainers = document.querySelectorAll(".centered-container");
    centeredContainers.forEach(container => {
        container.style.display = "";
    });
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
