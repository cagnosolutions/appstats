// global.js contains helper functions used by other files

// formatDate returns the current time (passed in as an argument) in
// the following format hh:mm:ss
function formatDate(time) {
    let date = (new Date(time));
    return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
}

// rate of how often to update the stats (in seconds)
const pollRate = 5

// number of data points to cache and plot
const dataPoints = 30;