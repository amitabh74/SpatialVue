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

var map;

var searchdiv;
var uploadFilepath=null;
var associationIds=null;
var uploadFilename=-null;

SpatialVue.FileUpload = function (_map, _searchdiv) {
   
    map = _map;
    searchdiv = _searchdiv;
    showResultsinDialog = true;
    var _layer=layer;
    var _associationIds=associationIds;
	var serverurl=window.location.protocol+'//'+window.location.host+window.location.pathname;	
	//removeChildElement("sidebar", "layerSwitcherContent");
	
    //$("#layerSwitcherContent").hide();

	$("#tabs-Tool").empty();
	
	
	$.ajax({ 
		type: "POST",
		url: STUDIO_URL + "attachment/layer/"+_layer.name+ "?" + token,
		data: {ids:_associationIds},
		success: function (attachedFiles) {					
			$("#AttchFileListBody").empty();
			
			var htmlStr = '';
						
			$.each(attachedFiles, function (key, val) {
                 	var filepath=serverurl+val.filepath
					
					htmlStr = htmlStr + '<tr id="' + _layer.name+'_'+val.attachmentId.associationid+ '"><td align="left" class="padcellup">'+val.attachmentId.associationid+'</a></td>';
					htmlStr = htmlStr + '<td align="left" class="padcellup"><a href="'+filepath+'" target="_blank">'+val.filename+'</a></td>';		
					htmlStr = htmlStr+'<td align="center" class="padcellup"><a href="#" OnClick="deleteUploadFile('+"'"+_layer.name+"'"+','+"'"+val.attachmentId.associationid+"'"+');"><img src="resources/images/delete.png" boder="0"></a></td></tr>';
					
            });
			jQuery('#AttchFileListBody').append(htmlStr);
			
		}
	});
	
	
	
	jQuery.get('resources/templates/viewer/fileupload.html', function(template) {
    	
    	//$("#" + searchdiv).append(template);
		//Add tad
		addTab('File Upload',template);
		
		$('#span-close').attr('title',$._('close_title'));
		
		$("#fileupload-help").tipTip({defaultPosition:"right"});
				
    	jQuery.get('fileupload', function (template1) {
    		
    		$("#uploadDiv").append(template1);
	        
			
	        $('<input type="hidden" name="ajaxUpload" value="true" />').insertAfter($("#file"));
					$("#fileuploadForm").attr("action", "fileupload?"+ token);
					$("#fileuploadForm").ajaxForm({ 
						success: function(filepath_name) {
							
							if(filepath_name.indexOf("HTTP Status 500") != -1){
								//jAlert('File size is greater than permissible limit');								
								$('#errmsg').html('File size is greater than permissible limit');
							}else{
								$('#errmsg').html('');
								filepath_name=filepath_name.replace("<PRE>","");
								filepath_name=filepath_name.replace("</PRE>","");
								
								var pathArr=filepath_name.split("|");											
								
								uploadFilepath=pathArr[0];
								uploadFilename=pathArr[1];
	
								var selRow = $('#tablegrid1').jqGrid('getGridParam', 'selarrrow');
	
								var fieldVal = featureGeom[selRow[0] - 1][1]; 							
								
									var filename=uploadFilename;
									var associationid=fieldVal;
									var layername=_layer.name;
									var keyfield=uniqueField;								
									var desc=$('#fileDesc').val();
									var filepath=uploadFilepath;
									var extension=/[^.]+$/.exec(filename)[0];
									
									//set the hidden field
									
									$('#associationid').val(associationid);
									$('#layername').val(layername);
									$('#keyfield').val(keyfield);
									$('#filename').val(filename);
									$('#filepath').val(filepath);
									$('#extension').val(extension);
																
									if(jQuery("#"+layername+"_"+associationid).length==0){		
									
										$.ajax({ 
											type: "POST",
											url: STUDIO_URL + "attachment/create" + "?" + token,
											data: $("#fileuploadForm").serialize(),
											success: function (fileurl) {																		
											var _fileurl=serverurl+fileurl;
											
											var markup="";
											markup = markup + '<tr id="' + layername+'_'+associationid+ '"><td align="left" class="padcellup">'+associationid+'</a></td>';									
											markup = markup + '<td align="left" class="padcellup"><a href="'+_fileurl+'" target="_blank">'+filename+'</a></td>';
											markup = markup+'<td align="center" class="padcellup"><a href="#" OnClick="deleteUploadFile('+"'"+layername+"'"+','+"'"+associationid+"'"+');"><img src="resources/images/delete.png" boder="0"></a></td></tr>';
											
											
											
											jQuery('#AttchFileListBody').append(markup);
											//add row
											}
										});
									
									}
									else{
																		
									 jAlert('Already Added, Please Delete the file then Add','File Upload');
									}
									attachmentLabelTranslations();
							}
								
						},
						error: function (xhr, status) {
				            jAlert('File size is greater than permissible limit');
				        }
					});
	
	    });
    
    });
    
};


function parseUploadedFile() {
	var _uploadFilepath=uploadFilepath	
	var lat= $('#latitude').val()
	var lon =$('#longitude').val();
	
	if(lat && lon){
		if(lat != lon){
			
			$.ajax({ 
				url: "parseFile/",
				type: "POST",
				data: { filePath: _uploadFilepath, seperator:",",latitude:lat,longitude:lon},
				success: function (colName) {
					
				}
			});
			
			
		}
		else{
			alert('Please select different columns for Latitude and Longitude');
		}


	}
	else{

	 alert('Please select Latitude and Longitude fields.');
	}

	
}

function deleteUploadFile(layername,associtionid){
	//var r=confirm("Do you want to Delete Association id: "+associtionid);
	jConfirm('Are You Sure You Want To Delete : <strong>' + associtionid + '</strong>', 'Delete Confirmation', function (response) {
	
	if (response==true)
	{
		$.ajax({ 
			type: "POST",
			url: STUDIO_URL + "attachment/delete"+ "?" + token,
			data: {layer:layername,associationId:associtionid},
			success: function (resp) {								
				
				
				jQuery('#'+layername+'_'+associtionid).remove();
				
			}
		});
	}
	else
	{
	  return;
	}
	
	});
}
