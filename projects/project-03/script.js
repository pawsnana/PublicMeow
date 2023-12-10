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

    // the floating
//     function updateIconPositions(backgroundX, backgroundY) {
//     //  only the icons within the navbar
//     let navbar = document.getElementById('navbar');
//     let icons = navbar.querySelectorAll('.icon');

//     icons.forEach(icon => {
        
//         let initialX = parseInt(icon.getAttribute('data-initial-x') || 0);
//         let initialY = parseInt(icon.getAttribute('data-initial-y') || 0);

        
//         let deltaX = backgroundX - initialX;
//         let deltaY = backgroundY - initialY;

//         let iconNewX = deltaX * 0.05; 
//         let iconNewY = deltaY * 0.05;

//         // make the new positions???
//         icon.style.transform = `translate(${iconNewX}px, ${iconNewY}px)`;
//     });
// }

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

            'H_pickdroplot': ['icon_ezreal', 'icon_kayne', 'icon_sett', 'icon_yone', 'icon_ksante'],
        };
    
        let correctIcons = correctIconsForDivisions[divisionId] || [];
        let correctCount = 0;
        iconsInDivision.forEach(icon => {
            if (correctIcons.includes(icon.id)) {
                correctCount++;
            }
        });
        
        console.log('Checking division:', divisionId, 'Correct count:', correctCount);


        if (divisionId === 'TD_pickdroplot' && correctCount >= 3) {
            var TDpickdroplot = document.getElementById('TD_pickdroplot');
            var TDbackground = document.getElementById('TD_background');
            var TDbackgroundOverlay = document.getElementById('TD_background_overlay');
            var TDiframe = document.getElementById('TD_link');
    
            if (TDpickdroplot && TDbackground && TDbackgroundOverlay && TDiframe) {
                TDpickdroplot.style.backgroundImage = 'url(./backgrounds/TD_1.png)'; 
                // Change background of TD_pickdroplot
                TDbackground.style.opacity = '1.0'; 
                // Adjust opacity of TD_background
                TDbackgroundOverlay.style.opacity = '0';
                // Make TD_background_overlay transparent
                TDiframe.style.display = 'block'; 
                // Show the TD iframe
            }
        }
    
        if (divisionId === 'SG_pickdroplot' && correctCount >= 3) {
            var SGpickdroplot = document.getElementById('SG_pickdroplot');
            var SGbackground = document.getElementById('SG_background');
            var SGbackgroundOverlay = document.getElementById('SG_background_overlay');
            var SGiframe = document.getElementById('SG_link');
    
            if (SGpickdroplot && SGbackground && SGbackgroundOverlay && SGiframe) {
                SGpickdroplot.style.backgroundImage = 'url(./backgrounds/SG_ahri_light.png)'; 
                
                SGbackground.style.opacity = '1.0'; 
                
                SGbackgroundOverlay.style.opacity = '0';
               
                SGiframe.style.display = 'block'; 
                
            }
        }

        if (divisionId === 'H_pickdroplot' && correctCount >= 3) {
            var Hpickdroplot = document.getElementById('H_pickdroplot');
            var Hbackground = document.getElementById('H_background');
            var HbackgroundOverlay = document.getElementById('H_background_overlay');
            var Hiframe = document.getElementById('H_link');
    
            if (Hpickdroplot && Hbackground && HbackgroundOverlay && Hiframe) {
                Hpickdroplot.style.backgroundImage = 'url(./backgrounds/H_bright.jpeg)'; 
                
                Hbackground.style.opacity = '1.0'; 
                
                HbackgroundOverlay.style.opacity = '0';
               
                Hiframe.style.display = 'block'; 
                
            }
        }


    }
    
    
    
    
    
});


