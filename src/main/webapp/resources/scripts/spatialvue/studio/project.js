/* ----------------------------------------------------------------------
 * Copyright (c) 2011 by RMSI.
 * All Rights Reserved
 *
 * Permission to use this program and its related files is at the
 * discretion of RMSI Pvt Ltd.
 *
 * The licensee of RMSI Software agrees that:
 *    - Redistribution in whole or in part is not permitted.
 *    - Modification of source is not permitted.
 *    - Use of the source in whole or in part outside of RMSI is not
 *      permitted.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL RMSI OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * ----------------------------------------------------------------------
 */
var selectedItem=null;
var optVals = [];
function Project(_selectedItem)
{
	
	

	
	
	//jQuery("#tableGrid").empty();	
	selectedItem=_selectedItem;
	
	if( jQuery("#ProjectFormDiv").length<=0){
		
		displayRefreshedProject();
	
	}
	else{
		
		displayProject();
		
	}
}


function displayRefreshedProject(){
	jQuery.ajax({
		url: "project/" + "?" + token,
         success: function (data) {
        	jQuery("#projects").empty(); 	
			jQuery.get("resources/templates/studio/" + selectedItem + ".html", function (template) {
		    			    	
		    	jQuery("#projects").append(template);
		    	jQuery('#ProjectFormDiv').css("visibility", "visible");
		    	
		    	jQuery("#projectDetails").hide();	        	
	        	jQuery("#ProjectsRowData").empty();
	        	jQuery("#projectTable").show();	        		        	
	        	jQuery("#project_accordion").hide();		    	
		    	
		    	jQuery("#ProjectTemplate").tmpl(data).appendTo("#ProjectsRowData");
		    	 		    	
		    	jQuery("#project_btnSave").hide();
		    	jQuery("#project_btnBack").hide();
		    	jQuery("#project_btnNew").show();
				
				
		    	
		      	//$("#project_txtSearch").trigger("keyup");
                $("#projectTable").tablesorter({ 
                		headers: {5: {sorter: false  },  6: {  sorter: false } },	
                		debug: false, sortList: [[0, 0]], widgets: ['zebra'] })
                       .tablesorterPager({ container: $("#project_pagerDiv"), positionFixed: false })
                       .tablesorterFilter({ filterContainer: $("#project_txtSearch"),                           
                           filterColumns: [0],
                           filterCaseSensitive: false,
                           filterWaitTime:1000 
                       });
		    	
			
			});
    
         }
	 });
	
}

function displayProject(){
	
	jQuery("#project_accordion").hide();
	jQuery("#projectTable").show();
	
	jQuery("#project_btnSave").hide();
	jQuery("#project_btnBack").hide();
	jQuery("#project_btnNew").show();
	
}


var proj_units = null;
var proj_projections = null;
var proj_formats = null;
var proj_editData = null;
var proj_layerTypes = null;
var proj_layerGroup = null;
var sortedLyrGroup = null;
var proj_users = null;
var proj_baselayer=null;

