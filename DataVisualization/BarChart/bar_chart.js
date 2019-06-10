const height = 400
const width = 800
const margin = 50

d3.json(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
).then(function(data) {
    drawBar(data.data)
})

function drawBar(data) {
    const years = data.map(function(date) {
        return date[0].substr(0, 4)
    })

    const gdp = data.map(function(data) {
        return data[1]
    })

    const minDate = d3.min(years)
    const maxDate = d3.max(years)
    const minGDP = d3.min(gdp)
    const maxGDP = d3.max(gdp)

    let xScale = d3
        .scaleLinear()
        .domain(minDate, maxDate)
        .range(margin, width - margin)

    let yScale = d3
        .scaleLinear()
        .domain(0, maxGDP)
        .range(height - margin, margin)

    const svg = d3
        .select('bar_chart')
        .append('svg')
        .attr('height', height + 2 * margin)
        .attr('width', width + 2 * margin)
}
