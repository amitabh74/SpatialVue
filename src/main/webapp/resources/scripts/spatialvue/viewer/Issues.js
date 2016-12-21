var currentIssue=null;
var issue_contacts=null;
var issue_attachedFiles=null;
var issueTypes=null;
var issueStatusList=null; 
var issueurgencyList=null;
var issueResponsibleDeptList=null;
var issueReasonList=null;
var issueID = null;
var issueUserList=null; 
var _gid = null;
var editControls_issue;
var complaintReportedOn="";

SpatialVue.Issue =  function(_map, _searchdiv,masterdetails,geomFeature,newGid) {
	isediting=false;
	savetype='EDIT';
	_geomFeature = geomFeature;
	_saveStrategy = null;
	map = _map;
    
	if(newGid!=undefined){
		_gid=newGid;
	}
	else{
		_gid=masterdetails.gid;
	}
	
   // var _rowid=  masterdetails.row_id;
    //currentIssue=masterdetails; 
    issueID=_gid;
    searchdiv = _searchdiv;
    showResultsinDialog = true;
    var _layer=layer;
    var _associationIds=associationIds;
	var serverurl=window.location.protocol+'//'+window.location.host+window.location.pathname;
	_serverurl=serverurl;
	var attachedFiles=null;
	jQuery.ajax({
       async:false,
    	type: "GET",              
        url: STUDIO_URL + "issue/"+_gid,        		               
        success: function (data) {
        	jQuery.ajax({
		                 async: false,
		                 type: "GET",
		                 url: STUDIO_URL + "issue/issueactions/open",
		                 success: function(action){
							//for(var k=0;k<data.length;k++){
								
								data.ActionType = getActionType(data.gid.toString(), action);
							//}
		                 }
		            });
			
			data.reportedOn = convertDateToEuropeanFormat(data.reportedOn);
        	data.inspectBy = convertDateToEuropeanFormat(data.inspectBy);
        	data.inspectedOn = convertDateToEuropeanFormat(data.inspectedOn);
        	data.resolveBy = convertDateToEuropeanFormat(data.resolveBy);
        	data.signoff = convertDateToEuropeanFormat(data.signoff);
        	
        	currentIssue=data;
			issue_contacts=data.contacts;
			issue_attachedFiles=data.attachments;
        	
        }
    });
    
	jQuery.ajax({
        async:false,
     	type: "GET",              
         url: STUDIO_URL + "issue/type/lang/"+lang,        		               
         success: function (data) {
        	 issueTypes=data;
         	
         }
     });
	jQuery.ajax({
        async:false,
     	type: "GET",              
         url: STUDIO_URL + "issue/urgency",        		               
         success: function (data) {
        	 issueurgencyList=data;
         	
         }
     });
	
	jQuery.ajax({
        async:false,
     	type: "GET",              
         url: STUDIO_URL + "issue/status",        		               
         success: function (data) {
        	 issueStatusList=data;
         	
         }
     });
	jQuery.ajax({
        async:false,
     	type: "GET",              
         url: STUDIO_URL + "issue/responsibledept",        		               
         success: function (data) {
        	 issueResponsibleDeptList=data;
         	
         }
     });
	jQuery.ajax({
        async:false,
     	type: "GET",              
         url: STUDIO_URL + "issue/reason",        		               
         success: function (data) {
        	 issueReasonList=data;
         	
         }
     });
    
	jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "workcommitment/reassign/"+loggedUser.functionalRole+"/"+loggedUser.id,
        //url: STUDIO_URL + "user/",
        success: function (data) {
            issueUserList = data

        }
    });
	
	$("#tabs-Tool").empty();
	
	
		
    jQuery.get('resources/templates/viewer/issue.html', function(template) {
    	var issue_text = $._('Issue');
		addTab(issue_text.charAt(0).toUpperCase()  + issue_text.slice(1),template);
		$('#span-close').attr('title',$._('close_title'));
		
		
		
		$("#AttchFileListBody").empty();
		
		var htmlStr = '';
					
		$.each(issue_attachedFiles, function (key, val) {
             	var filepath=serverurl+val.filepath				
             	htmlStr = htmlStr + '<tr id="' + _layer.name+'_'+val.associationid+ '">';	
				htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="'+filepath+'" target="_blank">'+val.filename+'</a></td>';		
             	htmlStr = htmlStr+'<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteAttachedFile('+"'"+_layer.name+"'"+','+"'"+val.associationid+"'"+');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
        });
	
		
		jQuery("#issue_DetailsBody").empty();
		 
		jQuery("#issue_DetailsTmpl").tmpl(currentIssue	
		).appendTo("#issue_DetailsBody");
		
		
		jQuery("#issue_AttachmentBody").empty();
		
		jQuery("#issue_AttachmentTmpl").tmpl(currentIssue	
		).appendTo("#issue_AttachmentBody");
		
		
		jQuery.each(issueTypes, function (i, issueType) {    	
			jQuery("#issueType").append(jQuery("<option></option>").attr("value", issueType.issuetypeid).text(
			(lang=='en')?issueType.type:issueType.math));
		});
				
		jQuery.each(issueurgencyList, function (i, issueurgency) {    	
			jQuery("#urgency").append(jQuery("<option></option>").attr("value", issueurgency.urgencyid).text(
			(lang=='en')?issueurgency.urgencyType:issueurgency.brys));
		});
		
		jQuery.each(issueStatusList, function (i, issueStatus) {    	
			jQuery("#actionStatus").append(jQuery("<option></option>").attr("value", issueStatus.actionstatusid).text(
			(lang=='en')?issueStatus.actionStatus:issueStatus.statws));
		});
		
		jQuery.each(issueResponsibleDeptList, function (i, issueResponsibleDept) {    	
			jQuery("#responsibleDept").append(jQuery("<option></option>").attr("value", issueResponsibleDept.departmentid).text(
			(lang=='en')?issueResponsibleDept.department:issueResponsibleDept.adran));
		});
		jQuery.each(issueReasonList, function (i, issueReason) {    	
			//if(issueReason.reasonid!=3){	
				jQuery("#reason").append(jQuery("<option></option>").attr("value", issueReason.reasonid).text(
				(lang=='en')?issueReason.reason:issueReason.math));
			//}
			
		});
		jQuery("#assignedTo").empty();
		jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
		jQuery.each(issueUserList, function (i, issueUser) {    	
			jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", issueUser.email).text(issueUser.name));        
		});
		$("#addPrintIssueDiv").hide();
				
		if(!currentIssue.ishistory && !isCptClosed){
			
		jQuery.get('fileupload', function (template1) {
    		
    	$("#fileAttachmentDiv").append(template1);
		
    	$('<input type="hidden" name="ajaxUpload" value="true" />').insertAfter($("#file"));
		$("#fileuploadForm").attr("action", "fileupload?"+ token);
		
		
			$("#fileuploadForm").ajaxForm({ 
				success: function(filepath_name) {
					
					if(filepath_name.indexOf("HTTP Status 500") != -1){
						//jAlert('File size is greater than permissible limit');								
						$('#errmsg').html('File size is greater than permissible limit');
					}else{
						$('#errmsg').html('');
						filepath_name=filepath_name.replace("<PRE>","");
						filepath_name=filepath_name.replace("</PRE>","");
						
						var pathArr=filepath_name.split("|");											
						
						uploadFilepath=pathArr[0];
						uploadFilename=pathArr[1];
	
						//var selRow = $('#tablegrid1').jqGrid('getGridParam', 'selarrrow');
	
						//var fieldVal = featureGeom[selRow[0] - 1][1]; 							
						
							var filename=uploadFilename;
							//var associationid=fieldVal;
							var associationid=$('#hid-accesslandGid').val();
							var layername=_layer.name;
							//var keyfield=uniqueField;	
							var keyfield=currentIssue.rowId;
							var desc=$('#fileDesc').val();
							var filepath=uploadFilepath;
							var extension=/[^.]+$/.exec(filename)[0];
							
							//set the hidden field
							
							$('#associationid').val(associationid);
							$('#layername').val(layername);
							$('#keyfield').val(keyfield);
							$('#filename').val(filename);
							$('#filepath').val(filepath);
							$('#extension').val(extension);
														
									
							if ($('#fileDesc').val() != '' && $('#file').val() != '') {
								$.ajax({ 
									type: "POST",
									url: STUDIO_URL + "attachment/create",
									data: $("#fileuploadForm").serialize(),
									success: function (fileurl) {																		
									//alert(fileurl);
										var _fileurl=serverurl+fileurl;
									
									var markup="";
									
									markup = markup + '<tr id="' + layername+'_'+associationid+ '">';									
									markup = markup + '<td align="left" class="padcellup"><a href="'+_fileurl+'" target="_blank">'+filename+'</a></td>';
									markup = markup+'<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteAttachedFile('+"'"+layername+"'"+','+"'"+associationid+"'"+');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
									
									
									//jQuery('#AttchFileListBody').append(markup);
									
									refreshAttachedFiles(currentIssue.gid,_serverurl,'Issue');
									}
								});
							
								
							}
							else{
																
								 jAlert('Enter both Description and File Name', 'Attachment');
							}
					}
						
				},
				error: function (xhr, status) {
		            jAlert('File size is greater than permissible limit');
		        }
			});//ajaxForm
	    	
	    	
			});//fileupload
				        
				if(currentIssue.furnitureid==null){
					$("#furnitureIDTR").hide();
				}
				if(currentIssue.surfaceid==null){
					$("#surfaceIDTR").hide();
				}
				if(currentIssue.issueTypeLkp){
					jQuery('#issueType').val(currentIssue.issueTypeLkp.issuetypeid);
				}
				if(currentIssue.issueUrgencyLkp){
					jQuery('#urgency').val(currentIssue.issueUrgencyLkp.urgencyid);
				}
				
				if(currentIssue.actionStatusLkp){
					jQuery('#actionStatus').val(currentIssue.actionStatusLkp.actionstatusid);	
				}
				if(currentIssue.responsibleDepartmentLkp){
					jQuery('#responsibleDept').val(currentIssue.responsibleDepartmentLkp.departmentid);	
				}
				if(currentIssue.issueReasonLkp){
					jQuery('#reason').val(currentIssue.issueReasonLkp.reasonid);	
				}
				/********Inactive User************/		
				
				if(currentIssue.assignedTo!=null && currentIssue.assignedTo!=""){
					if(checkDropdowHasValue('assignedTo',currentIssue.assignedTo)){
						jQuery("#txtAssignedTo").hide();
						jQuery("#assignedTo").show();
						jQuery("#assignedTo").val(currentIssue.assignedTo);
					}
					else
					{
					jQuery("#txtAssignedTo").val(getNameFromEMail(currentIssue.assignedTo));
						jQuery("#txtAssignedTo").show();
						jQuery("#assignedTo").hide();
					}
				}
				
				/********end************/
				
				//jQuery('#assignedTo').val(currentIssue.assignedTo);
				
				jQuery('#AttchFileListBody').append(htmlStr);
				$('#fileDesc').val('');
		        $('#file').val('');
		        
		        
		        
		}	//ishistory
		else if(currentIssue.ishistory || isCptClosed){
			
					if(currentIssue.furnitureid==null){
						$("#furnitureIDTR").hide();
					}
					if(currentIssue.surfaceid==null){
						$("#surfaceIDTR").hide();
					}
					
					if(currentIssue.issueTypeLkp){
						jQuery('#issueType').val(currentIssue.issueTypeLkp.issuetypeid);
					}
					if(currentIssue.issueUrgencyLkp){
						jQuery('#urgency').val(currentIssue.issueUrgencyLkp.urgencyid);
					}if(currentIssue.actionStatusLkp){
						jQuery('#actionStatus').val(currentIssue.actionStatusLkp.actionstatusid);	
					}
					if(currentIssue.responsibleDepartmentLkp){
						jQuery('#responsibleDept').val(currentIssue.responsibleDepartmentLkp.departmentid);	
					}
					if(currentIssue.issueReasonLkp){
						jQuery('#reason').val(currentIssue.issueReasonLkp.reasonid);	
					}
					
					/********Inactive User************/		
					
					//jQuery('#assignedTo').val(currentIssue.assignedTo);
					if(currentIssue.assignedTo!=null && currentIssue.assignedTo!=""){
						if(checkDropdowHasValue('assignedTo',currentIssue.assignedTo)){
							jQuery("#txtAssignedTo").hide();
							jQuery("#assignedTo").show();
							jQuery("#assignedTo").val(currentIssue.assignedTo);
						}
						else
						{
							jQuery("#txtAssignedTo").val(getNameFromEMail(currentIssue.assignedTo));
							jQuery("#txtAssignedTo").show();
							jQuery("#assignedTo").hide();
						}
					}
					/********end************/		
					
					jQuery('#AttchFileListBody').append(htmlStr);
					
					$('#fileAttachmentDiv').hide();					
					if(!isCptClosed){$('.btn01').remove();}
					$('.nxtPrevBTNHolder').remove();
					$(".deleteFileTD").remove();
					$('.lesserbtn').remove()
			
			
		}
		else{
		}
		/*
		jQuery('#issueType').val(currentIssue.issueTypeLkp.issuetypeid);
		jQuery('#urgency').val(currentIssue.issueUrgencyLkp.urgencyid);
		jQuery('#actionStatus').val(currentIssue.actionStatusLkp.actionstatusid);
		jQuery('#responsibleDept').val(currentIssue.responsibleDepartmentLkp.departmentid);		
		jQuery('#reason').val(currentIssue.issueReasonLkp.reasonid);
		jQuery('#assignedTo').val(currentIssue.assignedTo);
		
		jQuery('#AttchFileListBody').append(htmlStr);
		$('#fileDesc').val('');
        $('#file').val('');
		*/
		$(function() {
	        $("#reportedOn").datepicker({ dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
		});
		$(function() {
	        $("#inspectBy").datepicker({ dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
		});
		$(function() {
	        $("#inspectedOn").datepicker({ dateFormat: 'dd/mm/yy',onSelect: populateIssueResolvedDate,
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
		});
		$(function() {
	        $("#resolveDate").datepicker({ dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
		});
		
		$(function() {
	        $("#signOff").datepicker({ dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
		});
		
		$('#urgency').change(populateIssueResolvedDate);
		$('#reason').change(populateIssueInspectBy);
		
		$('#actionStatus').change(populateIssueSignOff);
		
		///
		
		$("#issueTable :input").attr("disabled", true);
		//$("#attachmentDiv :input").attr("disabled", true);
		//$('#attachmentDiv a').attr("disabled", true);
		//btnUpdateIssue	btnCancelIssue btnSaveIssue
		
		$("#btnCancelIssue").hide();
		$("#btnSaveIssue").hide();
		$('.nxtPrevBTNHolder').remove();
		
		 
		
		//$("#btnUpdateIssue").live("click", function(){ 		
		$("#btnUpdateIssue").click(function () {
			$("#issueTable :input").removeAttr("disabled");
			$("#attachmentDiv :input").removeAttr("disabled");
			
			jQuery("#txtAssignedTo").hide();
			jQuery("#assignedTo").show();
			
			
			$('#attachmentDiv a').removeAttr("disabled");
			$("#_row_id").attr("disabled", true);	
			$("#_furnitureid").attr("disabled", true);
			$("#_gid").attr("disabled", true);
			$("#_surfaceid").attr("disabled", true);
			
			//$("#reportedOn").attr("disabled", true);
			$("#resolveDate").attr("disabled", true);
			$("#inspectBy").attr("disabled", true);
			$('#signOff').attr("disabled", true);
			if(assignmentRole){
				$('#assignedTo').attr("disabled", false);
			}else{
				$('#assignedTo').attr("disabled", true);
			}
			
			var selected = $("#reason option:selected");
			 
			 if(selected.val() == "1"){
				 $("#reportedOn").removeAttr("disabled");
			 }else{
				 $("#reportedOn").attr("disabled", true);
			 }
			
			
			$("#btnUpdateIssue").hide();
			$("#btnCancelIssue").show();
			$("#btnSaveIssue").show();
			$('.nxtPrevBTNHolder').remove();
			$('#issue_AttachmentBody').hide();
			
		});
		
		
		
		//$("#btnCancelIssue").live("click", function(){ 	
		$("#btnCancelIssue").click(function () {		
			var issue = new SpatialVue.Issue(map, "sidebar",currentIssue,_geomFeature);
			
		});
		
		issueTabTranslations();
		
    });
		
				
}

function issueTabTranslations(){
	$('#issueid').html($._('Issueid') + ' : ');
	$('#issue_rowid').html($._('row_id') + ' : ');
	$('#issue_furnitureid').html($._('furnitureid') + ' : ');
	$('#issue_surfaceid').html($._('Surfaceid') + ' : ');
	$('#issue_type').html($._('issuetype') + ' : ');
	$('#issue_reported').html($._('reported_on') + ' : ');
	$('#issue_why').html($._('why') + ' : ');
	$('#issue_assigned').html($._('assigned_to') + ' : ');
	$('#issue_problem').html($._('problem') + ' : ');
	$('#issue_urgency').html($._('urgency') + ' : ');
	$('#issue_responsibility').html($._('responsibility') + ' : ');
	$('#issue_inspectby').html($._('inspect_by') + ' : ');
	$('#issue_inspectedon').html($._('inspected_on') + ' : ');
	$('#issue_action_status').html($._('actionstatus') + ' : ');
	$('#issue_resolve_date').html($._('resolve_by') + ' : ');
	$('#issue_signoff').html($._('signoff') + ' : ');
	$('#issue_notes').html($._('notes') + ' : ');
	$('#action').html($._('action') + ' : ');
	$('#actionType').html($._($('#actionType').html()));
	//$('#actionType').html($._(currentIssue.ActionType));	
	$('#issue_edit').attr("value", $._('Edit'));
	$('#issue_cancel').attr("value", $._('Cancel'));
	$('#issue_save').attr("value", $._($('#btnSaveIssue input').attr('value')));
	
	$('#issue_link').attr("title",$._('issue_link'));
	$('#issue_locate').attr("title",$._('locate_on_map'));
	$('#parent_issue').attr("title",$._('go_to_parent'));
	$('#create_job').attr("title",$._('create_job'));
	$('#create_legal').attr("title",$._('create_legal'));
	$('#print_issue').attr("title",$._('print_issue'));
	
	$('#im').html($._('title') + ' : ');
	$('#nt').html($._('notes') + ' : ');
	$('#printIssue').attr("value", $._('print_issue'));
	
	 window.setTimeout("attachmentLabelTranslations()", 1000);
}






function addIssue(_complaintId){
	
	//alert('create Issue for complaint id: '+_complaintId);
	
	
//	jQuery.ajax({
//		url: "bookmark/" + "?" + token,
 //        success: function (data) {
	
			$("#tabs-Tool").empty();
			jQuery.get("resources/templates/viewer/issue.html", function (template) {
				
				addTab('Issue',template);
				
				$('#span-close').attr('title',$._('close_title'));
				
				//jQuery("#workcommitment_issue_accordion").accordion({fillSpace: true});
				
				jQuery("#workcommitment_IssueDetailsTmpl").tmpl().appendTo("#workcommitment_IssueDetailsBody");
				
				$("#issue-complaintid").text("Create Issue For Complaint Id:"+_complaintId); 
				$(function() {
			        $("#reportedOn ").datepicker({ dateFormat: 'dd/mm/yy',
						changeMonth: true,
						changeYear: true
		            }).attr('readonly','readonly');
				});
				$(function() {
			        $("#resolveDate").datepicker({ dateFormat: 'dd/mm/yy',
						changeMonth: true,
						changeYear: true
		            }).attr('readonly','readonly');
				});
				
				
				$("#issueFormTable :input").removeAttr("disabled");				
				
				$("#btnUpdateIssue").hide();				
			});
 //        }
//	});
	
	
}

function showIssuesByComplaintId(){




//	jQuery.ajax({
//		url: "bookmark/" + "?" + token,
 //        success: function (data) {
	
			//$("#tabs-Tool").empty();
			

			jQuery.get("resources/templates/viewer/issuelist.html", function (template) {
				
				//Add tab
				
				addListingTab('Issue List','tab-issuelist',template);
								
			});
 //        }
//	});
	


}


/*function showIssueDetails(_gid){
	
		jQuery.ajax({
			async:false,
			type: "GET",              
		    url: STUDIO_URL + "issue/"+_gid, 
	        success: function (data) {
	        currentIssue=data;	
			
			$("#tabs-Tool").empty();
			jQuery.get("resources/templates/viewer/issue.html", function (template) {
				
				addTab('Issue',template);
				//jQuery("#workcommitment_issue_accordion").accordion({fillSpace: true});
				//$("#issue-complaintid").text("Create Issue For Complaint Id:"+_complaintId); 
				jQuery("#workcommitment_IssueDetailsTmpl").tmpl(currentIssue).appendTo("#workcommitment_IssueDetailsBody");
				jQuery("#IssueID").val(_gid);
				
				$(function() {
			        $("#reportedOn").datepicker({ dateFormat: 'yy-mm-dd'
			        	});
				});
				$(function() {
			        $("#resolveDate").datepicker({ dateFormat: 'yy-mm-dd'
			        	});
				});
				
				$("#issueFormTable :input").attr("disabled", true);
				
				$("#btnCancelIssue").hide();
				$("#btnSaveIssue").hide();
				$('.nxtPrevBTNHolder').remove();
				
				$("#btnUpdateIssue").click(function () {
					$("#issueFormTable :input").removeAttr("disabled");
					
					$("#btnUpdateIssue").hide();
					$("#btnCancelIssue").show();
					$("#btnSaveIssue").show();
					
				});
				
															
			});
       }
	});
	
}*/


function showIssueList(_filter){
	
	//alert(_filter + " Issues");
	//if(_filter == openIssue){
		jQuery.ajax({type: "GET",
			url: STUDIO_URL + "issues/workcommitment/"+loggedUser.id +"/"+_filter,
			async:false,
			success: function (data) {
				$("#workcommitment_IssueTableBody").empty();
				if(data!=null && data.length>0){
					 jQuery.ajax({
		                 async: false,
		                 type: "GET",
		                 url: STUDIO_URL + "issue/issueactions/"+_filter,
		                 success: function(action){
							for(var k=0;k<data.length;k++){
								data[k].resolveBy=convertDateToEuropeanFormat(data[k].resolveBy);
								data[k].inspectBy=convertDateToEuropeanFormat(data[k].inspectBy);
								data[k].assignedTo = getNameFromEMail(data[k].assignedTo);
								data[k]["ActionType"] = $._(getActionType(data[k].gid.toString(), action));
							}
		                 }
					 });
					jQuery("#workcommitment_IssueTmpl").tmpl(data,
							{
								wc_lang: lang
							}
						).appendTo("#workcommitment_IssueTableBody");
					hideWorkcommitmentLink();
					$("#workcommitment_IssueTable").tablesorter();
					
					 $('.clsjob').attr("title", $._('create_job'));
					 $('.clslegal').attr("title", $._('create_legal'));
					 $('.clsassignissue').attr("title", $._('reassign_issue'));
				}
			}
		});
	
//}
}



function issueLink(issue_rowId, issue_gid) {
	var _issue_contacts = issue_contacts;
	if (issue_contacts.length > 0) {
		jQuery.each(issue_contacts, function (i, ctype) {    	
		
			issue_contacts[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
		});
	}
	
	var issue_path=null;
	var historical_issue=null;
	var issue_user=null;
	var issue_complaint=null;
	jQuery.get("resources/templates/viewer/issuelink.html", function (template) {
		
		
		if(!issue_rowId==""){
			jQuery.ajax({
				async: false,
				type: "GET",
				url: STUDIO_URL + "issue/path/" + issue_rowId,
				success: function (data) {
					for(i=0; i<data.length; i++){
					 data[i].lastsurvey = convertDateToEuropeanFormat(data[i].lastsurvey);
					 data[i].pathTypeLkp.type = (lang=='cy')?data[i].pathTypeLkp.math:data[i].pathTypeLkp.type;
            		 data[i].pathLegalstatusLkp.status = (lang=='cy')?data[i].pathLegalstatusLkp.statws:data[i].pathLegalstatusLkp.status;
            		 
            		 if(lang=='cy'){
            			 data[i].classLkp.priority = data[i].classLkp.priority.replace("Priority", "Blaenoriaeth");
            		 }
            		 
					}
					issue_path = data;

				}
			});
			
			jQuery.ajax({
				async: false,
				type: "GET",
				url: STUDIO_URL + "issue/historical/" + issue_rowId,
				success: function (data) {
					for(i=0; i<data.length; i++){
						data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
					}
					historical_issue = data

				}
			});	
		}	
		
		
		jQuery.ajax({  
    		type: "GET",
    		url: STUDIO_URL +"issuelink/complaint/"+issue_gid,
            async:false,
            success: function (complaintData) { 
            	for(i=0; i<complaintData.length; i++){
            		complaintData[i].acknowledgeBy = convertDateToEuropeanFormat(complaintData[i].acknowledgeBy);
            		complaintData[i].reportedOn = convertDateToEuropeanFormat(complaintData[i].reportedOn);
            		complaintData[i].respondBy = convertDateToEuropeanFormat(complaintData[i].respondBy);
            		complaintData[i].complaintNatureLkp.enquiryType = (lang=='en')?complaintData[i].complaintNatureLkp.enquiryType:
            													complaintData[i].complaintNatureLkp.enquiryTypeWelsh;
            	}
            issue_complaint=complaintData;
            
            }
            });
//Add tab

addListingTab($._('issue_link'),'tab-issuelink',template);

$("#issue_ContactTableBody").empty();

jQuery("#issuelink_ContactTmpl").tmpl(_issue_contacts).appendTo("#issue_ContactTableBody");
	

	$("#issuelink_PathTableBody").empty();
	
	//if (issue_path.length > 0 && issue_path != null) {
	if (issue_path != null && issue_path.length != undefined) {
	    jQuery("#issuelink_PathTmpl").tmpl(
	    issue_path).appendTo("#issuelink_PathTableBody");
	
	} else {
	    // jQuery("#furniturelink_PathTmpl").tmpl().appendTo("#furniturelink_PathTableBody");
	}


$("#issuelink_ComplaintTableBody").empty();

if (issue_complaint != null) {
	    jQuery("#issuelink_ComplaintTmpl").tmpl(
	    issue_complaint).appendTo("#issuelink_ComplaintTableBody");
	
	} 


//jQuery("#issuelink_JobTmpl").tmpl().appendTo("#issuelink_JobBody");
//jQuery("#issuelink_LegalTmpl").tmpl().appendTo("#issuelink_LegalBody");


jQuery("#issueLink_accordion").accordion({fillSpace: true});


// added for contact
        $("#issue_addNewContact").click(function () {
            addNewContact('issue', issueID);

        });

        $("#issue_addToExistingContact").click(function () {
            addExistingContact('issue', issueID);

        });

        $('#issueLink_accordion h3 a').click(function (event) {
            // alert(event.currentTarget.id);
            //fetchData(event.currentTarget.id);
        });

      //go to parent path
		$("#gotoParentIssueLink").click(function() {			
			showIssueDetails(issue_gid,issue_rowId);
		});
		
		translateIssueComplaintListing();
		translateIssueContactListing();
		translateIssuePathListing();
				
});





//    }
//});


}

function translateIssueComplaintListing(){
	$('#issuelink_parentlink').html($._('go_to_parent'));
	$('#issuelink_complaintheader').html($._('Complaint'));
	$('#issuelink_complaintid').html($._('complaintid'));
	$('#issuelink_name').html($._('Name'));
	$('#issuelink_type').html($._('type'));
	$('#issuelink_reportedon').html($._('reported_on'));
	$('#issuelink_acknowledgeby').html($._('acknowledge_by'));
	$('#issuelink_respondby').html($._('respond_by'));
}

function translateIssueContactListing(){
	$('#issuelink_contact').html($._('contact'));
	$('#issuelink_addnew').html($._('furniture_link_addcontact'));
	$('#issuelink_addexisting').html($._('furniture_link_existingcontact'));
	$('#issuelink_contactid').html($._('contact_id'));
	$('#issuelink_fname').html($._('contact_fname'));
	$('#issuelink_lname').html($._('contact_surname'));
	$('#issuelink_contacttype').html($._('contact_type'));
	$('#issuelink_position').html($._('contact_position'));
	$('#issuelink_phone').html($._('Phone'));
	$('#issuelink_email').html($._('EMail'));
}

function translateIssuePathListing(){
	$('#issuelink_pathdetail').html($._('furniture_link_path'));
	$('#issuelink_rowid').html($._('row_id'));
	$('#issuelink_typecolmn').html($._('type'));
	$('#issuelink_pathpriority').html($._('furniture_link_path_priority'));
	$('#issuelink_lastsurveydate').html($._('furniture_link_path_lastsurvey'));
	$('#issuelink_legalstatus').html($._('legalstatus'));
}

//path info
function showParentPathInfo(_masterdetails){

//alert('test');

//$("#tabs-Tool").empty();
jQuery.get("resources/templates/viewer/rowinfo.html", function (template) {
addTab('Path Information',template);
$('#span-close').attr('title',$._('close_title'));
jQuery("#RowInfo_MasterDetailsBody").empty();
jQuery("#RowInfo_MasterDetailsTmpl_line").tmpl(_masterdetails).appendTo("#RowInfo_MasterDetailsBody");

$(function() {
    $("#agreementEndDate").datepicker({ dateFormat: 'dd/mm/yy',
		changeMonth: true,
		changeYear: true
    }).attr('readonly','readonly');
});

//jQuery("#workcommitment_issue_accordion").accordion({fillSpace: true});
//$("#issue-complaintid").text("Create Issue For Complaint Id:"+_complaintId); 
//jQuery("#IssueID").val(_issueid);

//$("#issueFormTable input,textarea,select").attr("disabled", true);
											
});


}	


function reassignIssue(_issueId,gid){
	
	$("#tabs-Tool").empty();
	jQuery.get("resources/templates/viewer/issue.html", function (template) {
		
		addTab('Issue',template);
		$('#span-close').attr('title',$._('close_title'));
		jQuery.ajax({type: "GET",
			url: STUDIO_URL + "workcommitment/reassign/"+loggedUser.functionalRole+"/"+loggedUser.id,
			async:false,
			success: function (data) {		
				jQuery("#workcommitment_IssueReassignTmpl").tmpl().appendTo("#workcommitment_IssueDetailsBody");
				jQuery.each(data, function (i, dataType) {    	
					jQuery("#issueReAssignTo").append(jQuery("<option></option>").attr("value", dataType.email).text(dataType.name));        
			 });
			
			}
		});
		jQuery("#reassign-issueId").html("Re-assign Issue id "+ _issueId+ " to User :");	
		jQuery("#gId").val(gid);
		$(function() {
			var now = new Date();
			$("#resolvebydate").datepicker({ dateFormat: 'dd/mm/yy',minDate: 0,
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');		
			$("#resolvebydate").datepicker('setDate', new Date());	
	});
						
													
	});

}

function addToExistingIssue(_complaintId){
	
	$("#tabs-Tool").empty();
	jQuery.get("resources/templates/viewer/issue.html", function (template) {
		
		addTab('Assign Issue',template);
		$('#span-close').attr('title',$._('close_title'));
		
		jQuery("#workcommitment_AddToExistingIssueTmpl").tmpl().appendTo("#workcommitment_IssueDetailsBody");
		
		
		jQuery("#complaint-issue").html("Add complaint "+ _complaintId+ " to Issue Id :");
						
													
	});
	
}

function addEditIssue(){
	
	var editing = new SpatialVue.Editing(map, "sidebar");
	
}


function refreshIssueContact(_gid) {
 var issue_contact;
    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "issue/" + _gid,
        success: function (data) {
        	issue_contact = data.contacts;
        	
        	if (issue_contact.length > 0) {
        		jQuery.each(issue_contact, function (i, ctype) {    	
        		
        			issue_contact[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
        		});
        	}
        	
        	
        	$("#issue_ContactTableBody").empty();
            jQuery("#issuelink_ContactTmpl").tmpl(issue_contact).appendTo("#issue_ContactTableBody");
            /*
			$("#issue_ContactTable").tablesorter({
				widgets: ['zebra']
			
			});
            
			if ($('#issue_ContactTableBody').children().length > 0) {
                $("#issue_ContactTable").tablesorter({
                    //debug : false,
                    sortList: [
                        [0, 0]
                    ],
                    textExtraction: function (node) {
                        if (node.children.length > 0) {
                            return node.textContent;
                        } else {
                            return node.innerHTML;
                        }
                    },
                    widgets: ['zebra']
                });
            } else {
                $("#issue_ContactTable").tablesorter();
            }
			
			*/
        }
    });
    
}





function applyIssueChanges() {
	validForm=true;
    var feature = _geomFeature;
    var editSelectionSymbolizer = {
        "Point": {
            pointRadius: 4,
            graphicName: "square",
            fillColor: "#CC9900",
            fillOpacity: 1,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeColor: "#333333"
        },
        "Line": {
            strokeWidth: 3,
            strokeOpacity: 1,
            strokeColor: "#666666",
            strokeLinecap: "square",
            strokeDashstyle: "dash"
        },
        "Polygon": {
            strokeWidth: 2,
            strokeOpacity: 1,
            strokeColor: "#CC9900",
            fillColor: "#CC9900",
            fillOpacity: 0.3,
            strokeLinecap: "square",
            strokeDashstyle: "solid"
        },
        "RegularPolygon": {
            strokeWidth: 2,
            strokeOpacity: 1,
            strokeColor: "#CC9900",
            fillColor: "#CC9900",
            fillOpacity: 0.3
        }
    };

    var style = new OpenLayers.Style();
    style.addRules([new OpenLayers.Rule({
        symbolizer: editSelectionSymbolizer
    })]);
    var styleMap = new OpenLayers.StyleMap({
        "default": style
    });

    var wfs = null;

    var featPrefix = null;
    var targetNamespace = null;
    var currentFeature;

    var layerName = 'Issue';
    objLayer = map.getLayersByName(layerName)[0];
    var _wfsurl = objLayer.url.replace(new RegExp("wms", "i"), "wfs");
    var _wfsSchema = _wfsurl + "request=DescribeFeatureType&version=1.1.0&typename=" + layerMap[objLayer.name];
    var geometryColName = 'the_geom';

    var actualLayerName = layerMap[objLayer.name];
    var pos = actualLayerName.indexOf(":");
    var featType = null;
    if (pos > 1) featType = actualLayerName.substring(pos + 1);
    else featType = actualLayerName;

    if (!isediting) {
        var _projection = new OpenLayers.Projection(
        objLayer.projection.projCode);
        wfs = map.getLayersByName("WFS")[0];
        if (wfs != undefined) {
            map.removeLayer(wfs);
        }

        if (_saveStrategy != null) {
            // this.Unregister();
            // _saveStrategy.events.unregister();
        }
        _saveStrategy = new OpenLayers.Strategy.Save();

        _saveStrategy.events.register('success', null, onIssueGeomSave);

        if (OpenLayers.Map.activelayer.name == CONST_SELECT_LAYER) {} else {

            $.ajax({
                url: PROXY_PATH + _wfsSchema,
                dataType: "xml",
                async: false,
                success: function (data) {
                    var featureTypesParser = new OpenLayers.Format.WFSDescribeFeatureType();
                    var responseText = featureTypesParser.read(data);
                    var featureTypes = responseText.featureTypes;
                    targetNamespace = responseText.targetNamespace;
                    featPrefix = responseText.targetPrefix;
                }
            });

            var _protocol = new OpenLayers.Protocol.WFS({
            	//headers: { Authorization : "Basic YWRtaW5AZXJ5cmktbnBhLmdvdi51azpQNHJDM3J5cjE="},
                version: "1.1.0",
                srsName: objLayer.projection.projCode,
                url: _wfsurl,
                featureType: featType,
                geometryName: geometryColName,
                featurePrefix: featPrefix,
                featureNS: targetNamespace,
                schema: _wfsSchema
            });

            wfs = new OpenLayers.Layer.Vector("WFS", {
                reportError: true,
                strategies: [_saveStrategy],
                projection: _projection,
                protocol: _protocol,
                isBaseLayer: false,
                visibility: true,
                styleMap: styleMap,
                displayInLayerSwitcher: false
            });
            map.addLayers([wfs]);
            var layerfeature = null;
        }
    //  Get the feature
        var filter = new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.EQUAL_TO,
            property: "gid",
            value: _gid
        })
        
        //var layerName = activeLayer.name; //OpenLayers.Map.activelayer.name;
    	var result_data = null;
    	 $.ajax({
            url: STUDIO_URL + 'layer/' + layerName + "?" + token,
            async:false,
            success: function (data) {
           	 var uniqueField;
           	 var displayableCols = data.layerFields;
           	    if(displayableCols.length > 0){
           	    	uniqueField = displayableCols[0].keyfield;
           	    	
           	    	//Removed the gid field
           	    	for ( var col in displayableCols) {
           	    		if(displayableCols[col].field == uniqueField){
    	       	    		displayableCols.splice(col, 1);
    	       	    		break;
           	    		}
           	    	}
           	    }
           	    
           	   if(displayableCols.length > 0 && uniqueField != undefined){
           		   result = new Result(layerName, targetNamespace, filter, true, undefined, undefined);
                      //sortResultInDesc(filter, result);
                      feature = result.getQueryResult(displayableCols, uniqueField, 
                    		  "the_geom", false);
                      
           	   }
            }
    	 });
    }
    
	if (isediting) {
        layerfeature = feature;
    } else {
        //layerfeature = new OpenLayers.Feature.Vector(feature);
    	 layerfeature = feature[0];
    	 delete layerfeature.attributes[uniqueField];
         layerfeature.state = OpenLayers.State.UPDATE;
    }
    
	if (layerfeature.attributes == undefined) {
        layerfeature = layerfeature.feature;
    }

    ////////SET Attributes
	
    layerfeature.attributes['row_id'] = $('#_row_id').val();
    
    if ($('#_furnitureid').length>0 && trim($('#_furnitureid').val()).length != 0) {	
    	layerfeature.attributes['furnitureid'] = $('#_furnitureid').val();
    }
    if ($('#_surfaceid').length>0 && trim($('#_surfaceid').val()).length != 0) {	
    	layerfeature.attributes['surfaceid'] = $('#_surfaceid').val();
    }
		
    layerfeature.attributes['issuetype'] = $('#issueType').val();	
    
	
    if (trim($('#reportedOn').val()).length != 0) {
		layerfeature.attributes['reported_on'] = convertDateToUSFormat($('#reportedOn').val());
	}
	else {
        jAlert('Please provide value for Reported On');
        return;
    }
    layerfeature.attributes['why'] = $('#reason').val();	
	
    layerfeature.attributes['assigned_to'] = $('#assignedTo').val();
	    	
    if (trim($('#problem').val()).length != 0) {
    	layerfeature.attributes['problem'] = $('#problem').val();
    }	
    layerfeature.attributes['urgency'] = $('#urgency').val();
	
    layerfeature.attributes['responsibility'] = $('#responsibleDept').val();
	
	if (trim($('#inspectBy').val()).length != 0) {
		layerfeature.attributes['inspect_by'] = convertDateToUSFormat($('#inspectBy').val());
	}
	else {
        jAlert('Please provide value for InspectBy');
        return;
    }    
    
	if (trim($('#inspectedOn').val()).length != 0) {		
		layerfeature.attributes['inspected_on'] = convertDateToUSFormat($('#inspectedOn').val());
	}
		
	layerfeature.attributes['actionstatus'] = $('#actionStatus').val();	
	if($('#actionStatus').val() == "3"){ //Status is complete
		jAlert('Action status value selected is invalid');
		return;
	}

	
	if (trim($('#resolveDate').val()).length != 0) {
    layerfeature.attributes['resolve_by'] = convertDateToUSFormat($('#resolveDate').val());
	
    }  
    if (trim($('#signOff').val()).length != 0) {
        layerfeature.attributes['signoff'] = convertDateToUSFormat($('#signOff').val());
    }
    if (trim($('#notes').val()).length != 0) {	
    	layerfeature.attributes['notes'] = $('#notes').val();
    }
    
    if(layerfeature.attributes['actionstatus'] == "2"){
    	layerfeature.attributes['ishistory'] = true;
    }else{
    	layerfeature.attributes['ishistory'] = false;
    }
	
	
	////////
	if (savetype == 'NEW') {
        layerfeature.state = OpenLayers.State.INSERT;
    } else if (savetype == 'EDIT') {
        layerfeature.state = OpenLayers.State.UPDATE;
    }

    if (!isediting) {
        wfs.addFeatures([layerfeature]);
    }
	return validForm;
}

function saveIssueGeom() {
    _saveStrategy.save();

}

function onIssueGeomSave(event) {
    objLayer.redraw(true);
    
    var insertId = event.response.insertIds[0];
    var fid = insertId.substr(insertId.indexOf('.') + 1);    
    /*if (!isediting) {
        jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "furniture/updatehistory/" + furnitureID,
            success: function (data) {
                jAlert('Data saved');
                var furniture = new SpatialVue.Furniture(map, "sidebar", currentFurniture, _geomFeature, fid);
            }
        });

    } else {
        jAlert('Data saved');

        $('#edit_content').empty();
    }*/
    
    //updating path info
	updateRowPathIssueCount(_gid);
	
	//updateing complaint
	//close complaints against job/issue
	var issueStatusId=$('#actionStatus').val();	
	var completionDate=$('#signOff').val();	
	/*if(issueStatusId==2){
		$.ajax({
	    	type: "POST", 
	    	url: "complaint/signoff/",
	    	data: {issueId:_gid,signoffDate:completionDate},
	        async:false,
			success: function (savestatus) {    				
	       }

	    });
	}*/
	
	
	
    $("#issueTable :input").attr("disabled", true);
	//$("#attachmentDiv :input").attr("disabled", true);
	//$('#attachmentDiv a').attr("disabled", true);
		
	$("#btnCancelIssue").hide();
	$("#btnSaveIssue").hide();
	$('.nxtPrevBTNHolder').remove();
	
	g_wfs = map.getLayersByName("WFS")[0];
	if(g_wfs != undefined){
		map.removeLayer(g_wfs);
	}
    //jAlert('Data saved');
    jAlert( $._('alert_successfully_saved'), $._('alert'));
	$('#popup_ok').attr("value", $._('popupOk'));
    
    var issue = new SpatialVue.Issue(map, "sidebar", currentIssue, _geomFeature, _gid);

    
    
}

function saveIssue() {
    
	if(applyIssueChanges()){
			  
		if (!isediting) {
        saveIssueGeom();
		}
		else{
			//jAlert('Click on Save button to save the Issue', 'Issue');
			jAlert( $._('alert_click_Save_button') + ' ' + $._('Issue'), $._('Issue'));
			$('#popup_ok').attr("value", $._('popupOk'));
		}
	}
	/*
	applyIssueChanges();
    if (!isediting) {
        saveIssueGeom();
    }
    else{
    	jAlert('Click on Save button to save the Issue', 'Issue');	    
    }
	*/
}



function createIssueOnPath(_gid,_rowid){

	
	$("#tab").tabs( "select" , 0 );	
	zoomToLayerFeature('RoW_Path','Line','gid',_gid);
	var editing = new SpatialVue.Editing(map, "sidebar",undefined,_rowid,_gid,'Issue','RoW_Path');	
}
function createSurfaceIssue(_gid,_rowid){

	//call editing and pass rowid
	$("#tab").tabs( "select" , 0 );
	zoomToSurface();
	var editing = new SpatialVue.Editing(map, "sidebar",undefined,_rowid,'Issue');
}


function createComplaintIssue(_gid,_complaintid,_complaintReportedOn){
	complaintReportedOn=_complaintReportedOn;
	//call editing and pass rowid
	
	$.ajax({
    	type: "GET", 
    	url: "complaint/issueid/"+_complaintid,
    	async:false,
        success: function (data) {
        	if(data !=0){
        			//jConfirm('Issue id <strong>'+ data+'</strong> already exists with this complaint , do you want to re-assign new issue', 'Confirmation', function (response) {        	        
        			jConfirm($._('Issue') +' <strong>'+ data+'</strong> '+$._('issue_exists'), $._('confirmation'), function (response) {	
        			if (response) {
        	        	zoomToComplaintOnMap(_complaintid);
        	        	var editing = new SpatialVue.Editing(map, "sidebar",undefined,_complaintid,_gid,'Issue','Complaint_Layer');
        	        }
    	    });
        				
        			$('#popup_ok').attr("value", $._('popupOk'));
	        		$('#popup_cancel').attr("value", $._('_cancel'));
           	}
        	else{
        		zoomToComplaintOnMap(_complaintid);
	        	var editing = new SpatialVue.Editing(map, "sidebar",undefined,_complaintid,_gid,'Issue','Complaint_Layer');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        	jAlert('Please try again ');
        }
    });
	
}

function createIssueOnFurniture(_gid,_rowid,_furnitureid){

	//call editing and pass rowid
	$("#tab").tabs( "select" , 0 );
	//zoomToRowPath();
	zoomToLayerFeature('Furniture','Point','gid',_gid);
	var editing = new SpatialVue.Editing(map, "sidebar",_furnitureid,_rowid,_gid,'Issue','Furniture');
	
}

function createIssueOnAccessland(_gid,_rowid){


	$("#tab").tabs( "select" , 0 );	
	zoomToLayerFeature('Access_Land','Polygon','gid',_gid);
	var editing = new SpatialVue.Editing(map, "sidebar",undefined,_rowid,_gid,'Issue','Access_Land');
	
}


//added for assigning 
function addComplaintToExistingIssue(_complaintId){
	
	$("#tabs-Tool").empty();
	jQuery.get("resources/templates/viewer/issue.html", function (template) {
		addTab($._('assign_issue'),template);
		$('#span-close').attr('title',$._('close_title'));
		
		
		jQuery("#workcommitment_AddToExistingIssueTmpl").tmpl().appendTo("#workcommitment_IssueDetailsBody");
		$('#search_issue').html($._('assignissuesearch') + ' : ');
		$('#search_issue_map').html($._('searchissueonmap') );
		$('#search_issue_id').html($._('searchissuebyid') );
		$('#zoomtoComplaint').html($._('zoomtoComplaint') );
	
		jQuery("#reassignissue-complaintId").html($._('reassign_issue_complaintId') + ' : '+ _complaintId);		
		$('#zoomtoIssue').html($._('closedjob_locate') );
		$('#btnAssignIssue input').val($._('assign_issue'));
		
		
		jQuery("#complaintId").val(_complaintId);
		jQuery("#complaintId").hide();
		jQuery("#divSearchIssue").hide();
	
	$("#zoomtoComplaint").click(function () {	
		$("#tab").tabs( "select" , 0 );
		zoomToComplaintOnMap(_complaintId);
	});
	$("#btnSearchIssue").click(function () {
		//$("#tab").tabs( "select" , 0 );
		searchIssuebyId();
	});
	$("#zoomtoIssue").click(function () {	
		$("#tab").tabs( "select" , 0 );
		var fieldVal=jQuery("#issueId").val();
		zoomToLayerFeature('Issue','Point','gid',fieldVal);
	});
	$("#issueId").hide();
	$("#zoomtoIssue").hide();

	
	var radios =$('input[name=assignIssueToComplaint]');//document.forms["assignIssueForm"].elements["assignIssue"];
	for(var i = 0, max = radios.length; i < max; i++) {
	    radios[i].onclick = function() {
	    	if(this.value=="searchOnMap"){
	    		
	    		$("#issueId").hide();
	    		$("#zoomtoIssue").hide();
	    		$("#tab").tabs( "select" , 0 );
				
	    		var selection_vector = new OpenLayers.Layer.Vector("selection_vector", {
	    	        reportError: true,
	    	        projection: "EPSG:27700",
	    	        isBaseLayer: false,
	    	        visibility: true,        
	    	        displayInLayerSwitcher: false
	    	    });
				
				
				editControls_issue = { 
	        point: new OpenLayers.Control.DrawFeature(
	                selection_vector, OpenLayers.Handler.Point, {
	                	displayClass:"olControlDefault",
	                    callbacks: {
	                        done: function (p) {
	                        	
	                        	var pointFeature = new OpenLayers.Feature.Vector(p);
		                    var issueLyr=map.getLayersByName('Issue')[0];
		                    if(issueLyr.selectable){
			                	var objSelect = new Selection(pointFeature, issueLyr);
			                	filter = objSelect.creationSelectionCriteria(this);
			                	objSelect.displaySelection(filter, selectionSymbolizer, issueLyr);
			                	var result=objSelect.getResult(filter, true);
			                	if(result[0]){
			                		if(result[0].data)
			                		var issueid=result[0].data.gid;
									jQuery("#issueId").val(issueid);
			                		//jAlert('Issue '+issueid+' selected', 'Selection');
									jAlert($._('Issue')+' '+issueid+' '+$._('selected'), $._('selection'));									
									$('#popup_ok').attr("value", $._('popupOk'));
									
			                	}
								else
									jAlert('No Issue Selected', 'Selection');
			                	//OpenLayers.Map.activelayer.selectFilter = filter;
		                	}else{
		                		jAlert('Layer is not selectable', 'Selection');
		                	}
	                        		                        	
	                        }
	                    }
	           })
	    };
	
	
					for (var key in editControls_issue) {
							map.addControl(editControls_issue[key]);
						}
			
	         toggleEditControl_Issue('point');       	
	    	}else if(this.value=="searchOnissueList"){
	    		
	    		$("#issueId").val('');
	    		$("#issueId").show();
	    		$("#zoomtoIssue").show();
	    		
	    		
	    	}
	    	
	    }
	}
	});
}


	function saveAssignedIssueOnComplaint(){
		
		var _complaintId=jQuery("#complaintId").val();
		var issueId=jQuery("#issueId").val();
		if(issueId==null || issueId==''){
		//jAlert('Please Select an issue');
			jAlert( $._('pls_sel_issue'), $._('alert'));
			$('#popup_ok').attr("value", $._('popupOk'));
		
		return;
		}else{
		for (key in editControls_issue) {
		var control = editControls_issue[key];
		
			control.deactivate();
		
	}	
	if(OpenLayers.Map.activelayer.name == 'Access_Land'){
				clearSelection(true, OpenLayers.Map.activelayer);
			}else{
				clearSelection(true);
			}
			$.ajax({
		    	type: "GET", 
		    	url: "complaint/issueid/"+_complaintId,
		    	async:false,
		        success: function (data) {
		        	if(data !=0){
		        		jConfirm($._('Issue') +' <strong>'+ data+'</strong> '+$._('issue_exists'), $._('confirmation'), function (response) {
		        	        if (response) {
		        	        	updateComplaintIssueId(_complaintId,issueId);
		        	        }
	        	    });
		        		$('#popup_ok').attr("value", $._('popupOk'));
		        		$('#popup_cancel').attr("value", $._('_cancel'));
		           	}
		        	else{
		        		updateComplaintIssueId(_complaintId,issueId);
		            }
		        },
		        error: function (XMLHttpRequest, textStatus, errorThrown) {
		        	jAlert('Please try again ');
		        }
		    });
			
		
		}
		   		
	}
	
	function updateComplaintIssueId(_complaintId,issueId){
		$.ajax({
	    	type: "POST", 
	    	url: "complaint/updateissueid",	
	    	data: {complaintId:_complaintId,issueId:issueId},
	        async:false,
	        success: function (data) {
	        	if(data==1){
	        		//jAlert('Issue Successfully assigned to Complaint');
	        		
	        		jAlert( $._('assignIssueToCpt'), $._('alert'));
	    			$('#popup_ok').attr("value", $._('popupOk'));
	        		closeDialog('issuediv');
	           	}
	        	else if(data==2){
	        		jAlert('Please try again');
	           	}
	        	else if(data==3){
	        		jAlert('Issue not exists');
	            }
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	        	jAlert('Please try again ');
	        }
	    });
	}
	
	function searchIssuebyId(){
		var issueId=jQuery("#issueId").val();
		if(issueId==null || issueId==''){
		jAlert('Please Enter a issue id');
		return;
		}else{
		jQuery.ajax({
			async:false,
			type: "GET",              
			url: STUDIO_URL + "issue/"+_gid,        		               
			success: function (data) {
			if(data.gid)
        	jQuery("#issueId").val(data.gid);
			else
			jAlert('No Result found.');
			}
		});
		}
		   		
	}
	
	
	function toggleEditControl_Issue(element) {
	
	for (key in editControls_issue) {
		var control = editControls_issue[key];
		if (element == key) {
			control.activate();
		} else {
			control.deactivate();
		}

	}
	
	/* Deactive markup controls*/
	for (key1 in markupControls) {
		var control = markupControls[key1];
		control.deactivate();
	}
	/*Deactive map controls*/
	for (mapKey in mapControls) {
		var control = mapControls[mapKey];
		control.deactivate();
	}
	
	/* Deactive markup controls*/
	for (key1 in markupControls) {
		var control = markupControls[key1];
		control.deactivate();
	}
}
	

function reassignIssueSurveyor(){
	
	 $("#reassignIssueForm").validate({

	        rules: {
	        	issueReAssignTo: "required",
	        	resolvebydate : "required"
	   
	        },
	        messages: {
	        	issueReAssignTo: "Please Select User",
	        	resolvebydate: "Please Select Resolve Date"
	        }
	    });
	    
	    if ($("#reassignIssueForm").valid()) {
	    	var selectedSurveyor = $("#issueReAssignTo").val();
			var gId = $("#gId").val();
			var resolveByDate = convertDateToUSFormat($("#resolvebydate").val());
			jQuery.ajax({type: "POST",
				url: STUDIO_URL + "issue/reassignUser",
				data: {surveyor:selectedSurveyor,issueId:gId,resolvebydate:resolveByDate}, 
				async:false,
				success: function (data) {	
					if(data){
						jAlert("Issue has been assigned successfully");	
						refreshIssueAccrodium();
					}
					else{
						jAlert("Please Try Again");
					}
				}
			});
		}
	    else{
	    	return;
	    }
		
	}

function refreshIssueAccrodium()        
{
	jQuery("#workcommitment_IssueTableBody").empty();
	jQuery.ajax({type: "GET",
		url: STUDIO_URL + "issues/workcommitment/"+loggedUser.id+"/open",
		async:false,
		success: function (data) {	
			if(data!=null && data.length>0){
				jQuery.ajax({
	                 async: false,
	                 type: "GET",
	                 url: STUDIO_URL + "issue/issueactions/open",
	                 success: function(action){
						for(var k=0;k<data.length;k++){
							data[k].resolveBy=convertDateToEuropeanFormat(data[k].resolveBy);
							data[k].inspectBy=convertDateToEuropeanFormat(data[k].inspectBy);
							data[k].assignedTo = getNameFromEMail(data[k].assignedTo);
							data[k]["ActionType"] = $._(getActionType(data[k].gid.toString(), action));
						}
	                 }
	            });
			jQuery("#workcommitment_IssueTmpl").tmpl(data,
					{
						wc_lang: lang
					}
			).appendTo("#workcommitment_IssueTableBody");
			hideWorkcommitmentLink();
			$("#workcommitment_IssueTable").tablesorter();
			}
		}
	});
}

function zoomToIssue(_igid){
	
	$("#tab").tabs( "select" , 0 );
	zoomToLayerFeature('Issue','Point','gid',_igid);
	
}


function gotoParentLayer(_gid,_rowId,_furnitureid,_surfaceid){
	
	
	if(_furnitureid!=""){
		var furGid=getGid('furniture',_furnitureid);
		
		showFurnitureDetails(furGid, _furnitureid);
		
		
		
		
	}
	else if(_surfaceid!=""){
		
		var surfaceGid=getGid('surface',_surfaceid);
		
		showSurfaceDetails(surfaceGid, _surfaceid)
	}
	else if(_rowId!=""){
		
		if(_rowId.indexOf('AL') == 0){
			
			var alGid=rowGid=getGid('accessland',_rowId);
			
			
			showAccessLandDetails(alGid,_rowId);
			
		}
		if(_rowId.indexOf('CPT') == 0){
			
			showComplaintDetails(_rowId);
			
			
		}
		else{
			
			var pathGid=getGid('rowpath',_rowId);
			
			showPathDetails(pathGid, _rowId);
		}

		
		//accessland	rowpath
		
		
		
	}
	else{
		jAlert('No parent for this Issue');
	}
	
}

function getGid(parentLyr,parentId){
	var parentGid=null;
	jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "parent/"+parentLyr+"/"+ parentId,
        success: function (data) {
        	
        	parentGid = data;

        }
    });
	
	return parentGid;
}
var printIssue = function() {
	var maptitle=$('#issue_mapTitle').val();
	var wardenName=null;
	if(maptitle==""){
		jAlert('Enter Title');
		return;
	}
	//alert(currentIssue.rowId +'-'+  currentIssue.furnitureid + '-'+currentIssue.reportedOn );
	
	$.ajax({ 
		async:false,
		type: "POST",
		url: STUDIO_URL + "user/email/?" + token,
		data: {email:currentIssue.assignedTo},								
		success: function (userdetail) {	
			wardenName=userdetail.name;
			jQuery("#hid-warden").val(wardenName);
			}
	});
	
	
	$("#scale-interval option").each(function() {
	if($(this).text() == '5000') {
    $(this).attr('selected', 'selected');            
	}                        
	});
	$('#scale-interval').change();
	
	var lyrs = "";
	// map.layers[0].getVisibility()
	var layerurl = "";
	var legendurl = "";
	var layer = null;
	var bbox = null;

	for (l = 0; l < map.layers.length; l++) {
		layer = map.layers[l];
		if (map.layers[l] instanceof OpenLayers.Layer.WMS
				&& map.layers[l].getVisibility() && layer.name != 'Dummy'
				&& layer.name != 'Markers' && layer.name != 'markup'
				&& layer.name.indexOf("Google_") == -1) {

			bbox = layer.getExtent().left + ',' + layer.getExtent().bottom
					+ ',' + layer.getExtent().right + ','
					+ layer.getExtent().top;

			lyrs = lyrs + layerMap[layer.name] + ',';

			// layerurl=layerurl+layer.getFullRequestString({})+"&BBOX="+layer.getExtent().left+','+layer.getExtent().bottom+','+layer.getExtent().right+','+layer.getExtent().top+"|";
			layerurl = layerurl + layer.getFullRequestString({}) + "|";

			legendurl = legendurl
					+ layer.name
					+ "~"
					+ layer.getFullRequestString({}).replace("GetMap",
							"GetLegendGraphic") + "&Layer="
					+ layerMap[layer.name] + "|";

		}

	}

	layerurl = layerurl.substring(0, layerurl.length - 1);
	legendurl = legendurl.substring(0, legendurl.length - 1);
	
	jQuery("#hid-title").val($('#issue_mapTitle').val());
	jQuery("#hid-notes").val($('#issue_mapNotes').val());
	jQuery("#hid-layerUrl").val(layerurl);
	jQuery("#hid-legendUrl").val(legendurl);
	jQuery("#hid-bbox").val(bbox);	
	jQuery("#mapScale").val($("#scale-interval option:selected").text());
	jQuery("#access_land_sld_file").val(access_land_sld);	
	jQuery("#cosmetic_sld_file").val(cosmetic_sld_file);
	
	jQuery("#hid-issueId").val(currentIssue.gid);
	jQuery("#hid-rowId").val(currentIssue.rowId);
	jQuery("#hid-furnitureId").val(currentIssue.furnitureid);
	jQuery("#hid-issueType_en").val(currentIssue.issueTypeLkp.type);
	jQuery("#hid-issueType_cy").val(currentIssue.issueTypeLkp.math);
	jQuery("#hid-reportedOn").val(currentIssue.reportedOn);
	//jQuery("#hid-warden").val(wardenName);
	jQuery("#hid-problem").val(currentIssue.problem);	
	jQuery("#hid-gridRef").val(gridref);
	if(currentIssue.attachments.length>0){
		jQuery("#hid-attachmentUrl").val(encodeURI(currentIssue.attachments[0].filepath));
	}
	
	// set Action
	$("#printIssueForm").attr("action", "print/issue/?" + token);

	var format = new OpenLayers.Format.WMC({
		'layerOptions' : {
			buffer : 0
		}
	});
	var wmc_text = format.write(map);
	document.getElementById('wmc').value = wmc_text;
	document.forms["printIssueForm"].submit();

}