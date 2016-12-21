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

function showLegaleDetails(_legalid){
	
	
			$("#tabs-Tool").empty();
			jQuery.get("resources/templates/viewer/legal.html", function (template) {
				
				
				addTab($._('legal'),template);
				
				$('#span-close').attr('title',$._('close_title'));
				
				jQuery("#LegalInfo_DetailsTmpl").tmpl().appendTo("#LegalInfo_DetailsBody");
				
				
				jQuery("#legalid").val(_legalid);
				
				$(function() {
			        $("#legalEffectiveDate").datepicker({ dateFormat: 'dd/mm/yy',
						changeMonth: true,
						changeYear: true
		            }).attr('readonly','readonly');
				});
				$(function() {
			        $("#legalEstimatedDate").datepicker({ dateFormat: 'dd/mm/yy',
						changeMonth: true,
						changeYear: true
		            }).attr('readonly','readonly');
				});
				
				
				$("#legalInfoForm :input").attr("disabled", true);
				
				$("#btnCancelLegal").hide();
				$("#btnSaveLegal").hide();
				
				legalLabelTranslations();
															
			});
	
	
}

function legalLabelTranslations(){
	$('#legal_rowid').html($._('row_id') + ' : ');
	$('#legal_authority').html($._('legal_authority') + ' : ');
	$('#legal_type').html($._('type') + ' : ');
	$('#legal_effects').html($._('legal_effects') + ' : ');
	$('#legal_path_passable').html($._('legal_path_passable') + ' : ');
	$('#legal_status').html($._('legal_status') + ' : ');
	$('#legal_eff_date').html($._('legal_effective_date') + ' : ');
	$('#legal_estm_clsr_date').html($._('legal_effective_closure_date') + ' : ');
	$('#legal_evt_modification').html($._('legal_event_modification') + ' : ');
	$('#legal_notes').html($._('notes') + ' : ');
	$('#legal_parent_issue').attr("title",$._('go_to_parent_issue'));
	$('#legal_edit').attr("value", $._('Edit'));
	$('#legal_cancel').attr("value", $._('_cancel'));
	$('#legal_save').attr("value", $._('Save'));
	window.setTimeout("attachmentLabelTranslations()", 1000);
}


function saveLegalDetails(){
	
	$("#legalInfoForm").validate({

        rules: {
        	legalAuth: "required",
        	legalType : "required",
        	legalEffects : "required",				
        	legalEffectiveDate : "required"
        },
        messages: {
        	legalAuth: $._('select_legal_authority'),
        	legalType : $._('select_legal_type'),
        	legalEffects : $._('select_effects'),			
        	legalEffectiveDate : $._('select_effective_date')
        	
        }
    });

    
    
    if ($("#legalInfoForm").valid()) {
    	var _issueId=jQuery("#issueGid").val();
    	jQuery.ajax({
            type: "POST",              
            url: "legal/create" + "?" + token,
            data: jQuery("#legalInfoForm").serialize(),
            async:false,
            success: function (data) {  
            	if(data == 1){
            		jAlert($._('legal_created_successfully'), $._('legal'));
            		$('#popup_ok').attr("value", $._('popupOk'));
            	}else{
            		jAlert($._('legal_updated_successfully'), $._('legal'));
            		$('#popup_ok').attr("value", $._('popupOk'));
            	}
                
            }
        });
    	
    	$("#fileAttachmentLegal").show();
    	hideLegalDetails();
	}
    else{
    	return;
    }
	
		
	
	
}

