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
var surface_contacts = null;
var surfaceGID = null;
var surfaceId = null;
var _geomFeature;
var surfaceTypes = null;
var surfaceCondition = null;
var surfaceSurveyor = null;
var _saveStrategy = null;
var currentSurface = null;
var _serverurl = null;
var isediting;
var surfaceeattributedata = {};
var surface_wfs = null;
SpatialVue.Surface = function (_map, _searchdiv, masterdetails, geomFeature, newGid) {
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
    //var _rowid= masterdetails.row_id;
    surfaceGID = _gid;
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
        url: STUDIO_URL + "surface/" + _gid,
        success: function (data) {
        	data.lastInspected = convertDateToEuropeanFormat(data.lastInspected);
        	data.lastsurfacedate = convertDateToEuropeanFormat(data.lastsurfacedate);
            currentSurface = data;
            surface_contacts = data.contacts;
            attachedFiles = data.attachments;
            surfaceId = data.surfaceid;
        }
    });
    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "surface/type",
        success: function (data) {
            surfaceTypes = data

        }
    });

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "surface/condition",
        success: function (data) {
            surfaceCondition = data

        }
    });

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "surface/surveyor",
        success: function (data) {
            surfaceSurveyor = data

        }
    });

    $("#tabs-Tool").empty();
    jQuery.get('resources/templates/viewer/surface.html', function (template) {
        addTab($._('Surface'), template);
        $('#span-close').attr('title',$._('close_title'));
        $("#SurAttchFileListBody").empty();
        var htmlStr = '';

        $.each(
        attachedFiles, function (key, val) {
            var filepath = serverurl + val.filepath
            htmlStr = htmlStr + '<tr id="' + _layer.name + '_' + val.associationid + '">';
            htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
            htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteSurfaceAttachedFile(' + "'" + _layer.name + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
        });

        jQuery("#surfaceInfo_DetailsBody").empty();

        jQuery("#surfaceInfo_DetailsTmpl").tmpl(
        currentSurface).appendTo("#surfaceInfo_DetailsBody");

        jQuery("#surfaceInfo_AttachmentBody").empty();

        jQuery("#surfaceInfo_AttachmentTmpl").tmpl(
        currentSurface).appendTo("#surfaceInfo_AttachmentBody");
        
        jQuery("#surfaceUnresolvedIssues").append(jQuery("<option></option>")
        		.attr("value", "false").text((lang=='en')?"No":"Na"));

        jQuery("#surfaceUnresolvedIssues").append(jQuery("<option></option>")
        		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));

        jQuery.each(surfaceTypes, function (i, surfaceType) {
            jQuery("#surfaceType").append(
            jQuery("<option></option>").attr("value", surfaceType.typeid).text(
            (lang=='en')?surfaceType.type:surfaceType.math));
        });
        jQuery("#surfaceSurveyor").empty();
		jQuery("#surfaceSurveyor").append(jQuery("<option></option>").attr("value", "").text((lang=="en")?"Please Select":"Dewisiwch"));
        jQuery.each(surfaceSurveyor, function (i, surfaceSurvey) {
            jQuery("#surfaceSurveyor").append(
            jQuery("<option></option>").attr("value", surfaceSurvey.id).text(
            surfaceSurvey.name));
        });

        jQuery.each(surfaceCondition, function (i, surfaceCond) {
            jQuery("#surfaceCondition").append(
            jQuery("<option></option>").attr("value", surfaceCond.conditionid).text(
            (lang=='en')?surfaceCond.condition:surfaceCond.cyflwr));
        });

        // Attachment
        if (!currentSurface.ishistory) {
            jQuery.get('fileupload', function (template1) {

                $("#SurfileAttachmentDiv").append(template1);

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
                            var associationid = $('#hid-surfaceGid').val();
                            var layername = _layer.name;
                            var keyfield = currentSurface.rowId;
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
                                        markup = markup + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteAttachedFile(' + "'" + layername + "'" + ',' + "'" + associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
                                        refreshSurfaceAttachedFiles(
                                        currentSurface.gid, _serverurl);
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
            jQuery('#surfaceType').val(currentSurface.surfaceTypeLkp.typeid);
            jQuery('#surfaceCondition').val(currentSurface.surfaceConditionLkp.conditionid);
            jQuery('#surfaceUnresolvedIssues').val(currentSurface.unresolvedStatus.toString());
            //jQuery('#surfaceUnresolvedIssues').val(currentSurface.unresolvedStatus);
            //jQuery('#surfaceSurveyor').val(currentSurface.surveyor.toString());
			jQuery('#surfaceSurveyor').val(currentSurface.surveyor);
            jQuery('#SurAttchFileListBody').append(htmlStr);
            $('#fileDesc').val('');
            $('#file').val('');

        } else {
        	jQuery('#surfaceType').val(currentSurface.surfaceTypeLkp.typeid);
            jQuery('#surfaceCondition').val(currentSurface.surfaceConditionLkp.conditionid);
            jQuery('#surfaceUnresolvedIssues').val(currentSurface.unresolvedStatus.toString());
            //jQuery('#surfaceUnresolvedIssues').val(currentSurface.unresolvedStatus);
            //jQuery('#surfaceSurveyor').val(currentSurface.surveyor.toString());
			jQuery('#surfaceSurveyor').val(currentSurface.surveyor);
            jQuery('#SurAttchFileListBody').append(htmlStr);
            $('#SurfileAttachmentDiv').hide();
            $('.btn01').remove();
            $('.nxtPrevBTNHolder').remove();
            $(".deleteFileTD").remove();
        }
        $(function () {
            $("#lastSurfaceDate").datepicker({
                dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
        });
        $(function () {
            $("#surfaceLastInspected").datepicker({
                dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
        });
        
        if (currentSurface.ishistory){
        	$("#btnUpdateSurface").hide();
        }
        $("#surfaceInfoTable :input").attr("disabled", true);
        //$("#SurattachmentDiv :input").attr("disabled", true);
        //$('#SurattachmentDiv a').attr("disabled", true);
        $("#btnCancelSurface").hide();
        $("#btnSaveSurface").hide();
        // }
        
        $("#btnUpdateSurface").click(

        function () {
            if (!currentSurface.ishistory) {
                $("#surfaceInfoTable :input").removeAttr("disabled");
                //$("#SurattachmentDiv :input").removeAttr("disabled");
                //$('#SurattachmentDiv a').removeAttr("disabled");
                $("#roWID").attr("disabled", true);
                $("#surfaceid").attr("disabled", true);
                
                $("#surfaceUnresolvedIssues").attr("disabled", true);

                $("#btnUpdateSurface").hide();
                $("#btnCancelSurface").show();
                $("#btnSaveSurface").show();
                $('#surfaceInfo_AttachmentBody').hide();
            } else {
                jAlert('Selected record is historical feature. Please select valid Surface.');
            }
        });

        $("#btnCancelSurface").click(

        function () {
            var surface = new SpatialVue.Surface(
            map, "sidebar", currentSurface, _geomFeature)
        });
        surfaceLabelTranslations();
        issueLabelTranslations();
    });
};

function issueLabelTranslations(){
	window.setTimeout("attachmentLabelTranslations()", 1000);
}

function surfaceLabelTranslations(){
	$('#lblsurfaceid').html($._('surfaceid') + ':');
	$('#lblsurfacerowid').html($._('row_id') + ':');
	$('#lblsurfacetype').html($._('type') + ':');
	$('#lblsurfaceavgwidth').html($._('average_width') + ':');
	$('#surfacelength').html($._('measure_length') + ':');
	$('#lblsurfacecondition').html($._('condition') + ':');
	$('#lblsufacesurveyor').html($._('surveyor') + ':');
	$('#lblsurfacenotes').html($._('notes') + ':');
	$('#lbllastsurfaced').html($._('last_surfaced') + ':');
	$('#lblsurfacelastinspected').html($._('last_inspected') + ':');
	$('#lblsurfaceunresolvedissue').html($._('unresolved_issues') + ':');
	$('#btnSurfaceEdit').attr("value", $._('Edit'));
	$('#btnSurfaceCancel').attr("value", $._('Cancel'));
	$('#btnSurfaceSave').attr("value", $._('Save'));
	
	$('#surfacelink_1').attr("title", $._('view_surface_link'));
	$('#surfacelink_2').attr("title", $._('locate_on_map'));
	$('#surfacelink_3').attr("title", $._('create_issue'));
}

function getPreviousSurface(_gid, _surfaceid) {

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "surface/" + _surfaceid + "/prev/" + _gid,

        success: function (data) {

            if (data.gid != null) {
            	data.lastInspected = convertDateToEuropeanFormat(data.lastInspected);
            	data.lastsurfacedate = convertDateToEuropeanFormat(data.lastsurfacedate);
            	
                jQuery("#surfaceInfo_DetailsBody").empty();

                jQuery("#surfaceInfo_DetailsTmpl").tmpl(data).appendTo("#surfaceInfo_DetailsBody");

                jQuery("#surfaceInfo_AttachmentBody").empty();

                jQuery("#surfaceInfo_AttachmentTmpl").tmpl(data).appendTo("#surfaceInfo_AttachmentBody");
                
                jQuery("#surfaceUnresolvedIssues").append(jQuery("<option></option>")
                		.attr("value", "false").text((lang=='en')?"No":"Na"));

        				jQuery("#surfaceUnresolvedIssues").append(jQuery("<option></option>")
                		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));

                jQuery.each(surfaceTypes, function (i, surfaceType) {
                    jQuery("#surfaceType").append(
                    jQuery("<option></option>").attr("value", surfaceType.typeid).text(
                    		(lang=='en')?surfaceType.type:surfaceType.math));
                });

                jQuery.each(surfaceSurveyor, function (i, surfaceSurvey) {
                    jQuery("#surfaceSurveyor").append(
                    jQuery("<option></option>").attr("value", surfaceSurvey.id).text(
                    		surfaceSurvey.name));
                });

                jQuery.each(surfaceCondition, function (i, surfaceCond) {
                    jQuery("#surfaceCondition").append(
                    jQuery("<option></option>").attr("value", surfaceCond.conditionid).text(
                    		(lang=='en')?surfaceCond.condition:surfaceCond.cyflwr));
                });

                // refreshAttachedFiles(data.gid,_serverurl);
                var htmlStr = '';

                $.each(
                data.attachments, function (key, val) {
                    var filepath = _serverurl + val.filepath;
                    htmlStr = htmlStr + '<tr id="' + layer.name + '_' + val.associationid + '">';
                    htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
                    htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteSurfaceAttachedFile(' + "'" + layer.name + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
                });

                $("#AttchFileListBody").empty();
                // jQuery('#AttchFileListBody').append(htmlStr);
                jQuery('#SurAttchFileListBody').append(htmlStr);
                $('#fileDesc').val('');
                $('#file').val('');

                jQuery('#surfaceType').val(data.surfaceTypeLkp.typeid);
                jQuery('#surfaceCondition').val(data.surfaceConditionLkp.conditionid);
                jQuery('#surfaceUnresolvedIssues').val(data.unresolvedStatus.toString());
                //jQuery('#surfaceSurveyor').val(data.surveyor.toString());
				jQuery('#surfaceSurveyor').val(data.surveyor);
				
				surfaceLabelTranslations();
		        issueLabelTranslations();

                $("#surfaceInfoTable :input").attr("disabled", true);
                //$("#SurattachmentDiv :input").attr("disabled", true);
                $(".deleteFileTD").remove();
                $('.btn01').remove();
                $("#btnCancelSurface").hide();
                $("#btnSaveSurface").hide();
                $("#btnUpdateSurface").hide();

            } else {

                jAlert('No history found');
            }
        }
    });

}

function getNextSurface(_gid, _surfaceid) {

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "surface/" + _surfaceid + "/next/" + _gid,

        success: function (data) {
            if (data.gid != null) {
            	
            	data.lastInspected = convertDateToEuropeanFormat(data.lastInspected);
            	data.lastsurfacedate = convertDateToEuropeanFormat(data.lastsurfacedate);
            	
                jQuery("#surfaceInfo_DetailsBody").empty();

                jQuery("#surfaceInfo_DetailsTmpl").tmpl(data).appendTo("#surfaceInfo_DetailsBody");

                jQuery("#surfaceInfo_AttachmentBody").empty();

                jQuery("#surfaceInfo_AttachmentTmpl").tmpl(data).appendTo("#surfaceInfo_AttachmentBody");

                
                jQuery.each(surfaceTypes, function (i, surfaceType) {
                    jQuery("#surfaceType").append(
                    jQuery("<option></option>").attr("value", surfaceType.typeid).text(
                    		(lang=='en')?surfaceType.type:surfaceType.math));
                });

                jQuery.each(surfaceSurveyor, function (i, surfaceSurvey) {
                    jQuery("#surfaceSurveyor").append(
                    jQuery("<option></option>").attr("value", surfaceSurvey.id).text(
                    		surfaceSurvey.name));
                });

                jQuery.each(surfaceCondition, function (i, surfaceCond) {
                    jQuery("#surfaceCondition").append(
                    jQuery("<option></option>").attr("value", surfaceCond.conditionid).text(
                    		(lang=='en')?surfaceCond.condition:surfaceCond.cyflwr));
                });
                
                // refreshAttachedFiles(data.gid,_serverurl);
                var htmlStr = '';

                $.each(
                data.attachments, function (key, val) {
                    var filepath = _serverurl + val.filepath;
                    htmlStr = htmlStr + '<tr id="' + layer.name + '_' + val.associationid + '">';
                    htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="' + filepath + '" target="_blank">' + val.filename + '</a></td>';
                    htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteSurfaceAttachedFile(' + "'" + layer.name + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
                });

                $("#AttchFileListBody").empty();
                // jQuery('#AttchFileListBody').append(htmlStr);
                jQuery('#SurAttchFileListBody').append(htmlStr);
                $('#fileDesc').val('');
                $('#file').val('');

                jQuery('#surfaceType').val(data.surfaceTypeLkp.typeid);
                jQuery('#surfaceCondition').val(data.surfaceConditionLkp.conditionid);
                jQuery('#surfaceUnresolvedIssues').val(data.unresolvedStatus.toString());
                //jQuery('#surfaceSurveyor').val(data.surveyor.toString());
				jQuery('#surfaceSurveyor').val(data.surveyor);

                $("#surfaceInfoTable :input").attr("disabled", true);
                //$("#SurattachmentDiv :input").attr("disabled", true);
                $(".deleteFileTD").remove();
                $('.btn01').remove();
                $("#btnCancelSurface").hide();
                $("#btnSaveSurface").hide();
                $("#btnUpdateSurface").hide();

            } else {

                var surface = new SpatialVue.Surface(map, "sidebar", currentSurface, _geomFeature)
                jAlert('No more record');
            }
        }
    });
}

function refreshSurfaceAttachedFiles(gid, serverurl) {
    var files = null;
    var _layer = layer;
    $.ajax({
        type: "GET",
        async: false,
        url: STUDIO_URL + "attachment/" + "Surface" + "/gid/" + gid,
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
        htmlStr = htmlStr + '<td align="center" class="padcellup deleteFileTD"><a href="#" OnClick="deleteSurfaceAttachedFile(' + "'" + _layer.name + "'" + ',' + "'" + val.associationid + "'" + ');"><img src="resources/images/viewer/delete.png" boder="0"></a></td></tr>';
    });
    $("#SurAttchFileListBody").empty();
    jQuery('#SurAttchFileListBody').append(htmlStr);
}

function applySurfaceChanges() {
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

    var layerName = 'Surface';
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
        surface_wfs = map.getLayersByName("WFS")[0];
        if (surface_wfs != undefined) {
            map.removeLayer(surface_wfs);
        }

        if (_saveStrategy != null) {
        }
        _saveStrategy = new OpenLayers.Strategy.Save();

        _saveStrategy.events.register('success', null, onSurfaceGeomSave);

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

            surface_wfs = new OpenLayers.Layer.Vector("WFS", {
                reportError: true,
                strategies: [_saveStrategy],
                projection: _projection,
                protocol: _protocol,
                isBaseLayer: false,
                visibility: true,
                styleMap: styleMap,
                displayInLayerSwitcher: false
            });
            map.addLayers([surface_wfs]);
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

    // Set Attributes for row id
    if (trim($('#surfaceid').val()).length !=0) {
        
        layerfeature.attributes['surface_id'] = $('#surfaceid').val();
    }
    if (trim($('#roWID').val()).length == 0) {
        jAlert('Please provide value for row_id');
        validForm=false;
        return;
    } else {
        layerfeature.attributes['row_id'] = $('#roWID').val();
    }
    // Set Attributes for type
    if (trim($('#surfaceType').val()).length != 0) {
        layerfeature.attributes['type'] = $('#surfaceType').val();
    }
    
    if (trim($('#surfaceCondition').val()).length != 0) {
        layerfeature.attributes['condition'] = $('#surfaceCondition').val();
    }
    
    if (trim($('#SurfaceWidth').val()).length != 0) {
        layerfeature.attributes['average_width'] = $('#SurfaceWidth').val();
    }
    else{
    	layerfeature.attributes['average_width'] = 0;
    }
    
    if (trim($('#SurfaceLength').val()).length != 0) {
        layerfeature.attributes['length'] = $('#SurfaceLength').val();
    }
    
    layerfeature.attributes['notes'] = $('#surfaceNotes').val();

    if (trim($('#lastSurfaceDate').val()).length != 0) {
        layerfeature.attributes['lastsurfacedate'] = convertDateToUSFormat($('#lastSurfaceDate').val());
    }
    if (trim($('#surfaceUnresolvedIssues').val())== 'true') {
        layerfeature.attributes['unresolved_status'] = true;
    }
	else{
		layerfeature.attributes['unresolved_status'] = false;
	}
    
    if (trim($('#surfaceLastInspected').val()).length != 0) {
        layerfeature.attributes['last_inspected'] = convertDateToUSFormat($('#surfaceLastInspected').val());
    }
    
    if (trim($('#surfaceSurveyor').val()).length != 0) {
        layerfeature.attributes['surveyor'] = $('#surfaceSurveyor').val();
    }
    else{
    	if (isediting) {
    		layerfeature.attributes['surveyor'] = null;
    	}
    	//jAlert('Please provide value for Surveyor');		
    	//validForm=false;
    	//return;
    }
    
    
    layerfeature.attributes['ishistory'] = false;

    if (savetype == 'NEW') {
        layerfeature.state = OpenLayers.State.INSERT;
    } else if (savetype == 'EDIT') {
        layerfeature.state = OpenLayers.State.UPDATE;
    }

    if (!isediting) {
        surface_wfs.addFeatures([layerfeature]);
    }
    return validForm;
}

function saveSurfaceGeom() {
    _saveStrategy.save();

}

function onSurfaceGeomSave(event) {
    objLayer.redraw(true);
    var insertId = event.response.insertIds[0];
    var fid = insertId.substr(insertId.indexOf('.') + 1);
    if (!isediting) {
        jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "surface/updatehistory/" + surfaceGID + "/" + surfaceId + "/" + fid,
            success: function (data) {
               // jAlert('Data saved');
            	jAlert($._('Surface') + " " + $._('successfully_updated'), $._('alert'));
				$('#popup_ok').attr("value", $._('popupOk'));
                var surface = new SpatialVue.Surface(map, "sidebar", currentSurface, _geomFeature, fid);
            }
        });

    } else {
        //jAlert('Data saved');
    	jAlert( $._('Surface') + " " + $._('successfully_updated'), $._('alert'));
		$('#popup_ok').attr("value", $._('popupOk'));

        $('#edit_content').empty();
    }
    surface_wfs.removeAllFeatures(true); 
    if(g_wfs != null){
    	g_wfs.removeAllFeatures(true);
    }
}

function saveSurface() {
    
	if(applySurfaceChanges()){
		  
		if (!isediting) {
			saveSurfaceGeom();
		}
		else{
			//jAlert('Click on Save button to save the Surface', 'Surface');
			
			jAlert( $._('alert_click_Save_button') + ' ' + $._('Surface'), $._('Surface'));
			$('#popup_ok').attr("value", $._('popupOk'));
			
			
		}
	}
	
	/*applySurfaceChanges();
    if (!isediting) {
        saveSurfaceGeom();
    }*/
}

function deleteSurfaceAttachedFile(layername, associateId) {
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

function surfaceLink(_rowId,_surfaceid) {
	
	if (surface_contacts.length > 0) {
		jQuery.each(surface_contacts, function (i, ctype) {    	
		
			surface_contacts[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
		});
	}
	
	var _surface_contacts = surface_contacts;

    jQuery.get("resources/templates/viewer/surfacelink.html", function (template) {

        var surfaceissueData;
        var surfacepathdata;
        
        jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "surface/path/" + _rowId,
            success: function (data) {
            	for(i=0; i<data.length; i++){
            		data[i].lastsurvey = convertDateToEuropeanFormat(data[i].lastsurvey);
            		data[i].pathTypeLkp.type = (lang=='cy')?data[i].pathTypeLkp.math:data[i].pathTypeLkp.type;
           		 	data[i].pathLegalstatusLkp.status = (lang=='cy')?data[i].pathLegalstatusLkp.statws:data[i].pathLegalstatusLkp.status;
           		 	
           		 if(lang=='cy'){
	           			data[i].classLkp.priority = data[i].classLkp.priority.replace("Priority", "Blaenoriaeth");
	             	}
            	}
                surfacepathdata = data;

            }
        });
        
        jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "surface/issue/" + _surfaceid+"/Open",
            success: function (data) {
            	 if(data!=null && data.length>0){
		            jQuery.ajax({
		                 async: false,
		                 type: "GET",
		                 url: STUDIO_URL + "surface/issueactions/"+_surfaceid +"/Open",
		                 success: function(action){
			            	for(var i=0;i<data.length;i++){
			            		data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
			            		data[i].assignedTo = getNameFromEMail(data[i].assignedTo);
			            		//data[i]["ActionType"] = getActionType(data[i].gid.toString(), action);
			            		  data[i]["ActionType"] = $._(getActionType(data[i].gid.toString(), action));
			            		
			            		data[i].issueTypeLkp.type = (lang=='cy')?data[i].issueTypeLkp.math:data[i].issueTypeLkp.type;
	    	           		 	data[i].issueUrgencyLkp.urgencyType = (lang=='cy')?data[i].issueUrgencyLkp.brys:data[i].issueUrgencyLkp.urgencyType;
	    	           		 	data[i].actionStatusLkp.actionStatus = (lang=='cy')?data[i].actionStatusLkp.statws:data[i].actionStatusLkp.actionStatus;
			            	}
			            	surfaceissueData = data;
		                 }
		            });
            	 }
            }
        });
        
        
        addListingTab($._('surface_link'), 'tab-surfacelink', template);

        if(_surface_contacts.length > 0){
        	jQuery("#surfacelink_ContactTmpl").tmpl(
        	        _surface_contacts).appendTo("#surface_ContactTableBody");
        }
        else{
        	//jQuery("#surfacelink_ContactTmpl").tmpl().appendTo("#surface_ContactTableBody");
        }

        // path
        if (surfacepathdata != null && surfacepathdata.length > 0) {
            jQuery("#surfacelink_PathTmpl").tmpl(
            surfacepathdata).appendTo("#surfacelink_PathTableBody");

        } else {
            // jQuery("#furniturelink_PathTmpl").tmpl().appendTo("#furniturelink_PathTableBody");
        }

        // issue
        if (surfaceissueData != null && surfaceissueData.length > 0) {
            jQuery("#surfacelink_IssueTmpl").tmpl(
            		surfaceissueData).appendTo("#surfacelink_IssueTableBody");

        } else {
            // jQuery("#furniturelink_PathTmpl").tmpl().appendTo("#furniturelink_PathTableBody");
        }

        jQuery("#surfacelink_accordion").accordion({
            fillSpace: true
        });
        // added for contact
        $("#addNewSurfaceContact").click(function () {
            addNewContact('surface', surfaceGID);

        });

        $("#addToExistingSurfaceContact").click(function () {
            addExistingContact('surface', surfaceGID);

        });
        
      //go to parent
		$("#goToparentsurfaceLink").click(function() {			
			showSurfaceDetails(surfaceGID, _rowId);
		});
        
		
		//for historical issue on path
		$("#histricalIssueOnSurface").click(function() {			
			viewHistricalIssueOnSurface(_surfaceid);
			
		});
		//for open issue on path
		$("#openIssueOnSurface").click(function() {			
			viewOpenIssueOnSurface(_surfaceid);
		});	

        $('#surfacelink_accordion h3 a').click(

        function (event) {
            // alert(event.currentTarget.id);
            // fetchFurnitureData(event.currentTarget.id);
        });

        translateSurfaceIssueListing();
        translateSurfaceContactListing();
        translateSurfacePathListing();
    });
}

