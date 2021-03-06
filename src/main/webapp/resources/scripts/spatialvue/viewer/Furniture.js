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
var furniture_contacts = null;
var furnitureGID = null;
var furnitureId=null;
var _geomFeature;
var furnitureTypes = null;
var furnitureCondition = null;
var furnitureSurveyor = null;
var _saveStrategy = null;
var currentFurniture = null;
var _serverurl = null;
var isediting;
var furnitureattributedata = {};
var furniture_wfs = null;

SpatialVue.Furniture = function (_map, _searchdiv, masterdetails, geomFeature, newGid) {
    isediting = false;
    savetype='NEW';
    _geomFeature = geomFeature;
    _saveStrategy = null;
    map = _map;
    var _gid = null;
    if (newGid != undefined) {
        _gid = newGid;
    } else {
        _gid = masterdetails.gid;
    }
    // var _rowid= masterdetails.row_id;
    furnitureGID = _gid;
    searchdiv = _searchdiv;
    showResultsinDialog = true;
    var _layer = layer;
    var _associationIds = associationIds;
    var serverurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    _serverurl = serverurl;
    var attachedFiles = null;
    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "furniture/" + _gid,
        success: function (data) {
        	data.installedDate = convertDateToEuropeanFormat(data.installedDate);
        	data.lastInspected = convertDateToEuropeanFormat(data.lastInspected);
        	data.nextPathsurvey = convertDateToEuropeanFormat(data.nextPathsurvey);
            currentFurniture = data;
            furniture_contacts = data.contacts;
            attachedFiles = data.attachments;
            furnitureId = data.furnitureid;
        }
    });
    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "furniture/type/" + lang,
        success: function (data) {
            furnitureTypes = data

        }
    });

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "furniture/condition",
        success: function (data) {
            furnitureCondition = data
            
        }
    });

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "furniture/surveyor",
        success: function (data) {
            furnitureSurveyor = data

        }
    });

    $("#tabs-Tool").empty();
    jQuery.get('resources/templates/viewer/furnitureinfo.html', function (template) {
        addTab($._('Furniture'), template);
        
        $('#span-close').attr('title',$._('close_title'));
        
        $("#FurAttchFileListBody").empty();
        var htmlStr = '';

        $.each(
        attachedFiles, function (key, val) {
            var filepath = serverurl + val.filepath
            htmlStr = htmlStr + '<tr id="' + _layer.name + '_' + val.associationid + '">';
            htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
            htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteFurnitureAttachedFile(' + "'" + _layer.name + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
        });

        jQuery("#FurnitureInfo_DetailsBody").empty();

        jQuery("#FurnitureInfo_DetailsTmpl").tmpl(
        currentFurniture).appendTo("#FurnitureInfo_DetailsBody");

        jQuery("#furnitureInfo_AttachmentBody").empty();

        jQuery("#furnitureInfo_AttachmentTmpl").tmpl(
        currentFurniture).appendTo("#furnitureInfo_AttachmentBody");
        
        jQuery("#furnitureUnresolvedIssues").empty();
        jQuery("#furnitureUnresolvedIssues").append(jQuery("<option></option>")
        		.attr("value", "false").text((lang=='en')?"No":"Na"));

        jQuery("#furnitureUnresolvedIssues").append(jQuery("<option></option>")
        		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));
        
        jQuery("#type").empty()
        jQuery.each(furnitureTypes, function (i, furnitureType) {
            jQuery("#type").append(
            jQuery("<option></option>").attr("value", furnitureType.typeid).text(
            (lang=='en')?furnitureType.type:furnitureType.math));
        });

        jQuery("#furnitureSurveyor").empty();
		jQuery("#furnitureSurveyor").append(jQuery("<option></option>").attr("value", "").text((lang=='en')?"Please Select":"Dewisiwch"));
        jQuery.each(furnitureSurveyor, function (i, furnitureSurvey) {
            jQuery("#furnitureSurveyor").append(
            jQuery("<option></option>").attr("value", furnitureSurvey.id).text(
            furnitureSurvey.name));
        });

        jQuery.each(furnitureCondition, function (i, furnitureCond) {
            jQuery("#condition").append(
            jQuery("<option></option>").attr("value", furnitureCond.conditionid).text(
            (lang=='en')?furnitureCond.condition:furnitureCond.cyflwr));
        });

        
        // Attachment
        if (!currentFurniture.ishistory) {
            jQuery.get('fileupload', function (template1) {

                $("#FurfileAttachmentDiv").append(template1);

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

                            //var selRow = $('#tablegrid1').jqGrid('getGridParam', 'selarrrow');

                            //var fieldVal = featureGeom[selRow[0] - 1][1];

                            var filename = uploadFilename;
                            var associationid = $('#hid-furnitureGid').val();
                            var layername = _layer.name;
                            var keyfield = currentFurniture.rowId;
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
                                    url: STUDIO_URL + "attachment/create",
                                    data: $("#fileuploadForm").serialize(),
                                    success: function (
                                    fileurl) {
                                        var _fileurl = serverurl + fileurl;
                                        var markup = "";
                                        markup = markup + '<tr id="' + layername + '_' + associationid + '">';
                                        markup = markup + '<td align="left" class="padcellup"><a href="' + _fileurl + '" target="_blank">' + filename + '</a></td>';
                                        markup = markup + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteFurnitureAttachedFile(' + "'" + layername + "'" + ',' + "'" + associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
                                        refreshFurnitureAttachedFiles(
                                        currentFurniture.gid, _serverurl);
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
            jQuery('#type').val(
            currentFurniture.furnitureTypeLkp.typeid);
            jQuery('#condition').val(
            currentFurniture.furnitureConditionLkp.conditionid);
            jQuery('#furnitureUnresolvedIssues').val(
            currentFurniture.unresolvedIssues.toString());
            //jQuery('#furnitureSurveyor').val(currentFurniture.surveyor.toString());
			
            
            //jQuery('#furnitureSurveyor').val(currentFurniture.surveyor);
            
            /********Inactive User************/
            
            if(currentFurniture.surveyor!=null && currentFurniture.surveyor!=""){
                
  			  
  			  if(checkDropdowHasValue('furnitureSurveyor',currentFurniture.surveyor)){
  				jQuery("#txtFurnitureSurveyor").hide();
  				jQuery("#furnitureSurveyor").show();
  				jQuery("#furnitureSurveyor").val(currentFurniture.surveyor);
  			}
  			else
  			{
  			jQuery("#txtFurnitureSurveyor").val(currentFurniture.surveyorName);	
  			jQuery("#txtFurnitureSurveyor").show();
  			jQuery("#furnitureSurveyor").hide();
  			}
  			  
  			}
            /********end************/
            
            jQuery('#FurAttchFileListBody').append(htmlStr);
            $('#fileDesc').val('');
            $('#file').val('');
            
        } else {
            jQuery('#type').val(
            currentFurniture.furnitureTypeLkp.typeid);
            jQuery('#condition').val(
            currentFurniture.furnitureConditionLkp.conditionid);
            jQuery('#furnitureUnresolvedIssues').val(
            currentFurniture.unresolvedIssues.toString());
            //jQuery('#furnitureSurveyor').val(currentFurniture.surveyor.toString());
			
            //jQuery('#furnitureSurveyor').val(currentFurniture.surveyor);
           
            /********Inactive User************/
            if(currentFurniture.surveyor!=null && currentFurniture.surveyor!=""){
                
  			  
  			  if(checkDropdowHasValue('furnitureSurveyor',currentFurniture.surveyor)){
  				jQuery("#txtFurnitureSurveyor").hide();
  				jQuery("#furnitureSurveyor").show();
  				jQuery("#furnitureSurveyor").val(currentFurniture.surveyor);
  			}
  			else
  			{
  			jQuery("#txtFurnitureSurveyor").val(currentFurniture.surveyorName);
  			jQuery("#txtFurnitureSurveyor").show();
  			jQuery("#furnitureSurveyor").hide();
  			}
  			  
  			} 
            /*********End***********/
			jQuery('#FurAttchFileListBody').append(htmlStr);
            $('#FurfileAttachmentDiv').hide();
            $('.btn01').remove();
            $('.nxtPrevBTNHolder').remove();
            $(".deleteFileTD").remove();
        }
        $(function () {
            $("#furnitureInstalledDate").datepicker({
                dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
        });
        $(function () {
            $("#furnitureLastInspected").datepicker({
                dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
        });
        $(function () {
            $("#furnitureNextsurvey").datepicker({
                dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
        });

        if (currentFurniture.ishistory){
        	$("#btnUpdateFurniture").hide();
        }
        $("#furnitureInfoTable :input").attr("disabled", true);
        //$("#FurattachmentDiv :input").attr("disabled", true);
        //$('#FurattachmentDiv a').attr("disabled", true);
        $("#btnCancelFurniture").hide();
        $("#btnSaveFurniture").hide();
        // }
        
        $("#btnUpdateFurniture").click(

        function () {
            if (!currentFurniture.ishistory) {
                $("#furnitureInfoTable :input").removeAttr("disabled");
                //$("#FurattachmentDiv :input").removeAttr("disabled");
                //$('#FurattachmentDiv a').removeAttr("disabled");
                jQuery("#txtFurnitureSurveyor").hide();
				jQuery("#furnitureSurveyor").show();
						
				$("#roWID").attr("disabled", true);
                $("#furnitureid").attr("disabled", true);
                $("#furnitureUnresolvedIssues").attr("disabled", true);
                $("#btnUpdateFurniture").hide();
                $("#btnCancelFurniture").show();
                $("#btnSaveFurniture").show();
                $('#furnitureInfo_AttachmentBody').hide();
            } else {
                jAlert('Selected record is historical feature. Please select valid Furniture.');
            }
        });

        $("#btnCancelFurniture").click(

        function () {
            var furniture = new SpatialVue.Furniture(
            map, "sidebar", currentFurniture, _geomFeature)
        });
        furnitureLabelTranslations();
    });
};

/*function attachmentLabelTranslations(){
	$('#attachment_header').html($._('attachment'));
	$('#attachment_desc').html($._('description'));
	$('#attachment_file').html($._('filename'));
	$('#btnupload_attachment').attr("value", $._('attach'));
	$('#attached_files').html($._('attached_files'));
	$('#attchmt_file').html($._('file'));
	$('#attchmt_action').html($._('action'));
}*/

function furnitureLabelTranslations(){
	//Do translations for label
    $('#furnitureid1').html($._('furnitureid') + ' : ');
    $('#row_id').html($._('row_id') + ' : ');
    $('#lbl_furniture_type').html($._('type') + ' : ');
    $('#installed_date').html($._('installed_date') + ' : ');
    $('#lbl_furniture_condition').html($._('condition') + ' : ');
    $('#unresolved_issues').html($._('unresolved_issues') + ' : ');
    $('#last_inspected').html($._('last_inspected') + ' : ');
    $('#surveyor').html($._('surveyor') + ' : ');
    $('#next_pathsurvey').html($._('next_pathsurvey') + ' : ');
    $('#notes').html($._('notes') + ' : ');
    $('#fntr_edit').attr("value", $._('Edit'));
	$('#fntr_cancel').attr("value", $._('Cancel'));
	$('#fntr_save').attr("value", $._($('#btnSaveFurniture input').attr('value')));
	$('#locate_furniture_lnk').attr("title", $._('locate_on_map'));
	$('#create_issue_lnk').attr("title", $._('create_issue'));
	$('#furnitureLink_1').attr("title", $._('view_furniture_link'));
	$('#furnitureLink_3').attr("title", $._('edit_furniture'));
	
	 window.setTimeout("attachmentLabelTranslations()", 1000); 

}

function getPreviousFurniture(_gid, furnitureid) {

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "furniture/" + furnitureid + "/prev/" + _gid,

        success: function (data) {

            if (data.gid != null) {
            	
            	data.installedDate = convertDateToEuropeanFormat(data.installedDate);
            	data.lastInspected = convertDateToEuropeanFormat(data.lastInspected);
            	data.nextPathsurvey = convertDateToEuropeanFormat(data.nextPathsurvey);
            	
                jQuery("#FurnitureInfo_DetailsBody").empty();

                jQuery("#FurnitureInfo_DetailsTmpl").tmpl(data).appendTo("#FurnitureInfo_DetailsBody");

                jQuery("#furnitureInfo_AttachmentBody").empty();

                jQuery("#furnitureInfo_AttachmentTmpl").tmpl(data).appendTo("#furnitureInfo_AttachmentBody");
				
				
				jQuery("#furnitureUnresolvedIssues").append(jQuery("<option></option>")
        		.attr("value", "false").text((lang=='en')?"No":"Na"));

				jQuery("#furnitureUnresolvedIssues").append(jQuery("<option></option>")
        		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));
				
                jQuery.each(furnitureTypes, function (i, furnitureType) {
                    jQuery("#type").append(
                    jQuery("<option></option>").attr("value", furnitureType.typeid).text(
                    furnitureType.type));
                });

                jQuery.each(furnitureSurveyor, function (i, furnitureSurvey) {
                    jQuery("#furnitureSurveyor").append(
                    jQuery("<option></option>").attr("value", furnitureSurvey.id).text(
                    furnitureSurvey.name));
                });

                jQuery.each(furnitureCondition, function (i, furnitureCond) {
                    jQuery("#condition").append(
                    jQuery("<option></option>").attr("value", furnitureCond.conditionid).text(
                    		(lang=='en')?furnitureCond.condition:furnitureCond.cyflwr));
                });

                // refreshAttachedFiles(data.gid,_serverurl);
                var htmlStr = '';

                $.each(
                data.attachments, function (key, val) {
                    var filepath = _serverurl + val.filepath;
                    htmlStr = htmlStr + '<tr id="' + layer.name + '_' + val.associationid + '">';
                    htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
                    htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteFurnitureAttachedFile(' + "'" + layer.name + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
                });

                $("#AttchFileListBody").empty();
                // jQuery('#AttchFileListBody').append(htmlStr);
                jQuery('#FurAttchFileListBody').append(htmlStr);
                $('#fileDesc').val('');
                $('#file').val('');

                jQuery('#type').val(data.furnitureTypeLkp.typeid);
                jQuery('#condition').val(
                data.furnitureConditionLkp.conditionid);
                jQuery('#furnitureUnresolvedIssues').val(
                data.unresolvedIssues.toString());
                //jQuery('#furnitureSurveyor').val(data.surveyor.toString());
				//jQuery('#furnitureSurveyor').val(data.surveyor);
                
                /********Inactive User************/
                
                if(data.surveyor!=null && data.surveyor!=""){
                    
      			  
      			  if(checkDropdowHasValue('furnitureSurveyor',data.surveyor)){
      				jQuery("#txtFurnitureSurveyor").hide();
      				jQuery("#furnitureSurveyor").show();
      				jQuery("#furnitureSurveyor").val(data.surveyor);
      			}
      			else
      			{
      			jQuery("#txtFurnitureSurveyor").val(data.surveyorName);
      			jQuery("#txtFurnitureSurveyor").show();
      			jQuery("#furnitureSurveyor").hide();
      			}
      			  
      			}
                /********end************/
                
                $("#furnitureInfoTable :input").attr("disabled", true);
               // $("#FurattachmentDiv :input").attr("disabled", true);
                $(".deleteFileTD").remove();
                $('.btn01').remove();
                $("#btnCancelFurniture").hide();
                $("#btnSaveFurniture").hide();
                $("#btnUpdateFurniture").hide();

                furnitureLabelTranslations();
            } else {

                jAlert('No history found');
            }
        }
    });

}

function getNextFurniture(_gid, furnitureid) {

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "furniture/" + furnitureid + "/next/" + _gid,

        success: function (data) {
            // currentAccessLand=data;
            // accessland_contacts=data.contacts;
            if (data.gid != null) {
            	data.installedDate = convertDateToEuropeanFormat(data.installedDate);
            	data.lastInspected = convertDateToEuropeanFormat(data.lastInspected);
            	data.nextPathsurvey = convertDateToEuropeanFormat(data.nextPathsurvey);
            	
                jQuery("#FurnitureInfo_DetailsBody").empty();

                jQuery("#FurnitureInfo_DetailsTmpl").tmpl(data).appendTo("#FurnitureInfo_DetailsBody");

                jQuery("#furnitureInfo_AttachmentBody").empty();

                jQuery("#furnitureInfo_AttachmentTmpl").tmpl(data).appendTo("#furnitureInfo_AttachmentBody");

                jQuery.each(furnitureTypes, function (i, furnitureType) {
                    jQuery("#type").append(
                    jQuery("<option></option>").attr("value", furnitureType.typeid).text(
                    furnitureType.type));
                });

                jQuery.each(furnitureSurveyor, function (i, furnitureSurvey) {
                    jQuery("#furnitureSurveyor").append(
                    jQuery("<option></option>").attr("value", furnitureSurvey.id).text(
                    furnitureSurvey.name));
                });

                jQuery.each(furnitureCondition, function (i, furnitureCond) {
                    jQuery("#condition").append(
                    jQuery("<option></option>").attr("value", furnitureCond.conditionid).text(
                    		(lang=='en')?furnitureCond.condition:furnitureCond.cyflwr));
                });
                
                jQuery("#furnitureUnresolvedIssues").empty();
                jQuery("#furnitureUnresolvedIssues").append(jQuery("<option></option>")
                		.attr("value", "false").text((lang=='en')?"No":"Na"));

        				jQuery("#furnitureUnresolvedIssues").append(jQuery("<option></option>")
                		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));
                
                // refreshAttachedFiles(data.gid,_serverurl);
                var htmlStr = '';

                $.each(
                data.attachments, function (key, val) {
                    var filepath = _serverurl + val.filepath;
                    htmlStr = htmlStr + '<tr id="' + layer.name + '_' + val.associationid + '">';
                    htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
                    htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteFurnitureAttachedFile(' + "'" + layer.name + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
                });

                $("#AttchFileListBody").empty();
                // jQuery('#AttchFileListBody').append(htmlStr);
                jQuery('#FurAttchFileListBody').append(htmlStr);
                $('#fileDesc').val('');
                $('#file').val('');

                jQuery('#type').val(data.furnitureTypeLkp.typeid);
                jQuery('#data').val(
                data.furnitureConditionLkp.conditionid);
                jQuery('#furnitureUnresolvedIssues').val(
                data.unresolvedIssues.toString());
               // jQuery('#furnitureSurveyor').val(data.surveyor.toString());
				//jQuery('#furnitureSurveyor').val(data.surveyor);
                
                
                /********Inactive User************/
                
                if(data.surveyor!=null && data.surveyor!=""){
                    
      			  
      			  if(checkDropdowHasValue('furnitureSurveyor',data.surveyor)){
      				jQuery("#txtFurnitureSurveyor").hide();
      				jQuery("#furnitureSurveyor").show();
      				jQuery("#furnitureSurveyor").val(data.surveyor);
      			}
      			else
      			{
      			jQuery("#txtFurnitureSurveyor").val(data.surveyorName);
      			jQuery("#txtFurnitureSurveyor").show();
      			jQuery("#furnitureSurveyor").hide();
      			}
      			  
      			}
                /********end************/
                

                $("#furnitureInfoTable :input").attr("disabled", true);
                //$("#FurattachmentDiv :input").attr("disabled", true);
                $(".deleteFileTD").remove();
                $('.btn01').remove();
                $("#btnCancelFurniture").hide();
                $("#btnSaveFurniture").hide();
                $("#btnUpdateFurniture").hide();
                
                furnitureLabelTranslations();

            } else {

                var furniture = new SpatialVue.Furniture(map, "sidebar", currentFurniture, _geomFeature)
                jAlert('No more record');
            }
        }
    });
}

function refreshFurnitureAttachedFiles(gid, serverurl) {
    var files = null;
    var _layer = layer;
    $.ajax({
        type: "GET",
        async: false,
        //url : STUDIO_URL + "attachment/gid/" + gid,
        url: STUDIO_URL + "attachment/" + "Furniture" + "/gid/" + gid,
        success: function (_attachedFiles) {
            files = _attachedFiles
        }
    });
    var htmlStr = '';
    $.each(
    files, function (key, val) {
        var filepath = serverurl + val.filepath
        htmlStr = htmlStr + '<tr id="' + _layer.name + '_' + val.associationid + '">';
        htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
        htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteFurnitureAttachedFile(' + "'" + _layer.name + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
    });
    $("#FurAttchFileListBody").empty();
    jQuery('#FurAttchFileListBody').append(htmlStr);
}

function applyFurnitureChanges() {
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

    var featPrefix = null;
    var targetNamespace = null;
    var currentFeature;

    var layerName = 'Furniture';
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
        furniture_wfs = map.getLayersByName("WFS")[0];
        if (furniture_wfs != undefined) {
            map.removeLayer(furniture_wfs);
        }

        if (_saveStrategy != null) {
            // this.Unregister();
            // _saveStrategy.events.unregister();
        }
        _saveStrategy = new OpenLayers.Strategy.Save();

        _saveStrategy.events.register('success', null, onFurnitureGeomSave);

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

            furniture_wfs = new OpenLayers.Layer.Vector("WFS", {
                reportError: true,
                strategies: [_saveStrategy],
                projection: _projection,
                protocol: _protocol,
                isBaseLayer: false,
                visibility: true,
                styleMap: styleMap,
                displayInLayerSwitcher: false
            });
            map.addLayers([furniture_wfs]);
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

    // Set Attributes for furnitureid
    if (trim($('#furnitureid').val()).length != 0) {
        layerfeature.attributes['furnitureid'] = $('#furnitureid').val();
    }
    // Set Attributes for row id
    if (trim($('#roWID').val()).length == 0) {
        jAlert('Please provide value for row_id');
		validForm=false;
        return;
    } else {
        layerfeature.attributes['row_id'] = $('#roWID').val();
    }
    // Set Attributes for type
    if (trim($('#type').val()).length != 0) {
        layerfeature.attributes['type'] = $('#type').val();
    }
    // Set Attributes for condition
    if (trim($('#condition').val()).length != 0) {
        layerfeature.attributes['condition'] = $('#condition').val();
    }
    // Set Attributes for furnitureNotes
    layerfeature.attributes['notes'] = $('#furnitureNotes').val();
    // Set Attributes for furnitureInstalledDate
    if (trim($('#furnitureInstalledDate').val()).length != 0) {
        layerfeature.attributes['installed_date'] = convertDateToUSFormat($('#furnitureInstalledDate').val());
    }
    // Set Attributes for furnitureUnresolvedIssues
    if (trim($('#furnitureUnresolvedIssues').val()).length != 0) {
        layerfeature.attributes['unresolved_issues'] = $('#furnitureUnresolvedIssues').val();
    }
    // Set Attributes for furnitureLastInspected
    if (trim($('#furnitureLastInspected').val()).length != 0) {
        layerfeature.attributes['last_inspected'] = convertDateToUSFormat($('#furnitureLastInspected').val());
    }
    // Set Attributes for furnitureSurveyor
    if (trim($('#furnitureSurveyor').val()).length != 0) {
        layerfeature.attributes['surveyor'] = $('#furnitureSurveyor').val();
    }
    else{
    	if (isediting) {
    		layerfeature.attributes['surveyor'] = null;
    	}
    	//jAlert('Please provide value for Surveyor');		
    	//validForm=false;
    	//return;
    }
    // Set Attributes for furnitureNextsurvey
    if (trim($('#furnitureNextsurvey').val()).length != 0) {
        layerfeature.attributes['next_pathsurvey'] = convertDateToUSFormat($('#furnitureNextsurvey').val());
    }
    layerfeature.attributes['ishistory'] = false;

    if (savetype == 'NEW') {
        layerfeature.state = OpenLayers.State.INSERT;
    } else if (savetype == 'EDIT') {
        layerfeature.state = OpenLayers.State.UPDATE;
    }

    if (!isediting) {
    	furniture_wfs.addFeatures([layerfeature]);
    }
	return validForm;
}

function saveFurnitureGeom() {
    _saveStrategy.save();

}

function onFurnitureGeomSave(event) {
    objLayer.redraw(true);
    var insertId = event.response.insertIds[0];
    var fid = insertId.substr(insertId.indexOf('.') + 1);
    // alert(fid);
    // update history
    if (!isediting) {
        jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "furniture/updatehistory/" + furnitureGID + "/" + furnitureId + "/" + fid,
            success: function (data) {
                var furniture = new SpatialVue.Furniture(map, "sidebar", currentFurniture, _geomFeature, fid);
                jAlert( $._('data_saved'), $._('alert'));
    			$('#popup_ok').attr("value", $._('popupOk'));
                
            }
        });

    } else {
    	jAlert( $._('data_saved'), $._('alert'));
		$('#popup_ok').attr("value", $._('popupOk'));

        $('#edit_content').empty();
    }
    furniture_wfs.removeAllFeatures(true); 
	if(g_wfs != null){
		g_wfs.removeAllFeatures(true);
	}
}

function saveFurniture() {
    
	if(applyFurnitureChanges()){
			  
		if (!isediting) {
        saveFurnitureGeom();
		}
		else{			
			//jAlert('Click on Save button to save the Furniture', 'Furniture');
			
			jAlert( $._('alert_click_Save_button') + ' ' + $._('Furniture'), $._('Furniture'));
			$('#popup_ok').attr("value", $._('popupOk'));
			
		}
	}
	/*
	applyFurnitureChanges();
    if (!isediting) {
        saveFurnitureGeom();
    }
    else{
    	jAlert('Click on Save button to save the Furniture', 'Furniture');	    
    }
	*/
}

function deleteFurnitureAttachedFile(layername, associateId) {
    // var r=confirm("Do you want to Delete Association id: "+associtionid);
    jConfirm('Are You Sure You Want To Delete : ', 'Delete Confirmation', function (response) {

        if (response == true) {
            $.ajax({
                type: "POST",
                url: STUDIO_URL + "attachment/delete/" + associateId,
                success: function (resp) {

                    jQuery('#' + layername + '_' + associateId).remove();

                }

            });
        } else {
            return;
        }

    });

}

function furnitureLink(_rowId, furnitureid) {
    
	if (furniture_contacts.length > 0) {
		jQuery.each(furniture_contacts, function (i, ctype) {    	
		
			furniture_contacts[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
		});
	}
	
	var _furniture_contacts = furniture_contacts;

    jQuery.get("resources/templates/viewer/furnitureLink.html", function (template) {

        var furnitureissueData;
        var furniturepathdata=null;
        // adding issue
        jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "furniture/issuelist/" + furnitureid + "/Open",
            success: function (data) {
            	if(data.length > 0){
		            	jQuery.ajax({
		                    async: false,
		                    type: "GET",
		                    url: STUDIO_URL + "furniture/issueactions/" + furnitureid + "/Open",
		                    success: function(action){
		                    	for(i=0; i<data.length; i++){
		    	           		 	data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
		    	           		 	data[i].assignedTo = getNameFromEMail(data[i].assignedTo);
		    	           		 	//data[i]["ActionType"] = getActionType(data[i].gid.toString(), action);
		    	           		    data[i]["ActionType"] = $._(getActionType(data[i].gid.toString(), action));
		    	           		 	
		    	           		 	data[i].issueTypeLkp.type = (lang=='cy')?data[i].issueTypeLkp.math:data[i].issueTypeLkp.type;
		    	           		 	data[i].issueUrgencyLkp.urgencyType = (lang=='cy')?data[i].issueUrgencyLkp.brys:data[i].issueUrgencyLkp.urgencyType;
		    	           		 	data[i].actionStatusLkp.actionStatus = (lang=='cy')?data[i].actionStatusLkp.statws:data[i].actionStatusLkp.actionStatus;
		    	            	}
		                    }
		                });
            	}
	            furnitureissueData = data;
            }
        });
        
        
        // for isue
        jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "user/",
            success: function (data) {
                issueassignto = data;

            }
        });

        jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "furniture/path/" + _rowId,
            success: function (data) {
            	for(i=0; i<data.length; i++){
            		 data[i].lastsurvey = convertDateToEuropeanFormat(data[i].lastsurvey);
            		 data[i].pathTypeLkp.type = (lang=='cy')?data[i].pathTypeLkp.math:data[i].pathTypeLkp.type;
            		 data[i].pathLegalstatusLkp.status = (lang=='cy')?data[i].pathLegalstatusLkp.statws:data[i].pathLegalstatusLkp.status;
            		 if(lang=='cy'){
            			 data[i].classLkp.priority = data[i].classLkp.priority.replace("Priority", "Blaenoriaeth");
            		 }
            	}
                furniturepathdata = data;

            }
        });
		/*
        if (furnitureissueData.length != undefined) {
            for (var k = 0; k < furnitureissueData.length; k++) {
                furnitureattributedata[k] = furnitureissueData[k];
				
                $.each(
                issueassignto, function (key, val) {
                    if (val.id == furnitureattributedata[k].assignedTo) {
                        furnitureattributedata[k].assignedTo = val.email;
                        return;
                    }
                });
				
            }
        }
		*/
        addListingTab($._('furniture_links'), 'tab-furniturelink', template);
		if(_furniture_contacts.length>0){
        jQuery("#furniturelink_ContactTmpl").tmpl(
        _furniture_contacts).appendTo("#furniture_ContactTableBody");
		}
		
        // path
        if (furniturepathdata.length>0) {
            jQuery("#furniturelink_PathTmpl").tmpl(
            furniturepathdata).appendTo("#furniturelink_PathTableBody");

        } 
        // issue
        
		if (furnitureissueData.length >0) {
           jQuery("#furniturelink_IssueTmpl").tmpl(
		   furnitureissueData).appendTo("#furniturelink_IssueTableBody");
        } 

        jQuery("#furniturelink_accordion").accordion({
            fillSpace: true
        });
        // added for contact
        $("#addNewFurnitureContact").click(function () {
            addNewContact('furniture', furnitureGID);

        });

        $("#addToExistingFurnitureContact").click(function () {
            addExistingContact('furniture', furnitureGID);

        });

        $('#furniturelink_accordion h3 a').click(

        function (event) {
            // alert(event.currentTarget.id);
            // fetchFurnitureData(event.currentTarget.id);
        });
        
      //go to parent
		$("#goToparentfurnitureLink").click(function() {			
			showFurnitureDetails(furnitureGID,_rowId);
		});
		
		//for historical issue on furniture
		$("#histricolIssueFLink").click(function() {			
			viewIssueonFurniture(furnitureid,'History');
			
		});
		$("#openIssueFLink").click(function() {			
			viewIssueonFurniture(furnitureid,'Open');
		});	
		loadFurnitureLinkLabels();
    });
}

