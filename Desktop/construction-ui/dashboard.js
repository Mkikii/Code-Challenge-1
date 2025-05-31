// Sales Overview Chart
var salesOptions = {
    chart: {
        type: 'bar',
        height: 300,
        background: "#000000"
    },
    series: [{
        name: 'Sales',
        data: [85640, 11420, 2120, 1640]
    }],
    xaxis: {
        categories: ['Electronic', 'Furniture', 'Shoes', 'Others']
    },
    colors: ['#006400']
};

var salesChart = new ApexCharts(document.querySelector("#sales-chart"), salesOptions);
salesChart.render();

// Total Profit & New Orders Chart
var profitOptions = {
    chart: {
        type: 'pie',
        height: 300,
        background: "#000000"
    },
    series: [108769, 18221],
    labels: ["Total Profit", "New Orders"],
    colors: ['#006400', '#00cc66']
};

var profitChart = new ApexCharts(document.querySelector("#profit-chart"), profitOptions);
profitChart.render();
