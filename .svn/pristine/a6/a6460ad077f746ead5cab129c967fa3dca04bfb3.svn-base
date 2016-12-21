
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

package com.rmsi.spatialvue.studio.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.googlecode.ehcache.annotations.Cacheable;
import com.rmsi.spatialvue.studio.dao.AccessLandDAO;
import com.rmsi.spatialvue.studio.dao.AccessLandTypeLkpDAO;
import com.rmsi.spatialvue.studio.dao.ActionStatusLkpDAO;
import com.rmsi.spatialvue.studio.dao.AnnualHolidayCalendarDAO;
import com.rmsi.spatialvue.studio.dao.AttachmentDAO;
import com.rmsi.spatialvue.studio.dao.IssueDAO;
import com.rmsi.spatialvue.studio.dao.IssueReasonLkpDAO;
import com.rmsi.spatialvue.studio.dao.IssueTypeLkpDAO;
import com.rmsi.spatialvue.studio.dao.IssueUrgencyLkpDAO;
//import com.rmsi.spatialvue.studio.dao.IssueDAO;
import com.rmsi.spatialvue.studio.domain.AccessLandTypeLkp;
import com.rmsi.spatialvue.studio.domain.Access_Land_polygon;
import com.rmsi.spatialvue.studio.domain.ActionStatusLkp;
import com.rmsi.spatialvue.studio.domain.AnnualHolidayCalendar;
import com.rmsi.spatialvue.studio.domain.Attachment;
import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.IssueAction;
import com.rmsi.spatialvue.studio.domain.IssueReasonLkp;
import com.rmsi.spatialvue.studio.domain.IssueTypeLkp;
import com.rmsi.spatialvue.studio.domain.IssueUrgencyLkp;
//import com.rmsi.spatialvue.studio.domain.Issue;
//import com.rmsi.spatialvue.studio.domain.IssueTypeLkp;
import com.rmsi.spatialvue.studio.service.AccessLandService;
import com.rmsi.spatialvue.studio.service.AnnualHolidayCalendarService;
import com.rmsi.spatialvue.studio.service.IssueService;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;
import com.rmsi.spatialvue.studio.util.GenericUtil;

/**
 * @author Aparesh.Chakraborty
 *
 */
@Service
public class IssueServiceImpl implements IssueService{

	@Autowired
	private IssueDAO issueDAO;
	
	@Autowired
	private IssueTypeLkpDAO issueTypeLkpDAO;
	
	@Autowired
	private ActionStatusLkpDAO actionStatusLkpDAO;
	
	@Autowired
	private IssueUrgencyLkpDAO issueUrgencyLkpDAO;
	
	@Autowired
	private IssueReasonLkpDAO issueReasonLkpDAO;
	
	@Autowired
	private AttachmentDAO attachmentDAO;
	
