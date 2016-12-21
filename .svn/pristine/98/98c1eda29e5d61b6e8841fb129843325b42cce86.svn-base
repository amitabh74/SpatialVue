var roleExists =false;
var assignmentRole = false;
var isSuperUserRole = false;
SpatialVue.WorkCommitment =  function(_div) {

	$("#"+_div).empty();
	
    jQuery.get('resources/templates/viewer/workcommitmen.html', function(template) {
		
        $("#"+_div).append(template);   
		
        //added for closed jobs
        $(function () {
            $("#jobStartDate").datepicker({
                dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
        });
		
		$(function () {
			$("#jobEndDate").datepicker({
				dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
		});
        
        //jQuery("#workcommitment_SurveysTmpl").tmpl().appendTo("#workcommitment_SurveysBody");
		//jQuery("#workcommitment_IssueTmpl").tmpl().appendTo("#workcommitment_IssueBody");
		jQuery("#workcommitment_JobsTmpl").tmpl().appendTo("#workcommitment_JobsBody");
		
		//reading role from config
		jQuery.ajax({type: "POST",
			url: STUDIO_URL + "restrictRoles/",
			async:false,
			success: function (data) {				
				if(data!=null && data.length>0){
					var role=data.split(":");
					roleExists = checkRole(role[0], loggedUser.functionalRole);
					assignmentRole = checkRole(role[1], loggedUser.functionalRole);
					isSuperUserRole = checkRole(role[2], loggedUser.functionalRole);
				}
			}
		});
		
		
		
		
		jQuery.ajax({type: "GET",
			url: STUDIO_URL + "rowpath/survey/"+loggedUser.id+ "/pending",
			async:false,
			success: function (data) {	
				if(data!=null && data.length>0){
					for(var k=0;k<data.length;k++){
						data[k].dateofnextsurvey=convertDateToEuropeanFormat(data[k].dateofnextsurvey);
						data[k].assignedTo = getNameFromEMail(data[k].assignedTo);
						
						if(lang == 'cy'){
							data[k].classLkp.priority = data[k].classLkp.priority.replace("Priority", "Blaenoriaeth");
						}
					}
					//convertDateToEuropeanFormat();
					jQuery("#workcommitment_SurveysTmpl").tmpl(data).appendTo("#workcommitment_SurveysTableBody");
					$("#workcommitment_SurveysTable").tablesorter();
				}
				
				/*if(data!=null && data.length>0){
					$("#workcommitment_ComplaintsTable").tablesorter({ debug: false, sortList: [[0, 0]], widgets: ['zebra'] })
					.tablesorterFilter({                          
					    filterColumns: [0],
					    filterCaseSensitive: false
					});
				}*/
			}
		});
		
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
				$("#workcommitment_IssueTable").tablesorter();
				}
			}
		});
		
		jQuery.ajax({type: "GET",
			url: STUDIO_URL + "workcommitment/jobs/"+loggedUser.id+"/pending",
			async:false,
			success: function (data) {	
				if(data!=null && data.length>0){
					for(var k=0;k<data.length;k++){
						data[k].targetDate=convertDateToEuropeanFormat(data[k].targetDate);
					}
				jQuery("#workcommitment_JobsTmpl").tmpl(data,
						{
							wc_lang: lang
						}
				).appendTo("#workcommitment_JobsTableBody");
				$("#workcommitment_JobsTable").tablesorter();
				}
			}
		});
		/*if(!roleExists){
			$('.hide').hide();
		}
		
		if(!assignmentRole){
			jQuery(".disableAnchor").removeAttr('OnClick');
		}*/
		hideWorkcommitmentLink();
		if(isSuperUserRole || loggedUser.functionalRole == 9 || loggedUser.functionalRole == 8 || loggedUser.functionalRole == 10){
			$("#workcommitment_ComplaintsTableBody").empty();
			jQuery.ajax({type: "POST",
				url: "complaint/complaintsData/",
				data: {category:"P",email:loggedUser.email}, 
				async:false,
				success: function (data) {	
					var isAdmin;
					if(roles.indexOf('ROLE_ADMIN')> -1){
						isAdmin = "admin";
					}else if(roles.indexOf('ROLE_USER')> -1){
						isAdmin = "user";
					}
					if(data!=null && data.length>0){
						for(var k=0;k<data.length;k++){
							data[k].reportedOn=convertDateToEuropeanFormat(data[k].reportedOn);
							data[k].respondBy=convertDateToEuropeanFormat(data[k].respondBy);
							data[k].acknowledgeBy=convertDateToEuropeanFormat(data[k].acknowledgeBy);
							data[k].assignedToEmail = data[k].assignedTo;
							data[k].assignedTo = getNameFromEMail(data[k].assignedTo);
							if(data[k].complaintNatureLkp != null){
								if(lang=='cy'){
									data[k].complaintNatureLkp.enquiryType = data[k].complaintNatureLkp.enquiryTypeWelsh;
								}
							}
						}
						jQuery("#workcommitment_ComplaintsTableTmpl").tmpl(data,
								{
									role_admin: isAdmin
								}
								
						).appendTo("#workcommitment_ComplaintsTableBody");
						$("#workcommitment_ComplaintsTable").tablesorter();
					}
					
				}
			});
		}else{
			$('#hrefComp').remove();
			$('#workcommitment_ComplaintsBody').remove();
			//jQuery("#workcommitment_accordion").accordion( "option", "disabled", true );
		}
		
		//added for closed job accoriden
		//if(loggedUser.functionalRole == 9 || loggedUser.functionalRole == 8){
			displayClosedJobs(30);
		/*}else{
			$('#closedJob').remove();
			$('#workcommitment_ClosedJobsBody').remove();
		}*/
		
		
		jQuery("#workcommitment_accordion").accordion({fillSpace: true});
		
		//Translations
		$('#wc-survey').html($._('surveys'));
	    $('#survey_rowid').html($._('row_id'));
	    $('#survey_by').html($._('survey_by'));
	    $('#survey_priority').html($._('priority'));
	    $('#survey_assignedto').html($._('assigned_to'));
	    $('#survey_pending').html($._('pending'));
	    $('#survey_backlog').html($._('backlog'));
	    $('.clssurvey').attr("title", $._('reassign_survey'));
	    
	    $('#wc-complaints').html($._('complaints'));
	    $('#complaint_id').html($._('complaint_id'));
	    $('#complaint_issueid').html($._('Issueid'));
	    $('#complainant_name').html($._('complainant_name'));
	    $('#complaint_reportedon').html($._('reported_on'));
	    $('#complaint_acknowlegeby').html($._('complaint_acknowledgeby'));
	    $('#complaint_type').html($._('complaint_type'));
	    $('#complaint_respondby').html($._('complaint_respondby'));
	    $('#complaint_assigned').html($._('assigned_to'));
	    $('#complaint_all').html($._('complaint_all'));
	    $('#complaint_pending').html($._('pending'));
	    $('#complaint_backlog').html($._('backlog'));
	    $('.clsassigncpt').attr("title", $._('assign_complaint'));
	    
	    $('#wc-issues').html($._('issues_open'));
	    $('#issue_id').html($._('issues_id'));
	    $('#issue_rowid').html($._('issues_rowid'));
	    $('#issue_type').html($._('issues_type'));
	    $('#issue_assignedto').html($._('issues_assignedto'));
	    $('#issue_urgency').html($._('issues_urgency'));
	    $('#issue_inspectby').html($._('issues_inspectby'));
	    $('#issue_status').html($._('issues_status'));
	    $('#issue_resolveby').html($._('issues_resolveby'));
	    $('#issue_action').html($._('issues_action'));
	    $('#issues_pending').html($._('pending'));
	    $('#issues_backlog').html($._('backlog'));
	    $('.clsjob').attr("title", $._('create_job'));
		$('.clslegal').attr("title", $._('create_legal'));
		$('.clsassignissue').attr("title", $._('reassign_issue'));
	    
	    $('#wc-outstandingjobs').html($._('outjobs'));
	    $('#outjob_id').html($._('outjobs_id'));
	    $('#outjob_rowid').html($._('outjobs_rowid'));
	    $('#outjob_type').html($._('outjobs_type'));
	    $('#outjob_feature').html($._('outjobs_feature'));
	    $('#outjob_targetdate').html($._('outjobs_targetdate'));
	    $('#outjob_pending').html($._('pending'));
	    $('#outjob_backlog').html($._('backlog'));
	    $('#outjob_all').html($._('complaint_all'));
	    
	    //Closed Jobs
	    $('#closed_jobs').html($._('closed_jobs'));
	    $('#job_closed_tenure').html($._('job_closed_since'));
	    $('#closedjob_filter').html($._('job_filter'));
	    $("#closed_job_id").html($._('Id'));
	    $('#closed_job_rowId').html($._('row_id'));
	    $("#closed_job_type").html($._('job_type'));
	    $("#closed_job_feature").html($._('job_feature'));
	    $("#closed_job_completed_on").html($._('completed_on'));
	    $("#closed_job_locate").html($._('closedjob_locate'));
	    
	    jQuery("#closedJobsTime").append(jQuery("<option></option>").attr("value", "30").text($._('last_month')));
		jQuery("#closedJobsTime").append(jQuery("<option></option>").attr("value", "90").text($._('last_3_months')));
		jQuery("#closedJobsTime").append(jQuery("<option></option>").attr("value", "180").text($._('last_6_months')));
		jQuery("#closedJobsTime").append(jQuery("<option></option>").attr("value", "270").text($._('last_9_months')));
		jQuery("#closedJobsTime").append(jQuery("<option></option>").attr("value", "365").text($._('last_year')));
		jQuery("#closedJobsTime").append(jQuery("<option></option>").attr("value", "0").text($._('all_closed_jobs')));
		
	   
    });   
    tablesorter();
    $('#wclabel').html($._('Work_Commitments'));
    
    
}