function translateSurfaceIssueListing(){
	$('#surfacelink_issueheader').html($._('Issue'));
	 $('#surfacelink_parentlink').html($._('go_to_parent'));
	 $('#surfacelink_openissue').html($._('issues_open'));
	 $('#surfacelink_historicalissue').html($._('furniture_link_issue_historical'));
	 $('#surfacelink_issueid').html($._('Issueid'));
	 $('#surfacelink_rowid').html($._('row_id'));
	 $('#surfacelink_issuetype').html($._('type'));
	 $('#surfacelink_issueurgency').html($._('urgency'));
	 $('#surfacelink_issuestatus').html($._('status'));
	 $('#surfacelink_issueassignedto').html($._('assigned_to'));
	 $('#surfacelink_issueresolveby').html($._('resolve_by'));
	 $('#surfacelink_issueaction').html($._('action'));
	 
	 $('.clsjob').attr("title", $._('create_job'));
	$('.clslegal').attr("title", $._('create_legal'));
}

function  translateSurfaceContactListing(){
	$('#surfacelink_contactheader').html($._('contact'));
	$('#surfacelink_addnew').html($._('furniture_link_addcontact'));
	$('#surfacelink_addexisting').html($._('furniture_link_existingcontact'));
	$('#surfacelink_contactid').html($._('contact_id'));
	$('#surfacelink_contactfname').html($._('contact_fname'));
	$('#surfacelink_contactlname').html($._('contact_surname'));
	$('#surfacelink_contacttype').html($._('contact_type'));
	$('#surfacelink_contactposition').html($._('contact_position'));
	$('#surfacelink_contactphone').html($._('Phone'));
	$('#surfacelink_contactemail').html($._('EMail'));
}

