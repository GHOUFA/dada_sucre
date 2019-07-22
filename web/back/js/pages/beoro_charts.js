/* [ ---- Beoro Admin - charts ---- ] */

    $(document).ready(function() {
        beoro_charts.chPie();
        beoro_charts.chBar();
        beoro_charts.chThreshold();
        beoro_charts.chLive();
    });

    //* charts
    beoro_charts = {
        chPie: function() {
            if($('#chart_pie').length) {
                var container = $('#chart_pie');
                var data=[]
                $.ajaxSetup({async: false});
                $.getJSON( lienhotel, function( datax ) {
                    $.each( datax, function( key, val ) {
                        var tab={
                            label: key,
                            data: val
                        };
                        data.push(tab);
                    });
                });
                $.plot(container, data,
                    {
                        label: "Favourite food",
                        series: {
                            pie: {
                                show: true,
                                highlight: {
                                    opacity: 0.2
                                }
                            }
                        },
                        grid: {
                            hoverable: true,
                            clickable: true
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: "%s - %p.2%",
                            shifts: {
                                x: 20,
                                y: 0
                            },
                            defaultTheme: false
                        },
                        colors: [ "#007814", "#780000", "#04539d", "#bf6700", "#bf009d", "#bf8700", "#00a0e0", "#d8e000" ]
                    }
                );
            }
        },
        chBar: function() {
            if($('#chart_bar').length) {
                var container = $("#chart_bar");
                
                var d1 = [];
                $.ajaxSetup({async: false});
                $.getJSON( lien, function( data ) {
                    $.each( data, function( key, val ) {
                        d1.push([(key* 1000), parseInt(val)]);
                    });
                });
               // console.log(d1);
                /*for (var i = 0; i <= 10; i += 1)
                    d1.push([i, parseInt(Math.random() * 30)]);
*/
                var dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
                $.plot(container, [ d1 ], {

                    series: {
                        stack: true,
                        bars: {
                            show: true,
                            barWidth: 0,
                            lineWidth: 25,
                            fillColor: { colors: [ { opacity: 0.8 }, { opacity: 0.8 }, { opacity: 0.8 } ] }
                        }
                    },
                    xaxis: {
                        //ticks: 'ticks',
                        mode: "time",
                        tickFormatter: function (val, axis) {
                            //console.log(val);
                            return dayOfWeek[new Date(val).getDay()];
                        },
                        tickSize: [1, "day"],
                        axisLabelUseCanvas: false,
                        timeformat: "%d-%m"
                    },
                    yaxis: {},

                    grid: {
                        borderColor: "#eee",
                        minBorderMargin: 20,
                        labelMargin: 10,
                        hoverable: true,
                        margin: {
                            top: 8,
                            bottom: 20,
                            left: 20
                        }
                        /*markings: function(axes) {
                            var markings = [];
                            var xaxis = axes.xaxis;
                            for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                                //markings.push({ xaxis: { from: x, to: x + xaxis.tickSize }, color: "#f7f7f7" });
                            }
                            return markings;
                        }*/
                    },
                    tooltip: false,
                    /*tooltipOpts: {
                        content: "x: %x, y: %y"
                    },*/
                    colors: ["#cba13b","#d9bb71","#e7d5a7"]
                });
            }
        },
        chThreshold: function() {
            if($('#chart_threshold').length) {
                var container = $("#chart_threshold");
                
                var d1 = [];
                for (var i = 0; i <= 60; i += 1)
                    d1.push([i, parseInt(Math.random() * 30 - 10)]);

                function plotWithOptions(t) {
                    $.plot(container,
                        [ {
                            data: d1,
                            color: "#2d83a6",
                            threshold: { below: t, color: "rgb(200, 20, 30)" },
                            lines: { steps: true }
                        } ],
                        {
                            grid: {
                                borderWidth: 1,
                                borderColor: "#eee",
                                minBorderMargin: 20,
                                labelMargin: 10,
                                hoverable: false,
                                margin: {
                                    top: 8,
                                    bottom: 20,
                                    left: 20
                                },
                                markings: function(axes) {
                                    var markings = [];
                                    var xaxis = axes.xaxis;
                                    for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                                        markings.push({ xaxis: { from: x, to: x + xaxis.tickSize }, color: "#f7f7f7" });
                                    }
                                    return markings;
                                }
                            }
                        }
                    );
                }

                plotWithOptions(0);

                $(".threshold_btns input").click(function (e) {
                    e.preventDefault();
                    var t = parseFloat($(this).val().replace('Threshold at ', ''));
                    plotWithOptions(t);
                })
            }
        },
        chLive: function() {
            if($('#chart_live').length) {
                var container = $("#chart_live");
                var maximum = container.outerWidth() / 2 || 300;
                var data = [];

                function getRandomData() {
                    if (data.length) {
                        data = data.slice(1);
                    }
                    while (data.length < maximum) {
                        var previous = data.length ? data[data.length - 1] : 50;
                        var y = previous + Math.random() * 10 - 5;
                        data.push(y < 0 ? 0 : y > 100 ? 100 : y);
                    }
                    var res = [];
                    for (var i = 0; i < data.length; ++i) {
                        res.push([i, data[i]])
                    }
                    return res;
                }

                var series = [{
                    data: getRandomData(),
                    lines: {
                        fill: true
                    }
                }];

                var live_plot = $.plot(container, series, {
                    grid: {
                        borderWidth: 1,
                        borderColor: "#eee",
                        minBorderMargin: 20,
                        labelMargin: 10,
                        hoverable: false,
                        margin: {
                            top: 8,
                            bottom: 20,
                            left: 20
                        },
                        markings: function(axes) {
                            var markings = [];
                            var xaxis = axes.xaxis;
                            for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                                markings.push({ xaxis: { from: x, to: x + xaxis.tickSize }, color: "#f7f7f7" });
                            }
                            return markings;
                        }
                    },
                    yaxis: {
                        min: 0,
                        max: 110
                    },
                    legend: {
                        show: true
                    },
                    colors: ["#86ae00"]
                });
            
                var yaxisLabel = $("<div class='axisLabel yaxisLabel'></div>")
                    .text("Response Time (ms)")
                    .appendTo(container);
            
                yaxisLabel.css("margin-top", yaxisLabel.width() / 2);

                setInterval(function updateRandom() {
                    series[0].data = getRandomData();
                    live_plot.setData(series);
                    live_plot.draw();
                }, 500);
            }
        }
    };