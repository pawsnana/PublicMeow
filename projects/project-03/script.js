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
        background.style.cursor = 'grab';
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

            background.style.cursor = 'grabbing';
        }
    }

    function endDragBackground() {
        isDraggingBackground = false;
        background.style.cursor = 'default';
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
    
        // tyr to get the icon's current position before changing to absolute
        const rect = e.target.getBoundingClientRect();
        const parentRect = e.target.parentNode.getBoundingClientRect();
    
        // set the icon to absolute posiion
        e.target.style.position = 'absolute';
    
        // and then adjust the icon's position so it doesn't jump to the centre
        e.target.style.left = (rect.left - parentRect.left) + 'px';
        e.target.style.top = (rect.top - parentRect.top) + 'px';


        e.target.style.cursor = 'grabbing';
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

        icon.style.cursor = 'crosshair';
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
            'TD_pickdroplot': ['icon_akali_TD', 'icon_ekko', 'icon_senna', 'icon_qiyana', 'icon_yasuo'],
            'SG_pickdroplot': ['icon_morgana', 'icon_syndra', 'icon_zoe', 'icon_lulu', 'icon_lux', 'icon_xayah', 'icon_ahri_SG', 'icon_akali_SG'],
        };
    
        let correctIcons = correctIconsForDivisions[divisionId] || [];
        let correctCount = 0;
        iconsInDivision.forEach(icon => {
            if (correctIcons.includes(icon.id)) {
                correctCount++;
            }
        });
    
        if (correctCount >= 3) {
            if (divisionId === 'TD_pickdroplot') {
                console.log('Three correct icons placed in TD_pickdroplot.');
                division.style.backgroundImage = 'url(backgrounds/TD_1.png)';
                document.getElementById('TD_link').style.display = 'block';
                var overlay = document.getElementById('TD_background_overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                }
                var image = document.getElementById('TD_background');
                if (image) {
                    image.style.opacity = '1.0';
                }
            }
    
            if (divisionId === 'SG_pickdroplot') {
                console.log('Three correct icons placed in SG_pickdroplot.');
                division.style.backgroundImage = 'url(backgrounds/SG_change.png)';
                document.getElementById('SG_link').style.display = 'block';
                var overlay = document.getElementById('SG_background_overlay');
                if (overlay) {
                    overlay.style.display = 'none';
                }
                var image = document.getElementById('SG_background');
                if (image) {
                    image.style.opacity = '1.0';
                }
            }
        }
    }
    
    
    
});
