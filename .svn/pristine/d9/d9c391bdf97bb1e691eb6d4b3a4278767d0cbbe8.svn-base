
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


var infoMarker;
var lon;
var lat;
var style = new OpenLayers.Style();
var flag = false;

//temp amitabh
var infoLayer;
var gid;		

var onClick = function (e) {

        OpenLayers.Element.addClass(map.viewPortDiv, "olCursorWait");
        lonLat = map.getLonLatFromPixel(e.xy);

        lon = lonLat.lon.toFixed(2);
        lat = lonLat.lat.toFixed(2);

        var size = new OpenLayers.Size(24, 24);
        var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
        var info_icon = new OpenLayers.Icon('resources/images/info_marker.png', size, offset);
/* hide marker
 
	if (infoMarker) {
		map.getLayersByName("Markers")[0].removeMarker(infoMarker);
	}
	infoMarker = new OpenLayers.Marker(lonLat, info_icon)
	map.getLayersByName("Markers")[0].addMarker(infoMarker);
*/
        var visible_layers=new Array();
        
		for(var vislyr  in layerMap) {
			//alert(map.getLayersByName(vislyr)[0].name+'-'+map.getLayersByName(vislyr)[0].visibility);
			
			if (map.getLayersByName(vislyr)[0].visibility && map.getLayersByName(vislyr)[0].queryable)
			{
				visible_layers.push(layerMap[vislyr]);
			}
	
		}
        
        this.protocol.read({
            params: {
                REQUEST: "GetFeatureInfo",
                EXCEPTIONS: "application/vnd.ogc.se_xml",
                VERSION: "1.1.1",
                BBOX: map.getExtent().toBBOX(),
                X: Math.round(e.xy.x),
                Y: Math.round(e.xy.y),
                INFO_FORMAT: 'application/vnd.ogc.gml',
                LAYERS: visible_layers,			//layerMap[OpenLayers.Map.activelayer.name],
                QUERY_LAYERS: visible_layers,	//layerMap[OpenLayers.Map.activelayer.name],
                WIDTH: map.size.w,
                HEIGHT: map.size.h,
                SRS: map.getProjection(),
                FEATURE_COUNT:10
            },
            callback: onResponse
        });
    }

