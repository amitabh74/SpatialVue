package com.rmsi.spatialvue.studio.service.impl;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
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

import com.rmsi.spatialvue.studio.dao.ImportGPSJobDAO;
import com.rmsi.spatialvue.studio.dao.ImportTabDAO;
import com.rmsi.spatialvue.studio.service.ImportGPSJobService;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;
import com.rmsi.spatialvue.studio.util.ZipFileUtil;

@Service
public class ImportGPSJobServiceImpl implements ImportGPSJobService{

	@Autowired
	private ImportGPSJobDAO importGPSJobDAO;
	
	@Autowired
	private ImportTabDAO importTabDAO;

	public static List<String> furnitureList=null;
	public static List<String> issueList=null;
	public static List<String> surfaceList=null;
	
	public synchronized String importGPSJobFile(InputStream inputStream){
		
		try{
		
		furnitureList=new ArrayList<String>();
		issueList=new ArrayList<String>();
		surfaceList=new ArrayList<String>();
		String tempZipFilePath=ConfigurationUtil.getProperty("temp.zip.file.path").trim();
		String zipFolderPath=ConfigurationUtil.getProperty("job.upload.folder.path").trim();
		StringBuffer jobFileNameByType=new StringBuffer(".JOB");
		String gpsFilePath=null;
				
		if(!createTempZipFile(inputStream,tempZipFilePath))
			return "Please check zip file";
			 
		if(!ZipFileUtil.unzipZipFile(tempZipFilePath, zipFolderPath,jobFileNameByType))
			return "Please check zip file";
		
		gpsFilePath=zipFolderPath+"/"+jobFileNameByType.toString();
		String jobFileName=new File(gpsFilePath).getName();
		
		if(readGPSJobFile(gpsFilePath)){
			/*if(insertData()){
				return "Data imported successfully";
			}else{
				return "Probleam on uploading data.";
			}*/
			return insertData();
		}else{
			return "Please check job file";
		}
		
		
		//if(!importGPSJobDAO.insertCSVData(layerName, insertData))
			
		
		}catch(Exception e){
			e.printStackTrace();
		}
		return "Data imported successfully";
		
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
	
	private boolean readGPSJobFile(String filepath) {
		boolean isFileReadable=false;
		try {
			File objfile = new File(filepath);
			FileInputStream fstream = new FileInputStream(objfile);
			
			DataInputStream in = new DataInputStream(fstream);
			BufferedReader br = new BufferedReader(new InputStreamReader(in));
			String strLine;
		
			boolean startreading = false;
			String dbinfo = null;
			String geom = null;
			boolean startReadingGeom = false;
		
			List<String> geomList = new ArrayList<String>();
		
			// Read File Line By Line
			while ((strLine = br.readLine()) != null) {
				// Print the content on the console
				System.out.println(strLine);
				if (strLine.contains("DB") && startreading != true) {
					startreading = true;
				}
				if (startreading) {
					if (strLine.contains("DB")) {
						if (dbinfo != null) {
							//create record data after getting second DB value in job file
							createFetaureList(dbinfo.substring(dbinfo.indexOf("DB")+3).trim(), geomList);
						}
						dbinfo = strLine;
					//	newRecord = true;
						geomList.removeAll(geomList);
						continue;

					} else {
						//starting reading geom after reading DB from job file
						if (strLine.contains("*GPS")
								|| strLine.contains("$GPS")
								|| strLine.contains("$GIS")
								|| strLine.contains("*GIS")) {
							startReadingGeom = true;
						} else {
							startReadingGeom = false;
						}
					}

					if (startReadingGeom) {
						//reading geom and storing geom with id, feature type
						geom = getGeomFeatureTypeAndFeatureID(strLine, geomList);
						geomList.add(geom);
					}
				}
			}
			
			//for last record
			createFetaureList(dbinfo.substring(dbinfo.indexOf("DB")+3).trim(), geomList);
			// Close the input stream
			in.close();
			
			//uploading furniture
			System.out.println("furnitureList size :"+furnitureList.size());
			System.out.println("issueList size :"+issueList.size());
			System.out.println("surfaceList size :"+surfaceList.size());
			//--------------------------------------------------------
			
			if(furnitureList.size()>0 || issueList.size()>0 || surfaceList.size() >0)
				isFileReadable=true;
			else
				isFileReadable=false;
			
		} catch (Exception e) {// Catch exception if any
			System.err.println("Error: " + e.getMessage());
			isFileReadable=false;
		}
		return isFileReadable;
	}
	
	public String insertData(){
		String result="";
		try{
			Map<String,List<Object>> gpsDataMap=new HashMap<String, List<Object>>();
			gpsDataMap.put("Furniture", createFurnitureDataScript(furnitureList));
			gpsDataMap.put("Surface", createSurfaceDataScript(surfaceList));
			/*if(issueList!=null){
				issueList=importTabService.populateInspetedByAndResolvedByOfIssue(issueList);
			}*/
			gpsDataMap.put("Issues",createIssueDataScript(issueList));
			//importGPSJobDAO.insertCSVData(gpsDataMap);
			//createSurfaceDataScript(surfaceList);
			//createIssueDataScript(issueList);
			//createFurnitureDataScript(furnitureList);
		    result=importGPSJobDAO.insertCSVData(gpsDataMap);
		}catch(Exception ex){
			 result="Probleam on uploading data.";
		}
		return result;
	}
	public static String getGeomFeatureTypeAndFeatureID(String strLine,
			List geomList) {
		
		String geomtype = "", geom = "", geomID = "", featureType = "";
		String[] tempStr = strLine.split(",");
		geomtype = tempStr[1].trim();
		geomID = tempStr[2].trim();
		featureType = tempStr[3].trim();
		geom = tempStr[4].trim() + " " + tempStr[5].trim();
		return geom + ":" + geomtype + ":" + geomID + ":" + featureType;
	}
	
	public static void createFetaureList(String dbinfo, List<String> geom) {

		String sqlValue = "";
		String geomLine = "";
		String geomtype = "";
		int geomID=0;
		int geomsize = geom.size();
		
		for (int i = 0; i < geomsize; i++) {
			
			String tempgeomLine = geom.get(i);
			String[] geomdetail = tempgeomLine.split(":");
			geomtype = geomdetail[3];
			geomID=Integer.parseInt(geomdetail[2]);
			if (i == 0) {
				geomLine = geomdetail[0];
			} else {
				geomLine = geomLine + " ; " + geomdetail[0];
			}
		}

		String[] tempDBinfo = dbinfo.split(",");
			
		if (geomtype.equalsIgnoreCase("Issue") || geomtype.equalsIgnoreCase("FURNITURE")) {
			int dbID = Integer.parseInt(tempDBinfo[0]);
			if(geomID==dbID){
				geomLine="POINT ("+geomLine+ ")";
				sqlValue=geomLine+","+dbinfo;
			}
			if(geomtype.equalsIgnoreCase("Issue")){
				issueList.add(sqlValue);
			}else{
				furnitureList.add(sqlValue);
			}
			
		}
		else if (geomtype.contains("SURFACE")) {
			String dbSurfaceID = tempDBinfo[0];
			if(dbSurfaceID.equalsIgnoreCase(geomtype)){
				geomLine="LINESTRING ("+geomLine+ ")";
				sqlValue=geomLine+","+dbinfo;
				surfaceList.add(sqlValue);
			}
			
		}
	}
	
	public List<Object> createFurnitureDataScript(List<String> furnitureList){
		List<Object> furnitureData=new ArrayList<Object>();
		boolean result=false;
		int typeColumnIndex = 0, conditionColumnIndex = 0, surveyorColumnIndex = 0, photoColumnIndex = 0, updateColumnIndex = 0;
		int furnirureidIdx=0, fidIndex=0, rowIDIndex=0;
			String columnName=ConfigurationUtil.getProperty("furniture.jobfile.columns.mapping").trim();
			//String columnName = "RoW_ID:row_id,FurnitureID:furnitureid,Feature:0,Type:type,Installed:installed_date,Condition:condition,Inspected:last_inspected,Surveyor:surveyor,Notes:notes,Photo:0,Update:0";

			String dbcolumnnName=null;
			// creating
			List<String> objColumn = new ArrayList<String>(Arrays.asList(columnName.split(",")));
			List <Integer> columnListInDB=new ArrayList<Integer>();
			String sqlQuery = "";
			int size = objColumn.size();
			for (int i = 0; i < size; i++) {
				String temp = objColumn.get(i);
				String[] tempColumnmapping = temp.split(":");
				String tabDBColumn = tempColumnmapping[1].trim();
				String tabFileColumn = tempColumnmapping[0].trim();
				if (tabDBColumn.equalsIgnoreCase("type")) {
					typeColumnIndex = i;
				} else if (tabDBColumn.equalsIgnoreCase("condition")) {
					conditionColumnIndex = i;
				} else if (tabDBColumn.equalsIgnoreCase("surveyor")) {
					surveyorColumnIndex = i;
				}
				if (tabDBColumn.equalsIgnoreCase("furnitureid")) {
					furnirureidIdx = i;
				}
				if (tabFileColumn.equalsIgnoreCase("Photo")) {
					photoColumnIndex = i;
				} else if (tabFileColumn.equalsIgnoreCase("Update")) {
					updateColumnIndex = i;
				}
				//for new feature
				if (tabFileColumn.equalsIgnoreCase("fid")) {
					fidIndex = i;
				}
				//for rowid in upper case by Aparesh 
				if (tabFileColumn.equalsIgnoreCase("row_id")) {
					rowIDIndex = i;
				}
				if (!tabDBColumn.equalsIgnoreCase("0")) {
					columnListInDB.add(i);
					
					if (dbcolumnnName==null)
						dbcolumnnName = tabDBColumn;
					else
						dbcolumnnName = dbcolumnnName + "," + tabDBColumn;
				}
			
			}
			
			//getting lookup values
			Map<String,String> furnitureTypelkp=importGPSJobDAO.getLookupData("SELECT typeid,lower(Type) from snpa.furniture_type_lkp",2,1);
			Map<String,String> furnitureConditionlkp=importGPSJobDAO.getLookupData("SELECT conditionid,lower(condition) FROM snpa.furniture_condition_lkp",2,1);
			
			
			//uploading photo
			Map<Integer,String> furniturePhotoMap=new HashMap<Integer,String>();
			
			//getting fid values;
			Map<Integer,String> newFurnitureMap=new HashMap<Integer,String>();
			
			int furnitureFeatureSize=furnitureList.size();
			List<String> insertdatalist=new ArrayList<String>();
		
			insertdatalist.add("WKT,"+dbcolumnnName+",ishistory");
			for(int i=0;i<furnitureFeatureSize;i++){
				String dbinfo=furnitureList.get(i);
				String[] dbValues=dbinfo.split(",");
				String geomvalue="";
				
				//checking data is update or not only updated data will be uploaded 
				//if data is not updated data is not uploaded on the databse
				String isUpdate=dbValues[updateColumnIndex+2].trim();
				System.out.println("isUpdate furniture::"+isUpdate);
				if(!isUpdate.equalsIgnoreCase("No")){
				
				String typeVal=getValuefromLookupMap(furnitureTypelkp,dbValues[typeColumnIndex+2]);
				dbValues[typeColumnIndex+2]=typeVal;
				String conditionVal=getValuefromLookupMap(furnitureConditionlkp,dbValues[conditionColumnIndex+2]);
				dbValues[conditionColumnIndex+2]=conditionVal;
				int surveyorVal=importGPSJobDAO.getQueryResult("SELECT id from users where name='"+dbValues[surveyorColumnIndex+2]+"'  and active=true and defaultproject<>'Public-RoW'");
				dbValues[surveyorColumnIndex+2]=surveyorVal+"";
				
				//changing value to upper 
				dbValues[rowIDIndex+2]=dbValues[rowIDIndex+2].toString().toUpperCase();
				
				int columnSize=columnListInDB.size();
				String valuesToadd=null;
				for(int j=0;j<columnSize;j++){
					int index=columnListInDB.get(j);
					if(valuesToadd==null)
						valuesToadd=dbValues[index+2];
					else
						valuesToadd=valuesToadd+","+dbValues[index+2];
					
				}
				
				
					int recordNumber=insertdatalist.size();
					if(!dbValues[photoColumnIndex+2].trim().equalsIgnoreCase("")){
						furniturePhotoMap.put(recordNumber,dbValues[photoColumnIndex+2]);
					}
					//map for fid fields
					if(!dbValues[fidIndex+2].trim().equalsIgnoreCase("")){
						newFurnitureMap.put(recordNumber,dbValues[fidIndex+2]);
					}
					
					insertdatalist.add(dbValues[0]+","+valuesToadd+",false");
		    	}//end of update check
			}
			try{
				//added for the new furniture 
				furnitureData.add(insertdatalist);
				furnitureData.add(newFurnitureMap);
				furnitureData.add(furniturePhotoMap);
				
				//result=importGPSJobDAO.insertCSVData("Furniture", insertdatalist,furniturePhotoMap);
									
			}catch(Exception es){
				result=false;
			}
			return furnitureData;
			 
		}
	
	public List<Object> createIssueDataScript(List<String> issueList){
		
			List<Object> issueData=new ArrayList<Object>();
			int issueReasonColumnIndex = 0, typeColumnIndex = 0, surveyorColumnIndex = 0, urgencyColumnIndex = 0, updateColumnIndex = 0, photoColumnIndex = 0;
			int fidIndex=0,actionStatusIndex=-1,inspected_onIndex=0,rowIDIndex=0;
			String columnName=ConfigurationUtil.getProperty("issue.jobfile.columns.mapping").trim();
			//String columnName = "RoW_ID:row_id,IssueID:0,Type:issuetype,Why:why,Surveyedon:inspected_on,AssignedTo:assigned_to, Problem:problem, Urgency:urgency, Notes:notes, Update:0";
			String dbcolumnnName=null;
			// creating
			List<String> objColumn = new ArrayList<String>(Arrays.asList(columnName.split(",")));
			List <Integer> columnListInDB=new ArrayList<Integer>();
			String sqlQuery = "";
			//getting fid values;
			Map<Integer,String> newFeatureMap=new HashMap<Integer,String>();
			
			int size = objColumn.size();
			for (int i = 0; i < size; i++) {
				String temp = objColumn.get(i);
				String[] tempColumnmapping = temp.split(":");
				String tabDBColumn = tempColumnmapping[1].trim();
				String tabFileColumn = tempColumnmapping[0].trim();
				if (tabDBColumn.equalsIgnoreCase("issuetype")) {
					typeColumnIndex = i;
				} else if (tabDBColumn.equalsIgnoreCase("why")) {
					issueReasonColumnIndex = i;
				} else if (tabDBColumn.equalsIgnoreCase("assigned_to")) {
					surveyorColumnIndex = i;
				}
				if (tabFileColumn.equalsIgnoreCase("urgency")) {
					urgencyColumnIndex = i;
				} else if (tabFileColumn.equalsIgnoreCase("Update")) {
					updateColumnIndex = i;
				}
				
				if (tabFileColumn.equalsIgnoreCase("Photo")) {
					photoColumnIndex = i;
				} 
				if (tabFileColumn.equalsIgnoreCase("actionstatus")) {
					actionStatusIndex = i;
				} 
				
				if (tabFileColumn.equalsIgnoreCase("Surveyedon")) {
					inspected_onIndex = i;
				} 
				//else if (tabFileColumn.equalsIgnoreCase("Update")) {
				//	updateColumnIndex = i;
				//}
				
				//for new feature
				if (tabFileColumn.equalsIgnoreCase("fid")) {
					fidIndex = i;
				}
				//for rowid in upper case by Aparesh 
				if (tabFileColumn.equalsIgnoreCase("row_id")) {
					rowIDIndex = i;
				}
				
				if (!tabDBColumn.equalsIgnoreCase("0")) {
					columnListInDB.add(i);
					
					if (dbcolumnnName==null)
						dbcolumnnName = tabDBColumn;
					else
						dbcolumnnName = dbcolumnnName + "," + tabDBColumn;
				}
			
			}
			
			//getting lookup values
			Map<String,String> issueTypelkp=importGPSJobDAO.getLookupData("SELECT issuetypeid,lower(type) from snpa.issue_type_lkp",2,1);
			Map<String,String> issueReasonlkp=importGPSJobDAO.getLookupData("SELECT reasonid,lower(reason) from snpa.issue_reason_lkp",2,1);
			Map<String,String> issueUrgencylkp=importGPSJobDAO.getLookupData("SELECT urgencyid,lower(urgency_type) from snpa.issue_urgency_lkp",2,1);
			Map<String,String> issueActionlkp=importGPSJobDAO.getLookupData("SELECT actionstatusid,lower(action_status) from snpa.action_status_lkp",2,1);
			
			//uploading photo
			Map<Integer,String> issuePhotoMap=new HashMap<Integer,String>();
			int issueFeatureSize=issueList.size();
			List<String> insertdatalist=new ArrayList<String>();
			//insertdatalist.add("the_geom,"+dbcolumnnName+",ishistory");
			
			//adding extra column action status,inspected_on,responsibility,isHistory columns which are not part of gps job file  
			String fieldToAddinDB="";
			String includedFieldValues="";
			if(actionStatusIndex > 0){
				fieldToAddinDB=",inspect_by,reported_on,resolve_by,responsibility,ishistory";
				includedFieldValues=",,1,false";
			}
			else{
				fieldToAddinDB=",inspect_by,reported_on,actionstatus,resolve_by,responsibility,ishistory";
				includedFieldValues=",1,,1,false";
			}
				
			insertdatalist.add("WKT,"+dbcolumnnName+fieldToAddinDB);
			
			for(int i=0;i<issueFeatureSize;i++){
				String dbinfo=issueList.get(i);
				String[] dbValues=dbinfo.split(",");
				String geomvalue="";
				
				//checking data is update or not only updated data will be uploaded 
				//if data is not updated data is not uploaded on the databse
				String isUpdate=dbValues[updateColumnIndex+2].trim();
				System.out.println("isUpdate issues::"+isUpdate);
				if(!isUpdate.equalsIgnoreCase("No")){
					
				String typeVal=getValuefromLookupMap(issueTypelkp,dbValues[typeColumnIndex+2]);
				/*if(!dbValues[typeColumnIndex+2].isEmpty() && typeVal.isEmpty()){
					String error="Error on getting value from lookup";
					System.out.println("error:::"+error);
					//return
				}else{*/
					dbValues[typeColumnIndex+2]=typeVal;
				//}
				
				String issueReasonVal=getValuefromLookupMap(issueReasonlkp,dbValues[issueReasonColumnIndex+2]);
				dbValues[issueReasonColumnIndex+2]=issueReasonVal;
				String issueUrgencyVal=getValuefromLookupMap(issueUrgencylkp,dbValues[urgencyColumnIndex+2]);
				dbValues[urgencyColumnIndex+2]=issueUrgencyVal;
				
				//changing value to upper 
				dbValues[rowIDIndex+2]=dbValues[rowIDIndex+2].toString().toUpperCase();
				
				if(actionStatusIndex > 0){
					String issueOpenVal=getValuefromLookupMap(issueActionlkp,dbValues[actionStatusIndex+2]);
					dbValues[actionStatusIndex+2]=issueOpenVal;
				}
				
				
				String surveyorVal=importGPSJobDAO.getUserEmail(dbValues[surveyorColumnIndex+2]);
				dbValues[surveyorColumnIndex+2]=surveyorVal.trim();
				
				//inspected_on value
				String inspected_onValue=null;
				if(inspected_onIndex>0)
				 inspected_onValue=dbValues[inspected_onIndex+2];
				
				int columnSize=columnListInDB.size();
				String valuesToadd=null;
				for(int j=0;j<columnSize;j++){
					int index=columnListInDB.get(j);
					if(j==0)
						valuesToadd=dbValues[index+2];
					else
						valuesToadd=valuesToadd+","+dbValues[index+2];
					
				}
				
				
					// map for fid fields
					int recordNumber=insertdatalist.size();
					if (!dbValues[fidIndex + 2].trim().equalsIgnoreCase("")) {
						newFeatureMap.put(recordNumber , dbValues[fidIndex + 2]);
					}
	
					if (!dbValues[photoColumnIndex + 2].trim().equalsIgnoreCase("")) {
						issuePhotoMap.put(recordNumber, dbValues[photoColumnIndex + 2]);
					}
					// adding data to insert into database
					//value of inspected_on is setting in insert stmt for inspect_by,reported_on,
					insertdatalist.add(dbValues[0] + "," + valuesToadd +","+inspected_onValue+","+inspected_onValue
							+ includedFieldValues);
				}//end of update check
			}
			try{
				
				issueData.add(populateInspetedByAndResolvedByOfIssue(insertdatalist));
				//issueData.add(insertdatalist);
				issueData.add(newFeatureMap);
				issueData.add(issuePhotoMap);
				//importGPSJobDAO.insertCSVData("Issues", insertdatalist,null);
			}catch(Exception es){
				
			}
			 return issueData;
		
	}
	public List<Object> createSurfaceDataScript(List<String> surfaceList) {
		
		List<Object> surfaceData=new ArrayList<Object>();
		int typeColumnIndex = 0, surveyorColumnIndex = 0, 
		surfaceConditionColumnIndex = 0, updateColumnIndex = 0,photoColumnIndex=0;
		int fidIndex=0;
		String columnName=ConfigurationUtil.getProperty("surface.jobfile.columns.mapping").trim();
	
		String dbcolumnnName=null;
		// creating
		List<String> objColumn = new ArrayList<String>(Arrays.asList(columnName.split(",")));
		List <Integer> columnListInDB=new ArrayList<Integer>();
		
		//getting fid values;
		Map<Integer,String> newFeatureMap=new HashMap<Integer,String>();
		//uploading photo
		Map<Integer,String> photoMap=new HashMap<Integer,String>();
		
		String sqlQuery = "";
		int size = objColumn.size();
		for (int i = 0; i < size; i++) {
			String temp = objColumn.get(i);
			String[] tempColumnmapping = temp.split(":");
			String tabDBColumn = tempColumnmapping[1].trim();
			String tabFileColumn = tempColumnmapping[0].trim();
			if (tabDBColumn.equalsIgnoreCase("type")) {
				typeColumnIndex = i;
			} else if (tabDBColumn.equalsIgnoreCase("condition")) {
				surfaceConditionColumnIndex = i;
			} else if (tabDBColumn.equalsIgnoreCase("surveyor")) {
				surveyorColumnIndex = i;
			}
			else if (tabFileColumn.equalsIgnoreCase("Update")) {
				updateColumnIndex = i;
			}
			else if (tabFileColumn.equalsIgnoreCase("Photo")) {
				photoColumnIndex = i;
			}else if (tabFileColumn.equalsIgnoreCase("fid")) {
				fidIndex = i;
			}
			
			if (!tabDBColumn.equalsIgnoreCase("0")) {
				columnListInDB.add(i);
				
				if (dbcolumnnName==null)
					dbcolumnnName = tabDBColumn;
				else
					dbcolumnnName = dbcolumnnName + "," + tabDBColumn;
			}
		
		}
		
		//getting lookup values
		Map<String,String> surfaceTypelkp=importGPSJobDAO.getLookupData(" SELECT typeid,lower(type) from snpa.surface_type_lkp",2,1);
		Map<String,String> surfaceConditionlkp=importGPSJobDAO.getLookupData(" SELECT conditionid,lower(condition) from snpa.surface_condition_lkp",2,1);
		//Map<String,String> issueUrgencylkp=importGPSJobDAO.getLookupData("SELECT urgencyid,urgency_type from snpa.issue_urgency_lkp",2,1);
		
		
		int surfaceFeatureSize=surfaceList.size();
		List<String> insertdatalist=new ArrayList<String>();
		//insertdatalist.add("the_geom,"+dbcolumnnName+",ishistory");
		insertdatalist.add("WKT,"+dbcolumnnName+",ishistory");
		for(int i=0;i<surfaceFeatureSize;i++){
			String dbinfo=surfaceList.get(i);
			String[] dbValues=dbinfo.split(",");
			String geomvalue="";
			
			//checking data is update or not only updated data will be uploaded 
			//if data is not updated data is not uploaded on the databse
			/*if(updateColumnIndex>0){
				
			}*/
			String isUpdate=dbValues[updateColumnIndex+2].trim();
			System.out.println("isUpdate surface::"+isUpdate);
			if(!isUpdate.equalsIgnoreCase("No")){
				
			String typeVal=getValuefromLookupMap(surfaceTypelkp,dbValues[typeColumnIndex+2]);
			dbValues[typeColumnIndex+2]=typeVal;
			String surfaceConditionVal=getValuefromLookupMap(surfaceConditionlkp,dbValues[surfaceConditionColumnIndex+2]);
			dbValues[surfaceConditionColumnIndex+2]=surfaceConditionVal;
										
			int surveyorVal=importGPSJobDAO.getQueryResult("SELECT id from users where name='"+dbValues[surveyorColumnIndex+2]+"' and active=true and defaultproject<>'Public-RoW'");
			if(surveyorVal!=0)
				dbValues[surveyorColumnIndex+2]=surveyorVal+"";
			else
				dbValues[surveyorColumnIndex+2]="";
			
			int columnSize=columnListInDB.size();
			String valuesToadd=null;
			for(int j=0;j<columnSize;j++){
				int index=columnListInDB.get(j);
				if(valuesToadd==null)
					valuesToadd=dbValues[index+2];
				else
					valuesToadd=valuesToadd+","+dbValues[index+2];
				
			}
			
				int recordNumber=insertdatalist.size();
				if(!dbValues[photoColumnIndex+2].trim().equalsIgnoreCase("")){
					photoMap.put(recordNumber,dbValues[photoColumnIndex+2]);
				}
				if(!dbValues[fidIndex+2].trim().equalsIgnoreCase("")){
					newFeatureMap.put(recordNumber,dbValues[fidIndex+2]);
				}
				String geom=dbValues[0];//.replace(";", ",");
				insertdatalist.add(geom+","+valuesToadd+",false");
			}//end of update check
		}
		try{
			surfaceData.add(insertdatalist);
			surfaceData.add(newFeatureMap);
			surfaceData.add(photoMap);
			//importGPSJobDAO.insertCSVData("Surface", insertdatalist,null);
		}catch(Exception es){
			
		}
		return surfaceData;
	}
	public String getValuefromLookupMap(Map<String,String> lkp,String key){
		
		String value=null;
		String tempKey=key.toLowerCase();
		if(lkp.containsKey(tempKey)){
			value=lkp.get(tempKey);
		}
		return value;
		
	}
	
	 public static void copyfile(String srFile, String dtFile){
		  try{
		  File f1 = new File(srFile);
		  File f2 = new File(dtFile);
		  InputStream in = new FileInputStream(f1);
		  OutputStream out = new FileOutputStream(f2);

		  byte[] buf = new byte[1024];
		  int len;
		  while ((len = in.read(buf)) > 0){
		  out.write(buf, 0, len);
		  }
		  in.close();
		  out.close();
		  System.out.println("File copied.");
		  }
		  catch(Exception ex){
		  System.out.println(ex.getMessage() + " in the specified directory.");
		 
		  }
	 }
	 
	 ///for calculating date
	 
	 public List<String> populateInspetedByAndResolvedByOfIssue(List<String> issueData){
			String fieldName=issueData.get(0);
			List<String> updateddataList=new ArrayList<String>();
			updateddataList.add(fieldName);
			List<String> fieldNameMapping=Arrays.asList(fieldName.split(","));
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
			List<String> holidayList=importTabDAO.getHolidayList();
			
			//for getting issue why
			Map<String,String> issueReasonlkp=importGPSJobDAO.getLookupData("SELECT reasonid,lower(reason) from snpa.issue_reason_lkp",1,2);
			Map<String,Integer> inspetByTaskScheduler=importGPSJobDAO.getSurveyTypeAndTargetDaysFromTask("Issue Inspected By Date");
			Map<String,Integer> resolveByTaskScheduler=importGPSJobDAO.getSurveyTypeAndTargetDaysFromTask("Issue Resolve Date");
			
			
			//find lookupmap
			Map<String,String> issueUrgencylkp=importGPSJobDAO.getLookupData("SELECT urgencyid,lower(urgency_type) from snpa.issue_urgency_lkp",1,2);
			Map<String,String> issueStatuslkp=importGPSJobDAO.getLookupData("SELECT urgencyid,lower(urgency_type) from snpa.issue_urgency_lkp",1,2);
			int dataSize=issueData.size();
			for(int i=1;i<dataSize;i++){
				String values=issueData.get(i);
				String[] tempFileData=values.split(",");
				String tempReportedOn="",why="",urgency="",inspectedon="";
				
				String inspectBy="";
				why=tempFileData[whyIdx];
				why=issueReasonlkp.get(why);
				if(reported_onidx!=0){
					tempReportedOn=tempFileData[reported_onidx];
					inspectBy=calculateInspetByDateOfIssue(inspetByTaskScheduler,tempReportedOn,why,holidayList);
					if(inspect_byIdx!=0)
						tempFileData[inspect_byIdx]=inspectBy;
				}
				
				urgency=tempFileData[urgencyIdx];
				
				inspectedon=tempFileData[inspect_onIdx];
				
				//uregency value
				urgency=issueUrgencylkp.get(urgency);
				//String inspectBy=calculateInspetByDateOfIssue(inspetByTaskScheduler,tempReportedOn,why,holidayList);
				String resolvedBy=calculateInspetByDateOfIssue(resolveByTaskScheduler,inspectedon,urgency,holidayList);
			
				
				//String inspectBy=calculateInspetByDateOfIssue(inspetByTaskScheduler,tempReportedOn,why);
				//String resolvedBy=calculateInspetByDateOfIssue(resolveByTaskScheduler,inspectedon,urgency);
				
				if(resolve_byIdx!=0)
				tempFileData[resolve_byIdx]=resolvedBy;
				
				String valuesToadd=null;
				for(int j=0;j<tempFileData.length;j++){
					if(valuesToadd!=null)
						valuesToadd=valuesToadd+","+tempFileData[j];
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
				if(why!=null){
					why=why.toLowerCase();
					int noOfdays=inspetByTaskScheduler.get(why);
					inspetByDate=calculateBusinessDays(reportedOn,noOfdays,holidayList);
				}
			}catch(Exception ex){
				inspetByDate=null;
			}
			return inspetByDate;
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
		
	
}


