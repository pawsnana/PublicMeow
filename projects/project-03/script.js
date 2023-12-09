document.addEventListener("DOMContentLoaded", function() {
    const background = document.getElementById('background');
    let isDraggingBackground = false;
    let offsetX, offsetY;

    function startDragBackground(e) {
        isDraggingBackground = true;
        let clientX = e.clientX || e.touches[0].clientX;
        let clientY = e.clientY || e.touches[0].clientY;
        offsetX = clientX - background.offsetLeft;
        offsetY = clientY - background.offsetTop; 
    }

    function doDragBackground(e) {
        if (isDraggingBackground) {
            let clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
            let clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
            let newX = clientX - offsetX;
            let newY = clientY - offsetY;

            newX = Math.min(0, Math.max(newX, -background.offsetWidth + window.innerWidth));
            newY = Math.min(0, Math.max(newY, -background.offsetHeight + window.innerHeight));

            background.style.left = newX + 'px';
            background.style.top = newY + 'px';

            // to make the icons looks like floating trial 1
            updateIconPositions(newX, newY);
        }
    }

    function endDragBackground() {
        isDraggingBackground = false;
    }

    // this function is to update icon position when i move the background
    function updateIconPositions(backgroundX, backgroundY) {
        let icons = document.querySelectorAll('.icon'); 
        icons.forEach(icon => {
            let deltaX = backgroundX - parseInt(icon.getAttribute('data-initial-x') || 0);
            let deltaY = backgroundY - parseInt(icon.getAttribute('data-initial-y') || 0);

            let iconNewX = deltaX * 0.05; 
            let iconNewY = deltaY * 0.05; 

            icon.style.transform = `translate(${iconNewX}px, ${iconNewY}px)`;
        });
    }

    // idk how to fix these Q___Q crying ....
    let icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.setAttribute('data-initial-x', 0);
        icon.setAttribute('data-initial-y', 0);
    });

    background.addEventListener('mousedown', startDragBackground, true);
    document.addEventListener('mouseup', endDragBackground, true);
    document.addEventListener('mousemove', doDragBackground, true);
    background.addEventListener('touchstart', startDragBackground, true);
    document.addEventListener('touchend', endDragBackground, true);
    document.addEventListener('touchmove', doDragBackground, true);

    // the icons' pick-and-drop function
    icons = document.querySelectorAll('.icon');
    let dropTargets = document.querySelectorAll('.division, #navbar');

    function pickIcon(e) {
        e.dataTransfer.setData('text', e.target.id);
        e.target.style.position = 'absolute';
    }

    function dragIconOver(e) {
        e.preventDefault();
    }

    function dropIcon(e) {
        e.preventDefault();
        let iconId = e.dataTransfer.getData('text');
        let icon = document.getElementById(iconId);

        const divisionRect = e.target.getBoundingClientRect();
        const iconX = e.clientX - divisionRect.left;
        const iconY = e.clientY - divisionRect.top;

        icon.style.left = iconX + 'px';
        icon.style.top = iconY + 'px';
        e.target.appendChild(icon);

        checkCompletion(e.target);
    }

    icons.forEach(icon => {
        icon.addEventListener('dragstart', pickIcon);
    });

    dropTargets.forEach(target => {
        target.addEventListener('dragover', dragIconOver);
        target.addEventListener('drop', dropIcon);
    });

    function checkCompletion(division) {
        let iconsInDivision = division.querySelectorAll('.icon');
        let divisionId = division.id;
        let correctIconsForDivisions = {
            'div1_TD': ['icon_akali', 'icon_ekko', 'icon_senna'],
            'div2_K': ['icon_akali', 'icon_ahri', 'icon_kaisa'],
            
        };

        let correctIcons = correctIconsForDivisions[divisionId] || [];
        let correctCount = 0;
        iconsInDivision.forEach(icon => {
            if (correctIcons.includes(icon.id)) {
                correctCount++;
            }
        });

        if (correctCount >= 3) {
            division.style.backgroundImage = 'url(backgrounds/TD_1.png)';
        }
    }
});