var createEditProject = function (_name) {
     
	
	var projurl=window.location.protocol+'//'+window.location.host+'/'+'spatialvue-viewer/?project='+_name+'&_token=';
	
	optVals = [];
    jQuery("#project_btnNew").hide();    
    jQuery("#project_btnSave").hide();
    jQuery("#project_btnBack").hide();
    //jQuery("#project_pagerDiv").hide();
    //jQuery("#searchDiv").hide();
    
    //jQuery("#projectTable").empty();
    jQuery("#projectTable").hide();
    jQuery("#projectDetails").show();    
    jQuery("#projectGeneralBody").empty();
    jQuery("#projectLayergroupBody").empty();
	jQuery("#projectBaselayerBody").empty();
	
    jQuery("#projectDisclaimerBody").empty();
    jQuery("#projectUserList").empty(); 
	
    /*APARESH
	jQuery("#layerGroupList").empty();
    */
	
	

    jQuery.ajax({
        url: "unit/" + "?" + token,
        success: function (data) {
        	proj_units = data;
        },
        async: false
    });

   jQuery.ajax({
        url: "layergroup/" + "?" + token,
        success: function (lgdata) {
        	proj_layerGroup = lgdata;			
			
			
        },
        async: false
    });
	
	jQuery.ajax({
        url: "baselayer/" + "?" + token,
        success: function (bldata) {
        	proj_baselayer = bldata;
			
			
        },
        async: false
    });
	
	

    jQuery.ajax({
        url: "projection/" + "?" + token,
        success: function (data) {
        	proj_projections = data;
        },
        async: false
    });
    jQuery.ajax({
        url: "outputformat/" + "?" + token,
        success: function (data) {
        	proj_formats = data;
        },
        async: false
    });

    jQuery.ajax({
        url: "user/" + "?" + token,
        success: function (userdata) {
        	proj_users = userdata;        	                
        	
        },
        async: false
    });
	
	
	
	
    if (_name) {

    	  	
    	
    	jQuery.ajax({
            url: selectedItem+"/" + _name + "?" + token,
            async:false,
            success: function (data) {
            	sortedLyrGroup = new Array(proj_layerGroup.length);
				selectedLyrGroups = data.projectLayergroups;
				var _i;
				for(_i=0; _i<selectedLyrGroups.length; _i++){
					for(_j=0; _j<proj_layerGroup.length; _j++){
						if(selectedLyrGroups[_i].layergroups.name == proj_layerGroup[_j].name){
							sortedLyrGroup[_i] = proj_layerGroup[_j];
							proj_layerGroup.splice(_j, 1);
							break;
						}
					}
				}
    	
    			for(_k=0; _k<proj_layerGroup.length; _k++, _i++){
    				sortedLyrGroup[_i] = proj_layerGroup[_k];
    			}
				
                jQuery("#ProjectTemplateForm").tmpl(data,

                            {
                	
                            }

                         ).appendTo("#projectGeneralBody");
                
                jQuery("#ProjectTemplateLayergroup").tmpl(data,

                        {
            	
                        }

                 ).appendTo("#projectLayergroupBody");
                
                jQuery("#ProjectTemplateDisclaimer").tmpl(data,

                        {
            	
                        }

                 ).appendTo("#projectDisclaimerBody");
					 
				jQuery("#projectLayergroupBody").empty();
				 
				
				jQuery("#ProjectTemplateLayergroup").tmpl(sortedLyrGroup,

                    {
        				
                    }

					).appendTo("#projectLayergroupBody");	 
            	
				jQuery("#projectBaselayerBody").empty();
				jQuery("#ProjectTemplateBaselayer").tmpl(sortedLyrGroup,

                    {
        				
                    }

                 ).appendTo("#projectBaselayerBody");
				
				
				jQuery("#projectUserList").empty();
				
				
				
				jQuery("#ProjectTemplateUser").tmpl(proj_users,

                    {
        				projecturl: projurl
                    }

                 ).appendTo("#projectUserList");
        	
				
				
                jQuery('#name').attr('readonly', true);
                
                
                jQuery.each(proj_units, function (i, value) {    	
                	jQuery("#project_unit").append(jQuery("<option></option>").attr("value", value.name).text(value.description));        
                });
                
                jQuery.each(proj_formats, function (i, value) {    	
                	jQuery("#project_outputFormat").append(jQuery("<option></option>").attr("value", value.name).text(value.name));        
                });
                
               
			   $('[class^="tr-"]').hide();
			   
			   /*APARESH 
                jQuery.each(proj_layerGroup, function (i, value) {    	
                	jQuery("#layerGroupList").append(jQuery("<option></option>").attr("value", value.name).text(value.name));        
                });
                */
                
                
                //set DD value
                jQuery("#project_unit").val(data.unit.name);
                jQuery("#project_outputFormat").val(data.outputformat.name);
                               
                if (data.disclaimer != null  &&  data.disclaimer != "") {
                    jQuery("#chkDisclaimer").attr('checked', true);
                    jQuery('#Disclaimer').css("visibility", "visible");
                    jQuery('#Disclaimer').val(data.disclaimer);
                }
                else {
                    jQuery("#chkDisclaimer").attr('checked', false);
                    jQuery('#Disclaimer').val("");
                    jQuery('#Disclaimer').css("visibility", "hidden");
                }

              //set layergroup list value
                /*APARESH
				var layergrouporder={};
                
                jQuery.each(data.projectLayergroups, function (i, layergroupList) {      
                	layergrouporder[layergroupList.grouporder]=layergroupList.layergroups.name;                	                	
                });
                
                for(var i=1; i<=data.projectLayergroups.length;i++){
                	
                	jQuery("#addedLayerGroupList").append(jQuery("<option></option>").attr("value", layergrouporder[i]).text(layergrouporder[i]));                        
                    jQuery("#layerGroupList option[value=" + layergrouporder[i] + "]").remove();
                	
                }
                */
                
				
				jQuery.each(data.projectLayergroups, function (i, layergroupList) {                                            
						
						jQuery("#"+layergroupList.layergroups.name).attr('checked', true);
						
                });
				
				
				
				
				jQuery.each(data.projectBaselayers, function (i, baselayersList) {                                            
						
						//jQuery("#"+baselayersList.baselayers.name).attr('checked', true);
						$("input[id='"+layergroupList.layergroups.name+"']").attr('checked', true);  
						
                });
				
				if(data.projectBaselayers.length>0){
					if(data.projectBaselayers[0].baselayers.name.indexOf("Google_") > -1){
						populatebaselayer('Google',data);
					
					}
					else if(data.projectBaselayers[0].baselayers.name.indexOf("Bing") > -1){
					populatebaselayer('Bing',data);
					}		
					else if(data.projectBaselayers[0].baselayers.name.indexOf("Open_") > -1){
					populatebaselayer('Open',data);
					}
					else if(data.projectBaselayers[0].baselayers.name.indexOf("MapQuest") > -1){
					populatebaselayer('MapQuest',data);
					}
				}
				else{
				
				populatebaselayer('Google','');
				
				}
                /*jQuery.each(data.projectLayergroups, function (i, layergroupList) {                    
                        jQuery('#addedLayerGroupList').append(jQuery("<option></option>").attr("value", layergroupList.layergroups.name).text(layergroupList.layergroups.name));
                        jQuery("#layerGroupList option[value=" + layergroupList.layergroups.name + "]").remove();
                });*/
                
    		
                    
                
                GetActiveLayer('default','');

                    jQuery('#activelayer').val(data.activelayer);
                    jQuery('#overlaymap').val(data.overlaymap);
              
                    
                  jQuery.ajax({
                    url: selectedItem+"/" + _name+"/user" + "?" + token,
                    async:false,
                    success: function (users) {
                    	jQuery.each(users, function (i, value) {    	
                    		//jQuery('#'+value).attr('checked', true);
                    		$("input[id='"+value+"']").attr('checked', true);
							jQuery(".tr-"+value).show();
                    	});
                    	
                    }
            	}); 
                 
				//$("#lyrgrouptbl tr:odd").addClass('alt-tr'); 
				//$("#baselyrtbl tr:odd").addClass('alt-tr');

            },
            cache: false
        });
    } else {

        jQuery("#ProjectTemplateForm").tmpl(null,

                {        	
                    
                }
            ).appendTo("#projectGeneralBody");
        
        jQuery("#ProjectTemplateLayergroup").tmpl(null,

                {
    	
                }

             ).appendTo("#projectLayergroupBody");
        
        jQuery("#ProjectTemplateDisclaimer").tmpl(null,

                {
    	
                }

             ).appendTo("#projectDisclaimerBody");
			 
			 
		jQuery("#projectLayergroupBody").empty();		
		jQuery("#ProjectTemplateLayergroup").tmpl(sortedLyrGroup,

			{
				
			}

		).appendTo("#projectLayergroupBody");	 
		
		jQuery("#projectBaselayerBody").empty();
		jQuery("#ProjectTemplateBaselayer").tmpl(proj_baselayer,

			{
				
			}
		
		 ).appendTo("#projectBaselayerBody");
		
		//hide all base layer
		
		jQuery("#projectBaselayerBody tr").hide();
		//$("#lyr_type").attr('selectedIndex', 2);
		$("#lyr_type").val('Google');
		populatebaselayer('Google');
		
		jQuery("#projectUserList").empty();
		
		jQuery("#ProjectTemplateUser").tmpl(proj_users,

			{
				//roles: user_roleList
			}

		 ).appendTo("#projectUserList");	 
			 
        
        jQuery('#name').removeAttr('readonly');
        jQuery('#numzoomlevels').val(18);
       
        
        jQuery.each(proj_units, function (i, value) {    	
        	jQuery("#project_unit").append(jQuery("<option></option>").attr("value", value.name).text(value.description));        
        });
        
        jQuery.each(proj_formats, function (i, value) {    	
        	jQuery("#project_outputFormat").append(jQuery("<option></option>").attr("value", value.name).text(value.name));        
        });
        
       /*APARESH
        jQuery.each(proj_layerGroup, function (i, value) {    	
        	jQuery("#layerGroupList").append(jQuery("<option></option>").attr("value", value.name).text(value.name));        
        });
        */
        
    }
    
	
	
	
    jQuery("#project_accordion").show();  
	jQuery("#project_accordion").accordion({fillSpace: true});
    
    jQuery("#project_btnSave").show();
    jQuery("#project_btnBack").show();

} 

