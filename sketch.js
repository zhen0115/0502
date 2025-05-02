let video;
let pg; // p5.Graphics 物件
let gridSpacing = 20;
let boxSize = 18;
let circleDiameter = 5;
let blackColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#ffe6a7');

  video = createCapture(VIDEO);
  video.size(320, 240); // 設定視訊尺寸 (可依您的攝影機調整，較小尺寸效能較好)
  video.hide(); // 隱藏攝影機的 HTML 元素

  // 創建一個與視訊尺寸相同的 p5.Graphics 物件，背景為黑色
  pg = createGraphics(video.width, video.height);
  pg.background(0);

  blackColor = color(0); // 定義黑色
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

  push(); // 保存當前的繪圖狀態
  translate(x + scaledWidth / 2, y + scaledHeight / 2); // 移動到影像的中心
  scale(-1, 1); // 水平翻轉
  image(video, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight); // 繪製翻轉後的影像
  pop(); // 恢復之前的繪圖狀態

  // 在 p5.Graphics 物件上繪製彩色方框和黑色圓點
  pg.background(0); // 每一幀都重新繪製黑色背景
  pg.strokeWeight(1); // 設定方框的邊框粗細
  for (let i = 0; i < videoWidth; i += gridSpacing) {
    for (let j = 0; j < videoHeight; j += gridSpacing) {
      let color = video.get(i, j); // 取得視訊對應位置的顏色
      pg.stroke(color); // 設定方框的邊框顏色
      pg.fill(0, 0, 0, 0); // 方框內部透明
      pg.rect(i + (gridSpacing - boxSize) / 2, j + (gridSpacing - boxSize) / 2, boxSize, boxSize);

      // 繪製黑色圓點在方框中央
      pg.fill(blackColor);
      pg.noStroke();
      pg.ellipse(i + gridSpacing / 2, j + gridSpacing / 2, circleDiameter, circleDiameter);
    }
  }

  // 將 p5.Graphics 物件繪製到畫布上，位置與視訊相同 (也做相同的翻轉)
  push();
  translate(x + scaledWidth / 2, y + scaledHeight / 2);
  scale(-1, 1);
  image(pg, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  // 當按下 's' 鍵時儲存畫布
  if (key === 's' || key === 'S') {
    saveCanvas('color_box_black_dot_on_flipped_camera', 'png');
  }
}
