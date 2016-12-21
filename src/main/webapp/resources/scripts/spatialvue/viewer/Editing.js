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

saveStrategy = null;
var selectedFeature = null;
var wfs_del = null;
var wfsurl = null;
var featPrefix = null;
var targetNamespace = null;
var geometryColName = null;
var cosmetic_geometryColName = null;
var objLayer = null;
var layerType;
var featureState = "";
var currentFeature;
var editControls = null;
var snap=null;
var validationRuleParams = { required: false, number: false };
var editSelectionSymbolizer = {
		 "Point": {pointRadius: 4, graphicName: "square", fillColor: "#CC9900", fillOpacity: 1, strokeWidth: 1, strokeOpacity: 1, strokeColor: "#333333"},
		 "Line": {strokeWidth: 3, strokeOpacity: 1, strokeColor: "#666666", strokeLinecap: "square", strokeDashstyle: "dash"},
		 "Polygon": {strokeWidth: 2, strokeOpacity: 1, strokeColor: "#CC9900", fillColor: "#CC9900", fillOpacity: 0.3, strokeLinecap: "square", strokeDashstyle: "solid"},
		 "RegularPolygon": {strokeWidth: 2, strokeOpacity: 1, strokeColor: "#CC9900", fillColor: "#CC9900", fillOpacity: 0.3}
		};

var style = new OpenLayers.Style();
style.addRules([new OpenLayers.Rule({ symbolizer: editSelectionSymbolizer })]);
var styleMap = new OpenLayers.StyleMap({ "default": style });

var deleteSelectionSymbolizers = {
	    "Point": {pointRadius: 4, graphicName: "square", fillColor: "#ff0000", fillOpacity: 1, strokeWidth: 1, strokeOpacity: 1, strokeColor: "#ff0000"},
	    "Line": {strokeWidth: 3, strokeOpacity: 1, strokeColor: "#ff0000", strokeLinecap: "square", strokeDashstyle: "dash"},
	    "Polygon": {strokeWidth: 2, strokeOpacity: 1, strokeColor: "#ff0000", fillColor: "#ff0000", fillOpacity: 0.3, strokeLinecap: "square", strokeDashstyle: "solid"},
	    "RegularPolygon": {strokeWidth: 2, strokeOpacity: 1, strokeColor: "#ff0000", fillColor: "#ff0000", fillOpacity: 0.3}
	};
var delStyle = new OpenLayers.Style();
delStyle.addRules([new OpenLayers.Rule({ symbolizer: deleteSelectionSymbolizers })]);
var delStyleMap = new OpenLayers.StyleMap({ "default": delStyle });
var g_createIssue_rowid=null;
var g_createIssue_gid=null;
var oldIssueActionStatus=1;
var d=new Date();         
var dat=d.getDate();         
var mon=parseInt(d.getMonth())+1;
if(parseInt(mon)<10){
	mon='0'+mon
} 
if(parseInt(dat)<10){
	dat='0'+dat
}          
var year=d.getFullYear();      
   
var currentDate = year+"-"+mon+"-"+dat;

var parentlryName;
var validForm=false;
var issueReasonLanMap={};
SpatialVue.Editing = function (_map, _searchdiv,furnitureid,rowid,gid,onLayer,parentLayer) {  
	parentlryName=parentLayer;
	g_createIssue_furnitureid=furnitureid;	
	g_createIssue_rowid=rowid;
	g_createIssue_gid=gid;			
    map = _map;
    searchdiv = _searchdiv;
    showResultsinDialog = true;
    
    if (saveStrategy != null){
        this.Unregister();
    }
    //saveStrategy = new OpenLayers.Strategy.Save();
    
   // removeChildElement("sidebar", "layerSwitcherContent");
    //$("#layerSwitcherContent").hide();
    
    $("#tabs-Tool").empty();
    
    jQuery.get('resources/templates/viewer/editing.html', function (template) {

    	jQuery.ajax({
    		type: 'GET',
            url: "theme/date",
            dataType: "text",
            async: false,
            success: function (data) {
            	currentDate = data;
            }
        });
		
      //Add tab
		addTab($._('editing'),template);
		
		$('#span-close').attr('title',$._('close_title'));
		
		/*if(onLayer=='Furniture' && parentLayer==undefined){
			$('#subcelladjustcreate').hide();
		}*/
		
		$("#edit_layer").text(onLayer);
		$("#edit_layer_visible").text($._(onLayer));
		onEditLayerChange();
		
		$("#editing-help").tipTip({defaultPosition:"right"});
		
		$("#options-s-d").hide();		
		/*
		 $('#edit_layer').change(onEditLayerChange);
		
		populateEditableLayers();
		
		if(onLayer!=undefined){
			$("#edit_layer").val(onLayer);
			$('#edit_layer').change();
			$('#edit_layer').attr("disabled", true);
		}
		*/
		
		$("#options-s-t").click(function () {
            $("#options-s-d").slideToggle('fast');
        });
		
		
		$("#options1-s-d").hide();
        
		$("#options1-s-t").click(function () {
            $("#options1-s-d").slideToggle('fast');
        });
		
		$("#options2-s-d").hide();
        
		$("#options2-s-t").click(function () {
            $("#options2-s-d").slideToggle('fast');
        });
		
		 $("#edit_tolerance").spinner({
                        min: 1,
                        max: 10
                        
         });
         $("#max_features").spinner({
                        min: 1,
                        max: 10
         });
		 $("#edit_tolerance_two").spinner({
                        min: 1,
                        max: 100
         });
		
		$("#options3-s-d").hide();
		$('#options3-s-t').click(function() {
  			$('#options3-s-d').slideToggle('fast', function() {
    		// Animation complete.
  			});
		});
		
		$("#options4-s-d").hide();
		$('#options4-s-t').click(function() {
  			$('#options4-s-d').slideToggle('fast', function() {
    		// Animation complete.
  			});
		});
		
		toggleButtons();
		
		$("#subcelladjust button").bind("click", function(e) {
			featureState = "";
			for ( var key in editControls) {
				var control = editControls[key];
				control.deactivate();

			}
			switch (e.currentTarget.id) {
			case 'selectionBox':
				_toggleEditControl('selectionBox');
				break;
			case 'clearselection':
				/*if(wfs != undefined){
					wfs.removeAllFeatures();
				}
				if(wfs_del != undefined){
					wfs_del.removeAllFeatures();
				}*/
				onEditLayerChange();
				break;
			case 'selectUndo':
				if(undoredo != undefined){
					undoredo.undo();
				}
				break;
			case 'selectRedo':
				if(undoredo != undefined){
					undoredo.redo();
				}
				break;
			case 'selectSave':
				saveEdit();
				break;
			}
		});
		$("#subcelladjustcreate button").bind("click", function(e) {
			featureState = "";
			for ( var key in editControls) {
				var control = editControls[key];
				control.deactivate();
			}
			switch (e.currentTarget.id) {
			case 'point':
				if(layerType == 'Point'){
					featureState = "insert"
					_toggleEditControl('point');
				}else{
					//jAlert("Selected Layer is not point type", "Error");
					
					jAlert( $._('alert_not_point_type'), $._('error'));
					$('#popup_ok').attr("value", $._('popupOk'));
				}
				break;
			case 'line':
				if(layerType == 'LineString'){
					featureState = "insert";
					_toggleEditControl('line');
				}else{
					//jAlert("Selected Layer is not line type", "Error");
					jAlert( $._('alert_not_line_type'), $._('error'));
					$('#popup_ok').attr("value", $._('popupOk'));
				}
				break;
			case 'polygon':
				if(layerType == 'Polygon'){
					featureState = "insert";
					_toggleEditControl('polygon');
				}else{
					//jAlert("Selected Layer is not polygon type", "Error");
					jAlert( $._('alert_not_polygon_type'), $._('error'));
					$('#popup_ok').attr("value", $._('popupOk'));
				}
				break;
			}
		});
		
		$("#subcelladjustedit button").bind("click", function(e) {
			featureState = "";
			for ( var key in editControls) {
				var control = editControls[key];
				control.deactivate();

			}
			switch (e.currentTarget.id) {
			case 'importFeature':
				_toggleEditControl('importFeature');
				break;
			case 'move':
				_toggleEditControl('modify');
				modifyMode('move');
				break;
			case 'reshape':
				_toggleEditControl('modify');
				modifyMode('reshape');
				break;
			case 'resize':
				_toggleEditControl('modify');
				modifyMode('resize');
				break;
			case 'rotate':
				_toggleEditControl('modify');
				modifyMode('rotate');
				break;
			//case 'removeVertex':
				//_toggleEditControl('modify');
				//break;
			case 'removeFeature':
				_toggleEditControl('deleteFeature');
				break;
			case 'editAttribute':
				_toggleEditControl('editAttribute');
				break;
			}	
		});
		
		translateEditLables();
    });
}

function translateEditLables(){
	$('#lbl_edit_layer').html($._('layer') + ' : ');
	$('#selectionBox').attr("title",$._('select_by_rectangle'));
	$('#clearselection').attr("title",$._('clear_selection'));
	$('#selectUndo').attr("title",$._('undo'));
	$('#selectRedo').attr("title",$._('redo'));
	$('#selectSave').attr("title",$._('Save'));
	$('#options-s-t').html($._('create'));
	$('#point').attr("title",$._('point'));
	$('#line').attr("title",$._('line'));
	$('#polygon').attr("title",$._('polygon'));
	$('#options1-s-t').html($._('Edit'));
	$('#importFeature').attr("title",$._('import_feature'));
	$('#move').attr("title",$._('move'));
	$('#resize').attr("title",$._('resize'));
	$('#reshape').attr("title",$._('reshape'));
	$('#rotate').attr("title",$._('rotate'));
	$('#removeFeature').attr("title",$._('remove_feature'));
	$('#editAttribute').attr("title",$._('edit_attribute'));
	$('#options2-s-t').html($._('edit_attributes'));
	$('#options4-s-t').html($._('snap_settings'));
	$('#snap_tolerance').html($._('tolerance'));
	$('#snap_feature').html($._('snap_to_feature'));
	$('#snap_node').html($._('snap_to_nodes'));
	$('#snap_vertice').html($._('snap_to_vertices'));
	$('#snap_edge').html($._('snap_to_edges'));
}

function populateEditableLayers() {
    var lyrCount = map.getNumLayers();
    $('#edit_layer').empty();
    $('#edit_layer').append($("<option></option>").attr("value", "Select Layer").text("Select Layer"));
    for (var i = 0; i < lyrCount; i++) {
        if (map.layers[i] instanceof OpenLayers.Layer.WMS && map.layers[i].name.indexOf("Cosmetic") == -1 && map.layers[i].name != 'clone') {
            if (map.layers[i].visibility == true && map.layers[i].editable == true) {
                if (doesLayerExists(map.layers[i].name)) {
                    //if (map.layers[i].queryable) {
                        $('#edit_layer').append($("<option></option>").attr("value", map.layers[i].name).text(map.layers[i].name));
                   // }else{
                    	if(map.layers[i].name == 'Cosmetic'){
                    		 $('#edit_layer').append($("<option></option>").attr("value", map.layers[i].name).text(map.layers[i].name));
                    	}
                    //}
                }
            }
        }
    }

    if (lyrCount > 0) {
       // $('#edit_layer').get(0).selectedIndex = 0;
    	//$("#edit_layer").val($("#edit_layer option:first").val());
    }
}

function doesLayerExists(lyrName) {
    var bFlag = true;

    var count = $('#edit_layer option').size();
    for (var i = 0; i < count; i++) {
        var value = $("#layers option[value=" + lyrName + "]").text();
        if (value == lyrName) {
            bFlag = false;
            break;
        }
    }
    return bFlag;
}

function getLayerType(layer, wfsurl) {
    $.ajax({
        url: PROXY_PATH + wfsurl + "&request=DescribeFeatureType&service=WFS&version=1.0.0&typeName=" + layerMap[layer.name],
        dataType: "text",
        async: false,
        success: function (text) {
            if (text.search(/gml:MultiPolygon/i) >= 0 || text.search(/gml:Polygon/i) >= 0) {
            	layerType = 'Polygon';
            } else if (text.search(/gml:MultiLineString/i) >= 0 || text.search(/gml:LineString/i) >= 0) {
            	layerType = 'LineString';
            } else if (text.search(/gml:MultiPoint/i) >= 0 || text.search(/gml:Point/i) >= 0) {
            	layerType = 'Point';
            }
        },
        error: function (xhr, status) {
        	if(layerMap[layer.name].indexOf("OSMM_") > -1){
        		jAlert("WFS operation on " + layerMap[layer.name] + " layer is restricted");
        		closeDialog('editingdiv');
        		deactivateControls();
        		return;
        	}else{
        		jAlert('Sorry, there is a problem!');
        	}
        }
    });
}

