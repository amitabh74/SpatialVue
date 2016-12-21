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
var selectedItem=null;
var _userdata=null;
var functionalRoles=null;
function User(_selectedItem)
{
	
	selectedItem=_selectedItem;
	if( jQuery("#userFormDiv").length<=0){
		displayRefreshedUser();
	
	}
	else{
		
		displayUser();
	}
}

function displayRefreshedUser(){
	jQuery.ajax({
		url: "user/" + "?" + token,
         success: function (data) {
        	jQuery("#users").empty();
			_userdata=data;
			
			jQuery.ajax({
				url: "user/order",
				success: function(userOrder){
					_usrOrder = userOrder;
					
					for(var usr in _userdata){
						mgr_id = _userdata[usr].managerid;
						if(mgr_id != undefined){
							mgr = _usrOrder[mgr_id - 1];
							_userdata[usr].managerid = mgr;
						}	
					}
					
					jQuery.get("resources/templates/studio/" + selectedItem + ".html", function (template) {
    			    	
				    	jQuery("#users").append(template);
				    	jQuery('#userFormDiv').css("visibility", "visible");		    			    	
				    	
				    	
				    	jQuery("#userDetails").hide();	        	
			        	jQuery("#UsersRowData").empty();
			        	jQuery("#userTable").show();	        	
			        	jQuery("#user_accordion").hide();		    	
				    	
				    	jQuery("#UserTemplate").tmpl(data).appendTo("#UsersRowData");
				    	 		    	
				    	jQuery("#user_btnSave").hide();
				    	jQuery("#user_btnBack").hide();
				    	jQuery("#user_btnNew").show();
				    	
				    	//$("#user_txtSearch").trigger("keyup");
		                $("#userTable").tablesorter({ 
		                		headers: {7: {sorter: false  },  8: {  sorter: false } },	
		                		debug: false, sortList: [[0, 0]], widgets: ['zebra'] })
		                       .tablesorterPager({ container: $("#user_pagerDiv"), positionFixed: false })
		                       .tablesorterFilter({ filterContainer: $("#user_txtSearch"),                           
		                           filterColumns: [0],
		                           filterCaseSensitive: false
		                       });
				    	
					
					});
				}
			});
         }
	 });
	
}

function displayUser(){
	
	jQuery("#user_accordion").hide();	        	
	jQuery("#userTable").show();
	
	jQuery("#user_btnSave").hide();
	jQuery("#user_btnBack").hide();
	jQuery("#user_btnNew").show();
	
}



var user_role=null;
var user_roleList=null;
var user_ProjectList=null;

var CreateEditUser = function (_name) {
  
	    jQuery("#user_btnNew").hide();    
	    jQuery("#user_btnSave").hide();
	    jQuery("#user_btnBack").hide();
	   
	    jQuery("#userTable").hide();
	    jQuery("#userDetails").show();
	    
	    jQuery("#userDetailBody").empty();
	    
	    jQuery("#userRoleList").empty();
	    
//	    jQuery("#user_accordion").show();
//    	jQuery("#user_accordion").accordion({fillSpace: true});
	    
    	jQuery.ajax({
            url: "role/?" + token,
            success: function (data) {
            	user_roleList = data;
            	
            	jQuery("#UserTemplateRole").tmpl(data,

                        {
            				//roles: user_roleList
                        }

                     ).appendTo("#userRoleList");
            	
            }
        });
    	
    	jQuery.ajax({
            url: "project/?" + token,
            async:false,
            success: function (data) {
            	user_ProjectList = data;      
            	
            }
        });
    	
    	jQuery.ajax({
            url: "snparole/?" + token,
            async:false,
            success: function (data) {
            	functionalRoles = data;      
            	
            }
        });
    	
	    
    if (_name) {
    		
            jQuery.ajax({
            	 type: 'POST',
            	 url: "_" + selectedItem+"/", // + _name + "?" + token,
            	 //async:false,
            	 data: { data: escape(_name) },
            	 success: function (data) {
            		 user_role=data.roles;	
            	
            		 jQuery("#UserTemplateForm").tmpl(data, {
			    		addDatePicker: function () {
	                        $("#passwordexpires").live('click', function () {
	                        	$(this).datepicker('destroy').datepicker({ dateFormat: 'yy-mm-dd',minDate: 0}).focus(); 
	                        });
	                    }	
                     }).appendTo("#userDetailBody");

                
                               
                //create DD                 
                jQuery.each(user_ProjectList, function (i, projects) {    	
					jQuery("#user_defaultproject").append(jQuery("<option></option>").attr("value", projects.name).text(projects.name));        
				});
                 //filling report to list
                jQuery.each(_userdata, function (i, reportingTo) {    	
        			jQuery("#managerName").append(jQuery("<option></option>").attr("value", reportingTo.id).text(reportingTo.name));        
        		});
                jQuery.each(functionalRoles, function (i, functionalRole) {    	
        			jQuery("#functionalRole").append(jQuery("<option></option>").attr("value", functionalRole.id).text(functionalRole.role));        
        		});
                
                
                //set DD value
                jQuery("#user_defaultproject").val(data.defaultproject);
                jQuery("#user_active").val((data.active).toString());
                jQuery("#managerName").val(data.managerid);
                jQuery("#functionalRole").val(data.functionalRole);
                
					jQuery('.accessKey').show();
				
                //set selected  role
                
                jQuery.each(user_role, function (i, role) {

                	//jQuery.each(value.Roles, function (name, value) {
                		jQuery('[id=' + role.name + ']').attr('checked', true);
                        
                    //});
                });
                
                jQuery('#name').attr('readonly', true);
				
            },
            cache: false
        });
    } else {

        jQuery("#UserTemplateForm").tmpl(null,

                {
        			addDatePicker: function () {
        			$("#passwordexpires").live('click', function () {
                    //$(this).datepicker('destroy').datepicker().focus();
        			$(this).datepicker('destroy').datepicker({ dateFormat: 'yy-mm-dd',minDate: 0}).focus();	
                    
        			});
        			}	
               }
            ).appendTo("#userDetailBody");
        
        jQuery('#name').removeAttr('readonly');        
        jQuery('[id="ROLE_USER"]').attr('checked', true);
		
        jQuery.each(user_ProjectList, function (i, projects) {    	
    	jQuery("#user_defaultproject").append(jQuery("<option></option>").attr("value", projects.name).text(projects.name));        
		});
        //filling report to list
                jQuery.each(_userdata, function (i, reportingTo) {    	
        			jQuery("#managerName").append(jQuery("<option></option>").attr("value", reportingTo.id).text(reportingTo.name));        
        		});
		
                jQuery.each(functionalRoles, function (i, functionalRole) {    	
        			jQuery("#functionalRole").append(jQuery("<option></option>").attr("value", functionalRole.id).text(functionalRole.role));        
        		});
                /*
		jQuery.each(user_roleList, function (i, role) {
			if(role.name=='ROLE_USER'){
				jQuery('[id=' + role.name + ']').attr('checked', true);
				return;
            }  
				
		});
		*/
		jQuery('.accessKey').hide();
		
		//jQuery('[id="ROLE_USER"]').attr('checked', true);
		
    }
    
    jQuery("#user_accordion").show();
	jQuery("#user_accordion").accordion({fillSpace: true});
	
    jQuery("#user_btnSave").show();
    jQuery("#user_btnBack").show();
    
    
} 


