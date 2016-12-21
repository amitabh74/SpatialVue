package com.rmsi.spatialvue.studio.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rmsi.spatialvue.studio.dao.ImportTabDAO;
import com.rmsi.spatialvue.studio.service.ImportTabService;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;
import com.rmsi.spatialvue.studio.util.Ogr2OgrUpload;
import com.rmsi.spatialvue.studio.util.ZipFileUtil;

@Service
public class ImportTabServiceImpl implements ImportTabService{

	@Autowired
	private ImportTabDAO importTabDAO;
	String logFilePath="";
	public String importTabFile(String layerName,InputStream inputStream,String mode){
		boolean isImported=false;
		String successMsg="";
		try{
		
		if(layerName.contains(":"))
			layerName=layerName.substring(layerName.indexOf(":")+1 , layerName.length());
		//layerName="Surface_temp";//to delete
		logFilePath=ConfigurationUtil.getProperty("log.file.path").trim();
		String fwToolPath=ConfigurationUtil.getProperty("fw.tool.path").trim();
		String batchFilePath=ConfigurationUtil.getProperty("batch.file.path").trim();
		String tempZipFilePath=ConfigurationUtil.getProperty("temp.zip.file.path").trim();
		String csvFileBath=ConfigurationUtil.getProperty("csv.folder.path").trim();
		String columnMapping=ConfigurationUtil.getProperty(layerName.toLowerCase().trim()+".columns.mapping").trim();
		String zipFolderPath=ConfigurationUtil.getProperty("zip.folder.path").trim();
		StringBuffer tabFileNameByType=new StringBuffer(".tab");
		String historyAndKeyFieldName=ConfigurationUtil.getProperty(layerName.toLowerCase().trim()+".history.key.column.name").trim();
		
		//addded for getting lookup field mapping
		String lookUpTableMapping=ConfigurationUtil.getProperty(layerName.toLowerCase().trim()+".lookupTable.columns.mapping").trim();
		
		//String logFilePath=ConfigurationUtil.getProperty("log.file.path").trim();
		
		String tabFilePath=null;
				
		if(!createTempZipFile(inputStream,tempZipFilePath))
			isImported= false;
		
		 
		if(!ZipFileUtil.unzipZipFile(tempZipFilePath, zipFolderPath,tabFileNameByType))
			isImported= false;
		
		tabFilePath=zipFolderPath+"/"+tabFileNameByType.toString();
		String tabFileName=new File(tabFilePath).getName();
		tabFileName=tabFileName.substring(0, tabFileName.lastIndexOf("."));
		
		Ogr2OgrUpload.createCSVfromTab(batchFilePath, fwToolPath, tabFilePath, csvFileBath, columnMapping, layerName,tabFileName);
		List<String> insertData=getCSVContents(csvFileBath+"/"+tabFileName.trim()+".csv",lookUpTableMapping,layerName);
		if(insertData!=null){
			successMsg=importTabDAO.insertCSVData(layerName, insertData,mode,historyAndKeyFieldName,logFilePath);
			/*if(!importTabDAO.insertCSVData(layerName, insertData,mode,historyAndKeyFieldName,logFilePath))
				isImported= false;
			else
				isImported= true;*/
		}else{
			isImported= false;
		}
		
		}catch(Exception e){
			isImported=false;
			e.printStackTrace();
			importTabDAO.writeDataLog(logFilePath, new String []{"Importing Tab file on "+new Date()+" failed due to following error",e.getMessage()});
		}
		//return isImported;
		return successMsg;
		
	}
	
