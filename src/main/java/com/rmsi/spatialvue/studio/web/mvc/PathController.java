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

import java.util.List;

import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.domain.ClassLkp;
import com.rmsi.spatialvue.studio.domain.Community_Council;
import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.IssueAction;
import com.rmsi.spatialvue.studio.domain.Legal;
import com.rmsi.spatialvue.studio.domain.PathConditionLkp;
import com.rmsi.spatialvue.studio.domain.PathLegalstatusLkp;
import com.rmsi.spatialvue.studio.domain.PathTypeLkp;
import com.rmsi.spatialvue.studio.domain.ResponsibleDepartmentLkp;
import com.rmsi.spatialvue.studio.domain.RoW_Path;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.domain.Warden_Area;
import com.rmsi.spatialvue.studio.service.IssueService;
import com.rmsi.spatialvue.studio.service.LegalService;
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
public class PathController {
	
	@Autowired
	PathService pathService;
	
	@Autowired
	IssueService issueService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	RoleFactory roleFactory;
	
	@Autowired
	LegalService legalService;
	
	@RequestMapping(value = "/studio/rowpath/{gid}", method = RequestMethod.GET)
	@ResponseBody
    public RoW_Path getRow_PathPathByGID(@PathVariable String gid){
		
		RoW_Path path=pathService.getPathByGid((Integer.parseInt(gid)));
		return 	path;	
	}
	
	@RequestMapping(value = "/studio/path/type", method = RequestMethod.GET)
	@ResponseBody
    public List<PathTypeLkp>  listPathTypeLkp(){
		return 	pathService.findPathTypeLkpDAO();
	}
	
	@RequestMapping(value = "/studio/path/community", method = RequestMethod.GET)
	@ResponseBody
    public List<Community_Council>  listCommunity_Council(){
		return 	pathService.findCommunity_Council();
	}

	
	@RequestMapping(value = "/studio/path/classLkp", method = RequestMethod.GET)
	@ResponseBody
    public List<ClassLkp> listClassLkp(){
		return pathService.findAllClassLkp();
	}
	
	@RequestMapping(value = "/studio/path/warden_area", method = RequestMethod.GET)
	@ResponseBody
    public List<Warden_Area> listWarden_Area(){
		return 	pathService.findAllWarden_Area();
	}
    
    @RequestMapping(value = "/studio/path/dept", method = RequestMethod.GET)
	@ResponseBody
    public List<ResponsibleDepartmentLkp>  listResponsibleDepartmentLkp(){
		return 	pathService.findPathResponsibleDepartmentLkp();
	}
    
    @RequestMapping(value = "/studio/path/condition", method = RequestMethod.GET)
	@ResponseBody
    public List<PathConditionLkp>  listPathConditionLkp(){
		return 	pathService.findPathConditionLkp();
	}
	
    @RequestMapping(value = "/studio/path/legalstatus", method = RequestMethod.GET)
	@ResponseBody
    public List<PathLegalstatusLkp>  listPathLegalstatusLkp(){
		return 	pathService.findPathLegalstatusLkp();
	}
	
        
    //for history
    @RequestMapping(value = "/studio/rowpath/{rowid}/prev/{gid}", method = RequestMethod.GET)
	@ResponseBody
    public RoW_Path getPreviousRoW_Path(@PathVariable String rowid,@PathVariable String gid){		
    	RoW_Path rowpath=pathService.getPreviousPath((Integer.parseInt(gid)),rowid);
		return rowpath;	
	}
	
	@RequestMapping(value = "/studio/rowpath/{rowid}/next/{gid}", method = RequestMethod.GET)
	@ResponseBody
    public RoW_Path getNextRoW_Path(@PathVariable String rowid,@PathVariable String gid){		
		RoW_Path rowpath=pathService.getNextPath((Integer.parseInt(gid)),rowid);
		return rowpath;	
	}
	
	@RequestMapping(value = "/studio/rowpath/updatehistory/{gid}", method = RequestMethod.GET)
	@ResponseBody
    public boolean updateRowPathHistoryById(@PathVariable String gid){		
		return pathService.updateRowPathHistoryById(Integer.parseInt(gid));	
	}
	
	@RequestMapping(value = "/studio/path/issuelist/{rowid}/{status}", method = RequestMethod.GET)
	@ResponseBody
    public List<Issue> getIssueOfPathByRowid(@PathVariable String rowid,@PathVariable String status){
		List<Issue> issue=issueService.findIssueofPathByRowid(status,rowid);
		return 	issue;	
	}
	
