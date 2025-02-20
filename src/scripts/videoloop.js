const video = document.getElementById("looping-video");

let playingForward = true; // Flag to track direction

video.addEventListener("ended", () => {
    if (playingForward) {
        // Play in reverse using a manual frame step approach
        reverseVideo();
    } else {
        // Play forward normally
        video.currentTime = 0;
        video.play();
    }
    playingForward = !playingForward; // Toggle direction
});

function reverseVideo() {
    const frameRate = 30; // Adjust based on video FPS
    const interval = 1000 / frameRate; // Time between frames

    const reversePlayback = setInterval(() => {
        if (video.currentTime <= 0) {
            clearInterval(reversePlayback);
            video.play();
            playingForward = true;
        } else {
            video.currentTime -= 1 / frameRate;
        }
    }, interval);
}