function loadFurnitureLinkLabels(){
	$('#FurnitureIssue').html($._('furnture_link_issue'));
	$('#furniture_parent').html($._('furniture_link_issue_parent'));
	$('#fp_open_issue').html($._('issues_open'));
	$('#fp_historical_issue').html($._('furniture_link_issue_historical'));
	$('#fp_id').html($._('Issueid'));
	$('#fp_rowid').html($._('row_id'));
	$('#fp_type').html($._('type'));
	$('#fp_urgency').html($._('urgency'));
	$('#fp_status').html($._('furniture_link_issue_status'));
	$('#fp_assigned_to').html($._('assigned_to'));
	$('#fp_resolved_by').html($._('resolve_by'));
	$('#fp_action').html($._('action'));
	
	$('#FurnitureRoW_Path').html($._('furniture_link_path'));
	$('#fl_path_id').html($._('row_id'));
	$('#fl_path_type').html($._('type'));
	$('#fl_path_priority').html($._('furniture_link_path_priority'));
	$('#fl_path_lastsurvey').html($._('furniture_link_path_lastsurvey'));
	$('#fl_status').html($._('legalstatus'));
	
	$('#FurnitureContact').html($._('furniture_link_contact'));
	$('#fl_add_new').html($._('furniture_link_addcontact'));
	$('#add_existing').html($._('furniture_link_existingcontact'));
	$('#fl_contactid').html($._('furniture_link_contactid'));
	$('#fl_fname').html($._('furniture_link_firstname'));
	$('#fl_surname').html($._('furniture_link_surname'));
	$('#fl_contactType').html($._('furniture_link_contacttype'));
	$('#fl_position').html($._('furniture_link_position'));
	//$('#fl_address').html($._('furniture_link_address'));
	$('#fl_address').html($._('Phone'));
	$('#fl_email').html($._('furniture_link_email'));
	
	$('.clsjob').attr("title", $._('create_job'));
	$('.clslegal').attr("title", $._('create_legal'));
}



