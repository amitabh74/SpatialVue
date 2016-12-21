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

import com.rmsi.spatialvue.studio.domain.RoW_Path;

/**
 * @author Saurabh.Mehta
 *
 */


public interface PathDAO extends GenericDAO<RoW_Path, Long> {

	RoW_Path getPathByGid(Integer gid);
	
	RoW_Path getPreviousPath(Integer gid,String rowid);
	
	RoW_Path getNextPath(Integer gid,String rowid);
			
	boolean updateRowPathHistoryById(Integer gid);
	
	List<RoW_Path> getPathByGid(String rowid);
	List<RoW_Path> getFurniturePathByGid(String rowid);
	List<RoW_Path> getSurfacePathByGid(String rowid);
	List<RoW_Path> getIssuePathByRowId(String rowid);

	//Added By PBJ
	List<RoW_Path> getPathByUid(Integer uid);//method not being used
	List<RoW_Path> getPathByUidAndStatus(Integer uid, String status, int promptTask, boolean superUserFlag);//method not being used 
	List<RoW_Path> getPendingSurveyTaskForSuperUser(String email, int promptTask);
	List<RoW_Path> getBacklogSurveyTasksForSuperUser(String email, int promptDays);
	List<RoW_Path> getAllSurveyTasks();
	List<RoW_Path> getPendingSurveyTasksForMiscUser(String email, int promptDays);
	List<RoW_Path> getBacklogSurveyTasksForMiscUser(String email, int promptDays);
	
	List<RoW_Path> getBacklogSurveyTasksForWardenUser(String email, int loggedInUserRole, int promptDays,Integer acessTeamRoleId);
	List<RoW_Path> getPendingSurveyTasksForWardenUser(String email, int loggedInUserRole,int promptDays,Integer acessTeamRoleId);
	

	boolean updatePathSurveyor(Integer gid, String email,Date dateofnextsurvey);
	
	boolean updatePathOpenIssueByRowID(String rowid,Integer issueCount,Integer pathcondition);
	
	int getPathTypeId(String type);
		
}

