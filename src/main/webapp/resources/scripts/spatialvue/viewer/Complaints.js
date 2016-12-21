
var size;
var offset;
var icon;
var objMarker=null;
var markers;
var saveStrategy = null;
var currentFeature=null;
var selectedFeature = null;
var _complainantId=null;
var _complainantEmail=null;
var userTypeLofComplaint=null;
var _complaintType = null;
var editControls = null;
var wfs = null;
var wfs_del = null;
var objLayer = null;
var featPrefix = null;
var targetNamespace = null;
var geometryColName = null;
var isLogFeature=false;
var snap=null;
var dataPost = null;
var validationRuleParams = { required: false, number: false };
var editSelectionSymbolizer = {
		 "Point": {pointRadius: 4, graphicName: "square", fillColor: "#CC9900", fillOpacity: 1, strokeWidth: 1, strokeOpacity: 1, strokeColor: "#333333"}		};

var style = new OpenLayers.Style();
style.addRules([new OpenLayers.Rule({ symbolizer: editSelectionSymbolizer })]);
var styleMap = new OpenLayers.StyleMap({ "default": style });

var deleteSelectionSymbolizers = {
	    "Point": {pointRadius: 4, graphicName: "square", fillColor: "#ff0000", fillOpacity: 1, strokeWidth: 1, strokeOpacity: 1, strokeColor: "#ff0000"}
	};
var delStyle = new OpenLayers.Style();
delStyle.addRules([new OpenLayers.Rule({ symbolizer: deleteSelectionSymbolizers })]);
var delStyleMap = new OpenLayers.StyleMap({ "default": delStyle });
var isCptClosed=false;
SpatialVue.Complaints =  function(_map, _searchdiv)  {
    map = _map;
    searchdiv = _searchdiv;
    
    loadMapConfigurations();
    
	$("#tabs-Tool").empty();
	
	
        jQuery.get('resources/templates/viewer/publicComplaints.html', function(template) {
					
		addTab($._('Complaint'), template);
		
		$('#span-close').attr('title',$._('close_title'));
		
		jQuery("#complaint_accordion").accordion({fillSpace: false});
		$( "#complaint_accordion" ).accordion({
			autoHeight: false,
			navigation: true
		});
		publicComplaintLabelTranslations();
		addUserData();
		
		$("#btnMark").click(function() {			
		   toggleEditControl('point');					
		});

		$("#btnNew").click(function() {
			refreshLogComplaint();
		});
		
		
		//check for public user
		var userRole=loggedUser.roles;
		var roleLength=userRole.length;
		
		if (roleLength==1){
			if(userRole[0].name!=PUBLICUSER_ROLE){
				addComplainantLink();
			}else{
				$("#addComplaintLink").hide();
			}
		}else{
			addComplainantLink();
		}
		publicComplaintUserLabelTranslation();
    });
};

function publicComplaintLabelTranslations(){
	$('#log_complaint').html($._('Log_Complaint'));
	$('#complaint_details').html($._('Enter_Complaint_Details') + ' : ');
	$('#complaint_nature').html($._('complaint_nature'));
	$('#complaint_loc').html($._('complaint_location'));
	$('#btnSubmit').attr("value", $._('Submit'));
	$('#btnMark').attr("value", $._('Pin'));
	$('#btnNew').attr("value", $._('New'));
	
	$('#search_complaint').html($._('Search Complaints'));
	$('#search_complaintid').html($._('complaintid'));
	$('#btnSearch').attr("value", $._('Search'));
	$('#add_complainant').html($._('add_complainant'));
	$('#btnSubmitComplainant').attr("value", $._('Submit'));
}

function publicComplaintUserLabelTranslation(){
	$('#usercomplainantdetails').html($._('Complainant_Details') + ' : ');
	$('#usercomplainanttid').html($._('Complainant_ID'));
	$('#username').html($._('Name'));
	$('#useraddress').html($._('Address'));
	$('#userphone').html($._('Phone'));
	$('#usermobile').html($._('Mobile'));
	$('#useremail').html($._('EMail'));
	$('#userlanguage').html($._('Language'));
	
	$('#contact_user').html($._('contact_user'));
	$('#public_user').html($._('public_user'));
	$('#new_user').html($._('register_user'));
	$('#warden_user').html($._('warden_user'));
	$('#btnSubmitComplainant').attr("value", $._('Submit'));
	$('#userNames').append(jQuery("<option></option>").attr("value", "").text($._('please_select')));
}


function formatPhoneText(phone){
	number = $(phone).val(); 
	 number = number.replace(/\s/g, "");
	 if(number != undefined){
		 var regexLetter = /^[0-9]+$/;
		 if(regexLetter.test(number)){
			 _val = number.substring(0, 5);
			 _val = _val + " " + number.substring(5);
			 $(phone).val(_val);
		 }else{
			 //jAlert("Invalid Phone Number");
			 jAlert( $._('invalid_phone_number'), $._('alert'));
				$('#popup_ok').attr("value", $._('popupOk'));
		 }
	 }else{
		// jAlert("Invalid Phone Number");
	 }
}

function formatMobileText(mobile){
	number = $(mobile).val(); 
	 if(number!=""){
	 number = number.replace(/\s/g, "");
	 if(number != undefined){
		 var regexLetter = /^[0-9]+$/;
		 if(regexLetter.test(number)){
			 _val = number.substring(0, 5);
			 _val = _val + " " + number.substring(5);
			 $(mobile).val(_val);
		 }else{
			// jAlert("Invalid Mobile Number");
			 jAlert( $._('invalid_mobile_phone'), $._('alert'));
		    	$('#popup_ok').attr("value", $._('popupOk'));
		 }
	 }else{
		// jAlert("Invalid Mobile Number");
	 }
	}
}

