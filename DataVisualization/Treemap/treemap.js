const HEIGHT = 400;
const WIDTH = 800;
const MARGIN = { top: 30, right: 15, bottom: 20, left: 80 };

const DATASETS = {
  videogames:{
    TITLE: "Video Game Sales",
    DESCRIPTION: "Top 100 Most Sold Video Games Grouped by Platform",
    FILE_PATH:"https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json"
},
  movies:{
    TITLE: "Movie Sales",
    DESCRIPTION: "Top 100 Highest Grossing Movies Grouped By Genre",
    FILE_PATH:"https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json"
},
  kickstarter:{
    TITLE: "Kickstarter Pledges",
    DESCRIPTION: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
    FILE_PATH:"https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json"
}}

const svg = d3
	.select('.treemap')
	.append('svg')
	.attr('height', HEIGHT)
	.attr('width', WIDTH);