	@Override
	public Issue createIssue(Issue issue, Integer gid) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Issue EditAccessLand(Issue issue) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Issue getIssueByGid(Integer gid) {
		
		Issue issue= new Issue();
		issue= issueDAO.getIssueByGid(new Integer(gid));
		//Set<Attachment> attachments = new HashSet<Attachment>(attachmentDAO.findAttachmentByGid("Issue",new Integer(gid)));			
		List<Attachment> attachments = attachmentDAO.findAttachmentByGid("Issue",new Integer(gid));
		issue.setAttachments(attachments);
		
		return issue; 
		
		
		//return issueDAO.getIssueByGid(gid);
		
	}
	@Override
	@Cacheable(cacheName="issuelkpFBNCache")
	public List<IssueTypeLkp> findAllIssueTypeLkp(String lang) {
		
		return issueTypeLkpDAO.getAllIssueType(lang);
	}
	@Override
	public IssueTypeLkp getIssueTypeById(Integer id) {
		
		 return issueTypeLkpDAO.getIssueTypeById(id);
	}
	@Override
	public Issue getPreviousIssue(Integer gid, String rowid) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Issue getNextIssue(Integer gid, String rowid) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public boolean updateIssueHistoryById(Integer gid) {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public List<Issue> findIssueofPathByRowid(String status,String rowid) {
		return issueDAO.getIssueByRowID(status,rowid);
	}
	@Override
	@Cacheable(cacheName="issuelkpFBNCache")
	public List<ActionStatusLkp> findAllActionStatusLkp() {
		
		return actionStatusLkpDAO.getAllActionStatusLkp();
	}
	@Override
	public ActionStatusLkp getActionStatusLkpById(Integer id) {
		
		return actionStatusLkpDAO.getActionStatusLkpById(id);
	}
	@Override
	@Cacheable(cacheName="issuelkpFBNCache")
	public List<IssueUrgencyLkp> getAllIssueUrgency() {
		
		return issueUrgencyLkpDAO.getAllIssueUrgency();
	}
	@Override
	public IssueUrgencyLkp getIssueUrgencyById(Integer id) {
		
		return issueUrgencyLkpDAO.getIssueUrgencyById(id);
		
		
	}
	@Override
	public List<Issue> findIssueofFurnitureByFurnitureid(String status,String furnitureid) {
		String actionids="";
		if(status.equalsIgnoreCase("Open"))
			actionids = ConfigurationUtil.getProperty("issue.showissue.actionstatus"); 
		else
			actionids= ConfigurationUtil.getProperty("issue.histricolissue.actionstatus");
		
		//return issueDAO.getIssueByFurnitureID(actionids,furnitureid);
		return issueDAO.getFurnitureIssuesByActionId(actionids, furnitureid);
	}
	
	@Override
	public List<Issue> findIssueByFurnitureid(String status,String furnitureid) {
		String actionids="";
		if(status.equalsIgnoreCase("Open"))
			actionids = ConfigurationUtil.getProperty("issue.showissue.actionstatus"); 
		else
			actionids= ConfigurationUtil.getProperty("issue.histricolissue.actionstatus");
		
		return issueDAO.getIssueByFurnitureID(actionids,furnitureid);
	}
	
	@Override
	public List<IssueAction> getActionForFurnitureIssues(String status, String furnitureid){
		if(status.equalsIgnoreCase("Open")){
			return issueDAO.getIssueActionType(furnitureid, false);
		}else{
			return issueDAO.getIssueActionType(furnitureid, true);
		}
	}
	
	@Override
	public List<IssueAction> getActionForPathIssues(String status, String pathId){
		if(status.equalsIgnoreCase("Open")){
			return issueDAO.getActionForPathIssues(pathId, false);
		}else{
			return issueDAO.getActionForPathIssues(pathId, true);
		}
	}
	
	@Override
	public List<Issue> findIssueofJobByjobid(String jobid) {
		//String actionids = ConfigurationUtil.getProperty("issue.showissue.actionstatus");  
		return issueDAO.getIssueByjobid(Integer.parseInt(jobid));
	}
	
	@Override
	public List<IssueReasonLkp> getAllIssueReason() {
		
		return issueReasonLkpDAO.getAllIssueReason();
	}
	@Override
	public IssueReasonLkp getIssueReasonById(Integer id) {
		
		return issueReasonLkpDAO.getIssueReasonById(id);
	}
	@Override
	public List<Issue> getHistoricalIssueByRowId(String rowid) {
		return issueDAO.getHistoricalIssueByRowId(rowid);
		 
	}
	
	//added by PBJ
	/*public List<Issue> getOpenIssuesByUserID(Integer userId, int userRole) {
		
		String strSuperUser =  ConfigurationUtil.getProperty("workcommitment.superUsersRole");
		String strWardenUser =  ConfigurationUtil.getProperty("workcommitment.wardenUsersRole");
		String strAcessTeamId = ConfigurationUtil.getProperty("workcommitment.accessTeamRoleId");
		
		if(GenericUtil.isUserInValidRole (strSuperUser,userRole)){			
			return issueDAO.getAllOpenIssues();
		}else if(GenericUtil.isUserInValidRole (strWardenUser,userRole)){
			return issueDAO.getOpenIssuesByUserID(userRole,userId,Integer.parseInt(strAcessTeamId));
			}else{
				return issueDAO.getOpenIssuesByUserID(userId);
			}
				
				
		}		*/
		
	public List<Issue> getAllIssues(){
		return issueDAO.getAllIssues();
	}
	
	//added by saurabh 
	@Override
	public List<Issue> findOpenIssueOnPathByRowid(String rowid, String status) {
		String actionids="";
		
		if(status.equalsIgnoreCase("Open")){
			actionids= ConfigurationUtil
			.getProperty("issue.showissue.actionstatus");
		}else{
			actionids= ConfigurationUtil
			.getProperty("issue.histricolissue.actionstatus");
		}
		
		List<Integer> actionIdList=null;
		if(actionids!=null){
			String[] statusids = actionids.split(",");

			if (statusids.length < 1) {
				return null;
			}
			actionIdList = new ArrayList<Integer>();

			for (int i = 0; i < statusids.length; i++) {
				actionIdList.add(Integer.parseInt(statusids[i]));
			}
		}
		

		return issueDAO.getOpenIssueOnPathByRowID(actionIdList,rowid);
	}
	
	@Override
	public Issue getOpenIssueOnPathByUrgency(String rowid) {
		String actionids= ConfigurationUtil
			.getProperty("issue.showissue.actionstatus");
		
		List<Integer> actionIdList=null;
		if(actionids!=null){
			String[] statusids = actionids.split(",");

			if (statusids.length < 1) {
				return null;
			}
			actionIdList = new ArrayList<Integer>();

			for (int i = 0; i < statusids.length; i++) {
				actionIdList.add(Integer.parseInt(statusids[i]));
			}
		}
		

		return issueDAO.getOpenIssueOnPathByUrgency(actionIdList,rowid);
	}
	@Override
	public boolean updateIssueSurveyor(Integer gid,String useremail,Date objResolveByDate) {
		return issueDAO.updateIssueSurveyor(gid,useremail,objResolveByDate);
	}
	@Override
	public boolean CloseIssueByIssueID(Integer gid, Date objSignOffDate) {
		return issueDAO.CloseIssueByIssueID(gid,objSignOffDate);
	}
	
	@Override
	public List<Issue> getIssueBySurfaceid(String surfaceid,String status) {
		List<Integer> actionIdList=null;
		String actionids= null;
		if(status.equalsIgnoreCase("Open")){
			actionids= ConfigurationUtil
			.getProperty("issue.showissue.actionstatus");
		}else{
			actionids= ConfigurationUtil
			.getProperty("issue.histricolissue.actionstatus");
		}
		
		if(actionids!=null){
			String[] statusids = actionids.split(",");

			if (statusids.length < 1) {
				return null;
			}
			actionIdList = new ArrayList<Integer>();

			for (int i = 0; i < statusids.length; i++) {
				actionIdList.add(Integer.parseInt(statusids[i]));
			}
		}
		return issueDAO.getIssueBySurfaceid(actionIdList,surfaceid);
	}
	
	
	@Override
	public List<Issue> getIssueofSurfaceBySurfaceid(String surfaceid,String status){
		List<Integer> actionIdList=null;
		String actionids= null;
		if(status.equalsIgnoreCase("Open")){
			actionids= ConfigurationUtil
			.getProperty("issue.showissue.actionstatus");
		}else{
			actionids= ConfigurationUtil
			.getProperty("issue.histricolissue.actionstatus");
		}
		
		if(actionids!=null){
			String[] statusids = actionids.split(",");

			if (statusids.length < 1) {
				return null;
			}
			actionIdList = new ArrayList<Integer>();

			for (int i = 0; i < statusids.length; i++) {
				actionIdList.add(Integer.parseInt(statusids[i]));
			}
		}
		return issueDAO.getSurfaceIssuesByActionId(actionIdList,surfaceid);
	}
	
	
	@Override
	public String getParentGid(String parentLyr, String parentId) {
		return issueDAO.getParentGid(parentLyr,parentId);
		
	}
	
	@Override
	public List<IssueAction> getActionForIssues(String status){
			return issueDAO.getWorkCommitmentIssueActionType(false);
	}
	
	@Override
	public List<IssueAction> getActionForSurfaceIssues(String surfaceid, String status){
		if(status.equalsIgnoreCase("Open")){
			return issueDAO.getActionForSurfaceIssues(surfaceid, false);
		}else{
			return issueDAO.getActionForSurfaceIssues(surfaceid, true);
		}
	}
}


