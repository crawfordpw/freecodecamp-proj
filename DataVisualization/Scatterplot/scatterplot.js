const HEIGHT = 400;
const WIDTH = 800;
const MARGIN = { top: 30, right: 15, bottom: 20, left: 80 };
const RADIUS = 5;

let colors = ['blue', 'red'];

const svg = d3
	.select('.scatterplot')
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

// draw y-axis label
svg.append('text')
	.attr('transform', 'rotate(-90)')
	.attr('x', -HEIGHT + MARGIN.top + 100)
	.attr('y', 20)
	.style('font-size', 18)
	.text('Time in Minutes');

d3.json(
	'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
).then(function(data) {
	drawScatter(data);
});

function drawScatter(data) {
	let times = data.map(data => {
		let time = data.Time.split(':');
		return new Date(2000, 0, 1, 0, time[0], time[1]);
	});

	let years = data.map(data => {
		return data.Year;
	});

	let minTime = d3.min(times);
	let maxTime = d3.max(times);
	let minYear = d3.min(years);
	let maxYear = d3.max(years);

	// drawing the actual dots
	let xScale = d3
		.scaleLinear()
		.domain([minYear - 1, maxYear + 1])
		.range([MARGIN.left, WIDTH - MARGIN.right]);

	let yScale = d3
		.scaleTime()
		.domain([minTime, maxTime])
		.range([HEIGHT - MARGIN.top - MARGIN.bottom, 0]);

	d3.select('svg')
		.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('data-xvalue', d => {
			return d.Year;
		})
		.attr('data-yvalue', (d, i) => {
			return times[i].toString();
		})
		.attr('cx', function(d, i) {
			return xScale(years[i]);
		})
		.attr('cy', function(d, i) {
			return HEIGHT - yScale(times[i]) - MARGIN.bottom;
		})
		.attr('r', RADIUS)
		.attr('class', 'dot')
		.style('fill', d => {
			return d.Doping === '' ? colors[0] : colors[1];
		})
		.on('mouseover', (d, i) => {
			tooltip.style('opacity', 0.8);
			tooltip.attr('data-year', d.Year);
			tooltip
				.html(
					d.Name +
						': ' +
						d.Nationality +
						'<br/>' +
						'Year: ' +
						d.Year +
						', Time: ' +
						timeFormat(times[i]) +
						(d.Doping ? '<br/>' + d.Doping : '')
				)
				.style('left', d3.event.pageX + 20 + 'px')
				.style('top', d3.event.pageY - 30 + 'px');
		})
		.on('mouseout', function(d) {
			tooltip.style('opacity', 0);
		});

	// draw the axes
	let timeFormat = d3.timeFormat('%M:%S');
	let xAxis = d3
		.axisBottom()
		.scale(xScale)
		.tickFormat(d3.format('d'));

	svg.append('g')
		.call(xAxis)
		.attr('transform', `translate(0, ${HEIGHT - MARGIN.bottom})`)
		.attr('id', 'x-axis')
		.attr('class', 'tick');

	let yAxisScale = d3
		.scaleTime()
		.domain([minTime, maxTime])
		.range([0, HEIGHT - MARGIN.top - MARGIN.bottom]);

	let yAxis = d3
		.axisLeft()
		.scale(yAxisScale)
		.tickFormat(timeFormat);

	svg.append('g')
		.call(yAxis)
		.attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
		.attr('id', 'y-axis')
		.attr('class', 'tick');

	// draw the legend
	let legend = svg
		.selectAll('.legend')
		.data(colors)
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('id', 'legend')
		.attr('transform', function(d, i) {
			return 'translate(0,' + (HEIGHT / 2 - i * 20) + ')';
		});

	legend
		.append('rect')
		.attr('x', WIDTH - 15)
		.attr('width', 15)
		.attr('height', 15)
		.style('fill', (d, i) => {
			return colors[i];
		});

	legend
		.append('text')
		.attr('x', WIDTH - 20)
		.attr('y', 11)
		.style('text-anchor', 'end')
		.text((d, i) => {
			if (i === 1) {
				return 'Riders with doping allegations';
			} else {
				return 'No doping allegations';
			}
		});
}

function timeFormat(time) {
	let seconds = time.getSeconds();
	let milliseconds = time.getMilliseconds();
	return `${seconds}:${milliseconds.toString().substring(0, 2)}`;
}