function onEditLayerChange(){
	validForm=false;
	hideEditForm();
	//reset tolerance
	$('#edit_tolerance_two').val(10);
	
	//Remove the previously add WFS and WFS_DEL layers
	g_wfs = map.getLayersByName("WFS")[0];
	if(g_wfs != undefined){
		map.removeLayer(g_wfs);
	}
	wfs_del = map.getLayersByName("WFS_DEL")[0];
	if(wfs_del != undefined){
		map.removeLayer(wfs_del);
	}
	deactivateControls();
	saveStrategy = new OpenLayers.Strategy.Save();
	
	//var selected = $("#edit_layer option:selected");
	
	var selected=$('#edit_layer').text() ;		//$('#item1 span').html()
	
	

	
    //if (selected.text() == CONST_SELECT_LAYER) {
    if (selected == CONST_SELECT_LAYER) {
	}else{
    	
    	//Get the Layer object
    	//var layerName = selected.text();
		var layerName = selected;
    	objLayer = map.getLayersByName(layerName)[0];
        var _wfsurl = objLayer.url.replace(new RegExp( "wms", "i" ), "wfs");
        var _wfsSchema = _wfsurl + "request=DescribeFeatureType&version=1.1.0&typename=" + layerMap[objLayer.name];
        
        /*Get Geometry column name, featureTypes, targetNamespace for the selected layer object*/
        $.ajax({
            url: PROXY_PATH + _wfsSchema,
            dataType: "xml",
            async:false,
            success: function (data) {
                var featureTypesParser = new OpenLayers.Format.WFSDescribeFeatureType();
                var responseText = featureTypesParser.read(data);
                var featureTypes = responseText.featureTypes;
                targetNamespace = responseText.targetNamespace;
                featPrefix = responseText.targetPrefix;
                featureTypesFields = featureTypes[0].properties;

                for (var i = 0; i < featureTypes[0].properties.length; ++i) {
                    if (featureTypes[0].properties[i].type.indexOf('gml')>=0) {
                        geometryColName = featureTypes[0].properties[i].name;
                        break;
                    }
                }
                
                //Get the layer type
                getLayerType(objLayer, _wfsurl);
                
                if(layerType == 'Point'){
                	$("#resize").attr("disabled", true);
                	$("#reshape").attr("disabled", true);
                	$("#rotate").attr("disabled", true);
                	$("#removeVertex").attr("disabled", true);
                }else{
                	$("#resize").removeAttr("disabled");
                	$("#reshape").removeAttr("disabled");
                	$("#rotate").removeAttr("disabled");
                	$("#removeVertex").removeAttr("disabled");
                }
            },
            error: function (xhr, status) {
            	if(layerMap[objLayer.name].indexOf("OSMM_") > -1){
            		jAlert("WFS operation on " + layerMap[objLayer.name] + " layer is restricted");
            		return;
            	}else{
            		jAlert('Sorry, there is a problem!');
            	}
            }
        });
        
        var actualLayerName = layerMap[objLayer.name];
        var pos = actualLayerName.indexOf(":");
        var featType = null;
        if (pos > 1)
            featType = actualLayerName.substring(pos + 1);
        else
            featType = actualLayerName;
        
        //Create Vector object for WFS(Selected feature) and WFS_DEL(Selected for delete feature)
        var _projection = new OpenLayers.Projection(objLayer.projection.projCode);
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
        
        g_wfs = new OpenLayers.Layer.Vector(
                "WFS", {
                    reportError: true,
                    strategies: [saveStrategy],
                    projection: _projection,
                    protocol: _protocol,
                    isBaseLayer: false,
                    visibility: true,
                    styleMap: styleMap,
                    displayInLayerSwitcher: false
                }
            );
            map.addLayers([g_wfs]);
            
			snap = new OpenLayers.Control.Snapping({
                layer: g_wfs,
                targets: [g_wfs],
                greedy: false
            });
            snap.activate();
			
			map.addControl(snap);
			
            wfs_del = new OpenLayers.Layer.Vector(
            "WFS_DEL", {
                reportError: true,
                projection: _projection,
                protocol: _protocol,
                isBaseLayer: false,
                visibility: true,
                styleMap: delStyleMap,
                displayInLayerSwitcher: false
            }
           );
            map.addLayers([wfs_del]);
            undoredo = new UndoRedo([g_wfs, wfs_del]);
            
            /*For Markup*/
            var lyrCount = map.getNumLayers();
            var cosmetic_protocol;
            for (var i = 0; i < lyrCount; i++) {
                if (map.layers[i].name.indexOf("Cosmetic") != -1) {
                	var typeName;
                	if(layerType == 'Point'){
                		//typeName = "rega:Cosmetic_Point";
                		typeName = workspace + ":Cosmetic_Point";
                	}else if(layerType == 'LineString'){
                		//typeName = 'rega:Cosmetic_Line';
                		typeName = workspace + ":Cosmetic_Line";
                	}else if(layerType == 'Polygon'){
                		//typeName = 'rega:Cosmetic_Poly';
                		typeName = workspace + ":Cosmetic_Poly";
                	}
                	
                	var cosmeticLayer = map.getLayersByName("Cosmetic")[0];
                    //cosmeticlayers = cosmeticLayer.params.LAYERS.split(",");
                    var url = cosmeticLayer.url;
                    var cosmeticProjection = cosmeticLayer.projection;
                    var url = replaceString(url, /wms/gi, 'wfs');
                    var cosmetic_schema = url + "&request=DescribeFeatureType&version=1.0.0&service=WFS&typename=" + typeName;
                    var cosmetic_featureNS;
                    $.ajax({
                        url: PROXY_PATH + cosmetic_schema,
                        async: false,
                        success: function (data) {
                        	var cosmetic_featureTypesParser = new OpenLayers.Format.WFSDescribeFeatureType();
                            var cosmetic_responseText = cosmetic_featureTypesParser.read(data);
                            var cosmetic_featureTypes = cosmetic_responseText.featureTypes;
                             cosmetic_featureNS = cosmetic_responseText.targetNamespace;
                            var cosmetic_featPrefix = cosmetic_responseText.targetPrefix;
                            
                            for (var i = 0; i < cosmetic_featureTypes[0].properties.length; ++i) {
                                if (cosmetic_featureTypes[0].properties[i].type.indexOf("gml")>=0) {
                                	cosmetic_geometryColName = cosmetic_featureTypes[0].properties[i].name;
                                	break;
                				}
                			}
                            
                            var _pos = typeName.indexOf(":");
                            var _featType = null;
                            if (pos > 1)
                                _featType = typeName.substring(pos + 1);
                            else
                                _featType = typeName;
                            
                            //Create Vector object for WFS(Selected feature) and WFS_DEL(Selected for delete feature)
                            cosmetic_protocol = new OpenLayers.Protocol.WFS({
                            	//headers: { Authorization : "Basic YWRtaW5AZXJ5cmktbnBhLmdvdi51azpQNHJDM3J5cjE="},
                                version: "1.1.0",
                                srsName: cosmeticProjection.projCode,
                                url: url,
                                featureType: _featType,
                                geometryName: cosmetic_geometryColName,
                                featurePrefix: cosmetic_featPrefix,
                                featureNS: cosmetic_featureNS,
                                schema: cosmetic_schema
                            });
                        },
                        error: function (xhr, status) {
                        	if(typeName.indexOf("OSMM_") > -1){
                        		jAlert("WFS operation on " + typeName + " layer is restricted");
                        	}else{
                        		jAlert('Sorry, there is a problem!');
                        	}
                        }
                    });
                	break;
                }
            }
            
            
            
            g_wfs.events.on({
                "beforefeaturemodified": showEditForm,
                "featuremodified": onFeatureModification
            });
            
            editControls = {        
                    modify: new OpenLayers.Control.ModifyFeature(g_wfs, {
                    	displayClass:"olControlDefault",
                        clickout: false,
                        toggle: false,
                        //enforceTopology: true,
                        deleteCodes: [46, 68, 27]
                    }),
                    deleteFeature: new OpenLayers.Control.SelectFeature(g_wfs, {
                    	displayClass:"olControlDefault",
                    	renderIntent: "temporary",
                        onSelect: onFeatureSelection
                    }),
                    importFeature: new OpenLayers.Control.GetFeature({
                    	displayClass:"olControlDefault",
                        protocol: cosmetic_protocol
                    }),
                    editAttributes: new OpenLayers.Control.SelectFeature([g_wfs], {
                       // onSelect: onFeatureAttributeSelection
                    }),
                    selectionBox: new OpenLayers.Control.GetFeature({
                    	displayClass:"olControlDefault",
                        protocol: _protocol,
                        click:true,
                        single:false,
                        box:true,
                        multiple:false,
                        clickout:true,
                        //maxFeatures: $('#max_features').val(),
						toggle:false,
						hover:false
                    }),
                    editAttribute:new OpenLayers.Control.SelectFeature(g_wfs,{
                    	displayClass:"olControlDefault",
                        protocol: _protocol,
                        click:true,
                        single:false,
                        box:false,
                        multiple:false,
                        clickout:true,
						toggle:false,
						onSelect: onFeatureSelect,
						hover:false
                    }),
    		        point: new OpenLayers.Control.DrawFeature(
    		                g_wfs, OpenLayers.Handler.Point, {
    		                	displayClass:"olControlDefault",
    		                    callbacks: {
    		                        done: function (p) {
    		                            var pointFeature = new OpenLayers.Feature.Vector(p);
    		                            pointFeature.state = OpenLayers.State.INSERT;
    		                            g_wfs.addFeatures([pointFeature]);
    		                            if($("#edit_layer").text()=='Issue' && parentlryName=='RoW_Path'){
    		                            	var pathFound=0;
    		                            	var pathLyr=map.getLayersByName('RoW_Path')[0];
    		                            	var pathSelect = new Selection(pointFeature, pathLyr);
    		                            	var pathFilter = pathSelect.creationSelectionCriteria(this);
    		                            	var pathLayerData = pathSelect.getResult(pathFilter, false);
											if(pathLayerData.length>0){
												pathFound=0;
												for(i=0;i<pathLayerData.length;i++){
														if(pathLayerData[i].attributes.gid==g_createIssue_gid){
															pathFound++;
															
														}
														
												}
												
												if(pathFound>0){
													
													var furnitureFound=null;
													var furnitureLyr=map.getLayersByName('Furniture')[0];
													var furnitureSelect = new Selection(pointFeature, furnitureLyr);
													var furnitureFilter = furnitureSelect.creationSelectionCriteria(this);
													var furnitureLayerData = furnitureSelect.getResult(furnitureFilter, false);
													
													if(furnitureLayerData.length>0){
													
													for(i=0;i<furnitureLayerData.length;i++){
														if(furnitureLayerData[i].attributes.ishistory=='false'){															
															//alert('FUR id:'+ furnitureLayerData[i].attributes.furnitureid);
															//showEditForm(pointFeature,furnitureLayerData[i].attributes.furnitureid);
															furnitureFound=furnitureLayerData[i].attributes.furnitureid
															break;
															
														}
															
													}
													
													}

													if(furnitureFound!=null){
														showEditForm(pointFeature,furnitureFound);
													
													}
													else{
														showEditForm(pointFeature);
													}												
													
												}
												else{													
													jAlert("You have selected incorrect path", "Issue");
													g_wfs.removeAllFeatures(true);
												}
											}
											else{
												//jAlert("No Path found on this location", "Issue");
												jAlert( $._('no_path_found'), $._('create_issue'));
												$('#popup_ok').attr("value", $._('popupOk'));
												g_wfs.removeAllFeatures(true);
												
											}
    		                            	
    		                            }
    		                            
										
    		                            //for complaint
    		                            else if($("#edit_layer").text()=='Issue' && parentlryName=='Complaint_Layer'){
    		                            	var compalintFound=0;
    		                            	var compalintLyr=map.getLayersByName('Complaint_Layer')[0];
    		                            	var compalintSelect = new Selection(pointFeature, compalintLyr);
    		                            	var compalintFilter = compalintSelect.creationSelectionCriteria(this);
    		                            	var compalintLayerData = compalintSelect.getResult(compalintFilter, false);
											if(compalintLayerData.length>0){
												compalintFound=0;
												for(i=0;i<compalintLayerData.length;i++){
														if(compalintLayerData[i].attributes.gid==g_createIssue_gid){
															compalintFound++;
															//alert('correct compalint');
															//showEditForm(pointFeature);
															//return false;
															
														}
														
												}
												
												if(compalintFound>0){
													var furnitureFound=0;
													var furnitureLyr=map.getLayersByName('Furniture')[0];
													var furnitureSelect = new Selection(pointFeature, furnitureLyr);
													var furnitureFilter = furnitureSelect.creationSelectionCriteria(this);
													var furnitureLayerData = furnitureSelect.getResult(furnitureFilter, false);
																										
													showEditForm(pointFeature);
												}
												else{
													
													jAlert("You have selected incorrect Complaint", "Issue");
													g_wfs.removeAllFeatures(true);
												}
											}
											else{
												
												jAlert("No complaint found on this location", "Issue");
												g_wfs.removeAllFeatures(true);
												
												
											}
    		                            	
    		                            }
    		                            else if($("#edit_layer").text()=='Issue' && parentlryName=='Furniture'){
    		                            	var pathFoundId=null;
											var furnitureFound=0;
    		                            	var furnitureFoundId=null;
											var furnitureLyr=map.getLayersByName('Furniture')[0];
											var furnitureSelect = new Selection(pointFeature, furnitureLyr);
											var furnitureFilter = furnitureSelect.creationSelectionCriteria(this);
											var furnitureLayerData = furnitureSelect.getResult(furnitureFilter, false);
											if(furnitureLayerData.length>0){
												//furnitureFound=0;
												for(i=0;i<furnitureLayerData.length;i++){
														if(furnitureLayerData[i].attributes.gid==g_createIssue_gid){
															//furnitureFound++;
															furnitureFoundId=furnitureLayerData[i].attributes.furnitureid;
															pathFoundId=furnitureLayerData[i].attributes.row_id;
															
															break;
															
														}
														
												}
												
												if(furnitureFoundId!=null){
													//furnitureLayerData[0].attributes.row_id
													
													showEditForm(pointFeature,furnitureFoundId,pathFoundId);
													
													/*var pathFound=0;
													var pathFoundId=null;
													var pathLyr=map.getLayersByName('RoW_Path')[0];
													var pathSelect = new Selection(pointFeature, pathLyr);
													var pathFilter = pathSelect.creationSelectionCriteria(this);
													var pathLayerData = pathSelect.getResult(pathFilter, false);
													if(pathLayerData.length>0){
														pathFound=0;
														for(i=0;i<pathLayerData.length;i++){
																if(pathLayerData[i].attributes.row_id==g_createIssue_rowid){
																	//pathFound++;
																	
																	pathFoundId=g_createIssue_rowid;
																	break;
																}
																
														}
														
														if(pathFoundId!=null){
														
														showEditForm(pointFeature,furnitureFoundId,pathFoundId);
														}
													}
													
													else{
														
														var accesslandFound=0;
														var accesslandFoundId=null;
														var accesslandLyr=map.getLayersByName('Access_Land')[0];
														var accesslandSelect = new Selection(pointFeature, accesslandLyr);
														var accesslandFilter = accesslandSelect.creationSelectionCriteria(this);
														var accesslandLayerData = accesslandSelect.getResult(accesslandFilter, false);
														if(accesslandLayerData.length>0){
															accesslandFound=0;
															for(i=0;i<accesslandLayerData.length;i++){
																	if(accesslandLayerData[i].attributes.row_id==g_createIssue_rowid){
																		
																		
																		accesslandFoundId=g_createIssue_rowid;
																		break;
																	}
																	
															}
															
															if(accesslandFoundId!=null){
															
																showEditForm(pointFeature,furnitureFoundId,accesslandFoundId);
															}
														}
													}
													if(pathFoundId==null && accesslandFoundId==null){
														
														jAlert("No Path or Access Land found for this  Furniture", "Issue");
														g_wfs.removeAllFeatures(true);
														
													}*/
													
													
												}
												else{
													
													jAlert("You have selected wrong Furniture", "Issue");
													g_wfs.removeAllFeatures(true);
												}
												
												
												
											}
											
											else{
												
												
												jAlert("No Furniture found on this location", "Issue");
												g_wfs.removeAllFeatures(true);
											}
    		                            	
    		                            }
    		                            else if($("#edit_layer").text()=='Issue' && parentlryName=='Access_Land'){
    		                            	
    		                            	var accesslandFound=0;
											var accesslandFoundId=null;
											var accesslandLyr=map.getLayersByName('Access_Land')[0];
											var accesslandSelect = new Selection(pointFeature, accesslandLyr);
											var accesslandFilter = accesslandSelect.creationSelectionCriteria(this);
											var accesslandLayerData = accesslandSelect.getResult(accesslandFilter, false);
											if(accesslandLayerData.length>0){
												accesslandFound=0;
												for(i=0;i<accesslandLayerData.length;i++){
														if(accesslandLayerData[i].attributes.gid==g_createIssue_gid){
															
															
															accesslandFoundId=g_createIssue_rowid;
															break;
														}
														
												}
												
												if(accesslandFoundId!=null){
												
													showEditForm(pointFeature);
												}
												else{
													jAlert("You have selected wrong Access Land", "Issue");
													g_wfs.removeAllFeatures(true);
												}
											}
											else{
												//jAlert("No Access Land found on this location", "Issue");
												
												jAlert( $._('no_access_land_found'), $._('create_issue'));
												$('#popup_ok').attr("value", $._('popupOk'));
												g_wfs.removeAllFeatures(true);
											}
    		                            
    		                            	
    		                            }
    		                            
    		                            	else if($("#edit_layer").text()=='Furniture' && parentlryName=='Access_Land'){
    		                            	
    		                            	var accesslandFound=0;
											var accesslandFoundId=null;
											var accesslandLyr=map.getLayersByName('Access_Land')[0];
											var accesslandSelect = new Selection(pointFeature, accesslandLyr);
											var accesslandFilter = accesslandSelect.creationSelectionCriteria(this);
											var accesslandLayerData = accesslandSelect.getResult(accesslandFilter, false);
											if(accesslandLayerData.length>0){
												accesslandFound=0;
												for(i=0;i<accesslandLayerData.length;i++){
														if(accesslandLayerData[i].attributes.gid==g_createIssue_gid){
															
															
															accesslandFoundId=g_createIssue_rowid;
															break;
														}
														
												}
												
												if(accesslandFoundId!=null){
												
													//showEditForm(pointFeature);
													showEditForm(pointFeature,undefined,accesslandFoundId);
												}
												else{
													jAlert("You have selected wrong Access Land", "Create Furniture");
													g_wfs.removeAllFeatures(true);
												}
											}
											else{
												//jAlert("No Access Land found on this location", "Create Furniture");
												jAlert( $._('no_access_land_found'), $._('create_furniture'));
												$('#popup_ok').attr("value", $._('popupOk'));
												g_wfs.removeAllFeatures(true);
											}
    		                            }
    		                            
    		                            
    		                           else if($("#edit_layer").text()=='Furniture' && parentlryName==undefined){
        		                            	
        		                            	var community=0;
    											var communityId=null;
    											var communityLyr=map.getLayersByName('Community_Councils')[0];
    											var communitySelect = new Selection(pointFeature, communityLyr);
    											var communityFilter = communitySelect.creationSelectionCriteria(this);
    											var communityData = communitySelect.getResult(communityFilter, false);
    											if(communityData.length>0){
    												communityFound=0;
    												communityId = communityData[0].attributes.communityid + "_O";
    												if(communityId != null){
    													showEditForm(pointFeature, undefined, communityId);
    												}
    												else{
    													jAlert("No Community feature found on this location", "Create Furniture");
    													g_wfs.removeAllFeatures(true);
    												}
    											}
    											else{
    												jAlert("No Community feature found on this location", "Create Furniture");
    												g_wfs.removeAllFeatures(true);
    											}
        		                            }
    		                            
    		                            
    		                            	else if($("#edit_layer").text()=='Furniture' && parentlryName=='RoW_Path'){
        		                            	
    		                            		    		                            		
												var pathFound=0;
												var pathFoundId=null;
												var pathLyr=map.getLayersByName('RoW_Path')[0];
												var pathSelect = new Selection(pointFeature, pathLyr);
												var pathFilter = pathSelect.creationSelectionCriteria(this);
												var pathLayerData = pathSelect.getResult(pathFilter, false);
												if(pathLayerData.length>0){
													pathFound=0;
													for(i=0;i<pathLayerData.length;i++){
															if(pathLayerData[i].attributes.gid==g_createIssue_gid){
																//pathFound++;
																
																pathFoundId=g_createIssue_rowid;
																break;
															}
															
													}
    												
    												if(pathFoundId!=null){
    												
    													//showEditForm(pointFeature);
    													showEditForm(pointFeature,undefined,pathFoundId);
    												}
    												else{
    													jAlert("You have selected wrong Path", "Create Furniture");
    													g_wfs.removeAllFeatures(true);
    												}
    											}
    											else{
    												//jAlert("No Path found on this location", "Create Furniture");
    												jAlert( $._('no_path_found'), $._('create_furniture'));
    												$('#popup_ok').attr("value", $._('popupOk'));
    												g_wfs.removeAllFeatures(true);
    											}
        		                            	
        		                            	
        		                            	
        		                            	
        		                            	
        		                            }
    		                            
///////////////////////////////
										
										
    		                            else if($("#edit_layer").text()=='Issue' && parentlryName=='Surface'){
    		                            	var surfaceFound=0;
    		                            	var surfaceFoundId=null;
    		                            	var rowFoundId=null;
    		                            	var surfaceLyr=map.getLayersByName('Surface')[0];
    		                            	var surfaceSelect = new Selection(pointFeature, surfaceLyr);
    		                            	var surfaceFilter = surfaceSelect.creationSelectionCriteria(this);
    		                            	var surfaceLayerData = surfaceSelect.getResult(surfaceFilter, false);
											
    		                            	if(surfaceLayerData.length>0){
													surfaceFound=0;
													for(i=0;i<surfaceLayerData.length;i++){
															if(surfaceLayerData[i].attributes.gid==g_createIssue_gid){
																rowFoundId=surfaceLayerData[i].attributes.row_id;
																surfaceFoundId=surfaceLayerData[i].attributes.surface_id
																break;
															}
															
													}
												
												
												
												
													if(surfaceFoundId!=null){
														
														//showEditForm(pointFeature);
														showEditForm(pointFeature,undefined,rowFoundId,surfaceFoundId);
													}
													else{
														jAlert("You have selected wrong Surface", "Create Furniture");
														g_wfs.removeAllFeatures(true);
													}
												
													
												}
												else{													
													jAlert("You have selected incorrect Surface", "Issue");
													g_wfs.removeAllFeatures(true);
												}
											}
											
    		                            	
    		                            
										
										
										///////////////////////////////////
    		                            
    		                            else{
    		                            	
    		                            	showEditForm(pointFeature);
    		                            }
    		                        
    		                        }
    		                    }
    		           }),
		           line: new OpenLayers.Control.DrawFeature(
		        	        g_wfs, OpenLayers.Handler.Path, {
		        	        	displayClass:"olControlDefault",
		        	            callbacks: {
		        	                done: function (p) {
		        	                	var multiLine = new OpenLayers.Geometry.MultiLineString([p]);
		        	                    var lineFeature = new OpenLayers.Feature.Vector(multiLine);
		        	                    lineFeature.state = OpenLayers.State.INSERT;
		        	                    g_wfs.addFeatures([lineFeature]);
										//////////////////////////////////
										
										if($("#edit_layer").text()=='Surface' && parentlryName==undefined){
        		                            	
    		                            		    		                            		
												var pathFound=0;
												var pathFoundId=null;
												var pathLyr=map.getLayersByName('RoW_Path')[0];
												var pathSelect = new Selection(lineFeature, pathLyr);
												var pathFilter = pathSelect.creationSelectionCriteria(this);
												var pathLayerData = pathSelect.getResult(pathFilter, false);
												if(pathLayerData.length>0){
													//pathFoundId=pathLayerData[0].attributes.row_id;
													//showEditForm(lineFeature,undefined,pathFoundId);
													//ishistory
													pathFound=0;
													for(i=0;i<pathLayerData.length;i++){
															
															if(pathLayerData[i].attributes.ishistory=='false'){																
																pathFoundId=pathLayerData[i].attributes.row_id;
																break;
															}
															
													}
													
													showEditForm(lineFeature,undefined,pathFoundId);
    												/*
    												if(pathFoundId!=null){
    												
    													//showEditForm(pointFeature);
    													showEditForm(lineFeature,undefined,pathFoundId);
    												}
    												else{
    													jAlert("You have selected wrong Path", "Create Furniture");
    													g_wfs.removeAllFeatures(true);
    												}
													*/
													
													
    											}
    											else{
    												//jAlert("No Path found on this location", "Create Furniture");
    												jAlert( $._('no_path_found'), $._('create_furniture'));
    												$('#popup_ok').attr("value", $._('popupOk'));
    												g_wfs.removeAllFeatures(true);
    											}
        		                            	
        		                            	
        		                           }
											else if($("#edit_layer").text()=='Surface' && parentlryName=='RoW_Path'){
    		                            	
		                            		
											var pathFound=0;
											var pathFoundId=null;
											var pathLyr=map.getLayersByName('RoW_Path')[0];
											var pathSelect = new Selection(lineFeature, pathLyr);
											var pathFilter = pathSelect.creationSelectionCriteria(this);
											var pathLayerData = pathSelect.getResult(pathFilter, false);
											if(pathLayerData.length>0){
												//pathFoundId=pathLayerData[0].attributes.row_id;
												//showEditForm(lineFeature,undefined,pathFoundId);
												//ishistory
												pathFound=0;
												for(i=0;i<pathLayerData.length;i++){
														
													if(pathLayerData[i].attributes.gid==g_createIssue_gid){
														//pathFound++;
														
														pathFoundId=pathLayerData[i].attributes.row_id;
														break;
													}	
													
													/*if(pathLayerData[i].attributes.ishistory=='false'){																
															pathFoundId=pathLayerData[i].attributes.row_id;
															break;
														}*/
														
												}
												
												//showEditForm(lineFeature,undefined,pathFoundId);
												
												if(pathFoundId!=null){
												
													//showEditForm(pointFeature);
													showEditForm(lineFeature,undefined,pathFoundId);
												}
												else{
													jAlert("You have selected wrong Path", "Create Surface");
													g_wfs.removeAllFeatures(true);
												}
												
												
												
											}
											else{
												//jAlert("No Path found on this location", "Create Furniture");
												jAlert( $._('no_path_found'), $._('create_surface'));
												$('#popup_ok').attr("value", $._('popupOk'));
												g_wfs.removeAllFeatures(true);
											}
    		                            	
    		                            	
    		                            }
										
											
    		                            
    		                            else{
    		                            	
    		                            	showEditForm(lineFeature);
    		                            }
										
										///////////////////////////////////
										//showEditForm(lineFeature);
		        	                }
		        	            }
		        	        }),
        	        polygon: new OpenLayers.Control.DrawFeature(
        	                g_wfs, OpenLayers.Handler.Polygon, {
        	                	displayClass:"olControlDefault",
        	                    callbacks: {
        	                        done: function (p) {
        	                        	var multipolygon = new OpenLayers.Geometry.MultiPolygon([p]);
        	                            var polyFeature = new OpenLayers.Feature.Vector(multipolygon);
        	                            polyFeature.state = OpenLayers.State.INSERT;
        	                            g_wfs.addFeatures([polyFeature]);
										showEditForm(polyFeature);
        	                        }
        	                    }
        	                })
                };
            
            for (var key in editControls) {
                map.addControl(editControls[key]);
            }
            
            if(layerType == 'Polygon'){
            	editControls["deleteFeature"].selectStyle = deleteSelectionSymbolizers.Polygon;
            }else if(layerType == 'Point'){
            	editControls["deleteFeature"].selectStyle = deleteSelectionSymbolizers.Point;
            }else if(layerType == 'LineString'){
            	editControls["deleteFeature"].selectStyle = deleteSelectionSymbolizers.Line;
            }

            saveStrategy.events.register('success', null, onSave);
            editControls["selectionBox"].events.register("featuresselected", this, selectFeature);
            editControls["importFeature"].events.register("featureselected", this, onFeatureImport);
            //editControls["editAttribute"].events.register("featureselected", this, onFeatureSelect)
           /* drawControls["select"].events.register("clickout", this, function (e) {
                wfs.removeAllFeatures(true);
            });*/
    }
	
	$('#edit_tolerance').spinner().change(function () {
		editControls["selectionBox"].clickTolerance= $('#edit_tolerance').val();
	});
	
	$('#max_features').spinner().change(function () {		
		editControls["selectionBox"].maxFeatures= $('#max_features').val();
	});
	
	
	$('#edit_tolerance_two').spinner().change(function () {
		//snap.targets[0].tolerance= $('#edit_tolerance_two').val();
		//target[type + "Tolerance"] = Number($('#edit_tolerance_two').val()) || 0; 
		var types = ["node", "vertex", "edge"];
		var target,type;	
		for(var i=0; i<snap.targets.length; ++i) {
			target = snap.targets[i];
			for(var j=0; j<types.length; ++j) {
				type = types[j];			
				target[type + "Tolerance"] = Number($('#edit_tolerance_two').val()) || 0; 
			}
		}
	});
	
	var esc_hndl_edit_poly = new OpenLayers.Handler.Keyboard(editControls['polygon'], {
        keydown: handleKeypress_edit
    });
	esc_hndl_edit_poly.activate();
    
    var esc_hndl_edit_line = new OpenLayers.Handler.Keyboard(editControls['line'], {
    	keydown: handleKeypress_edit
    });
    esc_hndl_edit_line.activate();
}

