const HEIGHT = 600;
const WIDTH = 800;
const MARGIN = { top: 20, right: 20, bottom: 70, left: 20 };

let height = HEIGHT - MARGIN.top - MARGIN.bottom;
let width = WIDTH - MARGIN.left - MARGIN.right;

let colors = [
	'#e6194B',
	'#3cb44b',
	'#ffe119',
	'#4363d8',
	'#f58231',
	'#911eb4',
	'#42d4f4',
	'#f032e6',
	'#bfef45',
	'#fabebe',
	'#469990',
	'#e6beff',
	'#9A6324',
	'#ffef59',
	'#800000',
	'#aaffc3',
	'#808000',
	'#ffd8b1',
	'#000075',
	'#a9a9a9'
];

const URL =
	'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json';

const svg = d3
	.select('.treemap')
	.append('svg')
	.attr('height', HEIGHT)
	.attr('width', WIDTH);

const svgMap = svg
	.append('g')
	.attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`);

// define tooltip
let tooltip = d3
	.select('body')
	.append('div')
	.attr('class', 'tooltip')
	.attr('id', 'tooltip')
	.style('opacity', 0);

// define treemap
let treemap = d3
	.treemap()
	.size([width, height])
	.paddingInner(1);

fetch(URL)
	.then(response => {
		return response.json();
	})
	.then(json => drawTreemap(json));

function drawTreemap(data) {
	let categoryNames = data.children.map(d => {
		return d.name;
	});

	let colorScale = d3
		.scaleOrdinal()
		.domain(categoryNames)
		.range(colors);

	// from treemap documentation
	let hierarchy = d3
		.hierarchy(data)
		.sum(d => d.value)
		.sort((a, b) => {
			return b.height - a.height || b.value - a.value;
		});

	treemap(hierarchy);

	svgMap
		.selectAll('rect')
		.data(hierarchy.leaves())
		.enter()
		.append('rect')
		.attr('class', 'tile')
		.attr('data-name', d => {
			return d.data.name;
		})
		.attr('data-category', d => {
			return d.data.category;
		})
		.attr('data-value', d => {
			return d.data.value;
		})
		.attr('x', d => {
			return d.x0;
		})
		.attr('y', d => {
			return d.y0;
		})
		.attr('width', d => {
			return d.x1 - d.x0;
		})
		.attr('height', d => {
			return d.y1 - d.y0;
		})
		.attr('fill', d => {
			return d.category ? null : colorScale(d.data.category);
		})
		.on('mouseover', d => {
			tooltip
				.style('opacity', 1)
				.attr('data-value', () => {
					return d.data.value;
				})

				.style('left', `${d3.event.layerX + 20}px`)
				.style('top', `${d3.event.layerY + -30}px`);
			tooltip.html(
				'Name: ' +
					d.data.name +
					'<br>Category: ' +
					d.data.category +
					'<br>Value: ' +
					d.data.value
			);
		})
		.on('mouseout', () => tooltip.style('opacity', 0));

	// define legend
	const legend = svg
		.append('g')
		.attr('id', 'legend')
		.attr('transform', `translate(0, ${height + 40})`);

	legend
		.selectAll('rect')
		.data(categoryNames)
		.enter()
		.append('rect')
		.attr('class', 'legend-item')
		.attr('width', WIDTH / categoryNames.length)
		.attr('height', 20)
		.attr('x', (d, i) => i * (WIDTH / categoryNames.length))
		.attr('y', 0)
		.attr('fill', (d, i) => colorScale(d))
		.attr('stroke', 'black')
		.attr('stroke-width', '0.8')
		.attr('opacity', 0.8);

	legend
		.selectAll('text')
		.data(categoryNames)
		.enter()
		.append('text')
		.attr(
			'x',
			(d, i) =>
				i * (WIDTH / categoryNames.length) +
				WIDTH / categoryNames.length / 2
		)
		.attr('font-size', '0.7rem')
		.attr('y', 30)
		.attr('text-anchor', 'middle')
		.text(d => d);
}
