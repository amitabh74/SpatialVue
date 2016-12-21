package com.rmsi.spatialvue.studio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rmsi.spatialvue.studio.dao.IssueDAO;
import com.rmsi.spatialvue.studio.dao.JobDAO;
import com.rmsi.spatialvue.studio.dao.PathDAO;
import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.Job;
import com.rmsi.spatialvue.studio.domain.RoW_Path;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;
/**
 * @author PBJ
 *
 */
@Service
public class SuperUserRole implements IRole {
	
	@Autowired
	private IssueDAO issueDAO;
	
	@Autowired
	private PathDAO pathDAO;
	
	@Autowired
	private JobDAO jobDAO;
	
	@Override
	public List<Issue> getOpenIssuesByUserID(Integer userId, int userRole,int promptDays) {
		// TODO Auto-generated method stub
		return issueDAO.getAllOpenIssues(promptDays);
	}
	
	@Override
	public List<Issue> getAllIssues(){
		return issueDAO.getAllIssues();
	}
	
	@Override
	public List<Issue> getBacklogIssues(int promptDays){
		return issueDAO.getBacklogIssues(promptDays);
	}
	
	@Override
	public List<Issue> getBacklogIssues(int promptDays, String emailId, int roleId){
		return getBacklogIssues(promptDays);
	}
	
	@Override
	public List<RoW_Path> getPathByUidAndStatus(String email, int loggedInUserRole, int promptDays){
		return pathDAO.getPendingSurveyTaskForSuperUser(email, promptDays);
	}
	
	public List<RoW_Path> getBacklogSurveyTasks(String email, int loggedInUserRole, int promptDays){
		return pathDAO.getBacklogSurveyTasksForSuperUser(email,promptDays);
	}
	
	public List<RoW_Path>  getAllSurveyTasks(){
		return pathDAO.getAllSurveyTasks();
	}
	public List<Job> getPendingJobs(User objUser, int promptDays){
		return jobDAO.getPendingJobsForSuperUser(objUser, promptDays);
	}
	public List<Job> getBacklogJobs(User objUser, int promptDays){
		return jobDAO.getBacklogJobsForSuperUser(objUser,promptDays);
	}
	
	public List<Job> getAllJobs(User objUser, int promptDays){
		return jobDAO.getAllJobsForSuperUser();
	}

	@Override
	public List<Issue> getOpenIssuesByUser(User objUser, int promptDays) {
		return issueDAO.getAllOpenIssues(promptDays);
	}

	@Override
	public List<Job> getClosedJobByTime(User objUser, int Days) {
		return jobDAO.getClosedJobForSuperUser(objUser,Days);
	}
}
