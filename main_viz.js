(function() {
    var margin = { top: 50, left: 50, right: 50, bottom: 50},
        height = 400 - margin.top - margin.bottom,
        width = 800 - margin.left - margin.right;

    var svg = d3.select("#map")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.queue()
        .defer(d3.json, "data/world.topojson")
        .await(ready)

    // probably won't need the following function
    /*d3.csv("data/raster-data.csv", function(data) {
        console.log(data);
    });*/

    function ready (error, data) {
        //console.log(data)
        //var countries = topojson.feature(data, data.objects.countries)
    }
})();