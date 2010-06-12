Ext.ns('App');
App.LinksPanel = Ext.extend(Ext.Container, {
    border: false,
    layout: 'fit',
    tpl: new Ext.XTemplate('<h4 id="{htext}"></h4><tpl for="links"><ul class="msd"><li class="divider"></li><li id="{id}" class="bullet"><a href="{href}">{text}</a></li></ul></tpl>'),
    initComponent: function() {
        data = this.data;
        tpl = this.tpl;
        App.LinksPanel.superclass.initComponent.call(this);
    }
});
Ext.reg('linkspanel', App.LinksPanel);

App.SideBar = Ext.extend(Ext.Container, {
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    Selections: {
        htext: 'Selections',
        links: [{
            text: 'Location/City',
            id: 'link-1',
            href: '#'
        }, {
            text: 'Deductible',
            id: 'link-2',
            href: '#'
        }, {
            text: 'Coverage',
            id: 'link-3',
            href: '#'
        }, {
            text: 'Structure',
            id: 'link-4',
            href: '#'
        }, {
            text: 'Distance',
            id: 'link-5',
            href: '#'
        }, {
            text: 'Year',
            id: 'link-6',
            href: '#'
        }]
	},
    Review: {
        htext: 'Review',
        links: [{
            text: 'Review Selections',
            id: 'link-7',
            href: '#'
        }, {
            text: 'Submit Selections',
            id: 'link-8',
            href: '#'
        }]
	},
    Resources: {
        htext: 'Resources',
        links: [{
            text: 'Consumer Guide',
            id: 'link-9',
            href: '#'
        }, {
            text: 'Cost of Homweowners',
            id: 'link-10',
            href: '#'
        }, {
            text: 'Homeowners FAQs',
            id: 'link-11',
            href: '#'
        }, {
            text: 'Market Share Rports',
            id: 'link-12',
            href: '#'
        }]
	},
    Guides: {
        htext: 'Guides',
        links: [{
            text: 'Workers Compensation',
            id: 'link-15',
            href: '#'
        }, {
            text: 'Condominium Owners',
            id: 'link-16',
            href: '#'
        }, {
            text: 'Renters',
            id: 'link-17',
            href: '#'
        }, {
            text: 'Automobile Single Driver',
            id: 'link-18',
            href: '#'
        }, {
            text: 'Automobile Household Driver',
            id: 'link-19',
            href: '#'
        }, {
            text: 'Homeowners',
            id: 'link-0',
            href: '#'
        }]
	},
    initComponent: function() {
        this.selects = new App.LinksPanel({
            data: this.Selections
        });
        this.review = new App.LinksPanel({
            data: this.Review
        });
        this.resources = new App.LinksPanel({
            data: this.Resources
        });
        this.guides = new App.LinksPanel({
            data: this.Guides
        });
        this.items = [this.selects, this.review, this.resources, this.guides];
        App.SideBar.superclass.initComponent.call(this);
    },
    afterRender: function() {
        App.SideBar.superclass.afterRender.call(this);
        this.el.on('mousedown', this.doAction, this, {
            delegate: 'li.bullet'
        });
        this.el.on('mouseover', this.mouseOver, this.el.dom, {
            delegate: 'li.bullet'
        });
        this.el.on('mouseout', this.mouseOut, this.el.dom, {
            delegate: 'li.bullet'
        });
    },
    onLayout: function() {
        Ext.get('link-0').addClass('bulletClick');
    },
    mouseOver: function(c, d) {
        Ext.get(d).down('a').addClass('linkOver');
    },
    mouseOut: function(c, d) {
        Ext.get(d).down('a').removeClass('linkOver');
    },
    doAction: function(c, d) {
        c.stopEvent();
        Ext.get("leftSidebar").select("li.bullet").each(function(c) {
            if (c.id != d.id) {
                Ext.get(c).removeClass('bulletClick');
            } else {
                Ext.get(c).addClass('bulletClick');
            }
        });
        var a = d.id.split("link-")[1];
        var f = parseInt(a);
        switch (true) {
        case f == 0: Ext.getCmp('card-panel').getLayout().setActiveItem(f);
            break
        case f == 1: Ext.getCmp('card-1').load();
            Ext.getCmp('card-panel').getLayout().setActiveItem(f);
            break
        case f == 2: Ext.getCmp('card-2').load();
            Ext.getCmp('card-panel').getLayout().setActiveItem(f);
            break
        case f == 3: Ext.getCmp('card-3').load();
            Ext.getCmp('card-panel').getLayout().setActiveItem(f);
            break
        case f == 4: Ext.getCmp('card-4').load();
            Ext.getCmp('card-panel').getLayout().setActiveItem(f);
            break
        default:
            Ext.getCmp('card-panel').getLayout().setActiveItem(0);
        }
    }
});
Ext.reg('sidebar', App.SideBar);