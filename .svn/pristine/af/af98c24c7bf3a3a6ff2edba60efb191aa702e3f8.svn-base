/* ----------------------------------------------------------------------
\ * Copyright (c) 2011 by RMSI.
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

var contactTypes=null;
function showContactDetails(_contactid){
	
			$("#tabs-Tool").empty();
			jQuery.get("resources/templates/viewer/contact.html", function (template) {			
			addTab($._('contact'),template);
			
			$('#span-close').attr('title',$._('close_title'));
			var contactDetail;
				jQuery.ajax({
				url: "contact/"+_contactid,
				async:false, 
				success: function (data) {
		        	 contactDetail = data;
		         }
			 });
			 var contactType;
			 jQuery.ajax({
		            url: "contact/type",
		            async:false,
		            success: function (data) {
		            	contactType = data;      
		            	
		            }
		        });
			 
			
			 jQuery("#ContactInfo_DetailsBody").empty();
			 jQuery("#contactInfo_DetailsTmpl").tmpl(contactDetail).appendTo("#ContactInfo_DetailsBody");
			 
			  jQuery.each(contactType, function (i, ctype) {    	
				  //jQuery("#contactType").append(jQuery("<option></option>").attr("value", ctype.contacttypeid).text(ctype.contactType));
				  jQuery("#contactType").append(jQuery("<option></option>").attr("value", ctype.contacttypeid).text($._(ctype.contactType)));
			  });
				
			  
			  
				$("#contactInfoTable :input").attr("disabled", true);
				
				$("#btnCancelContact").hide();
				$("#btnSaveContact").hide();
				$("#btnUpdateContact").hide();
				//setting value
				if(contactDetail.contactTypeLkp!=null)
				jQuery("#contactType").val(contactDetail.contactTypeLkp.contacttypeid);
				
				$("#btnUpdateContact").click(function () {
					$("#contactInfoTable :input").removeAttr("disabled");	
					
					$("#btnUpdateContact").hide();
					$("#btnCancelContact").show();
					$("#btnSaveContact").show();
					
				});

				//if(roleExists){
					$("#btnUpdateContact").show();
				//}

					$("#contactPrimaryPhone").blur(function(){ 
						 number = $(this).val(); 
						 number = number.replace(/\s/g, "");
						 if(number != undefined && number != ""){
							 var regexLetter = /^[0-9]+$/;
							 if(regexLetter.test(number)){
								 _val = number.substring(0, 5);
								 _val = _val + " " + number.substring(5);
								 $(this).val(_val);
							 }else{
								 //jAlert("Invalid Phone Number");
								 jAlert( $._('invalid_phone_number'), $._('alert'));
									$('#popup_ok').attr("value", $._('popupOk'));
								 $("#contactPrimaryPhone").focus();
							 }
						 }else{
							 //jAlert("Invalid Phone Number");
							 //$("#contactPrimaryPhone").focus();
						 }
					 });
					 
					 $("#contactSecondaryPhone").blur(function(){ 
						 number = $(this).val(); 
						 number = number.replace(/\s/g, "");
						 if(number != undefined && number != ""){
							 var regexLetter = /^[0-9]+$/;
							 if(regexLetter.test(number)){
								 _val = number.substring(0, 5);
								 _val = _val + " " + number.substring(5);
								 $(this).val(_val);
							 }else{
								// jAlert("Invalid Phone Number");
								 jAlert( $._('invalid_phone_number'), $._('alert'));
									$('#popup_ok').attr("value", $._('popupOk'));
								 $("#contactSecondaryPhone").focus();
							 }
						 }else{
							// jAlert("Invalid Phone Number");
							// $("#contactSecondaryPhone").focus();
						 }
					 });
					 
					 $("#contactMobile").blur(function(){ 
						 number = $(this).val(); 
						 number = number.replace(/\s/g, "");
						 if(number != undefined && number != ""){
							 var regexLetter = /^[0-9]+$/;
							 if(regexLetter.test(number)){
								 _val = number.substring(0, 5);
								 _val = _val + " " + number.substring(5);
								 $(this).val(_val);
							 }else{
								 //jAlert("Invalid Mobile Number");
								 jAlert( $._('invalid_mobile_phone'), $._('alert'));
							    	$('#popup_ok').attr("value", $._('popupOk'));
								 
								 $("#contactMobile").focus();
							 }
						 }else{
							// jAlert("Invalid Mobile Number");
							// $("#contactMobile").focus();
						 }
					 });
								
					 translateContactLables();
			});
	
}

function translateContactLables(){
	 $('#lblContact').html($._('furniture_link_contacttype') + ' : ');
	 $('#lblCompany').html($._('contact_company') + ' : ');
	 $('#lblTitle').html($._('contact_title') + ' : ');
	 $('#lblInitials').html($._('contact_initials') + ' : ');
	 $('#lblFName').html($._('contact_fname') + ' : ');
	 $('#lblSurName').html($._('contact_surname') + ' : ');
	 $('#lblPosition').html($._('contact_position') + ' : ');
	 $('#lblAddress').html($._('contact_address') + ' : ');
	 $('#lblTown').html($._('contact_town') + ' : ');
	 $('#lblCounty').html($._('contact_county') + ' : ');
	 $('#lblPostcode').html($._('contact_postcode') + ' : ');
	 $('#lblPrim_phone').html($._('contact_primary_phone') + ' : ');
	 $('#lblSecd_phone').html($._('contact_secondary_phone') + ' : ');
	 $('#lblMobile').html($._('contact_mobile') + ' : ');
	 $('#lblContact_Email').html($._('contact_email') + ' : ');
	 $('#lblFax').html($._('contact_fax') + ' : ');
	 $('#btncontact_save').attr("value", $._('Save'));
	 $('#btncontact_cancel').attr("value", $._('Cancel'));
	 $('#btncontact_edit').attr("value", $._('Edit'));
	 
}

function addExistingContact(_layerName,gid){
	
			$("#tabs-Tool").empty();
			jQuery.get("resources/templates/viewer/contact.html", function (template) {
				
				addTab($._('contact'),template);
				
				$('#span-close').attr('title',$._('close_title'));
				
				 jQuery("#ContactInfo_DetailsBody").empty();
				jQuery("#Addexisiting_contactTmpl").tmpl().appendTo("#ContactInfo_DetailsBody");
				
				jQuery.ajax({
		            url: "contact/type",
		            async:false,
		            success: function (data) {
		            	contactTypes = data;      
		            }
		        });
				
				jQuery("#contact_type").append(jQuery("<option></option>").attr("value", "").text($._("please_select")));
				jQuery.each(contactTypes, function (i, contactType) {    	
	        			//jQuery("#contact_type").append(jQuery("<option></option>").attr("value", contactType.contacttypeid).text(contactType.contactType));
					 jQuery("#contact_type").append(jQuery("<option></option>").attr("value", contactType.contacttypeid).text($._(contactType.contactType)));
	        	 });
				
				 $('#contact_type').change(function(){
					 var selected = $("#contact_type option:selected");
					 $('#contact_company').empty();
					 $('#contactlist').empty();
					 if (selected.text() != "Please Select") {
						 jQuery.ajax({
					            url: "contact/company/" + selected.val(),
					            async:false,
					            success: function (data) {
					            	companies = data;  
					            	 jQuery("#contact_company").append(jQuery("<option></option>").attr("value", "Please Select").text($._("please_select"))); 
									 var emptyCompany = false;
									 for(i=0;i<companies.length;i++){
										 company = (companies[i] == null)? "":companies[i];
										
										if(emptyCompany == false || company != ""){
											jQuery("#contact_company")
												.append(jQuery("<option></option>")
														.attr("value", company).text(company)); 
										}
										if(company == "")
											emptyCompany = true;
										
									 }
					            },
					            error : function(xhr, status) {
									
									jAlert( $._('alert_sorry_problem'), $._('alert'));
									$('#popup_ok').attr("value", $._('popupOk'));
								}
					        });
					 }else{
						 //jQuery("#contact_company").append(jQuery("<option></option>").attr("value", "Please Select").text("Please Select")); 
					 }
				 });
				 
				 $('#contact_company').change(function(){
					 var selected = $("#contact_company option:selected");
					 $('#contactlist').empty();
	
					 if (selected.text() != "Please Select") {
						 val = (selected.val() == "")?"_blank":selected.val();
						 jQuery.ajax({
					            url: "listcontact/" + val + "/" + $("#contact_type option:selected").val(),
					            async:false,
					            success: function (data) {
					            	allcontactList = data; 
					            	jQuery("#contactlist").append(jQuery("<option></option>").attr("value", "Please Select").text($._("please_select")));
					            	for(i=0;i<allcontactList.length;i++){
					   				// if(allcontactList[0].email!=null){
					   					 var name='';
					   						if(allcontactList[i].firstName){
					   						name=allcontactList[i].firstName+ ' ';
					   						}
					   						if(allcontactList[i].surname){
					   						name=name+allcontactList[i].surname;
					   						}
					   						if(allcontactList[i].email){
					   						name=name+'( '+allcontactList[i].email+')';
					   						}
					   					 //jQuery("#contactlist").append(jQuery("<option></option>").attr("value", allcontactLists.contactid).text(allcontactLists.firstName+' '+allcontactLists.surname+' ('+allcontactLists.email+')'));
					   						jQuery("#contactlist").append(jQuery("<option></option>").attr("value", allcontactList[i].contactid).text(name));
					   				 //}
					         			        
					   			  }
					            }
						 });
					 }
				 });
				 
			 $("#contactLayerl").val(_layerName);
			 $("#contactgidl").val(gid);
				$("#btnUpdateContact").hide();
				$("#btnCancelContact").hide();
				$("#btnSaveContact").show();
				
				if(loggedUser.roles[0].name=="ROLE_ADMIN"){
					$("#block_contact").show();
				}else{
					$("#block_contact").hide();
				}
				
				$("#btnUpdateContact").click(function () {
					$("#contactInfoTable :input").removeAttr("disabled");	
					$("#btnUpdateContact").hide();
					$("#btnCancelContact").show();
					$("#btnSaveContact").show();
					
				});
				
				/*$("#btnSaveContact").click(function () {
					//$("#contactInfoTable :input").removeAttr("disabled");	
					saveContact();
					//saveContactData();
					//$("#btnUpdateContact").show();
					//$("#btnCancelContact").hide();
					//$("#btnSaveContact").hide();
					
				});
						*/	
				translateExistingContact();
			});
	
}

