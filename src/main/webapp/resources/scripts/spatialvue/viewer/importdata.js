function ImportData(id) {
				//add layer name
				/*var layerdata=null;
				jQuery.ajax({
				  	type: "GET",              
					url: STUDIO_URL + "layer/",     
					async:false,
					success: function (data) {
						layerdata=data;
										
					}
				});*/
	var layerdata=null;
	jQuery.ajax({
	  	type: "GET",       
		url: STUDIO_URL + "import/layer/",     
		async:false,
		success: function (data) {
			layerdata=data;
							
		}
	});
				
	jQuery.get('resources/templates/viewer/' + id + '.html',function(template) {
				
				/*jQuery("#layername").empty();
				jQuery.each(layerdata, function (i, _layer) {    	
					jQuery("#layername").append(jQuery("<option></option>").attr("value", _layer.name).text(_layer.displayname));        
				 });
				
				
				$('<input type="hidden" name="ajaxUpload" value="true" />').insertAfter($("#file"));
	            $("#tabfileuploadForm").attr("action", "tabfileupload?" + token);
	            
	            $("#tabfileuploadForm").ajaxForm({
	                success: function (
	                filepath_name) {

	                    if (filepath_name.indexOf("HTTP Status 500") != -1) {
	                    	
	                     
	                    } else {
	                    	if(filepath_name){
	                    		jAlert('Data Successfully updated');
	                    	}else{
	                    		jAlert('Please try again');
	                    	}

	                    }

	                },
	                error: function (
	                xhr, status) {
	                    jAlert('File size is greater than permissible limit');
	                }
	            });
*/
	            
		
		 jQuery.get('tabfileupload', function (template1) {

	            $("#divUploadTABFile").append(template1);
			 //addListingTab('Import Data','tab-issuelink',template1);
	            
	            jQuery("#layername").empty();
				jQuery.each(layerdata, function (i, _layer) {    	
					jQuery("#layername").append(jQuery("<option></option>").attr("value", _layer.name).text($._(_layer.alias)));        
				 });
				$('#lbl_selectFile').html($._('import_select_file')+' : ');
				$('#lbl_selectLayer').html($._('import_select_layer')+' : ');					           
				$('#btnupload').val($._('btn_lbl_upload'));
	            
	            $('<input type="hidden" name="ajaxUpload" value="true" />').insertAfter($("#file"));
	            $("#tabfileuploadForm").attr("action", "tabfileupload?" + token);
	          
	            
	            $("#tabfileuploadForm").ajaxForm({
	                success: function (
	                filepath_name) {

	                	 if (filepath_name.indexOf("HTTP Status 500") != -1) {
	                		 
		                     
		                  } else {
		                	  if(filepath_name.indexOf("Data uploaded successfully") != -1){
		                		  jAlert(filepath_name);
		                		  jQuery("#viewTablog").hide();
		          				  jQuery("#viewJoblog").hide();
		                	  }else{
		                		  jQuery("#viewTablog").show();
		                		  jAlert(filepath_name+" for detail view log file."); 
		                	  }
		                   }
	                },
	                error: function (
	                xhr, status) {
	                	jAlert("Please check tab file size.");
	                }
	            }); // ajaxForm

	        });
	           		 
		 jQuery.get('gpsfileupload', function (gpstemplate) {

	            $("#divUploadGPSFile").append(gpstemplate);
	            $('#lbl_selectGpsFile').html($._('import_select_gpsfile')+' : ');	
	            $('#btngpsupload').val($._('btn_lbl_upload'));
	            
	            $('<input type="hidden" name="ajaxUpload" value="true" />').insertAfter($("#gpsfile"));
	            $("#gpsfileuploadForm").attr("action", "gpsfileupload?" + token);
	            
	          
	            
	            $("#gpsfileuploadForm").ajaxForm({
	                success: function (
	                filepath_name) {

	                	 if (filepath_name.indexOf("HTTP Status 500") != -1) {
	                		 
		                     
		                    }else if(filepath_name.indexOf("Probleam on uploading data.") != -1){
		                		 jQuery("#viewJoblog").show();
		                		  jAlert(filepath_name+" for detail view log file."); 
		                	  } else {
		                    	jAlert(filepath_name);
		                    	jQuery("#viewTablog").hide();
		        				jQuery("#viewJoblog").hide();
		                	  }
	                },
	                error: function (
	                xhr, status) {
	                	jAlert("Please check JOB file size.");
	                }
	            }); // ajaxForm

	        });
	            
		 		addListingTab($._('toolbar_title_importdata'),'tab-importdata',template);
				//jQuery("#importdatas").empty();
				//jQuery("#importdatas").append(template);
				jQuery("#viewTablog").hide();
				jQuery("#viewJoblog").hide();
				jQuery("#uploaddataDiv_accordion").accordion({fillSpace : true});
				
				$('#import_tabdata').html($._('import_tabdata'));
				$('#import_gpsdata').html($._('import_gpsdata'));
				
				
		});
}
