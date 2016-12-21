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

package com.rmsi.spatialvue.studio.dao;

import java.util.Date;
import java.util.List;

import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.IssueAction;

//import com.rmsi.spatialvue.studio.domain.Issue;



/**
 * @author Aparesh.Chakraborty
 *
 */


public interface IssueDAO extends GenericDAO<Issue, Long> {

Issue getIssueByGid(Integer gid);
	
	Issue getPreviousIssue(Integer gid,String rowid);
	
	Issue getNextIssue(Integer gid,String rowid);
	
	boolean updateIssueHistoryById(Integer gid);
	
	List<Issue> getIssueByRowID(String status,String rowid);
	
	List<Issue> getIssueByFurnitureID(String statusid,String furnitureid);
	List<Issue> getFurnitureIssuesByActionId(String actionids,String furnitureid); 
	
	List<Issue> getHistoricalIssueByRowId(String rowid);
		
	//Added by PBJ
	List<Issue> getAllIssues();
	List<Issue> getAllOpenIssues(int promptDays);
	List<Issue> getOpenIssuesForMiscUser(Integer userId,int promptDays);
	List<Issue> getOpenIssuesForWardenUsers(int userRoleId, Integer userId, Integer accessTeamId, int promptDays);
	
	List<Issue> getOpenIssueOnPathByRowID(List<Integer> actionIdList,String rowid);
	
	boolean updateIssueSurveyor(Integer gid,String useremail,Date objResolveByDate);
	
	List<Issue> getBacklogIssues(int promptDays);
	
	List<Issue> getBacklogIssuesByWarden(int promptDays, String emailId, int roleId);

		List<Issue> getIssueByjobid(Integer jobid);

		boolean CloseIssueByIssueID(Integer gid, Date objSignOffDate);
		Issue getOpenIssueOnPathByUrgency(List<Integer> actionIdList,String rowid);
		
		//added by saurabh
		List<Issue> getOpenIssuesForMiscUserByEmail( String email,int promptDays,List<Integer> actionIdList);
		List<Issue> getOpenIssuesForWardenUsersByEmail(String email,int promptDays,Integer accessTeamRoleId,Integer seasonalWardensRoleId,List<Integer> actionIdList,int functional_role);

		List<Issue>  getIssueBySurfaceid(List<Integer> actionIdList,String surfaceid);
		List<Issue> getSurfaceIssuesByActionId(List<Integer> actionIdList, String surfaceid);
		
		String getParentGid(String parentLyr,String parentId);
		List<IssueAction> getIssueActionType(String id, boolean status);
		List<IssueAction> getWorkCommitmentIssueActionType(boolean status);
		List<IssueAction> getActionForPathIssues(String rowid, boolean status);
		List<IssueAction> getActionForSurfaceIssues(String surfaceId, boolean status);
}

