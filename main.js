window.addEventListener("load", () => {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const canvasContext = canvas.getContext('2d');
    const haxVideo = document.createElement("video");
    const videoCard = document.getElementById("haxVideoCard");
    videoCard.appendChild(haxVideo);
    video.crossOrigin = 'anonymous';

    const stream = canvas.captureStream();
    haxVideo.srcObject = stream;
    haxVideo.muted = true;
    haxVideo.controls = true;

    canvasContext.textAlign = 'left';
    canvasContext.textBaseline = 'top';
    canvasContext.font = '20px sans-serif';
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(Date.now().toString(), 10, 10);
        
    video.addEventListener("play", async () => {
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;

        canvasContext.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);

        let interval = setInterval(() => {
            if (!video.paused && !video.ended) {
                canvasContext.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
                canvasContext.restore();
                canvasContext.textAlign = 'left';
                canvasContext.textBaseline = 'top';
                canvasContext.font = '20px sans-serif';
                canvasContext.fillStyle = 'white';
                canvasContext.fillText(Date.now().toString(), 10, 10);
            } else {
                clearInterval(interval);
            }
        }, 1000 / 60);
        
        try {
            canvas.toDataURL();
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