package com.rmsi.spatialvue.studio.dao;

import java.util.Date;
import java.util.List;

import com.rmsi.spatialvue.studio.domain.Complaint;
import com.rmsi.spatialvue.studio.domain.Complaint_Nature_Lkp;
import com.rmsi.spatialvue.studio.domain.User;

public interface ComplaintDAO extends GenericDAO<Complaint, Long> {

	Complaint findComplaintById(String complaintID);
	Complaint findComplaintById(String complaintID, int complainantID);
	List<Complaint> findComplaints(String category);
	List<Complaint> findComplaintsForWardenUser(String category,String email);
	Complaint findComplaintByGId(Integer gID);
	Complaint_Nature_Lkp findComplaintEnqByGId(Integer gID);

	boolean updateComplaintIssueId(String complaintId, Integer issueId);

	boolean closeComplaints(Integer issueId, Date signoff);
	
	List<Complaint> findComplaintsByIssueID(Integer issueid,String status);
	List<Complaint_Nature_Lkp> getComplaintEnquiries();
	boolean closeComplaintByComplaintID(String compalintid, Date signoff);
	boolean updateComplaintAssignTo(String complaintId, String email);	
	List<Complaint> findComplaintsForWardenUser(String category, User objuser);
	List<Complaint> findComplaintsForMiscUser(String category, User objuser);
}