function createLegalDropDown(){
	
	var _legalAuths=getLegalDataByUrl("legal/authorityLkp");
	var _legalTypes=getLegalDataByUrl("legal/legalTypeLkp/" + lang);
	var _legalEffects=getLegalDataByUrl("legal/effectsLkp");
	var _legalStatuses=getLegalDataByUrl("legal/statusLkp/" + lang);
	var _legalLegalEventorders=getLegalDataByUrl("legal/modOrder/" + lang);
			
	if(_legalAuths!=null){
	jQuery("#legalAuth").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
	jQuery.each(_legalAuths, function (i, _legalAuth) {    	
		    //jQuery("#legalAuth").append(jQuery("<option></option>").attr("value", _legalAuth.legalauthorityid).text(_legalAuth.legalAuthority));
		    jQuery("#legalAuth").append(jQuery("<option></option>").attr("value", _legalAuth.legalauthorityid).text((lang=='cy')?_legalAuth.awdurdodCyfrithiol:_legalAuth.legalAuthority));
		    
	});		
	}

	if(_legalTypes!=null){
	jQuery("#legalType").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
    jQuery.each(_legalTypes, function (i, _legalType) {    	
			jQuery("#legalType").append(jQuery("<option></option>").attr("value", _legalType.legaltypeid).text((lang=='en')?_legalType.legalType:_legalType.cyfreithiol));        
	});
	}

    if(_legalEffects!=null){
    	jQuery("#legalEffects").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
    	jQuery.each(_legalEffects, function (i, _legalEffect) {    	
		    jQuery("#legalEffects").append(jQuery("<option></option>").attr("value", _legalEffect.legaleffectid).text((lang=='en')?_legalEffect.legalEffect:_legalEffect.effaithGyfreithiol));       
    });	
    }
    
	if(_legalStatuses!=null){
	jQuery("#legalStatus").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
    jQuery.each(_legalStatuses, function (i, _legalStatus) {    	
		    jQuery("#legalStatus").append(jQuery("<option></option>").attr("value", _legalStatus.legalstatusid).text((lang=='en')?_legalStatus.legalStatus:_legalStatus.statwsCyfreithiol));        
	 });
	}
		
    if(_legalLegalEventorders!=null){
    jQuery("#legalLegalEventorder").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
	jQuery.each(_legalLegalEventorders, function (i, _legalLegalEventorder) {    	
			jQuery("#legalLegalEventorder").append(jQuery("<option></option>").attr("value", _legalLegalEventorder.id).text((lang=='en')?_legalLegalEventorder.legalEventModificationOrder:_legalLegalEventorder.addasuDigwyddiadCyfreithiol));        
	});
    }
    
    
    ///////////////
    jQuery("#isPathPass").empty();
    jQuery("#isPathPass").append(jQuery("<option></option>")
    		.attr("value", "false").text($._('no')));

    //jQuery("#isPathPass").append(jQuery("<option></option>").attr("value", "true").text($._('yes')));
    jQuery("#isPathPass").append(jQuery("<option></option>").attr("value", "true").text((lang=='en')?"Yes":"Gellir"));
    
    
    ////////////
}

function getLegalDataByUrl(comboTypeUrl){
	
	var legalDataByUrl=null;
	
	$.ajax({
    	type: "GET", 
    	url: comboTypeUrl,		
        async:false,
		success: function (data) {    				
			legalDataByUrl= data;
        }

    });
	return legalDataByUrl;
	
}
function createLegal(_issueId){
	
}
function createLegal(_issueId,_rowId){
	
	      var jobData;
			jQuery.ajax({
		        async: false,
		        type: "GET",
		        url: STUDIO_URL + "job/issue/" + _issueId,
		        success: function (data) {
		        	jobData=data;
		        }
		    });
			
			if(jobData!=null && jobData.jobid>0){
	        	   //jAlert('You cannot create legal for this issue because job already exist for this issue.');
				jAlert($._('alert_cannot_create_job'), $._('alert'));
                $('#popup_ok').attr("value", $._('popupOk'));
	        	   
	        	   return;
	        }
	
	        var legalData;
	        $.ajax({
		    	type: "GET", 
		    	url: "legalDetails/"+_issueId,		
		        async:false,
				success: function (data) {   
					
					data.effectiveDate = convertDateToEuropeanFormat(data.effectiveDate);
					data.estimatedClosureDate = convertDateToEuropeanFormat(data.estimatedClosureDate);
					legalData=data;
				}

		    });
	        
	        $("#tabs-Tool").empty();
						
			jQuery.get("resources/templates/viewer/legal.html", function (template) {
				
				addTab($._('legal'),template);	
				$('#span-close').attr('title',$._('close_title'));
				jQuery("#LegalInfo_DetailsTmpl").tmpl(legalData).appendTo("#LegalInfo_DetailsBody");
				
				
				jQuery("#issueGid").val(_issueId);
				jQuery("#legalRoWID").val(_rowId);				
				
				$(function() {
			        $("#legalEffectiveDate").datepicker({ dateFormat: 'dd/mm/yy',
						changeMonth: true,
						changeYear: true
		            }).attr('readonly','readonly');
				});
				$(function() {
			        $("#legalEstimatedDate").datepicker({ dateFormat: 'dd/mm/yy',
						changeMonth: true,
						changeYear: true
		            }).attr('readonly','readonly');
				});			
							
								
		        createLegalDropDown();
		        
		        if(legalData!=null && legalData.legalid!=null){
		           populateLegalFormValues(legalData);		           	           
		           hideLegalDetails(); 
		           $("#fileAttachmentLegal").show();
		           fileAttachmentLegal(legalData);	
		        }else{		            
		        	editLegalDetails();	
		        	$("#fileAttachmentLegal").hide();
		        }
		        legalLabelTranslations();
			});
			
			
	
}


function hideLegalDetails(){
	 $("#btnUpdateLegal").show();
     $("#btnCancelLegal").hide();
     $("#btnSaveLegal").hide();				            
     $("#legalInfoForm :input").attr("disabled", true);		
}

