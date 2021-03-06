﻿Ext.ns('App');
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
                height: 770,
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
                        src: 'images/allr1.jpg'
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
                        margins: '30 0 4 20',
                        layout: 'card',
                        activeItem: 0,
                        id: 'card-panel',
                        items: [{
            								xtype: 'startpage'
            							},{
            								xtype: 'gridgraph'
            							},{
            								xtype: 'formwiz'
            							},{
            								xtype: 'box',
                            id: 'card-8',
                            html: '<p>Card-8</p>'                      
            							},{
                            xtype: 'box',
                            id: 'card-9',
                            html: '<p>Card-9</p>'
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