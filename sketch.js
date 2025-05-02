let video;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#ffe6a7');

  video = createCapture(VIDEO);
  video.hide(); // 隱藏攝影機的 HTML 元素
}

function draw() {
  background('#ffe6a7'); // 確保每一幀都重新繪製背景

  let videoWidth = video.width;
  let videoHeight = video.height;
  let displayWidth = windowWidth * 0.8;
  let displayHeight = windowHeight * 0.8;

  // 計算保持原始比例的縮放比例
  let scaleFactor = min(displayWidth / videoWidth, displayHeight / videoHeight);

  // 計算縮放後的影像尺寸
  let scaledWidth = videoWidth * scaleFactor;
  let scaledHeight = videoHeight * scaleFactor;

  // 計算影像在視窗中央的 x 和 y 座標
  let x = (windowWidth - scaledWidth) / 2;
  let y = (windowHeight - scaledHeight) / 2;

  // 將攝影機影像繪製到畫布中央
  image(video, x, y, scaledWidth, scaledHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}