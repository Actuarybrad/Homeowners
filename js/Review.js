Ext.ns('App');

App.Review = Ext.extend(Ext.Window, {
    layout: 'fit',
    closable: false,
    width: 442,
  	height:266,
    border: false,
    draggable: false,
    resizable: false,
    shadow: false,
    title:'<table id="reviewTitle"><tr><td align="left"><h3 class="reviewLarge">Your Selections:</h3></td><td align="right" id="topClose">Close</td></tr></table>',
    bodyStyle: 'background: #FFFFFF; border-right: 5px solid #E3E2E4; border-left: 5px solid #E3E2E4; border-bottom: 5px solid #E3E2E4; border-top: 1px solid #d3d2d4;',
    id: 'reviewWin',
    tpl:'<dl class="selDef"><dt>Location/City:</dt><dd>{city}</dd><ul><li class="dividers"></li></ul><dt>Deductible:</dt><dd>{ded}</dd><ul><li class="dividers"></li></ul><dt>Coverage:</dt><dd>{cov}</dd><ul><li class="dividers"></li></ul><dt>Structure:</dt><dd>{struct}</dd><ul><li class="dividers"></li></ul><dt>Distance:</dt><dd>{dist}</dd><ul><li class="dividers"></li></ul><dt>Year:</dt><dd>{year}</dd><dl>',
  	initComponent: function() {
          App.Review.superclass.initComponent.call(this);
    },
    updateReview: function(data) {
        this.update(data);
    }
});