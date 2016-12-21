package com.rmsi.spatialvue.studio.dao;

import java.util.List;

import com.rmsi.spatialvue.studio.domain.Legal;

public interface LegalDAO extends GenericDAO<Legal, Integer>{	
	Legal getLegalDetailsByIssueId(int issueGid);
	Object getLookupDetail(String tableName,String idField,String idValue);
	List<Object> getAllLookupDetail(String tableName, String lang);
	 List<Legal> getLegalByRowID(String rowid);
}
