package com.rmsi.spatialvue.studio.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rmsi.spatialvue.studio.dao.ComplaintDAO;
import com.rmsi.spatialvue.studio.dao.IssueDAO;
import com.rmsi.spatialvue.studio.dao.PublicUserDAO;
import com.rmsi.spatialvue.studio.dao.UserDAO;
import com.rmsi.spatialvue.studio.domain.Complaint;
import com.rmsi.spatialvue.studio.domain.Complaint_Nature_Lkp;
import com.rmsi.spatialvue.studio.domain.Contact;
import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.PublicUser;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.service.ComplaintService;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;
import com.rmsi.spatialvue.studio.util.SMTPMailServiceUtil;
import com.rmsi.spatialvue.studio.util.GenericUtil;
@Service
public class ComplaintServiceImpl implements ComplaintService{
	
	@Autowired
	private ComplaintDAO complaintDAO;
	
	@Autowired
	private PublicUserDAO publicUserDAO;
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private IssueDAO issueDAO;
	
	
	@Override
	public List<Complaint> getComplaints(String category,String email) {
		
		List<Complaint> objComplaint=null;
		User objuser=userDAO.findByEmail(email);
		Integer userRole=objuser.getFunctionalRole();
		Integer waredenUserRole=Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"));
		Integer headwaredenUserRole=Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.headwardenUserRole"));
		Integer seasonalwaredenUserRole=Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.seasonalWardenId"));
		
		/*if(userRole==waredenUserRole || userRole==headwaredenUserRole || userRole==seasonalwaredenUserRole){
		objComplaint=complaintDAO.findComplaintsForWardenUser(category, email);
		}else{
			objComplaint=complaintDAO.findComplaints(category);
		}*/
		
		/*****************By Aparesh on 11-06-2013**************/
		
		if(GenericUtil.isUserInValidRole (ConfigurationUtil.getProperty("workcommitment.superUsersRole"),userRole)){			
			System.out.println("Role is superuser ---- ");
			objComplaint=complaintDAO.findComplaints(category);
			
		}else if(GenericUtil.isUserInValidRole (ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"),userRole)){
			System.out.println("Role is warden ---- ");
			objComplaint=complaintDAO.findComplaintsForWardenUser(category, objuser);	
			
		}
		else if(GenericUtil.isUserInValidRole (ConfigurationUtil.getProperty("workcommitment.headwardenUserRole"),userRole)){
			System.out.println("Role is head warden ---- ");
			objComplaint=complaintDAO.findComplaintsForWardenUser(category, objuser);	
			
		}
		else{
				System.out.println("Role is miscUserRole ---- ");
				objComplaint=complaintDAO.findComplaintsForMiscUser(category,objuser);
				
				
			}		
		
		
		
		/*****************end**************/
					
		
		return objComplaint;
	}
	
	@Override
	public Complaint getComplaintById(String complaintID) {
		return complaintDAO.findComplaintById(complaintID);
	}
	
	@Override
	public Complaint getComplaintById(String complaintID, String complainantID){
		System.out.println("----getComplaintById------");
		int _complainantid = Integer.parseInt(complainantID);
		return complaintDAO.findComplaintById(complaintID, _complainantid);
	}
	
	@Override
	public PublicUser getPublicUserDetails(String useremailID){
		return publicUserDAO.findByEmail(useremailID);
		
	}

	@Override
	public void sendLogComplaintMail(String complaintID, String complainantEmailAdd,String complainantName) {
		// TODO Auto-generated method stub
		
		try {	
			String adminEmailAdd=ConfigurationUtil.getProperty("admin.email.address");
			String contanctPerson=ConfigurationUtil.getProperty("contanct.person");
			String logComplaintMsg=ConfigurationUtil.getProperty("log.complaint.mail");
			String emailSubject = ConfigurationUtil.getProperty("close.complaint.mail.subject");
			logComplaintMsg=logComplaintMsg.replace("<1>", complainantName);
			logComplaintMsg=logComplaintMsg.replace("<2>", complaintID);
			logComplaintMsg=logComplaintMsg.replace("<3>", contanctPerson);
			SMTPMailServiceUtil.sendMail(adminEmailAdd, complainantEmailAdd, emailSubject, logComplaintMsg);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public List<Complaint_Nature_Lkp> getAllComplaintEnqueries() {
		// TODO Auto-generated method stub
		return publicUserDAO.findAllComplaintEnqueries();
	}

	@Override
	public void sendStandardAckMail(String mailTo, String subject,
			String message) {
		// TODO Auto-generated method stub	
		try {	
			String adminEmailAdd=ConfigurationUtil.getProperty("admin.email.address");
			SMTPMailServiceUtil.sendMail(adminEmailAdd, mailTo, subject, message);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	@Override
	public Complaint getComplaintByGId(Integer gID) {
		// TODO Auto-generated method stub
		return complaintDAO.findComplaintByGId(gID);
	}

	@Override
	public Complaint_Nature_Lkp getComplaintEnqByGId(Integer gID) {
		// TODO Auto-generated method stub
		return complaintDAO.findComplaintEnqByGId(gID);
	}

	@Override
	public void saveComplaint(Complaint complaint) {
		// TODO Auto-generated method stub
		complaintDAO.makePersistent(complaint);
	}
	
	@Override
	public String findStandardAckMail(String complaintId,String responceby){
		String standardAckMail=null;
		try {	
			standardAckMail=ConfigurationUtil.getProperty("acknowledgement.mail");
			Complaint objComplaint=getComplaintById(complaintId);
			System.out.println(" assigned to:" + objComplaint.getAssignedTo());
			PublicUser tempUser = objComplaint.getPublicUser();
			String complaintName="";
			if (tempUser != null) {
				complaintName = tempUser.getName();
			} else {
				Contact objContact = objComplaint.getContact();
				complaintName = objContact.getFirstName();
			}
			if(complaintName==null || complaintName.equalsIgnoreCase(""))
				complaintName="User";
			
			//Integer issueId = objComplaint.getIssueid();
			//Issue issue = issueDAO.getIssueByGid(issueId);
			
			standardAckMail=standardAckMail.replace("<1>", complaintId);
			standardAckMail=standardAckMail.replace("<3>", complaintName);
			/*if(issue != null && issue.getAssignedTo() != null){
				User user = userDAO.findByEmail(issue.getAssignedTo());
				if(user.getName() != null)
					standardAckMail = standardAckMail.replace("<WARDEN>", user.getName());
					standardAckMail = standardAckMail.replace("<WARDEN EMAIL>", user.getEmail());
				
			}*/
			if(objComplaint.getAssignedTo() != null){
				User user = userDAO.findByEmail(objComplaint.getAssignedTo());
				if(user.getName() != null)
					standardAckMail = standardAckMail.replace("<WARDEN>", user.getName());
					standardAckMail = standardAckMail.replace("<WARDEN EMAIL>", user.getEmail());
			}
			
			//System.out.println("Mail: " + standardAckMail);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return standardAckMail;
	}
	
	@Override
	public String findComplaintLayerName(){
		try {	
			return ConfigurationUtil.getProperty("complaint.layer.name");			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<PublicUser> getPublicUsersList(){
		//return publicUserDAO.findAll();
		return publicUserDAO.getAllPublicUsers();
	}

	@Override
	public PublicUser findPublicUserbyID(Integer complainantId) {
		// TODO Auto-generated method stub
		return publicUserDAO.findPublicUserbyID(complainantId);
	}

	@Override
	public boolean updateComplaintIssueId(String complaintId, Integer issueId) {
		return complaintDAO.updateComplaintIssueId(complaintId, issueId);
	}

	@Override
	public boolean closeComplaintsByIssueId(Integer issueId,Date signoff) {
		return complaintDAO.closeComplaints(issueId, signoff);
	}
	
	@Override
	public List<Complaint> findComplaintsByIssueID(Integer issueId, String Status) {
		List<Complaint> complaintsList=complaintDAO.findComplaintsByIssueID(issueId,Status);
		return complaintsList;
	}

	@Override
	public void sendStandardClosingComplaintMail(Map<String,String> emailList) {
		try {
			String adminEmailAdd=ConfigurationUtil.getProperty("admin.email.address");
			String closingComplaintMsg=ConfigurationUtil.getProperty("close.complaint.mail");
			Map<String,String> emailiAndcomplaintidList= emailList;
			String contanctPerson=ConfigurationUtil.getProperty("contanct.person");
			Set set = emailiAndcomplaintidList.entrySet();
			Iterator i = set.iterator();
			while(i.hasNext()) {
				Map.Entry me = (Map.Entry) i.next();
				closingComplaintMsg=closingComplaintMsg.replace("<1>", me.getKey().toString());
				closingComplaintMsg=closingComplaintMsg.replace("<2>",contanctPerson);
				String complainantEmailAdd=me.getValue().toString();
				SMTPMailServiceUtil.sendMail(adminEmailAdd, complainantEmailAdd, "Complaint resolved", closingComplaintMsg);
			} 
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public List<Complaint_Nature_Lkp> getComplaintEnquiries(){
		return complaintDAO.getComplaintEnquiries();
	}
	
	public List<PublicUser> getPublicUsers(){
		return publicUserDAO.getAllPublicUsers();
	}

	/*@Override
	public List<Complaint> getComplaintsForWardenUser(String category,String email) {
		return complaintDAO.findComplaintsForWardenUser(category,email);
	}*/
	
	//closing complaint template
	@Override
	public String findStandardClosingMail(String complaintId,String responceby){
		String standardClosingMail=null;
		String subjectClosingMail=null;
		try {
			
			Complaint objComplaint=getComplaintById(complaintId);
			PublicUser tempUser = objComplaint.getPublicUser();
			String complaintName="";
		
			if (tempUser != null) {
				complaintName = tempUser.getName();
			} else {
				Contact objContact = objComplaint.getContact();
				complaintName = objContact.getFirstName();
			}
			if(complaintName==null || complaintName.equalsIgnoreCase(""))
				complaintName="User";
			
			
			//Integer issueId = objComplaint.getIssueid();
			//Issue issue = issueDAO.getIssueByGid(issueId);
			
			standardClosingMail=ConfigurationUtil.getProperty("close.complaint.mail");
			standardClosingMail=standardClosingMail.replace("<1>", complaintName);
			standardClosingMail=standardClosingMail.replace("<2>", complaintId);
			
			/*if(issue != null && issue.getAssignedTo() != null){
				standardClosingMail = standardClosingMail.replace("<EMAIL>", issue.getAssignedTo());
				User user = userDAO.findByEmail(issue.getAssignedTo());
				if(user.getName() != null)
					standardClosingMail = standardClosingMail.replace("<WARDEN>", user.getName());
				if(user.getPhone() != null)
					standardClosingMail = standardClosingMail.replace("<PHONE>", user.getPhone());
			}*/
			
			if(objComplaint.getAssignedTo() != null){
				standardClosingMail = standardClosingMail.replace("<EMAIL>", objComplaint.getAssignedTo());
				User user = userDAO.findByEmail(objComplaint.getAssignedTo());
				if(user.getName() != null)
					standardClosingMail = standardClosingMail.replace("<WARDEN>", user.getName());
				if(user.getPhone() != null)
					standardClosingMail = standardClosingMail.replace("<PHONE>", user.getPhone());
			}
			
			subjectClosingMail=ConfigurationUtil.getProperty("close.complaint.mail.subject");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return standardClosingMail+"|"+subjectClosingMail;
	}
	
	@Override
	public boolean closeComplaintsByComplaintId(String complaintID,Date signoff) {
		return complaintDAO.closeComplaintByComplaintID(complaintID, signoff);
	}
	
	@Override
	public boolean sendCustomClosingComplaintMail(String complainantEmailAdd,String subject,String closingComplaintMsg) {
		boolean isMailSent=false;
		try {
			String adminEmailAdd=ConfigurationUtil.getProperty("admin.email.address");
			SMTPMailServiceUtil.sendMail(adminEmailAdd, complainantEmailAdd, subject, closingComplaintMsg);
			isMailSent=true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			isMailSent=false;
		}
		return isMailSent;
	}

	@Override
	public boolean updateComplaintAssignTo(String complaintId, String email) {
		return complaintDAO.updateComplaintAssignTo(complaintId, email);
	}
}
