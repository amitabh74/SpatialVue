var accessLandLayer;
var apSymbolizer = {
	    'Polygon': {fillColor: '#f5df51', fillOpacity:0.3, stroke: true, strokeColor:'#f5df51', strokeWidth: 1}
	};
	function AccessLand_Theme(layer){
		accessLandLayer = layer; //map.getLayersByName("Access_Land")[0];
	}
	
	
	AccessLand_Theme.prototype.createDisplayCriteria = function(){
		$.ajax({
	        type: 'GET',
	        url: "theme/date",
	        dataType: "text",
	        async: false,
	        success: function (data) {
	            current_date = data;
	        }
	    });

		var filter1 = new OpenLayers.Filter.Comparison({
	        type: OpenLayers.Filter.Comparison.EQUAL_TO,
	        property: 'ishistory',
	        value: 'false'
	    });
		
		var filter2 = new OpenLayers.Filter.Comparison({
	        type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
	        property: 'agreement_end_date',
	        value: current_date
	    });
		
		var filter3 = new OpenLayers.Filter.Comparison({
	        type: OpenLayers.Filter.Comparison.IS_NULL,
	        property: 'agreement_end_date'
	    });
		
		filter2 = new OpenLayers.Filter.Logical({
     	    type: OpenLayers.Filter.Logical.OR,
    	    filters:[filter2, filter3]
    	});
		
		ap_filter = new OpenLayers.Filter.Logical({
     	    type: OpenLayers.Filter.Logical.AND,
    	    filters:[filter1, filter2]
    	});
		
		return ap_filter;
	}
	
	AccessLand_Theme.prototype.applySLD = function(ap_filter){
		var symbolizer = {Polygon: style['Polygon']};
		var sld_rules = [];
		var sld = {
		        version: "1.0.0",
		        namedLayers: {}
		    };
		
		var layerName = layerMap[accessLandLayer.name];
	    sld.namedLayers[layerName] = {
			        name: layerName,
			        userStyles: []
			      };
	    
	    var rule = new OpenLayers.Rule({
	        title: "Access Land Polygon",
	        symbolizer: apSymbolizer,
	        filter: ap_filter
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
	            access_land_sld = sld_result;
	            
	            var layerOptions = null;
	            layerOptions = OpenLayers.Util.applyDefaults(layerOptions, {
	                displayInLayerSwitcher: false,
	                tileOptions: {
	                    maxGetUrlLength: 2048
	                }
	            });

	            //var layer = activeLayer; //OpenLayers.Map.activelayer;
	            //var clonedLayer = layer.clone();
	            //clonedLayer.setName("clone");
	           // map.addLayers([clonedLayer]);
	            accessLandLayer.mergeNewParams({
	                SLD: sld_result
	            });
	            accessLandLayer.redraw(true);
	        },
	        error: function (xhr, status) {
	            jAlert('Sorry, there is a problem!');
	        }
	    });
	}