function translateSurfacePathListing(){
	$('#surfacelink_pathheader').html($._('furniture_link_path'));
	$('#surfacelink_pathid').html($._('row_id'));
	$('#surfacelink_pathtype').html($._('type'));
	$('#surfacelink_pathpriority').html($._('furniture_link_path_priority'));
	$('#surfacelink_pathsurveydate').html($._('furniture_link_path_lastsurvey'));
	$('#surfacelink_pathstatus').html($._('legalstatus'));
}

function fetchSurfaceData(lyr) {
    // alert('load data: '+ lyr);
    var classdata = null;
    var typedata = null;
    var legalstatusdata = null;
    var conditiondata = null;
    var surfacetypedata = null;
    var issuetypedata = null;
    var issueurgency = null;
    var issuestatus = null;
    var issueassignto = null;
    var attributedata = {};

    var layerData = null;
    var surfacedata = null;
    var _surface_contacts = surface_contacts;
    var feature = _geomFeature;
    var surfaceLayer = map.getLayersByName(lyr)[0];
    var objSelect = null;
    var filter = null;

    if (lyr == 'RoW_Path' && $('#surfacelink_PathTableBody tr').length == 0) {
        // alert('Popoulating rows');
        objSelect = new Selection(feature, surfaceLayer);
        filter = objSelect.creationSelectionCriteria(this);
        objSelect.displaySelection(filter, selectionSymbolizer, surfaceLayer);
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

            jQuery("#surfacelink_PathTableBody").empty();

            jQuery("#surfacelink_PathTmpl").tmpl(null, {
                attributeList: attributedata

            }).appendTo("#surfacelink_PathTableBody");
        }

    }
}

