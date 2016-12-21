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
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.db.util.DataAccessFactory;
import com.rmsi.spatialvue.studio.dao.ImportTabDAO;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;

@Repository
public class ImportTabHibernateDAO extends GenericHibernateDAO<Object, Long>
		implements ImportTabDAO {

	@Autowired
	ImportGPSJobHibernateDAO importGPSJobHibernateDAO;

	String logFilePath="";
	Connection connection = null;
	String importDataID = "";
	String fileUpLoadingPath="";
	String soursePhotoFilePath="";
	boolean sucess;
	String successMsg="";
	public String insertCSVData(String tablename, List<String> insertData,
			String mode, String historyAndKeyFieldName, String _logFilePath) {
		// logFilePath=ConfigurationUtil.getProperty("log.file.path").trim();
		logFilePath= _logFilePath;
		successMsg = "Data uploaded successfully";
		 sucess = true;
		String fieldNames = "";

		String csvSEPARATOR = "\t";
		int geomColumindex = 1;
		PreparedStatement ps = null;
		String tableSchema = null;
		//Connection connection = null;

		importDataID = "Imported data on " + tablename + " successfully";
		String errorID = "Probleam on importing data in " + tablename
				+ ". Due to following error data can't imported";
		fileUpLoadingPath = ConfigurationUtil.getProperty(
				"attachment.upload.path").trim();

		soursePhotoFilePath = ConfigurationUtil.getProperty(
				"zip.folder.path").trim();
		SimpleDateFormat fromUser = new SimpleDateFormat("dd/MM/yyyy");
		SimpleDateFormat myFormat = new SimpleDateFormat("yyyy-MM-dd");
		try {

			connection = DataAccessFactory.getInstance().getConnection(
					super.getEntityManager());
			DatabaseMetaData databaseMetaData = null;
			ResultSet resultSet = null;
			String tableName = null;
			try {
				databaseMetaData = connection.getMetaData();
				String[] types = { "TABLE" };
				resultSet = databaseMetaData.getTables(null, null, null, types);
				while (resultSet.next()) {
					tableName = resultSet.getString(3);
					if (tableName.equals(tablename)) {
						tableSchema = resultSet.getString(2);
						break;
					}
				}

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				DataAccessFactory.getInstance().closeDBResource(null, null,
						resultSet, null);
			}

			StringBuffer geomColumnName = new StringBuffer();
			Map<String, String> oblTable = getTableField(connection, tablename,
					geomColumnName);
			boolean isGeomtypeMulti = isGeomtypeMulti(connection, tablename);

			String strLine;
			String[] recordArr = null;

			int i = 0;

			fieldNames = (String) insertData.get(0);
			try {
				fieldNames = fieldNames.replaceAll("\"", "");
			} catch (Exception e) {

			}
			fieldNames = fieldNames.replaceAll(csvSEPARATOR, ",");
			String[] fieldsname = fieldNames.split(",");
			fieldNames = fieldNames.replace("WKT", geomColumnName.toString());

			String[] tempHistoryField = historyAndKeyFieldName.split(",");
			String keyFieldName = tempHistoryField[0];
			String keyFieldvalue = "";
			String historyFieldName = tempHistoryField[1];
			int filedIdx = 0;
			String layername = "";

			List objFinalColumnname = new ArrayList(Arrays.asList(fieldNames
					.split(",")));
			Map<Integer, String> obj = checkDataTypeofLayer(oblTable,
					objFinalColumnname);

			int allFieldCount = fieldNames.split(",").length;

			// for photo and update fields
			String photoFieldName = "photo";
			String updateFieldName = "Update";
			int photoColumnidx = -1;
			int updateColumnidx = -1;
			int issueidColumnidx = -1;

			// if(!keyFieldName.equalsIgnoreCase("0")){
			for (int a = 0; a < allFieldCount; a++) {
				if (!keyFieldName.equalsIgnoreCase("0")
						&& fieldsname[a].equalsIgnoreCase(keyFieldName)) {
					filedIdx = a;
				}
				if (fieldsname[a].equalsIgnoreCase(photoFieldName)) {
					photoColumnidx = a;
				}
				if (fieldsname[a].equalsIgnoreCase(updateFieldName)) {
					updateColumnidx = a;
				}

				if (fieldsname[a].equalsIgnoreCase("gid")) {
					issueidColumnidx = a;
				}

			}
			// }

			if (fieldNames.contains(photoFieldName))
				fieldNames = fieldNames.replace(photoFieldName, "::");
			if (fieldNames.contains(updateFieldName))
				fieldNames = fieldNames.replace(updateFieldName, "::");
			
			
			
			
			fieldNames = fieldNames.replace("::,", "");
			fieldNames = fieldNames.replace(",::", "");

			int count = fieldNames.split(",").length;

			System.out.println("There are" + " " + count + " " + "Fields");

			String fieldValueString = "";
			for (int k = 1; k < count + 1; k++) {
				if (k == geomColumindex) {
					if (isGeomtypeMulti)
						fieldValueString = fieldValueString
								+ "st_multi(ST_GeomFromText(?,27700))";
					else
						fieldValueString = fieldValueString
								+ "ST_GeomFromText(?,27700)";
				} else {
					fieldValueString = fieldValueString + ",?";
				}
			}

			// for history field
			if (historyFieldName != null
					&& !historyFieldName.equalsIgnoreCase("")) {
				fieldNames = fieldNames + "," + historyFieldName;
				fieldValueString = fieldValueString + ",false";
			}

			// adding double cot on field name
			String tempfieldNames = "\"" + fieldNames.replace(",", "\",\"")
					+ "\"";
			String insertSql="";
			
			if(tablename.equalsIgnoreCase("Issues")){
				if(fieldNames.contains("gid")){
					tempfieldNames = fieldNames.replace("gid,", "");
					int pos = fieldValueString.lastIndexOf("?,");
					String part1 = fieldValueString.substring(0, pos);
					System.out.println("Part1: " + part1);
					String part2 = fieldValueString.substring(pos + 2);
					System.out.println("Part2: " + part2);
					fieldValueString = part1.concat(part2);
				}
			}
			insertSql = "INSERT INTO " + tableSchema + ".\"" + tablename
					+ "\"" + " (" + tempfieldNames + ") VALUES ("
					+ fieldValueString + ")";
			
			
			System.out.println("Final Insert Statement - " + insertSql);
			
			StringBuffer updateSql = null;
			if (connection == null)
				connection = DataAccessFactory.getInstance().getConnection(
						super.getEntityManager());
			connection.setAutoCommit(false);

			/*
			 * if(mode.equalsIgnoreCase("Create")){
			 * deleteTableData(tableSchema,tablename,connection); }
			 */
			// ps =
			// connection.prepareStatement(insertSql,Statement.RETURN_GENERATED_KEYS);
			int datasize = insertData.size();
			for (i = 1; i < datasize; i++) {
				try {
					updateSql = new StringBuffer();
					strLine = insertData.get(i);
					if (strLine.endsWith(csvSEPARATOR))
						strLine = strLine + " ";
					recordArr = strLine.split(csvSEPARATOR);
					int j = 1;
					if (issueidColumnidx !=-1 && !recordArr[issueidColumnidx].isEmpty()
							&& tablename.equalsIgnoreCase("Issues")) {
						System.out.println("---------Update DATA");
						String updateFieldNames = fieldNames;
						if (updateFieldNames.contains("gid")) {
							updateFieldNames = updateFieldNames.replace("gid,",
									"");
						}
						// System.out.println("---------UPdate Fields: "+updateFieldNames
						// );
						String[] arFields = updateFieldNames.split(",");
						updateSql.append("Update snpa.\"Issues\" set ");
						String updateQuery = "";
						for (int x = 0; x < arFields.length; x++) {
							if (arFields[x].equalsIgnoreCase("the_geom")) {
								if (isGeomtypeMulti) {
									updateSql
											.append(arFields[x])
											.append(" = st_multi(ST_GeomFromText(?,27700)),");
								} else {
									updateSql.append(arFields[x]).append(
											" = ST_GeomFromText(?,27700),");
								}
							} else if (arFields[x]
									.equalsIgnoreCase("ishistory")) {
								updateSql.append(arFields[x]).append("=false,");
							} else {
								updateSql.append(arFields[x]).append("=?,");
							}
						}

						updateQuery = updateSql.toString().substring(0,
								updateSql.length() - 1);
						updateQuery = updateQuery + " where gid=?";
						// System.out.println("Final update string: " +
						// updateQuery);
						ps = connection.prepareStatement(updateQuery);
						updateTabRecords(ps, count, obj, recordArr,
								photoColumnidx, updateColumnidx,
								issueidColumnidx, filedIdx,tablename);

					} else {
						System.out.println("---------INSERT DATA");
						//int fldCount = count;
						int k = 0;
						//To adjust the field count where gid is ignored
						if(tablename.equalsIgnoreCase("Issues")){
							//fldCount = count-1; 
							//k = 1;
						}
						ps = connection.prepareStatement(insertSql,
								Statement.RETURN_GENERATED_KEYS);

						for (; k < count; k++) {

							if (photoColumnidx != k && updateColumnidx != k && issueidColumnidx != k) {
								recordArr[k] = recordArr[k].trim();

								if (j == geomColumindex) {
									if (recordArr[k] == null
											|| recordArr[k].length() == 0)
										ps.setObject(j, null);
									else {
										String geomVal = recordArr[k]
												.replaceAll("\"", "");
										ps.setObject(j, geomVal);
									}

								}

								else {
									String getcolumnType = obj.get(k);
									if (getcolumnType != null) {
										if (getcolumnType
												.equalsIgnoreCase("Date")) {
											if (recordArr[k] == null
													|| recordArr[k].length() == 0)
												ps.setDate(j, null);
											else {
												try {
													String temp = recordArr[k];
													if (temp.trim()
															.equalsIgnoreCase(
																	"null")
															|| recordArr[k]
																	.length() == 0)
														ps.setDate(j, null);
													else {
														// String reformattedStr
														// =
														// myFormat.format(fromUser.parse(recordArr[k]));
														String[] tempDate = recordArr[k]
																.split("/");
														// SimpleDateFormat sdf
														// = new
														// SimpleDateFormat("dd/mm/yyyy");
														// java.util.Date date =
														// sdf.parse(Integer.parseInt(tempDate[0])+"/"+(Integer.parseInt(tempDate[1])-1)+"/"+Integer.parseInt(tempDate[2]));

														// java.sql.Date sqlDate
														// = (java.sql.Date) new
														// Date(date.getTime());

														// String reformattedStr
														// =
														// myFormat.format(fromUser.parse(recordArr[k]));
														// String []
														// tempDate=recordArr[k].split("/");
														// ps.setDate(j,new
														// java.sql.Date(new
														// Date(reformattedStr).getTime()));

														ps.setDate(
																j,
																new java.sql.Date(
																		new Date(
																				Integer.parseInt(tempDate[1])
																						+ "/"
																						+ Integer
																								.parseInt(tempDate[0])
																						+ "/"
																						+ Integer
																								.parseInt(tempDate[2]))
																				.getTime()));
													}

												} catch (Exception ex) {
													ps.setDate(j, null);
												}

											}
										} else if (getcolumnType
												.equalsIgnoreCase("integer")
												|| getcolumnType
														.equalsIgnoreCase("smallint")) {
											String temp = recordArr[k];
											if (temp.trim().equalsIgnoreCase(
													"null")
													|| recordArr[k].length() == 0)
												ps.setString(j, null);
											else
												ps.setInt(j, Integer
														.parseInt(recordArr[k]));
										} else if (getcolumnType
												.equalsIgnoreCase("boolean")) {
											if (recordArr[k] == null
													|| recordArr[k].length() == 0) {
												ps.setString(j, null);
												// ps.setBoolean(j, false);
											} else {
												boolean flag = false;
												if (recordArr[k]
														.equalsIgnoreCase("1")
														|| recordArr[k]
																.equalsIgnoreCase("Yes")) {
													System.out
															.println("---unresolved issues--- "
																	+ recordArr[filedIdx]
																	+ " "
																	+ recordArr[k]);
													flag = true;
												} else {
													System.out
															.println("---unresolved issues--- "
																	+ recordArr[filedIdx]
																	+ " "
																	+ recordArr[k]);
													flag = false;
												}
												ps.setBoolean(j, flag);
											}

										} else if (getcolumnType
												.equalsIgnoreCase("double precision")) {
											if (recordArr[k] == null
													|| recordArr[k].length() == 0)
												ps.setDouble(j, 0.0);
											else
												ps.setDouble(
														j,
														Double.parseDouble(recordArr[k]));
										} else {
											if (recordArr[k] == null
													|| recordArr[k].length() == 0)
												ps.setString(j, null);
											else
												ps.setString(j, recordArr[k]);
										}
									}
								}
								j++;
							}
						}

						System.out.println(ps.toString());
						/*
						 * if(updateColumnidx>0){ String
						 * isUpdate=recordArr[updateColumnidx]; }
						 */

						if (!keyFieldName.equalsIgnoreCase("0")) {
							createHistricolRecord(tableSchema, tablename,
									keyFieldName, recordArr[filedIdx],
									connection);
						}
						if (tablename.equalsIgnoreCase("Access_Land_polygon")) {
							layername = "Access_Land";
						} else if (tablename.equalsIgnoreCase("Furniture")) {
							layername = "Furniture";
						} else if (tablename.equalsIgnoreCase("Issues")) {
							layername = "Issue";
						} else if (tablename.equalsIgnoreCase("Surface")) {
							layername = "Surface";
						}
						if (tablename.equalsIgnoreCase("Access_Land_polygon")
								|| tablename.equalsIgnoreCase("RoW_Paths")) {
							if (recordArr[filedIdx] == null
									|| recordArr[filedIdx].equalsIgnoreCase("")) {
								successMsg = "Problem in Importing Tab file, RoW_ID has invalid value.";
								writeDataLog(
										logFilePath,
										new String[] {
												"Problem in Importing Tab file :"
														+ new Date(),
												tablename
														+ "RoW_ID has invalid value." });
								sucess = false;
								break;
							}
						}

						ps.execute();
						ResultSet keys = ps.getGeneratedKeys();

						int gid = 0;
						if (keys.next()) {
							gid = keys.getInt(1);
						}

						if (!tablename.equalsIgnoreCase("RoW_Paths")
								&& photoColumnidx != -1) {
							String uploadImage = recordArr[photoColumnidx];
							if (null != uploadImage
									&& !uploadImage.equalsIgnoreCase("")) {
								if (!(uploadImages(layername, gid, uploadImage,
										fileUpLoadingPath, connection,
										soursePhotoFilePath))) {
									successMsg = "Problem in Import Photo from tab file";
									writeDataLog(
											logFilePath,
											new String[] {
													"Importing Photo from Tab file on "
															+ new Date(),
													"photo: "
															+ uploadImage
															+ " not found inside Zip file" });
								}
							}
						}

						importDataID = importDataID + "," + recordArr[filedIdx];
					}
				} catch (Exception e) {
					sucess = false;
					errorID = errorID + "," + recordArr[filedIdx] + ":"
							+ e.getMessage();
					e.printStackTrace();
				}
				if (!sucess)
					break;

			}
			writeDataLog(logFilePath, new String[] {
					"Importing Tab file on" + new Date(), errorID });

		} catch (Exception e) {
			sucess = false;
			successMsg = "Problem in Importing Tab file : " + e.getMessage();
			System.err.println("Error: " + e.getMessage());
		} finally {
			try {
				if (sucess) {
					connection.commit();
					// successMsg="Data uploaded successfully";
					System.out.println("Data uploaded successfully.");
				} else {
					connection.rollback();
					successMsg = "Probleam on importing data";
				}
				connection.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			DataAccessFactory.getInstance().closeDBResource(connection, null,
					null, ps);
		}
		System.out.println("###" + successMsg);
		// return sucess;
		return successMsg;

	}

	private Map<String, String> getTableField(Connection con, String tablename,
			StringBuffer geomColumnName) {
		Map<String, String> objTableSchema = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {

			stmt = con.createStatement();
			String sql = "select column_name,data_type,udt_name from information_schema.columns where table_name = '"
					+ tablename.trim() + "'";

			rs = stmt.executeQuery(sql);
			objTableSchema = new HashMap<String, String>();

			String columnName = null;
			String columnDataType = null;

			while (rs.next()) {

				columnName = rs.getString("column_name");
				columnDataType = rs.getString("data_type");
				objTableSchema.put(columnName, columnDataType);

				if ("geometry".equalsIgnoreCase(rs.getString("udt_name"))) {
					geomColumnName.delete(0, geomColumnName.length());
					geomColumnName.append(columnName);
				}
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			objTableSchema = null;
			e.printStackTrace();
		} finally {
			DataAccessFactory.getInstance().closeDBResource(null, stmt, rs,
					null);
		}
		return objTableSchema;

	}

	private boolean isGeomtypeMulti(Connection connection, String tableName) {

		boolean isGeomtypeMulti = false;
		Statement statement = null;
		ResultSet resultSet = null;
		try {

			statement = connection.createStatement();
			String sqlQuery = "SELECT type FROM geometry_columns where f_table_name='"
					+ tableName + "'";
			resultSet = statement.executeQuery(sqlQuery);
			String geomType = null;
			if (resultSet.next()) {
				geomType = resultSet.getString("type");
				if (geomType != null
						&& geomType.toUpperCase().trim().startsWith("MULTI"))
					isGeomtypeMulti = true;
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DataAccessFactory.getInstance().closeDBResource(null, statement,
					resultSet, null);
		}
		return isGeomtypeMulti;

	}

	private Map<Integer, String> checkDataTypeofLayer(
			Map<String, String> dbschema, List<String> layerSchema) {

		Iterator iterDb = dbschema.keySet().iterator();
		Map<Integer, String> objcolumnIndexAndDataType = new HashMap<Integer, String>();
		for (int i = 0; i < layerSchema.size(); i++) {
			String columnName = layerSchema.get(i);
			if (dbschema.containsKey(columnName.toLowerCase())) {
				String dataType = dbschema.get(columnName.toLowerCase());
				objcolumnIndexAndDataType.put(i, dataType);
			} else {
				// error
			}
		}
		return objcolumnIndexAndDataType;
	}

	private void creatbkptable(String tableSchema, String tablename,
			Connection conn) {
		try {
			Statement statement = conn.createStatement();
			String sqlQuery = "SELECT type FROM geometry_columns where f_table_name='"
					+ tableSchema + "\"" + tablename + "\"";
			int resultSet = statement.executeUpdate(sqlQuery);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void deleteTableData(String tableSchema, String tablename,
			Connection conn) {
		try {

			Statement statement = conn.createStatement();
			String sqlQuery = "TRUNCATE " + tableSchema + ".\"" + tablename
					+ "\" CASCADE";
			int resultSet = statement.executeUpdate(sqlQuery);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void createHistricolRecord(String tableSchema, String tablename,
			String fieldName, String fieldvalue, Connection conn) {
		try {

			Statement statement = conn.createStatement();
			String sqlQuery = "Update " + tableSchema + ".\"" + tablename
					+ "\" Set ishistory=true where " + fieldName + "= '"
					+ fieldvalue + "'";
			int resultSet = statement.executeUpdate(sqlQuery);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void writeDataLog(String filePath, String[] fileLines) {

		try {
			File newbatchFile = new File(filePath);
			if (!newbatchFile.exists())
				newbatchFile.createNewFile();
			FileWriter fwrite = new FileWriter(new File(filePath), true);
			for (String line : fileLines)
				fwrite.write(line + "\n");
			fwrite.flush();
			fwrite.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Map<String, String> getLookupData(String sql) {
		Map<String, String> lkpdata = new HashMap<String, String>();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {
			con = DataAccessFactory.getInstance().getConnection(
					super.getEntityManager());
			stmt = con.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				String a11 = "";
				String key = rs.getString(1);
				String value = rs.getString(2);
				lkpdata.put(key, value);
			}
		} catch (Exception e) {
			lkpdata = null;
			e.printStackTrace();
		} finally {
			// DataAccessFactory.getInstance().closeDBResource(null, stmt, rs,
			// null);
		}
		return lkpdata;
	}

	public boolean uploadImages(String layername, Integer value,
			String _filename, String filepath, Connection con,
			String soursePhotoFilePath) {
		String filename = _filename.toLowerCase();
		String desPath = soursePhotoFilePath + "/" + filename;
		File desFile = new File(desPath);
		if (desFile.exists()) {
			Statement stmt = null;
			ResultSet rs = null;
			try {

				String extension = filename
						.substring(filename.lastIndexOf(".") + 1);
				String insertSql = "INSERT INTO attachment (layername,filename,filepath,gid, keyfield, description, extension, tenantid)"
						+ " VALUES ( '"
						+ layername
						+ "','"
						+ filename
						+ "','"
						+ filepath
						+ "',"
						+ value
						+ ", '','Uploaded from Job file', '"
						+ extension
						+ "', 5)";
				// File f=new File();
				System.out.println("######Attachment : " + insertSql);
				stmt = con.createStatement();
				stmt.execute(insertSql);
				copyfile(soursePhotoFilePath + "/" + filename, filepath);
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				DataAccessFactory.getInstance().closeDBResource(null, stmt, rs,
						null);
			}
			return true;
		} else {

			// writeDataLog(logFilePath,new String
			// []{"Importing Photo from Tab file on "+new
			// Date()," File not exist"});
			return false;
		}

	}

	public boolean copyfile(String srFile, String dtFile) {
		boolean isFileCopied = false;
		try {
			File f1 = new File(srFile);
			File f3 = new File(dtFile);

			if (!f3.exists()) {

				boolean success = new File(dtFile).mkdir();
				System.out.println("###############" + success);
			}

			File f2 = new File(dtFile + "/" + f1.getName());

			if (f1.exists()) {
				InputStream in = new FileInputStream(f1);
				OutputStream out = new FileOutputStream(f2);
				byte[] buf = new byte[1024];
				int len;
				while ((len = in.read(buf)) > 0) {
					out.write(buf, 0, len);
				}
				in.close();
				out.close();
				System.out.println("File copied.");
				isFileCopied = true;
			} else {
				isFileCopied = false;
			}
		} catch (Exception ex) {
			isFileCopied = false;
			System.out
					.println(ex.getMessage() + " in the specified directory.");

		}
		return isFileCopied;
	}

	/*
	 * 
	 * function for getting next survey date
	 */
	public Map<Integer, Map<Integer, Integer>> getTaskSchdulerForPath() {
		Map<Integer, Map<Integer, Integer>> tasktypeMap = new HashMap<Integer, Map<Integer, Integer>>();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {
			String sql = "Select survey_type,tasktype,priority,target_days from task ,task_scheduler ts where task.tasktypeid=ts.tasktype and task.task='Programmed Survey'";
			con = DataAccessFactory.getInstance().getConnection(
					super.getEntityManager());
			stmt = con.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				Map<Integer, Integer> priorityDaysMap = null;
				int surveyTasktype = rs.getInt("tasktype");
				int priority = rs.getInt("priority");
				int target_days = rs.getInt("target_days");
				String survey_type = rs.getString("tasktype");

				// priority map
				if (tasktypeMap.containsKey(surveyTasktype))
					priorityDaysMap = tasktypeMap.get(surveyTasktype);
				else
					priorityDaysMap = new HashMap<Integer, Integer>();

				priorityDaysMap.put(priority, target_days);
				tasktypeMap.put(surveyTasktype, priorityDaysMap);
				// lkpdata.put(key, value);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return tasktypeMap;
	}

	/*
	 * function for getting
	 */
	public Map<String, Integer> getSurveyTypeAndTargetDaysFromTask(String task) {
		Map<String, Integer> tasktypeMap = new HashMap<String, Integer>();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {
			String sql = "Select lower(survey_type) as survey_type,target_days from task ,task_scheduler ts where task.tasktypeid=ts.tasktype and task.task in ('"
					+ task + "')";
			con = DataAccessFactory.getInstance().getConnection(
					super.getEntityManager());
			stmt = con.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				Map<Integer, Integer> priorityDaysMap = null;
				int target_days = rs.getInt("target_days");
				String survey_type = rs.getString("survey_type");
				tasktypeMap.put(survey_type, target_days);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return tasktypeMap;
	}

	@Override
	public List<String> getHolidayList() {
		List<String> holidayList = new ArrayList<String>();
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		try {
			String sql = "select holiday_date from annual_holiday_calendar";
			con = DataAccessFactory.getInstance().getConnection(
					super.getEntityManager());
			stmt = con.createStatement();
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				String holiday = rs.getString("holiday_date");
				holidayList.add(holiday);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return holidayList;
	}

	public void updateTabRecords(PreparedStatement ps, int count,
			Map<Integer, String> obj, String[] recordArr, int photoColumnidx,
			int updateColumnidx, int issueidColumnidx, int filedIdx,String tablename)
			throws SQLException {

		System.out.println("-----------INSIDE Update Method");

		int j = 1;
		int geomColumindex = 1;
		for (int k = 0; k < count; k++) {

			if (photoColumnidx != k && updateColumnidx != k
					&& issueidColumnidx != k) {
				recordArr[k] = recordArr[k].trim();

				if (j == geomColumindex) {
					if (recordArr[k] == null || recordArr[k].length() == 0)
						ps.setObject(j, null);
					else {
						String geomVal = recordArr[k].replaceAll("\"", "");
						ps.setObject(j, geomVal);
					}

				}

				else {
					String getcolumnType = obj.get(k);
					if (getcolumnType != null) {
						if (getcolumnType.equalsIgnoreCase("Date")) {
							if (recordArr[k] == null
									|| recordArr[k].length() == 0)
								ps.setDate(j, null);
							else {
								try {
									String temp = recordArr[k];
									if (temp.trim().equalsIgnoreCase("null")
											|| recordArr[k].length() == 0)
										ps.setDate(j, null);
									else {
										// String reformattedStr =
										// myFormat.format(fromUser.parse(recordArr[k]));
										String[] tempDate = recordArr[k]
												.split("/");
										// SimpleDateFormat sdf = new
										// SimpleDateFormat("dd/mm/yyyy");
										// java.util.Date date =
										// sdf.parse(Integer.parseInt(tempDate[0])+"/"+(Integer.parseInt(tempDate[1])-1)+"/"+Integer.parseInt(tempDate[2]));

										// java.sql.Date sqlDate =
										// (java.sql.Date) new
										// Date(date.getTime());

										// String reformattedStr =
										// myFormat.format(fromUser.parse(recordArr[k]));
										// String []
										// tempDate=recordArr[k].split("/");
										// ps.setDate(j,new java.sql.Date(new
										// Date(reformattedStr).getTime()));

										ps.setDate(
												j,
												new java.sql.Date(
														new Date(
																Integer.parseInt(tempDate[1])
																		+ "/"
																		+ Integer
																				.parseInt(tempDate[0])
																		+ "/"
																		+ Integer
																				.parseInt(tempDate[2]))
																.getTime()));
									}

								} catch (Exception ex) {
									ps.setDate(j, null);
								}

							}
						} else if (getcolumnType.equalsIgnoreCase("integer")
								|| getcolumnType.equalsIgnoreCase("smallint")) {
							String temp = recordArr[k];
							if (temp.trim().equalsIgnoreCase("null")
									|| recordArr[k].length() == 0)
								ps.setString(j, null);
							else
								ps.setInt(j, Integer.parseInt(recordArr[k]));
						} else if (getcolumnType.equalsIgnoreCase("boolean")) {
							if (recordArr[k] == null
									|| recordArr[k].length() == 0) {
								ps.setString(j, null);
								// ps.setBoolean(j, false);
							} else {
								boolean flag = false;
								if (recordArr[k].equalsIgnoreCase("1")
										|| recordArr[k].equalsIgnoreCase("Yes")) {
									System.out
											.println("---unresolved issues--- "
													+ recordArr[filedIdx] + " "
													+ recordArr[k]);
									flag = true;
								} else {
									System.out
											.println("---unresolved issues--- "
													+ recordArr[filedIdx] + " "
													+ recordArr[k]);
									flag = false;
								}
								ps.setBoolean(j, flag);
							}

						} else if (getcolumnType
								.equalsIgnoreCase("double precision")) {
							if (recordArr[k] == null
									|| recordArr[k].length() == 0)
								ps.setDouble(j, 0.0);
							else
								ps.setDouble(j,
										Double.parseDouble(recordArr[k]));
						} else {
							if (recordArr[k] == null
									|| recordArr[k].length() == 0)
								ps.setString(j, null);
							else
								ps.setString(j, recordArr[k]);
						}
					}
				}
				j++;
			}
		}
		ps.setInt(j, Integer.parseInt(recordArr[issueidColumnidx]));

		System.out.println(ps.toString());
		int resultCnt = ps.executeUpdate();
		
		System.out.println("Result Count:" + resultCnt);
		String layername="Issue";
		int gid=Integer.parseInt(recordArr[issueidColumnidx]);
		
		
		if (tablename.equalsIgnoreCase("Issues")
				&& photoColumnidx != -1) {
			String uploadImage = recordArr[photoColumnidx];
			if (null != uploadImage
					&& !uploadImage.equalsIgnoreCase("")) {
				if (!(uploadImages(layername, gid, uploadImage,
						fileUpLoadingPath, connection,
						soursePhotoFilePath))) {
					successMsg = "Problem in Import Photo from tab file";
					writeDataLog(
							logFilePath,
							new String[] {
									"Importing Photo from Tab file on "
											+ new Date(),
									"photo: "
											+ uploadImage
											+ " not found inside Zip file" });
				}
			}
		}

		importDataID = importDataID + "," + recordArr[filedIdx];
		
		
		
	}

}