function fetchFurnitureData(lyr) {
    // alert('load data: '+ lyr);
    var classdata = null;
    var typedata = null;
    var legalstatusdata = null;
    var conditiondata = null;
    var furnituretypedata = null;
    var issuetypedata = null;
    var issueurgency = null;
    var issuestatus = null;
    var issueassignto = null;
    var attributedata = {};

    var layerData = null;
    var furnituredata = null;
    var _furniture_contacts = furniture_contacts;
    var feature = _geomFeature;
    var furnitureLayer = map.getLayersByName(lyr)[0];
    var objSelect = null;
    var filter = null;

    if (lyr == 'RoW_Path' && $('#furniturelink_PathTableBody tr').length == 0) {
        // alert('Popoulating rows');
        objSelect = new Selection(feature, furnitureLayer);
        filter = objSelect.creationSelectionCriteria(this);
        objSelect.displaySelection(filter, selectionSymbolizer, furnitureLayer);
        layerData = objSelect.getResult(filter, false);
        if (layerData != undefined && layerData.length > 0) {
            jQuery.ajax({
                async: false,
                type: "GET",
                url: STUDIO_URL + "path/classLkp",
                success: function (data) {
                    classdata = data

                }
            });
            jQuery.ajax({
                async: false,
                type: "GET",
                url: STUDIO_URL + "path/type",
                success: function (data) {
                    typedata = data

                }
            });
            jQuery.ajax({
                async: false,
                type: "GET",
                url: STUDIO_URL + "path/legalstatus",
                success: function (data) {
                    legalstatusdata = data

                }
            });

            for (var i = 0; i < layerData.length; i++) {
                attributedata[i] = layerData[i].attributes;

                $.each(classdata, function (key, val) {
                    if (val.id == attributedata[i]._class) {
                        attributedata[i]._class = val.priority;
                        return;
                    }
                });

                $.each(typedata, function (key, val) {
                    if (val.pathTypeId == attributedata[i].type) {
                        attributedata[i].type = val.type;
                        return;
                    }
                });

                $.each(legalstatusdata, function (key, val) {
                    if (val.legalstatusid == attributedata[i].legalstatus) {
                        attributedata[i].legalstatus = val.status;
                        return;
                    }
                });

            }

            jQuery("#furniturelink_PathTableBody").empty();

            jQuery("#furniturelink_PathTmpl").tmpl(null, {
                attributeList: attributedata

            }).appendTo("#furniturelink_PathTableBody");
        }

    }
    /*
     * else if(lyr=='Issue' && $('#furniturelink_IssueTableBody tr').length==0){
     * //alert ('Populating furnitures');
     * 
     * objSelect= new Selection(feature, layer); filter =
     * objSelect.creationSelectionCriteria(this);
     * objSelect.displaySelection(filter, selectionSymbolizer, layer); layerData =
     * objSelect.getResult(filter, false); if(layerData!=undefined &&
     * layerData.length>0){
     * 
     * jQuery.ajax({ async:false, type: "GET", url: STUDIO_URL + "issue/type",
     * success: function (data) { issuetypedata=data } });
     * 
     * jQuery.ajax({ async:false, type: "GET", url: STUDIO_URL +
     * "issue/urgency", success: function (data) { issueurgency=data } });
     * 
     * jQuery.ajax({ async:false, type: "GET", url: STUDIO_URL + "issue/status",
     * success: function (data) { issuestatus=data } });
     * 
     * jQuery.ajax({ async:false, type: "GET", url: STUDIO_URL + "user/",
     * success: function (data) { issueassignto=data } });
     * 
     * for(var k=0;k<layerData.length;k++){
     * attributedata[k]=layerData[k].attributes;
     * 
     * $.each(issuetypedata, function (key, val) {
     * if(val.issuetypeid==attributedata[k].issuetype){
     * attributedata[k].issuetype=val.type; return; } });
     * 
     * $.each(issueurgency, function (key, val) {
     * if(val.urgencyid==attributedata[k].urgency){
     * attributedata[k].urgency=val.urgencyType; return; } });
     * 
     * $.each(issuestatus, function (key, val) {
     * if(val.actionstatusid==attributedata[k].actionstatus){
     * attributedata[k].actionstatus=val.actionStatus; return; } });
     * 
     * $.each(issueassignto, function (key, val) {
     * if(val.id==attributedata[k].assigned_to){
     * attributedata[k].assigned_to=val.email; return; } }); }
     * 
     * jQuery("#accessLandlink_IssueTableBody").empty();
     * jQuery("#accessLandlink_IssueTmpl").tmpl(null,{ issueList: attributedata
     * 
     * }).appendTo("#accessLandlink_IssueTableBody"); } }
     */
    // }
}

