const HEIGHT = 400;
const WIDTH = 800;
const MARGIN = { top: 10, right: 20, bottom: 20, left: 60 };

const svg = d3
	.select('.bar_chart')
	.append('svg')
	.attr('height', HEIGHT)
	.attr('width', WIDTH);

d3.json(
	'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
).then(function(data) {
	drawBar(data.data);
});

function drawBar(data) {
	// setting up variables needed for rest of fuction
	const years = data.map(function(date) {
		return new Date(date[0]);
	});

	const gdp = data.map(function(data) {
		return data[1];
	});

	const BARWIDTH = WIDTH / data.length;
	let minDate = d3.min(years);
	let maxDate = d3.max(years);
	let maxGDP = d3.max(gdp);

	// drawing the tooltip
	let tooltip = d3
		.select('.bar_chart')
		.append('div')
		.attr('id', 'tooltip')
		.style('opacity', 0);

	// drawing the actual bars
	let xScale = d3
		.scaleLinear()
		.domain([0, WIDTH])
		.range([MARGIN.left, WIDTH - MARGIN.right]);

	let yScale = d3
		.scaleLinear()
		.domain([0, maxGDP])
		.range([0, HEIGHT - MARGIN.top - MARGIN.bottom]);

	let scaledGDP = gdp.map(function(val) {
		return yScale(val);
	});

	d3.select('svg')
		.selectAll('rect')
		.data(scaledGDP)
		.enter()
		.append('rect')
		.attr('data-date', (d, i) => {
			return data[i][0];
		})
		.attr('data-gdp', (d, i) => {
			return data[i][1];
		})
		.attr('x', function(d, i) {
			return xScale(BARWIDTH * i);
		})
		.attr('y', function(d, i) {
			return HEIGHT - d - MARGIN.bottom;
		})
		.attr('width', BARWIDTH)
		.attr('height', d => {
			return d;
		})
		.attr('class', 'bar')
		.on('mouseover', (d, i) => {
			tooltip.style('opacity', 0.8);
			tooltip
				.html(
					'Date: ' + data[i][0] + '<br>' + 'Billions: ' + data[i][1]
				)
				.attr('data-date', data[i][0])
				.style('left', xScale(i * BARWIDTH) + 30 + 'px')
				.style('top', -HEIGHT + 100 + 'px')
				.style('transform', `translateY(${HEIGHT / 2}px)`);
		})
		.on('mouseout', function(d) {
			tooltip.style('opacity', 0);
		});

	// drawing the axes
	let xAxisScale = d3
		.scaleTime()
		.domain([minDate, maxDate])
		.range([MARGIN.left, WIDTH - MARGIN.right]);

	let xAxis = d3.axisBottom().scale(xAxisScale);

	svg.append('g')
		.call(xAxis)
		.attr('transform', `translate(0, ${HEIGHT - MARGIN.bottom})`)
		.attr('id', 'x-axis')
		.attr('class', 'tick');

	let yAxisScale = d3
		.scaleLinear()
		.domain([0, maxGDP])
		.range([HEIGHT - MARGIN.top - MARGIN.bottom, 0]);

	let yAxis = d3.axisLeft().scale(yAxisScale);

	svg.append('g')
		.call(yAxis)
		.attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
		.attr('id', 'y-axis')
		.attr('class', 'tick');

	// label y-axis
	svg.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('x', -HEIGHT + MARGIN.top + 100)
		.attr('y', MARGIN.left + 30)
		.text('Gross Domestic Product (Billions)');
}
