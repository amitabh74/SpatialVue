package com.rmsi.spatialvue.studio.web.mvc;

import java.util.List;

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

import com.rmsi.spatialvue.studio.domain.AccessLandContact;
import com.rmsi.spatialvue.studio.domain.Access_Land_polygon;
import com.rmsi.spatialvue.studio.domain.Contact;
import com.rmsi.spatialvue.studio.domain.ContactTypeLkp;
import com.rmsi.spatialvue.studio.domain.Furniture;
import com.rmsi.spatialvue.studio.domain.Job;
import com.rmsi.spatialvue.studio.domain.JobContact;
import com.rmsi.spatialvue.studio.domain.Surface;
import com.rmsi.spatialvue.studio.domain.FurnitureContact;
import com.rmsi.spatialvue.studio.domain.SurfaceContact;
import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.IssueContact;
import com.rmsi.spatialvue.studio.domain.PathContact;
import com.rmsi.spatialvue.studio.domain.RoW_Path;
import com.rmsi.spatialvue.studio.service.AccessLandService;
import com.rmsi.spatialvue.studio.service.ContactService;
import com.rmsi.spatialvue.studio.service.FurnitureService;
import com.rmsi.spatialvue.studio.service.JobService;
import com.rmsi.spatialvue.studio.service.SurfaceService;
import com.rmsi.spatialvue.studio.service.IssueService;
import com.rmsi.spatialvue.studio.service.PathService;


/**
 * @author Saurabh.Mehta
 *
 */
@Controller
public class ContactController {
	
	@Autowired
	ContactService contactService;
	
	@Autowired
	AccessLandService accessLandService;
	
	@Autowired
	FurnitureService furnitureService;
	
	@Autowired
	SurfaceService surfaceService;
	
	@Autowired
	PathService pathService;
	
	@Autowired
	IssueService issueService;
	
	@Autowired
	JobService jobService;
	
	@RequestMapping(value = "/viewer/contact/type", method = RequestMethod.GET)
	@ResponseBody
    public List<ContactTypeLkp> listContactType(){
		return 	contactService.getContactTypeByOrder();
	}

	@RequestMapping(value = "/viewer/listcontact", method = RequestMethod.GET)
	@ResponseBody
    public List<Contact> listAllContact(){
		return 	contactService.getAllContactInOrder();
	}

	@RequestMapping(value = "/viewer/listcontact/{company}/{typeid}", method = RequestMethod.GET)
	@ResponseBody
    public List<Contact> listContactByCompany(@PathVariable String company, @PathVariable String typeid){
		return 	contactService.getContactByCompany(company, Integer.parseInt(typeid));
	}
	
	@RequestMapping(value = "/viewer/contact/{id}", method = RequestMethod.GET)
	@ResponseBody
    public Contact getContactbyID(@PathVariable String id){
		return 	contactService.findContactByID(Integer.parseInt(id));
	}
	
	@RequestMapping(value = "/viewer/contact/company/{typeid}", method = RequestMethod.GET)
	@ResponseBody
    public List<String> getContactCompanyByType(@PathVariable String typeid){
		System.out.println("--- Inside getContactCompanyByType ----");
		return 	contactService.findContactCompanyByType(Integer.parseInt(typeid));
	}
	
	@RequestMapping(value = "/viewer/contact/accessland/{gid}", method = RequestMethod.GET)
	@ResponseBody
    public List<Contact> listContactbyRowID(@PathVariable String rowid){
		return 	contactService.findContactByRowIDForAccessLand(rowid);
	}
		
	
	@RequestMapping(value = "/viewer/contact/delete/{id}", method = RequestMethod.GET)
	@ResponseBody
    public boolean deleteContactById(@PathVariable String id){
		return contactService.deleteContactById(id);	
	}
	