function refreshSurfaceContact(_gid) {

    jQuery.ajax({
        async: false,
        type: "GET",
        url: STUDIO_URL + "surface/" + _gid,
        success: function (data) {
            surface_contacts = data.contacts;
            if (surface_contacts.length > 0) {
        		jQuery.each(surface_contacts, function (i, ctype) {    	
        		
        			surface_contacts[i].contactTypeLkp.contactType=$._(ctype.contactTypeLkp.contactType)								
        		});
        	}

        }
    });
    $("#surface_ContactTableBody").empty();
    jQuery("#surfacelink_ContactTmpl").tmpl(surface_contacts).appendTo("#surface_ContactTableBody");
}
function zoomToSurface(){
	var fieldName="gid";
	var fieldVal=surfaceGID;
	var relLayerName='Surface';	
	var layerType = 'Line';
	$("#tab").tabs( "select" , 0 );
	zoomToLayerFeature(relLayerName,layerType,fieldName,fieldVal);//ref complaints.js
}


function createSurfaceOnPath(_gid,_rowid){
	$("#tab").tabs( "select" , 0 );	
	zoomToLayerFeature('RoW_Path','Line','gid',_gid);
	var editing = new SpatialVue.Editing(map, "sidebar",undefined,_rowid,_gid,'Surface','RoW_Path');
}