function onFeatureImport(e) {
    var feats = [];
    var bFeatureExists = false;
    
    hideEditForm();
    selectedFeature = e.feature;
    delete selectedFeature.attributes['gid'];
    delete selectedFeature.data['gid'];
    if(e.feature.geometry.id.indexOf(layerType)>0)
	{
		showEditForm(selectedFeature);
		$("#options2-s-d").show('fast');
		selectedFeature.state = "_blank";
		g_wfs.addFeatures([selectedFeature]);
		selectedFeature.state = OpenLayers.State.INSERT;
	}
	else{		
		jAlert('selected feature is not '+ layerType + 'type', 'Import Error');
	}
}

//On selecting feature to display attribute
function onFeatureSelect(feature){
	selectedFeature = feature;
	showEditForm(selectedFeature);
	 $("#options2-s-d").show('fast');
	 selectedFeature.state = OpenLayers.State.UPDATE;
	 featureState = "modify";
}

function selectFeature(e){
	var mode=$('#selectionMode').val();
	if(mode=='single'){
		if(g_wfs != undefined){
			g_wfs.removeAllFeatures();
		}
		if(wfs_del != undefined){
			wfs_del.removeAllFeatures();
		}
	
	}
	
	var selectedFeatures = e.features;
	 $.ajax({
        url: STUDIO_URL + 'layer/' + objLayer.name + "?" + token,
        success: function (data) {
            var lyrDetails = data;
            var uniqueField = lyrDetails.keyField;
			 for(var i=0; i<selectedFeatures.length; i++){
				 delete selectedFeatures[i].attributes[uniqueField];
				 if(selectedFeatures[i].attributes['ishistory'] != undefined && 
						 selectedFeatures[i].attributes['ishistory'] == "false"){
				 	g_wfs.addFeatures(selectedFeatures[i]);
				 }else if(selectedFeatures[i].attributes['ishistory'] == undefined){
					 g_wfs.addFeatures(selectedFeatures[i]);
				 }
			 }
		 }
	 });
}

