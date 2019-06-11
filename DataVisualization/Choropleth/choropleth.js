const HEIGHT = 400;
const WIDTH = 800;
const MARGIN = { top: 30, right: 15, bottom: 20, left: 80 };

const EDUCATION_FILE = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json';
const COUNTY_FILE = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

const svg = d3
	.select('.choropleth')
	.append('svg')
	.attr('height', HEIGHT)
	.attr('width', WIDTH);


d3.queue()
    .defer(d3.json, COUNTY_FILE)
    .defer(d3.json, EDUCATION_FILE)
    .await(ready);
	
function ready(error, us, education) {
	console.log(us);
	console.log(education);
}