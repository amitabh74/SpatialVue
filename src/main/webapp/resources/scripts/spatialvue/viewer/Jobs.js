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
var job_contacts = null;
var htmlStr = '';
var htmlStr1 = '';
var job_user = null;
var issueGID = null;
var jobID = null;
var jobTypes = null;
var jobFeatures = null;
var currentJob = null;
var _serverurl = null;
var jobattributedata = {};
var addedUserList = null;
var riskassessmentComplete = false;

SpatialVue.Job = function (issue_gid) {

    issueGID = issue_gid;
    searchdiv = "sidebar";
    var _layer = layer;
    var _associationIds = associationIds;
    var serverurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    _serverurl = serverurl;
    var attachedFiles = null;
    var riskassattachedFile = null;
    var jobid = null;

    // check whether Legal exists for this issue if yes stop operation
    var legalData;
    $.ajax({
        type: "GET",
        url: "legalDetails/" + issueGID,
        async: false,
        success: function (data) {
            legalData = data;
        }
    });

    if (legalData.legalid != undefined) {
        jAlert($._('legal_already_exist')+' : ' + issueGID, $._('legal_exists'));
        $('#popup_ok').attr("value", $._('popupOk'));
        return;
    }

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "job/issue/" + issueGID,
        success: function (data) {
        	data.jobCompleted = convertDateToEuropeanFormat(data.jobCompleted);
        	data.targetDate = convertDateToEuropeanFormat(data.targetDate);
            currentJob = data;
            job_contacts = data.contacts;
            job_user = data.jobUser;
            attachedFiles = data.nonspatialAttachments;
            riskassattachedFile = data.riskassesmentattachment;
            jobID = data.jobid;
        }
    });
    if (jobID == 0) {
        // Check whether Legal against the issueid exists if false then
        // TODO
        // jConfirm('Do you want To Create a New Job Against Issue ID : ' +
        // _issue_gid, 'New Job Creation', function (response) {
        // if (response == false) {
        // return;
        // }
        // });
    }

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "job/type",
        success: function (data) {
            jobTypes = data;

        }
    });
    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "job/feature",
        success: function (data) {
            jobFeatures = data;

        }
    });
    // SNPA Users
    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "furniture/surveyor",
        success: function (data) {
            jobAllSNPAUsers = data;

        }
    });

    /*
     * //Contacts List var allcontactList; jQuery.ajax({ url: "listcontact/",
     * async:false, success: function (data) { allcontactList = data;
     *  } });
     */

    $("#tabs-Tool").empty();
    jQuery.get('resources/templates/viewer/job.html', function (template) {
        addTab($._('job'), template);
        $('#span-close').attr('title',$._('close_title'));
        $("#JobAttchFileListBody").empty();
        htmlStr = '';
        // if (currentJob.jobid == undefined){ //new Job
        jQuery("#workcommitment_JobDetailsTmpl").tmpl().appendTo("#workcommitment_JobDetailsBody");
        jQuery("#jobInfo_AttachmentTmpl").tmpl().appendTo("#workcommitment_AttachmentBody");

        // populating nonspatial attachments
        $.each(
        attachedFiles, function (key, val) {
            var filepath = serverurl + val.filepath
            htmlStr = htmlStr + '<tr id="' + 'Job' + '_' + val.associationid + '">';
            htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
            htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteJobAttachedFile(' + "'" + 'Job' + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
        });

        jQuery("#workcommitment_JobDetailsBody").empty();

        jQuery("#workcommitment_JobDetailsTmpl").tmpl(
        currentJob).appendTo("#workcommitment_JobDetailsBody");

        jQuery("#workcommitment_AttachmentBody").empty();

        jQuery("#jobInfo_AttachmentTmpl").tmpl(currentJob).appendTo("#workcommitment_AttachmentBody");

        // populating Risk assesment
        // files----------------------------------------------------------------------------------------------------------------------------
        $("#JobRiskFileListBody").empty();
        htmlStr1 = '';
        jQuery("#jobInfo_RiskTmpl").tmpl().appendTo("#workcommitment_RiskBody");

        $.each(
        riskassattachedFile, function (key, val) {
            var filepath = serverurl + val.filepath
            htmlStr1 = htmlStr1 + '<tr id="' + val.associationid + '_' + 'Job' + '">';
            htmlStr1 = htmlStr1 + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
            htmlStr1 = htmlStr1 + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteJobRiskAssFile(' + "'" + val.associationid + "'" + ',' + "'" + 'Job' + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
        });

        //added by saurabh for calculating total
        $('#jobMaterialsCost').keyup(function() { 
                var jobMaterialsCost = $('#jobMaterialsCost').val();
                var jobContractorCost = $('#jobContractorCost').val();
                var total =Number(jobMaterialsCost)+Number(jobContractorCost);
                $('#jobTotalCost').val(total)
                 $('#hidJobTotalCost').val(total);
                    
        });
        $('#jobContractorCost').keyup(function() { 
        	 var jobMaterialsCost = $('#jobMaterialsCost').val();
             var jobContractorCost = $('#jobContractorCost').val();
             var total =Number(jobMaterialsCost)+Number(jobContractorCost);
             $('#jobTotalCost').val(total);
             $('#hidJobTotalCost').val(total);
            
        });

        
        jQuery("#workcommitment_RiskBody").empty();

        jQuery("#jobInfo_RiskTmpl").tmpl(currentJob).appendTo("#workcommitment_RiskBody");
        // populating Risk assesment
        // files----------------------------------------------------------------------------------------------------------------------------
        // filling lookups
        jQuery("#jobType").append(
        		jQuery("<option></option>").attr("value", "").text($._('select_job_type')));
        jQuery.each(jobTypes, function (i, jobType) {
        	var job_type;
        	if(lang=='cy'){
        		job_type = jobType.math;
        	}else{
        		job_type = jobType.type;
        	}
            jQuery("#jobType").append(
            jQuery("<option></option>").attr("value", jobType.typeid).text(job_type));
        });

        jQuery("#jobFeature").append(
        		jQuery("<option></option>").attr("value", "").text($._('select_job_feature')));
        jQuery.each(jobFeatures, function (i, jobFeature) {
        	var job_feature;
        	if(lang=='cy'){
        		job_feature = jobFeature.math;
        	}else{
        		job_feature = jobFeature.type;
        	}
            jQuery("#jobFeature").append(
            jQuery("<option></option>").attr("value", jobFeature.typeid).text(job_feature));
        });
        jQuery("#snpaUserList").append(
        		jQuery("<option></option>").attr("value", "").text($._('select_snpa_users')));
        jQuery.each(jobAllSNPAUsers, function (i, snpaUsers) {
            jQuery("#snpaUserList").append(
            jQuery("<option></option>").attr({
                id: snpaUsers.id,
                name: snpaUsers.name,
                email: snpaUsers.email
            }).text(snpaUsers.name));
        });
        jobLabelTranslations();
        // filling issue-Gid value
        jQuery('#issueGID').val(issueGID);

        // Normal Attachment
        jQuery.get('fileupload', function (template1) {

            $("#JobfileAttachmentDiv").append(
            template1);

            $('<input type="hidden" name="ajaxUpload" value="true" />').insertAfter($("#file"));
            $("#fileuploadForm").attr("action", "fileupload?" + token);
            

            $("#fileuploadForm").ajaxForm({
                success: function (
                filepath_name) {

                    if (filepath_name.indexOf("HTTP Status 500") != -1) {
                        $('#errmsg').html('File size is greater than permissible limit');
                    } else {
                        $('#errmsg').html('');
                        filepath_name = filepath_name.replace("<PRE>", "");
                        filepath_name = filepath_name.replace("</PRE>", "");

                        var pathArr = filepath_name.split("|");

                        uploadFilepath = pathArr[0];
                        uploadFilename = pathArr[1];

                        var selRow = $('#tablegrid1').jqGrid('getGridParam', 'selarrrow');

                        var filename = uploadFilename;
                        var associationid = $('#hid-job_Id').val();
                        var layername = 'Job';
                        var keyfield = currentJob.jobid;
                        var desc = $('#fileDesc').val();
                        var filepath = uploadFilepath;
                        var extension = /[^.]+$/.exec(filename)[0];

                        // set
                        // the
                        // hidden
                        // field
                        $('#associationid').val(
                        associationid);
                        $('#layername').val(
                        layername);
                        $('#keyfield').val(
                        keyfield);
                        $('#filename').val(
                        filename);
                        $('#filepath').val(
                        filepath);
                        $('#extension').val(
                        extension);
                        if ($('#fileDesc').val() != '' && $('#file').val() != '') {
                            $.ajax({
                                type: "POST",
                                url: STUDIO_URL + "nonspatialattachment/create",
                                data: $("#fileuploadForm").serialize(),
                                success: function (
                                fileurl) {
                                    var _fileurl = serverurl + fileurl;
                                    var markup = "";
                                    markup = markup + '<tr id="' + layername + '_' + associationid + '">';
                                    markup = markup + '<td align="left" class="padcellup"><a href="' + _fileurl + '" target="_blank">' + filename + '</a></td>';
                                    markup = markup + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteJobAttachedFile(' + "'" + layername + "'" + ',' + "'" + associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
                                    refreshJobAttachedFiles(
                                    currentJob.jobid, _serverurl);
                                }
                            });
                        } else {
                            jAlert('Enter both description and file name.', 'Attachment');
                        }
                    }
                },
                error: function (
                xhr, status) {
                    jAlert('File size is greater than permissible limit.');
                }
            }); // ajaxForm
        }); // fileupload
        // Risk file Attachment
        jQuery.get('riskfileupload', function (template1) {

            $("#JobfileRiskDiv").append(
            template1);

            $('<input type="hidden" name="ajaxUpload" value="true" />').insertAfter($("#riskfile"));
            $("#riskfileuploadForm").attr("action", "riskfileupload?" + token);

            $("#riskfileuploadForm").ajaxForm({
                success: function (
                filepath_name) {

                    if (filepath_name.indexOf("HTTP Status 500") != -1) {
                        $('#riskerrmsg').html('File size is greater than permissible limit');
                    } else {
                        $('#riskerrmsg').html('');
                        filepath_name = filepath_name.replace("<PRE>", "");
                        filepath_name = filepath_name.replace("</PRE>", "");

                        var pathArr = filepath_name.split("|");

                        uploadFilepath = pathArr[0];
                        uploadFilename = pathArr[1];

                        var selRow = $('#tablegrid1').jqGrid('getGridParam', 'selarrrow');

                        var filename = uploadFilename;
                        var associationid = $('#hid-job_Id').val();
                        var layername = 'Job';
                        var keyfield = 'RA Ref';
                        var desc = $('#riskassref').val();
                        var filepath = uploadFilepath;
                        var extension = /[^.]+$/.exec(filename)[0];

                        // set
                        // the
                        // hidden
                        // field
                        $('#associationid1').val(
                        associationid);
                        $('#layername1').val(
                        layername);
                        $('#keyfield1').val(
                        keyfield);
                        $('#filename1').val(
                        filename);
                        $('#filepath1').val(
                        filepath);
                        $('#extension1').val(
                        extension);
                        if ($('#riskassref').val() != '' && $('#riskfile').val() != '') {
                            $.ajax({
                                type: "POST",
                                url: STUDIO_URL + "riskattachment/create",
                                data: $("#riskfileuploadForm").serialize(),
                                success: function (
                                fileurl) {
                                    var _fileurl = serverurl + fileurl;
                                    var markup = "";
                                    markup = markup + '<tr id="' + associationid + '_' + layername + '">';
                                    markup = markup + '<td align="left" class="padcellup"><a href="' + _fileurl + '" target="_blank">' + filename + '</a></td>';
                                    markup = markup + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteJobRiskAssFile(' + "'" + associationid + "'" + ',' + "'" + layername + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
                                    refreshRiskAttachedFiles(
                                    currentJob.jobid, _serverurl);
                                    // disable
                                    // all
                                    // other
                                    // controls
                                    // once
                                    // file
                                    // is
                                    // uploaded
                                    riskassessmentComplete = true;
                                    $('#table-riskAssRequired').hide();
                                    // clear
                                    // controls
                                    jQuery('#riskassref').val('');
                                    jQuery('#riskfile').val('');
                                }
                            });
                        } else {
                            jAlert('Enter both Risk Assessment Reference and File Name.', 'Risk Assesment Upload');
                        }
                    }

                },
                error: function (
                xhr, status) {
                    jAlert('File size is greater than permissible limit.');
                }

            }); // ajaxForm
         // radio
            
            // button-----------------------------------------------------------------------
            $("input[name='riskAssRequired'][value='y']").live('click',

            function () {
                if (jQuery('#JobRiskFileListBody')[0].rows.length == 1) {
                    jAlert('Risk assesment File is already uploaded. In case you need to upload a different file please delete the old file first.');
                    return;
                } else {
                	if(currentJob.riskAssesmentReq){
                		$('#RiskFileList').show();
                		$('#div-riskAssRequired').show();
                		if(jQuery('#JobRiskFileListBody')[0].rows.length == 0){
                			$('#table-riskAssRequired').show();
                		}
                	}
                	else{
                		$('#table-riskAssRequired').show();
                        $('#div-riskAssRequired').show();
                        $('#RiskFileList').show();	
                	}
                }
            });
            $("input[name='riskAssRequired'][value='n']").live('click',

            function () {
                if (jQuery('#JobRiskFileListBody')[0].rows.length == 0) {
                    $('#table-riskAssRequired').hide();
                    $('#div-riskAssRequired').hide();
                    $('#RiskFileList').hide();
                } else {

                }

            });

            $("input[name='riskAssCompleted'][value='y']").live('click',

            function () {
                var riskassfile = null;
                $.ajax({
                    type: "GET",
                    async: false,
                    // url : STUDIO_URL +
                    // "attachment/gid/" +
                    // gid,
                    url: STUDIO_URL + "riskattachment/" + "Job" + "/gid/" + currentJob.jobid,
                    success: function (
                    _riskFiles) {
                        riskassfile = _riskFiles;
                        if (riskassfile.length == undefined || riskassfile.length == 0) {
                            //jAlert('Please Provide Risk Assessment Reference and make sure Risk assesment file is uploaded');
                        	
                        	jAlert($._('provide_risk_assessment_ref'), $._('alert'));
                            $('#popup_ok').attr("value", $._('popupOk'));
                            $("input[name='riskAssCompleted'][value='n']").attr("checked", "checked");
                            return;
                        } else {
                            // update the
                            // risk
                            // assesment
                            // Completion to
                            // true
                            $.ajax({
                                type: "GET",
                                url: STUDIO_URL + "riskassesment/complete/gid/" + currentJob.jobid,
                                success: function (
                                updatedJob) {
                                    // job
                                    // completion
                                    // updated
                                }
                            });

                        }
                    }
                });
            });
            // radio
            // button-----------------------------------------------------------------------
            updateRiskDivOnLoad();
        }); // riskfileupload
        $('#fileDesc').val('');
        $('#file').val('');

        $(function () {
            $("#jobTargetDate").datepicker({
                dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
        });
        $(function () {
            $("#jobCompletedDate").datepicker({
                dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
        });

        if (jobID != 0) {
        	//populate default values
        	jQuery('#jobType').val(currentJob.jobTypeLkp.typeid);
            jQuery('#jobFeature').val(currentJob.jobFeatureLkp.typeid);
            // refresh job users
            refreshJobUsers(issueGID);
            refreshJobAttachedFiles(currentJob.jobid, _serverurl);
            refreshRiskAttachedFiles(currentJob.jobid, _serverurl);
            
            //jQuery('#JobAttchFileListBody').append(htmlstr);
            //jQuery('#JobRiskFileListBody').append(htmlstr1);
            

            $("#jobFormTable :input").attr("disabled", true);
            $("#job_Id").attr("disabled", true);
            $("#issueid").attr("disabled", true);

            if (jQuery('#jobCompletedDate').val() != '') {
            	if(roles == "ROLE_ADMIN"){
        			$("#userlist_Job").attr("disabled", true);
                	$('#userlist_Job .deleteFileTD').hide();
                	$('.addIcon').hide();
                	$("#btnCancelJob").hide();
                	$("#btnSaveJob").hide();
                	$("#jobTotalCost").attr("disabled", true);
                	$("#ul_mapIT").hide();
        		}
            	else{
            		$("#btnCancelJob").hide();
                    $("#btnSaveJob").hide();
                    $("#btnUpdateJob").hide();
                    $("#userlist_Job").attr("disabled", true);
                    $('#userlist_Job .deleteFileTD').hide();
                    $("#JobattachmentDiv :input").attr("disabled", true);
                    $('#JobattachmentDiv a').attr("disabled", true);
                    $("#JobriskDiv :input").attr("disabled", true);
                    $('#JobriskDiv a').attr("disabled", true);
                   // $('.footerBtns').hide();
                    //job link to be shown for closed jobs also (modified on 21st june 2012)
                    $('.btn01').show();
                    $('.addIcon').hide();
                    $(".deleteFileTD").remove();
                    $("#ul_mapIT").show();	
            	}
                
            } else {
            	//$("#JobattachmentDiv :input").attr("disabled", true);
                //$('#JobattachmentDiv a').attr("disabled", true);
                //$("#JobriskDiv :input").attr("disabled", true);
                //$('#JobriskDiv a').attr("disabled", true);
            	$("#userlist_Job").attr("disabled", true);
                $('#userlist_Job .deleteFileTD').hide();
                $('.addIcon').hide();
                $("#btnCancelJob").hide();
                $("#btnSaveJob").hide();
                $("#jobTotalCost").attr("disabled", true);
                $("#ul_mapIT").show();
            }

        } else {
            $("#jobFormTable :input").removeAttr("disabled");
            // $("#JobattachmentDiv
            // :input").removeAttr("disabled");
            $('#JobattachmentDiv').hide();
            $('#JobriskDiv').hide();
            $('.addIcon').show();
            $('.footerBtns').hide();
            // $('#JobattachmentDiv a').removeAttr("disabled");
            $("#job_Id").attr("disabled", true);
            $("#issueid").attr("disabled", true);
            $("#userlist_Job").removeAttr("disabled");
            $('#userlist_Job .deleteFileTD').show();
            $("#btnUpdateJob").hide();
            $("#btnCancelJob").show();
            $("#btnSaveJob").show();
            $('#workcommitment_AttachmentBody').hide();
            $('#workcommitment_RiskBody').hide();
            $("#jobTotalCost").attr("disabled", true);
            $("#ul_mapIT").show();
        }

        $("#btnUpdateJob").click(

        function () {
            $("#jobFormTable :input").removeAttr("disabled");
            $('.footerBtns').hide();
            $("#userlist_Job").removeAttr("disabled");
            $('#userlist_Job .deleteFileTD').show();
            $('.addIcon').show();
            $("#job_Id").attr("disabled", true);
            $("#issueid").attr("disabled", true);
            $("#btnUpdateJob").hide();
            $("#btnCancelJob").show();
            $("#btnSaveJob").show();
            $('#workcommitment_AttachmentBody').hide();
            $('#workcommitment_RiskBody').hide();
            $("#jobTotalCost").attr("disabled", true);
        });

        $("#btnCancelJob").click(

        function () {
            if (jobID == 0) {
                closeDialog('jobdiv');
            } else {
                var job = new SpatialVue.Job(issueGID);
            }

        });
        
        //updateRiskControls(currentJob);
        jobLabelTranslations();
    });
    
    
}

function jobLabelTranslations(){
	$('#job_gid').html($._('issue_gid') + ' : ');
	$('#job_type').html($._('job_type') + ' : ');
	$('#job_feature').html($._('job_feature') + ' : ');
	$('#job_units').html($._('job_num_units') + ' : ');
	$('#job_hrs').html($._('job_snpa_hrs') + ' : ');
	$('#job_notes').html($._('job_notes') + ' : ');
	$('#job_material_cost').html($._('job_material_cost') + ' : ');
	$('#job_contract_cost').html($._('job_contractor_cost') + ' : ');
	$('#job_total_cost').html($._('job_total_cost') + ' : ');
	$('#job_done_by').html($._('job_done_by') + ' : ');
	$('#job_user').html($._('job_user') + ' : ');
	$('#job_selected_users').html($._('job_selected_users') + ' : ');
	$('#job_target_date').html($._('job_target_date') + ' : ');
	$('#job_complete_date').html($._('job_complete_date') + ' : ');
	$('#job_edit').attr("value", $._('Edit'));
	$('#job_cancel').attr("value", $._('_cancel'));
	$('#job_save').attr("value", $._('Save'));
	//$('#job_locateOnMap').html($._('locate_on_map'));
	//$('#job_link').html($._('job_link'));
	$('#job_link').attr("title",$._('job_link'));
	$('#job_locateOnMap').attr("title",$._('locate_on_map'));
	$('#user_email').html($._('user_email'));
	window.setTimeout("attachmentLabelTranslations()", 1000);
	window.setTimeout("riskAttachmentLabelTranslations()", 1000);
	
}

function riskAttachmentLabelTranslations(){
	$('#risk_assessment').html($._('risk_assessment'));
	$('#risk_assessment_req').html($._('risk_assessment_req') + ' : ');
	$('#risk_req_yes').html($._('yes'));
	$('#risk_req_no').html($._('no'));
	$('#risk_assessment_ref').html($._('risk_assessment_ref'));
	$('#risk_filename').html($._('filename') );
	$('#msg_upload_limit').html($._('msg_upload_limit'));	
	$('#riskbtnupload').attr("value", $._('btn_lbl_upload'));
	$('#risk_assessment_completed').html($._('risk_assessment_completed') + ' : ');
	$('#risk_comp_yes').html($._('yes'));
	$('#risk_comp_no').html($._('no'));
	$('#risk_assessment_attachedfile').html($._('risk_assessment_attachedfile'));
	$('#header_risk_file').html($._('file'));
	$('#header_risk_action').html($._('action'));
	
	}

function refreshJobAttachedFiles(gid, serverurl) {
    var files = null;
    var _layer = layer;
    $.ajax({
        type: "GET",
        async: false,
        // url : STUDIO_URL + "attachment/gid/" + gid,
        url: STUDIO_URL + "nonspatialattachment/" + "Job" + "/gid/" + currentJob.jobid,
        success: function (_attachedFiles) {
            files = _attachedFiles
        }
    });
    var refhtmlStr = '';
    $.each(
    files, function (key, val) {
        var filepath = serverurl + val.filepath
        refhtmlStr = refhtmlStr + '<tr id="' + 'Job' + '_' + val.associationid + '">';
        refhtmlStr = refhtmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
        refhtmlStr = refhtmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteJobAttachedFile(' + "'" + 'Job' + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
    });
    $("#JobAttchFileListBody").empty();
    jQuery('#JobAttchFileListBody').append(refhtmlStr);
}

function deleteJobAttachedFile(layername, associateId) {
    // var r=confirm("Do you want to Delete Association id: "+associtionid);
    jConfirm('Are You Sure You Want To Delete : ', 'Delete Confirmation', function (response) {

        if (response == true) {
            $.ajax({
                type: "POST",
                url: STUDIO_URL + "nonspatialattachment/delete/" + associateId,
                success: function (resp) {

                    jQuery('#' + layername + '_' + associateId).remove();

                }

            });
        } else {
            return;
        }

    });

}

function jobLink(issueGID, _jobid) {
    // var _job_contacts = job_contacts;
    // var _job_user = job_user;
    if (job_contacts.length > 0) {
		jQuery.each(job_contacts, function (i, ctype) {    	
		//ctype.contactTypeLkp.contactType
		job_contacts[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
		});
	}
	jQuery.get("resources/templates/viewer/jobLink.html", function (template) {

        var jobissueData;
        // var furniturepathdata;
        // adding issue
        jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "job/issuelist/" + _jobid,
            success: function (data) {
            	if (data.length != undefined){
            		for(i=0; i<data.length; i++){
     	      		 	//data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
            			
            			 data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
		        		 //data[i].assignedTo = getNameFromEMail(data[i].assignedTo);
		        		 //data[i]["ActionType"] = getActionType(data[i].gid.toString(), action);
		        		 data[i].issueTypeLkp.type = (lang=='cy')?data[i].issueTypeLkp.math:data[i].issueTypeLkp.type;
		        		 data[i].issueUrgencyLkp.urgencyType = (lang=='cy')?data[i].issueUrgencyLkp.brys:data[i].issueUrgencyLkp.urgencyType;
		        		 data[i].actionStatusLkp.actionStatus = (lang=='cy')?data[i].actionStatusLkp.statws:data[i].actionStatusLkp.actionStatus;
            			
            			
            			
     	         	 }
            	}
            	jobissueData = data;
            	 
                // for isue
                jQuery.ajax({
                    async: false,
                    type: "GET",
                    url: STUDIO_URL + "user/",
                    success: function (data) {
                        issueassignto = data;
                        if (jobissueData.length != undefined) {
                            for (var k = 0; k < jobissueData.length; k++) {
                                jobattributedata[k] = jobissueData[k];

                                $.each(
                                issueassignto, function (
                                key, val) {
                                    if (val.id == jobattributedata[k].assignedTo) {
                                        jobattributedata[k].assignedTo = val.email;
                                        return;
                                    }
                                });

                            }
                           // addListingTab('Job Links', 'tab-joblink', template);
                            addListingTab($._('job_link'),'tab-joblink',template);

                            if (job_contacts.length > 0) {							
                                jQuery("#joblink_ContactTmpl").tmpl(
                                job_contacts).appendTo("#job_ContactTableBody");
                            }

                            // issue
                            if (jobattributedata.length != undefined || jobattributedata.length > 0 || jobattributedata != null) {
                                jQuery("#joblink_IssueTmpl").tmpl(
                                null, {
                                    issueList: jobattributedata

                                }).appendTo("#joblink_IssueTableBody");
                            } 

                            jQuery("#joblink_accordion").accordion({
                                fillSpace: true
                            });
                        }
                        else
                        	{
                        	//addListingTab('Job Links', 'tab-joblink', template);
                        	addListingTab($._('job_link'),'tab-joblink',template);
                        	if (job_contacts.length > 0) {								
                                jQuery("#joblink_ContactTmpl").tmpl(
                                job_contacts).appendTo("#job_ContactTableBody");
                            }
                        	if (jobattributedata.length != undefined || jobattributedata.length > 0 || jobattributedata != null) {
                                jQuery("#joblink_IssueTmpl").tmpl(
                                null, {
                                    issueList: jobattributedata

                                }).appendTo("#joblink_IssueTableBody");
                            } 

                            jQuery("#joblink_accordion").accordion({
                                fillSpace: true
                            });
                        	
                        	}
                    }
                });

            }
        });

        // added for contact
        $("#addNewJobContact").click(function () {
            addNewContact('job', _jobid);

        });

        $("#addToExistingJobContact").click(function () {
            addExistingContact('job', _jobid);

        });

        // go to parent
        $("#goToparentjobLink").click(function () {
            SpatialVue.Job(issueGID);
        });
        
        // traslation here
        translateJobIssueListing();
        translateJobContactListing();
        
        
    });
}

function translateJobIssueListing(){
	 $('#joblink_issue').html($._('Issue'));
	 $('#joblink_parent').html($._('go_to_parent_issue'));
	 //$('#joblink_openissue').html($._('issues_open'));
	 //$('#joblink_historyissue').html($._('furniture_link_issue_historical'));
	 //$('#joblink_issueid').html($._('Issueid'));
	 $('#joblink_id').html($._('row_id'));
	 //$('#joblink_furnitureid').html($._('furnitureid'));
	 $('#joblink_issuetype').html($._('type'));
	 $('#joblink_issueurgency').html($._('urgency'));
	 $('#joblink_issuestatus').html($._('status'));
	 $('#joblink_assignedto').html($._('assigned_to'));
	 $('#joblink_resolveby').html($._('resolve_by'));
	 //$('#joblink_issueaction').html($._('action'));
	 
	// $('.clsjob').attr("title", $._('create_job'));
	// $('.clslegal').attr("title", $._('create_legal'));
}

function translateJobContactListing(){
	$('#joblink_contact').html($._('contact'));
	$('#joblink_add_new_contact').html($._('furniture_link_addcontact'));
	$('#joblink_add_exist_contact').html($._('furniture_link_existingcontact'));
	$('#joblink_contactid').html($._('contact_id'));
	$('#joblink_contactname').html($._('contact_fname'));
	$('#joblink_contactsname').html($._('contact_surname'));
	$('#joblink_contacttype').html($._('contact_type'));
	$('#joblink_contactposition').html($._('contact_position'));
	$('#joblink_contactphone').html($._('Phone'));
	$('#joblink_contactmail').html($._('EMail'));
	$('#joblink_contactaction').html($._('action'));
}

function saveJob() {

    $("#jobInfoForm").validate({

        rules: {
            jobNoUnits: {
                digits: true
            },
            jobSNPAHours: {
                digits: true
            },
            jobMaterialsCost: {
                digits: true
            },
            jobContractorCost: {
                digits: true
            },
            jobTotalCost: {
                digits: true
            },
            jobTargetDate: "required",
            jobType: "required",
            jobFeature: "required"
        },
        messages: {
        	jobTargetDate : "Please enter Target Date.",
        	jobType: "Please select Job Type",
        	jobFeature: "Please select Job Feature"
        }
    });

    if (!$("#jobInfoForm").valid()) {
        //jAlert('Please Enter valid values.');
        return;
    }

    if (jQuery('#jobCompletedDate').val() != '') {

        // get list of new users from html string
        addedUserList = null;
        getJobUser();
        if (addedUserList == null) {
            addedUserList = "";
        }
        // check id completion date is equal to or less than current date
        completionDate = convertDateToUSFormat(jQuery('#jobCompletedDate').val());

        jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "job/checkcompletiondate/" + completionDate,
            success: function (data) {
                comparisonResult = data;
            }
        });

        if (comparisonResult == "error") {
            jAlert('Job Completion Date should be either equal to or less than current date.', 'Job Closure');
            return;
        }
        jConfirm('Completion of selected job will close corresponding Issue as well. Do you want to complete this job?', 'Closure Confirmation', function (response) {
        	 //$("#jobTotalCost").removeAttr("disabled");
            if (response == true) {
            	//$("#jobFormTable :input").removeAttr("disabled");
                $.ajax({
                    async: false,
                    type: "POST",
                    url: STUDIO_URL + "job/create",
                    data: jQuery("#jobInfoForm").serialize(),
                    success: function (intJobID) {
                    	//$("#jobFormTable :input").attr("disabled", true);
                        if (intJobID != 0) {
                            // Delete list of users against this
                            // jobid before saving
                            $.ajax({
                                async: false,
                                type: "GET",
                                url: STUDIO_URL + "job/user/delete/" + intJobID,
                                success: function (resp) {

                                    // save the jobusers
                                    $.ajax({
                                        async: false,
                                        type: "POST",
                                        data: {
                                            useremail: addedUserList,
                                            jobid: intJobID
                                        },
                                        url: STUDIO_URL + "job/adduser",
                                        success: function (
                                        resp) {
                                            if (resp == true) {
                                    	     // close
                                                // issues
                                                // against
                                                // the
                                                // job
                                                $.ajax({
                                                    async: false,
                                                    type: "GET",
                                                    url: STUDIO_URL + "issue/close/" + issueGID + "/" + completionDate,
                                                    success: function (
                                                    resp) {
                                                        if (resp == true) {
                                                            // updating
                                                            // path
                                                            // info
                                                            updateRowPathIssueCount(issueGID);
                                                         // update Furniture unresolved status
                                                            $.ajax({
                                                            	async: false,
                                                                type: "GET",
                                                                url: STUDIO_URL + "job/updateUnresolvedStatus/" + intJobID + "/Open",
                                                                success: function (
                                                                furnituredata) {
                                                                    // if(savestatus==true){
                                                                    //jAlert('Furniture unresolved status updated');
                                                                    // }

                                                        		}

                                                            });
                                                         // update Surface unresolved status
                                                            $.ajax({
                                                            	async: false,
                                                                type: "GET",
                                                                url: STUDIO_URL + "job/updSurfaceUnresolvedStatus/" + intJobID + "/Open",
                                                                success: function (
                                                                surfacedata) {
                                                                    // if(savestatus==true){
                                                                    //jAlert('Furniture unresolved status updated');
                                                                    // }

                                                        		}

                                                            });
                                                            jAlert('Jobid: ' + intJobID + ' closed against Issue: ' + issueGID, 'Job/Issue Closed');
                                                          //reload form
                                                            var job = new SpatialVue.Job(issueGID);  
                                                            //refresh Workcommitment
                                                            showIssueList('Open');
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });

                                }
                            });
                        }

                        $("#jobFormTable :input").attr("disabled", true);
                        // $("#JobattachmentDiv
                        // :input").attr("disabled", true);
                        // $("#JobriskDiv
                        // :input").attr("disabled", true);
                        $('.footerBtns').show();
                        // $('#JobattachmentDiv
                        // a').attr("disabled", true);
                        // $('#JobriskDiv a').attr("disabled",
                        // true);
                        $("#job_Id").attr("disabled", true);
                        $("#issueid").attr("disabled", true);
                        $("#userlist_Job").attr("disabled", true);
                        $('#userlist_Job .deleteFileTD').hide();
                        $("#btnCancelJob").hide();
                        $("#btnSaveJob").hide();
                        $("#btnUpdateJob").hide();
                        $(".deleteFileTD").remove();
                        $('#workcommitment_AttachmentBody').hide();
                        $('#workcommitment_RiskBody').hide();
                       // $('.footerBtns').hide();
                        $('.btn01').show();
                        $('.addIcon').hide();
                    }
                });

            } else {
            	//$("#jobTotalCost").attr("disabled", true);
                return;
            }

        });

    } else {
        // get list of new users from html string
        addedUserList = null;
        getJobUser();
        if (addedUserList == null) {
            addedUserList = "";
        }
        $.ajax({
            async: false,
            type: "POST",
            url: STUDIO_URL + "job/create",
            data: jQuery("#jobInfoForm").serialize(),
            success: function (intJobID) {
                // Delete list of users against this jobid before saving
                if (intJobID != 0) {
                    $.ajax({
                        async: false,
                        type: "GET",
                        url: STUDIO_URL + "job/user/delete/" + intJobID,
                        success: function (resp) {

                            // save the jobusers
                            $.ajax({
                                async: false,
                                type: "POST",
                                data: {
                                    useremail: addedUserList,
                                    jobid: intJobID
                                },
                                url: STUDIO_URL + "job/adduser",
                                success: function (resp) {
                                    jAlert($._('jod_id')+' : ' + intJobID + ' '+$._('saved'), $._('job'));
                                    $('#popup_ok').attr("value", $._('popupOk'));
                                    //reload form
                                    var job = new SpatialVue.Job(issueGID);
                                    
                                  //refresh Workcommitment by Aparesh
                                    showIssueList('Open');
                                    
                                }
                            });
                        }
                    });

                    $("#jobFormTable :input").attr("disabled", true);
                    // $("#JobattachmentDiv :input").attr("disabled", true);
                    // $('#JobattachmentDiv a').attr("disabled", true);
                    // $("#JobriskDiv :input").attr("disabled", true);
                    // $('#JobriskDiv a').attr("disabled", true);
                    $('.footerBtns').show();
                    $('.addIcon').hide();
                    $("#job_Id").attr("disabled", true);
                    $("#issueid").attr("disabled", true);
                    $("#userlist_Job").attr("disabled", true);
                    $('#userlist_Job .deleteFileTD').hide();
                    
                    
                    $("#JobattachmentDiv :input").removeAttr("disabled");
                    $('#JobattachmentDiv a').removeAttr("disabled");
                    $("#JobriskDiv :input").removeAttr("disabled");
                    $('#JobriskDiv a').removeAttr("disabled");
                    
                    
                    $('#workcommitment_AttachmentBody').show();
                    $('#workcommitment_RiskBody').show();
                    $("#btnCancelJob").hide();
                    $("#btnUpdateJob").show();
                    $("#btnSaveJob").hide();
                } else {
                    jAlert('Error saving Data.', 'Error');

                }
            }

        });

    }
    //var job = new SpatialVue.Job(issueGID);
    //refrsh job on Workcommitment tab
    showJobList('pending');
 }

function refreshJobContact(_jobid) {

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "job/issue/" + issueGID,
        success: function (data) {
            job_contacts = data.contacts;
			
			if (job_contacts.length > 0) {
				jQuery.each(job_contacts, function (i, ctype) {    	
				//ctype.contactTypeLkp.contactType
				job_contacts[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
				});
			}
        }
    });
    $("#job_ContactTableBody").empty();
    jQuery("#joblink_ContactTmpl").tmpl(job_contacts).appendTo("#job_ContactTableBody");
}

function refreshJobUsers(_issuegid) {

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "job/issue/" + _issuegid,
        success: function (data) {
            job_user = data.jobUser;
        }
    });

    var RefreshhtmlStr = '';
    $.each(
    job_user, function (key, val) {
        var _userid = val.user_email;
        _userid = _userid.replace(/\./g, "");
        _userid = _userid.replace(/\-/g, "");
        _userid = _userid.replace(/\@/g, "");
        var _useremail = val.user_email;

        RefreshhtmlStr = RefreshhtmlStr + '<tr id="' + _userid + '">';
        RefreshhtmlStr = RefreshhtmlStr + '<td align="left" class="padcellup">' + _useremail + '</td>';
        RefreshhtmlStr = RefreshhtmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteAttachedUser(' + "'" + _userid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
    });
    jQuery('#userlist_Job_Body').append(RefreshhtmlStr);

}

function showJobList(_filter) {

    jQuery("#workcommitment_JobsTableBody").empty();
    jQuery.ajax({
        type: "GET",
        url: STUDIO_URL + "workcommitment/jobs/" + loggedUser.id + "/" + _filter,
        async: false,
        success: function (data) {
            if (data != null && data.length > 0) {
            	for(var k=0;k<data.length;k++){
					data[k].targetDate=convertDateToEuropeanFormat(data[k].targetDate);
				}
                jQuery("#workcommitment_JobsTmpl").tmpl(data,
                		{
							wc_lang: lang
                		}
                ).appendTo("#workcommitment_JobsTableBody");
                hideWorkcommitmentLink();
               // $("#workcommitment_JobsTable").tablesorter();
                $("#workcommitment_JobsTable").trigger('update');
            }
        }
    });

}

function addJobsUsers() {
	if($("#snpaUserList option:selected").attr("email") != undefined){
		var _userid = $("#snpaUserList option:selected").attr("email");
	    _userid = _userid.replace(/\./g, "");
	    _userid = _userid.replace(/\-/g, "");
	    _userid = _userid.replace(/\@/g, "");

	    var useremail = $("#snpaUserList option:selected").attr("email");
	    // check whether useremail exists in list
	    if ($("#userlist_Job tr > td:contains('" + useremail + "')").length > 0) {
	        jAlert('User : ' + useremail + ' already added.', 'User Added');
	        return;
	    }

	}
	else
		{
		jAlert($._('job_user'), $._('select_user'));
		$('#popup_ok').attr("value", $._('popupOk'));
        return;
		}
       
    
    var addhtmlStr = '';
    addhtmlStr = addhtmlStr + '<tr id="' + _userid + '">';
    addhtmlStr = addhtmlStr + '<td align="left" class="padcellup">' + useremail + '</td>';
    addhtmlStr = addhtmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteAttachedUser(' + "'" + _userid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
    jQuery('#userlist_Job_Body').append(addhtmlStr);

}

function deleteAttachedUser(_userid) {
    jQuery('#' + _userid + '').remove();
}

function getJobUser() {
    addedUserList = null;
    $('#userlist_Job tr').each(function () {
        var userid = $(this).find("td").eq(0).html();
        if (userid != null) {
            if (addedUserList != null) {
                addedUserList = addedUserList + "," + userid;
            } else {
                addedUserList = userid;
            }

        }
    });
}

function refreshRiskAttachedFiles(gid, serverurl) {
    var files = null;
    var _layer = layer;
    $.ajax({
        type: "GET",
        async: false,
        // url : STUDIO_URL + "attachment/gid/" + gid,
        url: STUDIO_URL + "riskattachment/" + "Job" + "/gid/" + currentJob.jobid,
        success: function (_attachedFiles) {
            files = _attachedFiles
        }
    });
    var htmlStrRiskAttfile = '';
    $.each(
    files, function (key, val) {
        var filepath = serverurl + val.filepath
        htmlStrRiskAttfile = htmlStrRiskAttfile + '<tr id="' + val.associationid + '_' + 'Job' + '">';
        htmlStrRiskAttfile = htmlStrRiskAttfile + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
        htmlStrRiskAttfile = htmlStrRiskAttfile + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteJobRiskAssFile(' + "'" + val.associationid + "'" + ',' + "'" + 'Job' + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
    });
    $("#JobRiskFileListBody").empty();
    jQuery('#JobRiskFileListBody').append(htmlStrRiskAttfile);
}

function deleteJobRiskAssFile(associateId, layername) {
    // var r=confirm("Do you want to Delete Association id: "+associtionid);
    jConfirm($._('alert_delete_risk_assessment'), $._('alert_confirm_title'), function (response) {
    	
        if (response == true) {
            $.ajax({
                type: "POST",
                url: STUDIO_URL + "nonspatialattachment/delete/" + associateId,
                success: function (resp) {
                    // enable browse control once risk assesment is
                    // deleted as only one
                    // risk assesment ref doc can be uploaded against a
                    // job
                    $('#table-riskAssRequired').show();
                    jQuery('#' + associateId + '_' + layername).remove();
                    riskassessmentComplete = false;
                }

            });
        } else {
            return;
        }

    });
    
    $('#popup_ok').attr("value", $._('popupOk'));
	$('#popup_cancel').attr("value", $._('_cancel'));

}

function updateRiskDivOnLoad(){
	
	if (currentJob.jobid != 0) {
        if (currentJob.riskAssesmentReq) {
            // alert('riskassreq = true');
            $("input[name='riskAssRequired'][value='y']").attr("checked", "checked");
            $('#RiskFileList').show();
            jQuery('#riskAssRequired').val('y');
            if(jQuery('#JobRiskFileListBody')[0].rows.length == 0){
    			$('#table-riskAssRequired').show();
    		}
            else{
            	$('#table-riskAssRequired').hide();	
            }
            
        } else {
        	$("input[name='riskAssRequired'][value='n']").attr("checked", "checked");
            $('#RiskFileList').hide();
            $('#table-riskAssRequired').hide();
            $('#div-riskAssRequired').hide();
            jQuery('#riskAssRequired').val('n');
        }
        if (currentJob.riskAssesmentCompletion) {
            $("input[name='riskAssCompleted'][value='y']").attr("checked", "checked");
            jQuery('#riskAssCompleted').val('y');
            $('#table-riskAssRequired').attr("disabled", true);
        } else {

            $("input[name='riskAssCompleted'][value='n']").attr("checked", "checked");
            jQuery('#riskAssCompleted').val('n');
        }
        

    } else {
        // set risk assement required as false in case new job is Created
        $("input[name='riskAssRequired'][value='n']").attr("checked", "checked");
        $('#RiskFileList').hide();
        $('#table-riskAssRequired').hide();
    }}