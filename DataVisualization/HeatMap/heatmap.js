const HEIGHT = 400;
const WIDTH = 800;
const MARGIN = { top: 30, right: 15, bottom: 20, left: 80 };

const svg = d3
	.select('.heatmap')
	.append('svg')
	.attr('height', HEIGHT)
	.attr('width', WIDTH);

d3.json(
	'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
).then(function(data) {
	drawHeatmap(data);
});

function drawHeatmap(data) {
	console.log(data);
}