	private boolean createTempZipFile(InputStream inputStream,String tempTabFilePath){	
		
		FileOutputStream outputStream =null;		
		try{			
			outputStream = new FileOutputStream(tempTabFilePath);
	        int readBytes = 0;
	        byte[] buffer = new byte[10000];
	        while ((readBytes = inputStream.read(buffer, 0, 10000)) != -1) {
	                outputStream.write(buffer, 0, readBytes);
	        }        
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}finally{			
	        try {
				inputStream.close();
				outputStream.close();
			} catch (Exception e) {				
				e.printStackTrace();
			}
		}
		return true;
	}
	
	
	private List<String> getCSVContents(String filepath,String lookUpTableMapping,String layerName) {
		List<String> objList=new ArrayList<String>();
		
		try {
			// FileReader always assumes default encoding is OK!
			File objCSVFile=new File(filepath);
			if(objCSVFile.exists()){
				BufferedReader input = new BufferedReader(new FileReader(objCSVFile));
				
						
				boolean isFirstLine=true;
				try {
					String line = null; 
					while ((line = input.readLine()) != null) {
							objList.add(line);
					}
				} finally {
					input.close();
				}
			}
			else{
				importTabDAO.writeDataLog(logFilePath, new String []{"Importing Tab file on "+new Date()+" failed due to following error"," can not create csv file .Please check FWT tool settings"});
				objList=null;
			}
		} catch (IOException ex) {
			ex.printStackTrace();
			importTabDAO.writeDataLog(logFilePath, new String []{"Importing Tab file on "+new Date()+" failed due to following error",ex.getMessage()});
			objList=null;
		}
		
		return setlookUpValues(objList,layerName,lookUpTableMapping);
	}
	
	/*private List<String> getCSVContents(String filepath,String lookUpTableMapping,String layerName) {
		List<String> objList=new ArrayList<String>();
		
		try {
			// FileReader always assumes default encoding is OK!
			File objCSVFile=new File(filepath);
			if(objCSVFile.exists()){
				BufferedReader input = new BufferedReader(new FileReader(objCSVFile));
				
				//changing tab file lookUpValue
				Map<Integer,Map<String,String>> lookUpMap=null;
				String fieldName="";
				
				List<String> fieldNameMapping=new ArrayList<String>();
				
				boolean isFirstLine=true;
				try {
					String line = null; 
					while ((line = input.readLine()) != null) {
						if(isFirstLine){
							isFirstLine=false;
							fieldName=line;
							lookUpMap=populateLookUpValueMap(lookUpTableMapping,fieldName);
							fieldNameMapping=Arrays.asList(fieldName.split("\t"));
							objList.add(line);
						}else{
							String[] tempFileData=line.split("\t");
							String valuesToadd=null;
							for(int j=0;j<tempFileData.length;j++){
								
								if(lookUpMap.containsKey(j)){
									Map<String,String> templkpMap=lookUpMap.get(j);
									String tempStr=getValuefromLookupMap(templkpMap,tempFileData[j]);
									if(valuesToadd==null)
										valuesToadd=tempStr;
									else
										valuesToadd=valuesToadd+"\t"+tempStr;
								}else{
									if(valuesToadd==null)
										valuesToadd=tempFileData[j];
									else
										valuesToadd=valuesToadd+"\t"+tempFileData[j];
								}
							}
							//calculating next survey date for path
							if(layerName.equalsIgnoreCase("row_paths"))
								valuesToadd=getNextSurveyDateOfPath(fieldNameMapping,valuesToadd);
							
							
							//String dbValues=tempFileData.toString();
							objList.add(valuesToadd);
						}
					}
				} finally {
					input.close();
				}
			}
			else{
				importTabDAO.writeDataLog(logFilePath, new String []{"Importing Tab file on "+new Date()+" failed due to following error"," can not create csv file .Please check FWT tool settings"});
				objList=null;
			}
		} catch (IOException ex) {
			ex.printStackTrace();
			importTabDAO.writeDataLog(logFilePath, new String []{"Importing Tab file on "+new Date()+" failed due to following error",ex.getMessage()});
			objList=null;
		}
		if(layerName.equalsIgnoreCase("Issues"))
		populateInspetedByAndResolvedByOfIssue(objList);
		return objList;
	}*/
	
