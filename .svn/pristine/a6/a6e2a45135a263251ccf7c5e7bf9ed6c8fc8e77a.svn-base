function ConfigSetting(_div) {

	$("#configsettings").empty();
	jQuery("#user_btnSaveComplaintACK").hide();
    jQuery("#user_btnBackcomplaintACK").hide();
    jQuery("#compalintEdit").show();
    jQuery.get('resources/templates/studio/configSetting.html', function(template) {
    $("#configsettings").append(template);   
	   refreshConfiguration('true'); 
     });
    
}



function createEditSurveyRecord(rowNum,_priority,_taskTypeId,_days){
	
 
	jQuery("#surveyEditBody").empty();
	$("#configSetting_SurveyEditForm").tmpl().appendTo("#surveyEditBody");
	jQuery("#user_btnNewSurvey").show();
    jQuery("#user_btnSaveSurvey").show();
    jQuery("#user_btnBackSurvey").show();
    var category=getTableCategory('configsetting_surveyTableBody',rowNum);
	jQuery("#surveyCat").html(category);
    jQuery("#surveyPriorityID").html(_priority);
    jQuery("#surveyPriorityID").val(_priority);
    jQuery("#surveyDuration").val(_days);
    jQuery("#surveyTaskId").val(_taskTypeId);
    jQuery("#surveyEditBody").show();
	
}

function getTableCategory(tableName,rowNumber){
	
	var oTable = document.getElementById(tableName);
	var rowLength = oTable.rows.length;
	var oCells = oTable.rows.item(rowNumber).cells;	   
	return oCells.item(0).innerHTML;
	  

}

function createEditComplaintRecord(rowNum,_taskTypeId,_days){
	
	jQuery("#complaintsEditBody").empty();
	$("#configSetting_ComplaintEditForm").tmpl().appendTo("#complaintsEditBody");
	$("#configSetting_ComplaintEditForm").show();
	
	 var category=getTableCategory('configsetting_complaintsTableBody',rowNum);
	    jQuery("#CategoryCom").html(category);
	    jQuery("#complaintDays").val(_days);
	    jQuery("#complaintTaskId").val(_taskTypeId);
	    jQuery("#complaintsEditBody").show();
}

function createEditIssueRecord(rowNum,_taskTypeId,_days,_srcField){
	
	jQuery("#issueEditBody").empty();
	$("#configSetting_IssueEditForm").tmpl().appendTo("#issueEditBody");
	$("#configSetting_IssueEditForm").show();

	 var category=getTableCategory('configsetting_IssueTableBody',rowNum);
	    jQuery("#issueCat").html(category);
	    jQuery("#issueDays").val(_days);
	    jQuery("#issueTaskId").val(_taskTypeId);
	    if(_srcField=='1')
	        jQuery("#issueFieldText").html('Reported On');
	    else if(_srcField=='2')
	    	jQuery("#issueFieldText").html('Inspected On');
	    jQuery("#issueEditBody").show();	    
	
}

function displaySurvey(){
	
	jQuery("#surveyEditBody").hide();
}


function displayIssue(){
	
	jQuery("#issueEditBody").hide();
}


function displayComplaint(){
	
	jQuery("#complaintsEditBody").hide();
	
}

function saveSurveyTask(){
	
    var duration=jQuery("#surveyDuration").val();
    var taskTypeId=jQuery("#surveyTaskId").val();
    saveData(duration,taskTypeId);  
	jQuery("#surveyEditBody").hide();
}

function saveIssueTask(){

    var duration=jQuery("#issueDays").val();
    var taskTypeId=jQuery("#issueTaskId").val();  
    saveData(duration,taskTypeId);  
	jQuery("#issueEditBody").hide();
}

function saveComplaintTask(){

    var duration=jQuery("#complaintDays").val();
    var taskTypeId=jQuery("#complaintTaskId").val();  
    saveData(duration,taskTypeId);  
	jQuery("#complaintsEditBody").hide();
}

function saveData(_duration,_taskTypeId){
	
	if (_duration == '' || isNaN(_duration)) {
		jAlert('Please enter numeric value');
	} else {

		jQuery.ajax({
			type : "POST",
			url : "tasksScheduler/save/",
			data : {
				duration : _duration,
				taskId : _taskTypeId
			},
			success : function() {
				jAlert('Configuration Successfully Updated', 'Configuration');
				refreshConfiguration();
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

				alert('err.Message');
			}
		});
	}
}

