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

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.domain.ActionStatusLkp;
import com.rmsi.spatialvue.studio.domain.Complaint;
import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.IssueAction;
import com.rmsi.spatialvue.studio.domain.IssueReasonLkp;
import com.rmsi.spatialvue.studio.domain.IssueTypeLkp;
import com.rmsi.spatialvue.studio.domain.IssueUrgencyLkp;
import com.rmsi.spatialvue.studio.domain.ResponsibleDepartmentLkp;
import com.rmsi.spatialvue.studio.domain.RoW_Path;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.service.ComplaintService;
import com.rmsi.spatialvue.studio.service.IssueService;
import com.rmsi.spatialvue.studio.service.PathService;
import com.rmsi.spatialvue.studio.service.UserService;
import com.rmsi.spatialvue.studio.service.impl.IRole;
import com.rmsi.spatialvue.studio.service.impl.RoleFactory;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;

/**
 * @author Aparesh.Chakraborty
 *
 */
@Controller
public class IssueController {

	@Autowired
	IssueService issueService;
	
	@Autowired
	PathService pathService;
	
	@Autowired
	UserService userService;
	//@Autowired
	//IRole rObj;
	@Autowired
	RoleFactory roleFactory;
	@Autowired
	ComplaintService complaintService;
	
		@RequestMapping(value = "/studio/issue/{gid}", method = RequestMethod.GET)
		@ResponseBody
	    public Issue getIssueByGid(@PathVariable String gid){		
			Issue issue=issueService.getIssueByGid((Integer.parseInt(gid)));
			return 	issue;	
		}
		
		

		@RequestMapping(value = "/studio/issue/type/lang/{lang}", method = RequestMethod.GET)
		@ResponseBody
	    public List<IssueTypeLkp> getIssueType(@PathVariable String lang){		
			List<IssueTypeLkp> issuetypes=issueService.findAllIssueTypeLkp(lang);
			return 	issuetypes;	
		}
		
		@RequestMapping(value = "/studio/issue/type/{id}", method = RequestMethod.GET)
		@ResponseBody
	    public IssueTypeLkp getIssueTypeById(@PathVariable String id){		
			IssueTypeLkp issuetype=issueService.getIssueTypeById(Integer.parseInt(id));
			return 	issuetype;	
		}
		
		
		@RequestMapping(value = "/studio/issue/status", method = RequestMethod.GET)
		@ResponseBody
	    public List<ActionStatusLkp> findAllActionStatusLkp(){		
			List<ActionStatusLkp> actionStatusLkp=issueService.findAllActionStatusLkp();
			return 	actionStatusLkp;	
		}
		
		@RequestMapping(value = "/studio/issue/status/{id}", method = RequestMethod.GET)
		@ResponseBody
	    public ActionStatusLkp getActionStatusLkpById(@PathVariable String id){		
			ActionStatusLkp actionStatusLkp=issueService.getActionStatusLkpById(Integer.parseInt(id));
			return 	actionStatusLkp;	
		}
		
		@RequestMapping(value = "/studio/issue/urgency", method = RequestMethod.GET)
		@ResponseBody
	    public List<IssueUrgencyLkp> getAllIssueUrgency(){		
			List<IssueUrgencyLkp> issueUrgencyLkp=issueService.getAllIssueUrgency();
			return 	issueUrgencyLkp;	
		}
		
		@RequestMapping(value = "/studio/issue/urgency/{id}", method = RequestMethod.GET)
		@ResponseBody
	    public IssueUrgencyLkp getIssueUrgencyById(@PathVariable String id){		
			IssueUrgencyLkp issueUrgencyLkp=issueService.getIssueUrgencyById(Integer.parseInt(id));
			return 	issueUrgencyLkp;	
		}
		
		@RequestMapping(value = "/studio/issue/responsibledept", method = RequestMethod.GET)
		@ResponseBody
	    public List<ResponsibleDepartmentLkp> getAllResponsible(){		
			List<ResponsibleDepartmentLkp> responsibleDepartmentLkp=pathService.findPathResponsibleDepartmentLkp();
			return 	responsibleDepartmentLkp;	
		}
		
		/*
		@RequestMapping(value = "/studio/issue/responsible/{id}", method = RequestMethod.GET)
		@ResponseBody
	    public IssueUrgencyLkp getResponsibleById(@PathVariable String id){		
			IssueUrgencyLkp issueUrgencyLkp=issueService.getIssueUrgencyById(Integer.parseInt(id));
			return 	issueUrgencyLkp;	
		}
		*/
		