	private Map<Integer,Map<String,String>> populateLookUpValueMap(String alllookUpTableMapping,String fieldName) {
		Map<Integer, Map<String, String>> objAllLookUpData = new HashMap<Integer, Map<String, String>>();
		String[] allLookUpTbl = alllookUpTableMapping.split(";;");
		int totalLookupTbl = allLookUpTbl.length;
		
		String csvSEPARATOR="\t";
		try {
			String[] columnList = fieldName.split(csvSEPARATOR);
			int columnSize=columnList.length;
			for (int i = 0; i < totalLookupTbl; i++) {
				String[] singleLookupTblMapping = allLookUpTbl[i].split(":");
				String lookUpFieldname = singleLookupTblMapping[0];
				String lookUpTblname = singleLookupTblMapping[1];
				String lookUpTblId = singleLookupTblMapping[2];
				String lookUptblRelationField = singleLookupTblMapping[3];
				
				int lookupColumnindex=0;
				
				for(int j = 0; j < columnSize; j++){
					if (lookUpFieldname.equalsIgnoreCase(columnList[j])) {
						lookupColumnindex = j;
						break;
					}
				}
				String whereClause="";
				//check for users only active user are used
				if(lookUpTblname.equalsIgnoreCase("users")){
					whereClause=" where active=true";
				}
				
				String sql = "select lower(" + lookUptblRelationField + "),"
						+ lookUpTblId + " from " + lookUpTblname +whereClause;
				Map<String, String> templookUpMap = importTabDAO
						.getLookupData(sql);
				objAllLookUpData.put(lookupColumnindex, templookUpMap);
			}

		} catch (Exception ex) {

		}

		return objAllLookUpData;
	}
	
	public String getValuefromLookupMap(Map<String,String> lkp,String key){
		
		String value=null;
		String tempKey=key.toLowerCase().trim();
		if(lkp.containsKey(tempKey)){
			value=lkp.get(tempKey);
		}
		return value;
		
	}
	
	private String getNextSurveyDateOfPath(List<String> fieldNameMapping,String values){
		System.out.println("FIELDS: " +fieldNameMapping );
		System.out.println("VALUES: " +values );
		String[] tempFileData=values.split("\t");
		int nextsurveydateIndex=0;
		String nextsurveydate=null;
		String type=null;
		String _class=null;
		String promoted_route=null;
		String lastsurvey=null;
		for(int j=0;j<fieldNameMapping.size();j++){
			String fieldname=fieldNameMapping.get(j);
			if(fieldname.equalsIgnoreCase("dateofnextsurvey")){
				nextsurveydateIndex=j;
			}
			if(fieldname.equalsIgnoreCase("type")){
				type=tempFileData[j];
			}
			if(fieldname.equalsIgnoreCase("_class")){
				_class=tempFileData[j];
			}
			/*if(fieldname.equalsIgnoreCase("promoted_route")){
				promoted_route=tempFileData[j];
			}*/
			if(fieldname.equalsIgnoreCase("lastsurvey")){
				lastsurvey=tempFileData[j];
			}
		}
		Map<Integer,Map<Integer,Integer>> taskScheduler=importTabDAO.getTaskSchdulerForPath();
		
		if(type!=null){
			try{
				//Map<Integer,Integer> priorityAndDays=taskScheduler.get(Integer.parseInt(type));
				// we are only use Prow which have id 1 in DB
				Map<Integer,Integer> priorityAndDays=taskScheduler.get(1);
				if(priorityAndDays!=null){
					int noOfMonth=priorityAndDays.get(Integer.parseInt(_class));
					String DATE_FORMAT="yyyy-mm-dd";
					SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
					if(lastsurvey!=null && !lastsurvey.equalsIgnoreCase("")){
						String [] tempDate=lastsurvey.split("/");
						
					Date lastsurveydate=new Date(Integer.parseInt(tempDate[2])+"/"+Integer.parseInt(tempDate[1])+"/"+Integer.parseInt(tempDate[0]));
					//Date lastsurveydate=new Date(lastsurvey);
						 Calendar calender = Calendar.getInstance();
						 calender.set(Integer.parseInt(tempDate[2]), Integer.parseInt(tempDate[1])-1, Integer.parseInt(tempDate[0]));
						 System.out.println("######"+ calender.getTime().toString());
						 calender.add(Calendar.YEAR, noOfMonth/12);
						 System.out.println("######"+ calender.getTime().toString());
						 //nextsurveydate=sdf.format(calender.getTime());
						 String m="";
						 if(calender.get(Calendar.MONTH)+1>10){
							 m=(calender.get(Calendar.MONTH)+1)+"";
						 }
						 else{
							 m="0"+(calender.get(Calendar.MONTH)+1) ;
						 }
						 nextsurveydate=calender.get(Calendar.DATE)+"/"+m+"/"+calender.get(Calendar.YEAR);
						 System.out.println("###### nextsurveydate "+ nextsurveydate);
					}else{
						nextsurveydate="";
					}
				}else{
					nextsurveydate="";
				}
				
			}catch(Exception ex){
				nextsurveydate="";
			}
			
		}else{
			nextsurveydate="";
		}
		
		
		
		tempFileData[nextsurveydateIndex]=nextsurveydate;
		String valuesToadd=null;
		for(int i=0;i<tempFileData.length;i++){
			if(valuesToadd!=null)
				valuesToadd=valuesToadd+"\t"+tempFileData[i];
			else
				valuesToadd=tempFileData[i];
		}
		return valuesToadd;
	}
	
