package com.rmsi.spatialvue.studio.web.mvc;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.domain.Complaint;
import com.rmsi.spatialvue.studio.domain.Complaint_Nature_Lkp;
import com.rmsi.spatialvue.studio.domain.Contact;
import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.PublicUser;
import com.rmsi.spatialvue.studio.service.ComplaintService;
import com.rmsi.spatialvue.studio.service.ContactService;
import com.rmsi.spatialvue.studio.service.IssueService;

@Controller
public class ComplaintController {

	@Autowired
	private ComplaintService complaintService=null;
	
	@Autowired
	private IssueService issueService;
	
	@Autowired
	ContactService contactService;
	
	@RequestMapping(value = "/viewer/complaint/complaintsData/", method = RequestMethod.POST)
	@ResponseBody
	public List<Complaint> getAllComplaints(HttpServletRequest request, HttpServletResponse response){		
		return complaintService.getComplaints(request.getParameter("category"),request.getParameter("email"));		
	}	
	
	@RequestMapping(value = "/viewer/complaint/complainantDetails/", method = RequestMethod.POST)
	@ResponseBody
    public PublicUser getUserDetails(HttpServletRequest request, HttpServletResponse response){
		PublicUser publicUser=null;
		try{	
			String useremail=request.getParameter("user");		
			publicUser=complaintService.getPublicUserDetails(useremail);			
		}catch(Exception e){
			e.printStackTrace();
		}
		return publicUser;
	}
	
	@RequestMapping(value = "/viewer/complaint/complaintDetails/", method = RequestMethod.POST)
	@ResponseBody
    public Complaint getComplaintById(HttpServletRequest request, HttpServletResponse response){
		System.out.println("---- complainantid: " + request.getParameter("complainantid"));
		if(request.getParameter("complainantid") == null){
			return complaintService.getComplaintById(request.getParameter("complaintId"));
		}else{
			return complaintService.getComplaintById(request.getParameter("complaintId"), request.getParameter("complainantid"));
		}
		
	}
	
	@RequestMapping(value = "/viewer/complaint/sendLogComplaintMail/", method = RequestMethod.POST)
	@ResponseBody
	public void sendLogComplaintMail(HttpServletRequest request, HttpServletResponse response){
		
		complaintService.sendLogComplaintMail(request.getParameter("complaintId"),request.getParameter("complainantEmail"),request.getParameter("complainantName"));
		
	}
	
	@RequestMapping(value = "/viewer/complaint/sendStandardAckMail/", method = RequestMethod.POST)
	@ResponseBody
	public void sendStandardAckMail(HttpServletRequest request, HttpServletResponse response){
		String message=request.getParameter("msg");
		Complaint complaint=complaintService.getComplaintById(request.getParameter("complaintId"));
		complaint.setAcknowledgementLink(message);
		complaint.setAcknowledgementSent(new Date());	
		complaintService.saveComplaint(complaint);
		complaintService.sendStandardAckMail(request.getParameter("mailTo"),request.getParameter("subject"),message);
		
	}
	
	@RequestMapping(value = "/viewer/complaint/enquiries/", method = RequestMethod.GET)
	@ResponseBody
	public List<Complaint_Nature_Lkp> getComplaintEnqueries(){		
		return complaintService.getAllComplaintEnqueries();		
	}
	
	@RequestMapping(value = "/viewer/complaint/complaintDetailsByGid/", method = RequestMethod.POST)
	@ResponseBody
    public Complaint getComplaintByGId(HttpServletRequest request, HttpServletResponse response){
		return complaintService.getComplaintByGId(Integer.parseInt(request.getParameter("gid")));	
	}
	
