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
var accessland_contacts = null;
var accesslandTypes = null;
var assecclandID = null;
var _geomFeature;
var _saveStrategy = null;
var currentAccessLand = null;
var _serverurl = null;
var isediting;
var savetype = 'NEW'
var al_wfs = null;

SpatialVue.AccessLand = function (_map, _searchdiv, masterdetails, geomFeature, newGid) {
    isediting = false;
    savetype = 'NEW';
    _geomFeature = geomFeature;
    _saveStrategy = null;
    map = _map;
    var _gid = null;
    if (newGid != undefined) {
        _gid = newGid;
    } else {
        _gid = masterdetails.gid;
    }

    //var _rowid = masterdetails.row_id;
    // currentAccessLand=masterdetails;
    assecclandID = _gid;
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
        url: STUDIO_URL + "accessland/" + _gid,
        success: function (data) {
        	data.agreementDate = convertDateToEuropeanFormat(data.agreementDate);
        	data.agreementEndDate = convertDateToEuropeanFormat(data.agreementEndDate);
            currentAccessLand = data;
            accessland_contacts = data.contacts;
            attachedFiles = data.attachments;

        }
    });

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "accessland/type",
        success: function (data) {
            accesslandTypes = data

        }
    });

    /*
     * $.ajax({ type: "GET", async:false, url: STUDIO_URL +
     * "attachment/rowid/"+_rowid,
     * 
     * success: function (_attachedFiles) { attachedFiles=_attachedFiles } });
     */

    $("#tabs-Tool").empty();

    jQuery.get('resources/templates/viewer/accessLandinfo.html', function (template) {

        addTab($._('Access_Land'), template);
        
        $('#span-close').attr('title',$._('close_title'));
        
        $("#AttchFileListBody").empty();

        var htmlStr = '';

        $.each(
        attachedFiles, function (key, val) {
            var filepath = serverurl + val.filepath
            htmlStr = htmlStr + '<tr id="' + _layer.name + '_' + val.associationid + '">';
            htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
            htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteAttachedFile(' + "'" + _layer.name + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
        });

        jQuery("#accessLandInfo_DetailsBody").empty();

        jQuery("#accessLandInfo_DetailsTmpl").tmpl(
        currentAccessLand).appendTo("#accessLandInfo_DetailsBody");

        jQuery("#accessLandInfo_AttachmentBody").empty();

        jQuery("#accessLandInfo_AttachmentTmpl").tmpl(
        currentAccessLand).appendTo("#accessLandInfo_AttachmentBody");
		
        jQuery("#unresolved_status").empty();
		jQuery("#unresolved_status").append(jQuery("<option></option>")
        		.attr("value", "false").text((lang=='en')?"No":"Na"));

        jQuery("#unresolved_status").append(jQuery("<option></option>")
        		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));
		
		
        jQuery.each(
        accesslandTypes, function (i, accesslandType) {
            jQuery("#type").append(
            jQuery("<option></option>").attr("value", accesslandType.typeid).text(
            (lang=='en')?accesslandType.type:accesslandType.math));
        });
		if(!currentAccessLand.isHistory){
		
        jQuery.get('fileupload', function (template1) {

            $("#fileAttachmentDiv").append(
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

                       // var selRow = $('#tablegrid1').jqGrid('getGridParam', 'selarrrow');

                       // var fieldVal = featureGeom[selRow[0] - 1][1];

                        var filename = uploadFilename;
                        // var
                        // associationid=fieldVal;
                        var associationid = $('#hid-accesslandGid').val();
                        var layername = _layer.name;
                        // var
                        // keyfield=uniqueField;
                        var keyfield = currentAccessLand.rowid;
                        var desc = $('#fileDesc').val();
                        var filepath = uploadFilepath;
                        var extension = /[^.]+$/.exec(filename)[0];

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

                        // if(jQuery("#"+layername+"_"+associationid).length==0){
                        if ($('#fileDesc').val() != '' && $('#file').val() != '') {

                            $.ajax({
                                type: "POST",
                                url: STUDIO_URL + "attachment/create",
                                data: $("#fileuploadForm").serialize(),
                                success: function (
                                fileurl) {
                                    // alert(fileurl);
                                    var _fileurl = serverurl + fileurl;

                                    var markup = "";

                                    markup = markup + '<tr id="' + layername + '_' + associationid + '">';
                                    markup = markup + '<td align="left" class="padcellup"><a href="' + _fileurl + '" target="_blank">' + filename + '</a></td>';
                                    markup = markup + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteAttachedFile(' + "'" + layername + "'" + ',' + "'" + associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';

                                    // jQuery('#AttchFileListBody').append(markup);
                                    refreshAttachedFiles(
                                    currentAccessLand.gid, _serverurl,'Access_Land');
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
		
		jQuery('#type').val(
        currentAccessLand.accessLandTypeLkp.typeid);
        jQuery('#unresolved_status').val(
        currentAccessLand.unresolvedStatus.toString());
        jQuery('#AttchFileListBody').append(htmlStr);
        $('#fileDesc').val('');
        $('#file').val('');
		
		}//if history
		else{
		
			jQuery('#type').val(
			currentAccessLand.accessLandTypeLkp.typeid);
			jQuery('#unresolved_status').val(
			currentAccessLand.unresolvedStatus.toString());
			jQuery('#AttchFileListBody').append(htmlStr);
			
			$('#fileAttachmentDiv').hide();
			//$('.footerBtns').hide();
			$('.btn01').remove();
			$('.nxtPrevBTNHolder').remove();
			$(".deleteFileTD").remove();
			$('.lesserbtn').remove()
		}
        

        $(function () {
            $("#agreement_date").datepicker({
                dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
        });
        $(function () {
            $("#agreement_end_date").datepicker({
                dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
        });
        $("#accessLandInfoTable :input").attr("disabled", true);
        $("#attachmentDiv :input").attr("disabled", true);
        //$('#attachmentDiv a').attr("disabled", true);

        $("#btnCancelAccessLand").hide();
        $("#btnSaveAccessLand").hide();

        $("#btnUpdateAccessLand").live("click", function () {
            
        	if(!currentAccessLand.isHistory){
        	$("#accessLandInfoTable :input").removeAttr("disabled");
            $("#attachmentDiv :input").removeAttr("disabled");
            $('#attachmentDiv a').removeAttr("disabled");
            $("#_row_id").attr("disabled", true);
            $("#area").attr("disabled", true);
            $("#unresolved_status").attr("disabled", true);

            $("#btnUpdateAccessLand").hide();
            $("#btnCancelAccessLand").show();
            $("#btnSaveAccessLand").show();
            $('#accessLandInfo_AttachmentBody').hide();
        	}
        	else{
        		
        		jAlert('Selected record is historical feature. Please select valid Access Land.','Access Land');
        	}

        });

        // $("#btnSaveAccessLand").click(function(){
        // applyChanges();
        // saveGeom();
        /*
         * jQuery.ajax({ type: "POST", url: STUDIO_URL +
         * "accessland/edit",
         * 
         * data: jQuery("#accessLandForm").serialize(), success:
         * function () {
         * 
         * jAlert('Data Successfully Saved',
         * 'HolidayCalendarForm');
         * 
         * $("#accessLandInfoTable :input").attr("disabled",
         * true); $("#btnUpdateAccessLand").show();
         * 
         * 
         *  }, error: function (XMLHttpRequest, textStatus,
         * errorThrown) {
         * 
         * alert('ERROR'); } });
         */

        // });
        //$("#btnCancelAccessLand").click, function () {
		$("#btnCancelAccessLand").click(function () {
            var accessLane = new SpatialVue.AccessLand(
            map, "sidebar", currentAccessLand, _geomFeature);
            /*
             * jQuery("#accessLandInfo_DetailsBody").empty();
             * 
             * jQuery("#accessLandInfo_DetailsTmpl").tmpl(currentAccessLand
             * ).appendTo("#accessLandInfo_DetailsBody");
             * 
             * jQuery("#accessLandInfo_AttachmentBody").empty();
             * 
             * jQuery("#accessLandInfo_AttachmentTmpl").tmpl(currentAccessLand
             * ).appendTo("#accessLandInfo_AttachmentBody");
             * 
             * 
             * jQuery.each(accesslandTypes, function (i,
             * accesslandType) {
             * jQuery("#type").append(jQuery("<option></option>").attr("value",
             * accesslandType.typeid).text(accesslandType.type));
             * });
             * jQuery('#type').val(currentAccessLand.accessLandTypeLkp.typeid);
             * 
             * $("#accessLandInfoTable
             * :input").attr("disabled", true);
             * 
             * 
             * $("#btnUpdateAccessLand").show();
             * $("#btnCancelAccessLand").hide();
             * $("#btnSaveAccessLand").hide();
             * $('#accessLandInfo_AttachmentBody').show();
             */
        });
		//Translate labels
		accessLandLabelTranslations();
    });

}

function accessLandLabelTranslations(){
	$('#row_id_AL').html($._('row_id_AL_label') + ' : ');
	$('#lbl_type').html($._('type') + ' : ');
	$('#lbl_area_name').html($._('area_name') + ' : ');
	$('#lbl_area').html($._('area') + ' : ');
	$('#lbl_agreement_reference').html($._('agreement_reference') + ' : ');
	$('#lbl_agreement_date').html($._('agreement_date') + ' : ');
	$('#lbl_agreement_end_date').html($._('agreement_end_date') + ' : ');
	$('#unresolved_issues').html($._('unresolved_issues') + ' : ');
	$('#lbl_notes').html($._('notes') + ' : ');
	$('#al_edit').attr("value", $._('Edit'));
	$('#al_cancel').attr("value", $._('Cancel'));
	$('#al_save').attr("value", $._($('#btnSaveAccessLand input').attr('value')));
	$('#al_access_land_lnk').attr("title", $._('accessland_link'));
	$('#al_locate_map_lnk').attr("title", $._('locate_on_map'));
	$('#al_create_issue_lnk').attr("title", $._('create_issue'));
	$('#al_create_furniture_lnk').attr("title", $._('create_furniture'));
	
	window.setTimeout("attachmentLabelTranslations()", 1000);
}

function showRoWDetails(_rowid) {

    $("#tabs-Tool").empty();
    jQuery.get("resources/templates/viewer/rowinfo.html", function (template) {

        addTab('Path Information', template);
        $('#span-close').attr('title',$._('close_title'));
        
        jQuery("#RowInfo_MasterDetailsBody").empty();

        jQuery("#RowInfo_MasterDetailsTmpl_line").tmpl().appendTo("#RowInfo_MasterDetailsBody");

        jQuery("#pathid").val(_rowid);

        $(function () {
            $("#agreementEndDate").datepicker({
                dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
           
        });

        // point
        $("#rowInfo_point :input").attr("disabled", true);
        $("#btnCancelRoW_point").hide();
        $("#btnSaveRoW_point").hide();

        // line
        $("#rowInfo_line :input").attr("disabled", true);
        $("#btnCancelRoW_line").hide();
        $("#btnSaveRoW_line").hide();

        $("#rowInformationLink").click(function () {

            $("#RowInfo_MasterDetailsBody").slideToggle('fast');
        });

        $("#btnUpdateRoW_line").click(function () {
            $("#rowInfo_line :input").removeAttr("disabled");

            $("#pathid").attr("disabled", true);

            $("#btnUpdateRoW_line").hide();
            $("#btnCancelRoW_line").show();
            $("#btnSaveRoW_line").show();

        });

    });

}

function showAccessLandDetails(_gid,_rowid) {

	
    var al_filter = new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'gid',
        value: _gid
    })

    var layerName = 'Access_Land';
    var alGeom = null;
    var result = null;
    $.ajax({
        url: STUDIO_URL + 'layer/' + layerName + "?" + token,
        async: false,
        success: function (data) {
            var uniqueField;
            var displayableCols = data.layerFields;
            if (displayableCols.length > 0) uniqueField = displayableCols[0].keyfield;

            if (displayableCols.length > 0 && uniqueField != undefined) {
                result = new Result(layerName, 'http://www.rmsi.com/snpa', al_filter, true, undefined, undefined);

                alGeom = result.getQueryResult(displayableCols, 'gid', 'the_geom', false);
                //getting geom
                alGeom=alGeom[0].geometry;

            }
        }
    });

    var accessLand = new SpatialVue.AccessLand(map, "sidebar", null, alGeom, _gid);
	
	
	$/*("#tabs-Tool").empty();
    jQuery.get("resources/templates/viewer/accessLandinfo.html", function (
    template) {

        addTab('Access Land', template);

        jQuery("#accessLandInfo_DetailsTmpl").tmpl().appendTo("#accessLandInfo_DetailsBody");

        jQuery("#rowid").val(_rowid);

        $("#accessLandInfoTable :input").attr("disabled", true);

        $("#btnCancelAccessLand").hide();
        $("#btnSaveAccessLand").hide();

        $("#btnUpdateaccessLand").click(function () {
            $("#accessLandInfoTable :input").removeAttr("disabled");

            $("#btnUpdateAccessLand").hide();
            $("#btnCancelAccessLand").show();
            $("#btnSaveAccessLand").show();

        });

    });*/

}

function accessLandLink(_gid,_rowid) {
	if (accessland_contacts.length > 0) {
		jQuery.each(accessland_contacts, function (i, ctype) {    	
		
			accessland_contacts[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
		});
	}
	
	var _accessland_contacts = accessland_contacts;

    jQuery.get("resources/templates/viewer/accessLandLink.html", function (
    template) {

        //addListingTab('Access Land Links', 'tab-accessLandlink', template);
    	addListingTab($._('accessland_link'),'tab-accessLandlink',template);
        /*
         * jQuery("#accessLandlink_IssueTmpl").tmpl().appendTo("#accessLandlink_IssueTableBody");
         * 
         * jQuery("#accessLandlink_FurnitureTableBody").empty();
         * jQuery("#accessLandlink_FurnitureTmpl").tmpl(null,{ furnitureList:
         * attributedata_furniture
         * 
         * }).appendTo("#accessLandlink_FurnitureTableBody");
         * 
         * jQuery("#accessLandlink_historicalAgrTmpl").tmpl().appendTo("#accessLand_historicalAgrBody");
         * 
         * jQuery("#accessLandlink_PathTableBody").empty();
         * 
         * jQuery("#accessLandlink_PathTmpl").tmpl(null,{ attributeList:
         * attributedata
         * 
         * }).appendTo("#accessLandlink_PathTableBody");
         */
        jQuery("#accessLandlink_ContactTmpl").tmpl(_accessland_contacts).appendTo("#accessLand_ContactTableBody");

        /*if ($('#accessLand_ContactTableBody').children().length > 0) {
            $("#accessLand_ContactTable").tablesorter({
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
            $("#accessLand_ContactTable").tablesorter();
        }*/
        
        /*
         * .tablesorterPager({ container: $("#contact_pagerDiv"), positionFixed:
         * false }) .tablesorterFilter({ filterContainer:
         * $("#contact_txtSearch"), filterColumns: [0], filterCaseSensitive:
         * false });
         */
        
      //go to parent path
		$("#goToparentAlLink").click(function() {			
			showAccessLandDetails(_gid,_rowid);
		});
        
        jQuery("#accessLandlink_accordion").accordion({
            fillSpace: true
        });
        // added for contact
        $("#addNewContact").click(function () {
            addNewContact('accessland', assecclandID);

        });

        $("#addToExistingContact").click(function () {
            addExistingContact('accessland', assecclandID);

        });
        
        //getting issues
        jQuery.ajax({
    		async:false,
        	type: "GET",              
            url: STUDIO_URL + "rowpath/openissue/"+_rowid +"/Open", 
             success: function (data) {
            	 if(data.length > 0 && data!=null){
            		 for(i=0; i<data.length; i++){
                		 	data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
                		 	data[i].issueTypeLkp.type = (lang=='cy')?data[i].issueTypeLkp.math:data[i].issueTypeLkp.type;
    	           		 	data[i].issueUrgencyLkp.urgencyType = (lang=='cy')?data[i].issueUrgencyLkp.brys:data[i].issueUrgencyLkp.urgencyType;
    	           		 	data[i].actionStatusLkp.actionStatus = (lang=='cy')?data[i].actionStatusLkp.statws:data[i].actionStatusLkp.actionStatus;
                 	}
            		 jQuery("#accessLandlink_IssueTableBody").empty();
                     jQuery("#accessLandlink_IssueTmpl").tmpl(data).appendTo("#accessLandlink_IssueTableBody");
                     $('.clsjob').attr("title", $._('create_job'));
             		 $('.clsLegal').attr("title", $._('create_legal'));
            	 }
            	 
             }
    	 });
    	 

    	//for historical issue on path
		$("#histricolIssueALLink").click(function() {			
			viewIssueonAccessLand(_rowid,'H');
			
		});
		$("#openIssueALLink").click(function() {			
			viewIssueonAccessLand(_rowid,'Open');
		});

        $('#accessLandlink_accordion h3 a').click(function (event) {
            // alert(event.currentTarget.id);
            fetchData(event.currentTarget.id);
        });
        //TRASLATION
        
        translateAccesslandContactListing();
        translateAccesslandIssueListing();
		translateAccesslandFurnitureListing();
		translateAccesslandPathListing();		
		
        
    });

}
function translateAccesslandContactListing(){
$('#accesslandlink_parent').html($._('go_to_parent_issue'));
$('#accesslandlink_contact').html($._('contact'));
$('#al_add_new_contact').html($._('furniture_link_addcontact'));
$('#al_add_exist_contact').html($._('furniture_link_existingcontact'));

	$('#accesslandlink_contact_id').html($._('contact_id'));
	$('#accesslandlink_contact_name').html($._('contact_fname'));
	$('#accesslandlink_contact_sname').html($._('contact_surname'));
	$('#accesslandlink_contact_type').html($._('contact_type'));
	$('#accesslandlink_contact_position').html($._('contact_position'));
	$('#accesslandlink_contact_phone').html($._('Phone'));
	$('#accesslandlink_contact_email').html($._('EMail'));
	$('#accesslandlink_contact_action').html($._('action'));



}

function translateAccesslandIssueListing(){

	 $('#accesslandlink_issue').html($._('Issue'));	 
	 $('#accesslandlink_openIssue').html($._('issues_open'));
	 $('#accesslandlink_hisIssue').html($._('furniture_link_issue_historical'));
	 
	 $('#accessLandlink_issue_id').html($._('Issueid'));
	 $('#accessLandlink_issue_rowid').html($._('row_id'));	 
	 $('#accessLandlink_issue_type').html($._('type'));
	 $('#accessLandlink_issue_urgency').html($._('urgency'));
	 $('#accessLandlink_issue_status').html($._('status'));
	 $('#accessLandlink_issue_assignedTo').html($._('assigned_to'));
	 $('#accessLandlink_issue_resolvedBy').html($._('resolve_by'));
	 $('#accessLandlink_issue_action').html($._('action'));
	 
	$('#al_createjob').attr("title", $._('create_job'));
	$('#al_createlegal').attr("title", $._('create_legal'));


}

function translateAccesslandFurnitureListing(){

	 $('#accesslandlink_furniture').html($._('Furniture'));
	 
	 $('#accessLandlink_furniture_id').html($._('furnitureid'));
	 $('#accessLandlink_furniture_rowid').html($._('row_id'));
	 $('#accessLandlink_furniture_type').html($._('type'));
	 $('#accessLandlink_furniture_condition').html($._('condition'));
	 $('#accessLandlink_furniture_lastInspected').html($._('last_inspected'));	 

}

function translateAccesslandPathListing(){
	$('#accessLandlink_pathDetail').html($._('furniture_link_path'));
	
	$('#accessLandlink_path_rowid').html($._('row_id'));
	$('#accessLandlink_path_type').html($._('type'));
	$('#accessLandlink_path_priority').html($._('furniture_link_path_priority'));
	$('#accessLandlink_path_lastSurvey').html($._('lastsurvey'));
	$('#accessLandlink_path_legalStatus').html($._('legalstatus'));
}
/*

*/


function fetchData(lyr) {
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
    var _accessland_contacts = accessland_contacts;
    var feature = _geomFeature;
    var accessland_layer = map.getLayersByName(lyr)[0];
    var objSelect = null;
    var filter = null;
    /*
     * var objSelect= new Selection(feature, layer); var filter =
     * objSelect.creationSelectionCriteria(this);
     * objSelect.displaySelection(filter, selectionSymbolizer, layer); layerData =
     * objSelect.getResult(filter, false);
     */
    // if(layerData!=undefined && layerData.length>0){
    if (lyr == 'RoW_Path' && $('#accessLandlink_PathTableBody tr').length == 0) {
        // alert('Popoulating rows');
        objSelect = new Selection(feature, accessland_layer);
        filter = objSelect.creationSelectionCriteria(this);
        //objSelect.displaySelection(filter, selectionSymbolizer, accessland_layer);
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
		
		
        for (var i = 0, n=0;n < layerData.length; n++) {
                
			if (layerData[n].attributes.ishistory=="false") {
				attributedata[i] = layerData[n].attributes;
				
				//Remove Z from Date
				/*
				if(attributedata[j].agreement_end_date!=undefined){
					attributedata[i].agreement_end_date=convertDateToEuropeanFormat(attributedata[i].agreement_end_date.substring(0, 10));
				}
				if(attributedata[i].dateofnextsurvey!=undefined){
					attributedata[i].dateofnextsurvey=convertDateToEuropeanFormat(attributedata[i].dateofnextsurvey.substring(0, 10));
				}
				*/
				if(attributedata[i].lastsurvey!=undefined){
					attributedata[i].lastsurvey=convertDateToEuropeanFormat(attributedata[i].lastsurvey.substring(0, 10));
				}
				
                $.each(classdata, function (key, val) {
                    if (val.id == attributedata[i]._class) {
                        //attributedata[i]._class = val.priority;
                    	if(lang=='cy'){
                    		attributedata[i]._class = val.priority.replace("Priority", "Blaenoriaeth");
                    	}else{
                    		attributedata[i]._class = val.priority; 
                    	}                       
                        return;
                    }
                });

                $.each(typedata, function (key, val) {
                    if (val.pathTypeId == attributedata[i].type) {
                        attributedata[i].type = (lang=='cy')?val.math:val.type;
                        return;
                    }
                });

                $.each(legalstatusdata, function (key, val) {
                    if (val.legalstatusid == attributedata[i].legalstatus) {
                        attributedata[i].legalstatus = (lang=='cy')?val.statws:val.status;
                        return;
                    }
                });
				i++;
			}	//if
        }

            jQuery("#accessLandlink_PathTableBody").empty();

            jQuery("#accessLandlink_PathTmpl").tmpl(null, {
                attributeList: attributedata

            }).appendTo("#accessLandlink_PathTableBody");

            /*if ($('#accessLandlink_PathTableBody').children().length > 0) {
                $("#accessLandlink_PathTable").tablesorter({
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
                $("#accessLandlink_PathTable").tablesorter();
            }*/


        }

    } else if (lyr == 'Furniture' && $('#accessLandlink_FurnitureTableBody tr').length == 0) {
        // alert ('Populating furnitures');
        objSelect = new Selection(feature, accessland_layer);
        filter = objSelect.creationSelectionCriteria(this);
        //objSelect.displaySelection(filter, selectionSymbolizer, accessland_layer);
        layerData = objSelect.getResult(filter, false);
        if (layerData != undefined && layerData.length > 0) {

            jQuery.ajax({
                async: false,
                type: "GET",
                url: STUDIO_URL + "furniture/type/" + lang,
                success: function (data) {
                    furnituretypedata = data

                }
            });
            jQuery.ajax({
                async: false,
                type: "GET",
                url: STUDIO_URL + "furniture/condition",
                success: function (data) {
                    conditiondata = data

                }
            });

            for (j = 0, m = 0; m < layerData.length; m++) {
                if (layerData[m].attributes.ishistory=="false") {
                    attributedata[j] = layerData[m].attributes;
                    
                    //Remove Z from Date
                    
                    
                    if(attributedata[j].last_inspected!=undefined){
                    	attributedata[j].last_inspected=convertDateToEuropeanFormat(attributedata[j].last_inspected.substring(0, 10));
                    }
                    
                    $.each(furnituretypedata, function (key, val) {
                        if (val.typeid == attributedata[j].type) {
                            attributedata[j].type = (lang=='cy')?val.math:val.type;
                            return;
                        }
                    });

                    $.each(conditiondata, function (key, val) {
                        if (val.conditionid == attributedata[j].condition) {
                            attributedata[j].condition = val.condition;
                            return;
                        }
                    });
                    j++;
                }
            }

            jQuery("#accessLandlink_FurnitureTableBody").empty();
            jQuery("#accessLandlink_FurnitureTmpl").tmpl(null, {
                furnitureList: attributedata

            }).appendTo("#accessLandlink_FurnitureTableBody");

            /*if ($('#accessLandlink_FurnitureTableBody').children().length > 0) {
                $("#accessLandlink_FurnitureTable").tablesorter({
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
                $("#accessLandlink_FurnitureTable").tablesorter();
            }*/

        }
    } else if (lyr == 'Issue' && $('#accessLandlink_IssueTableBody tr').length == 0) {
        // alert ('Populating furnitures');
    	
    	//commented by Saurabh 
       /* objSelect = new Selection(feature, accessland_layer);
        filter = objSelect.creationSelectionCriteria(this);
        //objSelect.displaySelection(filter, selectionSymbolizer, accessland_layer);
        layerData = objSelect.getResult(filter, false);
        if (layerData != undefined && layerData.length > 0) {

            jQuery.ajax({
                async: false,
                type: "GET",
                url: STUDIO_URL + "issue/type",
                success: function (data) {
                    issuetypedata = data

                }
            });

            jQuery.ajax({
                async: false,
                type: "GET",
                url: STUDIO_URL + "issue/urgency",
                success: function (data) {
                    issueurgency = data

                }
            });

            jQuery.ajax({
                async: false,
                type: "GET",
                url: STUDIO_URL + "issue/status",
                success: function (data) {
                    issuestatus = data

                }
            });

            jQuery.ajax({
                async: false,
                type: "GET",
                url: STUDIO_URL + "user/",
                success: function (data) {
                    issueassignto = data

                }
            });

            for (k = 0, x = 0; x < layerData.length; x++) {

                if (layerData[x].attributes.ishistory=="false") {

                    attributedata[k] = layerData[x].attributes;
                    attributedata[k].inspect_by=attributedata[k].inspect_by.substring(0, 10);
                    attributedata[k].reported_on=attributedata[k].reported_on.substring(0, 10);
                   
                    
                    $.each(issuetypedata, function (key, val) {
                        if (val.issuetypeid == attributedata[k].issuetype) {
                            attributedata[k].issuetype = val.type;
                            return;
                        }
                    });

                    $.each(issueurgency, function (key, val) {
                        if (val.urgencyid == attributedata[k].urgency) {
                            attributedata[k].urgency = val.urgencyType;
                            return;
                        }
                    });

                    $.each(issuestatus, function (key, val) {
                        if (val.actionstatusid == attributedata[k].actionstatus) {
                            attributedata[k].actionstatus = val.actionStatus;
                            return;
                        }
                    });

                    $.each(issueassignto, function (key, val) {
                        if (val.id == attributedata[k].assigned_to) {
                            attributedata[k].assigned_to = val.email;
                            return;
                        }
                    });
                    k++;
                }
            }

            jQuery("#accessLandlink_IssueTableBody").empty();
            jQuery("#accessLandlink_IssueTmpl").tmpl(null, {
                issueList: attributedata

            }).appendTo("#accessLandlink_IssueTableBody");

            if ($('#accessLandlink_IssueTableBody').children().length > 0) {
                $("#accessLandlink_IssueTable").tablesorter({
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
                $("#accessLandlink_IssueTable").tablesorter();
            }
    	  	 

    		
        }*/
		
    }
    // }
}

/*
 * function accessLandLink1() { var classdata=null; var typedata=null; var
 * legalstatusdata=null;
 * 
 * 
 * var attributedata={}; var attributedata_furniture={}; var pathdata=null; var
 * furnituredata=null; var _accessland_contacts =accessland_contacts; var
 * feature=_geomFeature; var layer_row=map.getLayersByName('RoW_Path')[0]; var
 * layer_furniture=map.getLayersByName('Furniture')[0]; //var
 * layer=OpenLayers.Map.activelayer;
 * 
 * 
 * var objSelect_row = new Selection(feature, layer_row); var filter =
 * objSelect_row.creationSelectionCriteria(this);
 * objSelect_row.displaySelection(filter, selectionSymbolizer, layer_row);
 * objSelect_row.displayResult(filter,false); pathdata=result.getFeatures();
 * 
 * 
 * 
 * var objSelect_furniture = new Selection(feature, layer_furniture); var
 * filter_furniture = objSelect_furniture.creationSelectionCriteria(this);
 * objSelect_furniture.displaySelection(filter_furniture, selectionSymbolizer,
 * layer_furniture); objSelect_furniture.displayResult(filter_furniture);
 * 
 * furnituredata=result.getFeatures();
 * 
 * 
 * 
 * //if(pathdata!=null){ if(pathdata!=undefined && pathdata.length>0){
 * 
 * jQuery.ajax({ async:false, type: "GET", url: STUDIO_URL + "path/classLkp",
 * success: function (data) { classdata=data
 *  } }); jQuery.ajax({ async:false, type: "GET", url: STUDIO_URL + "path/type",
 * success: function (data) { typedata=data
 *  } }); jQuery.ajax({ async:false, type: "GET", url: STUDIO_URL +
 * "path/legalstatus", success: function (data) { legalstatusdata=data
 *  } });
 * 
 * for(var i=0;i<pathdata.length;i++){
 * 
 * 
 * attributedata[i]=pathdata[i].attributes;
 * 
 * $.each(classdata, function (key, val) { if(val.id==attributedata[i].class){
 * attributedata[i].class=val.priority; return; } });
 * 
 * $.each(typedata, function (key, val) {
 * if(val.pathTypeId==attributedata[i].type){ attributedata[i].type=val.type;
 * return; } });
 * 
 * $.each(legalstatusdata, function (key, val) {
 * if(val.legalstatusid==attributedata[i].legalstatus){
 * attributedata[i].legalstatus=val.status; return; } });
 *  } }
 * 
 * 
 * 
 * if(furnituredata!=undefined && furnituredata.length>0){
 * 
 * for(var j=0;j<furnituredata.length;j++){
 * 
 * 
 * attributedata_furniture[j]=furnituredata[j].attributes;
 * 
 * 
 *  } }
 * 
 * 
 * jQuery.get("resources/templates/viewer/accessLandLink.html", function
 * (template) {
 * 
 * addListingTab('Access Land Links','tab-accessLandlink',template);
 * 
 * jQuery("#accessLandlink_IssueTmpl").tmpl().appendTo("#accessLandlink_IssueTableBody");
 * 
 * jQuery("#accessLandlink_FurnitureTableBody").empty();
 * jQuery("#accessLandlink_FurnitureTmpl").tmpl(null,{ furnitureList:
 * attributedata_furniture
 * 
 * }).appendTo("#accessLandlink_FurnitureTableBody");
 * 
 * jQuery("#accessLandlink_historicalAgrTmpl").tmpl().appendTo("#accessLand_historicalAgrBody");
 * 
 * jQuery("#accessLandlink_PathTableBody").empty();
 * 
 * jQuery("#accessLandlink_PathTmpl").tmpl(null,{ attributeList: attributedata
 * 
 * }).appendTo("#accessLandlink_PathTableBody");
 * 
 * jQuery("#accessLandlink_ContactTmpl").tmpl(_accessland_contacts).appendTo("#accessLand_ContactTableBody");
 * 
 * jQuery("#accessLandlink_accordion").accordion({fillSpace: true});
 * 
 * $('#accessLandlink_accordion h3 a').click(function(event) {
 * //alert(event.currentTarget.id); });
 * 
 * });
 *  }
 * 
 */

// path info
function showParentPathDetails(currentAccessLand) {

    // alert('test');
    // $("#tabs-Tool").empty();
    jQuery.get("resources/templates/viewer/rowinfo.html", function (template) {
        addTab('Path Information', template);
        $('#span-close').attr('title',$._('close_title'));
        jQuery("#RowInfo_MasterDetailsBody").empty();
        jQuery("#RowInfo_MasterDetailsTmpl_line").tmpl(currentAccessLand).appendTo("#RowInfo_MasterDetailsBody");

        // jQuery("#workcommitment_issue_accordion").accordion({fillSpace:
        // true});
        // $("#issue-complaintid").text("Create Issue For Complaint
        // Id:"+_complaintId);
        // jQuery("#IssueID").val(_issueid);
        // $("#issueFormTable input,textarea,select").attr("disabled", true);
    });

}

function deleteAttachedFile(layername, associateId) {
    // var r=confirm("Do you want to Delete Association id: "+associtionid);
    jConfirm('Are You Sure You Want To Delete : ', 'Delete Confirmation', function (response) {

        if (response == true) {
            // jQuery('#'+layername+'_'+associateId).remove();
            $.ajax({
                type: "POST",
                url: STUDIO_URL + "attachment/delete/" + associateId,
                success: function (resp) {

                    if(resp=="1"){
                		jQuery('#' + layername + '_' + associateId).remove();
                	}
            		else if(resp=="2"){
            			jAlert("unable to delete the file from Database","Delete");
            			
            		}
            		else if(resp=="3"){
            			
            			jAlert("Unable to locate the file","Delete");
            			
            		}
            		else{            			
            			jAlert("Unable to Delete the file","Delete");
            			
            		}

                }

            });
        } else {
            return;
        }

    });

}

function refreshAttachedFiles(gid, serverurl,currentLayer) {
    var files = null;
    var _layer = layer;
    $.ajax({
        type: "GET",
        async: false,
        // url: STUDIO_URL + "attachment/rowid/"+rowid,
        url: STUDIO_URL + "attachment/"+currentLayer+"/gid/" + gid,
        // data: {ids:_gid},
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
        htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteAttachedFile(' + "'" + _layer.name + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
    });

    $("#AttchFileListBody").empty();
    jQuery('#AttchFileListBody').append(htmlStr);
    $('#fileDesc').val('');
    $('#file').val('');

}

function getPreviousAccessLand(_gid, _rowid) {
    // alert(_gid+"-"+ _rowid);
    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "accessland/" + _rowid + "/prev/" + _gid,

        success: function (data) {

            if (data.gid != null) {
            	
            	data.agreementDate = convertDateToEuropeanFormat(data.agreementDate);
            	data.agreementEndDate = convertDateToEuropeanFormat(data.agreementEndDate);            	
                jQuery("#accessLandInfo_DetailsBody").empty();

                jQuery("#accessLandInfo_DetailsTmpl").tmpl(data).appendTo("#accessLandInfo_DetailsBody");

                jQuery("#accessLandInfo_AttachmentBody").empty();

                jQuery("#accessLandInfo_AttachmentTmpl").tmpl(data).appendTo("#accessLandInfo_AttachmentBody");
				
                jQuery("#unresolved_status").empty();
                jQuery("#unresolved_status").append(jQuery("<option></option>")
        		.attr("value", "false").text((lang=='en')?"No":"Na"));

				jQuery("#unresolved_status").append(jQuery("<option></option>")
        		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));
								
                jQuery.each(
                accesslandTypes, function (i, accesslandType) {
                    jQuery("#type").append(
                    jQuery("<option></option>").attr("value", accesslandType.typeid).text(
                    accesslandType.type));
                });

                // refreshAttachedFiles(data.gid,_serverurl);
                var htmlStr = '';

                $.each(
                data.attachments, function (key, val) {
                    var filepath = _serverurl + val.filepath
                    htmlStr = htmlStr + '<tr id="' + layer.name + '_' + val.associationid + '">';
                    htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
                    htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteAttachedFile(' + "'" + layer.name + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
                });

                $("#AttchFileListBody").empty();
                jQuery('#AttchFileListBody').append(htmlStr);
                $('#fileDesc').val('');
                $('#file').val('');

                jQuery('#type').val(data.accessLandTypeLkp.typeid);
                jQuery('#unresolved_status').val(
                data.unresolvedStatus.toString());
                $("#accessLandInfoTable :input").attr("disabled", true);
                $("#attachmentDiv :input").attr("disabled", true);
                $(".deleteFileTD").remove();
				$('.btn01').remove();

                // $("#fileAttachmentDiv").hide();
                $("#btnUpdateAccessLand").hide();
                $("#btnCancelAccessLand").hide();
                $("#btnSaveAccessLand").hide();
                
                accessLandLabelTranslations();
            } else {

                jAlert('No history found');
            }
        }
    });

}

function getNextAccessLand(_gid, _rowid) {

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "accessland/" + _rowid + "/next/" + _gid,

        success: function (data) {
            // currentAccessLand=data;
            // accessland_contacts=data.contacts;
            if (data.gid != null) {
            	data.agreementDate = convertDateToEuropeanFormat(data.agreementDate);
            	data.agreementEndDate = convertDateToEuropeanFormat(data.agreementEndDate);
            	
            	jQuery("#accessLandInfo_DetailsBody").empty();

                jQuery("#accessLandInfo_DetailsTmpl").tmpl(data).appendTo("#accessLandInfo_DetailsBody");

                jQuery("#accessLandInfo_AttachmentBody").empty();

                jQuery("#accessLandInfo_AttachmentTmpl").tmpl(data).appendTo("#accessLandInfo_AttachmentBody");

                jQuery.each(
                accesslandTypes, function (i, accesslandType) {
                    jQuery("#type").append(
                    jQuery("<option></option>").attr("value", accesslandType.typeid).text(
                    accesslandType.type));
                });
                // refreshAttachedFiles(data.gid,_serverurl);
                var htmlStr = '';

                $.each(
                data.attachments, function (key, val) {
                    var filepath = _serverurl + val.filepath
                    htmlStr = htmlStr + '<tr id="' + layer.name + '_' + val.associationid + '">';
                    htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
                    htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteAttachedFile(' + "'" + layer.name + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
                });

                $("#AttchFileListBody").empty();
                jQuery('#AttchFileListBody').append(htmlStr);
                $('#fileDesc').val('');
                $('#file').val('');

                jQuery('#type').val(data.accessLandTypeLkp.typeid);
                jQuery('#unresolved_status').val(
                data.unresolvedStatus.toString());

                $("#accessLandInfoTable :input").attr("disabled", true);
                $("#attachmentDiv :input").attr("disabled", true);
                $(".deleteFileTD").remove();
				$('.btn01').remove();
                // $("#fileAttachmentDiv").hide();
                $("#btnUpdateAccessLand").hide();
                $("#btnCancelAccessLand").hide();
                $("#btnSaveAccessLand").hide();
                
                accessLandLabelTranslations();
            } else {
                var accessLane = new SpatialVue.AccessLand(map, "sidebar", currentAccessLand, _geomFeature);
                jAlert('No more record');

            }
        }
    });

}

function refreshAccessLandContact(_gid) {

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "accessland/" + _gid,
        success: function (data) {
            accessland_contacts = data.contacts;
            
            if (accessland_contacts.length > 0) {
				jQuery.each(accessland_contacts, function (i, ctype) {    	
				
					accessland_contacts[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
				});
			}

        }
    });
    $("#accessLand_ContactTableBody").empty();
    jQuery("#accessLandlink_ContactTmpl").tmpl(accessland_contacts).appendTo("#accessLand_ContactTableBody");
}

/*
 * function refreshAccessLandContact(_gid){
 * 
 * jQuery.ajax({ async:false, type: "GET", url: STUDIO_URL + "accessland/"+_gid,
 * success: function (data) { accessland_contacts=data.contacts;
 *  } }); $("#accessLand_ContactTableBody").empty();
 * jQuery("#accessLandlink_ContactTmpl").tmpl(accessland_contacts).appendTo("#accessLand_ContactTableBody"); }
 */

function testChanges() {
    var feature = _geomFeature;
    layerfeature = feature;

    if (layerfeature.attributes == undefined) {
        layerfeature = layerfeature.feature;
    }

    // Set Attributes
    layerfeature.attributes['row_id'] = $('#_row_id').val();
    layerfeature.attributes['type'] = $('#type').val();
    layerfeature.attributes['area_name'] = $('#area_name').val();
    layerfeature.attributes['area'] = $('#area').val();
    layerfeature.attributes['agreement_reference'] = $('#agreement_reference').val();
    layerfeature.attributes['agreement_date'] = $('#agreement_date').val();
    layerfeature.attributes['agreement_end_date'] = $('#agreement_end_date').val();
    layerfeature.attributes['unresolved_status'] = $('#unresolved_status').val();
    layerfeature.attributes['notes'] = $('#notes').val();
    layerfeature.attributes['ishistory'] = false;

    if (savetype == 'NEW') {
        layerfeature.state = OpenLayers.State.INSERT;
    } else if (savetype == 'EDIT') {
        layerfeature.state = OpenLayers.State.UPDATE;
    }

    if (isediting) {
        g_wfs.addFeatures([layerfeature]);
    } else {
    	al_wfs.addFeatures([layerfeature]);
    }
}

function applyChanges() {
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

    var layerName = 'Access_Land';
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
        al_wfs = map.getLayersByName("WFS")[0];
        if (al_wfs != undefined) {
            map.removeLayer(al_wfs);
        }

        if (_saveStrategy != null) {
            // this.Unregister();
            // _saveStrategy.events.unregister();
        }
        _saveStrategy = new OpenLayers.Strategy.Save();

        _saveStrategy.events.register('success', null, onGeomSave);

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

            al_wfs = new OpenLayers.Layer.Vector("WFS", {
                reportError: true,
                strategies: [_saveStrategy],
                projection: _projection,
                protocol: _protocol,
                isBaseLayer: false,
                visibility: true,
                styleMap: styleMap,
                displayInLayerSwitcher: false
            });
            map.addLayers([al_wfs]);
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

    // Set Attributes
    if (trim($('#_row_id').val()).length == 0) {
        jAlert('Please provide value for row_id');
        validForm=false;
		return;
    } else {
        layerfeature.attributes['row_id'] = $('#_row_id').val();
    }
    if (trim($('#type').val()).length != 0) {
        layerfeature.attributes['type'] = $('#type').val();
    }
    if (trim($('#area_name').val()).length != 0) {
        layerfeature.attributes['area_name'] = $('#area_name').val();
    }
    if (trim($('#area').val()).length != 0) {
        layerfeature.attributes['area'] = $('#area').val();
    } else {
        layerfeature.attributes['area'] = 0;
    }
    if (trim($('#agreement_reference').val()).length != 0) {
        layerfeature.attributes['agreement_reference'] = $('#agreement_reference').val();
    }
    if (trim($('#agreement_date').val()).length != 0) {
        layerfeature.attributes['agreement_date'] = convertDateToUSFormat($('#agreement_date').val());
    }
    if (trim($('#agreement_end_date').val()).length != 0) {
        layerfeature.attributes['agreement_end_date'] = convertDateToUSFormat($('#agreement_end_date').val());
    }
    if (trim($('#unresolved_status').val()).length != 0) {
        layerfeature.attributes['unresolved_status'] = $('#unresolved_status').val();
    }
    layerfeature.attributes['notes'] = $('#notes').val();
    layerfeature.attributes['ishistory'] = false;

    if (savetype == 'NEW') {
        layerfeature.state = OpenLayers.State.INSERT;
    } else if (savetype == 'EDIT') {
        layerfeature.state = OpenLayers.State.UPDATE;
    }

    if (!isediting) {
    	al_wfs.addFeatures([layerfeature]);
    }
	return validForm;
}

function saveGeom() {
    _saveStrategy.save();

}

function onGeomSave(event) {
    objLayer.redraw(true);
    var insertId = event.response.insertIds[0];
    var fid = insertId.substr(insertId.indexOf('.') + 1);


    // update history
    if (!isediting) {
        jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "accessland/updatehistory/" + assecclandID,
            success: function (data) {
                var accessLane = new SpatialVue.AccessLand(map, "sidebar", currentAccessLand, _geomFeature, fid);
                //jAlert('Data saved');
                jAlert( $._('alert_successfully_saved'), $._('alert'));
            	$('#popup_ok').attr("value", $._('popupOk'));
                /*
                 * $("#accessLandInfoTable :input").attr("disabled", true);
                 * $("#attachmentDiv :input").attr("disabled", true);
                 * $('#attachmentDiv a').attr("disabled", true);
                 * $("#btnUpdateAccessLand").show();
                 * $("#btnCancelAccessLand").hide();
                 * $("#btnSaveAccessLand").hide();
                 */
            }
        });

    } else {
        //jAlert('Data saved');
    	jAlert( $._('alert_successfully_saved'), $._('alert'));
    	$('#popup_ok').attr("value", $._('popupOk'));

        $('#edit_content').empty();
    }
    al_wfs.removeAllFeatures(true); 
    if(g_wfs != null){
    	g_wfs.removeAllFeatures(true);
    }
}

function saveAccessLand() {
    if(applyChanges()){
			
		if (!isediting) {
        saveGeom();
		}
		else{
			jAlert('Click on Save button to save the Access Land', 'Access Land');
		}
	}
    
   
}

function showPathDetails(_gid, _rowid) {

    //alert(_gid + '-' + _rowid);
    var path_filter = new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'gid',
        value: _gid
    })

    var layerName = 'RoW_Path';
    var pathGeom = null;
    var result = null;
    $.ajax({
        url: STUDIO_URL + 'layer/' + layerName + "?" + token,
        async: false,
        success: function (data) {
            var uniqueField;
            var displayableCols = data.layerFields;
            if (displayableCols.length > 0) uniqueField = displayableCols[0].keyfield;

            if (displayableCols.length > 0 && uniqueField != undefined) {
                result = new Result(layerName, 'http://www.rmsi.com/snpa', path_filter, true, undefined, undefined);

                pathGeom = result.getQueryResultWithHistoryRecord(displayableCols, 'gid', 'the_geom', false);
                //getting geom
                pathGeom=pathGeom[0].geometry;

            }
        }
    });

    var rowInfo = new SpatialVue.RowInfo(map, "sidebar", null, pathGeom, _gid);

}

function showIssueDetails(_gid, _rowid) {

    //alert(_gid + '-' + _rowid);
    var path_filter = new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'gid',
        value: _gid
    })

    var layerName = 'Issue';
    var issueGeom = null;
    var result = null;
    $.ajax({
        url: STUDIO_URL + 'layer/' + layerName + "?" + token,
        async: false,
        success: function (data) {
            var uniqueField;
            var displayableCols = data.layerFields;
            if (displayableCols.length > 0) uniqueField = displayableCols[0].keyfield;

            if (displayableCols.length > 0 && uniqueField != undefined) {
                result = new Result(layerName, 'http://www.rmsi.com/snpa', path_filter, true, undefined, undefined);

                issueGeom = result.getQueryResultWithHistoryRecord(displayableCols, 'gid', 'the_geom', false);
                //getting geom
                issueGeom=issueGeom[0].geometry;

            }
        }
    });
    gridref=parseInt(issueGeom.x)+','+parseInt(issueGeom.y);
    var issue = new SpatialVue.Issue(map, "sidebar", null, issueGeom, _gid);

}

function showFurnitureDetails(_gid, _rowid) {

    //alert(_gid + '-' + _rowid);
    var furniture_filter = new OpenLayers.Filter.Comparison({
        type: OpenLayers.Filter.Comparison.EQUAL_TO,
        property: 'gid',
        value: _gid
    })

    var layerName = 'Furniture';
    var furnitureGeom = null;
    var result = null;
    $.ajax({
        url: STUDIO_URL + 'layer/' + layerName + "?" + token,
        async: false,
        success: function (data) {
            var uniqueField;
            var displayableCols = data.layerFields;
            if (displayableCols.length > 0) uniqueField = displayableCols[0].keyfield;

            if (displayableCols.length > 0 && uniqueField != undefined) {
                result = new Result(layerName, 'http://www.rmsi.com/snpa', furniture_filter, true, undefined, undefined);

                furnitureGeom = result.getQueryResultWithHistoryRecord(displayableCols, 'gid', 'the_geom', false);
                //getting geom
                furnitureGeom=furnitureGeom[0].geometry;

            }
        }
    });

    var furniture = new SpatialVue.Furniture(map, "sidebar", null, furnitureGeom, _gid);

}

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

    var surface = new SpatialVue.Surface(map, "sidebar", null, surfaceGeom, _gid);

}

function createEditAccessLand(){	
	
	$("#tab").tabs( "select" , 0 );	
	var editing = new SpatialVue.Editing(map, "sidebar",undefined,undefined,undefined,'Access_Land','Access_Land');
	
} 

function updateUnresovledStatus(_layername,_gid,_status){
	
	$.ajax({   	
    	type: "GET",
        url: STUDIO_URL + "updateunresovledstatus/"+_layername+"/" + _gid,    	
    	async:false,
        success: function (data) {
        	
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        	jAlert('Please try again ');
        }
    });
}


function zoomToAccessland(_agid){
	
	$("#tab").tabs( "select" , 0 );
	zoomToLayerFeature('Access_Land','Polygon','gid',_agid);

}
//added by Saurabh for issues
function viewIssueonAccessLand(_accesslandid,_type) {
	
	var issueonAccessLand=null;
	jQuery.ajax({
		async:false,
    	type: "GET",              
        url: STUDIO_URL + "rowpath/openissue/"+_accesslandid +"/"+_type, 
         success: function (data) {
        	 for(i=0; i<data.length; i++){
     		 	data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
     		 	data[i].issueTypeLkp.type = (lang=='cy')?data[i].issueTypeLkp.math:data[i].issueTypeLkp.type;
       		 	data[i].issueUrgencyLkp.urgencyType = (lang=='cy')?data[i].issueUrgencyLkp.brys:data[i].issueUrgencyLkp.urgencyType;
       		 	data[i].actionStatusLkp.actionStatus = (lang=='cy')?data[i].actionStatusLkp.statws:data[i].actionStatusLkp.actionStatus;
        	 }
        	 issueonAccessLand = data;
         }
	 });

		
		jQuery("#accessLandlink_IssueTableBody").empty();
		if(_type=="Open"){
			if(issueonAccessLand!=null && issueonAccessLand.length > 0){
				jQuery("#accessLandlink_IssueTmpl").tmpl(issueonAccessLand).appendTo("#accessLandlink_IssueTableBody");
			}
			  
		}else{
			if(issueonAccessLand!=null && issueonAccessLand.length > 0){
				jQuery("#accessLandlink_IssueTmpl").tmpl(issueonAccessLand).appendTo("#accessLandlink_IssueTableBody");
			}else{
				jAlert('No historical issues are associated with selected AccessLand');
			}
		}
		$('.clsjob').attr("title", $._('create_job'));
		$('.clsLegal').attr("title", $._('create_legal'));
}