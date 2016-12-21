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
public class Warden implements IRole {
	
	@Autowired
	private IssueDAO issueDAO;
	@Autowired
	private PathDAO pathDAO;
	@Autowired
	private JobDAO jobDAO;
	
	@Override
	public List<Issue> getOpenIssuesByUserID(Integer userId, int userRole,int promptDays) {
		// TODO Auto-generated method stub
		String strAcessTeamId = ConfigurationUtil.getProperty("workcommitment.accessTeamRoleId");
		return issueDAO.getOpenIssuesForWardenUsers(userRole,userId,Integer.parseInt(strAcessTeamId),promptDays);
	}
	
	public List<Issue> getAllIssues(){
		return issueDAO.getAllIssues();
	}
	
	public List<RoW_Path> getPathByUidAndStatus(String email, int loggedInUserRole, int promptDays){
		String strAcessTeamId = ConfigurationUtil.getProperty("workcommitment.accessTeamRoleId");
		return pathDAO.getPendingSurveyTasksForWardenUser(email, loggedInUserRole,promptDays,Integer.parseInt(strAcessTeamId));
	}
	
	public List<RoW_Path> getBacklogSurveyTasks(String email, int loggedInUserRole, int promptDays){
		String strAcessTeamId = ConfigurationUtil.getProperty("workcommitment.accessTeamRoleId");
		return pathDAO.getBacklogSurveyTasksForWardenUser(email, loggedInUserRole,promptDays,Integer.parseInt(strAcessTeamId));
	}
	

	public List<RoW_Path>  getAllSurveyTasks(){
		return pathDAO.getAllSurveyTasks();
	}

	@Override
	public List<Job> getPendingJobs(User objUser, int promptDays) {
		int strAcessTeamId = Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.accessTeamRoleId"));
		int strSeasonalWardenId = Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.seasonalWardenId"));
		int wardenId = Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"));
		return jobDAO.getPendingJobsForWardenUser(objUser,strAcessTeamId,strSeasonalWardenId, promptDays,wardenId);
	}

	@Override
	public List<Job> getBacklogJobs(User objUser, int promptDays) {
		int strAcessTeamId = Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.accessTeamRoleId"));
		int strSeasonalWardenId = Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.seasonalWardenId"));
		int wardenId = Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"));
		return jobDAO.getBacklogJobsForWardenUser(objUser,strAcessTeamId,strSeasonalWardenId, promptDays,wardenId);
	}

	@Override
	public List<Job> getAllJobs(User objUser, int promptDays) {
		int acessTeamId = Integer.parseInt(ConfigurationUtil
				.getProperty("workcommitment.accessTeamRoleId"));
		int seasonalWardenId = Integer.parseInt(ConfigurationUtil
				.getProperty("workcommitment.seasonalWardenId"));
		int wardenId = Integer.parseInt(ConfigurationUtil
				.getProperty("workcommitment.wardenUsersRole"));
		return jobDAO.getAllJobsForWorderUser( objUser,promptDays,acessTeamId,seasonalWardenId,wardenId);
		//return jobDAO.getAllJobs(promptDays);
	}

	@Override
	public List<Issue> getBacklogIssues(int promptDays) {
		return null;
	}
	
	@Override
	public List<Issue> getBacklogIssues(int promptDays, String emailId, int roleId){
		System.out.println("Getting Backlog for warden ----- ");
		return issueDAO.getBacklogIssuesByWarden(promptDays, emailId, roleId);
	}

	@Override
	public List<Issue> getOpenIssuesByUser(User objUser, int promptDays) {
		int acessTeamId = Integer.parseInt(ConfigurationUtil
				.getProperty("workcommitment.accessTeamRoleId"));
		int seasonalWardenId = Integer.parseInt(ConfigurationUtil
				.getProperty("workcommitment.seasonalWardenId"));
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
		System.out.println(">>>>>>>>>>INSIDE getOpenIssuesByUser");
		return issueDAO.getOpenIssuesForWardenUsersByEmail(objUser.getEmail(),
				promptDays, acessTeamId, seasonalWardenId, actionIdList,objUser.getFunctionalRole());

	}

	@Override
	public List<Job> getClosedJobByTime(User objUser, int Days) {
		// TODO Auto-generated method stub
		return jobDAO.getClosedJobsForWardenUser(objUser, Days);
	}
	
}
