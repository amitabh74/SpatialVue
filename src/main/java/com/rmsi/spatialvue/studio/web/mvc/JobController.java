/* ----------------------------------------------------------------------
 * Copyright (c) 2011 by RMSI.
 * All Rights Reserved
 *
 * Permission to use this program and its related files is at the
 * discretion of RMSI Pvt Ltd.
 *
 * The licensee of RMSI Software agrees that:
 *    - Redistribution in whole or in part is not permitted.
 *    - Modification of source is not permitted.
 *    - Use of the source in whole or in part outside of RMSI is not
 *      permitted.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL RMSI OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * ----------------------------------------------------------------------
 */

package com.rmsi.spatialvue.studio.web.mvc;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import org.eclipse.core.internal.filesystem.local.Convert;
import org.hibernate.transaction.JOnASTransactionManagerLookup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.domain.Baselayer;
import com.rmsi.spatialvue.studio.domain.Contact;
import com.rmsi.spatialvue.studio.domain.Furniture;
import com.rmsi.spatialvue.studio.domain.FurnitureConditionLkp;
import com.rmsi.spatialvue.studio.domain.FurnitureTypeLkp;
import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.Job;
import com.rmsi.spatialvue.studio.domain.JobContact;
import com.rmsi.spatialvue.studio.domain.JobFeatureLkp;
import com.rmsi.spatialvue.studio.domain.JobTypeLkp;
import com.rmsi.spatialvue.studio.domain.JobUser;
import com.rmsi.spatialvue.studio.domain.Layergroup;
import com.rmsi.spatialvue.studio.domain.LegalTypeLkp;
import com.rmsi.spatialvue.studio.domain.Project;
import com.rmsi.spatialvue.studio.domain.ProjectBaselayer;
import com.rmsi.spatialvue.studio.domain.ProjectLayergroup;
import com.rmsi.spatialvue.studio.domain.RoW_Path;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.domain.UserProject;
import com.rmsi.spatialvue.studio.service.FurnitureService;
import com.rmsi.spatialvue.studio.service.IssueService;
import com.rmsi.spatialvue.studio.service.JobService;
import com.rmsi.spatialvue.studio.service.PathService;
import com.rmsi.spatialvue.studio.service.SurfaceService;
import com.rmsi.spatialvue.studio.service.UserService;
import com.rmsi.spatialvue.studio.service.impl.IRole;
import com.rmsi.spatialvue.studio.service.impl.RoleFactory;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;

/**
 * @author Alok.Sen
 *
 */
@Controller
public class JobController {
	
	@Autowired
	JobService jobService;
	
	@Autowired
	PathService pathService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	IssueService issueService;
	
	@Autowired
	RoleFactory roleFactory;
	
	@Autowired
	FurnitureService furnitureService;
	
	@Autowired
	SurfaceService surfaceService;
	
	@RequestMapping(value = "/studio/job/{jobid}", method = RequestMethod.GET)
	@ResponseBody
    public Job getJobByJobID(@PathVariable String jobid){		
		Job job=jobService.getJobByJobID(Integer.parseInt(jobid));
		return 	job;	
	}
	
	@RequestMapping(value = "/studio/job/issue/{issue_gid}", method = RequestMethod.GET)
	@ResponseBody
    public Job getJobByIssue_gid(@PathVariable String issue_gid){		
		Job job=jobService.getJobByIssue_gid(Integer.parseInt(issue_gid));
		return 	job;	
	}
	
	@RequestMapping(value = "/studio/job/type", method = RequestMethod.GET)
	@ResponseBody
    public List<JobTypeLkp> listJobType(){
		return 	jobService.findAllJobType();
	}
	
	@RequestMapping(value = "/studio/job/feature", method = RequestMethod.GET)
	@ResponseBody
    public List<JobFeatureLkp> listFeatureType(){
		return 	jobService.findAllFeatureType();
	}
	