function refreshFurnitureContact(_gid) {

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "furniture/" + _gid,
        success: function (data) {
            furniture_contacts = data.contacts;
            
            if (furniture_contacts.length > 0) {
        		jQuery.each(furniture_contacts, function (i, ctype) {    	
        		
        			furniture_contacts[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
        		});
        	}

        }
    });
    $("#furniture_ContactTableBody").empty();
    jQuery("#furniturelink_ContactTmpl").tmpl(furniture_contacts).appendTo("#furniture_ContactTableBody");
}

function createEditFurniture(){
		
	$("#tab").tabs( "select" , 0 );	
	var editing = new SpatialVue.Editing(map, "sidebar",undefined,undefined,undefined,'Furniture',undefined);
	
}

function createFurnitureOnPath(_gid,_rowid){
		
	$("#tab").tabs( "select" , 0 );	
	zoomToLayerFeature('RoW_Path','Line','gid',_gid);
	var editing = new SpatialVue.Editing(map, "sidebar",undefined,_rowid,_gid,'Furniture','RoW_Path');	
	
}

function createFurnitureOnAccessland(_gid,_rowid){


	$("#tab").tabs( "select" , 0 );	
	zoomToLayerFeature('Access_Land','Polygon','gid',_gid);
	var editing = new SpatialVue.Editing(map, "sidebar",undefined,_rowid,_gid,'Furniture','Access_Land');
	
}

