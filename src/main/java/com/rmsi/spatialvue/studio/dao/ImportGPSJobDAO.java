package com.rmsi.spatialvue.studio.dao;

import java.util.List;
import java.util.Map;


public interface ImportGPSJobDAO extends GenericDAO<Object, Long> {

	boolean insertCSVData(String tableName, List<String> csvData,Map<Integer,String> fileMap);
	Map<String,String> getLookupData(String sql,int keyindex,int valueindex);
	int getQueryResult(String sql);
	String getUserEmail(String userName);
	String insertCSVData(Map<String,List<Object>> dataMap);
	
	Map<String,Integer> getSurveyTypeAndTargetDaysFromTask(String task);
}
