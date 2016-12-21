var pending = "pending";
var backlog = "backlog";
function showSurveyDetails(_surveyId){
	
	
	//	jQuery.ajax({
	//	url: "bookmark/" + "?" + token,
	//        success: function (data) {
	
			$("#tabs-Tool").empty();
			jQuery.get("resources/templates/viewer/survey.html", function (template) {
				
				addTab('Survey',template);
				$('#span-close').attr('title',$._('close_title'));
				jQuery("#workcommitment_SurveyDetailsTmpl").tmpl().appendTo("#workcommitment_SurveyDetailsBody");
				
				jQuery("#SurveyID").val(_surveyId);
				
				$("#surveyFormTable :input").attr("disabled", true);
				
				$("#btncancelSurvey").hide();
				$("#btnSaveSurvey").hide();
				
				$("#btnUpdateSurvey").click(function () {
					$("#surveyFormTable :input").removeAttr("disabled");
					
					$("#btnUpdateSurvey").hide();
					$("#btncancelSurvey").show();
					$("#btnSaveSurvey").show();
					
				});
				
				
															
			});
	//        }
	//});
	
	
}

function showSurveyList(_filter){
	
	if(_filter == pending){
	jQuery.ajax({type: "GET",
		url: STUDIO_URL + "rowpath/survey/"+loggedUser.id + "/pending",
		async:false,
		success: function (data) {		
			$("#workcommitment_SurveysTableBody").empty();
			if(data!=null && data.length>0){
				for(var k=0;k<data.length;k++){
					data[k].dateofnextsurvey=convertDateToEuropeanFormat(data[k].dateofnextsurvey);
					data[k].assignedTo = getNameFromEMail(data[k].assignedTo);
					if(lang == 'cy'){
						data[k].classLkp.priority = data[k].classLkp.priority.replace("Priority", "Blaenoriaeth");
					}
				}
				jQuery("#workcommitment_SurveysTmpl").tmpl(data).appendTo("#workcommitment_SurveysTableBody");
				$("#workcommitment_SurveysTable").tablesorter();
			}
			
		}
	});
	
	}else if(_filter == backlog){
		jQuery.ajax({type: "GET",
			url: STUDIO_URL + "rowpath/survey/"+loggedUser.id + "/backlog",
			async:false,
			success: function (data) {	
				for(var k=0;k<data.length;k++){
					data[k].dateofnextsurvey=convertDateToEuropeanFormat(data[k].dateofnextsurvey);
					data[k].assignedTo = getNameFromEMail(data[k].assignedTo);
					if(lang == 'cy'){
						data[k].classLkp.priority = data[k].classLkp.priority.replace("Priority", "Blaenoriaeth");
					}
				}
				$("#workcommitment_SurveysTableBody").empty();
				if(data!=null && data.length>0){
					jQuery("#workcommitment_SurveysTmpl").tmpl(data).appendTo("#workcommitment_SurveysTableBody");
					$("#workcommitment_SurveysTable").tablesorter();
				}
				
			}
		});
	}else{
		jQuery.ajax({type: "GET",
			url: STUDIO_URL + "rowpath/survey/"+loggedUser.id + "/all",
			async:false,
			success: function (data) {
				$("#workcommitment_SurveysTableBody").empty();
				for(var k=0;k<data.length;k++){
					data[k].dateofnextsurvey=convertDateToEuropeanFormat(data[k].dateofnextsurvey);
					data[k].assignedTo = getNameFromEMail(data[k].assignedTo);
				}
				if(data!=null && data.length>0){
					jQuery("#workcommitment_SurveysTmpl").tmpl(data).appendTo("#workcommitment_SurveysTableBody");
					$("#workcommitment_SurveysTable").tablesorter();
				}
				
			}
		});
	}
	
	//hiding backlog,pending link and assignmaent
	hideWorkcommitmentLink();
	 $('.clssurvey').attr("title", $._('reassign_survey'));
}

