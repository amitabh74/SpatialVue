package com.rmsi.spatialvue.studio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.googlecode.ehcache.annotations.TriggersRemove;
import com.rmsi.spatialvue.studio.dao.AccessLandContactDAO;
import com.rmsi.spatialvue.studio.dao.ContactDAO;
import com.rmsi.spatialvue.studio.dao.ContactTypeDAO;
import com.rmsi.spatialvue.studio.dao.IssueContactDAO;
import com.rmsi.spatialvue.studio.dao.JobContactDAO;
import com.rmsi.spatialvue.studio.dao.PathContactDAO;
import com.rmsi.spatialvue.studio.domain.AccessLandContact;
import com.rmsi.spatialvue.studio.domain.Contact;
import com.rmsi.spatialvue.studio.domain.ContactTypeLkp;
import com.rmsi.spatialvue.studio.domain.FurnitureContact;
import com.rmsi.spatialvue.studio.domain.JobContact;
import com.rmsi.spatialvue.studio.domain.SurfaceContact;
import com.rmsi.spatialvue.studio.domain.IssueContact;
import com.rmsi.spatialvue.studio.dao.FurnitureContactDAO;
import com.rmsi.spatialvue.studio.dao.SurfaceContactDAO;
import com.rmsi.spatialvue.studio.domain.PathContact;
import com.rmsi.spatialvue.studio.service.ContactService;

/**
 * @author Saurabh.Mehta
 *
 */
@Service
public class ContactServiceImpl implements ContactService{
	
	@Autowired
	private ContactDAO contactDAO;

	@Autowired
	private ContactTypeDAO contactTypeDAO;
	
	@Autowired
	private AccessLandContactDAO accessLandContactDAO;
	
	@Autowired
	private FurnitureContactDAO furnitureContactDAO;
	
	@Autowired
	private SurfaceContactDAO surfaceContactDAO;
	
	@Autowired
	private PathContactDAO pathContactDAO;
	
	@Autowired
	private IssueContactDAO issueContactDAO;
	
	@Autowired
	private JobContactDAO jobContactDAO;
	
	@Override
	public List<ContactTypeLkp> findAllContactType() {
		return contactTypeDAO.findAll();
	}
	
	@Override
	public List<ContactTypeLkp> getContactTypeByOrder(){
		return contactTypeDAO.getAllContactType();
	}

	@Override
	public List<Contact> findAllContact() {
		return contactDAO.findAll();
	}
	
	@Override
	public List<Contact> getAllContactInOrder() {
		return contactDAO.getContactListInOrder();
	}
	
	@Override
	public List<Contact> findContactByRowIDForAccessLand(String id) {
		return contactDAO.getContactByRowID(id);
	}
	
	@Override
	@TriggersRemove(cacheName="userFBNCache", removeAll=true)	 
	public Contact addContact(Contact contact) {
		Contact temp=contactDAO.makePersistent(contact);
		System.out.println("-----added contact----------------------------"+temp.getContactid());
		return temp;
	}

	@Override
	public Contact findContactByID(Integer id) {

		return contactDAO.getContactByContactID(id);
	 
	}
	
	@Override
	//@TriggersRemove(cacheName="userFBNCache", removeAll=true)	    
	public boolean deleteContactById(String id) {

		return contactDAO.deleteContactByName(id);
		
	}
	
	@Override
	public Contact findContactByEmail(String email) {
		return contactDAO.findContactByEmail(email);
		//return null;
	}

	@Override
	public ContactTypeLkp getContactTypeByID(Integer id) {
		return contactTypeDAO.getContactTypeByID(id);
		
	}

	@Override
	public boolean addAccessLandContact(AccessLandContact contact) {
		accessLandContactDAO.makePersistent(contact);
		return true;
	}
	
	@Override
	public AccessLandContact findAccessLandContactByID(Integer contactid) {
		return accessLandContactDAO.getAccessLandContactByContactID(contactid);
	 
	}
	
