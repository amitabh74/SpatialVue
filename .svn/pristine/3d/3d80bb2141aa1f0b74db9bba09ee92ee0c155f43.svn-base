package com.rmsi.spatialvue.studio.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rmsi.spatialvue.studio.dao.LegalDAO;
import com.rmsi.spatialvue.studio.dao.NonspatialAttachmentDAO;
import com.rmsi.spatialvue.studio.domain.Legal;
import com.rmsi.spatialvue.studio.domain.NonspatialAttachment;
import com.rmsi.spatialvue.studio.service.LegalService;

@Service
public class LegalServiceImpl implements LegalService{	
	
	@Autowired
	private LegalDAO legalDAO;
	
	@Autowired
	private NonspatialAttachmentDAO nonspatialattachmentDAO;
	
	@Override
	public Legal getLegalDetailsByIssueId(int issueGid) {
		// TODO Auto-generated method stub
		Legal legal=legalDAO.getLegalDetailsByIssueId(issueGid);
		if(legal!=null){
			Set<NonspatialAttachment> nonspatialattachments = new HashSet<NonspatialAttachment>(nonspatialattachmentDAO.findNonspatialAttachmentByGid("Legal",legal.getLegalid()));			
			legal.setAttachments(nonspatialattachments);
		}
		return legal;
	}

	@Override
	public Object getLookupDetail(String tableName, String idField,
			String idValue) {
		// TODO Auto-generated method stub
		return legalDAO.getLookupDetail(tableName, idField, idValue);
	}

	@Override
	public List<Object> getAllLookupDetail(String tableName, String lang) {
		// TODO Auto-generated method stub
		return legalDAO.getAllLookupDetail(tableName, lang);
	}

	@Override
	@Transactional
	public void createLegal(Legal legal) {
		// TODO Auto-generated method stub
		legalDAO.makePersistent(legal);
	}

	@Override
	public List<Legal> getLegalByRowID(String rowid) {
		return legalDAO.getLegalByRowID(rowid);
	}

}