function translateExistingContact(){
	$('#lblExistingContactType').html($._('furniture_link_contacttype') + ' : ');
	$('#lblExistingContactCompany').html($._('contact_company') + ' : ');
	$('#lblExistingContactName').html($._('Name') + ' : ');
	$('#btnSaveAccessLandContact').attr("value", $._('Save'));
	$('#btnCancelaccessLandContact').attr("value", $._('Cancel'));
	$('#btnBlockContact').attr("value", $._('block_contact'));
}

function blockContact(){
	 var selected = $("#contactlist option:selected");
	
	if (selected.text() != "Please Select") {
		 jQuery.ajax({
	            url: "contact/update/" + selected.val(),
	            async:false,
	            success: function (data) {
	            	 $('#contact_company').change();
	            	//jAlert("Selected contact is blocked");
	            	 jAlert( $._('alert_blocked_contact'), $._('alert'));
						$('#popup_ok').attr("value", $._('popupOk'));
	            }
		 });
	}else{
		jAlert('Please select a contact');
	}
}


function addNewContact(_layerName,gid){
	
			$("#tabs-Tool").empty();
			jQuery.get("resources/templates/viewer/contact.html", function (template) {
				
				addTab($._('contact'),template);
				$('#span-close').attr('title',$._('close_title'));
				jQuery("#ContactInfo_DetailsBody").empty();
				jQuery("#contactInfo_DetailsTmpl").tmpl().appendTo("#ContactInfo_DetailsBody");
				
				jQuery.ajax({
		            url: "contact/type",
		            async:false,
		            success: function (data) {
		            	contactTypes = data;      
		            	
		            }
		        });
				
				
				 jQuery("#contactType").append(jQuery("<option></option>").attr("value", "").text($._("please_select")));
				 jQuery.each(contactTypes, function (i, contactType) {
	        			//jQuery("#contactType").append(jQuery("<option></option>").attr("value", contactType.contacttypeid).text(contactType.contactType));
					 jQuery("#contactType").append(jQuery("<option></option>").attr("value", contactType.contacttypeid).text($._(contactType.contactType)));
	        	  });
					
				$("#btnUpdateContact").hide();
				$("#btnCancelContact").hide();
				$("#btnSaveContact").show();
				
				
				$("#btnUpdateContact").click(function () {
					$("#contactInfoTable :input").removeAttr("disabled");	
					
					$("#btnUpdateContact").hide();
					$("#btnCancelContact").show();
					$("#btnSaveContact").show();
					
				});
			
				 $("#contactgid").val(gid);
				 $("#contactLayer").val(_layerName);
				 
				 $("#contactPrimaryPhone").blur(function(){ 
					 number = $(this).val(); 
					 number = number.replace(/\s/g, "");
					 if(number != undefined && number != ""){
						 var regexLetter = /^[0-9]+$/;
						 if(regexLetter.test(number)){
							 _val = number.substring(0, 5);
							 _val = _val + " " + number.substring(5);
							 $(this).val(_val);
						 }else{
							 //jAlert("Invalid Phone Number");
							 jAlert( $._('invalid_phone_number'), $._('alert'));
								$('#popup_ok').attr("value", $._('popupOk'));
							 
							 $("#contactPrimaryPhone").focus();
						 }
					 }else{
						 //jAlert("Invalid Phone Number");
						 //$("#contactPrimaryPhone").focus();
					 }
				 });
				 
				 $("#contactSecondaryPhone").blur(function(){ 
					 number = $(this).val(); 
					 number = number.replace(/\s/g, "");
					 if(number != undefined && number != ""){
						 var regexLetter = /^[0-9]+$/;
						 if(regexLetter.test(number)){
							 _val = number.substring(0, 5);
							 _val = _val + " " + number.substring(5);
							 $(this).val(_val);
						 }else{
							// jAlert("Invalid Phone Number");
							 jAlert( $._('invalid_phone_number'), $._('alert'));
								$('#popup_ok').attr("value", $._('popupOk'));
							 $("#contactSecondaryPhone").focus();
						 }
					 }else{
						// jAlert("Invalid Phone Number");
						// $("#contactSecondaryPhone").focus();
					 }
				 });
				 
				 $("#contactMobile").blur(function(){ 
					 number = $(this).val(); 
					 number = number.replace(/\s/g, "");
					 if(number != undefined && number != ""){
						 var regexLetter = /^[0-9]+$/;
						 if(regexLetter.test(number)){
							 _val = number.substring(0, 5);
							 _val = _val + " " + number.substring(5);
							 $(this).val(_val);
						 }else{
							// jAlert("Invalid Mobile Number");
							 jAlert( $._('invalid_mobile_phone'), $._('alert'));
						    	$('#popup_ok').attr("value", $._('popupOk'));
							 $("#contactMobile").focus();
						 }
					 }else{
						 //jAlert("Invalid Mobile Number");
						 //$("#contactMobile").focus();
					 }
				 });
				/*$("#btnSaveContact").click(function () {
					//$("#contactInfoTable :input").removeAttr("disabled");	
					saveContact();
					//saveContactData();
					//$("#btnUpdateContact").show();
					//$("#btnCancelContact").hide();
					//$("#btnSaveContact").hide();
					
				});*/
				 translateContactLables();									
			});
	//        }
	//});
	
}