function editLegalDetails(){
	  $("#btnUpdateLegal").hide();
      $("#btnCancelLegal").show();
      $("#btnSaveLegal").show();		            
      $("#legalInfoForm :input").attr("disabled", false);
      $("#legalRoWID").attr('disabled', true);
}

function populateLegalFormValues(legalData){
	
	  				
	if(legalData.legalAuthorityLkp!=null)
	       jQuery('#legalAuth').val(legalData.legalAuthorityLkp.legalauthorityid);
	
	if(legalData.legalTypeLkp!=null)
		   jQuery('#legalType').val(legalData.legalTypeLkp.legaltypeid);
	
	if(legalData.legalEffectsLkp!=null)
		   jQuery('#legalEffects').val(legalData.legalEffectsLkp.legaleffectid);
	
	if(legalData.legalStatusLkp!=null)
		   jQuery('#legalStatus').val(legalData.legalStatusLkp.legalstatusid);
	
	if(legalData.legalEventModificationOrderBean!=null)
		   jQuery('#legalLegalEventorder').val(legalData.legalEventModificationOrderBean.id);
     
	if(legalData.isPathPassable!=null){
		   jQuery('#isPathPass').val(""+legalData.isPathPassable);
	}
	
	jQuery('#legalEffectiveDate').val(legalData.effectiveDate);
	jQuery('#legalEstimatedDate').val(legalData.estimatedClosureDate);
	jQuery('#legalNotes').val(legalData.notes);
		
	
}

function fileAttachmentLegal(legalData){
	
	
	var serverurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
	
	var attachedFiles = legalData.attachments;
	$("#legalAttchFileListBody").empty();
    var htmlStr = '';

    if(attachedFiles!=null){
	    $.each(
	    attachedFiles, function (key, val) {
	        var filepath = serverurl + val.filepath
	        htmlStr = htmlStr + '<tr id="' + val.layername + '_' + val.associationid + '">';
	        htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
	        htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteLegalAttachedFile(' + "'" + val.layername + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
	    });
    }
    jQuery("#legalAttachmentBody").empty();
    jQuery("#legalAttachmentTmpl").tmpl(
    		legalData).appendTo("#legalAttachmentBody");
	
	
	
    jQuery.get('fileupload', function (template1) {

        $("#fileAttachmentDiv").append(template1);

        $('<input type="hidden" name="ajaxUpload" value="true" />').insertAfter($("#file"));
        $("#fileuploadForm").attr("action", "fileupload?" + token);

        $("#fileuploadForm").ajaxForm({
            success: function (
            filepath_name) {
                
            	
            	var legalData=null;
    	        $.ajax({
    		    	type: "GET", 
    		    	url: "legalDetails/"+jQuery("#issueGid").val(),		
    		        async:false,
    				success: function (data) {   
    					legalData=data;					
    					
    				}

    		    });
            	
            	if(legalData.legalid==null){
            		jAlert('Please create legal first.', 'Attachment');
            		return;
            	}
            	
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
                    var associationid = legalData.legalid;
                    var layername = LEGAL_NAME;
                    var keyfield = legalData.rowId;
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
                                markup = markup + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteLegalAttachedFile(' + "'" + layername + "'" + ',' + "'" + associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
                                refreshLegalAttachedFiles(
                                		legalData.legalid, serverurl);
                            }
                        });
                    } else {
                        jAlert('Enter both Description and File Name', 'Attachment');
                    }
                }

            },
            error: function (
            xhr, status) {
                jAlert('File size is greater than permissible limit');
            }
        }); // ajaxForm
    }); // fileupload
		
    
    jQuery('#legalAttchFileListBody').append(htmlStr);
    
}

function refreshLegalAttachedFiles(gid, serverurl) {
    var files = null;
    var _layer = layer;
    $.ajax({
        type: "GET",
        async: false,
        //url : STUDIO_URL + "attachment/gid/" + gid,
        url: STUDIO_URL + "nonspatialattachment/" + LEGAL_NAME + "/gid/" + gid,
        success: function (_attachedFiles) {
            files = _attachedFiles
        }
    });
    var htmlStr = '';
    $.each(
    files, function (key, val) {
        var filepath = serverurl + val.filepath
        htmlStr = htmlStr + '<tr id="' + val.layername + '_' + val.associationid + '">';
        htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
        htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteLegalAttachedFile(' + "'" + val.layername + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
    });
    $("#legalAttchFileListBody").empty();
    jQuery('#legalAttchFileListBody').append(htmlStr);
}

function deleteLegalAttachedFile(layername, associateId) {
    
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


function legalCancelBtn(legalid){

if(legalid==undefined){
	closeDialog('legalinfodiv');
}
else{
	hideLegalDetails();
}


}