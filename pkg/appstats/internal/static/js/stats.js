
// after the page is fully loaded, start polling...
$(function(){
    startInterval();
    $('#refresh').on('click', function(){
        getStats();
    });
})

let jsonData;

// getStats calls an endpoint served by the server
// which returns json data containing the statistics
// needed to add data to the charts
function getStats() {
    $.ajax({
        type:'GET',
        url:'/debug/appstats/stats',
        dataType:'json',
    })
    .done(function(d){
        // update all charts in here
        heapChart.pushData(d);
        mspanChart.pushData(d);
        goroutineChart.pushData(d);
        gcCPUChart.pushData(d);
        objectsChart.pushData(d);
        updateNumGORoutineBadge(d);
        updateLastGCBadge(d);
        updateCode(d);
        jsonData = d;
    })
    .fail(function(){
        // handle failed call
        stopInterval()
        console.log('something went wrong, stopping the polling.');
    })
    .always(function(d){
        // if the version is not set, set it
        let version = $('span#go-version')[0];
        if (version.innerText.length < 1) {
            updateVersion(d);
        }
    });
}

// gets the version from the stats and sets in the navbar
function updateVersion(d) {
    $('span[id="go-version"]')[0].innerText=d.go_version.replace('go','');
}

function updateNumGORoutineBadge(d) {
    $('span[id="num-goroutine"]')[0].innerText=d.num_goroutine;
}

function updateLastGCBadge(d) {
    $('span[id="last-gc"]')[0].innerText=formatDate(d.last_gc);
}

function updateCode(d) {
    $('pre[id="code"]')[0].innerText=d.gc_trace;
}
