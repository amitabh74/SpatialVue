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

import java.util.List;

import com.rmsi.spatialvue.studio.domain.Furniture;
import com.rmsi.spatialvue.studio.domain.Job;
import com.rmsi.spatialvue.studio.domain.Project;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;


public interface JobDAO extends GenericDAO<Job, Long> {
	//List<Furniture> getFurnitureByRowID(String rowid);
	Job getJobByJobID(Integer jobid);
	Job getJobByIssue_gid(Integer issue_gid);
	Object getJobLKPDetail(String tableName,String idField,String idValue);
	//Furniture getPreviousFurniture(Integer gid,String rowid);
	//Furniture getNextFurniture(Integer gid,String rowid);
	//boolean updateFurnitureHistoryById(Integer gid);
	//Added By PBJ
	List<Job> getPendingJobsForSuperUser(User objUser,int promptDays);
	List<Job> getBacklogJobsForSuperUser(User objUser,int promptDays);
	public List<Job> getAllJobs(int promptDays);
	
	List<Job> getPendingJobsForWardenUser(User objUser,int strAcessTeamId,int strSeasonalWardenId,int promptDays,int wardenId);
	List<Job> getBacklogJobsForWardenUser(User objUser,int strAcessTeamId,int strSeasonalWardenId,int promptDays,int wardenId);
	
	List<Job> getPendingJobsForMiscUser(User objUser,int promptDays);
	List<Job> getBacklogJobsForMiscUser(User objUser,int promptDays);
	
	//List<Job> getClosedJobByUserAndDate(User objUser,String jobStartDate,String jobEnddate,int headWardenId);
	List<Job> getClosedJobByUserAndDays(User objUser,int noofDays,int headWardenId);
	//void addJob(Job job);
	
	List<Job> getClosedJobsForMiscUser(User objUser,int noofDays);
	List<Job> getClosedJobForSuperUser(User objUser,int noofDays);
	List<Job> getClosedJobsForWardenUser(User objUser,int noofDays);
	
	List<Job> getAllJobsForWorderUser(User objUser,int promptDays,int strAcessTeamId,int strSeasonalWardenId, int wardenId);
	List<Job> getAllJobsForMiscUser(User objUser, int promptDays);
	List<Job> getAllJobsForSuperUser();
	
	
}
