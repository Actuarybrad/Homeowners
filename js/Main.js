Ext.ns('App');
App.workspace = function() {
    var main;
    return {
        init: function() {
            this.buildMain();
        },
        buildMain: function() {
            Ext.BLANK_IMAGE_URL = "images/s.gif";
            main = new Ext.Container({
                layout: 'vbox',
                height: 775,
                layoutConfig: {
                    align: 'stretch',
                    pack: 'start'
                },
                defaults: {
                    workspace: this,
                    border: false
                },
                items: [{
                    xtype: 'box',
                    height: 45,
                    id: 'headerBox',
                    autoEl: {
                        tag: 'img',
                        src: 'images/allr.jpg'
                    }
                },{
                    flex: 1,
                    xtype: 'container',
                    layout: 'hbox',
                    layoutConfig: {
                        align: 'stretch',
                        pack: 'start'
                    },
                    items: [{
                        xtype: 'sidebar',
                        width: 205,
                        margins: '0 0 0 0',
                        id: 'leftSidebar'
                    },{
                        xtype: 'container',
                        flex: 1,
                        margins: '32 0 30 25',
                        layout: 'card',
                        activeItem: 0,
                        id: 'card-panel',
                        items: [{
            								xtype: 'startpage'
            							},{
            								xtype: 'gridcurrent'
            							},{
            								xtype: 'gridhistorical'
            							},{
            								xtype: 'groupgridcurrent'
            							},{
            								xtype: 'formwiz'
            							}]
                      }]
                    },{
                    xtype: 'box',
                    height: 20,
                    id: 'footerBox',
                    html: '<div id="footer"><span>&#169; Public Regulation Commission</span></div>'
                }],
                renderTo: Ext.getBody()
                });
            main.show();
        }
    };
} ();
Ext.onReady(App.workspace.init, App.workspace);