_toggleEditControl = function(element) {
	
	for (key in editControls) {
		var control = editControls[key];
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

function modifyMode(mode) {
    if (editControls != null) {
    	featureState = "modify";
        switch (mode) {
            case "move":
            	editControls.modify.mode = OpenLayers.Control.ModifyFeature.DRAG;
                break;
            case "resize":
            	editControls.modify.mode = OpenLayers.Control.ModifyFeature.RESIZE;
                break;
            case "rotate":
            	editControls.modify.mode = OpenLayers.Control.ModifyFeature.ROTATE;
                break;
            case "reshape":
            	editControls.modify.mode = OpenLayers.Control.ModifyFeature.RESHAPE;
                break;
            default:
            	editControls.modify.mode = OpenLayers.Control.ModifyFeature.RESHAPE;
                break;
        }
    }
}

function onFeatureModification(feature){
	if($("#edit_layer").text()=='Access_Land'){
		$("#area").val((feature.feature.geometry.getArea()/1000000).toFixed(2));
	}
	else if($("#edit_layer").text()=='RoW_Path'){
		$("#lengthKm").val((feature.feature.geometry.getLength()/1000).toFixed(2));
	}
}

function onFeatureSelection(feature){
    selectedFeature = feature;
    
    jConfirm($._('confirm_delete_feature'), $._('alert_confirm_title'), function (response) {
    
    	if (response == true) {
        selectedFeature.state = "Insert";
        //wfs_del.addFeatures([selectedFeature]);
        feature.state = OpenLayers.State.DELETE;

	    } else {
	    	editControls["deleteFeature"].unselect(feature);
	    }
    });
    $('#popup_ok').attr("value", $._('popupOk'));
	$('#popup_cancel').attr("value", $._('_cancel'));
}

function saveEdit() {
    //if(validForm){
	if(validForm || $('#edit_content').is(':empty')){
	saveStrategy.save();    
    wfs_del.removeAllFeatures(true); 
    g_wfs.removeAllFeatures(true);
    undoredo.resetEditIndex();
	validForm=false;
	}
	else{
	jAlert("Please Enter the attributes and click Apply button");
	}
	
}

function onSave(event){
	objLayer.redraw(true);
	$('#edit_content').empty();
	
	//for issueid updation
	var insertId=event.response.insertIds[0];
	var fid = insertId.substr(insertId.indexOf('.')+1);
	//alert(fid);
	if($("#edit_layer").text()=='Issue' && parentlryName=='Complaint_Layer'){
		updateComplaintIssueId(g_createIssue_rowid,fid);
		//jAlert("Issue <strong>" + fid + "</strong> successfully created for complaint");
		
		//jAlert( $._('Issue') + '<strong>' + fid+'</strong>' $._('successfully_created_for')+' '+$._('Complaint_Layer'), $._('alert'));
		jAlert( $._('Issue') + ' <strong> ' + fid+' </strong> ' +$._('successfully_created_for')+' '+$._('Complaint_Layer'), $._('alert'));
		$('#popup_ok').attr("value", $._('popupOk'));
	}
	else if($("#edit_layer").text()=='Issue' && parentlryName=='RoW_Path'){
		if(fid>null){
			updateRowPathIssueCount(fid);			
		}
		if(fid>0){
			
			if(lang == 'cy'){
				jAlert( $._('Issue') + ' rhif <strong> ' + fid+' </strong> ' +$._('successfully_created_for')+' '+$._('RoW_Path_Edit'), $._('alert'));
			}else{
				jAlert( $._('Issue') + ' <strong> ' + fid+' </strong> ' +$._('successfully_created_for')+' path', $._('alert'));
			}
			$('#popup_ok').attr("value", $._('popupOk'));
		}
		else{
			jAlert("Issue successfully updated");
		}
		showIssueList('Open');
		
	}
	else if($("#edit_layer").text()=='Issue' && parentlryName=='Access_Land'){
		//alert(g_createIssue_gid+'-'+fid);
		//updateUnresovledStatus(parentlryName,g_createIssue_gid,true);
		
		if(fid>0){
			updateUnresovledStatus(parentlryName,g_createIssue_gid,true);
			if(lang == 'cy'){
				jAlert( $._('Issue') + ' rhif <strong> ' + fid+' </strong> ' +$._('Issue_successfully_created_for_AL')+' '+$._('Access_Land'), $._('alert'));
			}else{
				jAlert( $._('Issue') + ' <strong> ' + fid+' </strong> ' +$._('successfully_created_for')+' '+$._('Access_Land'), $._('alert'));
			}
			$('#popup_ok').attr("value", $._('popupOk'));
		}	
		else{
			jAlert("Issue successfully updated");
		}
		showIssueList('Open');
	}
	else if($("#edit_layer").text()=='Issue' && parentlryName=='Furniture'){
		
		if(fid>0){			
			updateUnresovledStatus(parentlryName,g_createIssue_gid,true);
			//jAlert("Issue <strong>"+ fid +" </strong> successfully created for furniture");
			jAlert( $._('Issue') + ' <strong> ' + fid+' </strong> ' +$._('successfully_created_for')+' '+$._('Furniture'), $._('alert'));
			$('#popup_ok').attr("value", $._('popupOk'));
		}
		else{
			jAlert("Issue successfully updated");
		}
		showIssueList('Open');
	}
	else if($("#edit_layer").text()=='Surface' && parentlryName=='RoW_Path'){
		
		if(fid>0){			
			if(lang == 'cy'){
				jAlert( $._('Surface') + ' Rhif <strong> ' + fid+' </strong> ' +$._('successfully_created_for')+' '+$._('RoW_Path_Edit'), $._('alert'));
			}else{
				jAlert( $._('Surface') + ' <strong> ' + fid+' </strong> ' +$._('successfully_created_for')+' path', $._('alert'));
			}
			$('#popup_ok').attr("value", $._('popupOk'));
		}
		else{
			jAlert("Surface successfully updated");
		}
	}
	
	else if($("#edit_layer").text()=='Furniture' && parentlryName=='RoW_Path'){
		
		if(fid>0){			
			//jAlert("Furniture <strong>"+ fid +" </strong> successfully created for path");
			if(lang == 'cy'){
				jAlert( $._('Furniture') + ' Rhif <strong> ' + fid+' </strong> ' +$._('successfully_created_for')+' '+$._('RoW_Path_Edit'), $._('alert'));
			}else{
				jAlert( $._('Furniture') + ' <strong> ' + fid+' </strong> ' +$._('successfully_created_for')+' path', $._('alert'));
			}
			$('#popup_ok').attr("value", $._('popupOk'));
		}
		else{
			jAlert("Furniture successfully updated");
		}
	}
	else if($("#edit_layer").text()=='Issue' && parentlryName=='Surface'){
		
		if(fid>0){			
			
			updateUnresovledStatus(parentlryName,g_createIssue_gid,true);
			
			//jAlert("Issue <strong>"+ fid +" </strong> successfully created for Surface");
			jAlert( $._('Issue') + ' <strong> ' + fid+' </strong> ' +$._('successfully_created_for')+' '+$._('Surface'), $._('alert'));
			$('#popup_ok').attr("value", $._('popupOk'));
		}
		else{
			jAlert("Issue successfully updated");
		}
		showIssueList('Open');
	}
	
}

SpatialVue.Editing.prototype.Unregister = function () {
    saveStrategy.deactivate();
    
    if(undoredo != null)
        undoredo.resetEditIndex();

    if(g_wfs != undefined){
	    g_wfs.events.un({
	        "beforefeaturemodified": showEditForm
	    });
	    deactivateControls();

	    g_wfs.removeAllFeatures(true);
	    wfs_del.removeAllFeatures(true);

	    map.removeLayer(g_wfs);
	    map.removeLayer(wfs_del);

    }

   
    saveStrategy.destroy();
    saveStrategy = null;
}

function deactivateControls() {   
    for (key in editControls) {
            var control = editControls[key];            
            control.deactivate();
    }
}

function hideEditForm(){
	$('#edit_content').empty();
	$("#editApply").hide();
}

function showEditForm(feature,issue_furnitureid,issue_rowid,_surfaceId) {
	var selected_layer=$("#edit_layer").text();	
	
	if(selected_layer=='Access_Land'){
	
		isediting=true;
		_geomFeature=feature;
		var _gid=null;
		if (feature.data) {	
		_gid=feature.data.gid;	
		}
		else if (feature.feature.data){
			_gid=feature.feature.data.gid;
			
		}
		
		
		var accesslandTypes=null;
		var currentdata=null;
		jQuery.ajax({
		async:false,
		type: "GET",              
		 url: STUDIO_URL + "accessland/type",        		               
		 success: function (data) {
			 accesslandTypes=data
			
		 }
		});
					
					
		
		if(_gid){
			savetype='EDIT';
		jQuery.get('resources/templates/viewer/accessLandinfo.html', function(template) {
		
		$("body").append(template);    

			
		jQuery.ajax({
			   async:false,
				type: "GET",              
				url: STUDIO_URL + "accessland/"+_gid,        		               
				success: function (data) {
					data.agreementDate = convertDateToEuropeanFormat(data.agreementDate);
		        	data.agreementEndDate = convertDateToEuropeanFormat(data.agreementEndDate);
					currentdata=data;	        	
					
					jQuery("#edit_content").empty();
				 
					jQuery("#accessLandInfo_DetailsTmpl").tmpl(data).appendTo("#edit_content");
					
					$("#_row_id").attr("disabled", true);
					//$("#area").attr("disabled", true);
					$("#unresolved_status").attr("disabled", true);
					
					//$("#accessLandInfoTable :input").attr("disabled", true);
					jQuery("#type").empty();
					jQuery.each(accesslandTypes, function (i, accesslandType) {    	
					jQuery("#type").append(jQuery("<option></option>").attr("value", accesslandType.typeid).text(
							(lang=='en')?accesslandType.type:accesslandType.math));
					});	        	
					jQuery("#unresolved_status").empty();
					jQuery("#unresolved_status").append(jQuery("<option></option>")
			        		.attr("value", "false").text((lang=='en')?"No":"Na"));

			        jQuery("#unresolved_status").append(jQuery("<option></option>")
			        		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));
					
						jQuery('#type').val(currentdata.accessLandTypeLkp.typeid);
						jQuery('#unresolved_status').val(currentdata.unresolvedStatus.toString());
						$(function() {
							$("#agreement_date").datepicker({ dateFormat: 'dd/mm/yy',
								changeMonth: true,
								changeYear: true
				            }).attr('readonly','readonly');
						});
						$(function() {
							$("#agreement_end_date").datepicker({ dateFormat: 'dd/mm/yy',
								changeMonth: true,
								changeYear: true
				            }).attr('readonly','readonly');
						});
						//$("#accessLandInfoTable :input").attr("disabled", true);
						$("#btnUpdateAccessLand").hide();				
						$("#btnCancelAccessLand").hide();
						$("#btnSaveAccessLand").show();
						$('#btnSaveAccessLand input').attr('value', 'Apply');
						$(".nxtPrevBTNHolder").hide();
						$(".footerBtns").hide();
						
					}
				});
			accessLandLabelTranslations();
		});	
			
		}	//if//
		else{
			savetype='NEW';
			jQuery.get('resources/templates/viewer/accessLandinfo.html', function(template) {
		
			$("body").append(template);  
			jQuery("#edit_content").empty();
				 
					jQuery("#accessLandInfo_DetailsTmpl").tmpl().appendTo("#edit_content");
					
					$("#area").val((feature.geometry.getArea()/1000000).toFixed(2));
					//$("#area").attr("disabled", true);
					$("#unresolved_status").attr("disabled", true);
					
					jQuery("#type").empty();
					jQuery.each(accesslandTypes, function (i, accesslandType) {    	
					jQuery("#type").append(jQuery("<option></option>").attr("value", accesslandType.typeid).text(
							(lang=='en')?accesslandType.type:accesslandType.math));
					});	        	
					
					jQuery("#unresolved_status").empty();
					jQuery("#unresolved_status").append(jQuery("<option></option>")
			        		.attr("value", "false").text((lang=='en')?"No":"Na"));

			        jQuery("#unresolved_status").append(jQuery("<option></option>")
			        		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));
						$(function() {
							$("#agreement_date").datepicker({ dateFormat: 'dd/mm/yy',
								changeMonth: true,
								changeYear: true
				            }).attr('readonly','readonly');
						});
						$(function() {
							$("#agreement_end_date").datepicker({ dateFormat: 'dd/mm/yy',
								changeMonth: true,
								changeYear: true
				            }).attr('readonly','readonly');
						});
						jQuery('#notes').val("");
						$("#btnUpdateAccessLand").hide();				
						$("#btnCancelAccessLand").hide();
						$("#btnSaveAccessLand").show();
						$('#btnSaveAccessLand input').attr('value', 'Apply');
						$(".nxtPrevBTNHolder").hide();
						$(".footerBtns").hide();
						accessLandLabelTranslations();
			});
		}
		
		
		$("#options2-s-d").show('fast');				
		//$("#btnSaveAccessLand").click(function(){ 		
				
		//		applyChanges();
		//		saveGeom();
		//});
		
	}//if
	else if(selected_layer=='RoW_Path'){
		//alert('load RoW_Path edit form');
		//------------Start of row_path----
		isediting=true;
		_geomFeature=feature;
		var _gid=null;
		if (feature.data) {	
		_gid=feature.data.gid;	
		}
		else if (feature.feature.data){
			_gid=feature.feature.data.gid;
			
		}
		
		var _pathtype=null;
		var _pathlegalstatus=null;
		var _pathwarden_area=null;
		var _pathclassLkp=null;
		var _pathdeptLkp=null;
		var _pathcommunitylist=null;
		var _pathcondition=null;
		var currentRowPath=null;
		var patheSurveyor =null;
		
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
  
   
   
   if(_gid){
		savetype='EDIT';
		jQuery.get('resources/templates/viewer/rowinfo.html', function(template) {
	
	$("body").append(template);    

		
	jQuery.ajax({
		   async:false,
			type: "GET",              
			url: STUDIO_URL + "rowpath/"+_gid,        		               
			success: function (data) {
				data.agreementEndDate = convertDateToEuropeanFormat(data.agreementEndDate);
	        	data.dateofnextsurvey = convertDateToEuropeanFormat(data.dateofnextsurvey);
	        	data.lastsurvey = convertDateToEuropeanFormat(data.lastsurvey);
				currentRowPath=data;	        
				path_contacts=data.contacts;
				jQuery("#edit_content").empty();
			 
				jQuery("#RowInfo_MasterDetailsTmpl_line").tmpl(currentRowPath).appendTo("#edit_content");
				
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
	    	
	    	/*$(function() {
		        $("#lastsurvey").datepicker({ dateFormat: 'yy-mm-dd'
		        	});
			});*/
	    	
	    	
	    	 
			 //adding data on drop down
	    	jQuery("#pathtype").empty();
	    	jQuery("#pathtype").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
	    	 jQuery.each(_pathtype, function (i, _pathtypes) {    	
	 			jQuery("#pathtype").append(jQuery("<option></option>").attr("value", _pathtypes.pathTypeId).text(      
	 			(lang=='en')?_pathtypes.type:_pathtypes.math));
			 });
	    	 
	    	 jQuery("#path_Community").empty();
	    		//jQuery("#path_Community").append(jQuery("<option></option>").attr("value", "").text("Please Select"));
				jQuery("#path_Community").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
			 	jQuery.each(_pathcommunitylist, function (i, _pathcommunitylists) {    	
	  			jQuery("#path_Community").append(jQuery("<option></option>").attr("value", _pathcommunitylists.name).text(_pathcommunitylists.name));        
	 		 });
	     	
	    	 jQuery("#path_classLkp").empty();
	    	 //jQuery("#path_classLkp").append(jQuery("<option></option>").attr("value", "").text("Please Select"));
			 
			jQuery("#path_classLkp").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));	
			 jQuery.each(_pathclassLkp, function (i, _pathclassLkpc) {    	
	    			//jQuery("#path_classLkp").append(jQuery("<option></option>").attr("value", _pathclassLkpc.id).text(_pathclassLkpc.priority));        
					jQuery("#path_classLkp").append(jQuery("<option></option>").attr("value", _pathclassLkpc.id)
					.text((lang=="en")?_pathclassLkpc.priority:_pathclassLkpc.priority.replace("Priority","Blaenoriaeth"))); 
			 });
			 
			 jQuery("#wardenArea").empty();
			 jQuery("#wardenArea").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
			  jQuery.each(_pathwarden_area, function (i, _pathwarden_areas) {    	
	    			jQuery("#wardenArea").append(jQuery("<option></option>").attr("value", _pathwarden_areas.wardenArea).text(_pathwarden_areas.wardenArea));        
			 });
			  
			 jQuery("#responsibleDepartmentLkp").empty();
			 jQuery("#responsibleDepartmentLkp").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
			  jQuery.each(_pathdeptLkp, function (i, _pathdeptLkps) {    	
	  			jQuery("#responsibleDepartmentLkp").append(jQuery("<option></option>").attr("value", _pathdeptLkps.departmentid).text(
	  					(lang=='en')?_pathdeptLkps.department:_pathdeptLkps.adran)); 
			 });
			  
			  jQuery.each(_pathcondition, function (i, _pathconditions) {    	
		  			jQuery("#pathConditionLkp").append(jQuery("<option></option>").attr("value", _pathconditions.conditionid).text(
		  					(lang=='en')?_pathconditions.condition:_pathconditions.cyflwr));
			  });
			  	
			  jQuery("#pathLegalstatus").empty();
			  //jQuery("#pathLegalstatus").append(jQuery("<option></option>").attr("value", "").text("Please Select"));
			 jQuery("#pathLegalstatus").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
			 jQuery.each(_pathlegalstatus, function (i, _pathlegalstatuss) {    	
	    			jQuery("#pathLegalstatus").append(jQuery("<option></option>").attr("value", _pathlegalstatuss.legalstatusid).text(
	    					(lang=='en')?_pathlegalstatuss.status:_pathlegalstatuss.statws));
			 });
			 
			 jQuery("#surveyedBy").empty();
			  //jQuery("#surveyedBy").append(jQuery("<option></option>").attr("value", "").text("Please Select"));			  
			  jQuery("#surveyedBy").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
			  jQuery.each(patheSurveyor, function (i, patheSurveyors) {    	
					jQuery("#surveyedBy").append(jQuery("<option></option>").attr("value", patheSurveyors.email).text(patheSurveyors.name));        
				});
			  
			  jQuery("#assignedTo").empty();
			  //jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", "").text("Please Select"));
			  jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
			  jQuery.each(patheSurveyor, function (i, patheSurveyors) {    	
					jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", patheSurveyors.email).text(patheSurveyors.name));        
				});
			jQuery("#path_promotedRoute").empty(); 
		  jQuery("#path_promotedRoute").append(jQuery("<option></option>")
        		.attr("value", "false").text((lang=='en')?"No":"Na"));

        jQuery("#path_promotedRoute").append(jQuery("<option></option>")
        		.attr("value", "true").text((lang=='en')?"Yes":"Ydi"));
			
			   //set DD value
		  if(currentRowPath.pathTypeLkp!=null )
		  jQuery('#pathtype').val(currentRowPath.pathTypeLkp.pathTypeId);
		  
		  jQuery("#wardenArea").val(currentRowPath.wardenarea);
		  jQuery("#path_Community").val(currentRowPath.community);
		  
		  if(currentRowPath.classLkp!=null )
          jQuery("#path_classLkp").val(currentRowPath.classLkp.id);
		  
		  if(currentRowPath.responsibleDepartmentLkp!=null)
          jQuery("#responsibleDepartmentLkp").val(currentRowPath.responsibleDepartmentLkp.departmentid);
		  
		  if(currentRowPath.pathConditionLkp!=null )
          jQuery("#pathConditionLkp").val(currentRowPath.pathConditionLkp.conditionid);
		  
          if(currentRowPath.pathLegalstatusLkp!=null )
          jQuery("#pathLegalstatus").val(currentRowPath.pathLegalstatusLkp.legalstatusid);
					  
			  if(currentRowPath.pathLegalstatusLkp!= null )
	          jQuery("#pathLegalstatus").val(currentRowPath.pathLegalstatusLkp.legalstatusid);
			  
			  if(currentRowPath!=null)
	              jQuery("#assignedTo").val(currentRowPath.assignedTo);
	          if(currentRowPath!=null)
	              jQuery("#surveyedBy").val(currentRowPath.surveyedBy);
	          $("#path_promotedRoute").val(currentRowPath.promotedRoute);
	          
	          //for calculating next survey date
	          $(function() {
			        $("#lastsurvey").datepicker({ dateFormat: 'dd/mm/yy',
			        	
			        	 onSelect: function(dateStr) {
			        		 if( $('#path_classLkp').val()!=''){
			        			// var lastsurvey = dateStr;//parseInt($('#lastsurvey').val());
			        			// var priority=$('#path_classLkp').val();
				        	     //   var nextsurvey=getNextsurveyDate(lastsurvey,priority,'PRoW')
				        	        //var depart = $.datepicker.parseDate('yy-mm-dd', nextsurvey);
				        	     //   $('#dateofnextsurvey').val(nextsurvey); 
			        			 populateRowPathNextsurveyDate();
			        		 }
			        	       
			        	     },
			 				changeMonth: true,
							changeYear: true
			            }).attr('readonly','readonly');
			        
				});
		    						
				 $("#path_classLkp").change(function(){
					if( $('#lastsurvey').val()!=''){
						populateRowPathNextsurveyDate();
	        			// var lastsurveyDate = $('#lastsurvey').val();
	        			// var priority=$('#path_classLkp').val();
		        	       // var nextsurvey=getNextsurveyDate(lastsurveyDate,priority,'PRoW')
		        	       // var depart = $.datepicker.parseDate('yy-mm-dd', nextsurvey);
		        	        //$('#dateofnextsurvey').val(nextsurvey); 
	        		 }
				 });
				 //calculting length
				 var outlength=null;
				 if (feature.geometry) {	
					outlength=(feature.geometry.getLength()/1000).toFixed(2);
				 }
				 else if (feature.feature.geometry){
					outlength=(feature.feature.geometry.getLength()/1000).toFixed(2);
				 }
				 $("#lengthKm").val(outlength);

	          
			$("#btnUpdateRoW_line").hide();
			$("#btnCancelRoW_line").hide();
			$("#pathlinkDiv").hide();
			$("#btnSaveRoW_line").show();
			$('#btnSaveRoW_line input').attr('value', 'Apply');
			$("#dateofnextsurvey").attr("disabled", true);
			$("#unresolvedIssues").attr("disabled", true);
			$("#pathConditionLkp").attr("disabled", true);
			//$("#lengthKm").attr("disabled", true);
			$("#path_rowId").attr("disabled", true);
			$(".nxtPrevBTNHolder").hide();
			$(".footerBtns").hide();
			translateRowInfoLabels();
			$('#btnPathSave').attr("value", $._('Apply'));
			}
		});
	
	});	
		
	}	//if//
	else{
		savetype='NEW';
		jQuery.get('resources/templates/viewer/rowinfo.html', function(template) {
	
		$("body").append(template);  
		jQuery("#edit_content").empty();
			 
				
				jQuery("#RowInfo_MasterDetailsTmpl_line").tmpl().appendTo("#edit_content");
				
		    	
		    	 
				 //adding data on drop down
				 jQuery("#pathtype").empty();
				 jQuery("#pathtype").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
		    	 jQuery.each(_pathtype, function (i, _pathtypes) {    	
		 			jQuery("#pathtype").append(jQuery("<option></option>").attr("value", _pathtypes.pathTypeId).text(
		 					(lang=='en')?_pathtypes.type:_pathtypes.math));
				 });
		    	 jQuery("#path_Community").empty();
				 jQuery("#path_Community").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
		    	 jQuery.each(_pathcommunitylist, function (i, _pathcommunitylists) {    	
		  			jQuery("#path_Community").append(jQuery("<option></option>").attr("value", _pathcommunitylists.name).text(_pathcommunitylists.name));        
		 		 });
		     	
		    	  jQuery("#path_classLkp").empty(); 
				 jQuery("#path_classLkp").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));	
				 jQuery.each(_pathclassLkp, function (i, _pathclassLkpc) {    	
		    			//jQuery("#path_classLkp").append(jQuery("<option></option>").attr("value", _pathclassLkpc.id).text(_pathclassLkpc.priority));        
						jQuery("#path_classLkp").append(jQuery("<option></option>").attr("value", _pathclassLkpc.id)
					.text((lang=="en")?_pathclassLkpc.priority:_pathclassLkpc.priority.replace("Priority","Blaenoriaeth"))); 		
				 });
				 
				 jQuery("#wardenArea").empty();
				 jQuery("#wardenArea").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
				  jQuery.each(_pathwarden_area, function (i, _pathwarden_areas) {    	
		    			jQuery("#wardenArea").append(jQuery("<option></option>").attr("value", _pathwarden_areas.wardenArea).text(_pathwarden_areas.wardenArea));        
				 });
				  
				  jQuery("#responsibleDepartmentLkp").empty();
				 jQuery("#responsibleDepartmentLkp").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
				  jQuery.each(_pathdeptLkp, function (i, _pathdeptLkps) {    	
		  			jQuery("#responsibleDepartmentLkp").append(jQuery("<option></option>").attr("value", _pathdeptLkps.departmentid).text(
		  					(lang=='en')?_pathdeptLkps.department:_pathdeptLkps.adran)); 
				 });
				  
				  jQuery.each(_pathcondition, function (i, _pathconditions) {    	
			  			jQuery("#pathConditionLkp").append(jQuery("<option></option>").attr("value", _pathconditions.conditionid).text(
			  					(lang=='en')?_pathconditions.condition:_pathconditions.cyflwr));
				  });

				 jQuery("#pathLegalstatus").empty();
				 jQuery("#pathLegalstatus").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
				  jQuery.each(_pathlegalstatus, function (i, _pathlegalstatuss) {    	
		    			jQuery("#pathLegalstatus").append(jQuery("<option></option>").attr("value", _pathlegalstatuss.legalstatusid).text(
		    					(lang=='en')?_pathlegalstatuss.status:_pathlegalstatuss.statws));
				 });
				 
				 jQuery("#surveyedBy").empty();
				 jQuery("#surveyedBy").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
				 jQuery.each(patheSurveyor, function (i, patheSurveyors) {    	
						jQuery("#surveyedBy").append(jQuery("<option></option>").attr("value", patheSurveyors.email).text(patheSurveyors.name));        
					});
					
					jQuery("#assignedTo").empty();
				 jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
				  jQuery.each(patheSurveyor, function (i, patheSurveyors) {    	
						jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", patheSurveyors.email).text(patheSurveyors.name));        
					});
				 
				 jQuery("#path_promotedRoute").empty(); 
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
				        	
				        	 onSelect: function(dateStr) {
				        		 if( $('#path_classLkp').val()!=''){
				        			 populateRowPathNextsurveyDate();
				        		 }
				        	       
				        	     },
				 				changeMonth: true,
								changeYear: true
				            }).attr('readonly','readonly');
				        
					});
			    						
					 $("#path_classLkp").change(function(){
						if( $('#lastsurvey').val()!=''){
		        		  	        populateRowPathNextsurveyDate();
		        		 }
					 });
			//calculting length
			/*var outlength=(feature.geometry.getLength()/1000).toFixed(3);
			$("#lengthKm").val(outlength);*/
					 var outlength=null;
					 if (feature.geometry) {	
						outlength=(feature.geometry.getLength()/1000).toFixed(2);
					 }
					 else if (feature.feature.geometry){
						outlength=(feature.feature.geometry.getLength()/1000).toFixed(2);
					 }
					 $("#lengthKm").val(outlength);
				  
			$("#btnUpdateRoW_line").hide();
			$("#btnCancelRoW_line").hide();
			$("#pathlinkDiv").hide();
			$("#btnSaveRoW_line").show();
			$('#btnSaveRoW_line input').attr('value', 'Apply');
			$("#dateofnextsurvey").attr("disabled", true);
			$("#unresolvedIssues").attr("disabled", true);
			$("#pathConditionLkp").attr("disabled", true);
			//$("#lengthKm").attr("disabled", true);
			$(".nxtPrevBTNHolder").hide();
			$(".footerBtns").hide();
			translateRowInfoLabels();
			$('#btnPathSave').attr("value", $._('Apply'));
		});
	}
	$("#options2-s-d").show('fast');
		
		//-------------end of row_path-----
	}
	//Furniture Start
	else if(selected_layer=='Furniture'){
		
		isediting=true;
		_geomFeature=feature;
		var _gid=null;
		if (feature.data) {	
		_gid=feature.data.gid;	
		}
		else if (feature.feature.data){
			_gid=feature.feature.data.gid;
			
		}
		
		var furnitureTypes=null;
		var currentdata=null;			
		jQuery.ajax({
	        async:false,
	     	type: "GET",              
	         url: STUDIO_URL + "furniture/type/" + lang,        		               
	         success: function (data) {
	        	 furnitureTypes=data
	         	
	         }
	     });
		var furnitureCondition=null;
		jQuery.ajax({
	        async:false,
	     	type: "GET",              
	         url: STUDIO_URL + "furniture/condition",        		               
	         success: function (data) {
	        	 furnitureCondition=data
	         	
	         }
	     });
		var furnitureSurveyor=null;
		jQuery.ajax({
	        async:false,
	     	type: "GET",              
	         url: STUDIO_URL + "furniture/surveyor",        		               
	         success: function (data) {
	        	 furnitureSurveyor=data
	         	
	         }
	     });
		
		
		if(_gid){
			savetype='EDIT';
		jQuery.get('resources/templates/viewer/furnitureinfo.html', function(template) {
		
		$("body").append(template);    

			
		jQuery.ajax({
			   async:false,
				type: "GET",              
				url: STUDIO_URL + "furniture/"+_gid,        		               
				success: function (data) {
					data.installedDate = convertDateToEuropeanFormat(data.installedDate);
		        	data.lastInspected = convertDateToEuropeanFormat(data.lastInspected);
		        	data.nextPathsurvey = convertDateToEuropeanFormat(data.nextPathsurvey);
					currentdata=data;	        	
					
					jQuery("#edit_content").empty();
				 
					jQuery("#FurnitureInfo_DetailsTmpl").tmpl(data).appendTo("#edit_content");
					
					jQuery.each(furnitureTypes, function (i, furnitureType) {    	
						jQuery("#type").append(jQuery("<option></option>").attr("value", furnitureType.typeid).text(
						(lang=='en')?furnitureType.type:furnitureType.math));
					});
					
					jQuery("#furnitureSurveyor").empty();
					//jQuery("#furnitureSurveyor").append(jQuery("<option></option>").attr("value", "").text("Please Select"));											
					jQuery("#furnitureSurveyor").append(jQuery("<option></option>").attr("value", "").text((lang=='cy')?"Dewisiwch":"Please Select"));
					jQuery.each(furnitureSurveyor, function (i, furnitureSurvey) {    	
						jQuery("#furnitureSurveyor").append(jQuery("<option></option>").attr("value", furnitureSurvey.id).text(furnitureSurvey.name));        
					});
					
					jQuery("#condition").empty();
					jQuery.each(furnitureCondition, function (i, furnitureCond) {    	
						jQuery("#condition").append(jQuery("<option></option>").attr("value", furnitureCond.conditionid).text(
								(lang=='en')?furnitureCond.condition:furnitureCond.cyflwr));       
					});
					jQuery("#furnitureUnresolvedIssues").empty();
					jQuery("#furnitureUnresolvedIssues").append(jQuery("<option></option>")
			        		.attr("value", "false").text((lang=='en')?"No":"Na"));

			        jQuery("#furnitureUnresolvedIssues").append(jQuery("<option></option>")
			        		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));
					
					jQuery('#type').val(currentdata.furnitureTypeLkp.typeid);
					jQuery('#condition').val(currentdata.furnitureConditionLkp.conditionid);
					jQuery('#furnitureUnresolvedIssues').val(currentdata.unresolvedIssues.toString());
					//jQuery('#furnitureSurveyor').val(currentdata.surveyor.toString());
					jQuery('#furnitureSurveyor').val(currentdata.surveyor);
					//jQuery('#FurAttchFileListBody').append(htmlStr);
					
					$(function() {
				        $("#furnitureInstalledDate").datepicker({ dateFormat: 'dd/mm/yy',
							changeMonth: true,
							changeYear: true
			            }).attr('readonly','readonly');
					});
					$(function() {
				        $("#furnitureLastInspected").datepicker({ dateFormat: 'dd/mm/yy',
							changeMonth: true,
							changeYear: true
			            }).attr('readonly','readonly');
					});
					$(function() {
				        $("#furnitureNextsurvey").datepicker({ dateFormat: 'dd/mm/yy',
							changeMonth: true,
							changeYear: true
			            }).attr('readonly','readonly');
					});
					
					
						//$("#accessLandInfoTable :input").attr("disabled", true);
						$("#btnUpdateFurniture").hide();				
						$("#btnCancelFurniture").hide();
						$("#btnSaveFurniture").show();
						$("#roWID").attr("disabled", true);
		                $("#furnitureid").attr("disabled", true);
						$('#btnSaveFurniture input').attr('value', 'Apply');
						$(".nxtPrevBTNHolder").hide();
						$(".footerBtns").hide();
					}
				});
			furnitureLabelTranslations();
		});	
			
		}	
		else{
			savetype='NEW';
			jQuery.get('resources/templates/viewer/furnitureinfo.html', function(template) {
		
			$("body").append(template);  
			jQuery("#edit_content").empty();
				 
					jQuery("#FurnitureInfo_DetailsTmpl").tmpl().appendTo("#edit_content");
					$('#furnitureIdTR').hide();
					
					jQuery.each(furnitureTypes, function (i, furnitureType) {    	
						jQuery("#type").append(jQuery("<option></option>").attr("value", furnitureType.typeid).text(
								(lang=='en')?furnitureType.type:furnitureType.math));
					});
					jQuery("#furnitureSurveyor").empty();
					//jQuery("#furnitureSurveyor").append(jQuery("<option></option>").attr("value", "").text("Please Select"));																
					jQuery("#furnitureSurveyor").append(jQuery("<option></option>").attr("value", "").text((lang=='cy')?"Dewisiwch":"Please Select"));
					jQuery.each(furnitureSurveyor, function (i, furnitureSurvey) {    	
						jQuery("#furnitureSurveyor").append(jQuery("<option></option>").attr("value", furnitureSurvey.id).text(furnitureSurvey.name));        
					});
					jQuery("#condition").empty();
					jQuery.each(furnitureCondition, function (i, furnitureCond) {    	
						jQuery("#condition").append(jQuery("<option></option>").attr("value", furnitureCond.conditionid).text(
								(lang=='en')?furnitureCond.condition:furnitureCond.cyflwr));        
					});	        	
					jQuery("#furnitureUnresolvedIssues").empty();
					jQuery("#furnitureUnresolvedIssues").append(jQuery("<option></option>")
			        		.attr("value", "false").text((lang=='en')?"No":"Na"));

			        jQuery("#furnitureUnresolvedIssues").append(jQuery("<option></option>")
			        		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));
					
					$(function() {
				        $("#furnitureInstalledDate").datepicker({ dateFormat: 'dd/mm/yy',
							changeMonth: true,
							changeYear: true
			            }).attr('readonly','readonly');
					});
					$(function() {
				        $("#furnitureLastInspected").datepicker({ dateFormat: 'dd/mm/yy',
							changeMonth: true,
							changeYear: true
			            }).attr('readonly','readonly');
					});
					$(function() {
				        $("#furnitureNextsurvey").datepicker({ dateFormat: 'dd/mm/yy',
							changeMonth: true,
							changeYear: true
			            }).attr('readonly','readonly');
					});
					jQuery('#furnitureNotes').val("");
					if(issue_rowid!=undefined){
						
							jQuery('#roWID').val(issue_rowid);
							//jQuery('#_row_id').val(issue_rowid);
							$("#roWID").attr("disabled", true);	
							
					}	
					
					$("#btnUpdateFurniture").hide();
					//$("#roWID").attr("disabled", true);
	               // $("#furnitureid").attr("disabled", true);
						$("#btnCancelFurniture").hide();
						$("#btnSaveFurniture").show();
						$('#btnSaveFurniture input').attr('value', 'Apply');
						$(".nxtPrevBTNHolder").hide();
						$(".footerBtns").hide();
						furnitureLabelTranslations();
			});
		}
		
		
		$("#options2-s-d").show('fast');				
		
		
	}
	
	//Furniture End
	
	//Issue Start
	else if(selected_layer=='Issue'){		
		isediting=true;
		_geomFeature=feature;
		var _gid=null;
		if (feature.data) {	
		_gid=feature.data.gid;	
		}
		else if (feature.feature.data){
			_gid=feature.feature.data.gid;
			
		}
		
		var issue_typeList=null;
		var issue_urgencyList=null;
		var issue_StatusList=null;
		var issue_ResponsibleDeptList=null;
		var issue_ReasonList=null;
		var issue_userList=null;
		var currentdata=null;			
		
		
		jQuery.ajax({
	        async:false,
	     	type: "GET",              
	         url: STUDIO_URL + "issue/type/lang/"+lang,        		               
	         success: function (data) {
	        	 issue_typeList=data;
	         	
	         }
	     });
		jQuery.ajax({
	        async:false,
	     	type: "GET",              
	         url: STUDIO_URL + "issue/urgency",        		               
	         success: function (data) {
	        	 issue_urgencyList=data;
	         	
	         }
	     });
		
		jQuery.ajax({
	        async:false,
	     	type: "GET",              
	         url: STUDIO_URL + "issue/status",        		               
	         success: function (data) {
	        	 issue_StatusList=data;
	         	
	         }
	     });
		jQuery.ajax({
	        async:false,
	     	type: "GET",              
	         url: STUDIO_URL + "issue/responsibledept",        		               
	         success: function (data) {
	        	 issue_ResponsibleDeptList=data;
	         	
	         }
	     });
		jQuery.ajax({
	        async:false,
	     	type: "GET",              
	         url: STUDIO_URL + "issue/reason",        		               
	         success: function (data) {
	        	 issue_ReasonList=data;
	        	 
	        	 jQuery.each(data, function (i, reasonLanLst) {    	
	        		 issueReasonLanMap[reasonLanLst.math]=reasonLanLst.reason;	        		 
	     		});
	        	
	         }
	     });
		jQuery.ajax({
	        async: false,
	        type: "GET",
	        url: STUDIO_URL + "workcommitment/reassign/"+loggedUser.functionalRole+"/"+loggedUser.id,
	        //url: STUDIO_URL + "user/",
	        success: function (data) {
	        	issue_userList = data

	        }
	    });
		
		if(_gid){
			savetype='EDIT';
		jQuery.get('resources/templates/viewer/issue.html', function(template) {
		
		$("body").append(template);    
		
			
		jQuery.ajax({
			   async:false,
				type: "GET",              
				url: STUDIO_URL + "issue/"+_gid,        		               
				success: function (data) {
					data.reportedOn = convertDateToEuropeanFormat(data.reportedOn);
		        	data.inspectBy = convertDateToEuropeanFormat(data.inspectBy);
		        	data.inspectedOn = convertDateToEuropeanFormat(data.inspectedOn);
		        	data.resolveBy = convertDateToEuropeanFormat(data.resolveBy);
		        	data.resolveBy = convertDateToEuropeanFormat(data.resolveBy);
		        	data.signoff = convertDateToEuropeanFormat(data.signoff);
					currentdata=data;	        	
					oldIssueActionStatus=currentdata.actionStatusLkp.actionstatusid;
					jQuery("#edit_content").empty();
				 
					jQuery("#issue_DetailsTmpl").tmpl(data).appendTo("#edit_content");
					$("#addPrintIssueDiv").hide();
					$("#issueActionTR").hide();
					
					$("#furnitureIDTR").hide();
					$("#surfaceIDTR").hide();
					
					jQuery("#issueType").empty();					
					jQuery.each(issue_typeList, function (i, issueType) {    	
						jQuery("#issueType").append(jQuery("<option></option>").attr("value", issueType.issuetypeid).text(  
						(lang=='en')?issueType.type:issueType.math));
						
					});
					
					jQuery("#urgency").empty();		
					jQuery.each(issue_urgencyList, function (i, issueurgency) {    	
						jQuery("#urgency").append(jQuery("<option></option>").attr("value", issueurgency.urgencyid).text(
						(lang=='en')?issueurgency.urgencyType:issueurgency.brys));
					});
					
					jQuery("#actionStatus").empty();
					jQuery.each(issue_StatusList, function (i, issueStatus) {    	
						jQuery("#actionStatus").append(jQuery("<option></option>").attr("value", issueStatus.actionstatusid).text(  
						(lang=='en')?issueStatus.actionStatus:issueStatus.statws));
					});
					
					jQuery("#responsibleDept").empty();
					jQuery.each(issue_ResponsibleDeptList, function (i, issueResponsibleDept) {    	
						jQuery("#responsibleDept").append(jQuery("<option></option>").attr("value", issueResponsibleDept.departmentid).text(
						(lang=='en')?issueResponsibleDept.department:issueResponsibleDept.adran));
					});
					
					jQuery("#reason").empty();
					jQuery.each(issue_ReasonList, function (i, issueReason) {    	
						/*if(parentlryName=='Complaint_Layer'){
							jQuery("#reason").append(jQuery("<option></option>").attr("value", issueReason.reasonid).text(issueReason.reason));
							
						}
						else{
							if(issueReason.reasonid!=3){
								jQuery("#reason").append(jQuery("<option></option>").attr("value", issueReason.reasonid).text(issueReason.reason));        
							}
							
						}*/
						jQuery("#reason").append(jQuery("<option></option>").attr("value", issueReason.reasonid).text(
						(lang=='en')?issueReason.reason:issueReason.math));
					}); 

					jQuery("#assignedTo").empty();
					jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
					jQuery.each(issue_userList, function (i, issueUser) {    	
						jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", issueUser.email).text(issueUser.name));        
					});
					
									
					jQuery('#issueType').val(currentdata.issueTypeLkp.issuetypeid);
					jQuery('#urgency').val(currentdata.issueUrgencyLkp.urgencyid);
					jQuery('#actionStatus').val(currentdata.actionStatusLkp.actionstatusid);
					jQuery('#responsibleDept').val(currentdata.responsibleDepartmentLkp.departmentid);		
					jQuery('#reason').val(currentdata.issueReasonLkp.reasonid);
					jQuery('#assignedTo').val(currentdata.assignedTo);
					
					if(currentdata.furnitureid!=null){
						$("#_furnitureid").val(currentdata.furnitureid);
						$("#furnitureid").val(currentdata.furnitureid);
						$("#_furnitureid").attr("disabled", true);
						
						$("#furnitureIDTR").show();
						
					}
					
					if(currentdata.surfaceid!=null){
						$("#_surfaceid").val(currentdata.surfaceid);
						$("#surfaceid").val(currentdata.surfaceid);
						$("#_surfaceid").attr("disabled", true);
						
						$("#surfaceIDTR").show();
					}
					
					$(function() {
				        $("#reportedOn").datepicker({ dateFormat: 'dd/mm/yy',onSelect: function(date) {						
						$("#inspectBy").val(date);
						$("#inspectedOn").val(date);
						populateIssueResolvedDate();
						},
						changeMonth: true,
						changeYear: true
		            }).attr('readonly','readonly');
				       
					});
					//startDate: '01/01/2000',

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
					
					//$("#reportedOn").attr("disabled", true);
					$("#resolveDate").attr("disabled", true);
					$("#inspectBy").attr("disabled", true);
					$('#signOff').attr("disabled", true);
					
					var selected_why = $("#reason option:selected");
					 
					 if(selected_why.val() == "1"){
						 $("#reportedOn").removeAttr("disabled");
					 }else{
						 $("#reportedOn").attr("disabled", true);
					 }
					
						//$("#accessLandInfoTable :input").attr("disabled", true);
						$("#_row_id").attr("disabled", true);
						
						$("#_gid").attr("disabled", true);
						
						$("#btnUpdateIssue").hide();				
						$("#btnCancelIssue").hide();
						$("#btnSaveIssue").show();
						$('#btnSaveIssue input').attr('value', 'Apply');
						$(".nxtPrevBTNHolder").hide();
						$(".footerBtns").hide();
						issueTabTranslations();
						
					}
				});
			
		});	
			
		}	
		else{
			
			savetype='NEW';
			jQuery.get('resources/templates/viewer/issue.html', function(template) {
		
			$("body").append(template); 					
			jQuery("#edit_content").empty();
				 
					jQuery("#issue_DetailsTmpl").tmpl().appendTo("#edit_content");
					
					$('#issueIdTR').hide();
					$("#furnitureIDTR").hide();
					$("#issueActionTR").hide();
					$("#surfaceIDTR").hide();
					$("#addPrintIssueDiv").hide();
					jQuery("#issueType").empty();
					jQuery.each(issue_typeList, function (i, issueType) {    	
						jQuery("#issueType").append(jQuery("<option></option>").attr("value", issueType.issuetypeid).text(
								(lang=='en')?issueType.type:issueType.math));	
					});
					
					jQuery("#urgency").empty();		
					jQuery.each(issue_urgencyList, function (i, issueurgency) {    	
						jQuery("#urgency").append(jQuery("<option></option>").attr("value", issueurgency.urgencyid).text(
								(lang=='en')?issueurgency.urgencyType:issueurgency.brys));
					});
					
					jQuery("#actionStatus").empty();
					jQuery.each(issue_StatusList, function (i, issueStatus) {    	
						jQuery("#actionStatus").append(jQuery("<option></option>").attr("value", issueStatus.actionstatusid).text(
								(lang=='en')?issueStatus.actionStatus:issueStatus.statws));
					});
					
					jQuery("#responsibleDept").empty();
					jQuery.each(issue_ResponsibleDeptList, function (i, issueResponsibleDept) {    	
						jQuery("#responsibleDept").append(jQuery("<option></option>").attr("value", issueResponsibleDept.departmentid).text(
								(lang=='en')?issueResponsibleDept.department:issueResponsibleDept.adran));
					});
					
					jQuery("#reason").empty();
					jQuery.each(issue_ReasonList, function (i, issueReason) {    	
						if(parentlryName=='Complaint_Layer'){
							jQuery("#reason").append(jQuery("<option></option>").attr("value", issueReason.reasonid).text(
									(lang=='en')?issueReason.reason:issueReason.math));
							
						}
						else{
							//if(issueReason.reasonid!=3){
								jQuery("#reason").append(jQuery("<option></option>").attr("value", issueReason.reasonid).text(
										(lang=='en')?issueReason.reason:issueReason.math));
							//}
							
						}
						
					}); 

					jQuery("#assignedTo").empty();
					jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
					jQuery.each(issue_userList, function (i, issueUser) {    	
						jQuery("#assignedTo").append(jQuery("<option></option>").attr("value", issueUser.email).text(issueUser.name));        
					});
					
					$(function() {
				        $("#reportedOn").datepicker({ dateFormat: 'dd/mm/yy',onSelect: function(date) {						
						$("#inspectBy").val(date);
						$("#inspectedOn").val(date);
						populateIssueResolvedDate();
						},
						changeMonth: true,
						changeYear: true
		            }).attr('readonly','readonly');
				       
					});
					//startDate: '01/01/2000',

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
					
					if(parentlryName=="Complaint_Layer"){
					$("#reportedOn").val(complaintReportedOn);
					}
					else{
					$("#reportedOn").val(convertDateToEuropeanFormat(currentDate));
					}
					$("#reportedOn").attr("disabled", true);
					$("#resolveDate").attr("disabled", true);
					$("#inspectBy").attr("disabled", true);
					$('#signOff').attr("disabled", true);
					
					$("#_row_id").attr("disabled", true);	
					$("#_furnitureid").attr("disabled", true);
					$("#_surfaceid").attr("disabled", true);
					
					//$("#inspectedOn").val(currentDate);
					//$("#assignedTo").val(loggedUser.email);
					
					$("#notes").val("");
					$("#problem").val("");
					
					$('#urgency').change();
					$('#reason').change();
					
					if(g_createIssue_rowid!=undefined && g_createIssue_gid!=undefined && parentlryName!='Furniture' ){
						jQuery('#row_id').val(g_createIssue_rowid);
						jQuery('#_row_id').val(g_createIssue_rowid);
						$("#_row_id").attr("disabled", true);					
					}
					if(issue_furnitureid!=undefined){
					//issue_rowid,issue_furnitureid
						jQuery('#furnitureid').val(issue_furnitureid);
						jQuery('#_furnitureid').val(issue_furnitureid);
						$("#_furnitureid").attr("disabled", true);	
						$("#furnitureIDTR").show();
						
					}
					if(issue_rowid!=undefined){
					//issue_rowid,issue_furnitureid
						jQuery('#row_id').val(issue_rowid);
						jQuery('#_row_id').val(issue_rowid);
						$("#_row_id").attr("disabled", true);	
						$("#_furnitureid").attr("disabled", true);
					}
					
					if(_surfaceId!=undefined){
						
													
							jQuery('#row_id').val(issue_rowid);
							jQuery('#_row_id').val(issue_rowid);
							
							jQuery('#surfaceid').val(_surfaceId);
							jQuery('#_surfaceid').val(_surfaceId);
							
							$("#_row_id").attr("disabled", true);	
							$("#_furnitureid").attr("disabled", true);
							
							
							$("#surfaceIDTR").show();
						}
					
					$("#btnUpdateIssue").hide();				
					$("#btnCancelIssue").hide();
					$("#btnSaveIssue").show();
					$('#btnSaveIssue input').attr('value', 'Apply');
					$(".nxtPrevBTNHolder").hide();
					$(".footerBtns").hide();	
					issueTabTranslations();
					
			});
		}
		
		
		$("#options2-s-d").show('fast');				
		
		
	}
	//Issue end
	//surface start
	else if(selected_layer=='Surface'){
		var currentSurface=null;
		//------------Start of surface----
		isediting=true;
		_geomFeature=feature;
		var _gid=null;
		if (feature.data) {	
		_gid=feature.data.gid;	
		}
		else if (feature.feature.data){
			_gid=feature.feature.data.gid;
			
		}
		
		////lookups
		
		if(surfaceTypes==null){  
			jQuery.ajax({
			async: false,
			type: "GET",
			url: STUDIO_URL + "surface/type",
			success: function (data) {
				surfaceTypes = data

			}
			});
		}
		
		if(surfaceCondition==null){  
			jQuery.ajax({
				async: false,
				type: "GET",
				url: STUDIO_URL + "surface/condition",
				success: function (data) {
					surfaceCondition = data

				}
			});
		}
		if(surfaceSurveyor==null){  
			jQuery.ajax({
				async: false,
				type: "GET",
				url: STUDIO_URL + "surface/surveyor",
				success: function (data) {
					surfaceSurveyor = data

				}
			});
		}
		/////
   
   
	if(_gid){
		savetype='EDIT';
		jQuery.get('resources/templates/viewer/surface.html', function(template) {
	
			$("body").append(template);   
	
			jQuery.ajax({
				   async:false,
					type: "GET",              
					url: STUDIO_URL + "surface/"+_gid,        		               
					success: function (data) {
						data.lastInspected = convertDateToEuropeanFormat(data.lastInspected);
			        	data.lastsurfacedate = convertDateToEuropeanFormat(data.lastsurfacedate);
						currentSurface=data;	        	
						
						jQuery("#edit_content").empty();
					 
						jQuery("#surfaceInfo_DetailsTmpl").tmpl(data).appendTo("#edit_content");
						
						$("#roWID").attr("disabled", true);
						$("#surfaceid").attr("disabled", true);
											
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
						
						jQuery("#surfaceType").empty();
						jQuery.each(surfaceTypes, function (i, surfaceType) {
						
						/*jQuery("#surfaceType").append(				
						jQuery("<option></option>").attr("value", surfaceType.typeid).text(
						surfaceType.type));*/
						
						jQuery("#surfaceType").append(jQuery("<option></option>").attr("value", surfaceType.typeid).text(
								(lang=='en')?surfaceType.type:surfaceType.math));
						});	
						
						
						jQuery("#surfaceSurveyor").empty();
						jQuery("#surfaceSurveyor").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));	
						
						jQuery.each(surfaceSurveyor, function (i, surfaceSurvey) {
						jQuery("#surfaceSurveyor").append(
						jQuery("<option></option>").attr("value", surfaceSurvey.id).text(
						surfaceSurvey.name));
						});
						
						jQuery("#surfaceCondition").empty();
						jQuery.each(surfaceCondition, function (i, surfaceCond) {
						
						/*jQuery("#surfaceCondition").append(
						jQuery("<option></option>").attr("value", surfaceCond.conditionid).text(
						surfaceCond.condition));*/
						
						jQuery("#surfaceCondition").append(jQuery("<option></option>").attr("value", surfaceCond.conditionid).text(
								(lang=='en')?surfaceCond.condition:surfaceCond.cyflwr));
						});
						
						
						jQuery("#surfaceUnresolvedIssues").empty();
						jQuery("#surfaceUnresolvedIssues").append(jQuery("<option></option>")
				        		.attr("value", "false").text((lang=='en')?"No":"Na"));

				        jQuery("#surfaceUnresolvedIssues").append(jQuery("<option></option>")
				        		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));
						
						
						jQuery('#surfaceType').val(currentSurface.surfaceTypeLkp.typeid);
						jQuery('#surfaceCondition').val(currentSurface.surfaceConditionLkp.conditionid);
						jQuery('#surfaceUnresolvedIssues').val(currentSurface.unresolvedStatus.toString());
						//jQuery('#surfaceSurveyor').val(currentSurface.surveyor.toString());
						jQuery('#surfaceSurveyor').val(currentSurface.surveyor);
						
						$("#SurfaceLength").attr("disabled", true);
						
						//$("#accessLandInfoTable :input").attr("disabled", true);
						$("#btnUpdateSurface").hide();				
						$("#btnCancelSurface").hide();
						$("#btnSaveSurface").show();
						$('#btnSaveSurface input').attr('value', 'Apply');
						$(".nxtPrevBTNHolder").hide();
						$(".footerBtns").hide();
						surfaceLabelTranslations();
						$('#btnSurfaceSave').attr("value", $._('Apply'));
						
					}
				});

	

		});	
		
	}	//if//
	else{
			savetype='NEW';
			jQuery.get('resources/templates/viewer/surface.html', function(template) {
		
				$("body").append(template);  
				jQuery("#edit_content").empty();
				 
						
				jQuery("#surfaceInfo_DetailsTmpl").tmpl().appendTo("#edit_content");
				
				
				$("#roWID").attr("disabled", true);
				$("#surfaceid").attr("disabled", true);
				$("#SurfaceLength").attr("disabled", true);
									
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
				$("#surfaceNotes").val("");
				$("#lastSurfaceDate").val("");
				
				jQuery("#surfaceType").empty();
				jQuery.each(surfaceTypes, function (i, surfaceType) {
				
				/*jQuery("#surfaceType").append(				
				jQuery("<option></option>").attr("value", surfaceType.typeid).text(
				surfaceType.type));*/
				
				jQuery("#surfaceType").append(jQuery("<option></option>").attr("value", surfaceType.typeid).text(
						(lang=='en')?surfaceType.type:surfaceType.math));
				});	 
			
				jQuery("#surfaceSurveyor").empty();
				//jQuery("#surfaceSurveyor").append(jQuery("<option></option>").attr("value", "").text("Please Select"));
				jQuery("#surfaceSurveyor").append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
				
				jQuery.each(surfaceSurveyor, function (i, surfaceSurvey) {
				jQuery("#surfaceSurveyor").append(
				jQuery("<option></option>").attr("value", surfaceSurvey.id).text(
				surfaceSurvey.name));
				});
				jQuery("#surfaceCondition").empty();
				jQuery.each(surfaceCondition, function (i, surfaceCond) {
				
				/*jQuery("#surfaceCondition").append(
				jQuery("<option></option>").attr("value", surfaceCond.conditionid).text(
				surfaceCond.condition));*/
				
				jQuery("#surfaceCondition").append(jQuery("<option></option>").attr("value", surfaceCond.conditionid).text(
						(lang=='en')?surfaceCond.condition:surfaceCond.cyflwr));
				});		
				
				jQuery("#surfaceUnresolvedIssues").empty();
				jQuery("#surfaceUnresolvedIssues").append(jQuery("<option></option>")
		        		.attr("value", "false").text((lang=='en')?"No":"Na"));

		        jQuery("#surfaceUnresolvedIssues").append(jQuery("<option></option>")
		        		.attr("value", "true").text((lang=='en')?"Yes":"Oes"));
				
				
				$('#td-SurfaceID').hide();
				$("#SurfaceLength").val((feature.geometry.getLength()/1000).toFixed(2));
				
				if(issue_rowid!=undefined){
					jQuery('#roWID').val(issue_rowid);		
					$("#roWID").attr("disabled", true);	
					$("#surfaceid").attr("disabled", true);
				}		
		
				//$("#accessLandInfoTable :input").attr("disabled", true);
				$("#btnUpdateSurface").hide();				
				$("#btnCancelSurface").hide();
				$("#btnSaveSurface").show();
				$('#btnSaveSurface input').attr('value', 'Apply');
				$(".nxtPrevBTNHolder").hide();
				$(".footerBtns").hide();
			
				surfaceLabelTranslations();
				$('#btnSurfaceSave').attr("value", $._('Apply'));
					 
			});
		}	
		$("#options2-s-d").show('fast');
		
		//-------------end of Surface-----
	}
	
	else{
	
	//alert('here');
	
	}
}