	@RequestMapping(value = "/studio/job/issuelist/{jobid}", method = RequestMethod.GET)
	@ResponseBody
    public List<Issue> getIssueOfJobByjobid(@PathVariable String jobid){
		//List<Issue> issue=issueService.findIssueofFurnitureByFurnitureid(Integer.parseInt(status),furnitureid);
		List<Issue> issue=issueService.findIssueofJobByjobid(jobid);
		return 	issue;	
	}
	
	
	@RequestMapping(value = "/studio/job/create", method = RequestMethod.POST)
	@ResponseBody
	public Integer createJob(HttpServletRequest request,
			HttpServletResponse response) {
		Integer intIssueGID;
		Integer newJobId=0;
		Job job;
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		try {
			intIssueGID = Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "hid-issueid"));
			//intIssueGID = Integer.parseInt(issue_id);
			
			job =jobService.getJobByIssue_gid(intIssueGID); 
			/*if (job.getIssueGid() == null)
			{
				job.setRiskAssesmentCompletion(false);
				job.setRiskAssesmentReq(false);
			}*/
			Integer intJobID = job.getJobid();
			if(intJobID > 0){
				//job already exists
			//	return;
				
			}
			job.setIssueGid(Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "hid-issueid")));
			
			Integer numUnits =null;
			try{
				numUnits = Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "jobNoUnits"));
				job.setNumUnits(numUnits);
			}catch(NumberFormatException e){
				job.setNumUnits(0);
				e.printStackTrace();
			}
			
			try{
				BigDecimal bdSNPAHrs = new BigDecimal(ServletRequestUtils.getRequiredStringParameter(request, "jobSNPAHours"));
				job.setSnpaHrs(bdSNPAHrs);
			}
			catch(NumberFormatException e){
				job.setSnpaHrs(new BigDecimal(0));
				e.printStackTrace();
			}
			
			try{
				BigDecimal bdJobMaterialCost = new BigDecimal(ServletRequestUtils.getRequiredStringParameter(request, "jobMaterialsCost"));
				job.setMaterialCost(bdJobMaterialCost);
			}
			catch(NumberFormatException e){
				job.setMaterialCost(new BigDecimal(0));
				e.printStackTrace();
			}
			
			try{
				BigDecimal bdJobContractCost = new BigDecimal(ServletRequestUtils.getRequiredStringParameter(request, "jobContractorCost"));
				job.setContractorCost(bdJobContractCost);
			}
			catch(NumberFormatException e){
				job.setContractorCost(new BigDecimal(0));
				e.printStackTrace();
			}
			
			try{
				BigDecimal bdJobTotalCost = new BigDecimal(ServletRequestUtils.getRequiredStringParameter(request, "hidJobTotalCost"));
				System.out.println("Total Cost ----- " + bdJobTotalCost);
				job.setTotalCost(bdJobTotalCost);
			}
			catch(NumberFormatException e){
				job.setTotalCost(new BigDecimal(0));
				e.printStackTrace();
			}
			Date dateJobTarget = null;
			try {
				dateJobTarget = dateFormat.parse(ServletRequestUtils.getRequiredStringParameter(request, "jobTargetDate"));
				//System.out.println("Job target Date --- " + dateJobTarget);
				job.setTargetDate(dateJobTarget);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			if (ServletRequestUtils.getRequiredStringParameter(request, "jobCompletedDate") != ""){
				Date dateJobCompleted = null;
				try {
					dateJobCompleted = dateFormat.parse(ServletRequestUtils.getRequiredStringParameter(request, "jobCompletedDate"));
					//System.out.println("Job completed Date --- " + dateJobCompleted);
					job.setJobCompleted(dateJobCompleted);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
			}
			
			//if(ServletRequestUtils.getRequiredStringParameter(request, "riskAssRequired") == "y"){
			//	job.setRiskAssesmentReq(true);
			//}
			//else{
			//	job.setRiskAssesmentReq(false);
			//}
			
			job.setNotes(ServletRequestUtils.getRequiredStringParameter(request, "workNotes"));
			
			job.setJobTypeLkp((JobTypeLkp)jobService.getJobLKPDetail("JobTypeLkp", "typeid", ServletRequestUtils.getRequiredStringParameter(request, "jobType")));
			
			job.setJobFeatureLkp((JobFeatureLkp)jobService.getJobLKPDetail("JobFeatureLkp", "typeid", ServletRequestUtils.getRequiredStringParameter(request, "jobFeature")));
			
			Job temp=jobService.addJob(job);
			newJobId=temp.getJobid();
			
		} catch (ServletRequestBindingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			newJobId=0;
			
		}
		return newJobId;

	}
	
	
	//Added by PBJ
	
	@RequestMapping(value = "/studio/workcommitment/jobs/{uid}/{filter}", method = RequestMethod.GET)
	@ResponseBody
	public List<Job> getOutsatdingJobs(@PathVariable String uid, @PathVariable String filter){
		int promptDays = Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.surveytask.prompt"));
		User objUser = userService.findUserByUserId(Integer.parseInt(uid));
		int loggedInUserRole = objUser.getFunctionalRole();
		IRole rObj=roleFactory.CreateRoleObject(loggedInUserRole);
		
		if(filter==null || filter.equalsIgnoreCase("pending")){
			List<Job> job = rObj.getPendingJobs(objUser, promptDays);
			return job;
			}else if ( filter.equalsIgnoreCase("backlog")){
				List<Job> job = rObj.getBacklogJobs(objUser,promptDays);
				return job;
			}else{
				List<Job> job = rObj.getAllJobs(objUser,promptDays);
				return job;
			}
			
		
	}
	
	@RequestMapping(value = "/studio/job/checkcompletiondate/{compdate}", method = RequestMethod.GET)
	@ResponseBody
    public String checkCompletionDate(@PathVariable String compdate){
		
		Calendar currentDate = Calendar.getInstance();
		Date dateJobCompletion;
		Date dateNow;
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		try {
			dateJobCompletion =  dateFormat.parse(compdate);
		} catch (ParseException e) {
			return "error";
		}
		
		try {
			dateNow = dateFormat.parse(dateFormat.format(currentDate.getTime()));
		} catch (ParseException e) {
			return "error";
		}
		
		if(dateJobCompletion.equals(dateNow) || dateJobCompletion.before(dateNow)){
			return "valid";
		}
		
		return "error";
	}
	

	@RequestMapping(value = "/studio/job/user/delete/{jobid}", method = RequestMethod.GET)
	@ResponseBody
    public boolean deleteJobUserByID(@PathVariable String jobid){
		Integer jobID = Integer.parseInt(jobid);
		return jobService.deleteJobUserByjobID(jobID);
		
	}
	
	@RequestMapping(value = "/studio/job/adduser", method = RequestMethod.POST)
	@ResponseBody
    public boolean addJobUser(HttpServletRequest request,HttpServletResponse response){
		
		try {
			int jobID=Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "jobid"));
			String email = ServletRequestUtils.getRequiredStringParameter(request, "useremail");
			if(!email.equalsIgnoreCase(""))
			{
				String[] userEmail;
				JobUser jouser=new JobUser();
				Job job= jobService.getJobByJobID(jobID);
				userEmail = email.split(",");
				for(int i =0; i < userEmail.length ; i++){
					jouser.setJob(job);
					jouser.setUser_email(userEmail[i]);
					jobService.addJobUser(jouser);
				}	
			}
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	@RequestMapping(value = "/studio/workcommitment/closedjob/{userid}/{days}", method = RequestMethod.GET)
	@ResponseBody
    public List<Job> getClosedUserByUserID(@PathVariable String userid,@PathVariable String days){
		
		List<Job> job=null;
		try {
			int uid = Integer.parseInt(userid);
			int noOfDays = Integer.parseInt(days);
			//job= jobService.getClosedJobByUserAndDays(id,noOfDays);
			
			//
			User objUser = userService.findUserByUserId(uid);
			int loggedInUserRole = objUser.getFunctionalRole();
			IRole rObj=roleFactory.CreateRoleObject(loggedInUserRole);
			job= rObj.getClosedJobByTime(objUser,noOfDays);
			
			//job= jobService.getClosedJobByUser(Integer.parseInt(id),jobStartDate,jobEndDate);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			job=null;
		}
		return job;
	}
	
	@RequestMapping(value = "/studio/job/updateUnresolvedStatus/{jobid}/{issuestatus}", method = RequestMethod.GET)
	@ResponseBody
	public boolean updateUnresolvedStatus(@PathVariable String jobid,@PathVariable String issuestatus) {
		
		Job job;
		Issue issue;
		try {
			System.out.println("JobId: " + jobid);
			System.out.println("IssueStatus: " + issuestatus);
			job =jobService.getJobByJobID(Integer.parseInt(jobid));
			issue = issueService.getIssueByGid(job.getIssueGid());
			String furnitureid = issue.getFurnitureid();
			
			System.out.println("FurnitureId: " + furnitureid);
			boolean issueExists = false;
			if (furnitureid != null && !furnitureid.isEmpty())
			{
				System.out.println("Into Case-1");
			    //List<Issue> issueList =issueService.findIssueofFurnitureByFurnitureid(issuestatus,furnitureid);
				List<Issue> issueList =issueService.findIssueByFurnitureid(issuestatus,furnitureid);
				if(issueList == null)
				{
					System.out.println("Issuelist is null");
				}else{
				    for(int issueCount =0; issueCount < issueList.size(); issueCount++)
				    {
				    	System.out.println("Issue Id: " +issueList.get(issueCount).getGid() + "  FurnitureId: " + issueList.get(issueCount).getFurnitureid() + " " + issueList.get(issueCount).getActionStatusLkp().getActionStatus());
				    	if(issueList.get(issueCount).getActionStatusLkp().getActionStatus().equalsIgnoreCase("closed") ||
				    			issueList.get(issueCount).getActionStatusLkp().getActionStatus().equalsIgnoreCase("completed")){
	
				    		issueExists = false;
				    		
				    	}else{
				    		issueExists = true;
				    		break;
				    	}
				    	/*if (issueList.get(issueCount).getFurnitureid().equalsIgnoreCase(furnitureid))
				    	{
				    		System.out.println("Issue exists for furnitureId: " + furnitureid);
				    		issueExists = true;
				    	}*/
				    }
				}
			    
			    //if(issueExists){
			    	//setting the furniture unresolved issue to true if any issue exists against the furniture
			    	System.out.println("Updating unresolved status of furnitureid: " + issueExists);
			    	boolean result = furnitureService.updateFurnitureUnresolved(furnitureid, issueExists);
			    	return result;
			    //}
			}
		    
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return false;
	}
	@RequestMapping(value = "/studio/job/updSurfaceUnresolvedStatus/{jobid}/{issuestatus}", method = RequestMethod.GET)
	@ResponseBody
	public boolean updSurfaceUnresolvedStatus(@PathVariable String jobid,@PathVariable String issuestatus) {
		
		Job job;
		Issue issue;
		try {
			job =jobService.getJobByJobID(Integer.parseInt(jobid));
			issue = issueService.getIssueByGid(job.getIssueGid());
			String surfaceid = issue.getSurfaceid();
			System.out.println("SurfaceId: " + surfaceid + "   " + issue.getGid());
			boolean issueExists = false;
			if (!surfaceid.isEmpty())
				
			{
			    List<Issue> issueList =issueService.getIssueBySurfaceid(surfaceid,issuestatus);
				if(issueList == null)
				{
					return false;
				}
			    for(int issueCount =0; issueCount < issueList.size(); issueCount++)
			    {
			    	/*if (issueList.get(issueCount).getIshistory() == false)
			    	{
			    		issueExists = true;
			    	}*/
			    	System.out.println("Issue Id: " +issueList.get(issueCount).getGid() + "  SurfaceId: " + issueList.get(issueCount).getSurfaceid() + " " + issueList.get(issueCount).getActionStatusLkp().getActionStatus());
			    	if(issueList.get(issueCount).getActionStatusLkp().getActionStatus().equalsIgnoreCase("closed") ||
			    			issueList.get(issueCount).getActionStatusLkp().getActionStatus().equalsIgnoreCase("completed")){

			    		issueExists = false;
			    		
			    	}else{
			    		issueExists = true;
			    		break;
			    	}
			    }
			    
			   // if(issueExists){
			    	//setting the furniture unresolved issue to true if any issue exists against the furniture
			    	System.out.println("Updating unresolved status of surfaceid: " + issueExists);
			    	boolean result = surfaceService.updateSurfaceUnresolved(surfaceid, issueExists);
			    	return result;
			    //}
			}
		    
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return false;
	}
}


