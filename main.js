console.log("Hello");

window.addEventListener("load", () => {
    console.log("Loaded");

    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const canvasContext = canvas.getContext('2d');
    const haxVideo = document.createElement("video");
    // const haxVideo = document.getElementById("haxVideo");

    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;

    // haxVideo.width = video.clientWidth;
    // haxVideo.height = video.clientHeight;
    const stream = canvas.captureStream(60);
    haxVideo.srcObject = stream;
    haxVideo.muted = true;

    stream.addEventListener("addtrack", () => {
        console.log("AddTrack");
    });

    stream.addEventListener("removetrack", () => {
        console.log("RemoveTrack");
    });
    
    stream.addEventListener("active", () => {
        console.log("Active");
    });

    stream.addEventListener("inactive", () => {
        console.log("Inactive");
    });
        
    video.addEventListener("play", async () => {
        console.log("Played");
        canvasContext.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);

        let interval = setInterval(() => {
            if (!video.paused && !video.ended) {
                canvasContext.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
            } else {
                clearInterval(interval);
            }
        }, 1000 / 60);
        
        try {
            console.log(haxVideo);

            await haxVideo.play();
            await haxVideo.requestPictureInPicture();
        } catch (error) {
            console.log(error);
        }
        console.log("HaxVideo Played");
    });
})