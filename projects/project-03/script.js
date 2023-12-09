document.addEventListener("DOMContentLoaded", function() {
    const background = document.getElementById('background');
    let isDragging = false;
    let offsetX, offsetY;

    function startDrag(e) {
        isDragging = true;
        let clientX = e.clientX || e.touches[0].clientX;
        let clientY = e.clientY || e.touches[0].clientY;
        offsetX = clientX - background.offsetLeft; // ....try to make the viewport start point here idk ???? hope thiss workkkk plz 
        // okay trial 2 - using + insteadd of -...otherwise it jumped backt to very top-left corner Q___Q
        // trial 3 not that complicated just this one?
        offsetY = clientY - background.offsetTop; 
    }

    function doDrag(e) {
        if (isDragging) {
            let clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
            let clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
            let newX = clientX - offsetX;
            let newY = clientY - offsetY;

            newX = Math.min(0, Math.max(newX, -background.offsetWidth + window.innerWidth));
            newY = Math.min(0, Math.max(newY, -background.offsetHeight + window.innerHeight));

            background.style.left = newX + 'px';
            background.style.top = newY + 'px';
        }
    }

    function endDrag() {
        isDragging = false;
    }

    // for mouse 
    background.addEventListener('mousedown', startDrag, true);
    document.addEventListener('mouseup', endDrag, true);
    document.addEventListener('mousemove', doDrag, true);

    // for touch 
    background.addEventListener('touchstart', startDrag, true);
    document.addEventListener('touchend', endDrag, true);
    document.addEventListener('touchmove', doDrag, true);
});
