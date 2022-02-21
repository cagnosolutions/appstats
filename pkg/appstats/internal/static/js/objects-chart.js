const objectsChart = (function(){

    let objectsLive = 0;
    let objectsLookups = 1;
    let objectsHeap = 2;

    const data = {
        labels: [],
            datasets: [
            {
                label: 'live',
                fill: false,
                radius: 0,
                borderDash: [0, 0],
                data: [],
                borderColor: 'rgba(2,206,252,0.75)',
                borderWidth:1,
                backgroundColor: 'rgba(2,206,252,0.75)',
                spanGaps: true,
            },
            {
                label: 'lookups',
                fill: false,
                radius: 0,
                borderDash: [0, 0],
                data: [],
                borderColor: 'rgba(248,126,3,0.75)',
                borderWidth:1,
                backgroundColor: 'rgba(248,126,3,0.75)',
                spanGaps: true
            },
            {
                label: 'heap',
                fill: false,
                radius: 0,
                borderDash: [0, 0],
                data: [],
                borderColor: 'rgba(131,180,49,0.75)',
                borderWidth:1,
                backgroundColor: 'rgba(131,180,49,0.75)',
                spanGaps: true
            }
        ]
    }

    let conf = {
        type: 'line',
        data: data,
        options: {
            animation: false,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Objects'
                }
            },
            scales: {
                x: {
                    display: true,
                    ticks: {
                        count: dataPoints,
                        stepSize: (dataPoints/5),
                        callback: function(val, index) {
                            return index % (dataPoints/5) === 0 ? this.getLabelForValue(val) : '';
                        },
                    }
                },
                y: {
                    ticks: {
                        //stepSize: 2*1000,
                        //callback: function(value, index, ticks) {
                        //    //return '$' + Chart.Ticks.formatters.numeric.apply(this, [value, index, ticks]);
                        //    return (value/1000) + 'KB';
                        //}
                    },
                }
            }
        },
    };

    let chart = new Chart(
        $('canvas[id="objects-chart"]')[0].getContext('2d'),
        conf
    );

    let m = {
        conf: conf,
        chart:chart
    };

    m.pushData = function(d) {
        // get local vars to make it easier to call
        let data = m.chart.config.data.datasets;
        let labels = m.chart.config.data.labels;

        // check and update currentTime
        if (labels.length >= dataPoints) {
            labels.shift();
        }
        labels.push(formatDate(d.current_time));

        // check and update objectsLive
        if (data[objectsLive].data.length >= dataPoints) {
            data[objectsLive].data.shift();
        }
        data[objectsLive].data.push(d.memory.Mallocs-d.memory.Frees);

        // check and update objectsLookups
        if (data[objectsLookups].data.length >= dataPoints) {
            data[objectsLookups].data.shift();
        }
        data[objectsLookups].data.push(d.memory.Lookups);

        // check and update objectsHeap
        if (data[objectsHeap].data.length >= dataPoints) {
            data[objectsHeap].data.shift();
        }
        data[objectsHeap].data.push(d.memory.HeapObjects);

        m.chart.update();
    }

    return m;
}());