function complaintLabelTranslations(){
	$('#complaintUnassociated').html($._('no_complaint_associated'));
	$('#complaintid').html($._('complaintid') + ' : ');
	$('#complainant_name').html($._('Complainant_name') + ' : ');
	$('#contact_details').html($._('contact_details') + ' : ');
	$('#complaint_language').html($._('Language') + ' : ');
	$('#complaint_reportedon').html($._('reported_on') + ' : ');
	$('#complaint_acknowledgeby').html($._('acknowledge_by') + ' : ');
	$('#complaint_acknowldegement_sent').html($._('acknowledgement_sent') + ' : ');
	$('#complaint_enquiry_type').html($._('enquiry_type') + ' : ');
	$('#complaint_nature').html($._('complaint_nature') + ' : ');
	$('#complaint_location').html($._('complaint_location') + ' : ');
	$('#complaint_recommendation').html($._('recommendation') + ' : ');
	$('#complaint_respond_by').html($._('respond_by') + ' : ');
	$('#complaint_signoff').html($._('signoff') + ' : ');
	$('#complaint_response_date').html($._('response_date') + ' : ');
	
	$('#cpt_edit').attr("value", $._('Edit'));
	$('#cpt_cancel').attr("value", $._('Cancel'));
	$('#cpt_save').attr("value", $._('Save'));
	
	$('#acknowledge').attr("title",$._('cpt_acknowledgement'));
	$('#parent_issue').attr("title",$._('go_to_parent_issue'));
	$('#locate_complaint').attr("title",$._('locate_on_map'));
	$('#create_cpt_issue').attr("title",$._('create_new_issue'));
	$('#close_complaint').attr("title",$._('close_complaint'));
	$('#add_to_existing_issue').attr("title",$._('add_issue_to_complaint'));
}

function refreshLogComplaint(){
	
	jQuery("#descLocTextLog").val('');
	jQuery("#complaintNatureTextLog").val('');	
	wfs.removeAllFeatures(true);  
	currentFeature=null;
}

function addUserData(){
		

	$.ajax({
    	type: "POST",
        url: "complaint/complainantDetails/",
		data: {user:loggedUser.email}, 
        async:false,
		success: function (complainantData) {           
            var publicUserData=complainantData;
            userTypeLofComplaint="publicUser";
            _complaintType = userTypeLofComplaint;
            addPublicUserData(publicUserData);            
        }

    });	
	
}
function addPublicUserData(publicUserData){
	jQuery("#userDetails").empty();	
	jQuery("#userDetailsTempl").tmpl(publicUserData).appendTo("#userDetails");	
	$("#userDetails :input").attr("disabled", true);
	if(userTypeLofComplaint=="publicUser"){
		_complainantId=publicUserData.complainantid;
		_complainantEmail=publicUserData.email;
	}else{
		_complainantId=publicUserData.contactid;
	}
	
}


function loadMapConfigurations(){
	

	wfs = map.getLayersByName("WFS")[0];
	if(wfs != undefined){
		map.removeLayer(wfs);
	}
	wfs_del = map.getLayersByName("WFS_DEL")[0];
	if(wfs_del != undefined){
		map.removeLayer(wfs_del);
	}
	deactivateControls();
	
	
	saveStrategy = new OpenLayers.Strategy.Save();
	
	var complaintLryName=getComplaintLryName();
	objLayer = map.getLayersByName(complaintLryName)[0];
	if(objLayer==null)
		return;
	
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

            layerType = 'Point';
            
            $("#resize").attr("disabled", true);
        	$("#reshape").attr("disabled", true);
        	$("#rotate").attr("disabled", true);
        	$("#removeVertex").attr("disabled", true);
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
    
    wfs = new OpenLayers.Layer.Vector(
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
        map.addLayers([wfs]);
        
		snap = new OpenLayers.Control.Snapping({
            layer: wfs,
            targets: [wfs],
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
        undoredo = new UndoRedo([wfs, wfs_del]);
        
        /*For Markup*/
        var lyrCount = map.getNumLayers();
        var cosmetic_protocol;
        for (var i = 0; i < lyrCount; i++) {
    
            	var typeName = layerMap[complaintLryName];            	
            	var cosmeticLayer = map.getLayersByName(complaintLryName)[0];
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
                    }
                });
            	break;
         
        }
	
	
	editControls = { 
	        point: new OpenLayers.Control.DrawFeature(
	                wfs, OpenLayers.Handler.Point, {
	                	displayClass:"olControlDefault",
	                    callbacks: {
	                        done: function (p) {
	                        	
	                        	if(_complainantId==null || _complainantId==""){
	                        		 jAlert('Please add any complainant first');
	                        	}else{
	                        	  	currentFeature = new OpenLayers.Feature.Vector(p);
		                        	wfs.removeAllFeatures(true);  
		                            wfs.addFeatures([currentFeature]);	               
		                            currentFeature.state = OpenLayers.State.INSERT;
		                        	wfs.events.triggerEvent("featureadded", {
		                        		feature : currentFeature
		                        	});
	                        	}
	                        		                        	
	                        }
	                    }
	           })
	    };
	
	
	for (var key in editControls) {
        map.addControl(editControls[key]);
    }
        
    saveStrategy.events.register('success', null, onSaveFeature);

	
	
}

function saveComplaint(){
	
  
	$("#logComplaints").validate({

        rules: {
        	complaintNatureTextLog: "required",
        	descLocTextLog: "required"            
        },
        messages: {
        	complaintNatureTextLog: $._('required_field'),
        	descLocTextLog: $._('required_field')
        }
    });

    if(currentFeature==null){
    	   //jAlert('Please pin-up the complaint');
    	
    	jAlert( $._('pinup_complaint_alert'), $._('alert'));
		$('#popup_ok').attr("value", $._('popupOk'));
    	   return;
    }
    
	    if ($("#logComplaints").valid()) {	
		
	    	fillFields();
	    	isLogFeature=true;
			saveStrategy.save();
			
	    }

}

function onSaveFeature(){
    wfs_del.removeAllFeatures(true);  
    undoredo.resetEditIndex();	    	
    objLayer.redraw(true);   
    
    if(isLogFeature){
    	isLogFeature=false;
    	var fid=currentFeature.fid;
		var gid=null;
		var complaintId=null;
		if(fid!=null && fid.search(".")>-1){
			
			gid=fid.substr(fid.indexOf(".")+1);
			jQuery.ajax({  
	    		type: "POST",
	            url: "complaint/complaintDetailsByGid/",
	    		data: {gid:gid}, 
	            async:false,
	            success: function (complaintData) { 	                	
	            	complaintId=complaintData.complaintid;
	            }
	         });
			
			sendMail(complaintId);			
			refreshLogComplaint();
			showComplaintList('P');
		}
    }
    
}

