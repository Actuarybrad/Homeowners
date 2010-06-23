Ext.ns('App');

App.testStore = Ext.extend(Ext.data.JsonStore, {
  constructor: function () {
    App.testStore.superclass.constructor.call(this, {
      storeId: 'testStore',
      root: 'results',
      fields: [{
        name: 'company',
        type: 'string'
      }, {
        name: 'cr08',
        type: 'float'
      }, {
        name: 'cr07',
        type: 'float'
      }, {
        name: 'cr06',
        type: 'float'
      }, {
        name: 'cr05',
        type: 'float'
      }, {
        name: 'cr04',
        type: 'float'
      }]
    });
  }
});

App.testGrid = Ext.extend(Ext.grid.GridPanel, {
  initComponent: function () {
    Ext.apply(this, {
      store: new App.testStore(),
      series: [{
        type: 'column',
        dataIndex: 'AVG_SALES_PRICE',
        name: 'Avg Price',
      }, {
        type: 'column',
        name: 'Med Price',
        dataIndex: 'MED_SALES_PRICE',
      }, {
        type: 'spline',
        dataIndex: 'TOTAL_UNITS',
        yAxis: 1,
        name: 'Total Units',
      }],
      columnLines: true,
      viewConfig: {
        forceFit: true,
        scrollOffset: 0
      }
    });
    App.testGrid.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('testgrid', App.testGrid);