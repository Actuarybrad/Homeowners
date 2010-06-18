Ext.ns('App');
App.CompareGrid = Ext.extend(Ext.grid.GridPanel, {
    initComponent: function() {
        Ext.apply(this, {
            store: new App.compareStore(),
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
                      res = Ext.util.JSON.decode('{"results":[{"ratio":' +r.data.cr04+ '},{"ratio":' +r.data.cr05+ '},{"ratio":' +r.data.cr06+ '},{"ratio":' +r.data.cr07+ '},{"ratio":' +r.data.cr08+ '}]}');
                      Ext.getCmp('graphCont').loadData(r.data.company,res);
                      Ext.getCmp('contactCont').updateDetail(r.data);
                    }
                }
            }),
            enableHdMenu: false,
            enableColumnMove: false,
            deferRowRender: false,
            stripeRows: true,
            border: false,
            columnLines: true,
            listeners: {
                render: {
                    fn: function() {
                        var a = this;
                        this.getStore().on("load", function() {
                            this.getSelectionModel().selectRow(3)
                            }, a)
                        }
                }
            },
            viewConfig: {
                forceFit: true,
                scrollOffset: 0
            }
        });
        App.CompareGrid.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('comparegrid', App.CompareGrid);

App.ContactDetail = Ext.extend(Ext.BoxComponent, {
    tplMarkup: ['<div class="thumb-wrap">',
                '<div class="contactFour">',                
                '</div>',
                '<div class="contactTop">',
                '<p class="contactHead">Company</p><p>{short}</p>',
                '<p class="contactHead">Group</p><p>{grpname}</p>',
                '<p class="contactHead">Phone Number</p><p>{phone}</p>',
                '<p class="contactHead">Web Site</p><p><a class="webLink2" href="http://{web}">{web}</a></p>',
                '<table class="contactTable">',                
                '<tr><td class="left"><p class="contactHead">A.M. Best Rating</p><p>{ambest}</p></td><td><p class="contactHead">Market Share</p><p>{ms08}</p></td></tr>',
                '</table>',
                '</div>',
                '</div>'
                ],
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
            height: 475
        }, {
            xtype: 'container',
            flex: 1,
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