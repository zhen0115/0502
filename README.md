let video;: 宣告一個變數 video 用來儲存攝影機的影像串流。
function setup() { ... }: 這個函數在程式碼開始執行時只會執行一次。
createCanvas(windowWidth, windowHeight);: 創建一個與瀏覽器視窗大小相同的畫布。
background('#ffe6a7');: 設定畫布的背景顏色為您指定的 #ffe6a7。
video = createCapture(VIDEO);: 初始化攝影機的影像串流，並將其儲存在 video 變數中。
video.hide();: 隱藏預設的攝影機 HTML 元素，因為我們將在 p5.js 的畫布上繪製影像。
function draw() { ... }: 這個函數會以預設的幀率（通常是每秒 60 幀）重複執行。
background('#ffe6a7');: 在每一幀都重新繪製背景，以清除上一幀的影像。
let videoWidth = video.width; 和 let videoHeight = video.height;: 取得攝影機影像的原始寬度和高度。
let displayWidth = windowWidth * 0.8; 和 let displayHeight = windowHeight * 0.8;: 計算目標顯示區域的寬度和高度，為視窗大小的 80%。
let scaleFactor = min(displayWidth / videoWidth, displayHeight / videoHeight);: 計算縮放比例，以確保影像完整顯示在目標區域內，並且保持原始的寬高比。min() 函數會選擇較小的比例，以避免影像超出目標區域。
let scaledWidth = videoWidth * scaleFactor; 和 let scaledHeight = videoHeight * scaleFactor;: 計算縮放後的影像寬度和高度。
let x = (windowWidth - scaledWidth) / 2; 和 let y = (windowHeight - scaledHeight) / 2;: 計算影像在視窗中央的 x 和 y 座標。
image(video, x, y, scaledWidth, scaledHeight);: 將攝影機的影像繪製到畫布上指定的座標和尺寸。
function windowResized() { ... }: 這個函數會在瀏覽器視窗大小改變時被呼叫。
resizeCanvas(windowWidth, windowHeight);: 調整畫布的大小以符合新的視窗大小
