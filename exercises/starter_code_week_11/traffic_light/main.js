/* 
Try making this traffic light work - Think through the problem BEFORE you code! You'll use addEventListener and getElementById if you're doing it right.
*/

// 1 -- Select each control panel button
const stopBtn = document.getElementById('stopButton');

// 2 -- Add an event listener to each circle. In it, select the appropriate circle and add color
const illuminateRed = () => {
    clearLights();
    let stop = document.getElementById('stopLight')
    stop.style.backgroundColor = "red";
}

// 3 -- Write an event handler to change the color of the adjacent circle when the control button is clicked. Hint: you may need to use style.backgroundColor
stopBtn.addEventListener('click', illuminateRed);

// 4 -- Add a function to clear the other lights when the current one is clicked
const clearLights = () => {
    let stop = document.getElementById('stopLight')
    stop.style.backgroundColor = "black";
}