var onResponse = function (response) {
	var defaultTab=null;
	var arrdefaultTab = new Array;
		

	if (response.features.length > 0) {
        var popupInfo = "";
        var features=response.features;
		var popupInfo = '';
        //popupInfo += '<html><body>';				//Info diplay in popup
		for(var i=0;i<features.length;i++){
			flag = false;
			var _actuallayer=features[i].gml.featureNSPrefix+':'+features[i].gml.featureType;
			infoLayer = features[i].gml.featureType;
			var attrs = features[i].attributes;
			var _layer;
			var _fid=features[i].fid;
			var _gid=_fid.substr(_fid.indexOf('.')+1);
			for(var index  in layerMap) {
					if(layerMap[index ]==_actuallayer){
					//alert(index);
					_layer=index;
					infoLayer = _layer;
					break;
					}
					//document.write( lyrname + " : " + layerMap[lyrname] + "<br />");
														
			}
			
			populateLayerLookups(_layer);

        $.ajax({
        	async:false,
			//url: "/snowdoniaprow-studio/layer/" + _layer + "/layerField" + "?" + token,
			url: STUDIO_URL + "layer/" + _layer + "/layerField" + "?" + token,
			success: function (displayableFields) {

            		if(loggedUser.functionalRole==11 && _layer=='RoW_Path'){
						var tempDisplayableCols=[];
						for(var x=0;x<displayableFields.length;x++){
							if(displayableFields[x].field=='gid' || displayableFields[x].field=='row_id'|| displayableFields[x].field=='type'){								
								tempDisplayableCols.push(displayableFields[x]);
								
							}
							
						}
						displayableFields=tempDisplayableCols;
					}
					
				
				// for display the result in popup
                // for display the result in popup
                
                //popupInfo += '<table class="featureInfo"><caption class="popupcaption">' + _fid + '<br>(Location: ' + lon + ", " + lat + ')</caption>';
						
				
				//popupInfo += '<table class="featureInfo"><tr><td colspan="2" class="popupcaption">' + _fid + '<br>(Location: ' + lon + ", " + lat + ')</td></tr>';
				//added for displaying info 
				if(_layer=='Furniture'){
					displayableFields=getOrederdFeatureList(displayableFields, FURNITURE_FIELDINDEX);
				}
				else if(_layer=='Access_Land'){
					displayableFields=getOrederdFeatureList(displayableFields, ACCESSLAND_FIELDINDEX);
				}
				else if(_layer=='RoW_Path' || _layer=='Public_RoW_Paths'){
					displayableFields=getOrederdFeatureList(displayableFields, PATH_FIELDINDEX);
					
					if(roles.indexOf("ROLE_PUBLICUSER")>-1){
						if(attrs['type'] > 4){
							flag = true;
						}	
					}
					
				}
				else if(_layer=='Issue'){
					displayableFields=getOrederdFeatureList(displayableFields, ISSUE_FIELDINDEX);
				}
				else if(_layer=='Surface'){
					displayableFields=getOrederdFeatureList(displayableFields, SURFACE_FIELDINDEX);
				} 
				else if(_layer=='Complaint_Layer'){
					displayableFields=getOrederdFeatureList(displayableFields, COMPLAINT_FIELDINDEX);
					
					if(roles.indexOf("ROLE_PUBLICUSER")>-1){
						if(attrs['complainantid'] != cpttheme.getComplainantid()){
							flag = true;
						}	
					}
				} 				
				else{
				
				}
				
				
				if(!flag){
					period_pos = _fid.indexOf('.');
					left_period_pos = _fid.substring(0, period_pos);
					right_period_pos = _fid.substring(period_pos + 1);
					popupInfo += '<h3><a id="'+ _layer+'-'+_gid +'" href="#">'+ $._(left_period_pos) + '.' + right_period_pos + '<br>(' + $._('Location') + ': ' + lon + ", " + lat+')</a></h3><div><table class="featureInfo">';
	                $.each(displayableFields, function (i, dispField) {
						//for(var i=0;i<displayableFields.length;i++){
						//	var dispField=displayableFields[i];
						
	                	popupInfo += '<tr>';
	                	if(lang=='en'){
	                		popupInfo += '<th>' + dispField.alias + '</th>';
	                	}else{
	                		if(_layer=='Access_Land' && dispField.field == 'row_id'){
	                		   popupInfo += '<th>' + $._(dispField.field + '_' + _layer) + '</th>';
	                		}else{
	                			 popupInfo += '<th>' + $._(dispField.field) + '</th>';
	                		}
	                	}                      						
						var attrValue = attrs[dispField.field];
						if(!attrValue)
							attrValue ='';
						
						 var httpidx = attrValue.indexOf("http");
						 if(httpidx >= 0){	
						 
							 var slashidx = attrValue.lastIndexOf("/");
							var link="";
							 if(slashidx > 0){
								
								link = attrValue.substr(slashidx+1,attrValue.length);
							}
	        
							attrValue ='<a href="'+ attrValue +'" target="_blank">'+ link +'</a>';
						 }
						if(_layer=='Access_Land'){
							if(dispField.field=='type'){
								popupInfo += '<td>' + lkp_Access_Land_type[attrValue] + '</td>';
							}
							else if(dispField.field=='agreement_date' || dispField.field=='agreement_end_date'){
								
								popupInfo += '<td>' + convertDateToEuropeanFormat(attrValue) + '</td>';
							}						
							else{
								popupInfo += '<td>' + attrValue + '</td>';
							}
							
							//popupInfo += '<td>' + ((dispField.field=='type' )?lkp_Access_Land_type[attrValue]:attrValue) + '</td>';
						}	
	                    else if(_layer=='RoW_Path' || _layer=='Public_RoW_Paths'){
													
							if(dispField.field=='type'){
							popupInfo += '<td>' + lkp_Row_Path_type[attrValue] + '</td>';
							}
							else if(dispField.field=='_class'){
								var _priority;
								if(lang == "en"){
									_priority = lkp_Row_Path_class[attrValue];
								}else{
									_priority = lkp_Row_Path_class[attrValue].replace("Priority", "Blaenoriaeth");
								}
							popupInfo += '<td>' + _priority + '</td>';
							}
							else if(dispField.field=='responsibility'){
							popupInfo += '<td>' + lkp_Row_Path_dept[attrValue] + '</td>';
							}
							else if(dispField.field=='condition'){
							popupInfo += '<td>' + lkp_Row_Path_condition[attrValue] + '</td>';
							}
							else if(dispField.field=='legalstatus'){
							popupInfo += '<td>' + lkp_Row_Path_status[attrValue] + '</td>';
							}
							else if(dispField.field=='surveyed_by'){
							//popupInfo += '<td>' + lkp_Row_Path_surveyor[attrValue] + '</td>';
							popupInfo += '<td>' + ((attrValue!="" )?lkp_Row_Path_surveyor[attrValue]:'') + '</td>';
							}
							/*else if(dispField.field=='assigned_to'){
							popupInfo += '<td>' + ((attrValue!="" )?lkp_Row_Path_surveyor[attrValue]:'') + '</td>';
							}*/
							else if(dispField.field=='ishistory'){
								popupInfo += '<td>' + ((attrValue=="true" )?"Yes":"No") + '</td>';
							}						
							else if(dispField.field=='lastsurvey' || dispField.field=='dateofnextsurvey' ||
									dispField.field=='agreement_end_date'){
								
								popupInfo += '<td>' + convertDateToEuropeanFormat(attrValue) + '</td>';
							}
							else if(dispField.field=='promoted_route'){
								popupInfo += '<td>' + ((attrValue=="true" )?"Yes":"No") + '</td>';
							}
							else{
								popupInfo += '<td>' + attrValue + '</td>';
							}
								
								//popupInfo += '<td>' + ((dispField.alias=='type' )?lkp_RoW_Path_type[attrValue]:attrValue) + '</td>';
						
						
						}
		
						else if(_layer=='Furniture'){
							if(dispField.field=='type'){
							popupInfo += '<td>' + lkp_Furniture_type[attrValue] + '</td>';
							}
							
							else if(dispField.field=='condition'){
							popupInfo += '<td>' + lkp_Furniture_condition[attrValue] + '</td>';
							}
							
							else if(dispField.field=='surveyor'){
							//popupInfo += '<td>' + lkp_Row_Path_surveyor[attrValue] + '</td>';
							popupInfo += '<td>' + ((attrValue!="" )?lkp_Furniture_surveyor[attrValue]:'') + '</td>';
							}
							else if(dispField.field=='unresolved_issues'){
								popupInfo += '<td>' + ((attrValue=="true" )?$._("yes"):$._("no")) + '</td>';
							}
							else if(dispField.field=='ishistory'){
								popupInfo += '<td>' + ((attrValue=="true" )?$._("yes"):$._("no")) + '</td>';
							}											
							else if(dispField.field=='installed_date' || dispField.field=='last_inspected' ||
									dispField.field=='next_pathsurvey'){
								
								popupInfo += '<td>' + convertDateToEuropeanFormat(attrValue) + '</td>';
							}
							else{
								popupInfo += '<td>' + attrValue + '</td>';
							}
								
								//popupInfo += '<td>' + ((dispField.alias=='type' )?lkp_RoW_Path_type[attrValue]:attrValue) + '</td>';
						
						
						}
						
						else if(_layer=='Issue'){
							if(dispField.field=='issuetype'){
							popupInfo += '<td>' + lkp_Issue_issuetype[attrValue] + '</td>';
							}
							
							else if(dispField.field=='actionstatus'){
							popupInfo += '<td>' + lkp_Issue_actionstatus[attrValue] + '</td>';
							}
							
							else if(dispField.field=='urgency'){
							
							popupInfo += '<td>' + lkp_Issue_urgency[attrValue] + '</td>';
							}
							
							else if(dispField.field=='responsibility'){
							popupInfo += '<td>' + lkp_Issue_responsibility[attrValue] + '</td>';
							}
							
							else if(dispField.field=='why'){
							
							popupInfo += '<td>' + lkp_Issue_why[attrValue] + '</td>';
							}
							else if(dispField.field=='assigned_to'){
							
							//popupInfo += '<td>' + ((attrValue!="" )?lkp_Issue_assignto[attrValue]:'') + '</td>';
							popupInfo += '<td>' + ((attrValue!="" )?getNameFromEMail(attrValue):'') + '</td>';
							}
							else if(dispField.field=='ishistory'){
								popupInfo += '<td>' + ((attrValue=="true" )?"Yes":"No") + '</td>';
							}					
							else if(dispField.field=='reported_on' || dispField.field=='inspect_by' ||
									dispField.field=='inspected_on' || dispField.field=='resolve_by' ||
									dispField.field=='signoff'){
								
								popupInfo += '<td>' + convertDateToEuropeanFormat(attrValue) + '</td>';
							}
							else{
								popupInfo += '<td>' + attrValue + '</td>';
							}
								
								//popupInfo += '<td>' + ((dispField.alias=='type' )?lkp_RoW_Path_type[attrValue]:attrValue) + '</td>';
						
						
						}
						else if(_layer=='Surface'){
							if(dispField.field=='type'){
							popupInfo += '<td>' + lkp_Surface_type[attrValue] + '</td>';
							}
							else if(dispField.field=='condition'){
							popupInfo += '<td>' + lkp_Surface_condition[attrValue] + '</td>';
							}
							else if(dispField.field=='surveyor'){
							popupInfo += '<td>' + lkp_Surface_surveyor[attrValue] + '</td>';
							}
							else if(dispField.field=='unresolved_status'){
								popupInfo += '<td>' + ((attrValue=="true" )?$._("yes"):$._("no")) + '</td>';
							}
							else if(dispField.field=='ishistory'){
								popupInfo += '<td>' + ((attrValue=="true" )?$._("yes"):$._("no")) + '</td>';
							}
							else if(dispField.field=='lastsurfacedate' || dispField.field=='last_inspected'){
								
								popupInfo += '<td>' + convertDateToEuropeanFormat(attrValue) + '</td>';
							}
							else{
								popupInfo += '<td>' + attrValue + '</td>';
							}
						}						
						
						else if(_layer=='Complaint_Layer'){
							//popupInfo += '<td>' + ((dispField.alias=='enquiry_type' )?lkp_Complaint_enquiryType[attrValue]:attrValue) + '</td>';
							if(dispField.field=='enquiry_type'){						
							popupInfo += '<td>' + ((attrValue!="" )?lkp_Complaint_enquiryType[attrValue]:"") + '</td>';
							}
							else if(dispField.field=='complainantid'){
							popupInfo += '<td>' + lkp_Complaint_complainant[attrValue] + '</td>';
							}
							else if(dispField.field=='reported_on' ||dispField.field=='acknowledge_by' ||
									dispField.field=='acknowledgement_sent' ||dispField.field=='respond_by' ||
									dispField.field=='response_sent' ||dispField.field=='signed_off'){
								
								popupInfo += '<td>' + convertDateToEuropeanFormat(attrValue) + '</td>';
							}
							
							else{
							popupInfo += '<td>' + attrValue + '</td>';
							}
						
						
						
						
						}	
						
						
						
						else{
							popupInfo += '<td>' + attrValue + '</td>';
						}
	                    popupInfo += '</tr>';
						
					//}	
	                });
	
	               // popupInfo += '</table>';
	                 popupInfo += '</table></div>'; 	
	                
	            }
				
			}
        });
		
		}
		
		
		//Info diplay in sidebar
		
		jQuery.get('resources/templates/viewer/info.html', function(template) {
					
        		
        		addTab($._('home_page_info'),template);
        		$('#span-close').attr('title',$._('close_title'));
        		
        		jQuery("#info_accordion").empty();
				jQuery("#info_accordion").html(popupInfo);	
				jQuery("#info_accordion").accordion({fillSpace: true});
				
				if($('#info_accordion h3 a').length > 0){
					defaultTab=$('#info_accordion h3 a')[0].id;
					arrdefaultTab = defaultTab.split("-");
					applySymbol(arrdefaultTab[0], arrdefaultTab[1]);
				}
				else{
					closeDialog('infoDiv');				
					jAlert( $._('no_records_found'), $._('alert'));
					$('#popup_ok').attr("value", $._('popupOk'));
					}

				
				
				
				$('#info_accordion h3 a').click(function(event) {
					
					var str=event.currentTarget.id;
					var arrstr = str.split("-");
					applySymbol(arrstr[0], arrstr[1]);
				});
        		
        });
		
		//Info diplay in popup
		/*
		popupInfo += '</body></html>';
		var popup = new OpenLayers.Popup.FramedCloud("identify", lonLat, new OpenLayers.Size(250, 150), popupInfo, null, true, onPopupClose);
                popup.autoSize = false;
                map.addPopup(popup);

		*/


    }

    	OpenLayers.Element.removeClass(map.viewPortDiv, "olCursorWait");
    	//applySymbol(infoLayer, _fid);
		
					
    
	}