function searchComplaint(){		
	   
	   $("#searchComplaint").validate({

	        rules: {
	        	complaintSearchText: "required"      
	        }
	    });
	    
		if (!$("#searchComplaint").valid()) {
			return;
		}
	
		var complaintId=$("#complaintSearchText").val();		
        jQuery("#searchDetails").empty();		
        jQuery.ajax({  
    		type: "POST",
            url: "complaint/complaintDetails/",
    		data: {complaintId:complaintId, complainantid:_complainantId}, 
            async:false,
            success: function (complaintData) { 
            	if(complaintData.complaintid!=null){
            		complaintData.acknowledgeBy = convertDateToEuropeanFormat(complaintData.acknowledgeBy);
	            	complaintData.reportedOn = convertDateToEuropeanFormat(complaintData.reportedOn);
	            	complaintData.respondBy = convertDateToEuropeanFormat(complaintData.respondBy);
	            	complaintData.responseSent = convertDateToEuropeanFormat(complaintData.responseSent);
	            	complaintData.signedoff = convertDateToEuropeanFormat(complaintData.signedoff);
	            	
            		jQuery("#searchComplaintTmpl").tmpl(complaintData).appendTo("#searchDetails");
            		$("#searchDetails :input").attr("disabled", true);
            	}else{
            		jAlert($._('record_notfound'), $._('alert'));
            		$('#popup_ok').attr("value", $._('popupOk'));
            	}
        			
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                
                jAlert('Please try again');
            }
         });
        searchComplaintLabelTranslation();
}

function searchComplaintLabelTranslation(){
	$('#searchcomplaintdetail').html($._('Complaint_Details') + ' : ');
	$('#searchcomplaintnature').html($._('complaint_nature'));
	$('#searchdesclocation').html($._('complaint_location'));
	$('#searchreportedon').html($._('reported_on'));
	$('#searchacknowledgementon').html($._('complaint_closed'));
	$('#loc_complaint').html($._('locate_on_map'));
}

function showComplaintDetails(_complaintId,_complaintReportedOn){
	//complaintReportedOn=_complaintReportedOn;
	        var enqType=null;
			$("#tabs-Tool").empty();
			jQuery.get("resources/templates/viewer/complaints.html", function (template) {
				
				addTab($._('Complaints'),template);
				$('#span-close').attr('title',$._('close_title'));
				
				jQuery.ajax({  
		    		type: "POST",
		            url: "complaint/complaintDetails/",
		    		data: {complaintId:_complaintId}, 
		            async:false,
		            success: function (complaintData) { 
		            	
						isCptClosed=complaintData.resolveStatus;	//By Aparesh on 26/07/2012
						
						complaintData.acknowledgementSent = convertDateToEuropeanFormat(complaintData.acknowledgementSent);
		            	complaintData.acknowledgeBy = convertDateToEuropeanFormat(complaintData.acknowledgeBy);
		            	complaintData.reportedOn = convertDateToEuropeanFormat(complaintData.reportedOn);
		            	complaintData.respondBy = convertDateToEuropeanFormat(complaintData.respondBy);
		            	complaintData.responseSent = convertDateToEuropeanFormat(complaintData.responseSent);
		            	complaintData.signedoff = convertDateToEuropeanFormat(complaintData.signedoff);
		            	jQuery("#workcommitment_ComplaintsDetailsTmpl").tmpl(complaintData).appendTo("#workcommitment_ComplaintsDetailsBody");
		            	
						complaintReportedOn=complaintData.reportedOn;
						if(complaintData.issueid != null || complaintData.issueid != undefined){
							var s = $._('complaint_with_issue_assigned');
							s = s.replace('{x}',complaintData.issueid);
							$('#complaintAssociated').html($._(s));
						}
						
						if(complaintData.complaintNatureLkp!=null)
		            		enqType=complaintData.complaintNatureLkp.enquiryid;
		            	
		            	
		            	if(complaintData.publicUser!=null && (complaintData.publicUser.complainantid!=null || complaintData.publicUser.complainantid!="")){
							jQuery("#wc_comName").val(complaintData.publicUser.name);
							jQuery("#addressUser").val(complaintData.publicUser.address);
							jQuery("#language").val(complaintData.publicUser.languagePreference);
							jQuery("#complainantIdForAck").val(complaintData.publicUser.email);
						}else if(complaintData.contact!=null && complaintData.contact!=""){
							var data=complaintData.contact;		
							jQuery("#wc_comName").val(data.firstName+" "+data.surname);
							jQuery("#addressUser").val(data.address);
							jQuery("#complainantIdForAck").val(data.email);	
							/*$.ajax({
				    	    	type: "GET", 
				    	    	url: "contact/"+complaintData.contact.contactid,		
				    	        async:false,
				    			success: function (data) {   
				    				jQuery("#wc_comName").val(data.firstName+" "+data.surname);
									jQuery("#addressUser").val(data.address);
									jQuery("#complainantIdForAck").val(data.email);								
				    	        }

				    	    });*/
							
						}
		            	
		               	//hiding button in resolved complaints
		            	if(complaintData.resolveStatus){
		            		$("#btnUpdateComplaint").hide();
		            		$("#btnCancelComplaint").hide();
							$("#btnSaveComplaint").hide();
							$('.btn01').hide();
							$('.showComplaintLink').show();
							
					   	}
		            	
		            	complaintLabelTranslations();
		            },
		            error: function (XMLHttpRequest, textStatus, errorThrown) {
		                
		                jAlert('err.Message');
		            }
		         });

				$(function() {
			        $("#reportedOn").datepicker({ dateFormat: 'dd/mm/yy',
						changeMonth: true,
						changeYear: true
		            }).attr('readonly','readonly');
				});
				$(function() {
			        $("#respondBy").datepicker({ dateFormat: 'dd/mm/yy',
						changeMonth: true,
						changeYear: true
		            }).attr('readonly','readonly');
				});
				
				$("#workcommitment_ComplaintsDetailsTable :input").attr("disabled", true);
				
				
				$("#btnCancelComplaint").hide();
				$("#btnSaveComplaint").hide();
				
				
				$("#btnUpdateComplaint").click(function () {
					//$("#workcommitment_ComplaintsDetailsTable :input").removeAttr("disabled");	
					$("#typeEnq").attr('disabled', false);
					$("#recommendation").attr('disabled', false);
					
					if(isSuperUserRole){
						$("#natureOfComplaint").attr('disabled', false);
						$("#locationOfComplaint").attr('disabled', false);
					}
					
					$("#btnUpdateComplaint").hide();
					$("#btnCancelComplaint").show();
					$("#btnSaveComplaint").show();
					
				});
				
				$("#btnCancelComplaint").click(function () {
					//$("#workcommitment_ComplaintsDetailsTable :input").removeAttr("disabled");	
					$("#workcommitment_ComplaintsDetailsTable :input").attr("disabled", true);
					$("#btnUpdateComplaint").show();
					$("#btnCancelComplaint").hide();
					$("#btnSaveComplaint").hide();
					
				});
				
				
				$("#showissuelist").click(function () {
					showIssuesByComplaintId();				
				});
				
				$("#hrefShowParentIssue").click(function() {
					var issueId=null;
					issueId=$("#issueID").val();
					
					if(issueId!=null && issueId!=""){
						showIssueDetails(issueId, null);
					}else{
						jAlert('No issue has been associated with this complaint.');
					}
					
				});
				$("#hrefcreateComplaintIssue").click(function() {
					var issueId=null;
					var gid=$('#wc_gidID').val();
					var complaintID=$('#wc_complaintID').val();
					createComplaintIssue(gid,complaintID,complaintReportedOn);
				});
				
				jQuery.ajax({
		            url: "complaint/enquiries/",
		            async:false,
		            success: function (data) {
		            	var s = (lang=='en')?"Please select":"Dewisiwch";
		            	jQuery("#typeEnq").append(jQuery("<option></option>").attr("value", "-1").text(s));        
		            	jQuery.each(data, function (i, dataEnq) {    
		            		s = (lang=='en')?dataEnq.enquiryType:dataEnq.enquiryTypeWelsh;
							jQuery("#typeEnq").append(jQuery("<option></option>").attr("value", dataEnq.enquiryid).text(s));        
						});     
		            	
		            }
		        });
				if(enqType!=null)
				   jQuery("#typeEnq").val(enqType);
				else
					jQuery("#typeEnq").val("");
				
				//
				
				
				
			});
			
	
}

