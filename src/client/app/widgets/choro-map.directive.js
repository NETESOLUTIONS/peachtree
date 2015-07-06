//Ignoring for now because of d3 syntax needs to be revisited
(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('choroMap', choroMap);

    /* @ngInject */
    function choroMap() {
        //Usage:
        //<choroMap id="map" dataSource="dataFromController"></choroMap>
        // Creates:
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                val: '='
            },
            link: link
        };
        return directive;
        function link(scope, element, attrs) {
            // //Create the results object for the map
            // var results = {};
            //set the data array
            var data = angular.copy(scope.val);
            //Color Config
            var config = {
                "color1":"#FEEBCB",
                "color2":"#FEB21E",
                "stateDataColumn": "stateName",
                "valueDataColumn": "count"
            };
            //Map options
            var margins = {
                left: 0,
                right: 0,
                top: 10,
                bottom: 10
            };
            //scale for size of map calculations
            var SCALE = .5;
            var WIDTH = parseInt(d3.select('#map-container').style('width'), 10),
                HEIGHT = WIDTH * SCALE;
            //number of degrees of color separation
            var COLOR_COUNTS = 9;

            //calculate the color gradients based on steps
            function Interpolate(start, end, steps, count) {
                var s = start,
                    e = end,
                    final = s + (((e - s) / steps) * count);
                return Math.floor(final);
            }
            //Calculate RGB Colors
            function Color(_r, _g, _b) {
                var r, g, b;
                var setColors = function(_r, _g, _b) {
                    r = _r;
                    g = _g;
                    b = _b;
                };
                //Setter function for colors
                setColors(_r, _g, _b);
                //Getter function for colors
                this.getColors = function() {
                    var colors = {
                        r: r,
                        g: g,
                        b: b
                    };
                    return colors;
                };
            }
            //Convert hex codes to rgb colors
            function hexToRgb(hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            }

            function valueFormat(d) {
               return d;
            }
            //Config for first and last color
            var COLOR_FIRST = config.color1,
                COLOR_LAST = config.color2;
            //Set the rgb from the hex
            var rgb = hexToRgb(COLOR_FIRST);
            //New starting color
            var COLOR_START = new Color(rgb.r, rgb.g, rgb.b);
            //convert for last color
            rgb = hexToRgb(COLOR_LAST);
            var COLOR_END = new Color(rgb.r, rgb.g, rgb.b);
            //Map data configuration settings
            var MAP_STATE = config.stateDataColumn;
            var MAP_VALUE = config.valueDataColumn;
                //Height and width of map
                var width = WIDTH,
                    height = HEIGHT;
                //Create the map object
                var valueById = d3.map();
                //Get our colors
                var startColors = COLOR_START.getColors(),
                    endColors = COLOR_END.getColors();
                //Initialize color array
                var colors = [];
                //Loop through colors
                for (var i = 0; i < COLOR_COUNTS; i++) {
                    var r = Interpolate(startColors.r, endColors.r, COLOR_COUNTS, i);
                    var g = Interpolate(startColors.g, endColors.g, COLOR_COUNTS, i);
                    var b = Interpolate(startColors.b, endColors.b, COLOR_COUNTS, i);
                    colors.push(new Color(r, g, b));
                }
                //Some D3 magic
                var quantize = d3.scale.quantize()
                    .domain([0, 1.0])
                    .range(d3.range(COLOR_COUNTS).map(function(i) {
                        return i;
                    }));
                //projection
                var projection = d3.geo.albersUsa()
                    .scale(width)
                    .translate([width / 2, height / 2]);
                //Initialize the geo paths
                var path = d3.geo.path()
                    .projection(projection);
                //append the map
                var svg = d3.select(element[0]).append("svg")
                    .attr("width", width)
                    .attr("height", height);
                //Might need to load this asset locally
                d3.tsv("https://s3-us-west-2.amazonaws.com/vida-public/geo/us-state-names.tsv", function(error, names) {
                    //Map characteristics
                    var name_id_map = {};
                    var id_name_map = {};
                    //Loop through state names
                    for (var i = 0; i < names.length; i++) {
                        name_id_map[names[i].name] = names[i].id;
                        id_name_map[names[i].id] = names[i].name;
                    }
                    //Get the state of each item by using it's name
                    data.forEach(function(d) {
                        var id = name_id_map[d[MAP_STATE]];
                        valueById.set(id, +d[MAP_VALUE]);
                    });
                    //More D3 Quantize
                    quantize.domain([d3.min(data, function(d) {
                            return +d[MAP_VALUE];
                        }),
                        d3.max(data, function(d) {
                            return +d[MAP_VALUE];
                        })
                    ]);
                    //Might need to load this asset locally for perf
                    d3.json("https://s3-us-west-2.amazonaws.com/vida-public/geo/us.json", function(error, us) {
                        svg.append("g")
                            .attr("class", "states-choropleth")
                            .attr("width", width)
                            .attr("height", height)
                            .selectAll("path")
                            .data(topojson.feature(us, us.objects.states).features)
                            .enter().append("path")
                            .attr("class", "land")
//                            .attr("transform", "scale(" + SCALE + ")")
                            .style("fill", function(d) {
                                if (valueById.get(d.id)) {
                                    var i = quantize(valueById.get(d.id));
                                    var color = colors[i].getColors();
                                    return "rgb(" + color.r + "," + color.g +
                                        "," + color.b + ")";
                                } else {
                                    return "rgb(252,234,202)";
                                }
                            })
                            .attr("d", path)
                            .on("mousemove", function(d) {
                                var html = "";
                                html += "<div class=\"tooltip_kv\">";
                                html += "<span class=\"tooltip_key\">";
                                html += id_name_map[d.id];
                                html += "</span>";
                                html += "<span class=\"tooltip_value\">";
                                html += (valueById.get(d.id) ? valueFormat(valueById.get(d.id)) : "0");
                                html += "";
                                html += "</span>";
                                html += "</div>";
                                $("#tooltip-container").html(html);
                                $(this).attr("fill-opacity", "0.8");
                                $("#tooltip-container").show();
                                //Mouse detection coords
                                var coordinates = d3.mouse(this);
                                //Creating responsive width for map
                                var map_width = $('.states-choropleth')[0].getBoundingClientRect().width;
                                //Tooltip event
                                if (d3.event.layerX < map_width / 2) {
                                    d3.select("#tooltip-container")
                                        .style("top", (d3.event.layerY + 15) + "px")
                                        .style("left", (d3.event.layerX + 15) + "px");
                                } else {
                                    var tooltip_width = $("#tooltip-container").width();
                                    d3.select("#tooltip-container")
                                        .style("top", (d3.event.layerY + 15) + "px")
                                        .style("left", (d3.event.layerX - tooltip_width - 30) + "px");
                                }
                            })
                            //Mouse Out function
                            .on("mouseout", function() {
                                $(this).attr("fill-opacity", "1.0");
                                $("#tooltip-container").hide();
                            });
                        //Append the states
                        svg.append("path")
                            .datum(topojson.mesh(us, us.objects.states, function(a, b) {
                                return a !== b;
                            }))
                            .attr("class", "states")
//                            .attr("transform", "scale(" + SCALE + ")")
                            .attr("d", path);
                    });//End of the GEO JSON load
                });//End of TSV Load

            function resize() {
                // adjust things when the window size changes
                width = parseInt(d3.select('#map-container').style('width'), 10);
                width = width - margins.left - margins.right;
                height = width * SCALE;

                // update projection
                projection
                    .translate([width / 2, height / 2])
                    .scale(width);

                // resize the map container
                svg
                    .style('width', width + 'px')
                    .style('height', height + 'px');

                // resize the map
                svg.selectAll('.land').attr('d', path);
                svg.selectAll('.states').attr('d', path);
            }

            d3.select(window).on('resize', resize);

          }//End Link Function
        }//End of Directive function
})();//End of Directive Module

