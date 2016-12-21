var complaintLayer;
var complainantid;

var cptSymbolizer = {
	    'Point': {externalGraphic: 'http://localhost:8080/complaint.png', pointRadius: 12}
	};
	function PublicComplaints(layer){
		complaintLayer = layer; //map.getLayersByName("Access_Land")[0];
	}
	
	
	PublicComplaints.prototype.getComplainantid = function(){
		return complainantid;
	}
	
	PublicComplaints.prototype.createDisplayCriteria = function(){
		var cptfilter;
		
		$.ajax({ 
			async:false,
			type: "POST",
			url: STUDIO_URL + "publicuser/email/?" + token,
			data: {email:user},								
			success: function (userdetail) {	
				complainantid = userdetail.complainantid;
				
				var cptfilter1 = new OpenLayers.Filter.Comparison({
			        type: OpenLayers.Filter.Comparison.EQUAL_TO,
			        property: 'resolve_status',
			        value: 'false'
			    });
				
				var cptfilter2 = new OpenLayers.Filter.Comparison({
			        type: OpenLayers.Filter.Comparison.EQUAL_TO,
			        property: 'complainantid',
			        value: complainantid
			    });
				
				cptfilter = new OpenLayers.Filter.Logical({
		     	    type: OpenLayers.Filter.Logical.AND,
		    	    filters:[cptfilter1, cptfilter2]
		    	});
				
			}
		});
		return cptfilter;
		
	}
	
	PublicComplaints.prototype.applySLD = function(cptfilter){
		var symbolizer = {Point: style['Point']};
		var sld_rules = [];
		var sld = {
		        version: "1.0.0",
		        namedLayers: {}
		    };
		
		var layerName = layerMap[complaintLayer.name];
	    sld.namedLayers[layerName] = {
			        name: layerName,
			        userStyles: []
			      };
	    
	    var rule = new OpenLayers.Rule({
	        title: "Public Complaints",
	        symbolizer: cptSymbolizer,
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
	            complaint_sld = sld_result;
	            
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
	            complaintLayer.mergeNewParams({
	                SLD: sld_result
	            });
	            complaintLayer.redraw(true);
	        },
	        error: function (xhr, status) {
	            jAlert('Sorry, there is a problem!');
	        }
	    });
	}