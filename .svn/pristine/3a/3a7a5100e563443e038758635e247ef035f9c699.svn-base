package com.rmsi.spatialvue.studio.service.impl;

import java.util.List;

import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.Job;
import com.rmsi.spatialvue.studio.domain.RoW_Path;
import com.rmsi.spatialvue.studio.domain.User;
/**
 * @author PBJ
 *
 */
public interface IRole {
	List<Issue> getOpenIssuesByUserID(Integer userId, int userRole,int promptDays);
	List<Issue> getAllIssues();
	List<Issue> getBacklogIssues(int promptDays);
	List<Issue> getBacklogIssues(int promptDays, String emailId, int roleId);
	//for Survey Task
	List<RoW_Path> getPathByUidAndStatus(String email, int loggedInUserRole, int promptDays);
	List<RoW_Path> getBacklogSurveyTasks(String email, int loggedInUserRole, int promptDays);
	List<RoW_Path>  getAllSurveyTasks();
	//for Jobs
	List<Job> getPendingJobs(User objUser, int promptDays);
	List<Job> getBacklogJobs(User objUser, int promptDays);
	List<Job> getAllJobs(User objUser, int promptDays);
	
	//added by saurabh 
	List<Issue> getOpenIssuesByUser(User objUser,int promptDays);
	List<Job> getClosedJobByTime(User objUser,int Days);
	
}
