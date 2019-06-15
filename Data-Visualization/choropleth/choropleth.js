const HEIGHT = 480;
const WIDTH = 800;
const MARGIN = { top: 20, right: 20, bottom: 20, left: 20 };
const MAPSCALE = 0.8;

const legendValues = {
	percentages: [3, 12, 21, 30, 39, 48, 57, 66],
	colors: [
		'#E5F5E0',
		'#C7E9C0',
		'#A1D99B',
		'#74C476',
		'#41AB5D',
		'#238B45',
		'#006D2C',
		'#00441B'
	],
	height: 10,
	width: 30
};

const EDUCATION =
	'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
const COUNTY =
	'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

const svg = d3
	.select('.container')
	.append('svg')
	.attr('height', HEIGHT + MARGIN.top + MARGIN.bottom)
	.attr('width', WIDTH + MARGIN.left + MARGIN.right);

const svgMap = svg
	.append('g')
	.attr('transform', `translate(${MARGIN.left * 3 + 5}, ${MARGIN.top})`);

// define legend
const legend = svgMap
	.append('g')
	.attr('id', 'legend')
	.attr(
		'transform',
		`translate(${WIDTH -
			legendValues.percentages.length * legendValues.width -
			MARGIN.right -
			100}, ${10})`
	);

legend
	.selectAll('rect')
	.data(legendValues.percentages)
	.enter()
	.append('rect')
	.attr('width', legendValues.width)
	.attr('height', legendValues.height)
	.attr('x', (d, i) => i * legendValues.width)
	.attr('y', 0)
	.attr('fill', (d, i) => legendValues.colors[i])
	.style('stroke', 'black')
	.style('stroke-width', 0.5);

legend
	.selectAll('text')
	.data(legendValues.percentages)
	.enter()
	.append('text')
	.attr('x', (d, i) => i * legendValues.width + 8)
	.attr('y', legendValues.height * 2)
	.style('font-size', '0.7rem')
	.text(d => `${d}%`)
	.style('font-family', 'Roboto');

// define tooltip
let tooltip = d3
	.select('body')
	.append('div')
	.attr('class', 'tooltip')
	.attr('id', 'tooltip')
	.style('opacity', 0);

tooltip.append('p').attr('class', 'area');

fetch(EDUCATION)
	.then(response => {
		return response.json();
	})
	.then(json => mergeJSON(json));

function mergeJSON(data) {
	fetch(COUNTY)
		.then(response => {
			return response.json();
		})
		.then(json => {
			for (let i = 0; i < data.length; i++) {
				let fips = data[i].fips;
				let geometries = json.objects.counties.geometries;
				for (let j = 0; j < geometries.length; j++) {
					if (fips === geometries[j].id) {
						geometries[j] = Object.assign(
							{},
							geometries[j],
							data[i]
						);
						break;
					}
				}
			}
			return json;
		})
		.then(json => drawChoropleth(json));
}

function drawChoropleth(data) {
	let minBachelors = d3.min(
		data.objects.counties.geometries,
		d => d.bachelorsOrHigher
	);

	let maxBachelors = d3.max(
		data.objects.counties.geometries,
		d => d.bachelorsOrHigher
	);

	let colorScale = d3
		.scaleQuantize()
		.domain([minBachelors, maxBachelors])
		.range(legendValues.colors);

	let geojson = topojson.feature(data, data.objects.counties);
	const path = d3.geoPath();

	svgMap
		.selectAll('path')
		.data(geojson.features)
		.enter()
		.append('path')
		.attr('d', path)
		.attr('transform', `scale(${MAPSCALE}, ${MAPSCALE})`)
		.attr('class', 'county')
		.attr('data-fips', (d, i) => data.objects.counties.geometries[i].fips)
		.attr(
			'data-education',
			(d, i) => data.objects.counties.geometries[i].bachelorsOrHigher
		)
		.style('fill', (d, i) =>
			colorScale(data.objects.counties.geometries[i].bachelorsOrHigher)
		)
		.on('mouseover', (d, i) => {
			tooltip
				.style('opacity', 0.8)
				.attr('data-fips', data.objects.counties.geometries[i].fips)
				.attr(
					'data-education',
					data.objects.counties.geometries[i].bachelorsOrHigher
				)
				.style('left', `${d3.event.layerX + 20}px`)
				.style('top', `${d3.event.layerY + -20}px`);
			tooltip
				.select('p.area')
				.text(
					() =>
						`${data.objects.counties.geometries[i].area_name}, ${
							data.objects.counties.geometries[i].state
						}: ${
							data.objects.counties.geometries[i]
								.bachelorsOrHigher
						}%`
				);
		})
		.on('mouseout', () => tooltip.style('opacity', 0));

	svgMap
		.append('path')
		.datum(
			topojson.mesh(data, data.objects.states, outline => {
				return outline;
			})
		)
		.attr('class', 'states')
		.attr('d', path)
		.attr('transform', `scale(${MAPSCALE}, ${MAPSCALE})`);
}