function zoomToFurniture(_fgid){
	
	$("#tab").tabs( "select" , 0 );
	zoomToLayerFeature('Furniture','Point','gid',_fgid);
}

//added by saurabh for issue on Furniture link
function viewIssueonFurniture(furnitureid,_type) {
	
	var furnitureissueData=null;
	 jQuery.ajax({
         async: false,
         type: "GET",
         url: STUDIO_URL + "furniture/issuelist/" + furnitureid + "/"+_type,
         success: function (data) {
        	 if(data.length > 0){
	            	jQuery.ajax({
	                    async: false,
	                    type: "GET",
	                    url: STUDIO_URL + "furniture/issueactions/" + furnitureid + "/"+_type,
	                    success: function(action){
			        		for(i=0; i<data.length; i++){
			           		 	data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
			           		 	data[i].assignedTo = getNameFromEMail(data[i].assignedTo);
			           		 	//data[i]["ActionType"] = getActionType(data[i].gid.toString(), action);
			           		    data[i]["ActionType"] = $._(getActionType(data[i].gid.toString(), action));
			           		 	
			           		 data[i].issueTypeLkp.type = (lang=='cy')?data[i].issueTypeLkp.math:data[i].issueTypeLkp.type;
	    	           		 	data[i].issueUrgencyLkp.urgencyType = (lang=='cy')?data[i].issueUrgencyLkp.brys:data[i].issueUrgencyLkp.urgencyType;
	    	           		 	data[i].actionStatusLkp.actionStatus = (lang=='cy')?data[i].actionStatusLkp.statws:data[i].actionStatusLkp.actionStatus;
			            	}
	                    }
	                });
        	 	}
             furnitureissueData = data;
         }
     });

		
		jQuery("#furniturelink_IssueTableBody").empty();
		if(_type=="Open"){
			if(furnitureissueData!=null && furnitureissueData.length > 0){
				jQuery("#furniturelink_IssueTmpl").tmpl(furnitureissueData).appendTo("#furniturelink_IssueTableBody");
			}
		}else{
			if(furnitureissueData!=null && furnitureissueData.length > 0){
				jQuery("#furniturelink_IssueTmpl").tmpl(furnitureissueData).appendTo("#furniturelink_IssueTableBody");
			}else{
				jAlert('No historical issues are associated with selected Furniture');
			}
		}
		$('.clsjob').attr("title", $._('create_job'));
		$('.clslegal').attr("title", $._('create_legal'));
		
}
