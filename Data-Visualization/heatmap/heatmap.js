const HEIGHT = 600;
const WIDTH = 1000;
const MARGIN = { top: 10, right: 10, bottom: 70, left: 60 };

let colors = [
	'#a50026',
	'#d73027',
	'#f46d43',
	'#fdae61',
	'#fee090',
	'#ffffbf',
	'#e0f3f8',
	'#abd9e9',
	'#74add1',
	'#4575b4',
	'#313695'
];

const svg = d3
	.select('.heatmap')
	.append('svg')
	.attr('height', HEIGHT)
	.attr('width', WIDTH);

// define tooltip
let tooltip = d3
	.select('body')
	.append('div')
	.attr('class', 'tooltip')
	.attr('id', 'tooltip')
	.style('opacity', 0);

d3.json(
	'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
).then(function(data) {
	drawHeatmap(data);
});

function drawHeatmap(data) {
	let monthlyVar = data.monthlyVariance.map(data => {
		return data;
	});

	let variance = monthlyVar.map(data => {
		return data.variance;
	});

	let years = monthlyVar.map(data => {
		return data.year;
	});

	const CELLWIDTH = 4;
	let baseTemp = data.baseTemperature;
	let tempMax = d3.max(variance);
	let tempMin = d3.min(variance);
	let yearMax = d3.max(years);
	let yearMin = d3.min(years);

	//  drawing the actual cells
	let xScale = d3
		.scaleLinear()
		.domain([yearMin, yearMax])
		.range([MARGIN.left, WIDTH - MARGIN.right]);

	let yScale = d3
		.scaleLinear()
		.domain([0, 11])
		.range([HEIGHT - MARGIN.top - MARGIN.bottom, MARGIN.bottom]);

	d3.select('svg')
		.selectAll('rect')
		.data(monthlyVar)
		.enter()
		.append('rect')
		.attr('data-month', d => {
			return d.month - 1;
		})
		.attr('data-year', d => {
			return d.year;
		})
		.attr('data-temp', d => {
			return d.variance + baseTemp;
		})
		.attr('x', d => {
			return xScale(d.year);
		})
		.attr('y', d => {
			return HEIGHT - yScale(d.month - 1) - MARGIN.bottom;
		})
		.attr('height', (HEIGHT - MARGIN.top) / 12)
		.attr('width', CELLWIDTH)
		.attr('class', 'cell')
		.style('fill', d => {
			return colorScale(d.variance + baseTemp);
		})
		.on('mouseover', d => {
			tooltip.style('opacity', 0.8);
			tooltip.attr('data-year', d.year);
			tooltip
				.html(
					"<span class='date'>" +
						d3.timeFormat('%Y - %B')(new Date(d.year, d.month)) +
						'</span>' +
						'<br />' +
						"<span class='temperature'>" +
						d3.format('.1f')(baseTemp + d.variance) +
						'&#8451;' +
						'</span>' +
						'<br />' +
						"<span class='variance'>" +
						d3.format('+.1f')(d.variance) +
						'&#8451;' +
						'</span>'
				)
				.style('left', d3.event.pageX + 20 + 'px')
				.style('top', d3.event.pageY - 50 + 'px');
		})
		.on('mouseout', function(d) {
			tooltip.style('opacity', 0);
		});

	// drawing the axes
	let xAxis = d3
		.axisBottom()
		.scale(xScale)
		.tickFormat(d3.format('d'));

	svg.append('g')
		.call(xAxis)
		.attr(
			'transform',
			`translate(0, ${HEIGHT - MARGIN.bottom - MARGIN.top * 2 - 1})`
		)
		.attr('id', 'x-axis')
		.attr('class', 'tick')
		.style('text-anchor', 'middle');

	let yAxisScale = d3
		.scaleLinear()
		.domain([0, 11])
		.range([MARGIN.bottom, HEIGHT - MARGIN.top - MARGIN.bottom]);

	let yAxis = d3
		.axisLeft()
		.scale(yAxisScale)
		.tickFormat(month => {
			let date = new Date(0);
			date.setUTCMonth(month);
			return d3.utcFormat('%B')(date);
		});

	svg.append('g')
		.call(yAxis)
		.attr('transform', `translate(${MARGIN.left}, ${-MARGIN.bottom / 2})`)
		.attr('id', 'y-axis')
		.attr('class', 'tick');

	// draw the legend
	let legendRectHeight = 30;
	let legendRectWidth = 35;

	let legend = svg
		.append('g')
		.attr('id', 'legend')
		.attr('transform', function(d, i) {
			return `translate(${MARGIN.left}, ${HEIGHT - 50})`;
		})
		.selectAll('.legend')
		.data(colors)
		.enter()
		.append('g')
		.attr('class', 'legend');
	legend
		.append('rect')
		.attr('x', (d, i) => {
			return legendRectWidth * i;
		})
		.attr('y', 0)
		.attr('width', legendRectWidth)
		.attr('height', legendRectHeight)
		.style('fill', (d, i) => {
			return colors[colors.length - 1 - i];
		});

	legend
		.append('text')
		.attr('x', (d, i) => {
			return legendRectWidth * i;
		})
		.attr('y', '2.7em')
		.text((d, i) => {
			return colorText(i);
		})
		.style('font-size', '1rem')
		.style('font-family', 'Roboto')
		.style('text-anchor', 'middle')
		.attr('class', 'legend-text');
}

function colorScale(temp) {
	if (temp > 12) return colors[0];
	else if (temp > 11) return colors[1];
	else if (temp > 10) return colors[2];
	else if (temp > 9) return colors[3];
	else if (temp > 8) return colors[4];
	else if (temp > 7) return colors[5];
	else if (temp > 6) return colors[6];
	else if (temp > 5) return colors[7];
	else if (temp > 4) return colors[8];
	else if (temp > 3) return colors[9];
	else return colors[10];
}

function colorText(i) {
	if (i === 0) return '';
	else if (i === 1) return '3';
	else if (i === 2) return '4';
	else if (i === 3) return '5';
	else if (i === 4) return '6';
	else if (i === 5) return '7';
	else if (i === 6) return '8';
	else if (i === 7) return '9';
	else if (i === 8) return '10';
	else if (i === 9) return '11';
	else return '12';
}
