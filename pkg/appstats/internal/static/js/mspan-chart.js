const mspanChart = (function(){

    let mspanInUse = 0;
    let mspanSys = 1;
    let mcacheInUse = 2;
    let mcacheSys = 3;

    const data = {
        labels: [],
            datasets: [
            {
                label: 'mspan in-use',
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
                label: 'mspan sys',
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
                label: 'mcache in-use',
                fill: false,
                radius: 0,
                borderDash: [0, 0],
                data: [],
                borderColor: 'rgba(131,180,49,0.75)',
                borderWidth:1,
                backgroundColor: 'rgba(131,180,49,0.75)',
                spanGaps: true
            },
            {
                label: 'mcache sys',
                fill: false,
                radius: 0,
                borderDash: [0, 0],
                data: [],
                borderColor: 'rgb(192,33,10)',
                borderWidth:1,
                backgroundColor: 'rgb(192,33,10)',
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
                    display: false,
                    text: 'MSpan/MCache'
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
                        callback: function(value, index, ticks) {
                            //return '$' + Chart.Ticks.formatters.numeric.apply(this, [value, index, ticks]);
                            return (value/1000) + 'KB';
                        }
                    },
                }
            }
        },
    };

    let chart = new Chart(
        $('canvas[id="mspan-chart"]')[0].getContext('2d'),
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

        // check and update mspanInUse
        if (data[mspanInUse].data.length >= dataPoints) {
            data[mspanInUse].data.shift();
        }
        data[mspanInUse].data.push(d.memory.MSpanInuse);

        // check and update mspanSys
        if (data[mspanSys].data.length >= dataPoints) {
            data[mspanSys].data.shift();
        }
        data[mspanSys].data.push(d.memory.MSpanSys);

        // check and update mcacheInUse
        if (data[mcacheInUse].data.length >= dataPoints) {
            data[mcacheInUse].data.shift();
        }
        data[mcacheInUse].data.push(d.memory.MCacheInuse);

        // check and update mcacheSys
        if (data[mcacheSys].data.length >= dataPoints) {
            data[mcacheSys].data.shift();
        }
        data[mcacheSys].data.push(d.memory.MCacheSys);

        m.chart.update();
    }

    return m;
}());