function showComplaintList(_filter){
	
	$('#workcommitment_ComplaintsTableBody').empty();
		
	jQuery.ajax({type: "POST",
		url: "complaint/complaintsData/",
		data: {category:_filter,email:loggedUser.email}, 
		async:false,
		success: function (data) {	
			var isAdmin;
			if(roles.indexOf('ROLE_ADMIN')> -1){
				isAdmin = "admin";
			}else if(roles.indexOf('ROLE_USER')> -1){
				isAdmin = "user";
			}else{
				isAdmin = "public_user";
			}
			if(isAdmin != "public_user"){
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
					hideWorkcommitmentLink();
					$('.clsassigncpt').attr("title", $._('assign_complaint'));
					$("#workcommitment_ComplaintsTable").tablesorter();			
				}
			}
		}
	});
	
}

function showComplaintOnMap(){
	var complaintID=$('#wc_complaintID').val();	
	zoomToComplaintOnMap(complaintID);	
}


function zoomToComplaintOnMap(complaintID){
	
	//var complaintLryName=getComplaintLryName();
	var complaintLryName=COMPLAINTLAYER_NAME;
	var fieldName="complaintid";
	var fieldVal=complaintID;
	var layerType = 'Point';
	$("#tab").tabs( "select" , 0 );
	zoomToLayerFeature(complaintLryName,layerType,fieldName,fieldVal);

}


SpatialVue.Editing.prototype.Unregister = function () {
    saveStrategy.deactivate();
    
    if(undoredo != null)
        undoredo.resetEditIndex();

    if(wfs != undefined){
	    
	    deactivateControls();

	    wfs.removeAllFeatures(true);
	    wfs_del.removeAllFeatures(true);

	    map.removeLayer(wfs);
	    map.removeLayer(wfs_del);

    }

   
    saveStrategy.destroy();
    saveStrategy = null;
}