var saveUserData= function () {
	
	jQuery.ajax({
        type: "POST",              
        url: "user/create" + "?" + token,
        data: jQuery("#userForm").serialize(),
        success: function () {        
            
           
            jAlert('Data Successfully Saved', 'User');
           //back to the list page 
           // var user=new User('user');
          
              displayRefreshedUser();
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
            alert('err.Message');
        }
    });
	
}




function saveUser(){
	
  //alert($(".roleCheckbox").filter(':checked').length);
    $("#userForm").validate({

        rules: {
            name: "required",
            //password: "required",
            //confirmPassword: {
           //     equalTo: "#password"
           // },

            defaultproject: "required",
            email: {
                required: true,
                email: true
            },
            active: "required",
            passwordexpires: "required",
            lastactivitydate: "required",
            //managerName: "required",
            functionalRole:"required"
        },
        messages: {
            name: "Please enter Name",
           // password: "Please enter Password",
           // confirmPassword: "Confirm Password should be same as Password",
            defaultproject: "Please enter  DefaultProject",
            email: "Please enter a valid Email",
            active: "Please enter  Active",
            passwordexpires: "Please enter  PasswordExpires",
            lastactivitydate: "Please enter  LastActivityDate",
            //managerName:"Select Reporting To",
            functionalRole:"Select Role"
        }

    });

    
    
    if ($("#userForm").valid()) {
        // alert($(".roleCheckbox").filter(':checked').length);
        //saveRecord();
    	if(validatePassword()){
	        if ($(".roleCheckbox").filter(':checked').length > 0) {
	        	saveUserData();
	        }
	        else {
	            if ($(".roleCheckbox").filter(':checked').length <= 0) {
	              
	                jAlert('Select atleast one Role', 'User');
	            }
	            /*else
	                if ($(".projectCheckbox").filter(':checked').length <= 0) {
	                    alert('Select atleast one Project');
	                }*/
	            return;
	        }
    }
    }


}

var deleteUser= function (_userName) {
	
	
		
		jConfirm('Are You Sure You Want To Delete : <strong>' + _userName + '</strong>', 'Delete Confirmation', function (response) {

	        if (response) {
	        	jQuery.ajax({          
	        		 type: 'POST',
	        		 url: "user/_delete/",//+_userName + "?" + token,
	        		 data: { data: escape(_userName) },
	                success: function () { 	                	
	                	jAlert('Data Successfully Deleted', 'User');
	                   //back to the list page 
	                	displayRefreshedUser();
	                    
	                },
	                error: function (XMLHttpRequest, textStatus, errorThrown) {
	                    
	                    alert('err.Message');
	                }
	            });
	        }

	    });

}

var validatePassword= function (_userName) {
	
	var valid=true;
	if ( $.trim($("#password").val()) == "" )
    {
        alert('Please enter Password');
        valid = false;
        return valid;
    }
	
	if ( $.trim($("#confirmPassword").val()) == "" )
    {
		alert('Please re-enter Password.');
        valid = false;
        return valid;
    }
	
	if ( $.trim($("#password").val()) != $.trim($("#confirmPassword").val()))
    {
		alert('Confirm Password should be same as Password');
        valid = false;
        return valid;
		
    }
	return valid;
	
}
