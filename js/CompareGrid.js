Ext.ns('App');
App.CompareGrid = Ext.extend(Ext.grid.GridPanel, {
    initComponent: function() {
        Ext.apply(this, {
            store: new Ext.data.JsonStore({
                root: 'results',
                storeId: 'premiums',
                fields: ['company', 'grpname', 'premium', 'cr08', 'cr07', 'cr06', 'cr05', 'cr04', 'short', 'phone', 'web', 'ambest', {
                    name: 'ms08',
                    convert: App.Format.pctChange
                }],
                proxy: new Ext.data.HttpProxy({
                    url: 'php/compare.php',
                    method: 'GET'
                }),
                remoteSort: true,
                sortInfo: {
                    field: 'premium',
                    direction: 'ASC'
                }
            }),
            columns: [{
                header: 'Company',
                id: 'comCol',
                width: 180,
                sortable: false,
                dataIndex: 'company'
            }, {
                header: 'Group',
                id: 'grpCol',
                width: 52,
                sortable: true,
                dataIndex: 'grpname'
            }, {
                header: 'Annual Premium',
                id: 'premCol',
                width: 52,
                sortable: true,
                dataIndex: 'premium',
                align: 'right',
                renderer: App.Format.usMoney
            }],
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function(c, b, r) {
                        Ext.getCmp('contactCont').updateDetail(r.data);
                        Ext.getCmp('graphCont').updateGraph(r.data);
                    }
                }
            }),
            enableHdMenu: false,
            enableColumnMove: false,
            deferRowRender: false,
            stripeRows: true,
            border: false,
            listeners: {
                render: {
                    fn: function() {
                        var a = this;
                        this.getStore().on("load", function() {
                            this.getSelectionModel().selectRow(2)
                            }, a)
                        }
                }
            },
            viewConfig: {
                forceFit: true,
                scrollOffset: 1
            }
        });
        App.CompareGrid.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('comparegrid', App.CompareGrid);

App.ContactDetail = Ext.extend(Ext.BoxComponent, {
    tplMarkup: ['<div class="thumb-wrap">', '<div class="boxyc">', '<h4>Contact Information</h4>', '</div>', '<dl class="notblcontact">', '<dt>Company:</dt>', '<dd>{short}</dd>', '<ul><li class="dividerc"></li></ul>', '<dt>Group:</dt>', '<dd>{grpname}</dd>', '<ul><li class="dividerc"></li></ul>', '<dt>Phone Number:</dt>', '<dd class="right">{phone}</dd>', '<ul><li class="dividerc"></li></ul>', '<dt>Web Site:</dt>', '<dd class="right"><a class="webLink2" href="http://{web}">{web}</a></dd>', '<ul><li class="dividerc"></li></ul></dl>', '<table class="tblcontact">', '<tr><td>A.M. Best Rating:</td>', '<td class="right">{ambest}</td></tr>', '<tr><td>2008 Market Share:</td>', '<td class="right">{ms08}</td></tr>', '</table></div>'],
    initComponent: function() {
        this.tpl = new Ext.Template(this.tplMarkup);
        App.ContactDetail.superclass.initComponent.apply(this, arguments);
    },
    updateDetail: function(data) {
        this.update(data);
    }
});
Ext.reg('contactdetail', App.ContactDetail);

App.GridGraph = Ext.extend(Ext.Container, {
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    initComponent: function() {
        this.items = [{
            xtype: 'comparegrid',
            id: 'gridPanel',
            flex: 1
        }, {
            xtype: 'container',
            height: 208,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [{
                xtype: 'contactdetail',
                id: 'contactCont',
                width: 226
            }, {
                xtype: 'graph',
                id: 'graphCont',
                flex: 1
            }]
            }];
        App.GridGraph.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('gridgraph', App.GridGraph);