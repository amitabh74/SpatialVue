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

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import com.rmsi.spatialvue.studio.domain.Furniture;
import com.rmsi.spatialvue.studio.domain.FurnitureConditionLkp;
import com.rmsi.spatialvue.studio.domain.FurnitureTypeLkp;
import com.rmsi.spatialvue.studio.domain.Job;
import com.rmsi.spatialvue.studio.domain.JobFeatureLkp;
import com.rmsi.spatialvue.studio.domain.JobTypeLkp;
import com.rmsi.spatialvue.studio.domain.JobUser;
import com.rmsi.spatialvue.studio.domain.User;


/**
 * @author Alok.Sen
 *
 */

public interface JobService {

	/*
	@Transactional
	Furniture createFurniture(Furniture furniturePoint,Integer gid);
	
	@Transactional
	Furniture EditFurniture(Furniture furniturePoint);
	
	List<Furniture> getFurnitureByRowid(String rowid);
	*/
	Job getJobByJobID(int jobid);

	Job getJobByIssue_gid(int issue_gid);

	List<JobTypeLkp> findAllJobType();

	List<JobFeatureLkp> findAllFeatureType();
	Job addJob(Job job);
	Object getJobLKPDetail(String tableName,String idField,String idValue);
	/*
	List<FurnitureTypeLkp> findAllFurniture();
	List<FurnitureConditionLkp> findAllFurnitureCondition();
	List<User> getAllSurveyUsers();
	
	Furniture getPreviousFurniture(Integer gid,String rowid);
	
	Furniture getNextFurniture(Integer gid,String rowid);
	
	@Transactional
	boolean updateFurnitureHistoryById(Integer gid);
	*/

	boolean deleteJobUserByjobID(Integer jobid);
	@Transactional
	boolean addJobUser(JobUser user);

	JobUser getJobUserByjobID(Integer jobid);
	
	//List<Job> getClosedJobByUser(Integer id,String jobStartDate,String jobEnddate);
	List<Job> getClosedJobByUserAndDays(Integer id,Integer days);
	
	
}