function refreshConfiguration(firstLoad){
	  
	jQuery("#configsetting_surveyTableBody").empty(); 
	jQuery("#configsetting_complaintsTableBody").empty(); 
	jQuery("#configsetting_IssueTableBody").empty(); 
	
	   jQuery.ajax({
		   type: "POST",
		   url: "tasksScheduler/",
		data: {taskName:SURVEY_TASK}, 
		success: function (data) {var r = new Array(), j = -1;         	  
	     for (var key=0, size=data.length; key<size; key++) {
	    	 r[++j] ='<tr><td>';     
	         r[++j] = data[key][0];
	         r[++j] = '</td><td>';
	         r[++j] = data[key][1];
	         r[++j] = '</td><td>';
	         r[++j] = data[key][2];
	         r[++j] = '</td><td align="center">';
	         r[++j] = '<a href="javascript:createEditSurveyRecord('+key+','+data[key][1]+','+data[key][3]+','+data[key][2]+');"><img src="resources/images/studio/edit.png" title="Edit"/></a>';
	         r[++j] = '</td></tr>';
	         } 
	      $('#configsetting_surveyTableBody').html(r.join('')); 
		  if(firstLoad=='true'){
		  $("#configsetting_surveyTable").tablesorter( { 
                		headers: {3: {sorter: false  } },	
                		debug: false, sortList: [[0, 0]], widgets: ['zebra'] } );
			}else{
				$("#configsetting_surveyTable").trigger('update');
			}
			
		  }
	 });
	   
	   jQuery.ajax({
		   type: "POST",
		   url: "tasksScheduler/",
		data: {taskName:COMPLAINTS_TASK}, 
		success: function (data) {var r = new Array(), j = -1;         	  
	     for (var key=0, size=data.length; key<size; key++) {
	    	 r[++j] ='<tr><td>';  
	    	 r[++j] = data[key][0];
	         r[++j] = '</td><td>';
	         if(COMP_RES==data[key][0]){
	           r[++j] = 'Respond By';
	         }else if(COMP_ACK==data[key][0]){     	 
	    	   r[++j] = 'Acknowledge By';
	         }
	         r[++j] = '</td><td>';	         
	         r[++j] = 'Reported On';
	         r[++j] = '</td><td>';
	         r[++j] = data[key][2];
	         r[++j] = '</td><td align="center">';
	         r[++j] = '<a href="javascript:createEditComplaintRecord('+key+','+data[key][3]+','+data[key][2]+');"><img src="resources/images/studio/edit.png" title="Edit"/></a>';
	         r[++j] = '</td></tr>';
	         } 
	      $('#configsetting_complaintsTableBody').html(r.join('')); 
		  
		  if(firstLoad=='true'){
		  $("#configsetting_complaintsTable").tablesorter( { 
                		headers: {4: {sorter: false  } },	
                		debug: false, sortList: [[0, 0]], widgets: ['zebra'] } );
			}else{
			$("#configsetting_complaintsTable").trigger('update'); 
			}
		  
		    
		  
		  }
	 });
	   
	    var r = new Array();
	   j = -1;   
	   var keyIssueResolveBy=0;
	   jQuery.ajax({
		   type: "POST",
		   url: "tasksScheduler/",
		data: {taskName:ISSUE_INSP_BY_DATE}, 
		async:false,
		success: function (data) {
		keyIssueResolveBy=data.length;
		 j = -1;         	  
	     for (var key=0, size=data.length; key<size; key++) {
	    	 r[++j] = '<tr><td>';
	    	 r[++j] = data[key][0];	         
	         r[++j] = '</td><td>';
	         r[++j] = 'Inspect By';
	    	 r[++j] = '</td><td>'; 
	         r[++j] = 'Reported On';
	         r[++j] = '</td><td>';
	         r[++j] = data[key][2];
	         r[++j] = '</td><td align="center">';
	         r[++j] = '<a href="javascript:createEditIssueRecord('+key+','+data[key][3]+','+data[key][2]+','+'1'+');"><img src="resources/images/studio/edit.png" title="Edit"/></a>';
	         r[++j] = '</td></tr>';
	         } 	 
		   }
	 });
	   
	   
	   jQuery.ajax({
		   type: "POST",
		   url: "tasksScheduler/",
		data: {taskName:ISSUE_TASK}, 
		async:false,
		success: function (data) {
		 var tempkey;
	     for (var key=0, size=data.length; key<size; key++) {
	    	 tempkey=key+keyIssueResolveBy;
	    	 r[++j] = '<tr><td>';
	    	 r[++j] = data[key][0];	        
	         r[++j] = '</td><td>';
	         r[++j] = 'Resolve By';
	    	 r[++j] ='</td><td>';  
	         r[++j] = 'Inspected On';
	         r[++j] = '</td><td>';
	         r[++j] = data[key][2];
	         r[++j] = '</td><td align="center">';
	         r[++j] = '<a href="javascript:createEditIssueRecord('+tempkey+','+data[key][3]+','+data[key][2]+','+'2'+');"><img src="resources/images/studio/edit.png" title="Edit"/></a>';
	         r[++j] = '</td></tr>';
	         } 
	      }
	 });
	 if(r.length>0){
	    $('#configsetting_IssueTableBody').html(r.join(''));
		
		if(firstLoad=='true'){
			$("#configsetting_IssueTable").tablesorter({ 
                		headers: {4: {sorter: false  } },	
                		debug: false, sortList: [[0, 0]], widgets: ['zebra'] });
		}
		else{
			$("#configsetting_IssueTable").trigger('update');
		}
		
	 }
	jQuery("#configSetting_accordion").accordion({fillSpace: true});
  
 
}

