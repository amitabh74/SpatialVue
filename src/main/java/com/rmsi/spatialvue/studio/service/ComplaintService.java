package com.rmsi.spatialvue.studio.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.rmsi.spatialvue.studio.domain.Complaint;
import com.rmsi.spatialvue.studio.domain.Complaint_Nature_Lkp;
import com.rmsi.spatialvue.studio.domain.PublicUser;

public interface ComplaintService {
	
	@Transactional(readOnly=true)
	List<Complaint> getComplaints(String category,String email);
	//List<Complaint> getComplaintsForWardenUser(String category,String email);
	
	Complaint getComplaintById(String complaintID, String complainantID);
	Complaint getComplaintById(String complaintID);
	PublicUser getPublicUserDetails(String useremailID);	
    void sendLogComplaintMail(String complaintID,String complainantEmailAdd,String complainantName);
    void sendStandardAckMail(String mailTo,String subject,String message);
    List<Complaint_Nature_Lkp> getAllComplaintEnqueries();
    Complaint getComplaintByGId(Integer gID);
    Complaint_Nature_Lkp getComplaintEnqByGId(Integer gID);
    @Transactional
    void saveComplaint(Complaint complaint);
    String findStandardAckMail(String complaintId,String responceby);
    String findComplaintLayerName();
    List<PublicUser> getPublicUsersList();
    PublicUser findPublicUserbyID(Integer complainantId);
    List<Complaint_Nature_Lkp> getComplaintEnquiries();
    List<PublicUser> getPublicUsers();
    
    @Transactional
    boolean updateComplaintIssueId(String complaintId, Integer issueId);
    
    @Transactional
    boolean closeComplaintsByIssueId(Integer issueId,Date signoff);
    List<Complaint> findComplaintsByIssueID(Integer issueId, String Status);
    void sendStandardClosingComplaintMail(Map<String,String> emailList);
    
    String findStandardClosingMail(String complaintId,String responceby);
    @Transactional
    boolean closeComplaintsByComplaintId(String complaintID,Date signoff);
    boolean sendCustomClosingComplaintMail(String complainantEmailAdd,String subject,String closingComplaintMsg);
    @Transactional
    boolean updateComplaintAssignTo(String complaintId, String email);
}