function reassignSurvey(_surveyId, gId,_dateofnextsurvey){
	
	

	
			$("#tabs-Tool").empty();
			jQuery.get("resources/templates/viewer/survey.html", function (template) {
				
				addTab($._('survey'),template);
				$('#span-close').attr('title',$._('close_title'));
				jQuery.ajax({type: "GET",
					url: STUDIO_URL + "workcommitment/reassign/"+loggedUser.functionalRole+"/"+loggedUser.id,
					async:false,
					success: function (data) {		
						jQuery("#workcommitment_SurveyReassignTmpl").tmpl().appendTo("#workcommitment_SurveyDetailsBody");
						jQuery("#SurveyReAssignTo").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
						jQuery.each(data, function (i, dataType) {    	
							jQuery("#SurveyReAssignTo").append(jQuery("<option></option>").attr("value", dataType.email).text(dataType.name));        
					 });
					
					}
				});
				jQuery("#reassign-surveyId").html($._('reassign_survey_id')+': '+ _surveyId);
				jQuery("#gId").val(gId);
				$(function() {
				var now = new Date();
				$("#nextsurveyDate").datepicker({ dateFormat: 'dd/mm/yy',minDate: 0,
					changeMonth: true,
					changeYear: true
	            }).attr('readonly','readonly');		
				$("#nextsurveyDate").datepicker('setDate', new Date());	
				});
				//check for Warden(Head Warden,Seasonal Warden,Area Wardens) i.e. role(8,10,9)
				var isWarden=isSuperUserRole = checkRole(WARDEN_ROLEID, loggedUser.functionalRole);
				if(isWarden){
					if(_dateofnextsurvey)
					$("#nextsurveyDate").datepicker('setDate', _dateofnextsurvey);	
					else
					$("#nextsurveyDate").datepicker('setDate', new Date());	
					$("#nextsurveyDate").attr("disabled", true);
				}
								
				translateReassignSurvey();											
			});
	
	
}


function translateReassignSurvey(){
	$('#survey_reassign').html($._('reassign_to'));
	$('#survey_next').html($._('next_survey_due'));
	$('#btnSave_assignto').attr("value", $._('Save'));
}


function reassignSurveyor(){
	 $("#surveyReassignForm").validate({

	        rules: {
	        	SurveyReAssignTo: "required",
	        	nextsurveyDate : "required"
	   
	        },
	        messages: {
	        	issueReAssignTo: "Please Select Re-Assign To",
	        	resolvebydate: "Please Select Next Survey Date"
	        }
	    });

	    
	    
	    if ($("#surveyReassignForm").valid()) {
	    	var selectedSurveyor = $("#SurveyReAssignTo").val();
	    	var gId = $("#gId").val();
	    	var dateofnextsurvey = convertDateToUSFormat($("#nextsurveyDate").val());
	    	jQuery.ajax({type: "POST",
	    		url: STUDIO_URL + "rowpath/reassignUser/",
	    		data: {surveyor:selectedSurveyor,pathId:gId,dateofnextsurvey:dateofnextsurvey}, 
	    		async:false,
	    		success: function (data) {	
	    			if(data){
	    				jAlert("Survey has been assigned successfully");
	    				refreshSurveyAccrodium();
	    			}
	    			else{
	    				jAlert("Try Again");
	    			}
	    		}
	    	});
	    }
	    else{
	    	return;
	    }
	
}





function refreshSurveyAccrodium(){
	jQuery("#workcommitment_SurveysTableBody").empty();
	jQuery.ajax({type: "GET",
		url: STUDIO_URL + "rowpath/survey/"+loggedUser.id+ "/pending",
		async:false,
		success: function (data) {	
			if(data!=null && data.length>0){
				for(var k=0;k<data.length;k++){
					data[k].dateofnextsurvey=convertDateToEuropeanFormat(data[k].dateofnextsurvey);
					data[k].assignedTo = getNameFromEMail(data[k].assignedTo);
				}
				jQuery("#workcommitment_SurveysTmpl").tmpl(data,
						{
							wc_lang: lang
						}
					).appendTo("#workcommitment_SurveysTableBody");
				$("#workcommitment_SurveysTable").tablesorter();
			}
		}
	});
	
	//hiding backlog,pending link and assignmaent
	hideWorkcommitmentLink();
}

