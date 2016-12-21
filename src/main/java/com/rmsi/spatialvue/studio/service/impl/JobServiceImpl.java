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
import java.util.Set;
import java.util.List;
import java.util.HashSet;

import javax.persistence.Query;

import com.googlecode.ehcache.annotations.TriggersRemove;
import com.rmsi.spatialvue.studio.dao.AttachmentDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rmsi.spatialvue.studio.domain.Attachment;
import com.rmsi.spatialvue.studio.dao.FurnitureConditionLkpDAO;
import com.rmsi.spatialvue.studio.dao.FurnitureDAO;
import com.rmsi.spatialvue.studio.dao.JobFeatureLkpDAO;
import com.rmsi.spatialvue.studio.dao.JobTypeLkpDAO;
import com.rmsi.spatialvue.studio.dao.JobDAO;
import com.rmsi.spatialvue.studio.dao.JobUserDAO;
import com.rmsi.spatialvue.studio.dao.NonspatialAttachmentDAO;
import com.rmsi.spatialvue.studio.dao.UserDAO;
import com.rmsi.spatialvue.studio.domain.Furniture;
import com.rmsi.spatialvue.studio.domain.FurnitureConditionLkp;
import com.rmsi.spatialvue.studio.domain.Access_Land_polygon;
import com.rmsi.spatialvue.studio.domain.JobFeatureLkp;
import com.rmsi.spatialvue.studio.domain.Job;
import com.rmsi.spatialvue.studio.domain.JobContact;
import com.rmsi.spatialvue.studio.domain.JobTypeLkp;
import com.rmsi.spatialvue.studio.domain.JobUser;
import com.rmsi.spatialvue.studio.domain.NonspatialAttachment;
import com.rmsi.spatialvue.studio.domain.Role;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.service.FurnitureService;
import com.rmsi.spatialvue.studio.service.JobService;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;
/**
 * @author Alok.Sen
 *
 */
@Service
public class JobServiceImpl implements JobService{

	@Autowired
	private JobTypeLkpDAO jobTypeLkpDAO;
	@Autowired
	private UserDAO userDao;
	@Autowired
	private JobDAO jobDao;
	@Autowired
	private JobFeatureLkpDAO jobFeatureLkpDAO;
	@Autowired
	private NonspatialAttachmentDAO nonspatialattachmentDAO;
	@Autowired
	private JobUserDAO jobUserDAO;
	
	
	@Override
	public Job getJobByJobID(int jobid) {
		
		Job job= new Job();
		job= jobDao.getJobByJobID(jobid);
		Set<NonspatialAttachment> nonspatialattachments = new HashSet<NonspatialAttachment>(nonspatialattachmentDAO.findNonspatialAttachmentByGid("Job",new Integer(jobid)));
		job.setAttachments(nonspatialattachments);
		Set<NonspatialAttachment> riskassesmentattachment = new HashSet<NonspatialAttachment>(nonspatialattachmentDAO.findRiskassesmentAttachmentByGid("Job",new Integer(jobid)));
		job.setRiskassesmentattachment(riskassesmentattachment);
		return job; 
	}

	@Override
	public Job getJobByIssue_gid(int issue_gid) {
		
		Job job= new Job();
		Integer jobid =0;
		job= jobDao.getJobByIssue_gid(issue_gid);
		
		if(job != null){
			jobid = job.getJobid();
			Set<NonspatialAttachment> nonspatialattachments = new HashSet<NonspatialAttachment>(nonspatialattachmentDAO.findNonspatialAttachmentByGid("Job",new Integer(jobid)));
			job.setAttachments(nonspatialattachments);
			Set<NonspatialAttachment> riskassesmentattachment = new HashSet<NonspatialAttachment>(nonspatialattachmentDAO.findRiskassesmentAttachmentByGid("Job",new Integer(jobid)));
			job.setRiskassesmentattachment(riskassesmentattachment);
			return job;
		}
		else{
		Job newJob= new Job();
		Set<NonspatialAttachment> nonspatialattachments = new HashSet<NonspatialAttachment>();
		newJob.setAttachments(nonspatialattachments);
		Set<NonspatialAttachment> riskassesmentattachment = new HashSet<NonspatialAttachment>();
		newJob.setRiskassesmentattachment(riskassesmentattachment);
		newJob.setJobid(0);
		return newJob;
		}
	}
	
	
	@Override
	public List<JobTypeLkp> findAllJobType() {
		return jobTypeLkpDAO.findAll();
	}
	
	@Override
	public List<JobFeatureLkp> findAllFeatureType() {
		return jobFeatureLkpDAO.findAll();
	}
	
	@Override
	@Transactional
	public Job addJob(Job job) {
		Job objJob= jobDao.makePersistent(job);
		//userRoleDAO.addUserRoles(roleList, user);
		return objJob;
	}
	
	@Override
	public Object getJobLKPDetail(String tableName, String idField,
			String idValue) {
		// TODO Auto-generated method stub
		return jobDao.getJobLKPDetail(tableName, idField, idValue);
	}
	@Override
	public boolean deleteJobUserByjobID(Integer jobid) {
		// TODO Auto-generated method stub
		return jobUserDAO.deleteJobUserByjobID(jobid);
	}
	@Override
	public boolean addJobUser(JobUser user) {
		jobUserDAO.makePersistent(user);
		return true;
	}
	
	@Override
	public JobUser getJobUserByjobID(Integer jobid) {
		JobUser jobuser = jobUserDAO.getJobUserByjobID(jobid);
		return jobuser;
	}

	/*@Override
	public List<Job> getClosedJobByUser(Integer id,String jobStartDate,String jobEnddate) {
		User objUser=userDao.findUserByUserId(id);
		int headWardenId = Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.seasonalWardenId"));
		
		return jobDao.getClosedJobByUserAndDate(objUser,jobStartDate,jobEnddate,headWardenId);
	}
	*/
	
	@Override
	public List<Job> getClosedJobByUserAndDays(Integer id,Integer days){
		User objUser=userDao.findUserByUserId(id);
		int headWardenId = Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.headwardenUserRole"));
		
		return jobDao.getClosedJobByUserAndDays(objUser,days,headWardenId);
	}
	
	
	
	
}
