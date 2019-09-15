// Config Grafico
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	numero = Array(10);
	var i = 0;
	while (i < 10) {
		numero[i] = Math.floor(Math.random() * 200);
		i++;
	}
	i = 0;
	var data = google.visualization.arrayToDataTable([
		['Minutos', 'Umidade', 'Temperatura'],
		['10', numero[0], numero[1]],
		['20', numero[2], numero[3]],
		['30', numero[4], numero[5]],
		['40', numero[6], numero[7]]
	]);
	var options = {
		curveType: 'function',
		legend: { position: 'bottom' }
	};
	var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
	chart.draw(data, options);
}