(function() {
    var margin = { top: 75, left: 75, right: 75, bottom: 75},
        height = 550 - margin.top - margin.bottom,
        width = 750 - margin.left - margin.right;

    var svg = d3.select("#map")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.queue()
        //.defer(d3.json, "/data/world.topojson") // first item here so second in 'function ready()'
        .defer(d3.json, "/data/us.json")
        .defer(d3.csv, "/data/city-data.csv") // second item here so third in 'function ready()'
        .await(ready)

    // whenever there are shapes on a map we want to use 'geoMercator' (generally) and 'geoPath' apparently
    var projection = d3.geoAlbersUsa() // use ".geoAlbersUsa()' for US projections
        .translate([width/2, height/2])
        .scale(900)//195) // essentially creates the level of zoom on our map we'll see

    /*var projection = d3.geoMercator()
        //.translate([width/2, height/2])
        .translate([width*1.5, height*1.25])
        .scale(300)//195) // essentially creates the level of zoom on our map we'll see
*/
    var map_path = d3.geoPath()
        .projection(projection)

    function ready (error, data, cities) {
        console.log(data)

        var text_color = "#000000"
        //var countries = topojson.feature(data, data.objects.countries).features
        var counties = topojson.feature(data, data.objects.counties).features


        //svg.selectAll(".country")
        svg.selectAll(".county")
            //.data(countries)
            .data(counties)
            .enter().append("path")
            //.attr("class", "country")
            .attr("class", "county")
            .attr("d", map_path) // grabs the 'map_path' variable i made and filled with 'geoPath' and then displays our map in the browser
            .on('mouseover', function(d) {
                //d3.select(this).attr("fill", "#B14F4A") // was previously #D23513, a brighter red than the dark, to highlight a country
                d3.select(this).attr("fill", "#F3FF00")
            })
            .on('mouseout', function(d) {
                d3.select(this).attr("fill", "#B07572")
            })
            .attr("fill", "#B07572") // fill was previously #8F240D -- going lighter for now
            .attr("stroke", "#000000")
            .attr("stroke-width", "0.9")
/*
        svg.selectAll(".capital-marks")
            .data(cities)
            .enter().append("circle")
            .attr("r", 4)
            .attr("fill", "white")

            // the lat and long must be converted to x and y coordinates (as was discussed in lecture -- turns out this is true)
            .attr("cx", function(d) {
                // notice we must feed in both 'long' and 'lat' to get 'x' coord
                var coords = projection([d.long, d.lat]) // 'long' and 'lat' are the columns from our 'cities.csv' file
                return coords[0]; // returns 'x' only
            })
            .attr("cy", function(d) {
                var coords = projection([d.long, d.lat]) // 'long' and 'lat' are the columns from our 'cities.csv' file
                return coords[1]; // returns 'y' only
            })

        svg.selectAll(".city-name")
            .data(cities)
            .enter().append("text")
            .attr("class", "city-name")

            .on('mouseover', function() {
                d3.select(this).attr("textLength", "250")
                d3.select(this).attr("lengthAdjust", "spacingAndGlyphs")
                d3.select(this).attr("fill", "#FFFFFF")
                d3.select(this).attr("stroke", "#FFFFFF")
            })
            .on('mouseout', function() {
                d3.select(this).attr("textLength", "0")
                d3.select(this).attr("fill", text_color)
                d3.select(this).attr("stroke", text_color)
            })

            // the lat and long must be converted to x and y coordinates (as was discussed in lecture -- turns out this is true)
            .attr("x", function(d) {
                // notice we must feed in both 'long' and 'lat' to get 'x' coord
                var coords = projection([d.long, d.lat]) // 'long' and 'lat' are the columns from our 'cities.csv' file
                return coords[0]; // returns 'x' only
            })
            .attr("y", function(d) {
                var coords = projection([d.long, d.lat]) // 'long' and 'lat' are the columns from our 'cities.csv' file
                return coords[1]; // returns 'y' only
            })
            .attr("fill", "#000000") // text color
            .attr("stroke", "#000000") // text border color
            .attr("stroke-width", ".5")

            .text(function(d) {
                return d.city_name
            })
            .attr("dx", 10) // offset on 'x'
            .attr("dy", 3) // offset on 'y'

        console.log(cities) // just to confirm that i'm pulling a certain bit of data
*/
    }
})();