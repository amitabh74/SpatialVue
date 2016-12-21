package com.rmsi.spatialvue.studio.service.impl;

import java.util.ArrayList;
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


@Service
public class MiscUserRole implements IRole {
	
	@Autowired
	private IssueDAO issueDAO;
	
	@Autowired
	private PathDAO pathDAO;
	
	@Autowired
	private JobDAO jobDAO;
	
	
	@Override
	public List<Issue> getOpenIssuesByUserID(Integer userId, int userRole, int promptDays) {
		// TODO Auto-generated method stub
		return issueDAO.getOpenIssuesForMiscUser(userId, promptDays);
	}
	
	@Override
	public List<RoW_Path> getPathByUidAndStatus(String email,
			int loggedInUserRole, int promptDays) {
		return pathDAO.getPendingSurveyTasksForMiscUser(email, promptDays);
		
	}
	
	public List<RoW_Path> getBacklogSurveyTasks(String email, int loggedInUserRole, int promptDays){
		return pathDAO.getBacklogSurveyTasksForMiscUser(email, promptDays);
	}
	
	@Override
	public List<Issue> getAllIssues(){
		return issueDAO.getAllIssues();
	}
	

	public List<RoW_Path>  getAllSurveyTasks(){
		return pathDAO.getAllSurveyTasks();
	}

	@Override
	public List<Job> getPendingJobs(User objUser,int promptDays) {
		return jobDAO.getPendingJobsForMiscUser(objUser, promptDays);
	}

	@Override
	public List<Job> getBacklogJobs(User objUser, int promptDays) {
		return jobDAO.getBacklogJobsForMiscUser(objUser, promptDays);
	}

	@Override
	public List<Job> getAllJobs(User objUser, int promptDays){
		return jobDAO.getAllJobsForMiscUser(objUser,promptDays);
	}

	@Override
	public List<Issue> getBacklogIssues(int promptDays) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Issue> getBacklogIssues(int promptDays, String emailId, int roleId){
		return issueDAO.getBacklogIssuesByWarden(promptDays, emailId, roleId);
	}
	
	@Override
	public List<Issue> getOpenIssuesByUser(User objUser, int promptDays) {
		String actionids = ConfigurationUtil
				.getProperty("issue.showissue.actionstatus");

		List<Integer> actionIdList = null;
		if (actionids != null) {
			String[] statusids = actionids.split(",");

			if (statusids.length < 1) {
				return null;
			}
			actionIdList = new ArrayList<Integer>();

			for (int i = 0; i < statusids.length; i++) {
				actionIdList.add(Integer.parseInt(statusids[i]));
			}
		}
		return issueDAO.getOpenIssuesForMiscUserByEmail(objUser.getEmail(),
				promptDays,actionIdList);
	}

	@Override
	public List<Job> getClosedJobByTime(User objUser,int Days) {
		return jobDAO.getClosedJobsForMiscUser(objUser, Days);
	}

	
}
