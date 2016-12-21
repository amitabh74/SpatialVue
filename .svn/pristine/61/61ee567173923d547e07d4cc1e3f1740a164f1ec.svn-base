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

package com.rmsi.spatialvue.studio.service;


import java.util.Date;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import com.rmsi.spatialvue.studio.domain.ActionStatusLkp;
import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.IssueAction;
import com.rmsi.spatialvue.studio.domain.IssueReasonLkp;
import com.rmsi.spatialvue.studio.domain.IssueTypeLkp;
import com.rmsi.spatialvue.studio.domain.IssueUrgencyLkp;

//import com.rmsi.spatialvue.studio.domain.Issue;
//import com.rmsi.spatialvue.studio.domain.IssueTypeLkp;

/**
 * @author Aparesh.Chakraborty
 *
 */
public interface IssueService {

	@Transactional
	Issue createIssue(Issue issue,Integer gid);
	
	@Transactional
	Issue EditAccessLand(Issue issue);
	
	Issue getIssueByGid(Integer gid);
	
	
	List<IssueTypeLkp> findAllIssueTypeLkp(String lang);
	
	IssueTypeLkp getIssueTypeById(Integer id);
	
	Issue getPreviousIssue(Integer gid, String rowid);
	
	Issue getNextIssue(Integer gid, String rowid);
	
	@Transactional
	boolean updateIssueHistoryById(Integer gid);
	
	List<Issue> findIssueofPathByRowid(String status,String rowid);
	
	
	List<ActionStatusLkp> findAllActionStatusLkp();	
	ActionStatusLkp getActionStatusLkpById(Integer id);
	
	List<IssueUrgencyLkp> getAllIssueUrgency();	
	IssueUrgencyLkp getIssueUrgencyById(Integer id);
	
	List<Issue> findIssueofFurnitureByFurnitureid(String status, String furnitureid);
	List<Issue> findIssueByFurnitureid(String status,String furnitureid);
	
	List<IssueAction> getActionForFurnitureIssues(String status, String furnitureid);
	List<IssueAction> getActionForPathIssues(String status, String pathId);
	
	List<IssueAction> getActionForIssues(String status);
	
	List<IssueReasonLkp> getAllIssueReason();	
	IssueReasonLkp getIssueReasonById(Integer id);
	List<Issue> getHistoricalIssueByRowId(String rowid);
	
	//added by PBJ
	//List<Issue> getOpenIssuesByUserID(Integer userId, int userRole);
	List<Issue> getAllIssues();
	
	//added by Saurabh
	List<Issue> findOpenIssueOnPathByRowid(String rowid,String status);
	@Transactional
	boolean updateIssueSurveyor(Integer gid, String useremail,Date objResolveByDate);

	List<Issue> findIssueofJobByjobid(String jobid);
	@Transactional
	boolean CloseIssueByIssueID(Integer gid, Date objSignOffDate);
	
	Issue getOpenIssueOnPathByUrgency(String rowid);
	
	List<Issue> getIssueBySurfaceid(String surfaceid,String status);
	List<Issue> getIssueofSurfaceBySurfaceid(String surfaceid,String status);
	//List<Issue> getSurfaceIssuesByActionId(List<Integer> actionIdList,String surfaceid);
	List<IssueAction> getActionForSurfaceIssues(String surfaceid, String status);
	
	String getParentGid(String parentLyr,String parentId);
	
}