	@RequestMapping(value = "/viewer/complaint/update", method = RequestMethod.POST)
	@ResponseBody
    public void updateComplaint(HttpServletRequest request, HttpServletResponse response){
		
		try{

		String complaintId=ServletRequestUtils.getRequiredStringParameter(request, "wc_complaintID");
		String typeEnquiry=ServletRequestUtils.getRequiredStringParameter(request, "typeEnq");
		String recommendation=ServletRequestUtils.getRequiredStringParameter(request, "recommendation");
		
		//added for Super user
		String natureOfComplaint=ServletRequestUtils.getRequiredStringParameter(request, "natureOfComplaint");
		String locationOfComplaint=ServletRequestUtils.getRequiredStringParameter(request, "locationOfComplaint");
		
		Complaint complaint=complaintService.getComplaintById(complaintId);
		if(typeEnquiry!=null){
			try{			
			Complaint_Nature_Lkp complaint_Nature_Lkp=complaintService.getComplaintEnqByGId(Integer.parseInt(typeEnquiry));
			complaint.setComplaintNatureLkp(complaint_Nature_Lkp);
			}catch(Exception e){}
			
		}		
		complaint.setRecommendation(recommendation);
		
		if(natureOfComplaint!=null)
		complaint.setComplaintEnquiryNature(natureOfComplaint);
		if(locationOfComplaint!=null)
		complaint.setComplaintEnquiryLocation(locationOfComplaint);
				
		complaintService.saveComplaint(complaint);
		 
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/viewer/complaint/standardAckMailTempl/", method = RequestMethod.POST)
	@ResponseBody
    public String getStandardAckMail(HttpServletRequest request, HttpServletResponse response){	
		//response.setContentType("text/plain; charset=utf-8");
		return complaintService.findStandardAckMail(request.getParameter("complaintId"),request.getParameter("respondBy"));	
		
	}
	@RequestMapping(value = "/viewer/complaint/complaintLayerName/", method = RequestMethod.GET)
	@ResponseBody
    public String getComplaintLayerName(){		
		return complaintService.findComplaintLayerName();
	}
	
	@RequestMapping(value = "/viewer/complaint/publicUsersList/", method = RequestMethod.GET)
	@ResponseBody
	public List<PublicUser> getPublicUsersList(){
		return complaintService.getPublicUsersList();
	}
	
	
	@RequestMapping(value = "/viewer/complaint/complainantDetails/{id}", method = RequestMethod.GET)
	@ResponseBody
    public PublicUser getPublicUserbyID(@PathVariable String id){
		return complaintService.findPublicUserbyID(Integer.parseInt(id));
	}
	
	@RequestMapping(value = "/viewer/complaint/updateissueid", method = RequestMethod.POST)
	@ResponseBody
    public int updateComplaintIssueId(HttpServletRequest request, HttpServletResponse response){
		int result=1;
		try {
			
			Issue objIssue=null;
			String complaintId=ServletRequestUtils.getRequiredStringParameter(request, "complaintId");
			String issueId = ServletRequestUtils.getRequiredStringParameter(request, "issueId");
			
			Complaint complaint=complaintService.getComplaintById(complaintId);
			Integer assignedIssueId=null;
			
			if(complaint!=null)
				assignedIssueId=complaint.getIssueid();
			if(assignedIssueId!=null){
				
			}
			
			if(issueId!=null)
				objIssue=issueService.getIssueByGid(Integer.parseInt(issueId));
			
			if(objIssue!=null){
				if(complaintService.updateComplaintIssueId(complaintId,Integer.parseInt(issueId)))
					result=1;
				else
					result=2;
				
			}else{
				result=3;
			}
		//complaintService.updateComplaintIssueId(complaintId,Integer.parseInt(issueId));
		} catch (ServletRequestBindingException e) {
			// TODO Auto-generated catch block
			result=2;
			e.printStackTrace();
		}
		return result;
	}
	
	@RequestMapping(value = "/viewer/complaint/issueid/{complaintId}", method = RequestMethod.GET)
	@ResponseBody
    public int getIssueIdByComplaintId(@PathVariable String complaintId){
		int assignedIssueId=0;
		try {
								
			Complaint complaint=complaintService.getComplaintById(complaintId);
			if(complaint!=null)
				assignedIssueId=complaint.getIssueid();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return assignedIssueId;
	}
	
	
	/*
	 * method for closing complaint from issue
	 */
	@RequestMapping(value = "/viewer/complaint/signoff", method = RequestMethod.POST)
	@ResponseBody
    public boolean closeComplaint(HttpServletRequest request, HttpServletResponse response){
		boolean result = false;
		try {

			Issue objIssue = null;
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Integer issueId = Integer.parseInt(ServletRequestUtils
					.getRequiredStringParameter(request, "issueId"));
			String signoffDate = ServletRequestUtils
					.getRequiredStringParameter(request, "signoffDate");
			List<Complaint> listToUpdateComplaint = complaintService
					.findComplaintsByIssueID(issueId, "open");
			
			

			Date signOffDate = null;
			if(signoffDate!=null && signoffDate!=""){
				signOffDate = df.parse(signoffDate);
			}else{
				signOffDate = new Date();
			}
			
			if (complaintService.closeComplaintsByIssueId(issueId, signOffDate)) {
				Map<String, String> emailmap = new HashMap<String, String>();

				int size = listToUpdateComplaint.size();
				for (int i = 0; i < size; i++) {
					Complaint objComplaint = listToUpdateComplaint.get(i);
					PublicUser tempUser = objComplaint.getPublicUser();
					String complaintID = objComplaint.getComplaintid();

					if (tempUser != null) {
						String userEmail = tempUser.getEmail();
						if (userEmail != null && userEmail.trim() != "") {
							emailmap.put(complaintID, userEmail);
						}
					} else {
						/*int contactID = objComplaint.getContactid();
						Contact objContact = contactService
								.findContactByID(contactID);
						String contactEmail = objContact.getEmail();
						if (contactEmail != null && contactEmail.trim() != "") {
							emailmap.put(complaintID, contactEmail.trim());
						}*/
						Contact objContact = objComplaint.getContact();
						String contactEmail = objContact.getEmail();
						if (contactEmail != null && contactEmail.trim() != "") {
							emailmap.put(complaintID, contactEmail.trim());
						}
					}
					// send mail
					complaintService.sendStandardClosingComplaintMail(emailmap);
					result = true;
				}

				// send mail
				//complaintService.sendStandardClosingComplaintMail(emailmap);
				result = true;
			}

		} catch (ServletRequestBindingException e) {
			e.printStackTrace();
			result = false;
		} catch (Exception e) {
			e.printStackTrace();
			result = false;
		}
		return result;
	}
	
	
	@RequestMapping(value = "/viewer/complaint/enquiryTypes", method = RequestMethod.GET)
	@ResponseBody
    public List<Complaint_Nature_Lkp> getEnquiryTypes(){
		return complaintService.getComplaintEnquiries();
	}
    
    @RequestMapping(value = "/viewer/complaint/complainants", method = RequestMethod.GET)
	@ResponseBody
    public List<PublicUser> getAllPublicUsers(){
    	return complaintService.getPublicUsers();
    }
    
    //closing complaints without relation with job and issue
    @RequestMapping(value = "/viewer/complaint/standardClosingMailTempl/", method = RequestMethod.POST)
	@ResponseBody
    public String getStandardClosingMail(HttpServletRequest request, HttpServletResponse response){		
		
    	return complaintService.findStandardClosingMail(request.getParameter("complaintId"),request.getParameter("respondBy"));	
	}
    
    /*
	 * method for closing complaint without issue
	 */
	@RequestMapping(value = "/viewer/complaint/close", method = RequestMethod.POST)
	@ResponseBody
    public boolean closeComplaintAndSendingClosingMail(HttpServletRequest request, HttpServletResponse response){
		boolean result = false;
		try {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			String complaintid = ServletRequestUtils
					.getRequiredStringParameter(request, "complaintId");
			String mailbody = ServletRequestUtils
					.getRequiredStringParameter(request, "msg");
			String mailSubject = ServletRequestUtils
					.getRequiredStringParameter(request, "subject");
			String complainantEmailAdd = ServletRequestUtils
					.getRequiredStringParameter(request, "mailTo");
			
			Date signOffDate = new Date();
			//signOffDate = df.parse(signOffDate);	
			
			if (complaintService.closeComplaintsByComplaintId(complaintid, signOffDate)) {
				// send mail
				result=complaintService.sendCustomClosingComplaintMail(complainantEmailAdd,mailSubject,mailbody);
			}

		} catch (ServletRequestBindingException e) {
			e.printStackTrace();
			result = false;
		} catch (Exception e) {
			e.printStackTrace();
			result = false;
		}
		return result;
	}
	
	@RequestMapping(value = "/viewer/complaint/updateassignto", method = RequestMethod.POST)
	@ResponseBody
    public boolean updateComplaintAssignTo(HttpServletRequest request, HttpServletResponse response){
		
		try{

		String complaintId=ServletRequestUtils.getRequiredStringParameter(request, "wc_complaintID");
		String assignToEmail=ServletRequestUtils.getRequiredStringParameter(request, "assigntoemail");
		
		
					
		return complaintService.updateComplaintAssignTo(complaintId, assignToEmail);
		 
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
	
    
}
