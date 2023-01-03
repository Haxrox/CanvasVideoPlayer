window.addEventListener("load", () => {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const canvasContext = canvas.getContext('2d');
    const haxVideo = document.createElement("video");
    const videoCard = document.getElementById("haxVideoCard");
    videoCard.appendChild(haxVideo);

    const stream = canvas.captureStream();
    haxVideo.srcObject = stream;
    haxVideo.muted = true;
    haxVideo.controls = true;
        
    video.addEventListener("play", async () => {
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;

        canvasContext.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
        canvas.toDataURL();

        let interval = setInterval(() => {
            if (!video.paused && !video.ended) {
                canvasContext.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
            } else {
                clearInterval(interval);
            }
        }, 1000 / 60);
        
        try {
            await haxVideo.play();
            await haxVideo.requestPictureInPicture();
        } catch (error) {
            console.error(error);
        }
    });

    haxVideo.addEventListener("play", () => {
        video.play();
    });

    haxVideo.addEventListener("pause", () => {
        video.pause();
    });
})