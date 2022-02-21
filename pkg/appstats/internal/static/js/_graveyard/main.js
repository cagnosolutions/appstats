//
//
// const labelValue = (function(){
//     const m = {
//         counter: 0,
//     }
//     m.get = function() {
//         m.counter += 5
//         if (m.counter < 60) {
//             return m.counter-5+'s';
//         }
//         if (m.counter >= 60) {
//             //return m.counter % 60 === 0 ? m.counter/60+'m' : '';
//             //return m.counter/60 +'m';
//             let mins = Math.floor(m.counter / 60);
//             let secs = m.counter - mins * 60;
//             return mins+'m'+secs+'s';
//         }
//         return 0;
//     }
//     return m;
// });
//
// const ctx = document.getElementById('myChart').getContext('2d');
//
// const DATA_COUNT = 7;
// const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};
// const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
//
// let data = {
//     labels: labels,
//     datasets: [
//         {
//             label: 'Heap',
//             data: [10,20,30,40,50,40,30, 20, 10],
//             borderColor: 'rgba(129,4,31,0.75)',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//         // {
//         //     label: 'Dataset 2',
//         //     data: Utils.numbers(NUMBER_CFG),
//         //     borderColor: Utils.CHART_COLORS.blue,
//         //     backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
//         // }
//     ]
// };
//
// const config = {
//     type: 'line',
//     data: data,
//     options: {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Heap'
//             }
//         }
//     },
// };
//
// const myChart = new Chart(ctx, config);
//
//
// const actions = [
//     {
//         name: 'Add Data',
//         handler(chart) {
//             const data = chart.data;
//             if (data.datasets.length > 0) {
//                 data.labels = Utils.months({count: data.labels.length + 1});
//
//                 for (let index = 0; index < data.datasets.length; ++index) {
//                     data.datasets[index].data.push(Utils.rand(-100, 100));
//                 }
//
//                 chart.update();
//             }
//         }
//     },
// ];