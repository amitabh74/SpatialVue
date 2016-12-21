package com.rmsi.spatialvue.studio.dao;

import java.util.List;
import java.util.Map;


public interface ImportTabDAO extends GenericDAO<Object, Long> {

	String insertCSVData(String tableName, List<String> csvData,String mode,String historyAndKeyFieldName,String logFilePath);
	public void writeDataLog(String filePath, String[] fileLines);
	
	Map<String,String> getLookupData(String sql);
	
	Map<Integer,Map<Integer,Integer>> getTaskSchdulerForPath();
	
	Map<String,Integer> getSurveyTypeAndTargetDaysFromTask(String task);
	List<String>  getHolidayList();
	
}	
