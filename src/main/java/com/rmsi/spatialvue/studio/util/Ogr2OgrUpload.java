package com.rmsi.spatialvue.studio.util;


import java.io.File;
import java.io.FileWriter;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Ogr2OgrUpload {
	/**
	 * -append: Append to existing layer instead of creating new 
	 * -overwrite: Delete the output layer and recreate it empty 
	 * -update: Open existing output datasource in update mode rather than trying to create a new one
	 * -select field_list: Comma-delimited list of fields from input layer to
	 * copy to the new layer. A field is skipped if mentioned previously in the
	 * list even if the input layer has duplicate field names. (Defaults to all;
	 * any field is skipped if a subsequent field with same name is found.)
	 * -progress: (starting with GDAL 1.7.0) Display progress on terminal. Only
	 * works if input layers have the "fast feature count" capability. -sql
	 * sql_statement: SQL statement to execute. The resulting table/layer will
	 * be saved to the output. -dialect dialect: SQL dialect. In some cases can
	 * be used to use (unoptimized) OGR SQL instead of the native SQL of an
	 * RDBMS by passing OGRSQL. -where restricted_where: Attribute query (like
	 * SQL WHERE) -skipfailures: Continue after a failure, skipping the failed
	 * feature. -spat xmin ymin xmax ymax: spatial query extents. Only features
	 * whose geometry intersects the extents will be selected. The geometries
	 * will not be clipped unless -clipsrc is specified -dsco NAME=VALUE:
	 * Dataset creation option (format specific) -lco NAME=VALUE: Layer creation
	 * option (format specific) -nln name: Assign an alternate name to the new
	 * layer -nlt type: Define the geometry type for the created layer. One of
	 * NONE, GEOMETRY, POINT, LINESTRING, POLYGON, GEOMETRYCOLLECTION,
	 * MULTIPOINT, MULTIPOLYGON or MULTILINESTRING. Add "25D" to the name to get
	 * 2.5D versions. -a_srs srs_def: Assign an output SRS -t_srs srs_def:
	 * Reproject/transform to this SRS on output -s_srs srs_def: Override source
	 * SRS -preserve_fid: Use the FID of the source features instead of letting
	 * the output driver to automatically assign a new one. -fid fid: If
	 * provided, only the feature with this feature id will be reported.
	 * Operates exclusive of the spatial or attribute queries. Note: if you want
	 * to select several features based on their feature id, you can also use
	 * the fact the 'fid' is a special field recognized by OGR SQL. So, '-where
	 * "fid in (1,3,5)"' would select features 1, 3 and 5. Srs_def can be a full
	 * WKT definition (hard to escape properly), or a well known definition (ie.
	 * EPSG:4326) or a file with a WKT definition.
	 * 
	 * Advanced options :
	 * 
	 * -gt n: group n features per transaction (default 200). Increase the value
	 * for better performance when writing into DBMS drivers that have
	 * transaction support. -clipsrc [xmin ymin xmax
	 * ymax]|WKT|datasource|spat_extent: (starting with GDAL 1.7.0) clip
	 * geometries to the specified bounding box (expressed in source SRS), WKT
	 * geometry (POLYGON or MULTIPOLYGON), from a datasource or to the spatial
	 * extent of the -spat option if you use the spat_extent keyword. When
	 * specifying a datasource, you will generally want to use it in combination
	 * of the -clipsrclayer, -clipsrcwhere or -clipsrcsql options -clipsrcsql
	 * sql_statement: Select desired geometries using an SQL query instead.
	 * -clipsrclayer layername: Select the named layer from the source clip
	 * datasource. -clipsrcwhere expression: Restrict desired geometries based
	 * on attribute query. -clipdst xmin ymin xmax ymax: (starting with GDAL
	 * 1.7.0) clip geometries after reprojection to the specified bounding box
	 * (expressed in dest SRS), WKT geometry (POLYGON or MULTIPOLYGON) or from a
	 * datasource. When specifying a datasource, you will generally want to use
	 * it in combination of the -clipdstlayer, -clipdstwhere or -clipdstsql
	 * options -clipdstsql sql_statement: Select desired geometries using an SQL
	 * query instead. -clipdstlayer layername: Select the named layer from the
	 * destination clip datasource. -clipdstwhere expression: Restrict desired
	 * geometries based on attribute query. -wrapdateline: (starting with GDAL
	 * 1.7.0) split geometries crossing the dateline meridian (long. = +/-
	 * 180deg) -simplify tolerance: (starting with GDAL 1.9.0) distance
	 * tolerance for simplification. This method will preserve topology, in
	 * particular for polygon geometries. -segmentize max_dist: (starting with
	 * GDAL 1.6.0) maximum distance between 2 nodes. Used to create intermediate
	 * points -fieldTypeToString type1, ...: (starting with GDAL 1.7.0) converts
	 * any field of the specified type to a field of type string in the
	 * destination layer. Valid types are : Integer, Real, String, Date, Time,
	 * DateTime, Binary, IntegerList, RealList, StringList. Special value All
	 * can be used to convert all fields to strings. This is an alternate way to
	 * using the CAST operator of OGR SQL, that may avoid typing a long SQL
	 * query. -splitlistfields: (starting with GDAL 1.8.0) split fields of type
	 * StringList, RealList or IntegerList into as many fields of type String,
	 * Real or Integer as necessary. -maxsubfields val: To be combined with
	 * -splitlistfields to limit the number of subfields created for each split
	 * field. -explodecollections: (starting with GDAL 1.8.0) produce one
	 * feature for each geometry in any kind of geometry collection in the
	 * source file -zfield field_name: (starting with GDAL 1.8.0) Uses the
	 * specified field to fill the Z coordinate of geometries
	 * 
	 * **/
	
	public static void createCSVfromTab(String batchFilePath,String fwtoolPath,String tabFilePath,String csvFileBath,String columnMapping,String layerName,String tabFileName) {
		try {			
			Ogr2OgrUpload ogr2OgrUpload = new Ogr2OgrUpload();			
			String sql=ogr2OgrUpload.createSql(tabFileName,columnMapping);					
			ogr2OgrUpload.createCSVfromTab(batchFilePath,
						fwtoolPath, tabFilePath,
						csvFileBath,true,true,sql);			
		} catch (Exception err) {
			err.printStackTrace();
		}
	}

	/**
	 * used to create batch file and then execute it
	 * 
	 * @param batchFilePath
	 *            - Path of batch file
	 * @param fwtoolPath
	 *            - Path of FW tool directory
	 * @param hostName
	 *            - Host address path
	 * @param userName
	 *            - Name of the user
	 * @param password
	 *            -Password of user
	 * @param dbName
	 *            - Database name
	 * @param isAppendMode
	 *            - If true than convert in append mode else overwrite
	 * @param assignSRS
	 *            - Assign an output SRS
	 * @param transformSRS
	 *            - Reproject/transform to this SRS on output
	 * @param tabFilePath
	 *            - Path of tab file which need to be converted into postgis
	 *            format
	 * @param tableName
	 *            - Name of table which is going to be created from table file
	 * @param geomColumnName
	 *            - Geometry column name of table
	 * @param isImportTabFile
	 *            -If true than convert tab to postgis else convert from post to
	 *            tab
	 * @author Saurabh
	 * */

	private void createAndExecuteBatchFile(String batchFilePath,
			String fwtoolPath, String hostName, String dbName,
			boolean isAppendMode, String userName, String password,
			String assignSRS, String transformSRS, String tabFilePath,
			String tableName, String geomColumnName, boolean isImportTabFile,boolean isSQLPresent,String sqlString)
			throws Exception {

		try {
			String appendOrOverwrite = null;
			String tempsqlString="";
			String drivename="c:";
			String setFwtpath = "cd " + fwtoolPath;
			if (isAppendMode)
				appendOrOverwrite = " -append ";
			else
				appendOrOverwrite = "-overwrite";

			
			String conversionString = null;
			
			if(isSQLPresent)
				tempsqlString=" -sql "+ "\"" +sqlString +"\"";
			
			
			conversionString = "ogr2ogr -append -f \"PostgreSQL\" PG:\"host="
						+ hostName + " user=" + userName + " dbname=" + dbName
						+ " password=" + password + "\" \"" + tabFilePath +"\" "+tempsqlString
						+ " -lco GEOMETRY_NAME="
						+ geomColumnName+ " -nln " + tableName ;
			
			
			
			String[] batchFileLines = new String[] {
					"PATH=" + fwtoolPath + "/bin;" + fwtoolPath
							+ "/python;%PATH%",
					"set PYTHONPATH=" + fwtoolPath + "/pymod",
					"set PROJ_LIB=" + fwtoolPath + "/proj_lib",
					"set GEOTIFF_CSV=" + fwtoolPath + "/data",
					"set GDAL_DATA=" + fwtoolPath + "/password@007" + "",
					"set GDAL_DRIVER_PATH=" + fwtoolPath + "/gdal_plugins",
					drivename,setFwtpath,
					conversionString };

			//writeBatchFile(batchFilePath, batchFileLines);
			if (writeBatchFile(batchFilePath, batchFileLines))
				executeBatchFile(batchFilePath);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private boolean writeBatchFile(String batchFilePath, String[] batchFileLines) {

		try {
			File newbatchFile= new File(batchFilePath);
			if(!newbatchFile.exists())
				newbatchFile.createNewFile();
			FileWriter fwrite = new FileWriter(new File(batchFilePath));
			for (String line : batchFileLines)
				fwrite.write(line + "\n");
			fwrite.flush();
			fwrite.close();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;

	}

	private void executeBatchFile(String batchFilePath) {

		try {

			String[] cmdArray = { "cmd", "/c", "start", "\"\"", batchFilePath };
			Process process = Runtime.getRuntime().exec(cmdArray);
			//for reading cmd 
			process.waitFor();
			process.destroy();
			Thread.sleep(10000);
			//closeAllCommandPromptWindows();

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private void closeAllCommandPromptWindows() {
		try {
			Runtime.getRuntime().exec("taskkill /F /IM cmd.exe");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private boolean deleteDir(File dir) throws Exception{
	    if (dir.isDirectory()) {
	        String[] children = dir.list();
	        for (int i=0; i<children.length; i++) {
	            boolean success = deleteDir(new File(dir, children[i]));
	            if (!success) {
	                return false;
	            }
	        }
	    }

	    // The directory is now empty so delete it
	    return dir.delete();
	}
	
	
	private void createCSVfromTab(String batchFilePath,
			String fwtoolPath, String tabFilePath,
			String csvfilepath,boolean isImportGeom,boolean isSQLPresent,String sqlString){
		
		try {
			
			try{
				deleteDir(new File(csvfilepath));
			}catch(Exception e){e.printStackTrace();}
									
			String setFwtpath = null;
			String conversionString = null;
			String drivename="c:";
			setFwtpath = "cd " + fwtoolPath;
			conversionString= " ogr2ogr -f CSV "+ "\""+csvfilepath + "\" "+ " \""+tabFilePath+ "\"";
			
			if(isSQLPresent)
				conversionString=conversionString+" -sql "+ "\"" +sqlString +"\"";
			
			if(isImportGeom)
				conversionString=conversionString+" -lco GEOMETRY=AS_WKT -lco GEOM_NAME=the_geom  -lco SEPARATOR=TAB";
			//ogr2ogr -f "CSV" "D:/AA" "D:\SNPAData\RoW_Paths\Tab Files\Surface.TAB" -sql "select RoW_ID as rowid from Surface" -lco GEOMETRY=AS_WKT

			String[] batchFileLines = new String[] {
					"PATH=" + fwtoolPath + "/bin;" + fwtoolPath
							+ "/python;%PATH%",
					"set PYTHONPATH=" + fwtoolPath + "/pymod",
					"set PROJ_LIB=" + fwtoolPath + "/proj_lib",
					"set GEOTIFF_CSV=" + fwtoolPath + "/data",
					"set GDAL_DATA=" + fwtoolPath + "/password@007" + "",
					"set GDAL_DRIVER_PATH=" + fwtoolPath + "/gdal_plugins",
					drivename,setFwtpath,
					conversionString ,"exit"};

			writeBatchFile(batchFilePath, batchFileLines);
			//if (writeBatchFile(batchFilePath, batchFileLines))
			File objcsvfile=new File(csvfilepath);
			if(objcsvfile.exists())
				objcsvfile.delete();
			
			executeBatchFile(batchFilePath);

		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	
	private String createSql(String layerName,String columnMapping){
		new ConfigurationUtil();
		
		List<String> objColumn=new ArrayList<String>(Arrays.asList(columnMapping.split(",")));

		String sqlQuery="select ";
		int size=objColumn.size();
		for(int i=0;i<size;i++){
			String temp=objColumn.get(i);
			String[] tempColumnmapping=temp.split(":");
			String tabDBColumn=tempColumnmapping[0];
			String tabFileColumn=tempColumnmapping[1];
			if(i!=0)
				sqlQuery=sqlQuery+", ";
			sqlQuery=sqlQuery+" "+tabFileColumn +" as "+tabDBColumn;
			
		}
		sqlQuery=sqlQuery+" from "+layerName;
		
		return sqlQuery;
		
	}
}