function changeActiveValue(_this) {
    if (_this.checked) {

        jQuery('#active').val("true");
    }
    else {

        jQuery('#active').val("false");
    }

}


function changeCosmeticValue(_this) {
    if (_this.checked) {

        jQuery('#cosmetic').val("true");
    }
    else {

        jQuery('#cosmetic').val("false");
    }

}

function toggleDisclaimer(_this) {

    if (_this.checked) {

        jQuery('#Disclaimer').css("visibility", "visible");
    }
    else {
        // jQuery('#Disclaimer').val("");
        jQuery('#Disclaimer').css("visibility", "hidden");
    }
}


function populateActivelayer(_this){

	if(_this.checked){
	
		GetActiveLayer('add',_this.value);
	
	}
	else
	{
		GetActiveLayer('remove',_this.value);
	}

}



function GetActiveLayer(type,selectedGroup) {
	if(type=='add' || type=='remove'){
	
		jQuery.ajax({
				url: "layergroup/" + selectedGroup + "?" + token,
				async: false,
				success: function (data) {            	
					
						for (var j = 0; j < data[0].layers.length; j++) {                        
							
							if (type == 'add') {
								if(!isTilecache(data[0].layers[j].layer)){								
									jQuery('#activelayer').append(jQuery("<option></option>").attr("value", data[0].layers[j].layer).text(data[0].layers[j].layer));									
								}
								jQuery('#overlaymap').append(jQuery("<option></option>").attr("value", data[0].layers[j].layer).text(data[0].layers[j].layer));                          
								
							}
							
							else if (type == 'remove') {
								jQuery("#activelayer option[value="+data[0].layers[j].layer+"]").remove();
								jQuery("#overlaymap option[value="+data[0].layers[j].layer+"]").remove();
								
							}
							
							}
						}
			   
					
			   
			});
		
	}
	else if(type=='default'){
		jQuery('#activelayer').empty();
		jQuery('#overlaymap').empty();

		jQuery('#activelayer').append(jQuery("<option></option>").attr("value", '').text('Please Select'));
		jQuery('#overlaymap').append(jQuery("<option></option>").attr("value", '').text('Please Select'));
		
		$('#projectLayergroupBody input[type="checkbox"]:checked').each(function() { 
			var lyrGrp=$(this).val();
			
			jQuery.ajax({
			url: "layergroup/" + lyrGrp + "?" + token,
			async: false,
			success: function (data) {            	
				
					for (var j = 0; j < data[0].layers.length; j++) {                        
					
							if(!isTilecache(data[0].layers[j].layer)){
								jQuery('#activelayer').append(jQuery("<option></option>").attr("value", data[0].layers[j].layer).text(data[0].layers[j].layer));								                          
							}
							jQuery('#overlaymap').append(jQuery("<option></option>").attr("value", data[0].layers[j].layer).text(data[0].layers[j].layer));
						
						}
					}
		  
			});

	
		});
		
	}
    /*
	
	if (type == 'add') {
     
        optVals.push(selectedGroup);
    }
    else if (type == 'remove') {
        
		optVals.pop(selectedGroup);
    }
    else {
        
		$('#projectLayergroupBody input[type="checkbox"]:checked').each(function() { 
        alert($(this).val());
		optVals.push($(this).val());
		
		});

		
    }
    
    jQuery('#activelayer').empty();
    jQuery('#overlaymap').empty();
    
    jQuery('#activelayer').append(jQuery("<option></option>").attr("value", '').text('Please Select'));
    jQuery('#overlaymap').append(jQuery("<option></option>").attr("value", '').text('Please Select'));

    for (var i = 0; i < optVals.length; i++) {
        var lyrGrp = optVals[i];
        jQuery.ajax({
            url: "layergroup/" + lyrGrp,
            async: false,
            success: function (data) {
            	
            	
                    	for (var j = 0; j < data[0].layers.length; j++) {                        
							jQuery('#activelayer').append(jQuery("<option></option>").attr("value", data[0].layers[j].layer).text(data[0].layers[j].layer));
							jQuery('#overlaymap').append(jQuery("<option></option>").attr("value", data[0].layers[j].layer).text(data[0].layers[j].layer));

                           
                        }
                    }
           
            	
           
        });
    }
	*/
}




