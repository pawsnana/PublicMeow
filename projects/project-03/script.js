document.addEventListener("DOMContentLoaded", function() {
    const background = document.getElementById('background');
    let isDragging = false;
    let offsetX, offsetY;

    function startDrag(e) {
        isDragging = true;
        let clientX = e.clientX || e.touches[0].clientX;
        let clientY = e.clientY || e.touches[0].clientY;
        offsetX = clientX - background.offsetLeft;
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

    // Mouse events
    background.addEventListener('mousedown', startDrag, true);
    document.addEventListener('mouseup', endDrag, true);
    document.addEventListener('mousemove', doDrag, true);

    // Touch events
    background.addEventListener('touchstart', startDrag, true);
    document.addEventListener('touchend', endDrag, true);
    document.addEventListener('touchmove', doDrag, true);
});