	@Override
	public AccessLandContact findAccessLandContactByIDAndGID(Integer contactid,Integer gid) {
		return accessLandContactDAO.getAccessLandContactByContactIDAndGID(contactid,gid);
	 
	}

	@Override
	public boolean deleteAccessLandContactById(Integer id) {
		// TODO Auto-generated method stub
		return accessLandContactDAO.deleteAccessLandContactByID(id);
	}

	@Override
	public boolean deleteAccessLandContactByCIdAndGID(Integer contactid,
			Integer gid) {
		return accessLandContactDAO.deleteAccessLandContactByIDAndGID(contactid,gid);
	}

	@Override
	public PathContact findPathContactByIDAndGID(Integer contactid, Integer gid) {
		return pathContactDAO.getPathContactByContactIDAndGID(contactid,gid);
	}

	@Override
	public boolean addPathContact(PathContact contact) {
		pathContactDAO.makePersistent(contact);
		return true;
	}
	
	@Override
	public boolean deletePathContactByCIdAndGID(Integer contactid,
			Integer gid) {
		return pathContactDAO.deletePathContactByIDAndGID(contactid,gid);
	}
	//Furniture
	@Override
	public boolean addFurnitureContact(FurnitureContact contact) {
		furnitureContactDAO.makePersistent(contact);
		return true;
	}
	@Override
	public boolean addJobContact(JobContact contact) {
		jobContactDAO.makePersistent(contact);
		return true;
	}
	@Override
	public boolean addSurfaceContact(SurfaceContact contact) {
		surfaceContactDAO.makePersistent(contact);
		return true;
	}
	@Override
	public FurnitureContact findFurnitureContactByIDAndGID(Integer contactid,Integer gid) {
		return furnitureContactDAO.getFurnitureContactByContactIDAndGID(contactid,gid);
	 
	}
	@Override
	public boolean deleteFurnitureContactByIdAndGID(Integer contactid,
			Integer gid) {
		return furnitureContactDAO.deleteFurnitureContactByIDAndGID(contactid,gid);
	}
	
	@Override
	public boolean deleteJobContactByIdAndjobid(Integer contactid,
			Integer jobid) {
		return jobContactDAO.deleteJobContactByIDAndjobid(contactid,jobid);
	}

	@Override
	public SurfaceContact findSurfaceContactByIDAndGID(Integer contactid,Integer gid) {
		return surfaceContactDAO.getSurfaceContactByContactIDAndGID(contactid,gid);
	 
	}
	@Override
	public JobContact findJobContactByIDAndjobid(Integer contactid,Integer jobid) {
		return jobContactDAO.getJobContactByContactIDAndjobid(contactid,jobid);
	 
	}
	@Override
	public boolean deleteSurfaceContactByIdAndGID(Integer contactid,
			Integer gid) {
		return surfaceContactDAO.deleteSurfaceContactByIDAndGID(contactid,gid);
	}
	
	@Override
	public boolean addIssueContact(IssueContact contact) {
		issueContactDAO.makePersistent(contact);
		return true;
	}

	@Override
	public boolean deleteIssueContactByIdAndGID(Integer contactid, Integer gid) {
		// TODO Auto-generated method stub
		return issueContactDAO.deleteIssueContactByIDAndGID(contactid, gid);
	}

	@Override
	public IssueContact findIssueContactByIDAndGID(Integer contactid,
			Integer gid) {
		return issueContactDAO.getIssueContactByContactIDAndGID(contactid,gid);
		
	}
	
	@Override
	public List<String> findContactCompanyByType(int typeid){
		return contactDAO.getContactCompaniesByType(typeid);
	}
	
	@Override
	public List<Contact> getContactByCompany(String company, int typeid){
		return contactDAO.findContactByCompany(company, typeid);
	}
	
	@Override
	public boolean blockContact(int contactId){
		return contactDAO.blockContactById(contactId);
	}
}
