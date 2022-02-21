// const ui = (function () {
//
//     const ctxHeapChart = document.getElementById('heap-chart').getContext('2d');
//     const confHeapChart = {
//         type: 'line',
//         data: {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Sys',
//                     data: [],//[42,45,47,47,49,50],
//                     borderColor: 'rgb(241,38,38)',
//                     backgroundColor: 'rgb(182,25,25)',
//                 },
//                 {
//                     label: 'Alloc',
//                     data: [],//[33,34,38,40,27,29],
//                     borderColor: 'rgba(248,126,3,0.75)',
//                     backgroundColor: 'rgba(196,112,27,0.75)',
//                 },
//                 {
//                     label: 'Used',
//                     data: [],//[22,24,28,33,25,27],
//                     borderColor: 'rgba(2,206,252,0.75)',
//                     backgroundColor: 'rgba(27,137,162,0.75)',
//                 },
//             ]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: 'top',
//                 },
//                 title: {
//                     display: true,
//                     text: 'Heap'
//                 }
//             }
//         },
//     };
//     const heapChart = new Chart(ctxHeapChart, confHeapChart);
//
//     function updateHeapChart(data) {
//         data.heap[]
//     }
//
//     function createPlots() {
//
//     }
//
//     return m;
// }());