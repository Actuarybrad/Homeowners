Ext.ns('App');

App.StartPage = Ext.extend(Ext.BoxComponent, {
	pageContent:[
		'<div id="startPage">',		
		'<h3><span class="largey">Welcome to the Workers Compensation Loss Cost Multiplier Comparison Guide</span></h3>',		
		'<p>This comparison guide is provided to assist you in shopping for workers compensation insurance in New Mexico. Using the links on the left, you will be presented with the loss cost multiplier approved for each insurance carrier in New Mexico.</p>',
		'<p>The National Council on Compensation Insurance (NCCI) promulgates the advisory loss cost for workers compensation in New Mexico. The advisory loss cost is that portion of the rate that represents the projected losses. Insurance companies apply a loss cost multiplier representing the expense portion of the rate. The advisory loss cost combined with the loss cost multiplier produces the workers compensation rate.</p>',
		'<p>The loss cost multipliers are presented by insurance company and by insurance group. The "Company" presentation shows the loss cost multiplier for each insurance company writing workers compensation insurance in New Mexico. The combined total of these companies represent over 90% of the total writings in New Mexico. The "Group" presentation includes the loss cost multiplier for each affiliated company within a group and a "calculated" loss cost multiplier for the group.</p>',
		'<p>The "Current" links shows the most recently approved loss cost multiplier for each insurance carrier and provides the date this multiplier went into effect. The "Historical" links include prior loss cost multipliers for viewing changes between effective dates.</p>',
		'<p>The Loss Cost Multipliers contained in this guide are current as of <span class="largeyd">May 1, 2010</span>.</p>',		
		'<h3 id="serviceHeading"><span class="services">Consumer Resources:</span></h3>',
		'<p>As a continuing service to consumers, the New Mexico Division of Insurance provides various insurance related resources to assist consumers in making informed decisions when shopping for insurance.</p>',
		'<p>New resources are regularly added along with updates to existing publications and guides. Please be sure to check back regularly to stay informed on New Mexico insurance issues. Recently added and future consumer resources:</p>',
		'<ul class="linkList"><li>Market Share Reports - Check to see if your insurer is authorized to do business in New Mexico.</li><li>Consumer Complaint Comparison Guide.</li><li>Financial condition of your insurance company.</li></ul>',
		'<p>To learn more about Workers Compensation Insurance, please visit the links listed under <span class="highLight">"Workers Compensation Links"</span>.</p>',
		'<p>To compare premiums offered in New Mexico for other types of insurance, please visit the links under <span class="highLight">"Premium Comparison Guides"</span>.</p>',		
		'</div>'	
	],
  id: 'card-20',
    initComponent: function() {	    
	    this.html = this.pageContent.join("");
        App.StartPage.superclass.initComponent.call(this);
    }
});

Ext.reg('startpage', App.StartPage);