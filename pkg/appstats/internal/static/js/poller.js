// variable to store our intervalID
let intervalID;
const second = 1000;
const timeout = 5*second;

// starts our "polling interval"
function startInterval() {
    // if a "polling interval" has already been started, don't star another
    if (!intervalID){
        intervalID = setInterval(getStats, timeout, (new Date()).getTime());
    }
}

// stops an "interval"
function stopInterval() {
    clearInterval(intervalID);
    intervalID = null;
}

// set up our manual start and stop click event listeners (vanilla JS)
document.getElementById("start-interval").addEventListener("click", startInterval);
document.getElementById("stop-interval").addEventListener("click", stopInterval);

// set up our manual start and stop click event listeners (jQuery)
// $('#start-interval').onclick(startInterval);
// $('#stop-interval').onclick(stopInterval);