function createIssueOnSurface(_gid,_rowid){
	$("#tab").tabs( "select" , 0 );	
	zoomToLayerFeature('Surface','Line','gid',_gid);
	var editing = new SpatialVue.Editing(map, "sidebar",undefined,_rowid,_gid,'Issue','Surface');
}



function viewHistricalIssueOnSurface(_surfaceid){

	var surfaceissueData=null;
	jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "surface/issue/" + _surfaceid+"/history",
            success: function (data) {
            	 if(data!=null && data.length>0){
 		            jQuery.ajax({
 		                 async: false,
 		                 type: "GET",
 		                 url: STUDIO_URL + "surface/issueactions/"+_surfaceid +"/history",
 		                 success: function(action){
			            	for(var i=0; i<data.length; i++){
			            		data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
			            		 data[i].assignedTo = getNameFromEMail(data[i].assignedTo);
			            		 //data[i]["ActionType"] = getActionType(data[i].gid.toString(), action);
			            		 data[i]["ActionType"] = $._(getActionType(data[i].gid.toString(), action));
			            		 
			            		 data[i].issueTypeLkp.type = (lang=='cy')?data[i].issueTypeLkp.math:data[i].issueTypeLkp.type;
		    	           		 data[i].issueUrgencyLkp.urgencyType = (lang=='cy')?data[i].issueUrgencyLkp.brys:data[i].issueUrgencyLkp.urgencyType;
		    	           		 data[i].actionStatusLkp.actionStatus = (lang=='cy')?data[i].actionStatusLkp.statws:data[i].actionStatusLkp.actionStatus;
			            	}
			            	surfaceissueData = data;
 		                 }
 		            });
            	 }
            }
     });
		
		// issue
	
		jQuery("#surfacelink_IssueTableBody").empty();
        if (surfaceissueData != null && surfaceissueData.length > 0) {
            jQuery("#surfacelink_IssueTmpl").tmpl(
            		surfaceissueData).appendTo("#surfacelink_IssueTableBody");

        } else {
            // jQuery("#furniturelink_PathTmpl").tmpl().appendTo("#furniturelink_PathTableBody");
        }
        $('.clsjob').attr("title", $._('create_job'));
		$('.clslegal').attr("title", $._('create_legal'));

}