var saveProjectData= function () {
	
	jQuery.ajax({
        type: "POST",              
        url: "project/create" + "?" + token+"&emailid="+useremail,
        data: jQuery("#projectForm").serialize(),
        success: function () {        
                                   
            jAlert('Data Successfully Saved', 'Project');
           //back to the list page 
           
            displayRefreshedProject();
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
            alert('err.Message');
        }
    });
	
}

////////////////////////////
var saveProject= function () {

 $("#projectForm").validate({

	rules: {
	    "name": "required",
	    "activelayer": "required",
	    "projection.code": "required",
	    "unit.name": "required",
	    "maxextent": "required",
	    "minextent": "required",
	    "restrictedextent": "required",
	    "numzoomlevels": {
	        required: true,
	        digits: true
	    },
	    "displayProjection.code": "required",
	    "outputFormat.name": "required",
	    //"copyright": "required",
	    //"watermask": "required",
	    "overlaymap":"required"
	
	},
	messages: {
	
	    "name": "Please Enter Name",
	                    	    
	    "projection.code": "Please enter  Projection ",
	    "unit.name": "Please Select  Unit ",
	    
	    "maxextent": "Please Enter  MaxExtent",
	    "minextent": "Please Enter  MinExtent",
	    "restrictedextent": "Please Enter  RestrictedExtent ",
	    "numzoomlevels": {
	        required: "Please Enter NumZoomLevels",
	        digits:   "Please Enter a valid number.  "
	    },
	    "displayProjection.code": "Please Enter  DisplayProjection  ",
	    "outputFormat.name": "Please Enter  OutputFormat  ",
	    //"copyright": "Please Enter  CopyRight ",
	    //"watermask": "Please Enter  WaterMask ",
	
	    "activelayer": "Please Select Active Layer",
	    "overlaymap": "Please Select Overview Layer"    
	
	}
	
	});

 if ($("#projectForm").valid()) {

	 	if (jQuery('#active').val()=="") {

		 jQuery('#active').val("false");
	    }

	   if (jQuery('#cosmetic').val()=="") {

		   jQuery('#cosmetic').val("false");
	    }
	 
	 
	 
	 /*APARESH
	 $("#addedLayerGroupList option").attr("selected", "selected");
	*/
	
   if ($("#chkDisclaimer").attr('checked')) {
        if(!$('#Disclaimer').val()){
			jAlert('Enter Disclaimer ', 'Project');
			return;
		}
    }   
	   
	if (!jQuery("#chkDisclaimer").attr('checked')) {
	    $('#Disclaimer').val("");
	}
	/*APARESH
	if (jQuery('#addedLayerGroupList option').size() > 0) {
		jQuery("#addedLayerGroupList option").attr("selected", "selected");
		saveProjectData();
	}
	else {	    
	    jAlert('Add atleast one Layer Group', 'Project');
	    return;
	}
	*/
	
	if($('.userCheckbox').filter(":checked").length>0){
		saveProjectData();
	}
	else{
	
	jAlert('Select atleast one user Form Assign user section ', 'Project');
	
	}
 }
	
}