	//Added By PBJ
	@RequestMapping(value = "/studio/rowpath/survey/{uid}/{status}", method = RequestMethod.GET)
	@ResponseBody
    public List<RoW_Path> getRow_PathPathByUserIDAndStatus(@PathVariable String uid, @PathVariable String status){
    	int promptDays = Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.surveytask.prompt"));
    	User objUser = userService.findUserByUserId(Integer.parseInt(uid));
    	List<RoW_Path> issue = null;
    	int loggedInUserRole = objUser.getFunctionalRole();
    	IRole rObj=roleFactory.CreateRoleObject(loggedInUserRole);
		if(status==null || status.equalsIgnoreCase("pending")){
			issue = rObj.getPathByUidAndStatus(objUser.getEmail(), loggedInUserRole,promptDays);
				
		}else if (status.equalsIgnoreCase("backlog")){
			issue = rObj.getBacklogSurveyTasks(objUser.getEmail(), loggedInUserRole,promptDays);
		}else{
			issue = rObj.getAllSurveyTasks();
			return issue;
		}
    	
    	/*List<RoW_Path> list_RoW_Path=pathService.getPathByUidAndStatus((Integer.parseInt(uid)),status,loggedInUserRole);
    	return list_RoW_Path;*/
		return issue;
    	
	}
    
    @RequestMapping(value = "/studio/rowpath/openissue/{rowid}/{status}", method = RequestMethod.GET)
	@ResponseBody
    public List<Issue> getOpenIssueOnPathByRowid(@PathVariable String rowid, @PathVariable String status){
		List<Issue> issue=issueService.findOpenIssueOnPathByRowid(rowid,status);
		return 	issue;	
	}
    
    
    @RequestMapping(value = "/studio/rowpath/legal/{rowid}", method = RequestMethod.GET)
	@ResponseBody
    public List<Legal> getLegalOnPathByRowid(@PathVariable String rowid){
		List<Legal> legal=legalService.getLegalByRowID(rowid);
		return 	legal;	
	}
    
    @RequestMapping(value = "/studio/rowpath/updatecondition/{issueid}", method = RequestMethod.GET)
	@ResponseBody
    public boolean updatePathConditionByIssueid(@PathVariable String issueid){
    	
    	Issue objIssue=issueService.getIssueByGid(Integer.parseInt(issueid));
    	String rowid=objIssue.getRowId();
    	List<Issue> issueList=issueService.findOpenIssueOnPathByRowid(rowid,"Open");
    	int issuecount=0;
    	int pathcondition=1;
    	if(issueList!=null){
    		issuecount=issueList.size();
       	}
    	Issue issue=issueService.getOpenIssueOnPathByUrgency(rowid);
    	if(issue!=null){
    		if(issue.getIssueUrgencyLkp().getUrgencyid()==3){
    			pathcondition=4;
        	}else if(issue.getIssueUrgencyLkp().getUrgencyid()==2){
        		pathcondition=3;
        	}else if(issue.getIssueUrgencyLkp().getUrgencyid()==1){
        		pathcondition=2;
        	}
    	}else{
    		pathcondition=1;
    	}
    	
    	return pathService.updateRowPathOpenIssueByRowID(rowid,issuecount,pathcondition);
	}
    
    
    @RequestMapping(value = "/studio/path/unresolvedissue/condition/{rowid}", method = RequestMethod.GET)
	@ResponseBody
    public String getPathConditionAndIssueCountByRowid(@PathVariable String rowid){
    	String issueCountAndCondition=null;
    	List<Issue> issueList=issueService.findOpenIssueOnPathByRowid(rowid,"Open");
    	int issuecount=0;
    	int pathcondition=1;
    	if(issueList!=null){
    		issuecount=issueList.size();
       	}
    	if(issuecount>0){
    		Issue issue=issueService.getOpenIssueOnPathByUrgency(rowid);
        	if(issue!=null){
        		if(issue.getIssueUrgencyLkp().getUrgencyid()==3){
        			pathcondition=4;
            	}else if(issue.getIssueUrgencyLkp().getUrgencyid()==2){
            		pathcondition=3;
            	}else if(issue.getIssueUrgencyLkp().getUrgencyid()==1){
            		pathcondition=2;
            	}
        	}else{
        		pathcondition=1;
        	}
    	}
    	else{
    		pathcondition=1;
    	}
    	issueCountAndCondition=issuecount+","+pathcondition;
    	//returning open issue count and pathConditionlkp id
    	return issueCountAndCondition;
	}
    
    @RequestMapping(value = "/studio/rowpath/issueactions/{rowid}/{status}", method = RequestMethod.GET)
	@ResponseBody
    public List<IssueAction> getActionsForPathIssues(@PathVariable String rowid, @PathVariable String status){
		List<IssueAction> action = issueService.getActionForPathIssues(status, rowid);
		return action;	
	}
    
    @RequestMapping(value = "/studio/rowpath/pathtype/{type}", method = RequestMethod.GET)
	@ResponseBody
    public int searchPathTypeId(@PathVariable String type){
    	return pathService.getPathTypeId(type);
    }
}