		@RequestMapping(value = "/studio/issue/reason", method = RequestMethod.GET)
		@ResponseBody
	    public List<IssueReasonLkp> getAllIssueReason(){		
			List<IssueReasonLkp> issueReasonLkp=issueService.getAllIssueReason();
			return 	issueReasonLkp;	
		}
		
		@RequestMapping(value = "/studio/issue/reason/{id}", method = RequestMethod.GET)
		@ResponseBody
	    public IssueReasonLkp getIssueReasonById(@PathVariable String id){		
			IssueReasonLkp issueReasonLkp=issueService.getIssueReasonById(Integer.parseInt(id));
			return 	issueReasonLkp;	
		}
		
		@RequestMapping(value = "/studio/issue/path/{rowid}", method = RequestMethod.GET)
		@ResponseBody
	    public List<RoW_Path> getRow_PathPathByRowId(@PathVariable String rowid){
			
	    	List<RoW_Path> path=pathService.getIssuePathByRowId(rowid);
			return 	path;	
		}
	    
	    @RequestMapping(value = "/studio/issue/close/{issueid}/{signoffdate}", method = RequestMethod.GET)
		@ResponseBody
	    public boolean CloseIssueByIssueID(@PathVariable String issueid, @PathVariable String signoffdate){
			
	    	try {
	    		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	    		Integer GID = Integer.parseInt(issueid);
	    		Date dateSignOff =  dateFormat.parse(signoffdate);
	    		return issueService.CloseIssueByIssueID(GID, dateSignOff);
				}
			 catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			}
		}
	    
	    @RequestMapping(value = "/studio/issue/historical/{rowid}", method = RequestMethod.GET)
		@ResponseBody
	    public List<Issue> getHistoricalIssueByRowId(@PathVariable String rowid){
			
	    	List<Issue> issue=issueService.getHistoricalIssueByRowId(rowid);
			return 	issue;	
		}
	    
	    //ADDED By PBJ
	    @RequestMapping(value = "/studio/issues/workcommitment/{uid}/{filter}", method = RequestMethod.GET)
		@ResponseBody
	    public List<Issue> getOpenIssuesByUserID(@PathVariable String uid, @PathVariable String filter){
	    	int promptDays = Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.surveytask.prompt"));
			User objUser = userService.findUserByUserId(Integer.parseInt(uid));
			int loggedInUserRole = objUser.getFunctionalRole();
			System.out.println("User role ---- " + loggedInUserRole);
			System.out.println("Email role ---- " + objUser.getEmail());
			IRole rObj=roleFactory.CreateRoleObject(loggedInUserRole);
		
			if(filter==null || filter.equalsIgnoreCase("open")){
				//List<Issue> issue = rObj.getOpenIssuesByUserID(Integer.parseInt(uid), loggedInUserRole,promptDays);
				List<Issue> issue = rObj.getOpenIssuesByUser(objUser,promptDays);
				return issue;	
			}if(filter.equalsIgnoreCase("backlog")){
				System.out.println("---Into Backlog condition----");
				List<Issue> issue = rObj.getBacklogIssues(promptDays, objUser.getEmail(), loggedInUserRole);
				return issue;	
			}else{
				List<Issue> issue = rObj.getAllIssues();
				return issue;
			}
		}
	    
	    @RequestMapping(value = "/studio/complaint/reassign", method = RequestMethod.GET)
		@ResponseBody
		public List<Issue> getAllIssues() {
			List<Issue> issue = issueService.getAllIssues();
			return issue;
		}
	    
	    //added by Saurabh to get complaints against a Issue
	    @RequestMapping(value = "/studio/issuelink/complaint/{issuegid}", method = RequestMethod.GET)
		@ResponseBody
	    public List<Complaint> getComplaintByIssueGID(@PathVariable String issuegid){
			
	    	List<Complaint> listComplaint = complaintService.findComplaintsByIssueID(Integer.parseInt(issuegid), "all");
	    	 return listComplaint;
		}
	    
	    
	    @RequestMapping(value = "/studio/parent/{parentLyr}/{parentId}", method = RequestMethod.GET)
		@ResponseBody
	    public String getParentGid(@PathVariable String parentLyr,@PathVariable String parentId){		
			
	    	System.out.println("####CONTROLLER: "+parentLyr + "-"+parentId );
	    	return issueService.getParentGid(parentLyr, parentId);
			
		}
	    
	    @RequestMapping(value = "/studio/issue/issueactions/{status}", method = RequestMethod.GET)
		@ResponseBody
	    public List<IssueAction> getActionsForWorkCommitmentIssues(@PathVariable String status){
			
	    	List<IssueAction> actions = issueService.getActionForIssues(status);
			return 	actions;	
		}
	    
}