function showEditForm1(feature) {
	 currentFeature = feature;
	 
	 var keyfield;
     $.ajax({
    	 url: STUDIO_URL + 'layer/' + objLayer.name + "?" + token,
         success: function (data) {
             keyfield = data.keyField;
         },
         async: false
     });

     
     htmlContent = '';
     $('#edit_content').empty();
     var elementRule = [];
     if(featureTypesFields.length > 0){
 		$("#editApply").show('fast');
 	 }
     for (var i = 0; i < featureTypesFields.length; ++i) {
    	 if (featureTypesFields[i].type.indexOf('gml')== -1) {
             if (featureTypesFields[i].name != keyfield) {
            	 htmlContent = htmlContent + '<div class="celladjust_one">' + featureTypesFields[i].name + '</div>';
            	 if (currentFeature.attributes) {
                     if (currentFeature.attributes[featureTypesFields[i].name]) {
                    	 htmlContent = htmlContent + '<div class="subcelladjust"><input type="text"  class="value_one" value="' + currentFeature.attributes[featureTypesFields[i].name] + '" name="' + featureTypesFields[i].name + '" id="' + featureTypesFields[i].name +'"/></div>';
                     }else{
                    	 htmlContent = htmlContent + '<div class="subcelladjust"><input type="text"  class="value_one" value="" name="' + featureTypesFields[i].name + '" id="' + featureTypesFields[i].name +'"/></div>';
                     }
                 }else if (currentFeature.feature.attributes) {
                	 if (currentFeature.feature.attributes[featureTypesFields[i].name]) {
                		 htmlContent = htmlContent + '<div class="subcelladjust"><input type="text"  class="value_one" value="' + currentFeature.feature.attributes[featureTypesFields[i].name] + '" name="' + featureTypesFields[i].name + '" id="' + featureTypesFields[i].name +'"/></div>';
                     }else{
                    	 htmlContent = htmlContent + '<div class="subcelladjust"><input type="text"  class="value_one" value="" name="' + featureTypesFields[i].name + '" id="' + featureTypesFields[i].name +'"/></div>';
                     }
                 }
            	 if (featureTypesFields[i].localType == 'int' || featureTypesFields[i].localType == 'decimal') {
                     validationRuleParams.number = true;
                     /*
                     $("#"+featureTypesFields[i].name).keydown(function(event) {
                         // Allow: backspace, delete, tab and escape
                         if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
                              // Allow: Ctrl+A
                             (event.keyCode == 65 && event.ctrlKey === true) || 
                              // Allow: home, end, left, right
                             (event.keyCode >= 35 && event.keyCode <= 39)) {
                                  // let it happen, don't do anything
                                  return;
                         }
                         else {
                             // Ensure that it is a number and stop the keypress
                             if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                                 event.preventDefault(); 
                             }   
                         }
                     });

                     */	
                     //$('#'+featureTypesFields[i].name).attr('title', 'Enter Number');
					  
                 }else{
                     
                	 /*
                     $("#"+featureTypesFields[i].name).keydown(function(event) {
                         // Allow: backspace, delete, tab and escape
                         if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
                              // Allow: Ctrl+A
                             (event.keyCode == 65 && event.ctrlKey === true) || 
                              // Allow: home, end, left, right
                             (event.keyCode >= 35 && event.keyCode <= 39)) {
                                  // let it happen, don't do anything
                                  return;
                         }
                         else {
                             // Ensure that it is a number and stop the keypress
                             if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                                 event.preventDefault(); 
                             }   
                         }
                     });

                     */	
                	 validationRuleParams.number = false;
					 //$('#'+featureTypesFields[i].name).attr('title', 'Enter Text');
                 }
                 if (eval(featureTypesFields[i].nillable)) {
                     validationRuleParams.required = false;
                 }else{
                     validationRuleParams.required = true;
                 }

                 var validationRuleArr = new Object();
                 validationRuleArr['required'] = validationRuleParams.required;
                 validationRuleArr['number'] = validationRuleParams.number;
                 elementRule[featureTypesFields[i].name] = validationRuleArr;
             }
         }
     }
     $('#edit_content').append(htmlContent);
	 
	 /*    uncomment for form hint
     for (var i = 0; i < featureTypesFields.length; ++i) {
			if (!featureTypesFields[i].type.contains('gml')) {
				if (featureTypesFields[i].name != keyfield) {
				
				if (featureTypesFields[i].localType == 'int' || featureTypesFields[i].localType == 'decimal') {
                     validationRuleParams.number = true;
					  $('#'+featureTypesFields[i].name).attr('title', 'Number');
					  
                 }else{
                     validationRuleParams.number = false;
					 $('#'+featureTypesFields[i].name).attr('title', 'Text');
                 }
				
				}
			}	 
		}
		
     jQuery('#edit_content').formHints();
     */
     
	 $("#editor_apply").click(function () {

         $("#editor_form").validate({
             rules: elementRule
         });

         if ($("#editor_form").valid()) {
             $("#edit_content input[type=text]").each(function () {

                 if (currentFeature.attributes) {
                	 if($(this).val().trim.length >0){
                		 currentFeature.attributes[$(this)[0].id] = $(this).val();
                	 }
                 } else {
                	 if($(this).val().trim.length >0){
                		 currentFeature.feature.attributes[$(this)[0].id] = $(this).val();
                	 }
                 }
             });

             if (currentFeature.feature == null) {
            	 if(featureState == "insert"){
            		 currentFeature.state = OpenLayers.State.INSERT;
                     g_wfs.events.triggerEvent("featureadded",
                             { feature: currentFeature });
            	 }else{
            		 currentFeature.state = OpenLayers.State.UPDATE;
            		 g_wfs.events.triggerEvent("featuremodified",
                         { feature: currentFeature });
            	 }
             } else {
            	 if(featureState == "insert"){
            		 currentFeature.feature.state = OpenLayers.State.INSERT;
            		 g_wfs.events.triggerEvent("featureadded",
            				 { feature: currentFeature.feature });
            	 }else{
            		 currentFeature.feature.state = OpenLayers.State.UPDATE;
            		 g_wfs.events.triggerEvent("featuremodified",
            				 { feature: currentFeature.feature });
            	 }
             }
            
        }
     });
}