function viewOpenIssueOnSurface(_surfaceid){
	var surfaceissueData=null;
	jQuery.ajax({
            async: false,
            type: "GET",
            url: STUDIO_URL + "surface/issue/" + _surfaceid+"/Open",
            success: function (data) {
            	 if(data!=null && data.length>0){
 		            jQuery.ajax({
 		                 async: false,
 		                 type: "GET",
 		                 url: STUDIO_URL + "surface/issueactions/"+_surfaceid +"/Open",
 		                 success: function(action){
			            	for(var i=0;i<data.length;i++){
			            		data[i].resolveBy = convertDateToEuropeanFormat(data[i].resolveBy);
			            		 data[i].assignedTo = getNameFromEMail(data[i].assignedTo);
			            		 //data[i]["ActionType"] = getActionType(data[i].gid.toString(), action);
			            		 data[i]["ActionType"] = $._(getActionType(data[i].gid.toString(), action));
			            		 data[i].issueTypeLkp.type = (lang=='cy')?data[i].issueTypeLkp.math:data[i].issueTypeLkp.type;
		    	           		 	data[i].issueUrgencyLkp.urgencyType = (lang=='cy')?data[i].issueUrgencyLkp.brys:data[i].issueUrgencyLkp.urgencyType;
		    	           		 	data[i].actionStatusLkp.actionStatus = (lang=='cy')?data[i].actionStatusLkp.statws:data[i].actionStatusLkp.actionStatus;
			            	}
			            	surfaceissueData = data;
 		                 }
 		            });
            	 }
            }
     });
		
		// issue
		jQuery("#surfacelink_IssueTableBody").empty();
		
        if (surfaceissueData != null && surfaceissueData.length > 0) {
            jQuery("#surfacelink_IssueTmpl").tmpl(
            		surfaceissueData).appendTo("#surfacelink_IssueTableBody");

        } else {
            // jQuery("#furniturelink_PathTmpl").tmpl().appendTo("#furniturelink_PathTableBody");
        }
        
        $('.clsjob').attr("title", $._('create_job'));
		$('.clslegal').attr("title", $._('create_legal'));

}
