// Get Our Elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out function
function togglePlay() {
    // 如果video.pause属性为true  设置或返回视频是否暂停。
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// 切换图标
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}


function skip() {
    // 视频的播放位置
    video.currentTime += parseFloat(this.dataset.skip);
}

// 设置播放速度和音量
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// 设置进度条位置
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Hook up the event listeners

// 点击视频播放
video.addEventListener('click', togglePlay);
// 添加播放事件 改变图标
video.addEventListener('play', updateButton);
// 暂定时候改变按钮图标
video.addEventListener('pause', updateButton);
// 更新进度条
video.addEventListener('timeupdate', handleProgress);

// 给播放按钮添加事件
toggle.addEventListener('click', togglePlay);
// 改变播放进度
skipButtons.forEach(button => button.addEventListener('click', skip));
// 设置音量和播放速度
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// 进度条
let mousedown = false;
// 点击的时候
progress.addEventListener('click', scrub);

// 移动鼠标的时候
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

progress.addEventListener('mousemove', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);