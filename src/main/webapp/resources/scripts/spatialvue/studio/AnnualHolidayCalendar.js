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
var updatetype=null;
var selectedItem=null;
var hilidayList=null;
function AnnualHolidayCalendar(_selectedItem)
{
	
	selectedItem=_selectedItem;
	
	if( jQuery("#holidayCalendarFormDiv").length<=0){
		displayRefreshedHolidayCalendar();
	}
	else{
		
		displayAnnualHolidayCalendar();
		//displayRefreshedHolidayCalendar();
	}
}


function displayRefreshedHolidayCalendar(){
	jQuery.ajax({
		url: "annualholiday/" + "?" + token,
         success: function (data) {
        	 hilidayList=data;
        	 //jQuery("#tableGrid").empty(); 
        	//jQuery("#bookmarks").empty(); 
        	$("#calendarsettings").empty();  
			
        	jQuery.get('resources/templates/studio/AnnualHolidayCalendar.html', function(template) {
		    			    	
        		$("#calendarsettings").append(template);  
		    	jQuery('#holidayCalendarFormDiv').css("visibility", "visible");
		    	
		    	jQuery("#holidayCalendarDetails").hide();	        	
	        	jQuery("#HolidayCalendarsRowData").empty();
	        	jQuery("#holidayCalendarTable").show();	        		        			    
		    	
				jQuery("#holidayCalendar_accordion").hide();
				
		    	jQuery("#HolidayCalendarTemplate").tmpl(data).appendTo("#HolidayCalendarsRowData");
		    	 		    	
		    	jQuery("#holidayCalendar_btnSave").hide();
		    	jQuery("#holidayCalendar_btnBack").hide();
		    	jQuery("#holidayCalendar_btnNew").show();		    			    
		    	
                $("#holidayCalendarTable").tablesorter({ 
                		headers: {3: {sorter: false  },  4: {  sorter: false } },	
                		debug: false, sortList: [[0, 0]], widgets: ['zebra'] })
                       .tablesorterPager({ container: $("#calendar_pagerDiv"), positionFixed: false })
                       .tablesorterFilter({ filterContainer: $("#holidayCalendar_txtSearch"),                           
                           filterColumns: [0,1,2],
                           filterCaseSensitive: false
                       });
		    	
			});
    
         }
	 });
	
}

function displayAnnualHolidayCalendar(){
	
	jQuery("#holidayCalendar_accordion").hide();
	
	jQuery("#holidayCalendarDetails").hide();	        		
	jQuery("#holidayCalendarTable").show();
	
	jQuery("#holidayCalendar_btnSave").hide();
	jQuery("#holidayCalendar_btnBack").hide();
	jQuery("#holidayCalendar_btnNew").show();	
	
}



var createEditHolidayCalendar = function (_id) {
  
	    jQuery("#holidayCalendar_btnNew").hide();    
	    jQuery("#holidayCalendar_btnSave").hide();
	    jQuery("#holidayCalendar_btnBack").hide();
	    
	    jQuery("#holidayCalendarTable").hide();
	    jQuery("#holidayCalendarDetails").show();    
	    jQuery("#holidayCalendarDetailsBody").empty();
	
	    
    if (_id) {
    	updatetype='edit'; 	
            jQuery.ajax({
            url: "annualholiday/" + _id + "?" + token,
            async:false,
            success: function (data) { 
            
            	jQuery("#HolidayCalendarTemplateForm").tmpl(data,

                		{
                						addDatePicker: function () {
                						$("#holidayDate").live('click', function () {
                           	                        	
                						// $(this).datepicker('destroy').datepicker().focus(); 
                							
                						$(this).datepicker('destroy').datepicker({ dateFormat: 'yy-mm-dd',beforeShowDay: setHoliDays,minDate: 0}).focus(); 


                						});
                						}	
                            }

                         ).appendTo("#holidayCalendarDetailsBody");
                
                		jQuery('#holidayType').val(data.holidayType);
                		jQuery('#hid-id').val(data.id);   
                
            },
            cache: false
        });
    } else {
    	updatetype='create';
        jQuery("#HolidayCalendarTemplateForm").tmpl(null,

        		{
					addDatePicker: function () {
					$("#holidayDate").live('click', function () {
			                        	
					// $(this).datepicker('destroy').datepicker().focus(); 
						
						$(this).datepicker('destroy').datepicker({ dateFormat: 'yy-mm-dd',beforeShowDay: setHoliDays,minDate: 0}).focus();
		
		
					});
					}	
        		}
            ).appendTo("#holidayCalendarDetailsBody");
        
        
    }
    
    jQuery("#holidayCalendar_accordion").show();
	jQuery("#holidayCalendar_accordion").accordion({fillSpace: true});
    
    jQuery("#holidayCalendar_btnSave").show();
    jQuery("#holidayCalendar_btnBack").show();
    
    
} 

var saveHolidayCalendarData= function () {
	
	var _url=null;
	
	if(updatetype=='create'){
	_url="annualholiday/create" + "?" + token;		
	}
	else if(updatetype=='edit'){
		_url="annualholiday/edit/" + "?" + token;	
		
	}
	
	jQuery.ajax({
        type: "POST",              
        url: _url,
        data: jQuery("#holidayCalendarForm").serialize(),
        success: function () {        
            
        	jAlert('Data Successfully Saved', 'HolidayCalendarForm');
           //back to the list page 
           // var bookmark=new Bookmark('bookmark');
        	displayRefreshedHolidayCalendar();
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
            alert('ERROR');
        }
    });
	
}




function saveHolidayCalendar(){
	//alert($("#holidayType").val()+'-'+$("#holidayDate").val()+'-'+$("#holidayOccassion").val());
	jQuery("#holidayCalendarForm").validate({

		rules: {
			holidayType:"required",
			holidayDate: "required",	
			holidayOccassion: "required"					
			
			
		},
		messages: {
			holidayType: "Please enter Type",
			holidayDate: "Please enter Date",
			holidayOccassion: "Please enter Occasion"			
		}		
			
	});
	
	if(jQuery("#holidayCalendarForm").valid())	{						
		saveHolidayCalendarData();
	
	}
	
	
	
}
var deleteHoliday= function (_id) {
	
	jConfirm('Are You Sure You Want To Delete ', 'Delete Confirmation', function (response) {

        if (response) {
        	jQuery.ajax({          
                url: "annualholiday/delete/"+_id  + "?" + token,
                
                success: function () { 
                	
                	jAlert('Data Successfully Deleted', 'Holiday Calendar');
                   //back to the list page 
                	displayRefreshedHolidayCalendar();
                    
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    
                    alert('ERROR');
                }
            });
        }

    });
	
	
	

	
}
/*
 function gerHolidaylist()
{
	var holidyList=null;		
	jQuery.ajax({
		url: "annualholiday/" + "?" + token,
		success: function (data) {
			holidyList=data;
		}
	});
	return 	holidyList;
}
 */


function setHoliDays(date) {             
	
	var _holidyList=hilidayList;
	
	for (i = 0; i < _holidyList.length; i++) {	
		var holiday=_holidyList[i];
		var dateArr = new Array();
		dateArr=(holiday.holidayDate).split("-");
		if ((date.getFullYear() == dateArr[0]
		  && date.getMonth() == dateArr[1] - 1
		  && date.getDate() == dateArr[2])
		 // ||(date.getDay()==0)
		  ) {							
				//return [true, 'holiday', holiday.holidayOccassion];
				return [false, 'holiday', holiday.holidayOccassion];
		}

	}		

return [true, ''];
}