var saveContactData= function () {

	var _layer=$("#contactLayer").val();
	
	if($("#contactid").val()>0){
		jQuery.ajax({
			 async:false,
	        type: "POST",              
	        url: "contact/edit",
	        data: jQuery("#contact_form").serialize(),
	        success: function (data) { 
			jAlert('Contact Successfully Updated', 'Contact');
			 $("#btnUpdateContact").show();
	         		$("#btnCancelContact").hide();
	         		$("#btnSaveContact").hide();
	         		$("#contactInfoTable :input").attr("disabled", true);
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	        	jAlert( $._('alert_sorry_problem'), $._('alert'));
				$('#popup_ok').attr("value", $._('popupOk'));
	        }
	    });
	}
	else{
		jQuery.ajax({
			 async:false,
	        type: "POST",              
	        url: "contact/create",
	        data: jQuery("#contact_form").serialize(),
	        success: function (data) {  
	        	if(data==1){
	        		 //jAlert('Data Successfully Saved', 'Contact');
	        		 
	        		 jAlert( $._('alert_successfully_saved'), $._('contact'));
					 $('#popup_ok').attr("value", $._('popupOk'));
	                 
	                 if(_layer=='accessland'){
	                 	refreshAccessLandContact(assecclandID);

	                 }
	                 else if(_layer=='rowpath'){
	                 	refreshPathContact(pathID);

	                 }
	                 else if(_layer=='furniture'){
	                 	refreshFurnitureContact(furnitureGID);

	                 }
					 else if(_layer=='issue'){
	                 	refreshIssueContact(issueID);

	                 }
					 else if(_layer=='surface'){
						 refreshSurfaceContact(surfaceGID);

		             }
					 else if(_layer=='job'){
						 refreshJobContact(jobID);


		             }
					 
	                 $("#btnUpdateContact").show();
	         		$("#btnCancelContact").hide();
	         		$("#btnSaveContact").hide();
	         		$("#contactInfoTable :input").attr("disabled", true);
	         		closeDialog('rowinfodiv');

	        	}
	        	else if(data==3){
	        		jAlert( $._('alert_sorry_problem'), $._('contact'));
					$('#popup_ok').attr("value", $._('popupOk'));


	              	 
	           	}
	        	else if(data==2){
	        		jAlert('Contact already exists', 'Contact');




	             	
	          	}
	           
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {

	            
	        	jAlert( $._('alert_sorry_problem'), $._('alert'));
				$('#popup_ok').attr("value", $._('popupOk'));

	        }
	    });
	}


	
}




function saveContact(){
	
  
    $("#contact_form").validate({

        rules: {
        	//contactCompany: "required",
        	contactType : "required",
        	contactTitle : "required",				
        	//contactInitials : "required",
        	contactFirstName : "required",
        	contactSurname : "required",
        	//contactPosition : "required",
        	//contactAddress : "required",
        	//contactTown : "required",
        	//contactCounty : "required",
        	//contactPostcode : "required",
        	contactPrimaryPhone : {
        		required: true
        		//digits: true
        	},
        	/*contactSecondaryPhone : {
        		digits: true
        	},*/
        	/*contactMobile :{
        		//required: true,
        		digits: true
        	},*/
        	contactFax  : {
        		digits: true
        	},
        	contactEmail: {
                required: true,
                email: true
            }
        },
        messages: {
        	contactType: $._('required_field'),			
        	contactTitle : $._('required_field'),				        	
        	contactFirstName : $._('required_field'),
        	contactSurname : $._('required_field'),
			contactEmail: {
            required: $._('required_field'),
            email: $._('invalid_email')
			}
        }
    });

    if(! phoneNumberValidator($('#contactPrimaryPhone').val())){
    	//jAlert('Invalid primary phone');
    	jAlert( $._('invalid_primary_phone'), $._('alert'));
    	$('#popup_ok').attr("value", $._('popupOk'));
    	return;
    }
    
    if($('#contactSecondaryPhone').val().length > 0 && ! phoneNumberValidator($('#contactSecondaryPhone').val())){    	
    	//jAlert('Invalid secondary phone');
    	jAlert( $._('invalid_secondary_phone'), $._('alert'));
    	$('#popup_ok').attr("value", $._('popupOk'));
    	return;
    }
    
    if($('#contactMobile').val().length > 0 && ! phoneNumberValidator($('#contactMobile').val())){
    	//jAlert('Invalid mobile phone');
    	jAlert( $._('invalid_mobile_phone'), $._('alert'));
    	$('#popup_ok').attr("value", $._('popupOk'));
    	return;
    }
    
    if ($("#contact_form").valid()) {
    	saveContactData();
	}
    else{
    	return;
    }
}

function phoneNumberValidator(val){
	var  numExp = /\s\d/g;
	if(val.match(numExp)){
		return true;
	}else{
		return false;
	}
}

var deleteContact1= function (_ContactID) {
	
		
		jConfirm($._('alert_confirm_msg')+'<strong>' + _ContactID + '</strong>', $._('alert_confirm_title'), function (response) {

	        if (response) {
	        	jQuery.ajax({          
	        		
	        		  url: "contact/delete/"+_ContactID,
	                success: function () { 	                	
	                	
	                	jAlert( $._('alert_successfully_deleted'), $._('contact'));
						$('#popup_ok').attr("value", $._('popupOk'));
	                },
	                error: function (XMLHttpRequest, textStatus, errorThrown) {
	                    
	                	jAlert( $._('alert_sorry_problem'), $._('alert'));
						$('#popup_ok').attr("value", $._('popupOk'));
	                }
	            });
	        }

	    });
		$('#popup_ok').attr("value", $._('popupOk'));
		$('#popup_cancel').attr("value", $._('_cancel'));

}


var saveAccessLandContactData= function (_gid) {
	
	
	 $("#addexistingcontact_form").validate({

	        rules: {
	        	contactlist: "required"
	        	
	        },
	        messages: {
	        	contactType: "Please select Contact"
	        }
	    });

	    
	    
	    if ($("#addexistingcontact_form").valid()) {
	    			
	    
	
	jQuery.ajax({
		 async:false,
        type: "POST",              
        url: "acessland/addcontact",
        data: {gid:_gid,contactid:$("#contactlist").val()},
        success: function () {        
            //jAlert('Data Successfully Saved', 'User');
        	
        	jAlert( $._('alert_successfully_saved'), $._('user'));
			 $('#popup_ok').attr("value", $._('popupOk'));
            
            refreshAccessLandContact(assecclandID);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
        	
        	jAlert( $._('alert_sorry_problem'), $._('user'));
			$('#popup_ok').attr("value", $._('popupOk'));
        }
    });
	    }
	
}




//--------------

var linkContactData= function (_gid) {
	
	
	 $("#addexistingcontact_form").validate({

	        rules: {
	        	contactlist: "required"
	        	
	        },
	        messages: {
	        	contactlist: "Please select Contact"
	        }
	    });

	    
	    
	    if ($("#addexistingcontact_form").valid()) {
	    var	gid	= $("#contactgidl").val();
	    var _layer=$("#contactLayerl").val();
	if(_layer=='rowpath'){
		jQuery.ajax({
			 async:false,
			type : "POST",
			url : "path/addcontact",
			data : {
				gid : _gid,
				contactid : $("#contactlist").val()
			},
			success : function(data) {
				
				if(data==1){
					//jAlert('Data Successfully Saved', 'User');
					
					jAlert( $._('alert_successfully_saved'), $._('user'));
					 $('#popup_ok').attr("value", $._('popupOk'));
					 
					refreshPathContact(pathID);
	        	}
	        	else if(data==3){
	        		jAlert( $._('alert_sorry_problem'), $._('user'));
					$('#popup_ok').attr("value", $._('popupOk'));
	              	 
	           	}
	        	else if(data==2){
	        		jAlert('Contact already added.', 'User');
	             	
	          	}
				//$("#contactlist").val('');	
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

				jAlert( $._('alert_sorry_problem'), $._('user'));
				$('#popup_ok').attr("value", $._('popupOk'));
			}
		});
	}

	else if(_layer=='accessland'){
		jQuery.ajax({
			 async:false,
			type : "POST",
			url : "acessland/addcontact",
			data : {
				gid : assecclandID,
				contactid : $("#contactlist").val()
			},
			success : function(data) {
				if(data==1){
					//jAlert('Data Successfully Saved', 'User');
					jAlert( $._('alert_successfully_saved'), $._('user'));
					 $('#popup_ok').attr("value", $._('popupOk'));
					
					refreshAccessLandContact(assecclandID);
	        	}
	        	else if(data==3){
	        		jAlert( $._('alert_sorry_problem'), $._('user'));
					$('#popup_ok').attr("value", $._('popupOk'));
	              	 
	           	}
	        	else if(data==2){
	        		jAlert('Contact already added.', 'User');
	             	
	          	}
				
				$("#contactlist").val('');	
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

				jAlert( $._('alert_sorry_problem'), $._('user'));
				$('#popup_ok').attr("value", $._('popupOk'));
			}
		});
	}
	else if(_layer=='furniture'){
		jQuery.ajax({
			 async:false,
			type : "POST",
			url : "furniture/addcontact",
			data : {
				gid : furnitureGID,

				contactid : $("#contactlist").val()
			},
			success : function(data) {
				
				if(data==1){
					//jAlert('Data Successfully Saved.', 'User');
					jAlert( $._('alert_successfully_saved'), $._('user'));
					 $('#popup_ok').attr("value", $._('popupOk'));
					refreshFurnitureContact(furnitureGID);
	        	}
	        	else if(data==3){
	        		jAlert( $._('alert_sorry_problem'), $._('user'));
					$('#popup_ok').attr("value", $._('popupOk'));
	              	 
	           	}
	        	else if(data==2){
	        		jAlert('Contact already added.', 'User');
	             	
	          	}
				$("#contactlist").val('');	
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

				jAlert( $._('alert_sorry_problem'), $._('user'));
				$('#popup_ok').attr("value", $._('popupOk'));
			}
		});
	}
else if(_layer=='issue'){
		jQuery.ajax({
			 async:false,
			type : "POST",
			url : "issue/addcontact",
			data : {
				gid : issueID,
				contactid : $("#contactlist").val()
			},
			success : function(data) {
				if(data==1){
					//jAlert('Data Successfully Saved', 'User');
					
					jAlert( $._('alert_successfully_saved'), $._('user'));
					 $('#popup_ok').attr("value", $._('popupOk'));
					 
					refreshIssueContact(issueID);
	        	}
	        	else if(data==3){
	        		jAlert( $._('alert_sorry_problem'), $._('user'));
					$('#popup_ok').attr("value", $._('popupOk'));
	              	 
	           	}
	        	else if(data==2){
	        		alert('Contact already added.');
	             	
	          	}
				
				$("#contactlist").val('');	
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

				jAlert( $._('alert_sorry_problem'), $._('user'));
				$('#popup_ok').attr("value", $._('popupOk'));
			}
		});
	}
else if(_layer=='surface'){
	jQuery.ajax({
		 async:false,
		type : "POST",
		url : "surface/addcontact",
		data : {
			gid : surfaceGID,
			contactid : $("#contactlist").val()
		},
		success : function(data) {
			
			if(data==1){
				//jAlert('Data Successfully Saved.', 'User');
				jAlert( $._('alert_successfully_saved'), $._('user'));
				 $('#popup_ok').attr("value", $._('popupOk'));
				 
				refreshSurfaceContact(surfaceGID);
				}
        	else if(data==3){
        		jAlert( $._('alert_sorry_problem'), $._('user'));
				$('#popup_ok').attr("value", $._('popupOk'));
              	 
           	}
        	else if(data==2){
        		alert('Contact already added.');
             	
          	}
			$("#contactlist").val('');	
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

			jAlert( $._('alert_sorry_problem'), $._('alert'));
			$('#popup_ok').attr("value", $._('popupOk'));
		}
	});
}
else if(_layer=='job'){
	jQuery.ajax({
		 async:false,
		type : "POST",
		url : "job/addcontact",
		data : {
			jobid : jobID,
			contactid : $("#contactlist").val()
		},
		success : function(data) {
			
			if(data==1){
				//jAlert('Data Successfully Saved.', 'User');
				jAlert( $._('alert_successfully_saved'), $._('user'));
				 $('#popup_ok').attr("value", $._('popupOk'));
				refreshJobContact(jobID);
				}
        	else if(data==3){
        		jAlert( $._('alert_sorry_problem'), $._('alert'));
				$('#popup_ok').attr("value", $._('popupOk'));
              	 
           	}
        	else if(data==2){
        		alert('Contact already added.');
             	
          	}
			$("#contactlist").val('');	
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

			jAlert( $._('alert_sorry_problem'), $._('alert'));
			$('#popup_ok').attr("value", $._('popupOk'));
		}
	});
}		
	//closeDialog('rowinfodiv');		
	//$("#contactlist").val('');	
	    }
	
}


var deletePathContact= function (_ContactID) {
		jConfirm($._('alert_confirm_msg')+'<strong>' + _ContactID + '</strong>', $._('alert_confirm_title'), function (response) {
	        if (response) {
	        	jQuery.ajax({  
	        		 async:false,
	        		data: {gid:pathID,contactid:_ContactID},
	        		  url: "path/contact/delete",
	                success: function () { 	                	
	                	jAlert( $._('alert_successfully_deleted'), $._('contact'));
						$('#popup_ok').attr("value", $._('popupOk'));
	                	refreshPathContact(pathID);
	                },
	                error: function (XMLHttpRequest, textStatus, errorThrown) {
	                    
	                	jAlert( $._('alert_sorry_problem'), $._('contact'));
						$('#popup_ok').attr("value", $._('popupOk'));
	                }
	            });
	        }

	    });
		$('#popup_ok').attr("value", $._('popupOk'));
		$('#popup_cancel').attr("value", $._('_cancel'));

}


var deleteAccessLandContact= function (_ContactID) {
	
		jConfirm($._('alert_confirm_msg')+'<strong>' + _ContactID + '</strong>', $._('alert_confirm_title'), function (response) {
	        if (response) {
	        	jQuery.ajax({     
	        		 async:false,
	        		data: {gid:assecclandID,contactid:_ContactID},
	        		  url: "accessland/contact/delete/",
	                success: function () { 	                	
	                	jAlert( $._('alert_successfully_deleted'), $._('contact'));
						$('#popup_ok').attr("value", $._('popupOk'));
	                	refreshAccessLandContact(assecclandID);
	                },
	                error: function (XMLHttpRequest, textStatus, errorThrown) {
	                    
	                	jAlert( $._('alert_sorry_problem'), $._('contact'));
						$('#popup_ok').attr("value", $._('popupOk'));
	                }
	            });
	        }

	    });
		$('#popup_ok').attr("value", $._('popupOk'));
		$('#popup_cancel').attr("value", $._('_cancel'));

}

var deleteFurnitureContact= function (_ContactID) {
	
	jConfirm($._('alert_confirm_msg')+'<strong>' + _ContactID + '</strong>', $._('alert_confirm_title'), function (response) {
        if (response) {
        	jQuery.ajax({   
        		 async:false,
        		data: {gid:furnitureGID,contactid:_ContactID},
        		  url: "furniture/contact/delete/",
                success: function () { 	                	
                	jAlert( $._('alert_successfully_deleted'), $._('contact'));
						$('#popup_ok').attr("value", $._('popupOk'));
                	refreshFurnitureContact(furnitureGID);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    
                	jAlert( $._('alert_sorry_problem'), $._('contact'));
					$('#popup_ok').attr("value", $._('popupOk'));
                }
            });
        }

    });
	$('#popup_ok').attr("value", $._('popupOk'));
		$('#popup_cancel').attr("value", $._('_cancel'));

}


var deleteIssueContact= function (_ContactID) {
		jConfirm($._('alert_confirm_msg')+'<strong>' + _ContactID + '</strong>', $._('alert_confirm_title'), function (response) {
	        if (response) {
	        	jQuery.ajax({   
	        		 async:false,
	        		data: {gid:issueID,contactid:_ContactID},
	        		  url: "issue/contact/delete",
	                success: function () { 	                	
	                	jAlert( $._('alert_successfully_deleted'), $._('contact'));
						$('#popup_ok').attr("value", $._('popupOk'));
	                	refreshIssueContact(issueID);
	                },
	                error: function (XMLHttpRequest, textStatus, errorThrown) {
	                    
	                	jAlert( $._('alert_sorry_problem'), $._('alert'));
						$('#popup_ok').attr("value", $._('popupOk'));
	                }
	            });
	        }

	    });
		$('#popup_ok').attr("value", $._('popupOk'));
		$('#popup_cancel').attr("value", $._('_cancel'));

}

var deleteSurfaceContact= function (_ContactID) {
	
	jConfirm($._('alert_confirm_msg')+'<strong>' + _ContactID + '</strong>', $._('alert_confirm_title'), function (response) {
        if (response) {
        	jQuery.ajax({   
        		 async:false,
        		data: {gid:surfaceGID,contactid:_ContactID},
        		  url: "surface/contact/delete/",
                success: function () { 	                	
                	jAlert( $._('alert_successfully_deleted'), $._('contact'));
						$('#popup_ok').attr("value", $._('popupOk'));
                	refreshSurfaceContact(surfaceGID);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    
                	jAlert( $._('alert_sorry_problem'), $._('alert'));
					$('#popup_ok').attr("value", $._('popupOk'));
                }
            });
        }

    });
	$('#popup_ok').attr("value", $._('popupOk'));
		$('#popup_cancel').attr("value", $._('_cancel'));

}

var deleteJobContact= function (_ContactID) {
	
jConfirm($._('alert_confirm_msg')+'<strong>' + _ContactID + '</strong>', $._('alert_confirm_title'), function (response) {
        if (response) {
        	jQuery.ajax({          
        		data: {jobid:jobID,contactid:_ContactID},
        		  url: "job/contact/delete/",
                success: function () { 	                	
                	jAlert( $._('alert_successfully_deleted'), $._('contact'));
						$('#popup_ok').attr("value", $._('popupOk'));
                	refreshJobContact(jobID);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    
                	jAlert( $._('alert_sorry_problem'), $._('contact'));
					$('#popup_ok').attr("value", $._('popupOk'));
                }
            });
        }

    });
	$('#popup_ok').attr("value", $._('popupOk'));
		$('#popup_cancel').attr("value", $._('_cancel'));

}