function updateSelectionMode(){	
	var mode=$('#selectionMode').val();
	//alert(mode);
	editControls["selectionBox"].multiple =false;
	editControls["selectionBox"].single =false;
	
	editControls.selectionBox[mode]=true;	
	
	if(g_wfs != undefined){
		g_wfs.removeAllFeatures();
	}
	if(wfs_del != undefined){
		wfs_del.removeAllFeatures();
	}
	

	
}

function toggleSnap(_this){
	//alert(_this.checked);		
	var types = ["node", "vertex", "edge"];
    var target,type;
	
	$(".cls-snap").attr('checked', _this.checked);
	
	if(_this.checked){
		snap.activate();
		$(".cls-snap").removeAttr("disabled");
	}
	else{
		snap.deactivate();
		$(".cls-snap").attr("disabled", true);
	}
		
	for(var i=0; i<snap.targets.length; ++i) {
		target = snap.targets[i];
		for(var j=0; j<types.length; ++j) {
			type = types[j];
			target[type] = _this.checked;
			target[type + "Tolerance"] = Number($('#edit_tolerance_two').val()) || 0; 
		}
	}
	
	

}
function toggleSnapAttr(_this){
	//alert(_this.value+"-"+_this.checked);		
	var type=_this.value;
	//snap.targets[0][type]=_this.checked;
	
	var target,type;
	for(var i=0; i<snap.targets.length; ++i) {
		target = snap.targets[i];
		target[type] = _this.checked;	
	}
}
function handleKeypress_edit(evt){
    var code = evt.keyCode;
    if(code == OpenLayers.Event.KEY_ESC){    	
    	editControls['polygon'].cancel();       
    	editControls['line'].cancel();
    }
}