	/*
	 * populating issue fields
	 */
	
	public List<String> populateInspetedByAndResolvedByOfIssue(List<String> issueData){
		String fieldName=issueData.get(0);
		List<String> updateddataList=new ArrayList<String>();
		updateddataList.add(fieldName);
		List<String> fieldNameMapping=Arrays.asList(fieldName.split("\t"));
		int inspect_byIdx=0,resolve_byIdx=0,reported_onidx=0,urgencyIdx=0,whyIdx=0,inspect_onIdx=0;
			
		int nextsurveydateIndex=0;
		String nextsurveydate=null;
		String type=null;
		String _class=null;
		String promoted_route=null;
		String lastsurvey=null;
		for(int j=0;j<fieldNameMapping.size();j++){
			String fieldname=fieldNameMapping.get(j);
			if(fieldname.equalsIgnoreCase("inspect_by")){
				inspect_byIdx=j;
			}
			if(fieldname.equalsIgnoreCase("resolve_by")){
				resolve_byIdx=j;
			}
			if(fieldname.equalsIgnoreCase("reported_on")){
				reported_onidx=j;
			}
			if(fieldname.equalsIgnoreCase("urgency")){
				urgencyIdx=j;
			}
			if(fieldname.equalsIgnoreCase("why")){
				whyIdx=j;
			}
			if(fieldname.equalsIgnoreCase("inspected_on")){
				inspect_onIdx=j;
			}
			
		}
		List<String> holidayList=getHolidayList();
		Map<String,Integer> inspetByTaskScheduler=importTabDAO.getSurveyTypeAndTargetDaysFromTask("Issue Inspected By Date");
		Map<String,Integer> resolveByTaskScheduler=importTabDAO.getSurveyTypeAndTargetDaysFromTask("Issue Resolve Date");
		
		int dataSize=issueData.size();
		for(int i=1;i<dataSize;i++){
			String values=issueData.get(i);
			String[] tempFileData=values.split("\t");
			String tempReportedOn="",why="",urgency="",inspectedon="";
			
			tempReportedOn=tempFileData[reported_onidx];
			urgency=tempFileData[urgencyIdx];
			why=tempFileData[whyIdx];
			inspectedon=tempFileData[inspect_onIdx];
			String inspectBy=calculateInspetByDateOfIssue(inspetByTaskScheduler,tempReportedOn,why,holidayList);
			String resolvedBy=calculateInspetByDateOfIssue(resolveByTaskScheduler,inspectedon,urgency,holidayList);
		
			
			//String inspectBy=calculateInspetByDateOfIssue(inspetByTaskScheduler,tempReportedOn,why);
			//String resolvedBy=calculateInspetByDateOfIssue(resolveByTaskScheduler,inspectedon,urgency);
			tempFileData[inspect_byIdx]=inspectBy;
			tempFileData[resolve_byIdx]=resolvedBy;
			
			String valuesToadd=null;
			for(int j=0;j<tempFileData.length;j++){
				if(valuesToadd!=null)
					valuesToadd=valuesToadd+"\t"+tempFileData[j];
				else
					valuesToadd=tempFileData[j];
			}
			updateddataList.add(valuesToadd);
			
		}
		
		return updateddataList;
	}
	
