var pathLayer;

var pathSymbolizer = {
	     'Line': {strokeColor: '#67c547', strokeDashstyle: '5 2', strokeWidth: 2}
	};
	function PublicPath(layer){
		pathLayer = layer; 
	}
	
	
	PublicPath.prototype.createDisplayCriteria = function(){
		var cptfilter;
		
				
		var cptfilter1 = new OpenLayers.Filter.Comparison({
	        type: OpenLayers.Filter.Comparison.EQUAL_TO,
	        property: 'ishistory',
	        value: 'false'
	    });
		
		var cptfilter2 = new OpenLayers.Filter.Comparison({
	        type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
	        property: 'type',
	        value: 1
	    });
	    
	    var cptfilter3 = new OpenLayers.Filter.Comparison({
	        type: OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO,
	        property: 'type',
	        value: 4
	    });
		
		cptfilter2 = new OpenLayers.Filter.Logical({
     	    type: OpenLayers.Filter.Logical.AND,
    	    filters:[cptfilter2, cptfilter3]
    	});
    	
    	cptfilter = new OpenLayers.Filter.Logical({
     	    type: OpenLayers.Filter.Logical.AND,
    	    filters:[cptfilter1, cptfilter2]
    	});
		
		return cptfilter;
	}
	
	PublicPath.prototype.applySLD = function(cptfilter){
		var symbolizer = {Line: style['Line']};
		var sld_rules = [];
		var sld = {
		        version: "1.0.0",
		        namedLayers: {}
		    };
		
		var layerName = layerMap[pathLayer.name];
	    sld.namedLayers[layerName] = {
			        name: layerName,
			        userStyles: []
			      };
	    
	    var rule = new OpenLayers.Rule({
	        title: "Public Path",
	        symbolizer: pathSymbolizer,
	        filter: cptfilter
	    })
	    sld_rules.push(rule);
	    sld.namedLayers[layerName].userStyles.push({
	        rules: sld_rules
	    });
	    
	    sld = new OpenLayers.Format.SLD().write(sld);
	  //Post the SLD
	    $.ajax({
	        type: 'POST',
	        url: "theme/createSLD",
	        dataType: "text",
	        data: { data: escape(sld) },
	        success: function (result) {
	            sld_result = result;
	            path_sld = sld_result;
	            
	            var layerOptions = null;
	            layerOptions = OpenLayers.Util.applyDefaults(layerOptions, {
	                displayInLayerSwitcher: false,
	                tileOptions: {
	                    maxGetUrlLength: 2048
	                }
	            });

	     
	            pathLayer.mergeNewParams({
	                SLD: sld_result
	            });
	            pathLayer.redraw(true);
	        },
	        error: function (xhr, status) {
	            jAlert('Sorry, there is a problem!');
	        }
	    });
	}