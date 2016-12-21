package com.rmsi.spatialvue.studio.dao.hibernate;

import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.ComplaintDAO;
import com.rmsi.spatialvue.studio.domain.Complaint;
import com.rmsi.spatialvue.studio.domain.Complaint_Nature_Lkp;
import com.rmsi.spatialvue.studio.domain.PublicUser;
import com.rmsi.spatialvue.studio.domain.TaskScheduler;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;

@Repository
public class ComplaintHibernateDAO extends GenericHibernateDAO<Complaint, Long> implements
ComplaintDAO {

	@SuppressWarnings("unchecked")
	public Complaint findComplaintById(String complaintID){
		List<Complaint> complaint =
			getEntityManager().createQuery("Select c from Complaint c where c.complaintid  = :complaintid").setParameter("complaintid", complaintID).getResultList();
		    if(complaint.size() > 0)
			return complaint.get(0);
		else
			return null;
	}
	
	public Complaint findComplaintById(String complaintID, int complainantID){
		System.out.println("------Into find complaintById with complainantID----");
		List<Complaint> complaint =
				getEntityManager().createQuery("Select c from Complaint c where c.complaintid  =:complaintid and c.publicUser.complainantid =:complainantid")
				.setParameter("complaintid", complaintID)
				.setParameter("complainantid", complainantID).getResultList();
			    if(complaint.size() > 0)
			    	return complaint.get(0);
			else
				return null;
	}
	
	@SuppressWarnings("unchecked")
	public List<Complaint> findComplaints(String category){
		List<Complaint> listComplaint =null;
		if("A".equalsIgnoreCase(category)){			
			listComplaint=getEntityManager().createQuery(" Select c from Complaint c order by c.respondBy desc ").getResultList();
		}else if("B".equalsIgnoreCase(category)){
			listComplaint=getEntityManager().createQuery(" Select c from Complaint c " +
					" where c.resolveStatus=false " +
					" and (c.respondBy  < current_date or (c.acknowledgementSent is null and c.acknowledgeBy  < current_date) ) " +
					" order by c.respondBy desc").getResultList();
		}else if("P".equalsIgnoreCase(category)){
			int promptTask= Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.complaint.prompt"));
			listComplaint=getEntityManager().createQuery("Select c from Complaint c " +
					"where c.resolveStatus=false and (c.respondBy > current_date  or ( c.acknowledgeBy > current_date  AND c.acknowledgementSent is null)) order by c.respondBy desc").getResultList();
		}
	    return listComplaint;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Complaint findComplaintByGId(Integer gID) {	
		List<Complaint> complaint =
			getEntityManager().createQuery("Select c from Complaint c where c.gid  = :gid").setParameter("gid", gID).getResultList();
		    if(complaint.size() > 0)
			return complaint.get(0);
		else
			return null;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Complaint_Nature_Lkp findComplaintEnqByGId(Integer enquiryId) {	
		List<Complaint_Nature_Lkp> ComplaintEnq =
			getEntityManager().createQuery("Select c from Complaint_Nature_Lkp c where c.enquiryid  = :enquiryid").setParameter("enquiryid", enquiryId).getResultList();
		    if(ComplaintEnq.size() > 0)
			return ComplaintEnq.get(0);
		else
			return null;
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public boolean updateComplaintIssueId(String complaintId, Integer issueId){
			try {
			Query query = getEntityManager()
					.createQuery(
							"update Complaint c set c.issueid = :issueId where c.complaintid = :complaintId");
			query.setParameter("issueId", issueId);
			query.setParameter("complaintId", complaintId);
			int count = query.executeUpdate();
			System.out.println("Update COMPLAINT count: " + count);
			if (count > 0) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	@Override
	public boolean closeComplaints(Integer issueId, Date signoff) {
		try {
			Query query = getEntityManager()
					.createQuery(
							"update Complaint c set c.signedoff = :signoff, c.resolveStatus=true,c.responseSent=:signoff where c.issueid = :issueId and c.resolveStatus=false");
			query.setParameter("issueId", issueId);
			query.setParameter("signoff", signoff);
			int count = query.executeUpdate();
			System.out.println("Update COMPLAINT count: " + count);
			if (count > 0) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<Complaint> findComplaintsByIssueID(Integer issueid,String status){
		List<Complaint> listComplaint =null;
		if("open".equalsIgnoreCase(status)){			
			listComplaint=getEntityManager().createQuery("Select c from Complaint c where c.issueid = :issueid and c.resolveStatus=false").setParameter("issueid", issueid).getResultList();
		}else if("close".equalsIgnoreCase(status)){		
			listComplaint=getEntityManager().createQuery("Select c from Complaint c where c.issueid = :issueid and c.resolveStatus=true").setParameter("issueid", issueid).getResultList();
		}
		else{		
			listComplaint=getEntityManager().createQuery("Select c from Complaint c where c.issueid = :issueid ").setParameter("issueid", issueid).getResultList();
		}
	    return listComplaint;
	}
	
	public List<Complaint_Nature_Lkp> getComplaintEnquiries(){
		return getEntityManager().createQuery("Select c from Complaint_Nature_Lkp c").getResultList();
	}

	@Override
	public List<Complaint> findComplaintsForWardenUser(String category,
			String email) {
		List<Complaint> listComplaint =null;
		if("A".equalsIgnoreCase(category)){			
			listComplaint=getEntityManager().createQuery("Select c from Complaint c where c.assignedTo=:email order by c.respondBy desc").setParameter("email", email).getResultList();
		}else if("B".equalsIgnoreCase(category)){
			listComplaint=getEntityManager().createQuery("Select c from Complaint c where c.assignedTo=:email and c.resolveStatus=false and (c.respondBy  < current_date or (c.acknowledgementSent is null and c.acknowledgeBy  < current_date) ) order by c.respondBy desc").setParameter("email", email).getResultList();
		}else if("P".equalsIgnoreCase(category)){
			int promptTask= Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.complaint.prompt"));
			System.out.println("Prompt task: " + promptTask);
			listComplaint = getEntityManager().createQuery("Select c from Complaint c where c.assignedTo=:email and c.resolveStatus=false and (c.respondBy between current_date AND (current_date + "+ promptTask + ") or ( c.acknowledgeBy between current_date AND (current_date + "+ promptTask + " ) AND c.acknowledgementSent is null)) order by c.respondBy desc").setParameter("email", email).getResultList();
		}
	    return listComplaint;
	}
	
	
	@Override
	public boolean closeComplaintByComplaintID(String compalintid, Date signoff) {
		try {
			Query query = getEntityManager()
					.createQuery(
							"update Complaint c set c.signedoff = :signoff, c.resolveStatus=true,c.responseSent=:signoff where c.complaintid = :compalintid and c.resolveStatus=false");
			query.setParameter("compalintid", compalintid);
			query.setParameter("signoff", signoff);
			int count = query.executeUpdate();
			System.out.println("Update COMPLAINT count: " + count);
			if (count > 0) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public boolean updateComplaintAssignTo(String complaintId, String email){
			try {
			Query query = getEntityManager()
					.createQuery(
							"update Complaint c set c.assignedTo = :assignedTo where c.complaintid = :complaintId");
			query.setParameter("assignedTo", email);
			query.setParameter("complaintId", complaintId);
			int count = query.executeUpdate();
			System.out.println("Update COMPLAINT count: " + count);
			if (count > 0) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Complaint> findComplaintsForWardenUser(String category,User objuser) {
		List<Complaint> listComplaint =null;
		int seasonalWardenrole=Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.seasonalWardenId"));
		int wardenrole=Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"));
		
		if(objuser.getFunctionalRole()==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"))){
			System.out.println("######## Warder User");
		
			if("A".equalsIgnoreCase(category)){			
				listComplaint=getEntityManager().createQuery("Select c from Complaint c " +
						"where c.assignedTo=:email OR c.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  =:seasonalWardenrole ) " +
						" order by c.respondBy desc")
						.setParameter("email", objuser.getEmail())
						.setParameter("managerid", objuser.getManagerid())
						.setParameter("seasonalWardenrole", seasonalWardenrole)
						.getResultList();
			}else if("B".equalsIgnoreCase(category)){
				listComplaint=getEntityManager().createQuery(" Select c from Complaint c " +
						" where (c.assignedTo=:email OR c.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  =:seasonalWardenrole ) )" +
						" and c.resolveStatus=false " +
						" and (c.respondBy  < current_date or (c.acknowledgementSent is null and c.acknowledgeBy  < current_date ) ) " +
						" order by c.respondBy desc ")
						.setParameter("email", objuser.getEmail())
						.setParameter("managerid", objuser.getManagerid())
						.setParameter("seasonalWardenrole", seasonalWardenrole)
						.getResultList();
			}else if("P".equalsIgnoreCase(category)){
				int promptTask= Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.complaint.prompt"));
				System.out.println("Prompt task: " + promptTask);
				/*listComplaint = getEntityManager().createQuery(" Select c from Complaint c " +
						" where (c.assignedTo=:email OR c.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  =:seasonalWardenrole ) )" +
						" and c.resolveStatus=false " +
						" and (c.respondBy between current_date AND (current_date + "+ promptTask + ") " +
								" or ( c.acknowledgeBy > current_date AND c.acknowledgementSent is null)) " +
								" order by c.respondBy desc")
								.setParameter("email", objuser.getEmail())
								.setParameter("managerid", objuser.getManagerid())
								.setParameter("seasonalWardenrole", seasonalWardenrole)
								.getResultList();*/
				
				listComplaint = getEntityManager().createQuery(" Select c from Complaint c " +
						" where (c.assignedTo=:email OR c.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  =:seasonalWardenrole ) )" +
						" and c.resolveStatus=false " +
						//" and c.acknowledgeBy > current_date AND c.acknowledgementSent is null " +
						" and (c.respondBy > current_date  or ( c.acknowledgeBy > current_date  AND c.acknowledgementSent is null)) " +
								" order by c.respondBy desc")
								.setParameter("email", objuser.getEmail())
								.setParameter("managerid", objuser.getManagerid())
								.setParameter("seasonalWardenrole", seasonalWardenrole)
								.getResultList();
				
				
			}
		}
		else if(objuser.getFunctionalRole()==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.headwardenUserRole"))) {
			System.out.println("######## Head Worder User");
			
			if("A".equalsIgnoreCase(category)){			
				listComplaint=getEntityManager().createQuery("Select c from Complaint c " +
						"where c.assignedTo=:email OR c.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  in (:seasonalWardenrole, :wardenUsersRole )) " +
						" order by c.respondBy desc")
						.setParameter("email", objuser.getEmail())
						.setParameter("managerid", objuser.getId())
						.setParameter("seasonalWardenrole", seasonalWardenrole)
						.setParameter("wardenUsersRole", wardenrole)
						.getResultList();
			}else if("B".equalsIgnoreCase(category)){
				listComplaint=getEntityManager().createQuery(" Select c from Complaint c " +
						" where (c.assignedTo=:email OR c.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  in (:seasonalWardenrole, :wardenUsersRole ))) " +
						" and c.resolveStatus=false " +
						" and (c.respondBy  < current_date or (c.acknowledgementSent is null and c.acknowledgeBy  < current_date) ) " +
						" order by c.respondBy desc ")
						.setParameter("email", objuser.getEmail())
						.setParameter("managerid", objuser.getId())
						.setParameter("seasonalWardenrole", seasonalWardenrole)
						.setParameter("wardenUsersRole", wardenrole)
						.getResultList();	
			}else if("P".equalsIgnoreCase(category)){
				int promptTask= Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.complaint.prompt"));
				System.out.println("Prompt task: " + promptTask);
				/*listComplaint = getEntityManager().createQuery(" Select c from Complaint c " +
						" where (c.assignedTo=:email OR c.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  in (:seasonalWardenrole, :wardenUsersRole ))) " +
						" and c.resolveStatus=false " +
						" and (c.respondBy between current_date AND (current_date + "+ promptTask + ") " +
								" or ( c.acknowledgeBy > current_date AND c.acknowledgementSent is null)) " +
								" order by c.respondBy desc")
								.setParameter("email", objuser.getEmail())
								.setParameter("managerid", objuser.getId())
								.setParameter("seasonalWardenrole", seasonalWardenrole)
								.setParameter("wardenUsersRole", wardenrole)
								.getResultList();*/
				
				listComplaint = getEntityManager().createQuery(" Select c from Complaint c " +
						" where (c.assignedTo=:email " +
						"	OR c.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  in (:seasonalWardenrole, :wardenUsersRole ))) " +
						" and c.resolveStatus=false " +
						" and (c.respondBy > current_date  or ( c.acknowledgeBy > current_date  AND c.acknowledgementSent is null)) " +
								" order by c.respondBy desc")
								.setParameter("email", objuser.getEmail())
								.setParameter("managerid", objuser.getId())
								.setParameter("seasonalWardenrole", seasonalWardenrole)
								.setParameter("wardenUsersRole", wardenrole)
								.getResultList();
			}
		
		}
		
	    return listComplaint;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Complaint> findComplaintsForMiscUser(String category,
			User objuser) {
		List<Complaint> listComplaint =null;
		if("A".equalsIgnoreCase(category)){			
			listComplaint=getEntityManager().createQuery("Select c from Complaint c " +
					"where c.assignedTo=:email order by c.respondBy desc")
					.setParameter("email", objuser.getEmail()).getResultList();
		}else if("B".equalsIgnoreCase(category)){
			listComplaint=getEntityManager().createQuery(" Select c from Complaint c " +
					" where c.assignedTo=:email and c.resolveStatus=false " +
					" and (c.respondBy  < current_date or (c.acknowledgementSent is null and c.acknowledgeBy  < current_date) ) " +
					" order by c.respondBy desc ").setParameter("email", objuser.getEmail()).getResultList();
		}else if("P".equalsIgnoreCase(category)){
			int promptTask= Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.complaint.prompt"));
			System.out.println("Prompt task: " + promptTask);
			listComplaint = getEntityManager().createQuery(" Select c from Complaint c " +
					" where c.assignedTo=:email and c.resolveStatus=false " +
					" and (c.respondBy between current_date AND (current_date + "+ promptTask + ") " +
							" or ( c.acknowledgeBy > current_date AND c.acknowledgementSent is null)) " +
							" order by c.respondBy desc").setParameter("email", objuser.getEmail()).getResultList();
		}
	    return listComplaint;
	}
	
}
