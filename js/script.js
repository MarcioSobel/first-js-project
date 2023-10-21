$(document).ready(function() {
    const track = document.getElementById("image-track");

    const handleOnDown = e => {
        track.dataset.mouseDownAt = e.clientX;
    }

    const handleOnUp = () => {
        track.dataset.mouseDownAt = 0;
        track.dataset.prevPercentage = track.dataset.percentage;
    }

    const handleMove = e => {
        if (track.dataset.mouseDownAt === "0") return;

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
        let maxDelta = window.innerWidth / 1.75;
        
        const percentage = (mouseDelta / maxDelta) * -100;
        let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
        
        nextPercentage = Math.min(Math.max(-100, nextPercentage), 0);     // clamp(val, min, max) => Math.min(Math.max(val, min), max);
        track.dataset.percentage = nextPercentage;                        // source: https://webtips.dev/webtips/javascript/how-to-clamp-numbers-in-javascript

        //track.style.transform = `translate(${nextPercentage}%, -50%)`;
        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, {duration: 1200, fill: "forwards"})

        for (const image of track.getElementsByClassName("image")) {
            
            //image.style.objectPosition = `${nextPercentage + 100}% center`;
            image.animate({
                objectPosition: `${100 + nextPercentage}% center`
            }, {duration: 1200, fill: "forwards"})
        }
    }

    window.onmousedown = e => handleOnDown(e);
    window.ontouchstart = e => handleOnDown(e.touches[0])
    
    window.onmouseup = (e) => handleOnUp(e);
    window.ontouchstart = e => handleOnDown(e.touches[0])

    window.onmousemove = e => handleMove(e);
    window.ontouchmove = e => handleMove(e.touches[0]);
});