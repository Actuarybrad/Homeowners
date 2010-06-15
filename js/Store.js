Ext.ns('App');

App.compareStore = Ext.extend(Ext.data.JsonStore, {
    constructor: function() {
        App.compareStore.superclass.constructor.call(this, {
			storeId: 'cmpStore',
            root: 'results',
            url: 'php/compare.php',
			remoteSort: true,
            sortInfo: {
                field: 'premium',
                direction: 'ASC'
            },          
            fields: [            
            {
                name: 'company',
                type: 'string'
            },
            {
                name: 'grpname',
                type: 'string'
            },
            {
                name: 'premium',
                type: 'auto'
            },
            {
                name: 'cr08',
                type: 'float'
            },
            {
                name: 'cr07',
                type: 'float'
            },
            {
                name: 'cr06',
                type: 'float'
            },
            {
                name: 'cr05',
                type: 'float'
            },            
            {
                name: 'cr04',
                type: 'float'
            },
            {
                name: 'short',
                type: 'string'
            },
            {
                name: 'phone',
                type: 'string'
            },
            {
                name: 'web',
                type: 'string'
            },
            {
                name: 'ambest',
                type: 'string'
            },
            {
                name: 'ms08',
                type: 'float',
                convert: App.Format.pctChange
            }            
        ]
        });
    }
});