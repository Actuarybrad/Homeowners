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
                        Ext.getCmp('contactCont').updateDetail(r.data);
                        //Ext.getCmp('graphCont').updateGraph(r.data);
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
                            this.getSelectionModel().selectRow(2)
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
                //'<h4>Contact Information</h4>',
                //'<h4></h4>',
                '</div>',
                '<div class="contactTop">',
                '<p class="contactHead">Company</p><p>{short}</p>',
                '<p class="contactHead">Group</p><p>{grpname}</p>',
                '<p class="contactHead">Phone Number</p><p>{phone}</p>',
                '<p class="contactHead">Web Site</p><p><a class="webLink2" href="http://{web}">{web}</a></p>',
                '<table class="contactTable">',
                //'<tr><td><p class="contactHead">Phone Number</p><p>{phone}</p></td><td><p class="contactHead">Web Site</p><p><a class="webLink2" href="http://{web}">{web}</a></p></td></tr>',
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
            //flex: 1
            height:478
        },{
            xtype: 'contactdetail',
            id: 'contactCont',
            flex: 1
            //height: 200,
            //width: 250
        }];
    App.GridGraph.superclass.initComponent.apply(this, arguments);
    }
});
Ext.reg('gridgraph', App.GridGraph);

/*
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
Ext.reg('gridgraph', App.GridGraph);*/