Ext.ns('App');

App.Format = function(){
     return {
        usMoney: function(value, metaData, record){
		  if (value == "NA") {
			    return v
    		} else {
                v = (Math.round((value-0)*100))/100;
                v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
                v = String(v);
                var ps = v.split('.'),
                    whole = ps[0],
                    sub = ps[1] ? '.'+ ps[1] : '.00',
                    r = /(\d+)(\d{3})/;
                while (r.test(whole)) {
                    whole = whole.replace(r, '$1' + ',' + '$2');
                }
                v = whole + sub;
                if(v.charAt(0) == '-'){
                    return '-$' + v.substr(1);
                }				
                return "$" +  whole;
    	 }		
        },
		pctChange: function(value, metaData, record) {
			k = value * 100;
			v = k.toFixed(1);		
			return "<span>" + v + "%</span>";
		},
       lcmThree: function(value, metaData, record) {
          var b = value.toFixed(3);		 
		  return b;
	   },
	   lcmThreeRed: function(value, metaData, record) {
		if (value > record.get('lcmpy')) {
			metaData.style += 'color: #8E4646;font-style:oblique;';
		}
		  var b = value.toFixed(3);		 
		  return b;
	   },
	   lcmThreeRedPrior: function(value, metaData, record) {
		if (value > record.get('lcmpy1')) {
			metaData.style += 'color: #8E4646;font-style:oblique;';
		}
		  var b = value.toFixed(3);		 
		  return b;
	   }
    }
}();