	private String calculateInspetByDateOfIssue(Map<String,Integer> inspetByTaskScheduler,String reportedOn,String why,List<String> holidayList){
		String inspetByDate="";
		try{
			why=why.toLowerCase();
			int noOfdays=inspetByTaskScheduler.get(why);
			/*String DATE_FORMAT="yyyy-mm-dd";
			SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
			Date reportedOnDate=new Date(reportedOn);
			Calendar calender = Calendar.getInstance();
			calender.set(reportedOnDate.getYear(), reportedOnDate.getMonth(), reportedOnDate.getDate());
			calender.add(Calendar.DATE, noOfdays);
			inspetByDate = sdf.format(calender.getTime());*/
			inspetByDate=calculateBusinessDays(reportedOn,noOfdays,holidayList);
		}catch(Exception ex){
			inspetByDate=null;
		}
		return inspetByDate;
	}
	
	private List<String> setlookUpValues(List<String> issueData,String layerName,String lookUpTableMapping){
		List<String> objList = new ArrayList<String>();
		if (layerName.equalsIgnoreCase("Issues")) {
			issueData = populateInspetedByAndResolvedByOfIssue(issueData);
		}
		if (issueData != null) {
			Map<Integer, Map<String, String>> lookUpMap = null;
			String fieldName = issueData.get(0);

			List<String> fieldNameMapping = new ArrayList<String>();
			lookUpMap = populateLookUpValueMap(lookUpTableMapping, fieldName);
			fieldNameMapping = Arrays.asList(fieldName.split("\t"));
			objList.add(fieldName);
			
			//for update 
			String updateFieldName="Update";
			int updateColumnidx=-1;
			int allFieldCount=fieldNameMapping.size();
			
			//if(!keyFieldName.equalsIgnoreCase("0")){
				for(int a=0;a<allFieldCount;a++){
					if(fieldNameMapping.get(a).equalsIgnoreCase(updateFieldName)){
						updateColumnidx=a;
					}
				}
			
			try {
				int size = issueData.size();
				for (int i = 1; i < size; i++) {
					String data = issueData.get(i);
					String[] tempFileData = data.split("\t");
					String valuesToadd = null;
					//checking data is update or not only updated data will be uploaded 
					//if data is not updated data is not uploaded on the database
					String isUpdateValue = tempFileData[updateColumnidx];
					System.out.println("updateValue::"+isUpdateValue);
					if(!isUpdateValue.equalsIgnoreCase("No")){
						for (int j = 0; j < tempFileData.length; j++) {
							if (lookUpMap.containsKey(j)) {
								Map<String, String> templkpMap = lookUpMap.get(j);
								String tempStr = null;
								if(tempFileData[j]!=""){
									System.out.println(">>Lookup field Name : "+ fieldNameMapping.get(j));
									tempStr = getValuefromLookupMap(templkpMap,
										tempFileData[j]);
								}else{
									System.out.println("2: "+ fieldNameMapping.get(j));
									continue;
								}
								System.out.println(">>Lookup field Name:"+ fieldNameMapping.get(j) + " ----Lookup Name: " + tempFileData[j] + " -----Lookup Name: " + tempStr);
								if(!tempFileData[j].isEmpty() && tempStr==null){
									importTabDAO
									.writeDataLog(
											logFilePath,
											new String[] {
													"Importing Tab file on layer "+layerName 
															+ " failed due to error finding on look up value of \""+tempFileData[j]+"\" on Field \""+fieldNameMapping.get(j)+"\""});
									return null;
								}
								if (valuesToadd == null)
									valuesToadd = tempStr;
								else
									valuesToadd = valuesToadd + "\t" + tempStr;
							} else {
								if (valuesToadd == null)
									valuesToadd = tempFileData[j];
								else
									valuesToadd = valuesToadd + "\t"
											+ tempFileData[j];
							}
						}
						// calculating next survey date for path
						if (layerName.equalsIgnoreCase("row_paths"))
							valuesToadd = getNextSurveyDateOfPath(fieldNameMapping,
									valuesToadd);
	
						// String dbValues=tempFileData.toString();
						objList.add(valuesToadd);
					}
				}

			}

			catch (Exception ex) {
				ex.printStackTrace();
				importTabDAO
						.writeDataLog(
								logFilePath,
								new String[] {
										"Importing Tab file on "
												+ new Date()
												+ " failed due to following error on look up value",
										ex.getMessage() });
				objList = null;
			}
		}

		return objList;
	}
	
