function CalendarSetting(_div) {

	$("#calendarsettings").empty();
	
	
    jQuery.get('resources/templates/studio/CalendarSetting.html', function(template) {
		
       $("#calendarsettings").append(template);   
        jQuery("#calendarSetting_HolidayCalTmpl").tmpl().appendTo("#calendarSetting_holidayCalBody");
		//jQuery("#configsetting_complaintsTmpl").tmpl().appendTo("#configsetting_complaintsBody");
		
        jQuery("#calendarSetting_accordion").accordion({fillSpace: true});
				
    });
	jQuery("#holidayCalender_btnSave").hide();
	jQuery("#holidayCalender_btnBack").hide();
	jQuery("#holidayCalender_btnNew").show();
}



function displayHolidayCalender(){
	
	jQuery("#editholinderCalender").hide();	        	
	jQuery("#calendarSetting_holidayCalTable").show();
	
	jQuery("#holidayCalender_btnSave").hide();
	jQuery("#holidayCalender_btnBack").hide();
	jQuery("#holidayCalender_btnNew").show();
	
}
function createEditHolidayCalenderRecord(maptipName){
	
	$("#editholinderCalenderBody").empty();
	jQuery("#editholinderCalender").show();	        	
	jQuery("#holinderCalenderTemplateForm").tmpl().appendTo("#editholinderCalenderBody");
	jQuery("#calendarSetting_holidayCalTable").hide();
	
	jQuery("#holidayCalender_btnSave").show();
	jQuery("#holidayCalender_btnBack").show();
	jQuery("#holidayCalender_btnNew").hide();
	
	
	
}