/*
 * This method apply sld on selected layer feature
 * by creating clone
 */
function applySymbol(layerName, featureId){
	var symbol;
	var _layer = map.getLayersByName(layerName)[0];
	var _layerType = getGeomType(_layer);
	
	if(_layerType == 'Point'){
		symbol = {Point: selectionSymbolizer['Point']};
	}else if(_layerType == 'Polygon'){
		symbol = {Polygon: selectionSymbolizer['Polygon']};
	}else if(_layerType == 'LineString'){
		symbol = {Line: selectionSymbolizer['Line']};
	}
	
	
	var _gid = featureId; //split and convert to integer
	var pos = _gid.indexOf(".");
	if(pos >= -1){
		_gid = parseInt(_gid.substring(++pos));
	}
	
	var rule = new OpenLayers.Rule({
		title : "default",
		  filter: new OpenLayers.Filter.Comparison({
		      type: OpenLayers.Filter.Comparison.EQUAL_TO,
		      property: "gid",
		      value: _gid
		  }),
		  symbolizer: symbol
		});
	
	var sld_rules = [];
	var sld = {
	        version: "1.0.0",
	        namedLayers: {}
	    };
	
	var actualLyrName = layerMap[layerName];
	sld.namedLayers[actualLyrName] = {
	        name: actualLyrName,
	        userStyles: []
	      };
	
	sld_rules.push(rule);
	sld.namedLayers[actualLyrName].userStyles.push({
	        rules: sld_rules
	    });
	 
	//Remove the clone layer if it exists
	var clonedLayer = map.getLayersByName("clone")[0];
	if(clonedLayer != undefined){
		map.removeLayer(clonedLayer);
	}
	
	/*clonedLayer = _layer.clone();
    clonedLayer.setName("clone");
    map.addLayers([clonedLayer]);
    sld_body = new OpenLayers.Format.SLD().write(sld);
    clonedLayer.mergeNewParams({
        SLD: OpenLayers.Format.SLD().write(sld)
    });
    clonedLayer.redraw(true);*/
	sld_body = new OpenLayers.Format.SLD().write(sld);
	applySldOnFeature(sld_body, _layer, clonedLayer);
}