	private List<String> getHolidayList(){
		return importTabDAO.getHolidayList();
	}
	
	
	private boolean isHoliday(Date currDate,List<String> holidayList){
		
		for (int i = 0; i < holidayList.size(); i++) {	
		String hday=holidayList.get(i);
		String[] dateArr =hday.split("-");
		int year=Integer.parseInt(dateArr[0]);
		int month=Integer.parseInt(dateArr[1]);
		int day=Integer.parseInt(dateArr[2]);
		
		
		if ((currDate.getYear() == year
		  && currDate.getMonth() == month
		  && currDate.getDate() == day)
		  ) {							
				return true;
		}

	}
	
		return false;

}
	
	private String calculateBusinessDays(String date,int _nodays,List<String> holidayList){
			
		if(!date.isEmpty() && date!=null){
			String DATE_FORMAT="yyyy-mm-dd";
			SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
			String[] dateArr=date.split("/");
			int year=Integer.parseInt(dateArr[2]);
			int month=Integer.parseInt(dateArr[1]);
			int day=Integer.parseInt(dateArr[0]);
			Date reportedOnDate=new Date(year,month-1,day);
			Calendar calender = Calendar.getInstance();
			calender.set(reportedOnDate.getYear(), reportedOnDate.getMonth(), reportedOnDate.getDate());
			
			
			int businessDays=_nodays;
	        for (int i = 0; i < businessDays; i++) {
	            //System.out.println(df.format(c.getTime()));
	            int dayOfWeek = calender.get(Calendar.DAY_OF_WEEK);
	            if (dayOfWeek == Calendar.SATURDAY || dayOfWeek == Calendar.SUNDAY || isHoliday(calender.getTime(),holidayList)) { // If it's Saturday skip to Monday
	                //c.add(Calendar.DATE, 2);
	            	businessDays++;
	            } 
	            calender.add(Calendar.DATE, 1);
	        }
	        calender.set(reportedOnDate.getYear(), reportedOnDate.getMonth(), reportedOnDate.getDate());
	        calender.add(Calendar.DATE, businessDays);
	        
	        int tempMonth=(calender.get(Calendar.MONTH)+1);
	        return calender.get(Calendar.DATE)+"/"+((tempMonth<10)? "0"+tempMonth:tempMonth)+"/"+calender.get(Calendar.YEAR);
		}else{
			return null;
		}
			
	}
}