/*function populateIssueResolvedDate(){
	var urgency=$("#urgency").val();
	var urgencyTxt=$("#urgency option:selected").text();
	var resolvedDate=null;
	//var resdays=0;
	var days=0;
	var reportedDate=$("#reportedOn").val();
	
	if(urgencyTxt.toUpperCase()=='EMERGENCY'){
		$("#inspectBy").removeAttr("disabled");
	}
	else{
		$("#inspectBy").attr("disabled", true);
	}
	
	if($("#urgency").val()!=''){
		
		jQuery.ajax({
			   type: "POST",
			   url: STUDIO_URL +"tasksScheduler/",
			data: {taskName:ISSUE_TASK}, 
			async:false,
			success: function (data) {

				var r = new Array(), j = -1;         	  
				 for (var key=0, size=data.length; key<size; key++) {
					 
					 if(data[key][0].toUpperCase()==urgencyTxt.toUpperCase()){
						 
						 resolvedDate=businessDays(data[key][2],reportedDate); 						 
								break;
					 }
				}
			}
		 });
		
		$('#resolveDate').datepicker('setDate', resolvedDate);  
	}
	else{
	
		$('#resolveDate').val('');
	
	}

	
}*/

function populateIssueResolvedDate(){
	var urgency=$("#urgency").val();
	var urgencyTxt=$("#urgency option:selected").text();
	var resolvedDate=null;
	//var resdays=0;
	var days=0;
	//var reportedDate=$("#reportedOn").val();
	var inspectedOn=convertDateToUSFormat($("#inspectedOn").val());
	
	if(urgencyTxt.toUpperCase()=='EMERGENCY'){
		$("#inspectBy").removeAttr("disabled");
	}
	else{
		$("#inspectBy").attr("disabled", true);
	}
	
	if($("#urgency").val()!='' && inspectedOn!=''){
		
		jQuery.ajax({
			   type: "POST",
			   url: STUDIO_URL +"tasksScheduler/",
			data: {taskName:ISSUE_TASK}, 
			async:false,
			success: function (data) {

				var r = new Array(), j = -1;         	  
				 for (var key=0, size=data.length; key<size; key++) {
					 
					 if(data[key][0].toUpperCase()==urgencyTxt.toUpperCase()){
						 
						 resolvedDate=businessDays(data[key][2],inspectedOn);//reportedDate); 						 
								break;
					 }
				}
			}
		 });
		
		$('#resolveDate').datepicker('setDate', convertDateToEuropeanFormat(resolvedDate));  
	}
	else{
	
		$('#resolveDate').val('');
	
	}

	
}

