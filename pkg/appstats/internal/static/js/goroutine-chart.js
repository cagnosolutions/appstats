const goroutineChart = (function(){

    let numGoroutine = 0;

    const data = {
        labels: [],
            datasets: [
            {
                label: 'goroutines',
                fill: false,
                radius: 0,
                borderDash: [0, 0],
                data: [],
                borderColor: 'rgba(2,206,252,0.75)',
                borderWidth:1,
                backgroundColor: 'rgba(2,206,252,0.75)',
                spanGaps: true,
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
                    text: 'Goroutines'
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
                        stepSize: 1,
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
        $('canvas[id="goroutine-chart"]')[0].getContext('2d'),
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

        // check and update NumGoroutine
        if (data[numGoroutine].data.length >= dataPoints) {
            data[numGoroutine].data.shift();
        }
        data[numGoroutine].data.push(d.num_goroutine);

        m.chart.update();
    }

    return m;
}());