	@RequestMapping(value = "/viewer/contact/create", method = RequestMethod.POST)
	@ResponseBody
    public int createContact(HttpServletRequest request, HttpServletResponse response){
		
		int error=0;
		try {
			System.out.println("-----------------Inside create Contact-----------------------------");		
			
			String email=ServletRequestUtils.getRequiredStringParameter(request, "contactEmail");
			Contact objcontact=contactService.findContactByEmail(email);
			
			if(objcontact==null){
				objcontact=new Contact();
				objcontact.setEmail(email); 
				objcontact.setCompany(ServletRequestUtils.getRequiredStringParameter(request, "contactCompany"));
				
				ContactTypeLkp contactTypeLkp =contactService.getContactTypeByID(Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "contactType")));
				objcontact.setContactTypeLkp(contactTypeLkp);
				
				objcontact.setTitle(ServletRequestUtils.getRequiredStringParameter(request, "contactTitle"));
				
				objcontact.setInitials(ServletRequestUtils.getRequiredStringParameter(request, "contactInitials"));
				
				objcontact.setFirstName(ServletRequestUtils.getRequiredStringParameter(request, "contactFirstName"));
				
				objcontact.setSurname(ServletRequestUtils.getRequiredStringParameter(request, "contactSurname"));
				
				objcontact.setPosition(ServletRequestUtils.getRequiredStringParameter(request, "contactPosition"));
				
				objcontact.setAddress(ServletRequestUtils.getRequiredStringParameter(request, "contactAddress"));
				
				objcontact.setTown(ServletRequestUtils.getRequiredStringParameter(request, "contactTown"));
				
				objcontact.setCounty(ServletRequestUtils.getRequiredStringParameter(request, "contactCounty"));
				
				objcontact.setPostcode(ServletRequestUtils.getRequiredStringParameter(request, "contactPostcode"));
				
				objcontact.set_primary_phone_(ServletRequestUtils.getRequiredStringParameter(request, "contactPrimaryPhone"));
				
				
				String secondnumber=ServletRequestUtils.getRequiredStringParameter(request, "contactSecondaryPhone");
				if(secondnumber!=null && secondnumber!="")
				objcontact.set_secondary_phone_(secondnumber);
				
				objcontact.setMobile(ServletRequestUtils.getRequiredStringParameter(request, "contactMobile")); 
				
				String fax=ServletRequestUtils.getRequiredStringParameter(request, "contactFax");
				if(fax!=null && fax!="")
				objcontact.setFax(fax); 
				objcontact.setActive(new Boolean(true));
							
				System.out.println("-----------------Adding  Contact-----------------------------");		
				System.out.println("contactCompany: "+ objcontact.getCompany());
				System.out.println("contactTitle: "+ objcontact.getTitle());
				System.out.println("----------------------------------------------");
							
				Contact addedcontact=contactService.addContact(objcontact);
				error=1;
				//for layer
				String contactLayer=ServletRequestUtils.getRequiredStringParameter(request, "contactLayer");
				
				if(contactLayer!=null){
					try {
						System.out.println("------------------------contactgid----------------------:"+ServletRequestUtils.getRequiredStringParameter(request, "contactgid"));
						int gid=Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "contactgid"));
						System.out.println("-----------------Contact gid-------::"+gid);
						System.out.println("-----------------contactLayer-------::"+contactLayer);
						
						
						
						if(contactLayer.equalsIgnoreCase("rowpath")){
							addNewPathContact(addedcontact,gid);
						}
						else if(contactLayer.equalsIgnoreCase("accessland")){
							addNewAccessLandContact(addedcontact,gid);
						}
						else if(contactLayer.equalsIgnoreCase("furniture")){
							addNewFurnitureContact(addedcontact,gid);
						}
						else if(contactLayer.equalsIgnoreCase("issue")){
							addNewIssueContact(addedcontact,gid);
						}
						else if(contactLayer.equalsIgnoreCase("surface")){
							addNewSurfaceContact(addedcontact,gid);
						}
						
						
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
						System.out.println("add contact exception"+e.getMessage());
					}
				}
				
			}
			else{
				error=2;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			error=3;
			System.out.println("add exception"+e.getMessage());
		}
		return error;
		
		
		
	}
	
	//edit contact
	@RequestMapping(value = "/viewer/contact/edit", method = RequestMethod.POST)
	@ResponseBody
    public void editContact(HttpServletRequest request, HttpServletResponse response){
		
		try {
			System.out.println("-----------------Inside edit Contact-----------------------------");	
			
			int contactid=Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "contactid"));
			Contact objcontact=contactService.findContactByID(contactid);
			String email=ServletRequestUtils.getRequiredStringParameter(request, "contactEmail");
			//Contact objcontact=contactService.findContactByEmail(email);
			
			if(objcontact!=null){
				objcontact.setEmail(email); 
				objcontact.setCompany(ServletRequestUtils.getRequiredStringParameter(request, "contactCompany"));
				
				ContactTypeLkp contactTypeLkp =contactService.getContactTypeByID(Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "contactType")));
				objcontact.setContactTypeLkp(contactTypeLkp);
				
				objcontact.setTitle(ServletRequestUtils.getRequiredStringParameter(request, "contactTitle"));
				
				objcontact.setInitials(ServletRequestUtils.getRequiredStringParameter(request, "contactInitials"));
				
				objcontact.setFirstName(ServletRequestUtils.getRequiredStringParameter(request, "contactFirstName"));
				
				objcontact.setSurname(ServletRequestUtils.getRequiredStringParameter(request, "contactSurname"));
				
				objcontact.setPosition(ServletRequestUtils.getRequiredStringParameter(request, "contactPosition"));
				
				objcontact.setAddress(ServletRequestUtils.getRequiredStringParameter(request, "contactAddress"));
				
				objcontact.setTown(ServletRequestUtils.getRequiredStringParameter(request, "contactTown"));
				
				objcontact.setCounty(ServletRequestUtils.getRequiredStringParameter(request, "contactCounty"));
				
				objcontact.setPostcode(ServletRequestUtils.getRequiredStringParameter(request, "contactPostcode"));
				
				objcontact.set_primary_phone_(ServletRequestUtils.getRequiredStringParameter(request, "contactPrimaryPhone"));
				
				String secondnumber=ServletRequestUtils.getRequiredStringParameter(request, "contactSecondaryPhone");
				if(secondnumber!=null && secondnumber!="")
				objcontact.set_secondary_phone_(secondnumber);
				
				objcontact.setMobile(ServletRequestUtils.getRequiredStringParameter(request, "contactMobile")); 
				
				String fax=ServletRequestUtils.getRequiredStringParameter(request, "contactFax");
				if(fax!=null && fax!="")
				objcontact.setFax(fax); 
				
				System.out.println("-----------------Adding  Contact-----------------------------");		
				System.out.println("contactCompany: "+ objcontact.getCompany());
				System.out.println("contactTitle: "+ objcontact.getTitle());
				System.out.println("----------------------------------------------");
				contactService.addContact(objcontact);
		}else{
			
		}
		} catch (ServletRequestBindingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	}
	
	@RequestMapping(value = "/viewer/acessland/addcontact", method = RequestMethod.POST)
	@ResponseBody
    public int addAccessLandContact(HttpServletRequest request, HttpServletResponse response){
		
		int result=1;
		try {
			System.out.println("-----------------Inside create Access Land Contact-----------------------------");		
			
			int gid=Integer.parseInt(request.getParameter("gid"));
			int contactid=Integer.parseInt(request.getParameter("contactid"));
			
			System.out.println("-----------------Contact gid-------::"+gid);
			System.out.println("-----------------contactid-------::"+contactid);
			AccessLandContact alcontact=contactService.findAccessLandContactByIDAndGID(contactid,gid);
			if(alcontact==null){
				alcontact=new AccessLandContact();
				Contact objcontact =contactService.findContactByID(contactid);
				Access_Land_polygon accessLand=accessLandService.getAccessLandByGid(gid);
				alcontact.setContact(objcontact);
				alcontact.setAccessLandPolygon(accessLand);
				contactService.addAccessLandContact(alcontact);
				result=1;
			}else{
				result=2;
				System.out.println("-----------------Contact already exists-----------------------------");
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result=3;
		}
		return result;
	}
	
	
	@RequestMapping(value = "/viewer/issue/addcontact", method = RequestMethod.POST)
	@ResponseBody
    public int addIssueContact(HttpServletRequest request, HttpServletResponse response){
		
		int result=1;
		try {
			System.out.println("-----------------Inside create Access Land Contact-----------------------------");		
			
			int gid=Integer.parseInt(request.getParameter("gid"));
			int contactid=Integer.parseInt(request.getParameter("contactid"));
			
			System.out.println("-----------------Contact gid-------::"+gid);
			System.out.println("-----------------contactid-------::"+contactid);
			IssueContact issuecontact=contactService.findIssueContactByIDAndGID(contactid,gid);
			if(issuecontact==null){
				issuecontact=new IssueContact();
				Contact objcontact =contactService.findContactByID(contactid);
				//Access_Land_polygon accessLand=accessLandService.getAccessLandByGid(gid);
				issuecontact.setContact(objcontact);
				issuecontact.setIssueGid(gid);
				contactService.addIssueContact(issuecontact);
				result=1;
			}else{
				result=2;
				System.out.println("-----------------Contact already exists-----------------------------");
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result=3;
		}
		return result;
	}
	
	
	@RequestMapping(value = "/viewer/furniture/addcontact", method = RequestMethod.POST)
	@ResponseBody
    public int addFurnitureContact(HttpServletRequest request, HttpServletResponse response){
		int result=1;
		try {
			int gid=Integer.parseInt(request.getParameter("gid"));
			int contactid=Integer.parseInt(request.getParameter("contactid"));
			FurnitureContact fucontact=contactService.findFurnitureContactByIDAndGID(contactid,gid);
			if(fucontact==null){
				fucontact=new FurnitureContact();
				Contact objcontact =contactService.findContactByID(contactid);
				Furniture furniture= furnitureService.getFurnitureByGid(gid);
				fucontact.setContact(objcontact);
				fucontact.setFurniture(furniture);
				contactService.addFurnitureContact(fucontact);
				result=1;
			}else{
				 result=2;
				System.out.println("-----------------Contact already exists-----------------------------");
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result=3;
			e.printStackTrace();
		}
		return result;
	}
	
	@RequestMapping(value = "/viewer/surface/addcontact", method = RequestMethod.POST)
	@ResponseBody
    public int addSurfaceContact(HttpServletRequest request, HttpServletResponse response){
		int result=1;
		try {
			int gid=Integer.parseInt(request.getParameter("gid"));
			int contactid=Integer.parseInt(request.getParameter("contactid"));
			SurfaceContact sucontact=contactService.findSurfaceContactByIDAndGID(contactid,gid);
			if(sucontact==null){
				sucontact=new SurfaceContact();
				Contact objcontact =contactService.findContactByID(contactid);
				Surface surface= surfaceService.getSurfaceByGid(gid);
				sucontact.setContact(objcontact);
				sucontact.setSurface(surface);
				contactService.addSurfaceContact(sucontact);
				result=1;
			}else{
				 result=2;
				System.out.println("-----------------Contact already exists-----------------------------");
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result=3;
			e.printStackTrace();
		}
		return result;
	}
	
	@RequestMapping(value = "/viewer/job/addcontact", method = RequestMethod.POST)
	@ResponseBody
    public int addJobContact(HttpServletRequest request, HttpServletResponse response){
		int result=1;
		try {
			int jobid=Integer.parseInt(request.getParameter("jobid"));
			int contactid=Integer.parseInt(request.getParameter("contactid"));
			JobContact jocontact=contactService.findJobContactByIDAndjobid(contactid, jobid);
			if(jocontact==null){
				jocontact=new JobContact();
				Contact objcontact =contactService.findContactByID(contactid);
				Job job= jobService.getJobByJobID(jobid);
				jocontact.setContact(objcontact);
				jocontact.setJob(job);
				contactService.addJobContact(jocontact);
				result=1;
			}else{
				 result=2;
				System.out.println("-----------------Contact already exists-----------------------------");
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result=3;
			e.printStackTrace();
		}
		return result;
	}
	
	
	@RequestMapping(value = "/viewer/furniture/contact/delete", method = RequestMethod.GET)
	@ResponseBody
    public boolean deleteFurnitureContactByContactIDandGID(HttpServletRequest request, HttpServletResponse response){
		int gid=Integer.parseInt(request.getParameter("gid"));
		int contactid=Integer.parseInt(request.getParameter("contactid"));
		return contactService.deleteFurnitureContactByIdAndGID(contactid,gid);	
	}
	
	@RequestMapping(value = "/viewer/job/contact/delete", method = RequestMethod.GET)
	@ResponseBody
    public boolean deleteJobContactByContactIDandjobID(HttpServletRequest request, HttpServletResponse response){
		int jobid=Integer.parseInt(request.getParameter("jobid"));
		int contactid=Integer.parseInt(request.getParameter("contactid"));
		return contactService.deleteJobContactByIdAndjobid(contactid,jobid);	
	}
	
	@RequestMapping(value = "/viewer/surface/contact/delete", method = RequestMethod.GET)
	@ResponseBody
    public boolean deleteSurfaceContactByContactIDandGID(HttpServletRequest request, HttpServletResponse response){
		int gid=Integer.parseInt(request.getParameter("gid"));
		int contactid=Integer.parseInt(request.getParameter("contactid"));
		return contactService.deleteSurfaceContactByIdAndGID(contactid,gid);	
	}
	
	/*@RequestMapping(value = "/viewer/accessland/contact/delete/{id}", method = RequestMethod.GET)
	@ResponseBody
    public boolean deleteAccessLandContactById(@PathVariable String id){
		return contactService.deleteAccessLandContactById(Integer.parseInt(id));	
	}*/
	
	@RequestMapping(value = "/viewer/accessland/contact/delete", method = RequestMethod.GET)
	@ResponseBody
    public boolean deleteAccessLandContactByContactIDandGID(HttpServletRequest request, HttpServletResponse response){
		int gid=Integer.parseInt(request.getParameter("gid"));
		int contactid=Integer.parseInt(request.getParameter("contactid"));
		return contactService.deleteAccessLandContactByCIdAndGID(contactid,gid);	
	}
	
	@RequestMapping(value = "/viewer/path/contact/delete", method = RequestMethod.GET)
	@ResponseBody
    public boolean deletePathContactByContactIDandGID(HttpServletRequest request, HttpServletResponse response){
		int gid=Integer.parseInt(request.getParameter("gid"));
		int contactid=Integer.parseInt(request.getParameter("contactid"));
		return contactService.deletePathContactByCIdAndGID(contactid,gid);	
	}
	
	@RequestMapping(value = "/viewer/issue/contact/delete", method = RequestMethod.GET)
	@ResponseBody
    public boolean deleteIssueContactByContactIDandGID(HttpServletRequest request, HttpServletResponse response){
		int gid=Integer.parseInt(request.getParameter("gid"));
		int contactid=Integer.parseInt(request.getParameter("contactid"));
		return contactService.deleteIssueContactByIdAndGID(contactid,gid);	
	}
	
	
	@RequestMapping(value = "/viewer/path/addcontact", method = RequestMethod.POST)
	@ResponseBody
    public int addPathContact(HttpServletRequest request, HttpServletResponse response){
		int result=1;
		try {
			System.out
					.println("-----------------Inside create Path Contact-----------------------------");

			int gid = Integer.parseInt(request.getParameter("gid"));
			int contactid = Integer.parseInt(request.getParameter("contactid"));

			System.out.println("-----------------Contact gid-------::" + gid);
			System.out.println("-----------------contactid-------::"+ contactid);

			PathContact pathcontact = contactService.findPathContactByIDAndGID(
					contactid, gid);
			if (pathcontact == null) {
				pathcontact = new PathContact();
				Contact objcontact = contactService.findContactByID(contactid);
				RoW_Path rowPath = pathService.getPathByGid(gid);
				pathcontact.setContact(objcontact);
				pathcontact.setRowPath(rowPath);
				contactService.addPathContact(pathcontact);
				result=1;
			} else {
				result=2;
				System.out
						.println("-----------------Contact already exists-----------------------------");
			}

		} catch (Exception e) {

			result=3;
			e.printStackTrace();
		}
		return result;
	}
	
	
	private void addNewAccessLandContact(Contact addedcontact,int gid){
		try {
			AccessLandContact alcontact=new AccessLandContact();
			Access_Land_polygon accessLand=accessLandService.getAccessLandByGid(gid);
			alcontact.setContact(addedcontact);
			alcontact.setAccessLandPolygon(accessLand);
			contactService.addAccessLandContact(alcontact);
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}
	
	private void addNewPathContact(Contact objcontact,int gid){
		try {
			PathContact pathcontact = new PathContact();
			RoW_Path rowPath = pathService.getPathByGid(gid);
			pathcontact.setContact(objcontact);
			pathcontact.setRowPath(rowPath);
			contactService.addPathContact(pathcontact);
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}
	
	private void addNewFurnitureContact(Contact objcontact,int gid){
		try {
			FurnitureContact furniturecontact = new FurnitureContact();
			Furniture furniture = furnitureService.getFurnitureByGid(gid);
			furniturecontact.setContact(objcontact);
			furniturecontact.setFurniture(furniture);
			contactService.addFurnitureContact(furniturecontact);
			//contactService.addPathContact(pathcontact);
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}
	
	private void addNewSurfaceContact(Contact objcontact,int gid){
		try {
			SurfaceContact surfacecontact = new SurfaceContact();
			Surface surface = surfaceService.getSurfaceByGid(gid);
			surfacecontact.setContact(objcontact);
			surfacecontact.setSurface(surface);
			contactService.addSurfaceContact(surfacecontact);
			//contactService.addPathContact(pathcontact);
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}
	private void addNewIssueContact(Contact objcontact,int gid){
		try {
			IssueContact issueContact = new IssueContact();
			Issue issue = issueService.getIssueByGid(gid);
			issueContact.setContact(objcontact);
			issueContact.setIssueGid(issue.getGid());
			contactService.addIssueContact(issueContact);
			
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}
	
	@RequestMapping(value = "/viewer/contact/update/{contactId}", method = RequestMethod.GET)
	@ResponseBody
	public boolean blockContact(@PathVariable String contactId){
		return contactService.blockContact(Integer.parseInt(contactId));
	}
	
}