//////////Delete Record/////////////////



var deleteProject= function (_projectName) {
	
	jConfirm('Are You Sure You Want To Delete : <strong>' + _projectName + '</strong>', 'Delete Confirmation', function (response) {

        if (response) {
        	jQuery.ajax({          
                url: "project/delete/"+_projectName + "?" + token,
                success: function () { 
                	
                	jAlert('Data Successfully Deleted', 'Project');
                   //back to the list page 
                	displayRefreshedProject();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    
                    alert('err.Message');
                }
            });
        }

    });
	
}

/////////////////////////

/*APARESH
jQuery(function () {

jQuery("#addLayerGroup").live('click', function () {
    
	jQuery("#layerGroupList  option:selected").appendTo("#addedLayerGroupList");
});

jQuery("#removeLayerGroup").live('click', function () {
    jQuery("#addedLayerGroupList option:selected").appendTo("#layerGroupList");
});


jQuery("#upLayerGroup").live('click', function () {
    jQuery('#addedLayerGroupList option:selected').each(function () {
        var newPos = jQuery('#addedLayerGroupList option').index(this) - 1;
        if (newPos > -1) {
            jQuery('#addedLayerGroupList option').eq(newPos).before("<option value='" + jQuery(this).val() + "' selected='selected'>" + jQuery(this).text() + "</option>");
            jQuery(this).remove();
        }
    });
});


jQuery("#downLayerGroup").live('click', function () {
    var countOptions = jQuery('#addedLayerGroupList option').size();
    jQuery('#addedLayerGroupList option:selected').each(function () {
        var newPos = jQuery('#addedLayerGroupList option').index(this) + 1;
        if (newPos < countOptions) {
            jQuery('#addedLayerGroupList option').eq(newPos).after("<option value='" + jQuery(this).val() + "' selected='selected'>" + jQuery(this).text() + "</option>");
            jQuery(this).remove();
        }
    });
});


});

*/