function checkRole(roleList, loggedInUserRoleId){
	var mySplitResult = roleList.split(",");
	for(i = 0; i < mySplitResult.length; i++){
		if(loggedInUserRoleId==mySplitResult[i]){
			return true;			
		}
	}
	return false;
}


function hideWorkcommitmentLink(){
	//hiding backlog,pending link and assignmaent
	if(!roleExists){
		if(loggedUser.functionalRole != 10 && loggedUser.functionalRole != 9 && loggedUser.functionalRole != 8){
			$('.hide').remove();
		}
	}
	
	if(!assignmentRole){
		jQuery(".btnGrid").removeAttr('OnClick');
		jQuery(".btnGrid").remove();
	}
	
}

function tablesorter(_tablename){
	 $("#workcommitment_SurveysTable").tablesorter({ debug: false, sortList: [[0, 0]], widgets: ['zebra'] });
	 $("#workcommitment_SurveysTable").tablesorter( {sortList: [[0,0], [1,0]]} );
 }

function displayClosedJobs(_days){
	var jobStartDate=30;
	if(_days==0)
		jobStartDate=$("#closedJobsTime").val();
	else
		jobStartDate=_days;
	//var jobEndDate=$("#jobEndDate").val();
	
	
	
	$("#workcommitment_ClosedJobsTableBody").empty();
		jQuery.ajax({type: "GET",
		url: STUDIO_URL + "workcommitment/closedjob/"+loggedUser.id+"/"+jobStartDate,
		//data: {userid:loggedUser.id,jobStartDate:jobStartDate,jobEndDate:jobEndDate},
		async:false,
		success: function (data) {	
			if(data!=null && data.length>0){
				for(var k=0;k<data.length;k++){
					data[k].jobCompleted=convertDateToEuropeanFormat(data[k].jobCompleted);
				}
				//jQuery("#workcommitment_ClosedJobsTmpl").tmpl(data).appendTo("#workcommitment_ClosedJobsTableBody");
				jQuery("#workcommitment_ClosedJobsTmpl").tmpl(data,
						{
							wc_lang: lang
						}
					).appendTo("#workcommitment_ClosedJobsTableBody");
				
				$("#workcommitment_ClosedTable").tablesorter();
				
				 $(".job_zoom").html($._('zoom'));
			}
			
		}
	});
}