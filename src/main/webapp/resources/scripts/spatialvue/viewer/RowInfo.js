/* ----------------------------------------------------------------------
\ * Copyright (c) 2011 by RMSI.
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

var map;
var size;
var offset;
var icon;
var objMarker=null;
var markers;
var _pathtype=null;
var _pathlegalstatus=null;
var _pathwarden_area=null;
var _pathclassLkp=null;
var _pathdeptLkp=null;
var _pathcommunitylist=null;
var _pathcondition=null;
var pathID=null;
var patheSurveyor=null;
var _geomFeature;
var path_contacts=null;
var currentRowPath=null;
var pathattributedata={};
//added for new path
var isediting;
var savetype='NEW'
var path_wfs=null;
SpatialVue.RowInfo =  function(_map, _searchdiv,masterdetails,geomFeature,newGid) {
	
	isediting=false;
	savetype='NEW';
	_geomFeature=geomFeature;
	_saveStrategy = null;
	map = _map;
    var _gid=null;
	if(newGid!=undefined){
		_gid=newGid;
	}
	else{
		_gid=masterdetails.gid;
	}
	
    //var _rowid=  masterdetails.row_id;
    pathID=_gid;
        
    searchdiv = _searchdiv;
    showResultsinDialog = true;
    var _layer=layer;
    var _associationIds=associationIds;
    
   

    
    	jQuery.ajax({
    	       async:false,
    	    	type: "GET",              
    	        url: STUDIO_URL + "rowpath/"+_gid,        		               
    	        success: function (data) {
    	        	data.agreementEndDate = convertDateToEuropeanFormat(data.agreementEndDate);
    	        	data.dateofnextsurvey = convertDateToEuropeanFormat(data.dateofnextsurvey);
    	        	data.lastsurvey = convertDateToEuropeanFormat(data.lastsurvey);
    	        	
    	        	//calculting path unresolvedissue and condition
    	        	/*var unResolvedIssue=null;
    	       		 jQuery.ajax({
    	       		       async:false,
    	       		    	type: "GET",              
    	       		        url: STUDIO_URL + "path/unresolvedissue/condition/"+data.rowId,        		               
    	       		        success: function (data) {
    	       		        	unResolvedIssue=data
    	       		        }
    	       		    });
    	       		var pathConditionAndIssueCount=unResolvedIssue.split(",");*/
    	        	var pathConditionAndIssueCount=getPathConditionIssueCount(data.rowId);
    	       		//setting path condition 
    	       		if(data.pathConditionLkp){
    	       			data.pathConditionLkp.conditionid=pathConditionAndIssueCount[1];
    	       		}
    	       		//setting path unresolvedIssues count 
    	       		data.unresolvedIssues=pathConditionAndIssueCount[0];
    	        	currentRowPath=data;
    	        	_masterdetails=data;
    	        	path_contacts=data.contacts;
					
					if (path_contacts.length > 0) {
						jQuery.each(path_contacts, function (i, ctype) {    	
						
						path_contacts[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
						});
					}
					
					
    	        	
    	        }
    	    });
   
    	if(_pathtype==null){
    		 jQuery.ajax({
    		       async:false,
    		    	type: "GET",              
    		        url: STUDIO_URL + "path/type",        		               
    		        success: function (data) {
    		        	_pathtype=data
    		        	
    		        }
    		    });
    	}
	  
	   
    	if(_pathcommunitylist==null){
    		 jQuery.ajax({
    		       async:false,
    		    	type: "GET",              
    		        url: STUDIO_URL + "path/community",        		               
    		        success: function (data) {
    		        	_pathcommunitylist=data
    		        	
    		        }
    		    });
    	}
	  
    	if(_pathclassLkp==null){
    		 jQuery.ajax({
    		       async:false,
    		    	type: "GET",              
    		        url: STUDIO_URL + "path/classLkp/",        		               
    		        success: function (data) {
    		        	_pathclassLkp=data
    		        	
    		        }
    		    });
    	}
	  
	   
    	if(_pathwarden_area==null){
    		jQuery.ajax({
    		       async:false,
    		    	type: "GET",              
    		        url: STUDIO_URL + "path/warden_area/",        		               
    		        success: function (data) {
    		        	_pathwarden_area=data
    		        	
    		        }
    		    });
    	}
		
		
	   
    	if(_pathdeptLkp==null){
    		jQuery.ajax({
    		       async:false,
    		    	type: "GET",              
    		        url: STUDIO_URL + "path/dept/",        		               
    		        success: function (data) {
    		        	_pathdeptLkp=data
    		        	
    		        }
    		    });
    	}
		
    	if(_pathcondition==null){
    		jQuery.ajax({
 		       async:false,
 		    	type: "GET",              
 		        url: STUDIO_URL + "path/condition",        		               
 		        success: function (data) {
 		        	_pathcondition=data
 		        	
 		        }
 		    });
    	}
		
		
    if(_pathlegalstatus==null){  
    	jQuery.ajax({
    	       async:false,
    	    	type: "GET",              
    	        url: STUDIO_URL + "path/legalstatus/",        		               
    	        success: function (data) {
    	        	_pathlegalstatus=data
    	        	
    	        }
    	    });	
    }
    
    //for surveyby and assigned by
   
    jQuery.ajax({
        async:false,
     	type: "GET",              
         url: STUDIO_URL + "furniture/surveyor",        		               
         success: function (data) {
        	 patheSurveyor=data
         	
         }
     });
   
	
	   
    searchdiv = _searchdiv;
    
	$("#tabs-Tool").empty();
		
    jQuery.get('resources/templates/viewer/rowinfo.html', function(template) {
		
		addTab($._('RoW_Path'),template);
		
		$('#span-close').attr('title',$._('close_title'));
		
		jQuery("#RowInfo_MasterDetailsBody").empty();
			jQuery("#RowInfo_MasterDetailsTmpl_line").tmpl(currentRowPath	
			).appendTo("#RowInfo_MasterDetailsBody");
	
    	$(function() {
	        $("#agreementEndDate").datepicker({ dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
		});
    	
    	$(function() {
	        $("#dateofnextsurvey").datepicker({ dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
		});
    	
    	jQuery("#path_promotedRoute").append(jQuery("<option></option>")
        		.attr("value", "false").text((lang=='en')?"No":"Na"));

        jQuery("#path_promotedRoute").append(jQuery("<option></option>")
        		.attr("value", "true").text((lang=='en')?"Yes":"Ydi"));
    	
    	/*$(function() {
	        $("#lastsurvey").datepicker({ dateFormat: 'yy-mm-dd'
	        	});
		});*/
    	  //for calculating next survey date
        $(function() {
		        $("#lastsurvey").datepicker({ dateFormat: 'dd/mm/yy',
		        	
		        	 onSelect: function(dateStr) {
		        		 if( $('#path_classLkp').val()!=''){
		        			 populateRowPathNextsurveyDate();
		        		 }
		        	       
		        	     }
		        ,
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
		        
			});
	    						
			 $("#path_classLkp").change(function(){
				if( $('#lastsurvey').val()!=''){
					populateRowPathNextsurveyDate();
      			}
			 });
    	//filling drop down
    	createDropDown();
		 
		 //set DD value
		  if(currentRowPath.pathTypeLkp!=null)
		  jQuery('#pathtype').val(currentRowPath.pathTypeLkp.pathTypeId);
		  
		  jQuery("#wardenArea").val(currentRowPath.wardenarea);
		  jQuery("#path_Community").val(currentRowPath.community);
		  
		  if(currentRowPath.classLkp!=null)
          jQuery("#path_classLkp").val(currentRowPath.classLkp.id);
		  
		  if(currentRowPath.responsibleDepartmentLkp!=null)
          jQuery("#responsibleDepartmentLkp").val(currentRowPath.responsibleDepartmentLkp.departmentid);
		  
		  if(currentRowPath.pathConditionLkp!=null)
          jQuery("#pathConditionLkp").val(currentRowPath.pathConditionLkp.conditionid);
		  
          if(currentRowPath.pathLegalstatusLkp!=null)
          jQuery("#pathLegalstatus").val(currentRowPath.pathLegalstatusLkp.legalstatusid);
          
          /********Inactive User************/
          if(currentRowPath.assignedTo!=null && currentRowPath.assignedTo!=""){
  			if(checkDropdowHasValue('assignedTo',currentRowPath.assignedTo)){
  				jQuery("#txtAssignedTo").hide();
  				jQuery("#assignedTo").show();
  				jQuery("#assignedTo").val(currentRowPath.assignedTo);
  			}
  			else
  			{
  			jQuery("#txtAssignedTo").val(getNameFromEMail(currentRowPath.assignedTo));
  			jQuery("#txtAssignedTo").show();
  			jQuery("#assignedTo").hide();
  			}
  		  }
          
          
            if(currentRowPath.surveyedBy!=null && currentRowPath.surveyedBy!=""){
               
  			  if(checkDropdowHasValue('surveyedBy',currentRowPath.surveyedBy)){
  				jQuery("#txtSurveyedBy").hide();
  				jQuery("#surveyedBy").show();
  				jQuery("#surveyedBy").val(currentRowPath.surveyedBy);
  			}
  			else
  			{
  			jQuery("#txtSurveyedBy").val(getNameFromEMail(currentRowPath.surveyedBy));
  			jQuery("#txtSurveyedBy").show();
  			jQuery("#surveyedBy").hide();
  			}
  			  
  			}
            /********end************/
          $("#path_promotedRoute").val(currentRowPath.promotedRoute.toString());
				       
		$("#rowInfo_line :input").attr("disabled", true);
		$("#btnCancelRoW_line").hide();
		$("#btnSaveRoW_line").hide();
		
		if(currentRowPath.isHistory){
			//$("#footerdiv").hide();
			$('.btn01').remove();
			$('.nxtPrevBTNHolder').remove();
			$("#btnUpdateRoW_line").hide();
		}
		else{
			//$("#footerdiv").show();
			$("#btnUpdateRoW_line").show();
		}
			
		
		$("#btnUpdateRoW_line").click(function () {
			
		//$("#btnUpdateRoW_line").live("click", function(){ 			
			
			if(currentRowPath.isHistory){
				jAlert('Selected record is historical feature. Please select valid Path.');
			}
			else{
				$("#rowInfo_line :input").removeAttr("disabled");
				
				jQuery("#txtAssignedTo").hide();
				jQuery("#assignedTo").show();
				jQuery("#txtSurveyedBy").hide();
				jQuery("#surveyedBy").show();
				
				$("#path_rowId").attr("disabled", true);
				$("#lengthKm").attr("disabled", true);
				$("#dateofnextsurvey").attr("disabled", true);
				$("#unresolvedIssues").attr("disabled", true);
				$("#pathConditionLkp").attr("disabled", true);
				$("#btnUpdateRoW_line").hide();
				$("#btnCancelRoW_line").show();
				$("#btnSaveRoW_line").show();
				//check for Warden(Head Warden,Seasonal Warden,Area Wardens) i.e. role(8,10,9)
				var isWarden=isSuperUserRole = checkRole(WARDEN_ROLEID, loggedUser.functionalRole);
				if(isWarden){
					$("#path_Community").attr("disabled", true);
					$("#pathtype").attr("disabled", true);
					$("#wardenArea").attr("disabled", true);
					$("#pathLegalstatus").attr("disabled", true);
				}
			}
			
		});
		
		
		//cancel
		$("#btnCancelRoW_line").click(function () {
		//$("#btnCancelRoW_line").live("click", function(){ 			
			var path = new SpatialVue.RowInfo(map, "sidebar",currentRowPath,_geomFeature);
						
		});
		
		$("#furnitureForm").hide();
		$("#issueForm").hide();
		$("#surfaceForm").hide();
		$("#legalIssueForm").hide();
		
		translateRowInfoLabels();	
});
}

function translateRowInfoLabels(){
	$('#path_pid').html($._('row_id') + ':');
	$('#path_type_pid').html($._('type') + ':');
	$('#path_promo_route').html($._('Promoted_Route')  + ':');
	$('#path_community').html($._('community')  + ':');
	$('#path_class').html($._('_class')  + ':');
	$('#path_length').html($._('measure_length')  + ':');
	$('#path_condition').html($._('condition')  + ':');
	$('#path_issues').html($._('num_unresolved_issues')  + ':');
	$('#path_legal_status').html($._('legalstatus')  + ':');
	$('#path_last_survey').html($._('lastsurvey')  + ':');
	$('#path_surveyed_by').html($._('survey_by')  + ':');
	$('#path_next_survey').html($._('next_survey_due')  + ':');
	$('#path_assigned_to').html($._('assigned_to')  + ':');
	$('#path_warden_area').html($._('Warden_Area')  + ':');
	$('#path_responsibility').html($._('responsibility')  + ':');
	$('#path_start_from').html($._('start_from')  + ':');
	$('#path_to').html($._('to')  + ':');
	$('#path_desc').html($._('description')  + ':');
	$('#path_agreement_ref').html($._('agreement_reference')  + ':');
	$('#path_agreement_end_date').html($._('agreement_end_date')  + ':');
	$('#path_notes').html($._('notes')  + ':');
	
	$('#path_link').attr("title",$._('view_path_link'));
	$('#map_it').attr("title",$._('locate_on_map'));
	$('#create_issue').attr("title",$._('create_issue'));
	$('#create_furniture').attr("title",$._('create_furniture'));
	$('#create_surface').attr("title",$._('create_surface'));
	$('#row_edit').attr("value",$._('Edit'));
	
	$('#btnPathCancel').attr("value", $._('Cancel'));
	$('#btnPathSave').attr("value", $._('Save'));
}


function showRoWDetails(_rowid) {
	
			$("#tabs-Tool").empty();
			jQuery.get("resources/templates/viewer/rowinfo.html", function (template) {
				
				addTab('Path Information',template);
				$('#span-close').attr('title',$._('close_title'));
				
				jQuery("#RowInfo_MasterDetailsBody").empty();
											   		    
				jQuery("#RowInfo_MasterDetailsTmpl_line").tmpl().appendTo("#RowInfo_MasterDetailsBody");	
				
				jQuery("#pathid").val(_rowid);
				
				$(function() {
			        $("#agreementEndDate").datepicker({ dateFormat: 'dd/mm/yy',
						changeMonth: true,
						changeYear: true
		            }).attr('readonly','readonly');
				});
				
				
				$("#rowInfo_line :input").attr("disabled", true);				
				$("#btnCancelRoW_line").hide();
				$("#btnSaveRoW_line").hide();
								
				$("#rowInformationLink").click(function () {
					
					$("#RowInfo_MasterDetailsBody").slideToggle('fast');
		        });
				
				$("#btnUpdateRoW_line").click(function() {			
					$("#rowInfo_line :input").removeAttr("disabled");
					$("#pathid").attr("disabled", true);
					$("#btnUpdateRoW_line").hide();
					$("#btnCancelRoW_line").show();
					$("#btnSaveRoW_line").show();
					
				});
				
			});
	
}

function createEditPath(){
	
	$("#tab").tabs( "select" , 0 );
	//var editing = new SpatialVue.Editing(map, "sidebar");
	//var editing = new SpatialVue.Editing(map, "sidebar",undefined,undefined,'RoW_Path');
	var editing = new SpatialVue.Editing(map, "sidebar",undefined,undefined,undefined,'RoW_Path','RoW_Path');
} 


//getting historical record
function getPreviousPath(_gid,_rowid){
	//alert(_gid+"-"+ _rowid);
	jQuery.ajax({
	       async:false,
	    	type: "GET",              
	        url: STUDIO_URL + "rowpath/"+_rowid+"/prev/"+_gid,        		               
	        
	        success: function (data) {
	        	if(data.gid!=null){
	        		jQuery("#RowInfo_MasterDetailsBody").empty();
	        		data.agreementEndDate = convertDateToEuropeanFormat(data.agreementEndDate);
	    	        data.dateofnextsurvey = convertDateToEuropeanFormat(data.dateofnextsurvey);
	    	        data.lastsurvey = convertDateToEuropeanFormat(data.lastsurvey);
	        		
	    	        jQuery("#RowInfo_MasterDetailsTmpl_line").tmpl(data	
	        			).appendTo("#RowInfo_MasterDetailsBody");
	        		
	        		  createDropDown();
/*	        		  jQuery('#pathtype').val(data.pathTypeLkp.pathTypeId);
					  jQuery("#wardenArea").val(data.wardenarea);
					  jQuery("#path_Community").val(data.community);
			          jQuery("#path_classLkp").val(data.classLkp.id);
			          jQuery("#responsibleDepartmentLkp").val(data.responsibleDepartmentLkp.departmentid);
			          jQuery("#pathConditionLkp").val(data.pathConditionLkp.conditionid);
			          jQuery("#pathLegalstatus").val(data.pathLegalstatusLkp.legalstatusid);
			          if(data!=null)
			              jQuery("#assignedTo").val(data.assignedTo);
			          if(data!=null)
			              jQuery("#surveyedBy").val(data.surveyedBy);*/
	        		  
	        		  jQuery("#path_promotedRoute").append(jQuery("<option></option>")
	        	        		.attr("value", "false").text((lang=='en')?"No":"Na"));

	        	        jQuery("#path_promotedRoute").append(jQuery("<option></option>")
	        	        		.attr("value", "true").text((lang=='en')?"Yes":"Ydi"));
	    	          
	    	          $(function() {
	    	  	        $("#agreementEndDate").datepicker({ dateFormat: 'dd/mm/yy',
	    					changeMonth: true,
	    					changeYear: true
	    	            }).attr('readonly','readonly');
	    	  		});
	    	      	
	    	      	$(function() {
	    	  	        $("#dateofnextsurvey").datepicker({ dateFormat: 'dd/mm/yy',
	    					changeMonth: true,
	    					changeYear: true
	    	            }).attr('readonly','readonly');
	    	  		});
	    	      	
    	          $(function() {
    	  		        $("#lastsurvey").datepicker({ dateFormat: 'dd/mm/yy',
    	  					changeMonth: true,
    	  					changeYear: true
    	  	            }).attr('readonly','readonly');
    	          });
	    	  		        
    	         // $("#agreementEndDate").val(data.agreementEndDate);
    	        //  $("#dateofnextsurvey").val(data.dateofnextsurvey);
    	        //  $("#lastsurvey").val(data.lastsurvey);
    	          
	        		  if(data.pathTypeLkp){
		          		  jQuery('#pathtype').val(data.pathTypeLkp.pathTypeId);  
		          	  }
		          	  if(data.pathTypeLkp!=null)
		    		  jQuery('#pathtype').val(data.pathTypeLkp.pathTypeId);
		    		  
		    		  jQuery("#wardenArea").val(data.wardenarea);
		    		  jQuery("#path_Community").val(data.community);
		    		  
		    		  if(data.classLkp!=null)
		              jQuery("#path_classLkp").val(data.classLkp.id);
		    		  
		    		  if(data.responsibleDepartmentLkp!=null)
		              jQuery("#responsibleDepartmentLkp").val(data.responsibleDepartmentLkp.departmentid);
		    		  
		    		  if(data.pathConditionLkp!=null)
		              jQuery("#pathConditionLkp").val(data.pathConditionLkp.conditionid);
		    		  
		              if(data.pathLegalstatusLkp!=null)
		              jQuery("#pathLegalstatus").val(data.pathLegalstatusLkp.legalstatusid);
		              
		              $("#path_promotedRoute").val(data.promotedRoute.toString());
		              
		              /********Inactive User************/
		              
		              /*if(data.assignedTo!=null)
		                  jQuery("#assignedTo").val(data.assignedTo);
		              if(data!=null)
		                  jQuery("#surveyedBy").val(data.surveyedBy);*/
		              if(data.assignedTo!=null && data.assignedTo!=""){
		        			if(checkDropdowHasValue('assignedTo',data.assignedTo)){
		        				jQuery("#txtAssignedTo").hide();
		        				jQuery("#assignedTo").show();
		        				jQuery("#assignedTo").val(data.assignedTo);
		        			}
		        			else
		        			{
		        			jQuery("#txtAssignedTo").val(getNameFromEMail(data.assignedTo));
		        			jQuery("#txtAssignedTo").show();
		        			jQuery("#assignedTo").hide();
		        			}
		        		  }
		                      
		                  if(data.surveyedBy!=null && data.surveyedBy!=""){
		                      		        			  
		        			  if(checkDropdowHasValue('surveyedBy',data.surveyedBy)){
		        				jQuery("#txtSurveyedBy").hide();
		        				jQuery("#surveyedBy").show();
		        				jQuery("#surveyedBy").val(data.surveyedBy);
		        			}
		        			else
		        			{
		        			jQuery("#txtSurveyedBy").val(getNameFromEMail(data.surveyedBy));
		        			jQuery("#txtSurveyedBy").show();
		        			jQuery("#surveyedBy").hide();
		        			}
		        			  
		        			}
		              
		                  /********End************/
		                  
	        		$("#rowInfo_line :input").attr("disabled", true);
	        		
	        		//hiding button 
	        		$("#btnUpdateRoW_line").hide();
					$("#btnCancelRoW_line").hide();
					$("#btnSaveRoW_line").hide();
					$('.btn01').remove();
					//$("#footerdiv").hide();
						
	        	}
	        	else{
	        		jAlert('No history found');	
	        	}
	        	translateRowInfoLabels();
	        }
	  });
	
	
}

function getNextPath(_gid,_rowid){
	//alert(_gid+"-"+ _rowid);
	jQuery.ajax({
	       async:false,
	    	type: "GET",              
	        url: STUDIO_URL + "rowpath/"+_rowid+"/next/"+_gid,        		               
	        
	        success: function (data) {
			 if (data.gid != null) {
				jQuery("#RowInfo_MasterDetailsBody").empty();
				
				data.agreementEndDate = convertDateToEuropeanFormat(data.agreementEndDate);
    	        data.dateofnextsurvey = convertDateToEuropeanFormat(data.dateofnextsurvey);
    	        data.lastsurvey = convertDateToEuropeanFormat(data.lastsurvey);
    	        
				jQuery("#RowInfo_MasterDetailsTmpl_line").tmpl(data).appendTo(
						"#RowInfo_MasterDetailsBody");

				  
				  
				  /*jQuery("#wardenArea").val(data.wardenarea);
				  jQuery("#path_Community").val(data.community);
		          jQuery("#path_classLkp").val(data.classLkp.id);
		          */
		          createDropDown();
		          	  if(data.pathTypeLkp){
		          		  jQuery('#pathtype').val(data.pathTypeLkp.pathTypeId);  
		          	  }
		          	  if(data.pathTypeLkp!=null)
		    		  jQuery('#pathtype').val(data.pathTypeLkp.pathTypeId);
		    		  
		    		  jQuery("#wardenArea").val(data.wardenarea);
		    		  jQuery("#path_Community").val(data.community);
		    		  
		    		  if(data.classLkp!=null)
		              jQuery("#path_classLkp").val(data.classLkp.id);
		    		  
		    		  if(data.responsibleDepartmentLkp!=null)
		              jQuery("#responsibleDepartmentLkp").val(data.responsibleDepartmentLkp.departmentid);
		    		  
		    		  if(data.pathConditionLkp!=null)
		              jQuery("#pathConditionLkp").val(data.pathConditionLkp.conditionid);
		    		  
		              if(data.pathLegalstatusLkp!=null)
		              jQuery("#pathLegalstatus").val(data.pathLegalstatusLkp.legalstatusid);
		              
		              
		              	/********Inactive User************/
		              
		              /*if(data.assignedTo!=null)
		                  jQuery("#assignedTo").val(data.assignedTo);
		              if(data!=null)
		                  jQuery("#surveyedBy").val(data.surveyedBy);*/
		              if(data.assignedTo!=null && data.assignedTo!=""){
		        			if(checkDropdowHasValue('assignedTo',data.assignedTo)){
		        				jQuery("#txtAssignedTo").hide();
		        				jQuery("#assignedTo").show();
		        				jQuery("#assignedTo").val(data.assignedTo);
		        			}
		        			else
		        			{
		        			jQuery("#txtAssignedTo").val(getNameFromEMail(data.assignedTo));
		        			jQuery("#txtAssignedTo").show();
		        			jQuery("#assignedTo").hide();
		        			}
		        		  }
		                      
		                  if(data.surveyedBy!=null && data.surveyedBy!=""){
		                      
		        			  
		        			  if(checkDropdowHasValue('surveyedBy',data.surveyedBy)){
		        				jQuery("#txtSurveyedBy").hide();
		        				jQuery("#surveyedBy").show();
		        				jQuery("#surveyedBy").val(data.surveyedBy);
		        			}
		        			else
		        			{
		        			jQuery("#txtSurveyedBy").val(getNameFromEMail(data.surveyedBy));
		        			jQuery("#txtSurveyedBy").show();
		        			jQuery("#surveyedBy").hide();
		        			}
		        			  
		        			}
		              
		                  /********End************/
		          /*if(data.responsibleDepartmentLkp){
		        	  jQuery("#responsibleDepartmentLkp").val(data.responsibleDepartmentLkp.departmentid);  
		          }
		          
		          if(data.pathConditionLkp){
		        	  jQuery("#pathConditionLkp").val(data.pathConditionLkp.conditionid);  
		          }
		          
		          if(data.pathLegalstatusLkp){
		        	  jQuery("#pathLegalstatus").val(data.pathLegalstatusLkp.legalstatusid);
		          }
		          if(data!=null)
		              jQuery("#assignedTo").val(data.assignedTo);
		          if(data!=null)
		              jQuery("#surveyedBy").val(data.surveyedBy);*/

				$("#rowInfo_line :input").attr("disabled", true);
				
				//hiding button 
        		$("#btnUpdateRoW_line").hide();
				$("#btnCancelRoW_line").hide();
				$("#btnSaveRoW_line").hide();
				$('.btn01').remove();
			} else {
				var path = new SpatialVue.RowInfo(map, "sidebar",currentRowPath,_geomFeature);	
				jAlert('No more record');
			}
				
	        	
	        }
	  });
	
	
}


function savePathGeom() {
    _saveStrategy.save();
   // alert('savePathGeom');
}

function onPathGeomSave(event){
	objLayer.redraw(true);
	var insertId=event.response.insertIds[0];
	var fid = insertId.substr(insertId.indexOf('.')+1);
	//alert(fid);
	
	//update history
	if(!isediting){
		jQuery.ajax({
			async:false,
			type: "GET",              
			 url: STUDIO_URL + "rowpath/updatehistory/"+pathID,        		               
			 success: function (data) {
					var path = new SpatialVue.RowInfo(map, "sidebar",currentRowPath,_geomFeature,fid);
					jAlert('Path Details saved successfully');	
	        	
	         }
		 });
	
	}
	else{
			jAlert('Path Details saved successfully');	
			//$('#edit_content').empty();
	}
	path_wfs.removeAllFeatures(true); 
	if(g_wfs != null){
		g_wfs.removeAllFeatures(true);
	}
}


//mapit
function zoomToRowPath(){
	var fieldName="gid";
	var fieldVal=pathID;
	var relLayerName='RoW_Path';	
	var layerType = 'Line';
	$("#tab").tabs( "select" , 0 );
	zoomToLayerFeature(relLayerName,layerType,fieldName,fieldVal);//ref complaints.js

}

SpatialVue.Editing.prototype.Unregister = function () {
    saveStrategy.deactivate();
    
    if(undoredo != null)
        undoredo.resetEditIndex();

    if(path_wfs != undefined){
	    
	    deactivateControls();

	    path_wfs.removeAllFeatures(true);
	    wfs_del.removeAllFeatures(true);

	    map.removeLayer(path_wfs);
	    map.removeLayer(wfs_del);

    }

   
    saveStrategy.destroy();
    saveStrategy = null;
}


function refreshPathContact(_gid){
		$.ajaxSetup ({cache: false});
		jQuery.ajax({
			async:false,
	    	type: "GET",              
	        url: STUDIO_URL + "rowpath/"+_gid,        		               
	        success: function (data) {
	        	path_contacts=data.contacts;
				
				if (path_contacts.length > 0) {
						jQuery.each(path_contacts, function (i, ctype) {    	
						
						path_contacts[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
						});
					}
				
	        }
	    });
		jQuery("#pathlink_ContactTableBody").empty();
		jQuery("#ContactDetailTemplate").tmpl(path_contacts).appendTo("#pathlink_ContactTableBody");
}



function saveRowPath(){

	if(applyPathChange()){
			  
		if (!isediting) {
        savePathGeom();
		}
		else{
			//jAlert('Click on Save button to save the Path', 'Path');
			jAlert( $._('alert_click_Save_button') + ' ' + $._('RoW_Path'), $._('RoW_Path'));
			$('#popup_ok').attr("value", $._('popupOk'));
		}
	}
	/*
	applyPathChange();
	if(! isediting){
		savePathGeom();
	}
	else{
    	jAlert('Click on Save button to save the Path', 'Path');	    
    }
	*/
}


function applyPathChange() {
	validForm=true;
	var feature=_geomFeature;
	var editSelectionSymbolizer = {
			 "Point": {pointRadius: 4, graphicName: "square", fillColor: "#CC9900", fillOpacity: 1, strokeWidth: 1, strokeOpacity: 1, strokeColor: "#333333"},
			 "Line": {strokeWidth: 3, strokeOpacity: 1, strokeColor: "#666666", strokeLinecap: "square", strokeDashstyle: "dash"},
			 "Polygon": {strokeWidth: 2, strokeOpacity: 1, strokeColor: "#CC9900", fillColor: "#CC9900", fillOpacity: 0.3, strokeLinecap: "square", strokeDashstyle: "solid"},
			 "RegularPolygon": {strokeWidth: 2, strokeOpacity: 1, strokeColor: "#CC9900", fillColor: "#CC9900", fillOpacity: 0.3}
			};

	var style = new OpenLayers.Style();
	style.addRules([new OpenLayers.Rule({ symbolizer: editSelectionSymbolizer })]);
	var styleMap = new OpenLayers.StyleMap({ "default": style });
	
	var featPrefix = null;
	var targetNamespace = null;
	var currentFeature;
	
	var layerName = 'RoW_Path';
	 objLayer = map.getLayersByName(layerName)[0];
    var _wfsurl = objLayer.url.replace(new RegExp( "wms", "i" ), "wfs");
    var _wfsSchema = _wfsurl + "request=DescribeFeatureType&version=1.1.0&typename=" + layerMap[objLayer.name];
    var geometryColName='the_geom';
	
    var actualLayerName = layerMap[objLayer.name];
    var pos = actualLayerName.indexOf(":");
    var featType = null;
    if (pos > 1)
        featType = actualLayerName.substring(pos + 1);
    else
        featType = actualLayerName;
    

	var _projection = new OpenLayers.Projection(objLayer.projection.projCode);
	 if(! isediting){
	//Remove the previously add WFS and WFS_DEL layers

		 path_wfs = map.getLayersByName("WFS")[0];
	if (path_wfs != undefined) {
		map.removeLayer(path_wfs);
	}

	if (_saveStrategy != null) {
		//this.Unregister();
		//_saveStrategy.events.unregister();
	}
	_saveStrategy = new OpenLayers.Strategy.Save();

	_saveStrategy.events.register('success', null, onPathGeomSave);

	if (OpenLayers.Map.activelayer.name == CONST_SELECT_LAYER) {
	} else {

		$
				.ajax({
					url : PROXY_PATH + _wfsSchema,
					dataType : "xml",
					async : false,
					success : function(data) {
						var featureTypesParser = new OpenLayers.Format.WFSDescribeFeatureType();
						var responseText = featureTypesParser.read(data);
						var featureTypes = responseText.featureTypes;
						targetNamespace = responseText.targetNamespace;
						featPrefix = responseText.targetPrefix;

					}
				});

		var _protocol = new OpenLayers.Protocol.WFS({
			//headers: { Authorization : "Basic YWRtaW5AZXJ5cmktbnBhLmdvdi51azpQNHJDM3J5cjE="},
			version : "1.1.0",
			srsName : objLayer.projection.projCode,
			url : _wfsurl,
			featureType : featType,
			geometryName : geometryColName,
			featurePrefix : featPrefix,
			featureNS : targetNamespace,
			schema : _wfsSchema
		});

		path_wfs = new OpenLayers.Layer.Vector("WFS", {
			reportError : true,
			strategies : [ _saveStrategy ],
			projection : _projection,
			protocol : _protocol,
			isBaseLayer : false,
			visibility : true,
			styleMap : styleMap,
			displayInLayerSwitcher : false
		});
		map.addLayers([ path_wfs ]);
		var layerfeature = null;
	}
	 }
		if (isediting) {
			layerfeature = feature;
		} else {
			layerfeature = new OpenLayers.Feature.Vector(feature);
		}
		if (layerfeature.attributes == undefined) {
			layerfeature = layerfeature.feature;
		}

		
		if(trim($('#path_rowId').val()).length == 0){
			   //jAlert('Please provide value for row_id');
			jAlert( $._('alert_provide_rowid'), $._('alert'));
			$('#popup_ok').attr("value", $._('popupOk'));
			   validForm=false;
			   return;
		   }else{
			   layerfeature.attributes['row_id']=$('#path_rowId').val();
		   }
		
		if(!trim($('#pathtype').val()).length == 0){
			layerfeature.attributes['type']=$('#pathtype').val();
		}
		
		if(trim($('#pathConditionLkp').val()).length > 0){
			layerfeature.attributes['condition']=$('#pathConditionLkp').val(); 
		}
		
		if(trim($('#pathLegalstatus').val()).length > 0){
			layerfeature.attributes['legalstatus']=$('#pathLegalstatus').val();
		}
		
		if(trim($('#unresolvedIssues').val()).length == 0){
			 layerfeature.attributes['unresolved_issues']=0;
		}
		else{
			 layerfeature.attributes['unresolved_issues']=$('#unresolvedIssues').val();
		}
		
		if(!trim($('#responsibleDepartmentLkp').val()).length == 0){
			layerfeature.attributes['responsibility']=$('#responsibleDepartmentLkp').val();
		}
		//if(!trim($('#assignedTo').val()).length == 0){
			layerfeature.attributes['assigned_to']=$('#assignedTo').val();
		//}
		//if(!trim($('#surveyedBy').val()).length == 0){
			layerfeature.attributes['surveyed_by']=$('#surveyedBy').val();
		//}
		
		 if (trim($('#path_promotedRoute').val()).length != 0) {
			 layerfeature.attributes['promoted_route']=$('#path_promotedRoute').val(); 
		 }
        
		 if (trim($('#path_Community').val()).length != 0) {
			 layerfeature.attributes['community']=$('#path_Community').val();
		 }
		 if (trim($('#path_classLkp').val()).length != 0) {
			 layerfeature.attributes['_class']=$('#path_classLkp').val();
		 }
        
        if (trim($('#lengthKm').val()).length != 0) {
        	layerfeature.attributes['length_km']=$('#lengthKm').val();
        }else{
        	layerfeature.attributes['length_km']=0;
        }
        
        if (trim($('#lastsurvey').val()).length != 0) {
        	layerfeature.attributes['lastsurvey']=convertDateToUSFormat($('#lastsurvey').val());
        }
        
        if (trim($('#dateofnextsurvey').val()).length != 0) {
        	layerfeature.attributes['dateofnextsurvey']=convertDateToUSFormat($('#dateofnextsurvey').val());
        }
        
        if (trim($('#wardenArea').val()).length != 0) {
        	 layerfeature.attributes['wardenarea']=$('#wardenArea').val();
        }
       
        if (trim($('#startfrom').val()).length != 0) {
        	layerfeature.attributes['startfrom']=$('#startfrom').val();
        }
         
         if (trim($('#to').val()).length != 0) {
        	 layerfeature.attributes['to']=$('#to').val(); 
         }
         
         if (trim($('#agreementRef').val()).length != 0) {
        	 layerfeature.attributes['agreement_ref']=$('#agreementRef').val();
         }
        
         if (trim($('#agreementEndDate').val()).length != 0) {
        	 layerfeature.attributes['agreement_end_date']=convertDateToUSFormat($('#agreementEndDate').val());
         }
        
         if (trim($('#description').val()).length != 0) {
        	 layerfeature.attributes['description']=$('#description').val();
         }
         
         if (trim($('#notes').val()).length != 0) {
        	 layerfeature.attributes['notes']=$('#notes').val();
         }
         
         layerfeature.attributes['ishistory']=false;

		if(savetype=='NEW'){
			layerfeature.state = OpenLayers.State.INSERT;
		}
		else if(savetype=='EDIT'){
			layerfeature.state = OpenLayers.State.UPDATE;
		}
	    
	    if(!isediting){
	    	path_wfs.addFeatures([layerfeature]);
	    }
		
		return validForm;
		
}


function createDropDown(){
	jQuery("#pathtype").empty();
	jQuery("#pathtype").append(jQuery("<option></option>").attr("value", "").text((lang=="en")?"Please Select":"Dewisiwch"));
	jQuery.each(_pathtype, function (i, _pathtypes) {    	
			jQuery("#pathtype").append(jQuery("<option></option>").attr("value", _pathtypes.pathTypeId).text( (lang=='en')?_pathtypes.type:_pathtypes.math));        
	 });
	
	jQuery("#path_Community").empty();
	jQuery("#path_Community").append(jQuery("<option></option>").attr("value", "").text((lang=="en")?"Please Select":"Dewisiwch"));
	 jQuery.each(_pathcommunitylist, function (i, _pathcommunitylists) {    	
			jQuery("#path_Community").append(jQuery("<option></option>").attr("value", _pathcommunitylists.name).text(_pathcommunitylists.name));        
		 });
 	
	 jQuery("#path_classLkp").empty();
	 jQuery("#path_classLkp").append(jQuery("<option></option>").attr("value", "").text((lang=="en")?"Please Select":"Dewisiwch"));
	 jQuery.each(_pathclassLkp, function (i, _pathclassLkpc) {    	
	jQuery("#path_classLkp").append(jQuery("<option></option>").attr("value", _pathclassLkpc.id)
					.text((lang=="en")?_pathclassLkpc.priority:_pathclassLkpc.priority.replace("Priority","Blaenoriaeth")));        
	 });
	 
	 jQuery("#wardenArea").empty();
	  jQuery.each(_pathwarden_area, function (i, _pathwarden_areas) {    	
			jQuery("#wardenArea").append(jQuery("<option></option>").attr("value", _pathwarden_areas.wardenArea).text(_pathwarden_areas.wardenArea));        
	 });
	  
	  jQuery("#responsibleDepartmentLkp").empty();
	  jQuery.each(_pathdeptLkp, function (i, _pathdeptLkps) {    	
			jQuery("#responsibleDepartmentLkp").append(jQuery("<option></option>").attr("value", _pathdeptLkps.departmentid).text((lang=='en')?_pathdeptLkps.department:_pathdeptLkps.adran));        
	 });
	  
	  jQuery("#pathConditionLkp").empty();
	  jQuery.each(_pathcondition, function (i, _pathconditions) {    	
  			jQuery("#pathConditionLkp").append(jQuery("<option></option>").attr("value", _pathconditions.conditionid).text((lang=='en')?_pathconditions.condition:_pathconditions.cyflwr));        
		 });
	  
	  jQuery("#pathLegalstatus").empty();
	  jQuery("#pathLegalstatus").append(jQuery("<option></option>").attr("value", "").text((lang=="en")?"Please Select":"Dewisiwch"));
	  jQuery.each(_pathlegalstatus, function (i, _pathlegalstatuss) {    	
			jQuery("#pathLegalstatus").append(jQuery("<option></option>").attr("value", _pathlegalstatuss.legalstatusid).text((lang=='en')?_pathlegalstatuss.status:_pathlegalstatuss.statws));        
	 });
	  
	  jQuery("#surveyedBy").empty();
	  jQuery("#surveyedBy").append(jQuery("<option></option>").attr("value", "").text((lang=="en")?"Please Select":"Dewisiwch"));
	  jQuery.each(patheSurveyor, function (i, patheSurveyors) {    	
			jQuery("#surveyedBy").append(jQuery("<option></option>").attr("value", patheSurveyors.email).text(patheSurveyors.name));        
		});
	  
	  jQuery("#assignedTo").empty();
	  jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", "").text((lang=="en")?"Please Select":"Dewisiwch"));
	  jQuery.each(patheSurveyor, function (i, patheSurveyors) {    	
			jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", patheSurveyors.email).text(patheSurveyors.name));        
		});
}


//added by saurabh.m for path link
var contactData=null;
function showPathLink(_gid,_rowid){



	jQuery.get("resources/templates/viewer/pathlink.html", function (template) {
		
		var issueassignto=null;
		var pathissueData=null;
		var issuestatus=null;
		var issuetypedata=null;
		var issueurgency=null;
		 
		/*jQuery.ajax({
			async:false,
	    	type: "GET",              
	        url: STUDIO_URL + "path/issuelist/"+_rowid+"/Open", 
	         success: function (data) {
	        	 pathissueData = data;
	         }
		 });*/
		 
		 jQuery.ajax({
				async:false,
		    	type: "GET",              
		        url: STUDIO_URL + "rowpath/openissue/"+_rowid +"/Open", 
		         success: function (data) {
		        	 if(data!=null && data.length>0){
			            jQuery.ajax({
			                 async: false,
			                 type: "GET",
			                 url: STUDIO_URL + "rowpath/issueactions/"+_rowid +"/Open",
			                 success: function(action){
			                	 for(var i=0;i<data.length;i++){
					        		 data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
					        		 data[i].assignedTo = getNameFromEMail(data[i].assignedTo);
					        		 data[i]["ActionType"] = getActionType(data[i].gid.toString(), action);
					        		 data[i].issueTypeLkp.type = (lang=='cy')?data[i].issueTypeLkp.math:data[i].issueTypeLkp.type;
					        		 data[i].issueUrgencyLkp.urgencyType = (lang=='cy')?data[i].issueUrgencyLkp.brys:data[i].issueUrgencyLkp.urgencyType;
					        		 data[i].actionStatusLkp.actionStatus = (lang=='cy')?data[i].actionStatusLkp.statws:data[i].actionStatusLkp.actionStatus;
					        	 }
					        	 pathissueData = data;
			                 }
			            });
		        	 }
		         }
			 });
		
		var pathfurnitureData=null;
		jQuery.ajax({
			async:false,
	    	type: "GET",              
	        url: STUDIO_URL + "rowpath/furniture/"+_rowid, 
	         success: function (data) {
	        	 for(i=0; i<data.length; i++){
	        		 data[i].installedDate = convertDateToEuropeanFormat(data[i].installedDate);
	        		 data[i].lastInspected = convertDateToEuropeanFormat(data[i].lastInspected);
	        		 //data[i].unresolvedIssues = (data[i].unresolvedIssues == false)?'No':'Yes';
	        		 data[i].unresolvedIssues = (lang=='cy')? ((data[i].unresolvedIssues == false)?'Na':'Oes'):((data[i].unresolvedIssues == false)?'No':'Yes');
	        		 data[i].furnitureTypeLkp.type = (lang=='cy')?data[i].furnitureTypeLkp.math:data[i].furnitureTypeLkp.type;
	        		 data[i].furnitureConditionLkp.condition = (lang=='cy')?data[i].furnitureConditionLkp.cyflwr:data[i].furnitureConditionLkp.condition;
	        	 }
	        	 pathfurnitureData = data;
	         }
		 });
		
		if(path_contacts==null){
			jQuery.ajax({
			       async:false,
			    	type: "GET",              
			        url: STUDIO_URL + "rowpath/"+_gid,        		               
			        success: function (data) {
			        	path_contacts=data.contacts;
						
						if (path_contacts.length > 0) {
							jQuery.each(path_contacts, function (i, ctype) {    	
							
							path_contacts[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
							});
						}
			        	
			        }
			    });
		}
			//for isue
			jQuery.ajax({
				async:false,
				type: "GET",              
				 url: STUDIO_URL + "user/",        		               
				 success: function (data) {
					 issueassignto=data
					
				 }
				});
			
			//for surface
			var surfaceData=null;
			jQuery.ajax({
				async:false,
				type: "GET",              
				 url: STUDIO_URL + "rowpath/surface/"+_rowid,        		               
				 success: function (data) {
					 for(i=0; i<data.length; i++){
						 data[i].lastInspected = convertDateToEuropeanFormat(data[i].lastInspected);
						 //data[i].unresolvedStatus
						 data[i].unresolvedStatus = (lang=='cy')? ((data[i].unresolvedStatus == false)?'Na':'Oes'):((data[i].unresolvedStatus == false)?'No':'Yes');
						 
						 /*if(data[i].unresolvedStatus=="true"){
							data[i].unresolvedStatus="Yes";
						 }
						 else{
							data[i].unresolvedStatus="No";
						 }*/
						 
						 data[i].surfaceTypeLkp.type = (lang=='cy')?data[i].surfaceTypeLkp.math:data[i].surfaceTypeLkp.type; 
						 data[i].surfaceConditionLkp.condition = (lang=='cy')?data[i].surfaceConditionLkp.cyflwr:data[i].surfaceConditionLkp.condition;
					 }
					 surfaceData=data;
					
				 }
				});
			
			//for legal
			var legalData=null;
			jQuery.ajax({
				async:false,
				type: "GET",              
				 url: STUDIO_URL + "rowpath/legal/"+_rowid,        		               
				 success: function (data) {
					 for(i=0; i<data.length; i++){
						 data[i].legalTypeLkp.legalType = (lang=='cy')?data[i].legalTypeLkp.cyfreithiol:data[i].legalTypeLkp.legalType;
						 data[i].legalStatusLkp.legalStatus = (lang=='cy')?data[i].legalStatusLkp.statwsCyfreithiol:data[i].legalStatusLkp.legalStatus;
						 legalData=data
					 }
				 }
			});
			
			/*for(var k=0;k<pathissueData.length;k++){
				pathattributedata[k]=pathissueData[k];
				
				$.each(issueassignto, function (key, val) {
					if(val.id==pathattributedata[k].assignedTo){
						pathattributedata[k].assignedTo=val.email;
						return;
					}
				});					
			}*/
			
		//Add tab
		addListingTab($._('path_link'),'tab-pathlink',template);
				
		//jQuery("#pathlink_FurnitureTmpl").tmpl().appendTo("#pathlink_FurnitureBody");
		//jQuery("#pathlink_IssueTmpl").tmpl().appendTo("#pathlink_IssueBody");
		
		if(pathfurnitureData!=null && pathfurnitureData.length > 0){
			jQuery("#pathLinkFurnitureTmpl").tmpl(pathfurnitureData).appendTo("#pathlink_FurnitureTableBody");
		}else{
			//jQuery("#noresulttext").tmpl().appendTo("#pathlink_FurnitureTableBody");
		}
		
		if(pathissueData!=null && pathissueData.length > 0){
			jQuery("#pathLinkIssueTmpl").tmpl(null,{
				issueList: pathissueData
					
				}).appendTo("#pathlink_IssueTableBody");
			//jQuery("#").tmpl(pathissueData).appendTo("#pathlink_IssueTableBody");
		}else{
			//jQuery("#noresulttext").tmpl().appendTo("#pathlink_IssueTableBody");
		}
		
		if(path_contacts!=null && path_contacts.length>0){
			jQuery("#ContactDetailTemplate").tmpl(path_contacts).appendTo("#pathlink_ContactTableBody");
		}else{
			//jQuery("#noresulttext").tmpl().appendTo("#pathlink_ContactTableBody");
		}
		
		
		if(surfaceData!=null){
			jQuery("#pathlink_SurfaceTmpl").tmpl(surfaceData).appendTo("#pathlink_SurfaceTableBody");
		}else{
			//jQuery("#noresulttext").tmpl(surfaceData).appendTo("#pathlink_SurfaceTableBody");
		}
		
		if(legalData!=null && legalData.length>0 ){
		jQuery("#pathlink_LegalIssueTmpl").tmpl(legalData).appendTo("#pathlink_LegalIssueTableBody");
		}else{
			//jQuery("#noresulttext").tmpl(surfaceData).appendTo("#pathlink_LegalIssueTableBody");
		}
		
		//for pagination
		//$("#pathlink_FurnitureTable").tablesorter({ debug: false, sortList: [[0, 0]], widgets: ['zebra'] })
      /*.tablesorterPager({ container: $("#pathlinkFurniture_pagerDiv"), positionFixed: false })
      .tablesorterFilter({                           
         filterColumns: [0,1,2],
         filterCaseSensitive: false
      });*/
		
		//added for contact
		$("#pathNewContact").click(function() {			
			addNewContact('rowpath',_gid);
			
		});
		
		$("#pathcontactlink").click(function() {			
			addExistingContact('rowpath',_gid);
			
		});
		
		//for historical issue on path
		$("#histricolIssueLink").click(function() {			
			viewPathHistricolIssue(_rowid);
			
		});
		$("#openIssueLink").click(function() {			
			viewOpenIssueOnPath(_rowid);
		});	
		
		//go to parent path
		$("#goToparentpathLink").click(function() {			
			showPathDetails(_gid,_rowid);
		});
		
		jQuery("#pathlink_accordion").accordion({fillSpace: true});
		
		translatePathIssueListing();
		translatePathFurnitureListing();
		translatePathSurfaceListing();
		translatePathLegalListing();
		translatePathContactListing();
	});
	

}


function translatePathIssueListing(){
	 $('#pathlink_issue').html($._('Issue'));
	 $('#rowlink_parent').html($._('go_to_parent_issue'));
	 $('#rowlink_openissue').html($._('issues_open'));
	 $('#rowlink_historyissue').html($._('furniture_link_issue_historical'));
	 $('#rowlink_issueid').html($._('Issueid'));
	 $('#rowlink_id').html($._('row_id'));
	 $('#rowlink_furnitureid').html($._('furnitureid'));
	 $('#rowlink_issuetype').html($._('type'));
	 $('#rowlink_issueurgency').html($._('urgency'));
	 $('#rowlink_issuestatus').html($._('status'));
	 $('#rowlink_assignedto').html($._('assigned_to'));
	 $('#rowlink_resolveby').html($._('resolve_by'));
	 $('#rowlink_issueaction').html($._('action'));
	 
	 $('.clsjob').attr("title", $._('create_job'));
	 $('.clslegal').attr("title", $._('create_legal'));
}

function translatePathFurnitureListing(){
	$('#pathlink_FurnitureHeader').html($._('Furniture'));
	 $('#rowlink_furnitureID').html($._('furnitureid'));
	 $('#rowlink_furnituretype').html($._('type'));
	 $('#rowlink_furniturecondition').html($._('condition'));
	 $('#rowlink_lastinspected').html($._('last_inspected'));
	 $('#rowlink_installdate').html($._('installed_date'));
	 $('#rowlink_unresolvedissue').html($._('unresolved_issues'));
}

function translatePathSurfaceListing(){
	$('#pathlink_surface').html($._('Surface'));
	$('#pathlink_surfaceid').html($._('Surfaceid'));
	$('#pathlink_surfacetype').html($._('type'));
	$('#pathlink_surfacecondition').html($._('condition'));
	$('#pathlink_surfaceinspected').html($._('last_inspected'));
	$('#pathlink_surfaceunresolved').html($._('unresolved_issues'));
}

function translatePathLegalListing(){
	$('#pathlink_LegalHeader').html($._('legal'));
	$('#pathlink_legalid').html($._('legal_id'));
	$('#pathlink_legalrowid').html($._('row_id'));
	$('#pathlink_legalissueid').html($._('Issueid'));
	$('#pathlink_legaltype').html($._('type'));
	$('#pathlink_legalstatus').html($._('legal_status'));
}

function translatePathContactListing(){
	$('#pathlink_contact').html($._('contact'));
	$('#add_new_contact').html($._('furniture_link_addcontact'));
	$('#add_exist_contact').html($._('furniture_link_existingcontact'));
	$('#pathlink_contactid').html($._('contact_id'));
	$('#pathlink_contactname').html($._('contact_fname'));
	$('#pathlink_contactsname').html($._('contact_surname'));
	$('#pathlink_contacttype').html($._('contact_type'));
	$('#pathlink_contactposition').html($._('contact_position'));
	$('#pathlink_contactphone').html($._('Phone'));
	$('#pathlink_contactmail').html($._('EMail'));
	$('#pathlink_contactaction').html($._('action'));
}

function showFurnitureDetailsfromPath(_gid,_rowid){

//alert(_gid+'-'+_rowid);
var path_filter = new OpenLayers.Filter.Comparison({
                        type: OpenLayers.Filter.Comparison.EQUAL_TO,
                        property: 'gid',
                        value: _gid
                    })

					
var furniturelayerName = 'Furniture';
	var pointGeom = null;
	var result=null;
	 $.ajax({
        url: STUDIO_URL + 'layer/' + furniturelayerName + "?" + token,
        async:false,
        success: function (data) {
       	 var uniqueField;
       	 var displayableCols = data.layerFields;
       	    if(displayableCols.length > 0)
       	    	uniqueField = displayableCols[0].keyfield;
       	    
       	   if(displayableCols.length > 0 && uniqueField != undefined){
       		   result = new Result(furniturelayerName, 'http://www.rmsi.com/snpa', path_filter, true, undefined, undefined);
                 
                  pointGeom = result.getQueryResultWithHistoryRecord(displayableCols, 'gid', 
                		  	'the_geom', false);
                  //getting geom
                  pointGeom=pointGeom[0].geometry;
                  
       	   }
        }
	 });
	 					
	
							

var furnitureDetail = new SpatialVue.Furniture(map, "sidebar",null,pointGeom,_gid);
			
}


function getNextsurveyDate(_lastsurveyDate, _priority,_typeOfSurvey){
	
	var pathSURVEY_TASK;
	 jQuery.ajax({
		   type: "POST",
		   url: STUDIO_URL+"tasksScheduler/",
		data: {taskName:SURVEY_TASK}, 
		success: function (data) {
			pathSURVEY_TASK=data;
			}
	 });
	 
	 	var noofDays=0;
		$.each(pathSURVEY_TASK, function (key, val) {
			if(val[0]==_typeOfSurvey && val[1]==_priority){
				noofDays=val[2];
			}
		});
		//alert('noofDays'+noofDays);
		var nextSurveyDate=addDaysInDate(_lastsurveyDate,noofDays);
	return 	nextSurveyDate;	
	
}

function addDaysInDate(_date, noofdays) {
	//alert(_date);
	var date = new Date(_date);
	var addTime = noofdays * (1000 * 60 * 60 * 24);
	var addedDate = new Date(date.getTime() + addTime);
	var month =addedDate.getMonth()+1;
	if(month<10){
		month="0"+month;
	}
	//var futDate = addedDate.getFullYear() + "-" + month + "-" +addedDate.getDate(); 
	var futDate = addedDate.getDate() + "/" + month + addedDate.getFullYear();
	// var depart = $.datepicker.parseDate('yy-mm-dd', addedDate);
	return futDate;
}//added for showing surface


function showSurfaceDetails(_gid, _rowid) {

    //alert(_gid + '-' + _rowid);
    var surface_filter = new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'gid',
        value: _gid
    })

    var layerName = 'Surface';
    var surfaceGeom = null;
    var result = null;
    $.ajax({
        url: STUDIO_URL + 'layer/' + layerName + "?" + token,
        async: false,
        success: function (data) {
            var uniqueField;
            var displayableCols = data.layerFields;
            if (displayableCols.length > 0) uniqueField = displayableCols[0].keyfield;

            if (displayableCols.length > 0 && uniqueField != undefined) {
                result = new Result(layerName, 'http://www.rmsi.com/snpa', surface_filter, true, undefined, undefined);

                surfaceGeom = result.getQueryResultWithHistoryRecord(displayableCols, 'gid', 'the_geom', false);
                //getting geom
                surfaceGeom=surfaceGeom[0].geometry;

            }
        }
    });

    var Surface = new SpatialVue.Surface (map, "sidebar", null, surfaceGeom, _gid);

}

function viewPathHistricolIssue(_rowid) {
	
	var pathHistricolIssue=null;
	var pathHattributedata={};
	var issueassignto=null;
	jQuery.ajax({
			async:false,
	    	type: "GET",              
	        url: STUDIO_URL + "rowpath/openissue/"+_rowid +"/history", 
	         success: function (data) {
	        	 if(data!=null && data.length>0){
		            jQuery.ajax({
		                 async: false,
		                 type: "GET",
		                 url: STUDIO_URL + "rowpath/issueactions/"+_rowid +"/history",
		                 success: function(action){
		                	 for(var i=0;i<data.length;i++){
				      		 	data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
				      		 	data[i].assignedTo = getNameFromEMail(data[i].assignedTo);
				      		    data[i]["ActionType"] = getActionType(data[i].gid.toString(), action);
				      		    
				      		    data[i].issueTypeLkp.type = (lang=='cy')?data[i].issueTypeLkp.math:data[i].issueTypeLkp.type;
				        		data[i].issueUrgencyLkp.urgencyType = (lang=='cy')?data[i].issueUrgencyLkp.brys:data[i].issueUrgencyLkp.urgencyType;
				        		data[i].actionStatusLkp.actionStatus = (lang=='cy')?data[i].actionStatusLkp.statws:data[i].actionStatusLkp.actionStatus;
				         	 }
				        	 pathHistricolIssue = data;
		                 }
		            });
	        	 }
	         }
		 });
		 
	//for isue
		/*	jQuery.ajax({
				async:false,
				type: "GET",              
				 url: STUDIO_URL + "user/",        		               
				 success: function (data) {
					 issueassignto=data
					
				 }
				});
		 for(var k=0;k<pathHistricolIssue.length;k++){
				pathHattributedata[k]=pathHistricolIssue[k];
				
				$.each(issueassignto, function (key, val) {
					if(val.id==pathHattributedata[k].assignedTo){
						pathHattributedata[k].assignedTo=val.email;
						return;
					}
				});					
			}*/
	
		jQuery("#pathlink_IssueTableBody").empty();
		if(pathHistricolIssue!=null && pathHistricolIssue.length > 0){
			jQuery("#pathLinkIssueTmpl").tmpl(null,{
				issueList: pathHistricolIssue
					
				}).appendTo("#pathlink_IssueTableBody");
			//jQuery("#").tmpl(pathissueData).appendTo("#pathlink_IssueTableBody");
		}else{
			//jQuery("#noresulttext").tmpl().appendTo("#pathlink_IssueTableBody");
			jAlert('No historical issues are associated with selected Path');
		}
		 $('.clsjob').attr("title", $._('create_job'));
		 $('.clslegal').attr("title", $._('create_legal'));
}

function populateRowPathNextsurveyDate(){

	var lastsurveyDate = $('#lastsurvey').val();
	var priority=$('#path_classLkp').val();
	var pathtype=$('#pathtype').val();
	var promotedRoute=$('#path_promotedRoute').val();
	var noofMonth=12;
		var nextsurvey=null;
		
		 jQuery.ajax({
			   type: "POST",
			   url: STUDIO_URL+"tasksScheduler/",
			data: {taskName:SURVEY_TASK}, 
			async:false,
			success: function (data) {
				
				var r = new Array(), j = -1;         	  
				 for (var key=0, size=data.length; key<size; key++) {
				 if(promotedRoute==true){
				 if(data[key][0].toUpperCase()==PATH_PROMOTEDROUTES.toUpperCase()){
					noofMonth=data[key][2];
					break;
				 }
				 }else if(pathtype==5){
						if(pathtype.toUpperCase()==PATH_PERMISSIVE.toUpperCase() && data[key][0].toUpperCase()==PATH_PERMISSIVE.toUpperCase() && data[key][1]==priority){
							noofMonth=data[key][2];
							break;
					 }	
				}else{
					if(data[key][0].toUpperCase()==PATH_PROW.toUpperCase() && data[key][1]==priority){
							noofMonth=data[key][2];
							break;
					 }
					}
			 }
				/*var tempdate=new Date(lastsurveyDate);
				tempdate.setMonth(tempdate.getMonth() + noofMonth);
				nextsurvey=tempdate;*/
				
				  //if(pathSURVEY_TASK[key][0]=='PRoW' && pathSURVEY_TASK[key][1]==priority)
				  //uncommented for adding days 
				  //nextsurvey=businessDays(data[key][2],lastsurveyDate); 	
				 
				var txtdate = lastsurveyDate.split('/');
				var tempdate=new Date(txtdate[2],txtdate[1]-1,txtdate[0]);
				tempdate.setMonth(tempdate.getMonth() + noofMonth);
				//tempDate = convertDateToEuropeanFormat(tempdate);
				//nextsurvey=tempdate;
				
				nextsurvey=tempdate.getDate()+'/'+(tempdate.getMonth()+1)+'/'+tempdate.getFullYear();
			}
		 });
		 	
		 $('#dateofnextsurvey').datepicker('setDate', nextsurvey); 
}	



function viewOpenIssueOnPath(_rowid) {
	
	var openIssueonPath=null;
	var pathIssuedata={};
	var issueassignto=null;
	jQuery.ajax({
			async:false,
	    	type: "GET",              
	        url: STUDIO_URL + "rowpath/openissue/"+_rowid +"/Open", 
	         success: function (data) {
	        	 if(data!=null && data.length>0){
		            jQuery.ajax({
		                 async: false,
		                 type: "GET",
		                 url: STUDIO_URL + "rowpath/issueactions/"+_rowid +"/Open",
			             success: function(action){
				        	 for(var i=0;i<data.length;i++){
				      		 	data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
				      		 	data[i].assignedTo = getNameFromEMail(data[i].assignedTo);
				      		 	data[i]["ActionType"] = getActionType(data[i].gid.toString(), action);
				      		 	data[i].issueTypeLkp.type = (lang=='cy')?data[i].issueTypeLkp.math:data[i].issueTypeLkp.type;
				        		data[i].issueUrgencyLkp.urgencyType = (lang=='cy')?data[i].issueUrgencyLkp.brys:data[i].issueUrgencyLkp.urgencyType;
				        		data[i].actionStatusLkp.actionStatus = (lang=='cy')?data[i].actionStatusLkp.statws:data[i].actionStatusLkp.actionStatus;
				         	 }
				        	 openIssueonPath = data;
			             }
		            });
	        	 }
	         }
		 });

		/* //for isue
			jQuery.ajax({
				async:false,
				type: "GET",              
				 url: STUDIO_URL + "user/",        		               
				 success: function (data) {
					 issueassignto=data
					
				 }
				});
		 for(var k=0;k<openIssueonPath.length;k++){
				pathIssuedata[k]=openIssueonPath[k];
				
				$.each(issueassignto, function (key, val) {
					if(val.id==pathIssuedata[k].assignedTo){
						pathIssuedata[k].assignedTo=val.email;
						return;
					}
				});					
			}*/
		
		jQuery("#pathlink_IssueTableBody").empty();
		if(openIssueonPath!=null && openIssueonPath.length > 0){
			jQuery("#pathLinkIssueTmpl").tmpl(null,{
				issueList: openIssueonPath
					
				}).appendTo("#pathlink_IssueTableBody");
			//jQuery("#").tmpl(pathissueData).appendTo("#pathlink_IssueTableBody");
		}else{
			//jQuery("#noresulttext").tmpl().appendTo("#pathlink_IssueTableBody");
		}
		 $('.clsjob').attr("title", $._('create_job'));
		 $('.clslegal').attr("title", $._('create_legal'));
}