function populateIssueInspectBy(){
	 var selected = $("#reason option:selected");
	 
	 if(selected.val() == "1"){
		 $("#reportedOn").removeAttr("disabled");
	 }else{
		 $("#reportedOn").attr("disabled", true);
	 }
	 var reason=$("#reason").val();
	var reasonTxt=$("#reason option:selected").text();
	if(lang=='cy'){reasonTxt=issueReasonLanMap[reasonTxt];	}
	var inspectByDate=null;
	var reportedDate=convertDateToUSFormat($("#reportedOn").val());
	//var resdays=0;
	var days=0;
		
	if(reason!=''){
	
	
		jQuery.ajax({
				   type: "POST",
				   url: STUDIO_URL +"tasksScheduler/",
				data: {taskName:'Issue Inspected By Date'}, 
				async:false,
				success: function (data) {

					var r = new Array(), j = -1;         	  
					 for (var key=0, size=data.length; key<size; key++) {
						 
						 
						 if(data[key][0].toUpperCase()==reasonTxt.toUpperCase()){
							 
							 inspectByDate=businessDays(data[key][2],reportedDate); 							 
									break;
						 }
						 
					}
				}
			 });
		$('#inspectBy').datepicker('setDate', convertDateToEuropeanFormat(inspectByDate));  
	}	 
	else{
		$('#inspectBy').val('');
	}

}


function populateIssueSignOff(){
	var issueId=$('#_gid').val();
	var status=$('#actionStatus').val();
	var statusTxt=$("#actionStatus option:selected").text();
		/*
		if(statusTxt=='Closed'  || statusTxt=='Completed' || statusTxt=='Referred_Legal' || statusTxt=='Referred_Structure'){
			$('#signOff').datepicker('setDate', currentDate);
		}
		else{
			$('#signOff').val('');
		}
		*/
		if(issueId!=""){
			//if(statusTxt=='Closed'  || statusTxt=='Completed' || statusTxt=='Referred_Legal' || statusTxt=='Referred_Structure'){
			if(statusTxt=='Closed'){
				jQuery.ajax({
			        async: false,
			        type: "GET",
			        url: STUDIO_URL + "job/issue/" + issueId,
			        success: function (data) {
			            if(data.jobid>0){
							
			            	if(data.jobCompleted==null || data.jobCompleted==""){
			            	jAlert("Job <strong>" + data.jobid +" </strong> corresponding to selected issue is to be completed before closure of Issue","Issue")													
							$('#actionStatus').val(oldIssueActionStatus);
							return;
			            	}
			            	else{
			            		$('#signOff').val(convertDateToEuropeanFormat(currentDate));
			            		
			            	}
						}
			            else{
							$('#signOff').val(convertDateToEuropeanFormat(currentDate));
						}
			            /*else{
						 jAlert("There is no job against this Issue", "New Issue");
						 $('#actionStatus').val(oldIssueActionStatus);
						 return;
						}*/
			        }
			    });
			}
			else{
				$('#signOff').val('');
			}
		}
		//else{			
		//	jAlert("There is no job against this Issue", "New Issue");
		//}
}

function updateRowPathIssueCount(gid){
	if(gid!=null ){
		jQuery.ajax({
			type: "GET",
			url: STUDIO_URL +"rowpath/updatecondition/"+gid,
			async:false,
			success: function (data) {
			}
		 });
	}
		
}	