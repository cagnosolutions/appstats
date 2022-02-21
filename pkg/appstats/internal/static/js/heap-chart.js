const heapChart = (function(){

    let heapAlloc = 0;
    let heapSys = 1;
    let heapIdle = 2;
    let heapInUse = 3;
    let nextGC = 4

    const data = {
        labels: [],
            datasets: [
            {
                label: 'heap alloc',
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
                label: 'heap sys',
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
                label: 'heap idle',
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
                label: 'heap in-use',
                fill: false,
                radius: 0,
                borderDash: [0, 0],
                data: [],
                borderColor: 'rgb(192,33,10)',
                borderWidth:1,
                backgroundColor: 'rgb(192,33,10)',
                spanGaps: true
            },
            {
                label: 'next gc',
                fill: true,
                radius: 0,
                borderDash: [3, 2],
                data: [],
                borderColor: 'rgb(128,51,164)',
                borderWidth: 1,
                backgroundColor: 'rgba(121,100,131,0.10)',
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
                    text: 'Heap',
                }
            },
            scales: {
                x: {
                    display: true,
                    ticks: {
                        count: dataPoints,
                        stepSize: (dataPoints/5),
                        callback: function(val, index) {
                            return index % (dataPoints/5) === 0 ? this.getLabelForValue(val):'';
                        },
                    }
                },
                y: {
                    ticks: {
                        //stepSize: 1000*1000,
                        callback: function(value, index, ticks) {
                            //return '$' + Chart.Ticks.formatters.numeric.apply(this, [value, index, ticks]);
                            return (value/1000/1000).toFixed(0) + 'MB';
                        }
                    },
                }
            }
        },
    };

    let chart = new Chart(
        $('canvas[id="heap-chart"]')[0].getContext('2d'),
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

        // check and update HeapAlloc
        if (data[heapAlloc].data.length >= dataPoints) {
            data[heapAlloc].data.shift();
        }
        data[heapAlloc].data.push(d.memory.HeapAlloc);

        // check and update HeapSys
        if (data[heapSys].data.length >= dataPoints) {
            data[heapSys].data.shift();
        }
        data[heapSys].data.push(d.memory.HeapSys);

        // check and update HeapIdle
        if (data[heapIdle].data.length >= dataPoints) {
            data[heapIdle].data.shift();
        }
        data[heapIdle].data.push(d.memory.HeapIdle);

        // check and update HeapInUse
        if (data[heapInUse].data.length >= dataPoints) {
            data[heapInUse].data.shift();
        }
        data[heapInUse].data.push(d.memory.HeapInuse);

        // check and update NextGC
        if (data[nextGC].data.length >= dataPoints) {
            data[nextGC].data.shift();
        }
        data[nextGC].data.push(d.memory.NextGC);

        m.chart.update();
    }

    return m;
}());