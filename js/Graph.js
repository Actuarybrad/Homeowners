Ext.ns('App');

App.Graph = Ext.extend(Ext.ux.HighChart, {  
    initComponent: function() {
        Ext.apply(this, {
      	chartConfig: {
            chart: {                
                defaultSeriesType: 'column',
                backgroundColor: {
                    linearGradient: [0, 0, 0, 600],
                    stops: [[0, 'rgb(247, 246, 248)'], [1, 'rgb(227, 226, 228)']]
                    },
                borderWidth: 1,
                borderColor: '#F9F9F9',
                borderRadius: 16,
                plotBackgroundColor: '#FCFCFC',
                shadow: false,
                plotShadow: false,
                plotBorderColor: '#D1D1D1',
                plotBorderWidth: 1
            },
            credits: {
                enabled: false
            },
            legend: {
                itemStyle: {
                    color: '#333'
                }
            },
            title: {
                text: 'Complaint Ratios by Year',
                style: {
                    color: '#333',
                    font: '14px Arial, Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                }
            },
            subtitle: {
                text: 'National Average = 1.00',
                style: {
                    color: '#888',
                    font: '12px Arial, Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                }
            },
            xAxis: {
                tickWidth: 0,
                tickLength: 0,
                categories: ['2004', '2005', '2006', '2007', '2008'],
                gridLineWidth: 0,
                lineColor: '#FFFFFF',
                lineWidth: 1,
                tickColor: '#999',
                labels: {
                    style: {
                        color: '#444',
                        font: '11px normal Arial, Helvetica, sans-serif'
                    }
                },
                title: {
                    style: {
                        color: '#333',
                        font: 'bold 11px Arial, Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                max: 3.00,
                tickWidth: 0,
                tickLength: 0,
                endOnTick: false,
                minorTickInterval: null,
                gridLineColor: '#EFEFEF',
                lineColor: '#D1D1D1',
                lineWidth: 1,
                labels: {
                    style: {
                        color: '#444',
                        font: '11px normal Arial, Helvetica, sans-serif'
                    }
                },
                title: {
                    text: 'Ratios',
                    margin: 33,
                    style: {
                        color: '#333',
                        font: '11px normal Arial, Helvetica, sans-serif'
                    }
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.26,
                    animation: true,
                    borderColor: '#5F588D',
                    borderRadius: 5,
                    borderWidth: 2
                }
            },
            series: [{
                name: 'Farm Bureau Mutual Insurance Company',
                color: '#60598F',
                dataLabels: {
                    enabled: true,
                    align: 'center',
                    x: -1,
                    y: -4,
                    formatter: function() {
                        return Highcharts.numberFormat(this.y, 2, '.', ',');
                    },
                    style: {
                        color: '#666666',
                        font: 'normal 10px Arial, Lucida Grande, Verdana, sans-serif'
                    }
                },
                data: [[2004, 0.98], [2005, 1.27], [2006, 1.20], [2007, 0.88], [2008, 1.03]]
                }]
  			}
        });
        App.Graph.superclass.initComponent.apply(this, arguments);
    },    
    updateGraph: function(data) {
        var detailData = [];
        var detailData = [[2004, data.cr04], [2005, data.cr05], [2006, data.cr06], [2007, data.cr07], [2008, data.cr08]];
        this.chart.series[0].remove(false);
        this.chart.addSeries({
            name: data.company,
            color: '#60598F',
            data: detailData,
            dataLabels: {
                enabled: true,
                align: 'center',
                x: -1,
                y: -4,
                formatter: function() {
                    return Highcharts.numberFormat(this.y, 2, '.', ',');
                },
                style: {
                    color: '#666666',
                    font: 'normal 10px Arial, Lucida Grande, Verdana, sans-serif'
                }
            }
        }, false);
        this.chart.redraw();
    }
});

Ext.reg('graph', App.Graph);