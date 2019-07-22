/* [ ---- Beoro Admin - dashboard ---- ] */

    $(document).ready(function() {
        //* todo list
        beoro_todoList.init();
        //* pageviews chart
        beoro_charts.pages();
        //* sales chart
        beoro_charts.sales();
        //* users chart
        beoro_charts.users();
        //* responsive carousel
        beoro_rcarousel.init();

    });

    //* responsive carousel
    beoro_rcarousel = {
        init: function() {
            if($('.slidewrap').length) {
                $('.slidewrap').rcarousel({
                    addPagination: true,
                    addNav : false,
                    rotate : true,
                    slideHed: '.headName',
                    speed: 600,
                    autoHeight: true
                }).on({
                    'rcarousel-aftermove' : function(ui) {
                        $('.slidewrap .slider').height($(ui.target).filter('.rcarousel-active-slide').height());
                    }
                });
            }
        }
    };

    //* todo list




    //* charts
    beoro_charts = {
        pages: function() {
            if($('#ch_pages').length) {

                var elem = $('#ch_pages');

                var d1 = [
                    [new Date('10/10/2012').getTime(),2200],
                    [new Date('10/11/2012').getTime(),2400],
                    [new Date('10/12/2012').getTime(),1500],
                    [new Date('10/13/2012').getTime(),1100],
                    [new Date('10/14/2012').getTime(),1340],
                    [new Date('10/15/2012').getTime(),1000],
                    [new Date('10/16/2012').getTime(),2510],
                    [new Date('10/17/2012').getTime(),3510],
                    [new Date('10/18/2012').getTime(),2000],
                    [new Date('10/19/2012').getTime(),1800],
                    [new Date('10/21/2012').getTime(),1200],
                    [new Date('10/22/2012').getTime(),2400],
                    [new Date('10/23/2012').getTime(),2800],
                    [new Date('10/24/2012').getTime(),3200]
                ];

                // add 2h to match utc+2
                for (var i = 0; i < d1.length; ++i) {d1[i][0] += 60 * 120 * 1000};

                var ds = new Array();

                ds.push({
                    label: "Data 1", data:d1
                });

                var options = {
                    grid: {
                        hoverable: true,
                        borderWidth: 0,
                        color: "#666",
                        labelMargin: 10,
                        axisMargin: 0,
                        mouseActiveRadius: 10,
                        
                    },
                    series: {
                        lines: { show: true, lineWidth: 2, fill: true },
                        points: {
                            show: true,
                            radius: 3,
                            symbol: "circle",
                            fill: true
                        }
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: "%s - %y",
                        shifts: {
                            x: 20,
                            y: 0
                        },
                        defaultTheme: false
                    },
                    xaxis: {
                        mode: "time",
                        minTickSize: [1, "day"],
                        timeformat: "%d/%m",
                        labelWidth: "40"
                    },
                    yaxis: { min: 0 },
                    legend: {
                        noColumns: 0,
                        position: "ne"
                    },
                    colors: ["#ffad33","#bd3501"]
                };

                $.plot(elem, ds, options);

            }
        },
        sales : function() {
            if($('#ch_sales').length) {
                var elem = $('#ch_sales');

                var d1 = [
                    [new Date('09/23/2012').getTime(),350],
                    [new Date('09/24/2012').getTime(),422],
                    [new Date('09/25/2012').getTime(),550],
                    [new Date('09/26/2012').getTime(),608],
                    [new Date('09/27/2012').getTime(),681],
                    [new Date('09/28/2012').getTime(),591],
                    [new Date('09/29/2012').getTime(),510]
                ];

                var d2 = [
                    [new Date('09/23/2012').getTime(),1200],
                    [new Date('09/24/2012').getTime(),1400],
                    [new Date('09/25/2012').getTime(),1500],
                    [new Date('09/26/2012').getTime(),1200],
                    [new Date('09/27/2012').getTime(),1340],
                    [new Date('09/28/2012').getTime(),1421],
                    [new Date('09/29/2012').getTime(),1510]
                ];

                var d3 = [
                    [new Date('09/23/2012').getTime(),120],
                    [new Date('09/24/2012').getTime(),100],
                    [new Date('09/25/2012').getTime(),180],
                    [new Date('09/26/2012').getTime(),140],
                    [new Date('09/27/2012').getTime(),153],
                    [new Date('09/28/2012').getTime(),184],
                    [new Date('09/29/2012').getTime(),226]
                ];

                // add 2h to match utc+2
                for (var i = 0; i < d1.length; ++i) {d1[i][0] += 60 * 120 * 1000};
                for (var i = 0; i < d2.length; ++i) {d2[i][0] += 60 * 120 * 1000};
                for (var i = 0; i < d3.length; ++i) {d3[i][0] += 60 * 120 * 1000};

                var ds = new Array();

                ds.push({
                    label: "Data 1",
                    data:d1,
                    bars: {
                        show: true, 
                        barWidth: 60 * 220 * 1000, 
                        order: 1,
                        lineWidth : 2,
                        fill: 1
                    }
                });
                ds.push({
                    label: "Data 2",
                    data:d2,
                    bars: {
                        show: true, 
                        barWidth: 60 * 220 * 1000, 
                        order: 2,
                        fill: 1
                    }
                });
                ds.push({
                    label: "Data 3",
                    data:d3,
                    bars: {
                        show: true, 
                        barWidth: 60 * 220 * 1000, 
                        order: 3,
                        fill: 1
                    }
                });
                
                var options = {
                    grid: {
                        hoverable: true,
                        borderWidth: 0,
                        color: "#666",
                        labelMargin: 10,
                        axisMargin: 0,
                        mouseActiveRadius: 10
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: "%s - %y",
                        shifts: {
                            x: 20,
                            y: 0
                        },
                        defaultTheme: false
                    },
                    xaxis: {
                        mode: "time",
                        minTickSize: [1, "day"],
                        timeformat: "%d/%m"
                    },
                    legend: {
                        noColumns: 0,
                        position: "ne"
                    },
                    colors: ["#0094bb","#86ae00","#f2b705","#ffad33","#bd3501"]
                };
                
                $.plot(elem, ds, options);
            }
        },
        users : function() {
            if($('#ch_users').length) {
                var elem = $('#ch_users');

                var d1 = [
                    [new Date('11/08/2012').getTime(),1200],
                    [new Date('11/09/2012').getTime(),1400],
                    [new Date('11/10/2012').getTime(),1500],
                    [new Date('11/11/2012').getTime(),1285],
                    [new Date('11/12/2012').getTime(),1340],
                    [new Date('11/13/2012').getTime(),1421],
                    [new Date('11/14/2012').getTime(),1212],
                    [new Date('11/15/2012').getTime(),1408],
                    [new Date('11/16/2012').getTime(),1567],
                    [new Date('11/17/2012').getTime(),1238],
                    [new Date('11/18/2012').getTime(),1340],
                    [new Date('11/19/2012').getTime(),1401],
                    [new Date('11/20/2012').getTime(),1491],
                    [new Date('11/21/2012').getTime(),1510]
                ];

                var d2 = [
                    [new Date('11/08/2012').getTime(),350],
                    [new Date('11/09/2012').getTime(),422],
                    [new Date('11/10/2012').getTime(),550],
                    [new Date('11/11/2012').getTime(),608],
                    [new Date('11/12/2012').getTime(),946],
                    [new Date('11/13/2012').getTime(),489],
                    [new Date('11/14/2012').getTime(),284],
                    [new Date('11/15/2012').getTime(),354],
                    [new Date('11/16/2012').getTime(),497],
                    [new Date('11/17/2012').getTime(),603],
                    [new Date('11/18/2012').getTime(),650],
                    [new Date('11/19/2012').getTime(),570],
                    [new Date('11/20/2012').getTime(),520],
                    [new Date('11/21/2012').getTime(),380]
                ];

                // add 2h to match utc+2
                for (var i = 0; i < d1.length; ++i) {d1[i][0] += 60 * 120 * 1000};
                for (var i = 0; i < d2.length; ++i) {d2[i][0] += 60 * 120 * 1000};

                var ds = new Array();

                ds.push({
                    label: "Data 1", data:d1
                });
                ds.push({
                    label: "Data 2", data:d2
                });

                var options = {
                    grid: {
                        hoverable: true,
                        borderWidth: 0,
                        color: "#666",
                        labelMargin: 10,
                        axisMargin: 0,
                        mouseActiveRadius: 10
                    },
                    series: {
                        lines: { show: true,lineWidth: 2 },
                        points: {
                            show: true,
                            radius: 3,
                            symbol: "circle",
                            fill: true
                        }
                    },
                    tooltip: true,
                    tooltipOpts: {
                        content: "%s - %y",
                        shifts: {
                            x: 20,
                            y: 0
                        },
                        defaultTheme: false
                    },
                    xaxis: {
                        mode: "time",
                        minTickSize: [1, "day"],
                        timeformat: "%d/%m",
                        labelWidth: "40"
                    },
                    yaxis: { min: 0 },
                    legend: {
                        noColumns: 0,
                        position: "ne"
                    },
                    colors: ["#0094bb","#86ae00","#f2b705","#ffad33"]
                };

                $.plot(elem, ds, options);
            }
        }
    };
