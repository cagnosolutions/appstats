const gcCPUChart = (function(){

    let gcCPUFraction = 0;

    const data = {
        labels: [],
            datasets: [
            {
                label: 'gc cpu %',
                fill: false,
                radius: 0,
                borderDash: [0, 0],
                data: [],
                borderColor: 'rgba(248,126,3,0.75)',
                borderWidth:1,
                backgroundColor: 'rgba(248,126,3,0.75)',
                spanGaps: true
            },
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
                    text: 'GC CPU %'
                }
            },
            scales: {
                x: {
                    display: false,
                    ticks: {
                        count: dataPoints,
                        stepSize: (dataPoints/5),
                        //callback: function(val, index) {
                        //    return index % (dataPoints/5) === 0 ? this.getLabelForValue(val) : '';
                        //},
                    }
                },
                y: {
                    ticks: {
                        //stepSize: 2*1000,
                        callback: function(value, index, ticks) {
                            //return '$' + Chart.Ticks.formatters.numeric.apply(this, [value, index, ticks]);
                            return (value) + '%';
                        }
                    },
                }
            }
        },
    };

    let chart = new Chart(
        $('canvas[id="gccpu-chart"]')[0].getContext('2d'),
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

        // check and update GCCPUFraction
        if (data[gcCPUFraction].data.length >= dataPoints) {
            data[gcCPUFraction].data.shift();
        }
        data[gcCPUFraction].data.push(d.memory.GCCPUFraction.toPrecision(2));

        m.chart.update();
    }

    return m;
}());
