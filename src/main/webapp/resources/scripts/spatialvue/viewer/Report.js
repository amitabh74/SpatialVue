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

SpatialVue.Report = function (_map, _searchdiv) {

    
    map = _map;
    searchdiv = _searchdiv;
    showResultsinDialog = true;
    var filterdata=null;
    var reportYear=null;
    jQuery.get('resources/templates/viewer/report.html', function (template) {
        
    	jQuery.ajax({
            async: false,
            type: "GET",
            url: "report/getyear",
            success: function (data) {
                reportYear = data;

            }
    		});
    	
    	addTab($._('report'),template);
    	
    	$('#span-close').attr('title',$._('close_title'));
    	
    	//jQuery("#Report_MasterDetailsBody").empty();
		//jQuery("#Report_MasterDetailsTmpl").tmpl().appendTo("#Report_MasterDetailsBody");
		$(function () {
            $("#rptStartDate").datepicker({
                dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
        });
		
		$(function () {
			$("#rptEndDate").datepicker({
				dateFormat: 'dd/mm/yy',
				changeMonth: true,
				changeYear: true
            }).attr('readonly','readonly');
		});
		for(yr = 0; yr < reportYear.length; yr++) {
			jQuery("#rptQYear").append(jQuery("<option></option>").attr("value", reportYear[yr]).text(reportYear[yr])); 
			jQuery("#rptFinYear").append(jQuery("<option></option>").attr("value", reportYear[yr]).text(reportYear[yr])); 			
			
		}
		//$("#divFromTodate").hide();
		$("#divQuarter").hide();
		$("#divfinYear").hide();
		
		var radios =$('input[name=rptAreaFilter]');//document.forms["assignIssueForm"].elements["assignIssue"];
		for(var i = 0, max = radios.length; i < max; i++) {
		    radios[i].onclick = function() {
		    	if(this.value=="snp"){
		    		jQuery("#rpt_areaName").empty();	
					$('.DD-areaFilter').hide();				
		    	}else if(this.value=="county"){
		    		jQuery("#rpt_areaName").empty();
		    		$('.DD-areaFilter').hide();
					//jQuery("#rpt_areaName").append(jQuery("<option></option>").attr("value", "Conwy").text("Conwy"));
		    		//jQuery("#rpt_areaName").append(jQuery("<option></option>").attr("value", "Gwynedd").text("Gwynedd"));
		    		
		    	}else if(this.value=="region"){
		    		jQuery("#rpt_areaName").empty();
					$('.DD-areaFilter').hide();
		    		//jQuery("#rpt_areaName").append(jQuery("<option></option>").attr("value", "North").text("North"));
		    		//jQuery("#rpt_areaName").append(jQuery("<option></option>").attr("value", "South").text("South"));
		    	}
		    	else if(this.value=="wardenarea"){
		    		$('.DD-areaFilter').show();
					jQuery.ajax({
		    		       async:false,
		    		    	type: "GET",              
		    		        url: STUDIO_URL + "path/warden_area/",        		               
		    		        success: function (data) {
		    		        	filterdata=data
		    		        	
		    		        }
		    		    });
		    		 jQuery("#rpt_areaName").empty();
		    		  jQuery.each(filterdata, function (i, warden_areas) {    	
		    				jQuery("#rpt_areaName").append(jQuery("<option></option>").attr("value", warden_areas.wardenArea).text(warden_areas.wardenArea));        
		    		 });
		    	}
		    	else if(this.value=="community"){
		    		$('.DD-areaFilter').show();
					jQuery.ajax({
		    		       async:false,
		    		    	type: "GET",              
		    		        url: STUDIO_URL + "path/community",        		               
		    		        success: function (data) {
		    		        	filterdata=data
		    		        	
		    		        }
		    		    });
		    		 jQuery("#rpt_areaName").empty();
		    		 jQuery.each(filterdata, function (i, _communitylist) {    	
		    				jQuery("#rpt_areaName").append(jQuery("<option></option>").attr("value", _communitylist.name).text(_communitylist.name));        
		    			 });
		    	}
		    	
		    }
		}
		
		//time filter
		var radios =$('input[name=rptDateFilter]');
		for(var i = 0, max = radios.length; i < max; i++) {
		    radios[i].onclick = function() {
		    	if(this.value=="1"){
		    		$("#divFromTodate").show();
		    		$("#divQuarter").hide();
		    		$("#divfinYear").hide();		    		
		    	}else if(this.value=="2"){
		    		$("#divFromTodate").hide();
		    		$("#divQuarter").show();
		    		$("#divfinYear").hide();    	}
		    	else if(this.value=="3"){
		    		$("#divFromTodate").hide();
		    		$("#divQuarter").hide();
		    		$("#divfinYear").show();
		    	}
		    }
		}
		translateReportLabels();
    });
	
}

function translateReportLabels(){
	$('#report_type').html($._('report_type'));
	$('#report_area').html($._('report_area'));
	//$('#SNPAfilter').attr("text", $._('report_snpa'));
	$('#report_snpa_filter').html($._('report_snpa'));

	$('#report_county_filter').html($._('report_county'));
	$('#report_warden_filter').html($._('report_warden_area'));
	$('#report_indvwarden_filter').html($._('report_individual_warden'));
	$('#report_indvcounty_filter').html($._('report_individual_community'));
	$('#report_period').html($._('report_period'));
	$('#from_filter').html($._('report_from'));
	$('#quarter_filter').html($._('report_quarter'));
	$('#financial_year_filter').html($._('report_financial_year'));
	$('#report_start_date').html($._('report_start_date'));
	$('#report_end_date').html($._('report_end_date'));
	$('#btnReportGenerator').attr("value", $._('generate_report'));
	
	$('.lbl_year').html((lang=='cy')?'Blwyddyn':'Year');
	$('#lbl_quarter').html((lang=='cy')?'Chwarter':'Quarter');
/****************Report Type Translation-by Aparesh*****************/
	
	jQuery("#reporttype").empty();	   
	jQuery("#reporttype").append(jQuery("<option></option>").attr("value", "pathcondition").text((lang=='cy')?'Cyflwr Llwybr HT':'Row Path Condition'));
	jQuery("#reporttype").append(jQuery("<option></option>").attr("value", "maintenancework").text((lang=='cy')?'Gwaith Cynnal HT':'Row Maintenance Work'));        
	jQuery("#reporttype").append(jQuery("<option></option>").attr("value", "maintenancebyprovider").text((lang=='cy')?'Gwaith Cynnal HT fesul Darparwr':'Row Maintenance By Provider'));        
	jQuery("#reporttype").append(jQuery("<option></option>").attr("value", "networksurveybywarden").text((lang=='cy')?'Arolwg Rhwydwaith HT fesul Warden':'Row Network Survey By Warden'));        
	jQuery("#reporttype").append(jQuery("<option></option>").attr("value", "completedworksbySNPA").text((lang=='cy')?"Gwaith HT wedi'i gwblhau gan APCE":'Row Completed Works By SNPA'));        
	jQuery("#reporttype").append(jQuery("<option></option>").attr("value", "outstandingworks").text((lang=='cy')?'Gwaith HT heb ei gyflawni':'Row Outstanding Works'));        
	jQuery("#reporttype").append(jQuery("<option></option>").attr("value", "issuesbyresponsibility").text((lang=='cy')?'Materion HT yn ol Cyfrifoldeb':'Row Issues By Responsibility'));        
	jQuery("#reporttype").append(jQuery("<option></option>").attr("value", "complaintsreceived").text((lang=='cy')?'Nifer y Cwynion a gafwyd':'Number of complaints received'));
	
/************************************************/
	
/***********************Quater translation*************************/
	jQuery("#rpt_quarter").empty();	   
	jQuery("#rpt_quarter").append(jQuery("<option></option>").attr("value", "1").text((lang=='cy')?'Chwarter Cyntaf':'First Quarter'));
	jQuery("#rpt_quarter").append(jQuery("<option></option>").attr("value", "2").text((lang=='cy')?'Ail Chwarter':'Second Quarter'));
	jQuery("#rpt_quarter").append(jQuery("<option></option>").attr("value", "3").text((lang=='cy')?'Trydydd Chwarter':'Third Quarter'));
	jQuery("#rpt_quarter").append(jQuery("<option></option>").attr("value", "4").text((lang=='cy')?'Pedwerydd Chwarter':'Fourth Quarter'));
	
/************************************************/
}

function generateReport(){
	var reportfile='report_'+$('#reporttype').val()+'_'+$('input[name=rptAreaFilter]:checked').val();
	var dateFilter=($('input[name=rptDateFilter]:checked').val());
	
	if (dateFilter==1){
		var st_date=$('#rptStartDate').val();
		var end_date=$('#rptEndDate').val();
		if(st_date!="" && end_date!=""){
		$('#hid-startDate').val(convertDateToUSFormat(st_date));
		$('#hid-endDate').val(convertDateToUSFormat(end_date));
		$('#hid-dateLabel').val(st_date+" - "+end_date);
		}
		else{
		jAlert('Enter both Start Date and End Date');
		return;
		}
		
	}
	else if (dateFilter==2){
		
		var qtr=$('#rpt_quarter').val();
		var yr=$('#rptQYear').val();
		
		if(qtr==1){
			$('#hid-startDate').val(yr+"-04-01");
			$('#hid-endDate').val(yr+"-06-30");	
			//$('#hid-dateLabel').val(qtr+"st Quarter "+yr);
			$('#hid-dateLabel').val(((lang=='cy')? "Chwarter Cyntaf ":"First Quarter ")+yr);
		}
		else if(qtr==2){
			$('#hid-startDate').val(yr+"-07-01");
			$('#hid-endDate').val(yr+"-09-30");
			//$('#hid-dateLabel').val(qtr+"nd Quarter "+yr);
			$('#hid-dateLabel').val(((lang=='cy')?"Ail Chwarter ":"Second Quarter ")+yr);
		}	
		else if(qtr==3){
			$('#hid-startDate').val(yr+"-10-01");
			$('#hid-endDate').val(yr+"-12-31");
			//$('#hid-dateLabel').val(qtr+"rd Quarter "+yr);
			$('#hid-dateLabel').val(((lang=='cy')?"Trydydd Chwarter ":"Third Quarter ")+yr);
		}
		else if(qtr==4){
			yr1 = parseInt(yr) + 1;
			
			$('#hid-startDate').val(yr1+"-01-01");
			$('#hid-endDate').val(yr1+"-03-31");
			//$('#hid-dateLabel').val(qtr+"th Quarter "+yr);
			$('#hid-dateLabel').val(((lang=='cy')?"Pedwerydd Chwarter ":"Fourth Quarter ")+yr);
		}
			
		//alert($('#hid-startDate').val() + " " + $('#hid-endDate').val());
	}
	else if(dateFilter==3){
		
		var fyr=$('#rptFinYear').val();
		
		$('#hid-startDate').val(fyr+"-04-01");

		fyr1 = parseInt(fyr) + 1;
		$('#hid-endDate').val(fyr1+"-03-31");
		
		//$('#hid-dateLabel').val("Year "+ fyr);
		$('#hid-dateLabel').val(((lang=='cy')?"Blwyddyn Ariannol ":"Financial Year " )+ fyr);
		
	}
	$('#hid-lang').val(lang);
	$('#hid-reportFile').val(reportfile);
	$('#hid-areaName').val($('#rpt_areaName').val());	
	//alert("Filename:"+$('#hid-reportFile').val()+"-"+"Area Name:"+$('#hid-areaName').val()+"-"+"Start Date:"+$('#hid-startDate').val()+"-"+"End Date:"+$('#hid-endDate').val() );
	
	$("#reportForm").attr("action", "report/pathcondition/");
	
	document.forms["reportForm"].submit();
	
	
}

