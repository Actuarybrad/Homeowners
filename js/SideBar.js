Ext.ns('App');
App.LinksPanel = Ext.extend(Ext.Container, {
    border: false,
    layout: 'fit',
    //tpl: new Ext.XTemplate('<h4 id="{htext}"></h4><tpl for="links"><ul class="msd"><li id="{id}" class="bullet"><a href="{href}">{text}</a></li><li class="divider"></li></ul></tpl>'),
    tpl: new Ext.XTemplate('<h4 id="{htext}"></h4><tpl for="links"><ul class="msd"><li id="{id}" class="bullet"><a href="{href}">{text}</a></li></ul></tpl>'),
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
            id: 'link-0',
            href: '#'
        }, {
            text: 'Deductible',
            id: 'link-1',
            href: '#'
        }, {
            text: 'Coverage',
            id: 'link-2',
            href: '#'
        }, {
            text: 'Structure',
            id: 'link-3',
            href: '#'
        }, {
            text: 'Distance',
            id: 'link-4',
            href: '#'
        }, {
            text: 'Year',
            id: 'link-5',
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
            id: 'link-20',
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
        App.SideBar.superclass.onLayout.call(this);
        Ext.get('link-20').addClass('bulletClick');
        Ext.get('link-20').down('a').addClass('bulletClicka');
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
                Ext.get(c).down('a').removeClass('bulletClicka');
            } else {
                Ext.get(c).addClass('bulletClick');
                Ext.get(c).down('a').addClass('bulletClicka');
            }
        });
        var a = d.id.split("link-")[1];
        var f = parseInt(a);
        switch (true) {
        case f == 20:
            Ext.getCmp('card-panel').getLayout().setActiveItem(0);
          break
        case f == 7:
            win = new App.Review();
            win.show().alignTo('link-7','tl-bl', [206,-50]);
            Ext.getCmp('reviewWin').getEl().slideIn('l', {easing:'easeOut',duration:.6});
            Ext.getCmp('reviewWin').updateReview(Ext.getCmp('formCard').getRadioValues());
            Ext.get('topClose').addClassOnOver('closeOver');
            Ext.get('topClose').on('click', function (){
              Ext.get('link-7').removeClass('bulletClick');
              Ext.get('link-7').down('a').removeClass('bulletClicka');
              k = Ext.getCmp('card-panel').getLayout().activeItem.id;
              if(k=='formCard') {
								var l = Ext.getCmp('formCard').getLayout().activeItem.id;
								var j = parseInt(l.split('card-')[1]);
  						} else {
								var j = parseInt(k.split('card-')[1]);
  						}
              Ext.get('link-'+j).addClass('bulletClick');
              Ext.get('link-'+j).down('a').addClass('bulletClicka');
              Ext.getCmp('reviewWin').getEl().slideOut('l', {remove:true,duration:.6});
            });
          break
        case f == 8:
            Ext.StoreMgr.get('cmpStore').load({params: Ext.getCmp('formCard').getForm().getValues()});
            Ext.getCmp('card-panel').getLayout().setActiveItem(1);
          break
        default:
            Ext.getCmp('card-panel').getLayout().setActiveItem(2);
            Ext.getCmp("formCard").getLayout().setActiveItem(f);
        }
    }
});
Ext.reg('sidebar', App.SideBar);