function applySldOnFeature(sld, layer, clonedLayer){
	
	//Post the SLD
    $.ajax({
        type: 'POST',
        url: "theme/createSLD",
        dataType: "text",
        data: { data: escape(sld) },
        success: function (result) {
            sld_result = result;
            
            var layerOptions = null;
            layerOptions = OpenLayers.Util.applyDefaults(layerOptions, {
                displayInLayerSwitcher: false,
                tileOptions: {
                    maxGetUrlLength: 2048
                }
            });

            //var layer = activeLayer; //OpenLayers.Map.activelayer;
            var clonedLayer = layer.clone();
            clonedLayer.setName("clone");
            map.addLayers([clonedLayer]);
            clonedLayer.mergeNewParams({
                SLD: sld_result
            });
            clonedLayer.redraw(true);
        },
        error: function (xhr, status) {
            jAlert('Sorry, there is a problem!');
        }
    });
}

function onPopupClose(evt) {
    this.hide();
    OpenLayers.Event.stop(evt);

/* 
	if (infoMarker) {
				map.getLayersByName("Markers")[0].removeMarker(infoMarker);
	}
	*/
}


function getOrederdFeatureList(featuredate, fetureorderList)
{
	var tempFeature={};
	var fieldName=null;
	var featurelist = fetureorderList.split(',');
    for(var i = 0; i < featurelist.length; i++)
    {
    	fieldName = featurelist[i];
         for(var j = 0; j < featuredate.length; j++)
		{
		var dispField=featuredate[j];
        	if(dispField.field==fieldName){	
        		tempFeature[i]=dispField;
				break;
        	}
        }
    }
    return tempFeature;
}