function isTilecache(layeralias){
var response=false;
jQuery.ajax({
            url: "layer/" + layeralias+ "?" + token,
            async:false,
            success: function (layer) {
			
				if(layer.layertype.name=='Tilecache')
				{
					response=true;
				}
				else{
					response=false;
				}
			
			}
			});
			return response;

}


jQuery(function () {

$(".lgup,.lgdown").live('click',function(){
        var row = $(this).parents("tr:first");
        if ($(this).is(".lgup")) {
            row.insertBefore(row.prev());
        } else {
            row.insertAfter(row.next());
        }
    });
	
	
	
	
});


function populatebaselayer(_type){

	jQuery("#lyr_type").val(_type);
	if(_type=='Google'){
	//uncheck bing
	jQuery('input[id^="Bing_"]').attr('checked', false);
	jQuery('input[id^="Open_"]').attr('checked', false);
	jQuery('input[id^="MapQuest"]').attr('checked', false);

	}
	else if(_type=='Bing'){
	//uncheck google
	jQuery('input[id^="Google_"]').attr('checked', false);
	jQuery('input[id^="Open_"]').attr('checked', false);
	jQuery('input[id^="MapQuest"]').attr('checked', false);
	}
	else if(_type=='Open'){
	
	jQuery('input[id^="Google_"]').attr('checked', false);
	jQuery('input[id^="Bing_"]').attr('checked', false);
	jQuery('input[id^="MapQuest"]').attr('checked', false);
	}
	else if(_type=='MapQuest'){
	
	jQuery('input[id^="Google_"]').attr('checked', false);
	jQuery('input[id^="Bing_"]').attr('checked', false);
	jQuery('input[id^="Open_"]').attr('checked', false);
	}
	
	jQuery("#projectBaselayerBody tr").hide();

	jQuery('tr[id^=tr-'+_type+'_]').show();


}	

function toggleUserChecked(status) {
	$(".userCheckbox").each( function() {
	$(this).attr("checked",status);		
	})
	
	if(status){
		$('[class^="tr-"]').show();
	}
	else{
		$('[class^="tr-"]').hide();
	}
}

function manageProjLink(_this){
	
	if(_this.checked==true){
		jQuery('.tr-'+_this.value).show();
	}
	else{
		jQuery('.tr-'+_this.value).hide();
	}

}