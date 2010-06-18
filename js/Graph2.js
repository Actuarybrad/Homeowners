Ext.ns('App');

App.Graph = Ext.extend(Ext.Container, {  
	layout: 'fit',
	frame: false,
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
			/*min: 0,
			max: 2.00,
      minPadding:0.09,*/
      maxPadding:0.12,
			tickWidth: 0,
			tickLength: 0,
			endOnTick: true,
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
			 //	borderColor: '#5F588D',
				//borderColor: '#7C7398',
				borderColor: '#756D8F',
				borderRadius: 5,
				borderWidth: 2
			}
		},
		series: []		 
		},
		initComponent: function() {
			this.items = this.buildChart();
			App.Graph.superclass.initComponent.call(this);
		},
		buildChart : function() {
			return {
				xtype: 'highchart',
				id:'highy',
				store: this.buildStore(),
				chartConfig: this.chartConfig
			};
		},
		buildStore : function() {
			return  {
				xtype: 'jsonstore',
				storeId: 'testStore',
				root: 'results',
				fields: ['ratio']
			};
		},
		loadData: function(data,result){
		  this.items.items[0].store.loadData(result);
  		Ext.getCmp('highy').addSeries([{
  			type: 'column',
  			dataIndex: 'ratio',
  			//color: '#60598F',
  			//color: '#706B85',
  			//color: '#7E7995',
  			color: '#756D8F',
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
  			name: data
  		}], false);
     }
 });

Ext.reg('graph', App.Graph);    