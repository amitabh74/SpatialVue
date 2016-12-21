package com.rmsi.spatialvue.studio.dao.hibernate;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.db.util.DataAccessFactory;
import com.rmsi.spatialvue.studio.dao.ImportGPSJobDAO;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;

/**
 * @author Aparesh.Chakraborty
 *
 */

@Repository
public class ImportGPSJobHibernateDAO extends GenericHibernateDAO<Object, Long> implements
ImportGPSJobDAO {
	
	public boolean insertCSVData(String tablename, List<String> insertData,Map<Integer,String> furniturePhotoMap){
		
		String fileUpLoadingPath=ConfigurationUtil.getProperty("attachment.upload.path").trim();
		String insertDataIds="Successfully imported Job data in "+tablename +" :";
		String failToInsertDataIds="Fail imported Job data in "+tablename +" :";
		String logFilePath=ConfigurationUtil.getProperty("log.file.path").trim();
		DateFormat formatter= new SimpleDateFormat(ConfigurationUtil.getProperty("jobfile.date.format").trim());
		String soursePhotoFilePath=ConfigurationUtil.getProperty("job.upload.folder.path").trim();	
		boolean sucess = true;
		String fieldNames = "";
		int geomColumindex=1;
		PreparedStatement ps = null;
		String tableSchema =null;
		Connection connection=null;
		int row_idIndex=0;
		try {
			
			connection=DataAccessFactory.getInstance().getConnection(super.getEntityManager());
			DatabaseMetaData databaseMetaData =null;
			ResultSet resultSet = null;
			String tableName = null;
			try{
				databaseMetaData = connection.getMetaData();
				String[] types = {"TABLE"};
				resultSet = databaseMetaData.getTables(null, null,null, types);
				while (resultSet.next()) {
				  tableName = resultSet.getString(3);
				  if(tableName.equals(tablename)){
			       tableSchema = resultSet.getString(2); 
			       break;
				  }
			    }			   
			    
			}catch(Exception e){
				e.printStackTrace();
			}finally{
				DataAccessFactory.getInstance().closeDBResource(null, null, resultSet, null);
			}
						
			
			StringBuffer geomColumnName=new StringBuffer();
			Map<String,String> oblTable=getTableField(connection,tablename,geomColumnName);
			boolean isGeomtypeMulti=isGeomtypeMulti(connection,tablename);	
								
			String strLine;
			String[] recordArr = null;

			int i = 0;

			fieldNames = (String) insertData.get(0);
			try {
				fieldNames = fieldNames.replaceAll("\"", "");
			} catch (Exception e) {

			}
			fieldNames=fieldNames.replaceAll(";", ",");
			String [] fieldsname=fieldNames.split(",");
			fieldNames=fieldNames.replace("WKT", geomColumnName.toString());
			
			List objFinalColumnname=new ArrayList(Arrays.asList(fieldNames.split(",")));			
			Map<Integer,String> obj=checkDataTypeofLayer(oblTable,objFinalColumnname);
			
			int count = fieldNames.split(",").length;

			System.out.println("There are" + " " + count + " " + "Fields");
			String fieldValueString = "";
			for (int k = 1; k < count+1; k++) {
				if(k==geomColumindex){
					if(isGeomtypeMulti)
					    fieldValueString=fieldValueString+"st_multi(ST_GeomFromText(?,27700))";
					else
						fieldValueString=fieldValueString+"ST_GeomFromText(?,27700)";
				}else{
					fieldValueString = fieldValueString + ",?";	
				}
			}
			

			
			String idfield="";
			if(tablename.equalsIgnoreCase("Furniture")){
				idfield="furnitureid";
				fieldNames=fieldNames+",unresolved_issues";
				fieldValueString=fieldValueString+",false";
				
			}else if(tablename.equalsIgnoreCase("Issues")){
				idfield="gid";
			}else if(tablename.equalsIgnoreCase("surface")){
				idfield="surface_id";
				fieldNames=fieldNames+",unresolved_status";
				fieldValueString=fieldValueString+",false";
			}
			
			for(int a=0;a<count;a++){
				if(fieldsname[a].equalsIgnoreCase(idfield)){
					row_idIndex=a;
					break;
				}
			}
			
			String insertSql = "INSERT INTO " +tableSchema+ ".\""+tablename+ "\""+ " (" + fieldNames
					+ ") VALUES (" + fieldValueString + ")";
			
			connection=DataAccessFactory.getInstance().getConnection(super.getEntityManager());
			connection.setAutoCommit(false);
			ps = connection.prepareStatement(insertSql,Statement.RETURN_GENERATED_KEYS);
			int datasize = insertData.size();
			for (i = 1; i < datasize; i++) {
				try{
					
				strLine =insertData.get(i);
				recordArr = strLine.split(",");
				int j = 1;
				
				for (int k = 0; k < count; k++) {

					
					
					if (j == geomColumindex) {
						if (recordArr[k].length() == 0)
							ps.setObject(j, null);
						else {
							String geomVal  = recordArr[k]
									.replaceAll("\"", "");
							geomVal=geomVal.replace(";", ",");
							ps.setObject(j, geomVal);
						}

					}

					else {
						String getcolumnType = obj.get(k);
						if (getcolumnType != null) {
							if (getcolumnType.equalsIgnoreCase("Date")) {
								if (recordArr[k].length() == 0)
									ps.setDate(j, null);
								else {
									try{
										 String dateStr=recordArr[k];
										 ps.setDate(j, new java.sql.Date(formatter.parse(dateStr).getTime()));
									}catch(Exception ex){
										ps.setDate(j, null);
									}
								}
							} else if (getcolumnType
									.equalsIgnoreCase("integer")) {
								if (recordArr[k].length() == 0)
									ps.setString(j, null);
								else
									ps.setInt(j, Integer.parseInt(recordArr[k]));
							} else if (getcolumnType
									.equalsIgnoreCase("boolean")) {
								if (recordArr[k].length() == 0) {
									ps.setString(j, null);
									// ps.setBoolean(j, false);
								} else{
									boolean flag=false;
									if(recordArr[k]=="1" || recordArr[k]=="T" ){
										flag=true;
									}else{
										flag=false;
									}
									ps.setBoolean(j,flag);
								}
									
							}
							else if (getcolumnType
									.equalsIgnoreCase("double precision")) {
								if (recordArr[k].length() == 0)
									ps.setDouble(j, 0.0);
								else
									ps.setDouble(j, Double.parseDouble(recordArr[k]));
							}
							else {
								if (recordArr[k].length() == 0)
									ps.setString(j, null);
								else
									ps.setString(j, recordArr[k]);
							}
						}

					}
					j++;
				}
				
				System.out.println(ps.toString());	
				String rowid=recordArr[1];
			
				if(!tablename.equalsIgnoreCase("Issues")){
					updatehistory(idfield,rowid,tablename,tableSchema);
				}
				
				ps.execute();
				if(furniturePhotoMap!=null && furniturePhotoMap.size()>0){
					
					ResultSet keys = ps.getGeneratedKeys();
					/*if(furniturePhotoMap.containsKey(i)){
						int gid=0;
						while(keys.next()){
							gid=keys.getInt(1);	
						}
						uploadImages(gid,furniturePhotoMap.get(i),fileUpLoadingPath,soursePhotoFilePath);
					}
					*/
				}
				
				insertDataIds=insertDataIds+":"+rowid;
			} catch (Exception e) {
				sucess = false;			
				System.err.println("Error: " + e.getMessage());	
				failToInsertDataIds=insertDataIds+":"+recordArr[1] +e.getMessage();
				break;
			}
			if(!sucess)
				break;
			}
			writeDataLog(logFilePath,new String []{failToInsertDataIds});
		} catch (Exception e) {
			sucess = false;			
			System.err.println("Error: " + e.getMessage());				
		}finally{
			try{
			if (sucess) {
				connection.commit();
				System.err.println("Data uploaded successfully.");	
			}else{
				connection.rollback();
			}
			}catch(Exception e){e.printStackTrace();}
			DataAccessFactory.getInstance().closeDBResource(null, null, null, ps);
		}		
			
		return sucess;

	}
	
	
	
	private Map<String,String> getTableField(Connection con,String tablename,StringBuffer geomColumnName){
		Map<String,String> objTableSchema=null;
		Statement stmt =null;
		ResultSet rs=null;
		try {
			
		   stmt = con.createStatement();
		   String sql="select column_name,data_type,udt_name from information_schema.columns where table_name = '"+tablename.trim()+"'";
		   
		   rs=stmt.executeQuery(sql);
		   objTableSchema=new HashMap<String,String>();
		   
		   String columnName=null;
		   String columnDataType=null;
		   
		   while(rs.next()){
			   
			   columnName=rs.getString("column_name");
			   columnDataType=rs.getString("data_type");
			   objTableSchema.put(columnName, columnDataType);
			   
			   if("geometry".equalsIgnoreCase(rs.getString("udt_name"))){
				   geomColumnName.delete(0, geomColumnName.length());
				   geomColumnName.append(columnName);
			   }
		   }
			   
			   
		} catch (Exception e) {
			// TODO Auto-generated catch block
			objTableSchema=null;
			e.printStackTrace();
		}finally{
			DataAccessFactory.getInstance().closeDBResource(null, stmt, rs, null);
		}
		return objTableSchema;
	   
	    
	}
	
	
	private boolean isGeomtypeMulti(Connection connection,String tableName){
		
		boolean isGeomtypeMulti=false;
		Statement statement =null;
		ResultSet resultSet=null;
		try {
			
		   statement = connection.createStatement();
		   String sqlQuery="SELECT type FROM geometry_columns where f_table_name='"+tableName+"'";
		   resultSet=statement.executeQuery(sqlQuery);		   
		   String geomType=null;		   
		   if(resultSet.next()){
			   geomType=resultSet.getString("type");			   
			   if(geomType!=null && geomType.toUpperCase().trim().startsWith("MULTI"))
				   isGeomtypeMulti=true;			   
		   }
			   
			   
		} catch (Exception e) {	
			e.printStackTrace();
		}finally{
			DataAccessFactory.getInstance().closeDBResource(null, statement, resultSet, null);
		}
		return isGeomtypeMulti;
	   
	    
	}
	
	private Map<Integer,String> checkDataTypeofLayer(Map<String,String> dbschema, List<String> layerSchema){
		
		Iterator iterDb=dbschema.keySet().iterator();
		Map<Integer,String> objcolumnIndexAndDataType=new HashMap<Integer,String>();
		for(int i=0;i< layerSchema.size();i++){
			String columnName=layerSchema.get(i);
			if(dbschema.containsKey(columnName.toLowerCase())){
				String dataType=dbschema.get(columnName.toLowerCase());
				objcolumnIndexAndDataType.put(i,dataType);
			}else {
				//error
			}
		}
		return objcolumnIndexAndDataType;
	}
	public Map<String,String> getLookupData(String sql,int keyindex,int valueindex){
		  Map<String,String> lkpdata=new HashMap<String,String>();
		  Connection con=null;
		  Statement stmt=null;
		  ResultSet rs =null;
			try {
				 con = DataAccessFactory.getInstance().getConnection(super.getEntityManager());
				 stmt = con.createStatement();
				 rs = stmt.executeQuery(sql);
				while (rs.next()) {
					String key = rs.getString(keyindex);
					String value = rs.getString(valueindex);
					lkpdata.put(key, value);
				}
			} catch (Exception e) {
				lkpdata = null;
				e.printStackTrace();
			}
			finally{
				DataAccessFactory.getInstance().closeDBResource(null, stmt, rs, null);
			}
			return lkpdata;
	  }
	  
	  public int getQueryResult(String sql){
		  int id=0;
		  Connection con=null;
		  Statement stmt=null;
		  ResultSet rs =null;
			try {
			
				 con = DataAccessFactory.getInstance().getConnection(super.getEntityManager());
				 stmt = con.createStatement();
				 rs = stmt.executeQuery(sql);
				while (rs.next()) {
					id=rs.getInt(1);
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}finally{
				DataAccessFactory.getInstance().closeDBResource(con, stmt, rs, null);
			}
			return id;
	  }
	  
	  public String getUserEmail(String userName){
		  String id="";
		  Connection con=null;
		  Statement stmt=null;
		  ResultSet rs =null;
			try {
				String sql="SELECT email from users where LOWER(name)='"+userName.toLowerCase()+"' and active=true and defaultproject<>'Public-RoW'";
				 con = DataAccessFactory.getInstance().getConnection(super.getEntityManager());
				 stmt = con.createStatement();
				 rs = stmt.executeQuery(sql);
				while (rs.next()) {
					id=rs.getString(1);
				}
			} catch (Exception e) {
				
				e.printStackTrace();
			}finally{
				DataAccessFactory.getInstance().closeDBResource(con, stmt, rs, null);
			}
			return id;
	  }
	  
	  public boolean updatehistory(String fieldName,String rowid,String tablename,String tableSchema){
		  boolean update=false;
		  Connection con=null;
		  Statement stmt=null;
		  ResultSet rs =null;
			try {
				 String updateSql="update "+tableSchema+ ".\""+tablename+ "\""+" set ishistory =true where "+fieldName+"='"+rowid+"'";
				 con = DataAccessFactory.getInstance().getConnection(super.getEntityManager());
				 stmt = con.createStatement();
				 int rowcount = stmt.executeUpdate(updateSql);
				 if(rowcount>0)
				 update=true;
			} catch (Exception e) {
				e.printStackTrace();
			}finally{
				DataAccessFactory.getInstance().closeDBResource(null, stmt, rs, null);
			}
			return update;
	  }
	  
	  private boolean writeDataLog(String filePath, String[] fileLines) {

			try {
				File newbatchFile= new File(filePath);
				if(!newbatchFile.exists())
					newbatchFile.createNewFile();
				FileWriter fwrite = new FileWriter(new File(filePath),true);
				for (String line : fileLines)
					fwrite.write(line + "\n");
				fwrite.flush();
				fwrite.close();
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}

			return true;

		}
	  public boolean uploadImages(String layername, Integer value,String _filename,String filepath, Connection con,String soursePhotoFilePath){
			 
		  String filename=_filename.toLowerCase();
			 String desPath=soursePhotoFilePath+"/"+filename;
			 File desFile=new File(desPath);
			 if(desFile.exists()){
				 Statement stmt=null;
				  ResultSet rs =null;
					try {
						 
						 String extension=filename.substring(filename.lastIndexOf(".")+1);
						 String insertSql="INSERT INTO attachment (layername,filename,filepath,gid, keyfield, description, extension, tenantid)"
							 		+	" VALUES ( '"+layername+"','"+ 
							 		filename+"','"+filepath+"',"+value+", '','Uploaded from Job file', '"+ extension+"', 5)";
						 //File f=new File();
						 System.out.println("######Attachment : "+ insertSql);	 
						 stmt = con.createStatement();
						 stmt.execute(insertSql); 
						 copyfile(soursePhotoFilePath+"/"+filename,filepath);
					} catch (Exception e) {
						e.printStackTrace();
					}finally{
						DataAccessFactory.getInstance().closeDBResource(null, stmt, rs, null);
					}
					return true; 
			 }else{
				
				 // writeDataLog(logFilePath,new String []{"Importing Photo from Tab file on "+new Date()," File not exist"});
				 return false;
			 }
			 
		  }
	  
	  /*public boolean uploadImages(Integer value,String filename,String filepath,String soursePhotoFilePath){
		 
		  Connection con=null;
		  Statement stmt=null;
		  ResultSet rs =null;
			try {
				 
				 String extension=filename.substring(filename.lastIndexOf("."));
				 con = DataAccessFactory.getInstance().getConnection(super.getEntityManager());
					 String insertSql="INSERT INTO attachment (layername,filename,filepath,gid, keyfield, description, extension, tenantid)"
					 		+	" VALUES ( 'Furniture','"+ 
					 		filename+"','"+filepath+"',"+value+", '','Uploaded from Job file ', '"+ extension+"', 5)";
				 //File f=new File();
				System.out.println("######Attachment : "+ insertSql);	 
				 stmt = con.createStatement();
				 stmt.execute(insertSql); 
				 copyfile(soursePhotoFilePath+"/"+filename,filepath);
			} catch (Exception e) {
				e.printStackTrace();
			}finally{
				DataAccessFactory.getInstance().closeDBResource(null, stmt, rs, null);
			}
			return true;
	  }
	  
		public boolean copyfile(String srFile, String dtFile){
		  boolean isFileCopied=false;
		  try{
		  File sourceFile = new File(srFile);
		  File f2 = new File(dtFile);
		  if(sourceFile.exists()){
			  InputStream in = new FileInputStream(sourceFile);
			  OutputStream out = new FileOutputStream(f2);
			  byte[] buf = new byte[1024];
			  int len;
			  while ((len = in.read(buf)) > 0){
			  out.write(buf, 0, len);
			  }
			  in.close();
			  out.close();
			  System.out.println("File copied.");
			  isFileCopied=true;
		  }else{
			  isFileCopied=false;
		  }
		  }
		  catch(Exception ex){
			  isFileCopied=false;
		  System.out.println(ex.getMessage() + " in the specified directory.");
		 
		  }
		  return isFileCopied;
	 }*/
	  
	  public boolean copyfile(String srFile, String dtFile){
		  boolean isFileCopied=false;
		  try{
		  File f1 = new File(srFile);
		  File f3 = new File(dtFile);
		  
		  if (!f3.exists()) {

				boolean success = new File(dtFile).mkdir();
				System.out.println("###############"+ success);
			}
		  
		  File f2=new File(dtFile+"/"+f1.getName());
		  
   	   
		  if(f1.exists()){
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
			  isFileCopied=true;
		  }else{
			  isFileCopied=false;
		  }
		  }
		  catch(Exception ex){
			  isFileCopied=false;
		  System.out.println(ex.getMessage() + " in the specified directory.");
		 
		  }
		  return isFileCopied;
	 }
	  
	  /*
	   * function for inserting  Gps Job file data into the databse
	   * 
	   */
	  
	  @SuppressWarnings("unchecked")
	public String insertCSVData(Map<String,List<Object>> dataMap){
			
		 
		   String resultMsg="";
			String fileUpLoadingPath=ConfigurationUtil.getProperty("attachment.upload.path").trim();
			String logFilePath=ConfigurationUtil.getProperty("log.file.path").trim();
			DateFormat formatter= new SimpleDateFormat(ConfigurationUtil.getProperty("jobfile.date.format").trim());
			
			Map<String, String> newFurnnitureMap=null;
			Map<String, String> newSurfaceMap=null;
			Map<String, String> issueResultMap=null;
			
			List<String> layerList=new ArrayList<String>();
			layerList.add("Furniture");
			layerList.add("Surface");
			layerList.add("Issues");
			
			
			try {
			for (int x = 0; x < layerList.size(); x++) {
				String tablename = layerList.get(x);
				if (dataMap.containsKey(tablename)) {
					List<Object> tempList = dataMap.get(tablename);
					List<String> insertData = (List<String>) tempList.get(0);
					Map<Integer, String> newFeatureMap = (Map<Integer, String>) tempList
							.get(1);
					Map<Integer, String> photoMap = (Map<Integer, String>) tempList
							.get(2);

					if(tablename.equalsIgnoreCase("Furniture")){
						newFurnnitureMap=insertDataIntoDB(tablename, insertData, newFeatureMap,
								photoMap);
						if(newFurnnitureMap!=null){
							resultMsg=newFurnnitureMap.get("result");
						}
					}else if(tablename.equalsIgnoreCase("Issues")){
						
						insertData=updateNewFeatureId(insertData,newFeatureMap,newFurnnitureMap,newSurfaceMap);
						issueResultMap=insertDataIntoDB(tablename, insertData, newFeatureMap,
								photoMap);
						if(issueResultMap!=null){
							resultMsg=resultMsg+"\n"+issueResultMap.get("result");
						}
					}else if(tablename.equalsIgnoreCase("surface")){
						newSurfaceMap=insertDataIntoDB(tablename, insertData, newFeatureMap,
								photoMap);
						if(newSurfaceMap!=null){
							resultMsg=resultMsg+"\n"+newSurfaceMap.get("result");
						}
					}
					
					

				}
			}
			} catch (Exception e) {
				resultMsg = "Probleam on uploading data";			
				System.err.println("Error: " + e.getMessage());			
			}	
			return resultMsg;

		}
	  
	  private Map<String, String> insertDataIntoDB(String tablename,List<String> insertData,Map<Integer,String> newFeatureMap,Map<Integer,String> photoMap){

		  	Map<String,String> genFeatureIdMap=new HashMap<String,String>();
		  	Map<Integer,String> generatedFeatureMap=new HashMap<Integer,String>();
			String fileUpLoadingPath=ConfigurationUtil.getProperty("attachment.upload.path").trim();
			String insertDataIds="";//"Successfully imported Job data in "+tablename +" :";
			String failToInsertDataIds="";//"Fail imported Job data in "+tablename +" :";
			String logFilePath=ConfigurationUtil.getProperty("log.file.path").trim();
			DateFormat formatter= new SimpleDateFormat(ConfigurationUtil.getProperty("jobfile.date.format").trim());
			String soursePhotoFilePath=ConfigurationUtil.getProperty("job.upload.folder.path").trim();
			boolean sucess = true;
			String fieldNames = "";
			int geomColumindex=1;
			PreparedStatement ps = null;
			String tableSchema =null;
			Connection connection=null;
			int row_idIndex=0;
			
			int surfaceIdIdxInIssue=-1,furnitureIdIdxInIssue=-1;
			List<String> furnitureList=null;
			List<String> surfaceList=null;
			//
			
			try {
				
				connection=DataAccessFactory.getInstance().getConnection(super.getEntityManager());
				DatabaseMetaData databaseMetaData =null;
				ResultSet resultSet = null;
				String tableName = null;
				try{
					databaseMetaData = connection.getMetaData();
					String[] types = {"TABLE"};
					resultSet = databaseMetaData.getTables(null, null,null, types);
					while (resultSet.next()) {
					  tableName = resultSet.getString(3);
					  if(tableName.equals(tablename)){
				       tableSchema = resultSet.getString(2); 
				       break;
					  }
				    }			   
				    
				}catch(Exception e){
					e.printStackTrace();
				}finally{
					DataAccessFactory.getInstance().closeDBResource(null, null, resultSet, null);
				}
							
				
				StringBuffer geomColumnName=new StringBuffer();
				Map<String,String> oblTable=getTableField(connection,tablename,geomColumnName);
				boolean isGeomtypeMulti=isGeomtypeMulti(connection,tablename);	
									
				String strLine;
				String[] recordArr = null;

				int i = 0;

				fieldNames = (String) insertData.get(0);
				try {
					fieldNames = fieldNames.replaceAll("\"", "");
				} catch (Exception e) {

				}
				fieldNames=fieldNames.replaceAll(";", ",");
				String [] fieldsname=fieldNames.split(",");
				fieldNames=fieldNames.replace("WKT", geomColumnName.toString());
				
				List objFinalColumnname=new ArrayList(Arrays.asList(fieldNames.split(",")));			
				Map<Integer,String> obj=checkDataTypeofLayer(oblTable,objFinalColumnname);
				
				int count = fieldNames.split(",").length;

				System.out.println("There are" + " " + count + " " + "Fields");
				String fieldValueString = "";
				for (int k = 1; k < count+1; k++) {
					if(k==geomColumindex){
						if(isGeomtypeMulti)
						    fieldValueString=fieldValueString+"st_multi(ST_GeomFromText(?,27700))";
						else
							fieldValueString=fieldValueString+"ST_GeomFromText(?,27700)";
					}else{
						fieldValueString = fieldValueString + ",?";	
					}
				}
				

				
				String idfield="";
				if(tablename.equalsIgnoreCase("Furniture")){
					idfield="furnitureid";
					fieldNames=fieldNames+",unresolved_issues";
					fieldValueString=fieldValueString+",false";
					
				}else if(tablename.equalsIgnoreCase("Issues")){
					idfield="gid";
				}else if(tablename.equalsIgnoreCase("surface")){
					idfield="surface_id";
					fieldNames=fieldNames+",unresolved_status";
					fieldValueString=fieldValueString+",false";
				}
				
				for(int a=0;a<count;a++){
					if(fieldsname[a].equalsIgnoreCase(idfield)){
						row_idIndex=a;
						break;
					}
				}
				
				//for issue
				if(tablename.equalsIgnoreCase("Issues")){
					for(int a=0;a<count;a++){
					 if(tablename.equalsIgnoreCase("Issues")){
						 if(fieldsname[a].equalsIgnoreCase("furnitureid")){
							 furnitureIdIdxInIssue=a;
							 furnitureList=new ArrayList<String>();
					    	 }else if(fieldsname[a].equalsIgnoreCase("surfaceid")){
							 surfaceIdIdxInIssue=a;
							 surfaceList=new ArrayList<String>();
		    				}
					 }
				}
				}
				String insertSql = "INSERT INTO " +tableSchema+ ".\""+tablename+ "\""+ " (" + fieldNames
						+ ") VALUES (" + fieldValueString + ")";
				
				connection=DataAccessFactory.getInstance().getConnection(super.getEntityManager());
				connection.setAutoCommit(false);
				ps = connection.prepareStatement(insertSql,Statement.RETURN_GENERATED_KEYS);
				int datasize = insertData.size();
				for (i = 1; i < datasize; i++) {
					try{
						
					strLine =insertData.get(i);
					recordArr = strLine.split(",");
					int j = 1;
					
					for (int k = 0; k < count; k++) {
						if (j == geomColumindex) {
							if (recordArr[k].length() == 0)
								ps.setObject(j, null);
							else {
								String geomVal  = recordArr[k]
										.replaceAll("\"", "");
								geomVal=geomVal.replace(";", ",");
								ps.setObject(j, geomVal);
							}

						}
						else {
							String getcolumnType = obj.get(k);
							if (getcolumnType != null) {
								if (getcolumnType.equalsIgnoreCase("Date")) {
									if (recordArr[k].length() == 0)
										ps.setDate(j, null);
									else {
										try{
											 String dateStr=recordArr[k];
											 ps.setDate(j, new java.sql.Date(formatter.parse(dateStr).getTime()));
										}catch(Exception ex){
											ps.setDate(j, null);
										}
									}
								} else if (getcolumnType
										.equalsIgnoreCase("integer")) {
									if (recordArr[k].length() == 0)
										ps.setString(j, null);
									else
										ps.setInt(j, Integer.parseInt(recordArr[k]));
								} else if (getcolumnType
										.equalsIgnoreCase("boolean")) {
									if (recordArr[k].length() == 0) {
										ps.setString(j, null);
										// ps.setBoolean(j, false);
									} else{
										boolean flag=false;
										if(recordArr[k]=="1" || recordArr[k]=="T" ){
											flag=true;
										}else{
											flag=false;
										}
										ps.setBoolean(j,flag);
									}
										
								}
								else if (getcolumnType
										.equalsIgnoreCase("double precision")) {
									if (recordArr[k].length() == 0)
										ps.setDouble(j, 0.0);
									else
										ps.setDouble(j, Double.parseDouble(recordArr[k]));
								}
								else {
									if (recordArr[k].length() == 0)
										ps.setString(j, null);
									else
										ps.setString(j, recordArr[k]);
								}
							}

						}
						j++;
					}
					
					System.out.println(ps.toString());	
					String rowid=recordArr[row_idIndex];
				
					if(!tablename.equalsIgnoreCase("Issues")){
						updatehistory(idfield,rowid,tablename,tableSchema);
					}else{
						
						//for updating unresolved issues
						if(furnitureIdIdxInIssue>-1){
							String tempfeatureId=recordArr[furnitureIdIdxInIssue];
							if(tempfeatureId!=null && !tempfeatureId.equalsIgnoreCase("")){
								furnitureList.add(tempfeatureId);	
							}
						}
						if(surfaceIdIdxInIssue>-1){
							String tempSurfaceeId=recordArr[surfaceIdIdxInIssue].trim();
							if(tempSurfaceeId!=null && !tempSurfaceeId.equalsIgnoreCase("")){
								surfaceList.add(tempSurfaceeId);	
							}
						}
					}
					
					
					
					String layername="";
					if(tablename.equalsIgnoreCase("Access_Land_polygon")){
						layername="Access_Land";
					}
					else if(tablename.equalsIgnoreCase("Furniture")){
						layername="Furniture";
					}
					else if(tablename.equalsIgnoreCase("Issues")){
						layername="Issue";
					}
					else if(tablename.equalsIgnoreCase("Surface")){
						layername="Surface";
					}
					
					ps.execute();
					int gid=0;
					ResultSet keys = ps.getGeneratedKeys();
					while(keys.next()){
						gid=keys.getInt(1);	
					}
					System.out.println("LAYER: " + tablename);
					if(photoMap!=null && photoMap.size()>0){
						if(photoMap.containsKey(i)){
							//uploadImages(gid,photoMap.get(i),fileUpLoadingPath,soursePhotoFilePath);
							if(!(uploadImages(layername, gid, photoMap.get(i),
									fileUpLoadingPath, connection,soursePhotoFilePath))){
								//successMsg="Problem in Import Photo from tab file";
								writeDataLog(logFilePath,new String []{"Importing Photo from gps file on "+new Date(),"photo: "+ photoMap.get(i)+" not found inside Zip file"});
							}
						}
					}
					if(newFeatureMap!=null && newFeatureMap.size()>0){
						if(newFeatureMap.containsKey(i)){
							if(gid!=0){
								generatedFeatureMap.put(gid,newFeatureMap.get(i));
							}
						}
						
					}
					insertDataIds=insertDataIds+":"+rowid;
				} catch (Exception e) {
					sucess = false;			
					System.err.println("Error: " + e.getMessage());	
					e.printStackTrace();
					failToInsertDataIds=insertDataIds+":"+recordArr[1] +e.getMessage();
					genFeatureIdMap.put("result", "Probleam in uploading data of "+tablename +" layer.");
					break;
				}
				if(!sucess)
					break;
				}
				writeDataLog(logFilePath,new String []{failToInsertDataIds});
				
				//updating unresolved issue field after inserting issues{
				if(tablename.equalsIgnoreCase("Issues")){
					//
					if(furnitureList!=null && furnitureList.size()>0){
						updateUnresolvedIssue(furnitureList,"furnitureid","unresolved_issues","Furniture",tableSchema);
					}
					if(surfaceList!=null && surfaceList.size()>0){
						updateUnresolvedIssue(surfaceList,"surface_id","unresolved_status","Surface",tableSchema);
					}
					
				}
				
				
				//getting generated value
				if (sucess) {
					connection.commit();
					System.err.println("Data uploaded successfully.");	
					genFeatureIdMap.put("result", tablename+" layer data uploaded successfully .");
				}else{
					connection.rollback();
				}
				if(!tablename.equalsIgnoreCase("Issues")){
					if(sucess && generatedFeatureMap.size()>0){
						String gidValues="";
						/*for(int idGen=0;idGen<generatedFeatureMap.size();idGen++){
							if(gidValues.equalsIgnoreCase(""))
								gidValues=generatedFeatureMap.get(idGen)+"";
							else
								gidValues=gidValues+","+generatedFeatureMap.get(idGen)+"";
						}*/
						//genFeatureIdMap=new HashMap<String,String>();
						Set keySet=generatedFeatureMap.keySet();
						Iterator iterator=keySet.iterator();
						while(iterator.hasNext()){
							int gid=(Integer) iterator.next();
							if(gidValues.equalsIgnoreCase(""))
								gidValues=gid+"";
							else
								gidValues=gidValues+","+gid;
						}
						
						String sql="select " +idfield+ ", gid from "+tableSchema+".\""+tablename+ "\" where gid in("+gidValues+")";
						PreparedStatement psObj = connection.prepareStatement(sql);
						ResultSet rsGenKey=psObj.executeQuery();
						while(rsGenKey.next()){
							int gid=rsGenKey.getInt("gid");
							String value=rsGenKey.getString(idfield);
							String jobFileValue=generatedFeatureMap.get(gid);
							genFeatureIdMap.put(jobFileValue, value);
						}
					}
				}else{
					genFeatureIdMap=new HashMap<String,String>();
					genFeatureIdMap.put("result", "Issue inserted successfully");
				}
				
				
				
			} catch (Exception e) {
				sucess = false;		
				genFeatureIdMap.put("result", "Probleam in uploading data of "+tablename +" layer.");
				System.err.println("Error: " + e.getMessage());				
			}finally{
				DataAccessFactory.getInstance().closeDBResource(connection, null, null, ps);
			}		
				
			return genFeatureIdMap;

		
	  }
	  
	  public List<String> updateNewFeatureId(List<String> insertData,Map<Integer, String> newFeatureMap,Map<String, String> newFurnnitureMap,Map<String, String> newSurfaceMap){
		  	List<String> updateList=new ArrayList<String>();
		  	String fieldNames = (String) insertData.get(0);
		  	updateList.add(fieldNames);
			try {
				fieldNames = fieldNames.replaceAll("\"", "");
			
			fieldNames=fieldNames.replaceAll(";", ",");
			String [] fieldsname=fieldNames.split(",");
			int size=fieldsname.length;
			
			int furnitureIdx=0;
			int surfaceIdx=0;
			for(int i=0;i<size;i++){
				if(fieldsname[i].equalsIgnoreCase("surfaceid")){
					surfaceIdx=i;
				}else if(fieldsname[i].equalsIgnoreCase("furnitureid")){
					furnitureIdx=i;
				}
			}
			
			for(int i=1;i<insertData.size();i++){
				
				String values = (String) insertData.get(i);
				
				//values=values.replaceAll(";", ",");
				
				if(newFeatureMap.containsKey(i)){
					String [] tempinsertData=values.split(",");
					//if(!tempinsertData[surfaceIdx].equalsIgnoreCase("") && tempinsertData[surfaceIdx]!=null){
						String tempFeatureId=newFeatureMap.get(i);
						if(tempFeatureId.contains("SID")){
							if(newSurfaceMap.containsKey(tempFeatureId)){
								tempinsertData[surfaceIdx]=newSurfaceMap.get(tempFeatureId);
							}
						}
						
					//}
					//if(!tempinsertData[furnitureIdx].equalsIgnoreCase("") && tempinsertData[furnitureIdx]!=null){
						//String fid=newFeatureMap.get(i);
						else if(tempFeatureId.contains("FID")){
							if(newFurnnitureMap.containsKey(tempFeatureId)){
								tempinsertData[furnitureIdx]=newFurnnitureMap.get(tempFeatureId);
							}
						}
						
					//}
					
					String tempInsert=null; 
					for(int k=0;k<tempinsertData.length;k++){
						if(tempInsert==null)
							tempInsert=tempinsertData[k];
						else
							tempInsert=tempInsert+","+tempinsertData[k];
					}
					updateList.add(tempInsert);
				}else{
					updateList.add(values);
				}
				
				
			}
			
			} catch (Exception e) {

			}
			return updateList;
	  }
	  
	  /*
	   * function for getting 
	   */
	  public Map<String,Integer> getSurveyTypeAndTargetDaysFromTask(String task){
		  Map<String,Integer> tasktypeMap=new HashMap<String,Integer>();
		  Connection con=null;
		  Statement stmt=null;
		  ResultSet rs =null;
			try {
				 String sql="Select survey_type,target_days from task ,task_scheduler ts where task.tasktypeid=ts.tasktype and task.task in ('"+task+"')"; 
				 con = DataAccessFactory.getInstance().getConnection(super.getEntityManager());
				 stmt = con.createStatement();
				 rs = stmt.executeQuery(sql);
				while (rs.next()) {
					Map<Integer,Integer> priorityDaysMap=null;
					int target_days=rs.getInt("target_days");
					String survey_type=rs.getString("survey_type").toLowerCase();
					tasktypeMap.put(survey_type, target_days);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return tasktypeMap;
	  }


	/**
	 * @param featureID
	 * @param fieldName
	 * @param unresolvedIssuesField
	 * @param tablename
	 * @param tableSchema
	 * @return
	 */
	public boolean updateUnresolvedIssue(List<String> featureID,String fieldName,String unresolvedIssuesField,String tablename,String tableSchema){
		  boolean update=false;
		  Connection con=null;
		  Statement stmt=null;
		  ResultSet rs =null;
			try {
				String tempfeatureStr="";
				if(featureID!=null){
					int size=featureID.size();
					for(int k=0;k<size;k++){
						if(tempfeatureStr.equalsIgnoreCase(""))
							tempfeatureStr="'"+featureID.get(k)+"'";
						else
						tempfeatureStr=tempfeatureStr+",'"+featureID.get(k)+"'";
					}
				}
				 String updateSql="update "+tableSchema+ ".\""+tablename+ "\""+" set "+unresolvedIssuesField +"=true where "+fieldName+" in ("+tempfeatureStr+")";
				 con = DataAccessFactory.getInstance().getConnection(super.getEntityManager());
				 stmt = con.createStatement();
				 System.out.println("updateSql"+updateSql);
				 int rowcount = stmt.executeUpdate(updateSql);
				 update=true;
			} catch (Exception e) {
				e.printStackTrace();
			}finally{
				DataAccessFactory.getInstance().closeDBResource(null, stmt, rs, null);
			}
			return update;
	  }

}