toggleEditControl = function(element) {
	
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


function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

function fillFields(){
	
	if(currentFeature==null)
		return;
	var natureComplaint=jQuery("#complaintNatureTextLog").val();
	var descLoc=jQuery("#descLocTextLog").val();
	var respondByDate=null;
	var ackByDate=null;
	
	
			
	    var D=new Date();  
 		
 		Date.prototype.toDDMMYYYYString = function () {return isNaN (D) ? 'NaN' : [D.getFullYear(), D.getMonth() > 8 ? D.getMonth() + 1 : '0' + (D.getMonth() + 1),D.getDate() > 9 ? D.getDate() : '0' + D.getDate()].join('-')}
 		var currentDate=new Date().toDDMMYYYYString();
	
	jQuery.ajax({
		   type: "POST",
		   url: STUDIO_URL +"tasksScheduler/",
		data: {taskName:COMPLAINTS_TASK}, 
		async:false,
		success: function (data) {

		var r = new Array(), j = -1;         	  
	     for (var key=0, size=data.length; key<size; key++) {
	    	 
	    	 if(data[key][0]==COMP_ACK){
	    		 ackByDate=businessDays(data[key][2],currentDate);  
	    	 }else if(data[key][0]==COMP_RES){
	    		 respondByDate=businessDays(data[key][2],currentDate);  
	    	 }
	     }
		}
	 });
	
	if (currentFeature.attributes) {
		currentFeature.attributes['complaint_enquiry_nature']=natureComplaint;
		currentFeature.attributes['complaint_enquiry_location']=descLoc;
		//if(userTypeLofComplaint=="publicUser"){
		if(_complaintType=="publicUser"){
			currentFeature.attributes['complainantid']=_complainantId;	
			if(_complainantEmail!=loggedUser.email){
			currentFeature.attributes['assigned_to']=loggedUser.email;			
			}
		}else{
			currentFeature.attributes['contactid']=_complainantId;
			currentFeature.attributes['assigned_to']=loggedUser.email;
		}		
		currentFeature.attributes['respond_by']=respondByDate;
		currentFeature.attributes['reported_on']=currentDate;		
		currentFeature.attributes['acknowledge_by']=ackByDate;	
		currentFeature.attributes['resolve_status']=false;	
	} else {
    	currentFeature.feature.attributes['complaint_enquiry_nature']=natureComplaint;
    	currentFeature.feature.attributes['complaint_enquiry_location']=descLoc;    		
    	//if(userTypeLofComplaint=="publicUser"){
    	if(_complaintType=="publicUser"){
    		currentFeature.feature.attributes['complainantid']=_complainantId;	
    		if(_complainantEmail!=loggedUser.email){
				currentFeature.attributes['assigned_to']=loggedUser.email;			
			}
    		
		}else{
			currentFeature.feature.attributes['contactid']=_complainantId;	
			currentFeature.attributes['assigned_to']=loggedUser.email;
		}
    	currentFeature.feature.attributes['respond_by']=respondByDate;	
    	currentFeature.feature.attributes['reported_on']=currentDate; 
    	currentFeature.feature.attributes['acknowledge_by']=ackByDate; 
    	currentFeature.attributes['resolve_status']=false;
	}
	
	
}

function loadComplaintEnquiry(){
	
	jQuery.ajax({
        url: "project/?" + token,
        async:false,
        success: function (data) {
        	user_ProjectList = data;      
        	
        }
    });
	
}

function getEmailId(_complainantName){
	var _emailTo=null;
	$.ajax({
    	type: "GET", 
    	url: STUDIO_URL +"user/"+_complainantName ,		
        async:false,
		success: function (complainantData) {           
            
			_emailTo=complainantData.email;
        }

    });	
	return _emailTo;
}

function showAckForm(){
	
	var _complaintId=$('#wc_complaintID').val();
	var _responceBy=$('#wc_respondBy').val();	
	var _emailTo=$('#complainantIdForAck').val();
	
	$("#tabs-Tool").empty();
	jQuery.get("resources/templates/viewer/standardAckMail.html", function (template) {
		
		addTab($._('Complaint_acknowlege_mail'),template);
		$('#span-close').attr('title',$._('close_title'));
		
		jQuery("#ackMailTmpl").tmpl().appendTo("#ackMailBody");
		$('#complaintIdForAck').val(_complaintId);
		$('#mailTo').val(_emailTo);	
		$("#mailTo").attr('disabled', true);
		$('#subjectVal').val("Eryri - Ymholiad Hawliau Tramwy / Snowdonia - Rights of Way enquiry");
		
		jQuery.ajax({  
	 		type: "POST",
	         url: "complaint/standardAckMailTempl/",
	 		 data: {complaintId:_complaintId,respondBy:_responceBy}, 
	         async:false,
	         success: function (data) { 	 
	        	 var messageData=data;
	        	 //messageData=replaceString(messageData, /?/gi, ''');
	        	// messageData = messageData.replace(/?/g, "�");
	        	 $('#messageVal').val(messageData);
	        	 
	         }
	      });
		translateAcknowledgeFormStrings();
		
													
	});
}

function translateAcknowledgeFormStrings(){
	$('#ack_mailto').html($._('mail_to'));
	$('#ack_subject').html($._('subject'));
	$('#ack_msg').html($._('message'));
	$('#ack_submit').attr("value", $._("Submit"));
}

function saveStandardAckForm(){
	
	var _complaintId=$('#complaintIdForAck').val();
	   $("#standardAckForm").validate({

	        rules: {
	        	mailTo: "required", 
	        	subjectVal: "required",
	        	messageVal: "required"  
	        },
	        messages: {
	        	mailTo: $._('enter_email')
	        }
	    });
	    
		if ($("#standardAckForm").valid()) {
			var mailTo=$('#mailTo').val();	
			 if ( $.trim(mailTo) == "" )
			    {
			        jAlert('Please enter mail to');
			        return;
			    }
			
			var subject=$('#subjectVal').val();
			var msg=$('#messageVal').val();
			
			jQuery.ajax({  
		 		type: "POST",
		         url: "complaint/sendStandardAckMail/",
		 		 data: {complaintId:_complaintId,mailTo:mailTo,subject:subject,msg:msg}, 
		         async:true,
		         success: function () { 	                	
		        	 jAlert($._('acknowledgement_success'), $._('alert'));  
		        	 $('#popup_ok').attr("value", $._('popupOk'));
		        	 showComplaintDetails(_complaintId);
		         }
		      });
		}else{
			return;
		}
  }

function sendMail(_complaintId){
	
	var name=$('#complainantNameLog').val();
	var email=$('#complainantEmailLog').val();
	 jQuery.ajax({  
 		type: "POST",
         url: "complaint/sendLogComplaintMail/",
 		 data: {complaintId:_complaintId,complainantEmail:email,complainantName:name}, 
         async:false,
         success: function () { 
        	 //jAlert('Complaint has been logged successfully. Complaint id is '+ _complaintId);
        	 jAlert( $._('complaint_logged_successfully_alert') + ' ' + _complaintId, $._('alert'));
				$('#popup_ok').attr("value", $._('popupOk'));
         }
      });
	 
	
}



function updateComplaint(){
	$('#wc_complaintID').attr("disabled", false);
	jQuery.ajax({
        type: "POST",              
        url: "complaint/update" + "?" + token,
        data: jQuery("#complaintDetailForm").serialize(),
        async:false,
        success: function () {  
            jAlert($._('complaint_updated'), $._('Complaint'));  
            $('#popup_ok').attr("value", $._('popupOk'));
        }
    });
	$('#wc_complaintID').attr("disabled", true);
	$("#workcommitment_ComplaintsDetailsTable :input").attr("disabled", true);
	$("#btnUpdateComplaint").show();
	$("#btnCancelComplaint").hide();
	$("#btnSaveComplaint").hide();
}

function zoomToAnyFeature(layer,geom,fieldName,fieldVal,_actualLyrName) {
	
	var bounds = null;
	var filters = [];
	clearSelection(false);
	var complaintId=null;
	var features = [];

		/* Applying filter for selected features */
		eval("var filter = new OpenLayers.Filter.Comparison({type: OpenLayers.Filter.Comparison.EQUAL_TO, property: fieldName, value: fieldVal});");
		filters[0] = eval(filter);
		var vector = new OpenLayers.Feature.Vector(geom);
		features.push(vector);
		bounds = geom.getBounds();

	var cloneLayer = layer.clone();
	cloneLayer.setName("clone");
	map.addLayer(cloneLayer);
	
	var filterJoin=filters;	
	var sld = createHighlightSLD(cloneLayer, filterJoin);

	// Post the SLD
	$.ajax({
		type : 'POST',
		url : "theme/createSLD",
		dataType : "text",
		async:false,
		data : {
			data : escape(sld)
		},
		success : function(result) {

			// /*For removing additional quotes*/
			cloneLayer.mergeNewParams({
				SLD : result
			// STYLES: 'multiple_rules'
			});
			cloneLayer.redraw(true);
		},
		error : function(xhr, status) {
			jAlert('Sorry, there is a problem!');
		}
	});

	/* Store the selected record filter in global object for drill-down query */
	featureSelection = new Object();
	featureSelection.layerName = _actualLyrName;
	featureSelection.filter = filterJoin;
	featureSelection.features = features;

	if(bounds.left == bounds.right && bounds.top == bounds.bottom){
		 var lonlat = new OpenLayers.LonLat(bounds.left, bounds.top);
		map.setCenter(lonlat, map.baseLayer.resolutions.length - 2, false, false);
	}else{
		map.zoomToExtent(bounds, false);
	}

}

function zoomToLayerFeature(relLayerName,layerType,fieldName,fieldVal){
	
	
	var layer = map.getLayersByName(relLayerName)[0];
	
	if(layer==null)
		return;
	
	lyrType=layerType;
	var url=map.getLayersByName(relLayerName)[0].url;
	var layerName=layerMap[relLayerName];
	var type;	
	var featureNS=getFeatureNS(relLayerName,url);
	var prefix;	
	var geomFieldName;
	var featuresGeom=null;
	
	
	var pos = layerName.indexOf(":");
	prefix = layerName.substring(0, pos);
	type = layerName.substring(++pos);
	
	var filters=getFilter(fieldName,fieldVal);
	var filter_1_0 = new OpenLayers.Format.Filter({
			version : "1.1.0"
		});

	createXML();
	var xml = new OpenLayers.Format.XML();
			var xmlFilter = xml.write(filter_1_0.write(filters));
			dataPost = dataPost.replace("${layer}", "\"" + layerName + "\"");
			dataPost = dataPost.replace("${featureNS}", "\"" + featureNS + "\"");
			dataPost = dataPost.replace("${filter}", xmlFilter);
			dataPost = dataPost.replace("${uniqueFld}", fieldName);
		    dataPost = dataPost.replace("${SortOrder}", "ASC");
			

		var mapProj = map.projection;
		var reverseCoords = true;
		if (mapProj == "EPSG:4326") {
			reverseCoords = false;
		}

		$.ajax({
					url : PROXY_PATH + url,
					dataType : "xml",
					contentType : "text/xml; subtype=gml/3.1.1; charset=utf-8",
					type : "POST",
					data : dataPost,
					success : function(data) {
						
						var gmlFeatures = new OpenLayers.Format.WFST.v1_1_0({
							xy : reverseCoords,
							featureType : type,
							gmlns : 'http://www.opengis.net/gml',
							featureNS : featureNS,
							geometryName : geomFieldName, 
							featurePrefix : prefix,
							extractAttributes : true
						}).read(data);
						
						if(gmlFeatures.length>0){
						   featuresGeom=gmlFeatures[0].geometry;
						   zoomToAnyFeature(layer,featuresGeom,fieldName,fieldVal,relLayerName);
						}else{
							jAlert("No records found");
						}
	               }
	      });
			
}

function getFilter(fieldName,fieldVal) {
	var filter;
	var filters;

		filter = new OpenLayers.Filter.Comparison({
			type : OpenLayers.Filter.Comparison.GREATER_THAN,
			property : fieldName,
			value : "0"
		});
	    var queryFilter=getQueryFilter(fieldName,fieldVal);
		if (queryFilter != null) {
			filters = new OpenLayers.Filter.Logical({
				type : OpenLayers.Filter.Logical.AND,
				filters : [ filter, queryFilter ]
			});
		} else {
			filters = filter;
		}
	

	return filters;
}

function getQueryFilter(fieldName,fieldVal){
	
	eval("var filter = new OpenLayers.Filter.Comparison({type: OpenLayers.Filter.Comparison.EQUAL_TO, property: fieldName, value: fieldVal});");
	 return eval("filter");
}

function getFeatureNS(layerName,url){
	if(url==null)
		return url;
	var _wfsurl = url.replace(new RegExp( "wms", "i" ), "wfs");
	var _wfsSchema = _wfsurl + "request=DescribeFeatureType&version=1.1.0&typename=" + layerMap[layerName];		
	var featureNS;
	$.ajax({
	    url: PROXY_PATH + _wfsSchema,
	    dataType: "xml",
	    async:false,
	    success: function (data) {
	        var featureTypesParser = new OpenLayers.Format.WFSDescribeFeatureType();
	        var responseText = featureTypesParser.read(data);	      
	        featureNS = responseText.targetNamespace;	        
	    }
	});
	return featureNS;
}

function getComplaintLryName(){
	var complaintLryName=null;
	$.ajax({
    	type: "GET", 
    	url: "complaint/complaintLayerName/",		
        async:false,
		success: function (data) {   
			complaintLryName=data;
        }

    });	
	return complaintLryName;
}

function addComplainantLink(){
	
	jQuery("#addComplaintBody").empty();	
	jQuery("#addComplaintTempl").tmpl().appendTo("#addComplaintBody");
	jQuery("#listUser").show();
	jQuery("#addNewUserByWarden").hide();
	jQuery("#complaint_accordion").accordion("option", "active", 2);
	var radios = document.forms["addComplainantDetails"].elements["userTypes"];
	for(var i = 0, max = radios.length; i < max; i++) {
	    radios[i].onclick = function() {
	    	if(this.value=="contactUser"){
	    		jQuery("#listUser").show();
	    		jQuery("#userNames").show();
	    		jQuery("#addUserByWarden").hide();
	    		$.ajax({
	    	    	type: "GET", 
	    	    	url: "listcontact/",		
	    	        async:false,
	    			success: function (data) {  
	    				userTypeLofComplaint="contactUser";
	    				$('#userNames').empty();
	    				jQuery("#userNames").append(jQuery("<option></option>").attr("value", "-1").text($._('please_select')));
	    				jQuery.each(data, function (i, user) {    	
	    					if(user.email!=null)
	    					//jQuery("#userNames").append(jQuery("<option></option>").attr("value", user.contactid).text(user.email));
	    					//By Aparesh, for addding name with email in username dropdown
	    						jQuery("#userNames").append(jQuery("<option></option>").attr("value", user.contactid).text(user.firstName+' '+user.surname+'('+user.email +')'));	
	    				});
	    	        }

	    	    });
	    		
	    		
	    	}else if(this.value=="publicUser"){
	    		jQuery("#listUser").show();
	    		jQuery("#userNames").show();
	    		jQuery("#addUserByWarden").hide();
	    		$.ajax({
	    	    	type: "GET", 
	    	    	url: "complaint/publicUsersList/",		
	    	        async:false,
	    			success: function (data) {   
	    				userTypeLofComplaint="publicUser";
	    				$('#userNames').empty();
	    				jQuery("#userNames").append(jQuery("<option></option>").attr("value", "-1").text($._('please_select')));        
	    				jQuery.each(data, function (i, user) {   	 
	    					if(user.email!=null)
	    					jQuery("#userNames").append(jQuery("<option></option>").attr("value", user.complainantid).text(user.name+'('+user.email +')'));        
	    				});
	    	        }

	    	    });
	    		
	    	}else if(this.value=="createUser"){
	    		if(lang == 'cy'){
	    			window.location="../register?lang=cy";
	    		}else{
	    			window.location="../register?lang=en";
	    		}
	    	}else if(this.value=="wardenUser"){
	    		jQuery("#listUser").hide();
	    		jQuery("#userNames").hide();
	    		jQuery("#addUserByWarden").show();
	    		jQuery("#addUserByWarden").empty();
	    		jQuery("#addNewUserByWardenTmpl").tmpl().appendTo("#addUserByWarden");
	    		
	    		//Translate the form
	    		$('#userdetl_bywarden').html($._('user_details') + ' : ');
	    		$('#username_bywarden').html($._('Name'));
	    		$('#address_bywarden').html($._('Address'));
	    		$('#phone_bywarden').html($._('Phone'));
	    		$('#mobile_bywarden').html($._('Mobile'));
	    		$('#email_bywarden').html($._('EMail'));
	    		$('#language_bywarden').html($._('Language'));
	    		$('#btnregister').attr("value", $._('Submit'));
	    		$('#langpref').append(jQuery("<option></option>").attr("value", "English").text($._('lang_eng')));
	    		$('#langpref').append(jQuery("<option></option>").attr("value", "Welsh").text($._('lang_cy')));
	    	}
	    }
	}
}


function addComplainant(){
	
	var userId=jQuery("#userNames").val();	
	if(userId==-1){
		jAlert('Please select any complainant');
	}else{
		
		if(userTypeLofComplaint=="publicUser"){		
			
			$.ajax({
    	    	type: "GET", 
    	    	url: "complaint/complainantDetails/"+userId,		
    	        async:false,
    			success: function (user) {    				
    				addPublicUserData(user);
    				_complaintType = userTypeLofComplaint;
    				publicComplaintUserLabelTranslation();
    				jAlert('Complainant details added');
    	        }

    	    });
			
			
		}else if(userTypeLofComplaint=="contactUser"){
			
			$.ajax({
    	    	type: "GET", 
    	    	url: "contact/"+userId,		
    	        async:false,
    			success: function (user) {    				
    				addPublicUserData(user);			
    				jQuery("#complainantIDText").val(user.contactid);
    				jQuery("#complainantNameLog").val(user.firstName+" "+user.surname);
    				jQuery("#phone").val(user._primary_phone_);
    				_complaintType = userTypeLofComplaint;
    				publicComplaintUserLabelTranslation();
    				jAlert('Complainant details added');
    	        }

    	    });
			
			
		}
		
	}
	
	
}

function saveUserAddedbyWarden(){
	
	 $("#addNewPublicUser").validate({

	        rules: {
	        	name: "required",
	        	address : "required",
	        	//mobile : "required",
	        	langpref : "required",
	        	phone : {
	        		required: true
	        	},
	        	email: {
	                required: true,
	                email: true
	            }
	        },
	        messages: {
	        	//name: "Please enter Name",
	        	name: (lang =='cy')?"Nodwch eich Enw os gwelwch yn dda." : "Please enter Name.",
	        	
	        	//address: "Please enter address",
	        	address: (lang =='cy')?"Nodwch eich cyfeiriad os gwelwch yn dda." : "Please enter address.",
	        	
	        	//langpref: "Please enter lang pref",
	        	langpref: (lang =='cy')?"Dewiswch iaith os gwelwch yn dda." : "Please select Language.",
	        	
	        	//phone: "Please enter phone no",
	        	phone: (lang =='cy')?"Nodwch eich rhif ff�n  os gwelwch yn dda." : "Please enter Phone no.",
	        			
	        	//email: "Please enter email"
	        	email: (lang =='cy')?"Nodwch eich e-bost os gwelwch yn dda" : "Please enter email."
	        }
	    });

	    
	    
	    if (!$("#addNewPublicUser").valid()) {
	    	return;
		}
	    else{
	   		jQuery.ajax({
	        type: "POST",              
	        url: "publicuser/warden/register",
	        data: jQuery("#addNewPublicUser").serialize(),
	        success: function (data) {
	        	if(data!=null){
	        		if(data.email == null || data.email == undefined){
	        			jAlert($._('wardenid_missing'), $._('register'));
	        			$('#popup_ok').attr("value", $._('popupOk'));
	        		}else{
		        		jAlert($._('user_registration_success'),  $._('register'));
		        		$('#popup_ok').attr("value", $._('popupOk'));
		        		jQuery("#addNewUserByWarden").hide();
		        		 userTypeLofComplaint="publicUser";
		                addPublicUserData(data);
	        		}
	        	}else{
	        		jAlert($._('wardenid_missing'), $._('register'));
        			$('#popup_ok').attr("value", $._('popupOk'));
	        	}
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	        	jAlert('Please try again ','Register');	        	 
	        }
	    });
	    }
		
}

//closing a complaint

function showClosingComplaintMailForm(){
	
	var _complaintId=$('#wc_complaintID').val();
	var _responceBy=loggedUser.name;	
	var _emailTo=$('#complainantIdForAck').val();
	
	$("#tabs-Tool").empty();
	jQuery.get("resources/templates/viewer/standardAckMail.html", function (template) {
		
		addTab($._('close_cpt_mail'),template);
		$('#span-close').attr('title',$._('close_title'));
		
		jQuery("#closeMailTmpl").tmpl().appendTo("#closeMailBody");
		
		$('#search_issue').html($._('assignissuesearch') + ' : ');
		
		jQuery("#closecpt_mailto").html($._('mail_to') + ' : ');
		jQuery("#closecpt_sub").html($._('subject') + ' : ');
		jQuery("#closecpt_msg").html($._('message') + ' : ');
		
		$('#btnSubmitCloserComp input').val($._('Submit'));
		
		
		$('#complaintIdForClosing').val(_complaintId);
		$('#mailTo').val(_emailTo);	
		$("#mailTo").attr('disabled', true);
		//$('#subjectVal').val("Closing Mail");
		
		jQuery.ajax({  
	 		type: "POST",
	         url: "complaint/standardClosingMailTempl/",
	 		 data: {complaintId:_complaintId,respondBy:_responceBy}, 
	         async:false,
	         success: function (data) {
	        	 var messageData=data.split("|");
	        	 //var messageData=data;	        	
	        	 $('#messageVal').val(messageData[0]);
	        	 $('#subjectVal').val(messageData[1]);
	         }
	      });
		
		
													
	});
}


function closeComplaint(){
	
	var _complaintId=$('#complaintIdForClosing').val();
	   $("#closeComplaintForm").validate({

	        rules: {
	        	mailTo: "required", 
	        	subjectVal: "required",
	        	messageVal: "required"  
	        },
	        messages: {
	        	mailTo: $._('enter_email')
	        }
	    });
	    
		if ($("#closeComplaintForm").valid()) {
			var mailTo=$('#mailTo').val();	
			 if ( $.trim(mailTo) == "" )
			    {
			        jAlert('Please enter mail to');
			        return;
			    }
			
			var subject=$('#subjectVal').val();
			var msg=$('#messageVal').val();
			
			jQuery.ajax({  
		 		type: "POST",
		         url: "complaint/close/",
		 		 data: {complaintId:_complaintId,mailTo:mailTo,subject:subject,msg:msg}, 
		         async:true,
		         success: function () { 	                	
		        	 //jAlert('Complaint closed successfully.');  		        	 
		        	 jAlert( $._('cpt_close_success'), $._('alert'));
		 			 $('#popup_ok').attr("value", $._('popupOk'));
		        	 
		        	 showComplaintList("P");
		        	 showComplaintDetails(_complaintId);
		         }
		      });
		}else{
			return;
		}
  }

function reassignComplaint(_complaintId,aggignedEmail){
			
	$("#tabs-Tool").empty();
	jQuery.get("resources/templates/viewer/complaintReassign.html", function (template) {
		
		addTab($._('assign_complaint'),template);
		
		$('#span-close').attr('title',$._('close_title'));
		jQuery.ajax({type: "GET",
			url: STUDIO_URL + "workcommitment/reassign/"+loggedUser.functionalRole+"/"+loggedUser.id,
			async:false,
			success: function (data) {		
				jQuery("#workcommitment_ComplaintReassignTmpl").tmpl().appendTo("#workcommitment_ComplaintReassignBody");
				jQuery.each(data, function (i, dataType) {    	
					jQuery("#complaintReAssignTo").append(jQuery("<option></option>").attr("value", dataType.email).text(dataType.name));        
			 });
			jQuery("#complaintReAssignTo").val(aggignedEmail);	
			}
		});
		//jQuery("#reassign-issueId").html("Re-assign Issue id "+ _issueId+ " to User :");	
		jQuery("#reassign-ComplaintId").html("Re-assign Complaint id "+ _complaintId+ " to User :");		
		$('#btnReAssignSurvey input').val($._('Save'));
		jQuery("#hid-complaintId").val(_complaintId);
		
						
													
	});
	
	
	
}


function saveReassignComplaint(){

var emailId=jQuery("#complaintReAssignTo").val();
var complaintID=jQuery("#hid-complaintId").val();


if(emailId!="" && complaintID!=""){


		jQuery.ajax({type: "POST",
			url: "complaint/updateassignto",
		data: {wc_complaintID:complaintID,assigntoemail:emailId}, 
		async:false,
		success: function (data) {	
			if(data){				
				showComplaintList('P');
				jAlert("Complaint has been assigned successfully");	
				closeDialog('complaintReassigndiv');
			}
			else{
				jAlert("There is some problem");
			}
		}
	});
}
else if(emailId=="") {
	jAlert("Please Select User");
	return;
}
else if(complaintID==""){
	jAlert('There is some problem');
	return;
}
}