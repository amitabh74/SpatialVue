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
package com.rmsi.spatialvue.studio.dao.hibernate;

import java.sql.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.JobDAO;
import com.rmsi.spatialvue.studio.domain.Job;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;


@Repository
public class JobHibernateDAO extends GenericHibernateDAO<Job, Long> implements
JobDAO {

	@SuppressWarnings("unchecked")
	public Job getJobByJobID(Integer jobid) {
		List<Job> job =
			getEntityManager().createQuery("Select jb from Job jb where jb.jobid = :jobid").setParameter("jobid", jobid).getResultList();		
		if(job.size() > 0)
		{			
			return job.get(0);
		}
		else
			return null;
	}
	
	@SuppressWarnings("unchecked")
	public Job getJobByIssue_gid(Integer issueGid) {
		List<Job> job =
			getEntityManager().createQuery("Select jb from Job jb where jb.issueGid = :issueGid").setParameter("issueGid", issueGid).getResultList();		
		if(job.size() > 0)
		{			
			return job.get(0);
		}
		else{
			return null;
		}
	}
	@Override
	public Object getJobLKPDetail(String tableName,String idField,String idValue) {
		// TODO Auto-generated method stub
		int id=-1;
		try{
		  id=Integer.parseInt(idValue);
		}catch(Exception e){}
		List<Object> lookUpDetail =
			getEntityManager().createQuery("Select t from "+tableName+" t where t."+idField+" = :id").setParameter("id",id).getResultList();
		    if(lookUpDetail.size() > 0)
			return lookUpDetail.get(0);
		else
			return null;
	}
/*
	@SuppressWarnings("unchecked")
	public Furniture getPreviousFurniture(Integer gid, String furnitureid) {
		
		Furniture furniturePoint= new Furniture();
		try{
			furniturePoint =
			(Furniture) getEntityManager().createQuery("Select frn from Furniture frn where frn.furnitureid = :furnitureid and frn.ishistory = true and frn.gid < :gid ORDER BY gid DESC").setParameter("furnitureid", furnitureid).setParameter("gid", gid).setMaxResults(1).getSingleResult();
		}
		catch(Exception e){
			
		}
		
			return furniturePoint;
			
	}
											
	@SuppressWarnings("unchecked")
	public Furniture getNextFurniture(Integer gid, String furnitureid) {
		
		Furniture furniturePoint= new Furniture();
		try{
		furniturePoint =
			(Furniture) getEntityManager().createQuery("Select frn from Furniture frn where frn.furnitureid = :furnitureid and frn.ishistory = true and frn.gid > :gid ORDER BY gid ASC").setParameter("furnitureid", furnitureid).setParameter("gid", gid).setMaxResults(1).getSingleResult();
		}
		catch(Exception e){
			
		}
			return furniturePoint;
	}

	@Override
	public boolean updateFurnitureHistoryById(Integer gid) {
		try{

			Query query = getEntityManager().createQuery("update Furniture frn set frn.ishistory = true where frn.gid = :gid");			
			query.setParameter("gid", gid);
									
			int count = query.executeUpdate();
			System.out.println("Update Furniture history count: " + count);
			if(count > 0){
				return true;
			}else{
				return false;
			}
		}catch(Exception e){
			e.printStackTrace();
			return false;
	    }
	}
	@Override
	public List<Furniture> getFurnitureByRowID(String rowid) {
		List<Furniture> listfurniture =
			getEntityManager().createQuery("Select f from Furniture f where f.rowId = :rid and f.ishistory= false").setParameter("rid", rowid).getResultList();		
		return listfurniture;
	}
	*/
	@Override
	public List<Job> getPendingJobsForSuperUser(User objUser, int promptDays){
		/*
		  List<Job> jobs = getEntityManager().createQuery("Select j from Job j where j.jobCompleted is null AND j.targetDate" +
				" BETWEEN current_date AND (current_date + " + promptDays + ")").getResultList();
		*/
		List<Job> jobs = getEntityManager().createQuery("Select j from Job j where j.jobCompleted is null AND j.targetDate > current_date").getResultList();
		return jobs;
	}
	@Override
	public List<Job> getBacklogJobsForSuperUser(User objUser, int promptDays){
		List<Job> jobs = getEntityManager().createQuery("Select j from Job j where j.jobCompleted is null AND j.targetDate < current_date").getResultList();	
		return jobs;
	}
	@Override
	public List<Job> getAllJobs(int promptDays){
		List<Job> jobs = getEntityManager().createQuery("Select j from Job j").getResultList();	
		return jobs;
	}
	
	public List<Job> getAllJobsForSuperUser(){
		List<Job> jobs = getEntityManager().createQuery("Select j from Job j where j.jobCompleted is null").getResultList();	
		return jobs;
	}
	//added by Saurabh
	
		/*Select *  from snpa.job j where j.jobid in (
			select jobid from snpa.job_user ju where ju.user_email='ioan.davies@eryri-npa.gov.uk' 
			or ju.user_email in (SELECT email from public.users where manager_id =
			 ( SELECT id from public.users users where users.email='ioan.davies@eryri-npa.gov.uk'))) and */
	@SuppressWarnings("unchecked")
	public List<Job> getPendingJobsForWardenUser(User objUser,int strAcessTeamId,int strSeasonalWardenId, int promptDays, int wardenUsersRole){
		System.out.println("##########PEn-warden: "+"objUser: "+ objUser.getName()+ "-"+strAcessTeamId+"-"+ strSeasonalWardenId);
		/*List<Job> jobs = getEntityManager().createQuery("Select j from Job j where" +" j.jobid in " +
				
				"(select job.jobid from JobUser ju where " +
				"ju.user_email=:useremail OR ju.user_email in (SELECT email from User where managerid =:managerid and functionalRole  =:seasonalWardenrole)" +
				" OR ju.user_email in (SELECT email from User where functionalRole  =:accessTeamRoleId))"+
				" AND j.jobCompleted is null AND j.targetDate " +
				//" BETWEEN current_date AND (current_date + " + promptDays + ")")			//By Aparesh on 06-06-2013
				" > current_date ")
				.setParameter("useremail", objUser.getEmail()).setParameter("managerid", objUser.getManagerid())
				.setParameter("accessTeamRoleId", strAcessTeamId)
				.setParameter("seasonalWardenrole", strSeasonalWardenId).getResultList();*/
		System.out.println("######## Inside getAllJobsForWorderUser");
		List<Job> jobs=null;
		
		if(objUser.getFunctionalRole()==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"))){
			System.out.println("######## Warden User");
		
			jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
					" Select  j.jobid from Job j, Issue i  " +
					" where j.issueGid = i.gid " +
					" and (i.assignedTo =:useremail " +
						" OR i.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  =:seasonalWardenrole) " +
						" OR i.assignedTo in (SELECT  u.email from User u where u.functionalRole  = :accessTeamRoleId))) " +
				" And j1.jobCompleted is null  " +
				" AND j1.targetDate > current_date")
				.setParameter("useremail", objUser.getEmail())
				.setParameter("managerid", objUser.getManagerid())
				.setParameter("accessTeamRoleId", strAcessTeamId)
				.setParameter("seasonalWardenrole", strSeasonalWardenId).getResultList();
		}
		else if(objUser.getFunctionalRole()==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.headwardenUserRole"))) {
				System.out.println("######## Head Worder User");
				
				jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
						" Select  j.jobid from Job j, Issue i  " +
						" where j.issueGid = i.gid " +
						" and (i.assignedTo =:useremail " +
							" OR i.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  in (:seasonalWardenrole, :wardenUsersRole)) " +
							" OR i.assignedTo in (SELECT  u.email from User u where u.functionalRole  = :accessTeamRoleId))) " +
					" And j1.jobCompleted is null  " +
					" AND j1.targetDate > current_date")
					.setParameter("useremail", objUser.getEmail())
					.setParameter("managerid", objUser.getId())
					.setParameter("accessTeamRoleId", strAcessTeamId)
					.setParameter("seasonalWardenrole", strSeasonalWardenId)
					.setParameter("wardenUsersRole", wardenUsersRole)
					.getResultList();
		}
		else{
			
		}
				/*SQL
				 select * from snpa.job where  jobid in (

				  Select  j.jobid from snpa.job j,snpa."Issues" i   
				  where j.issue_gid =i.gid
				  and (i.assigned_to = 'alan.pritchard@eryri-npa.gov.uk'
				  OR i.assigned_to in (SELECT  email from users where manager_id =7 and functional_role  =10)
				  OR i.assigned_to in (SELECT  email from users where functional_role  =14)
				  )
				)
				  And job_completed is null 
				  AND target_date > current_date
				 
				 */
		
		return jobs;

	}
	@SuppressWarnings("unchecked")
	public List<Job> getBacklogJobsForWardenUser(User objUser,int strAcessTeamId,int strSeasonalWardenId, int promptDays,int wardenUsersRole){
		System.out.println("##########BACKLOG-wardenuser: "+"objUser: "+ objUser.getName()+ "-"+strAcessTeamId+"-"+ strSeasonalWardenId);
		/*List<Job> jobs = getEntityManager().createQuery("Select j from Job j where" +" j.jobid in " +
				"(select job.jobid from JobUser ju where " +
				"ju.user_email=:useremail OR ju.user_email in (SELECT email from User where managerid =:managerid and functionalRole  =:seasonalWardenrole)" +
				" OR ju.user_email in (SELECT email from User where functionalRole  =:accessTeamRoleId))"+
				" AND j.jobCompleted is null AND j.targetDate < current_date")
				.setParameter("useremail", objUser.getEmail()).setParameter("managerid", objUser.getManagerid())
				.setParameter("accessTeamRoleId", strAcessTeamId)
				.setParameter("seasonalWardenrole", strSeasonalWardenId).getResultList();*/	
		
		System.out.println("######## Inside getAllJobsForWorderUser");
		List<Job> jobs=null;
		
		if(objUser.getFunctionalRole()==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"))){
			System.out.println("######## Worder User");
		
			jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
					" Select  j.jobid from Job j, Issue i  " +
					" where j.issueGid = i.gid " +
					" and (i.assignedTo =:useremail " +
						" OR i.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  =:seasonalWardenrole) " +
						" OR i.assignedTo in (SELECT  u.email from User u where u.functionalRole  = :accessTeamRoleId))) " +
				" And j1.jobCompleted is null  " +
				" AND j1.targetDate < current_date")
				.setParameter("useremail", objUser.getEmail())
				.setParameter("managerid", objUser.getManagerid())
				.setParameter("accessTeamRoleId", strAcessTeamId)
				.setParameter("seasonalWardenrole", strSeasonalWardenId).getResultList();
		}
		else if(objUser.getFunctionalRole()==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.headwardenUserRole"))) {
				System.out.println("######## Head Worder User");
				
				jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
						" Select  j.jobid from Job j, Issue i  " +
						" where j.issueGid = i.gid " +
						" and (i.assignedTo =:useremail " +
							" OR i.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  in (:seasonalWardenrole, :wardenUsersRole)) " +
							" OR i.assignedTo in (SELECT  u.email from User u where u.functionalRole  = :accessTeamRoleId))) " +
					" And j1.jobCompleted is null  " +
					" AND j1.targetDate < current_date")
					.setParameter("useremail", objUser.getEmail())
					.setParameter("managerid", objUser.getId())
					.setParameter("accessTeamRoleId", strAcessTeamId)
					.setParameter("seasonalWardenrole", strSeasonalWardenId)
					.setParameter("wardenUsersRole", wardenUsersRole)
					.getResultList();
		}
		else{
			
		}
		
		return jobs;
	}


	@SuppressWarnings("unchecked")
	public List<Job> getPendingJobsForMiscUser(User objUser, int promptDays) {
		System.out.println("##########MISC user- pending: "+"objUser: "+ objUser.getName());
		
		/*List<Job> jobs = getEntityManager().createQuery("Select j from Job j where" +" j.jobid in " +
				"(select job.jobid from JobUser ju where " +
				"ju.user_email=:useremail OR ju.user_email in (SELECT email from User where managerid =:userid))"+
				" AND j.jobCompleted is null AND j.targetDate" +
				//" BETWEEN current_date AND (current_date + " + promptDays + ")")			//By Aparesh on 06-06-2013
				" > current_date ")
				.setParameter("useremail", objUser.getEmail()).setParameter("userid", objUser.getId()).getResultList();	
*/
		List<Job> jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
				" Select  j.jobid from Job j, Issue i  " +
				" where j.issueGid = i.gid " +
				" and i.assignedTo =:useremail ) "+
				" And j1.jobCompleted is null AND j1.targetDate > current_date ")
			.setParameter("useremail", objUser.getEmail())			
			.getResultList();
		return jobs;
	}


	@SuppressWarnings("unchecked")
	public List<Job> getBacklogJobsForMiscUser(User objUser, int promptDays) {
		System.out.println("########## BACKLOG: "+"objUser: "+ objUser.getName());
		/*List<Job> jobs = getEntityManager().createQuery("Select j from Job j where" +" j.jobid in " +
				"(select job.jobid from JobUser ju where " +
				"ju.user_email=:useremail OR ju.user_email in (SELECT email from User where managerid =:userid))"+
				" AND j.jobCompleted is null AND j.targetDate < current_date")
				.setParameter("useremail", objUser.getEmail()).setParameter("userid", objUser.getId()).getResultList();*/
		/*List<Job> jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
				" Select  j.jobid from Job j, Issue i  " +
				" where j.issueGid = i.gid " +
				" and (i.assignedTo =:useremail " +
					" OR i.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid))) "+
				" And j1.jobCompleted is null AND j1.targetDate < current_date ")
			.setParameter("useremail", objUser.getEmail())
			.setParameter("managerid", objUser.getManagerid())
			.getResultList();*/
		
		List<Job> jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
				" Select  j.jobid from Job j, Issue i  " +
				" where j.issueGid = i.gid " +
				" and i.assignedTo =:useremail )"+
				" And j1.jobCompleted is null AND j1.targetDate < current_date ")
			.setParameter("useremail", objUser.getEmail())			
			.getResultList();
		return jobs;
	}

	/*@Override
	public List<Job> getClosedJobByUserAndDate(User objUser,String jobStartDate,String jobEnddate,int headWardenId) {
		
		List<Job> jobs = getEntityManager().createQuery("Select j from Job j where j.jobid in (select ju.job.jobid from JobUser " +
			//	"ju where ju.user_email=:useremail) and (j.jobCompleted is not null and j.jobCompleted between :jobStartDate and :jobCloseddate) order by j.jobCompleted desc")
		"ju where ju.user_email=:useremail) and j.jobCompleted is not null order by j.jobCompleted desc")
				.setParameter("useremail", objUser.getEmail())
				//.setParameter("jobStartDate", jobStartDate)
			//	.setParameter("jobCloseddate", jobEnddate)
				.getResultList();	
		return jobs;
	}*/
	@SuppressWarnings("unchecked")
	public List<Job> getClosedJobByUserAndDays(User objUser,int noofDays,int headWardenId) {
		List<Job> jobs=null;
		if(headWardenId!=objUser.getFunctionalRole()){//head warden
			jobs = getEntityManager().createQuery("Select j from Job j, JobUser ju where j.jobid=ju.job.jobid " +
					"and ju.user_email=:useremail and j.jobCompleted is not null and j.jobCompleted" +
					" BETWEEN (current_date - " + noofDays + ") and current_date"
					+"  order by j.jobCompleted desc")
					.setParameter("useremail", objUser.getEmail())
					.getResultList();
		}else{
			jobs = getEntityManager().createQuery("Select j from Job j, JobUser ju where j.jobid=ju.job.jobid " +
					"and (ju.user_email=:useremail or ju.user_email in (SELECT email from User where managerid =:userid)  and j.jobCompleted is not null and j.jobCompleted" +
					" BETWEEN (current_date - " + noofDays + ") and current_date"
					+"  order by j.jobCompleted desc")
					.setParameter("useremail", objUser.getEmail())
					.setParameter("userid", objUser.getId())
					.getResultList();
		}
			
		return jobs;
	}
	
	@SuppressWarnings("unchecked")
	public List<Job> getClosedJobForSuperUser(User objUser,int noofDays) {
		List<Job> jobs=null;
		
		/*if(noofDays!=0){
			jobs = getEntityManager().createQuery("Select j from Job j, JobUser ju where j.jobid=ju.job.jobid " +
					"and j.jobCompleted is not null and j.jobCompleted" +
					" BETWEEN (current_date - " + noofDays + ") and current_date"
					+"  order by j.jobCompleted desc")
				.getResultList();
		}else{
			jobs = getEntityManager().createQuery("Select j from Job j, JobUser ju where j.jobid=ju.job.jobid " +
					"and j.jobCompleted is not null " +
					"  order by j.jobCompleted desc")
				.getResultList();	
		}*/
		if(noofDays!=0){
			jobs = getEntityManager().createQuery("Select j from Job j " +
					" where j.jobCompleted is not null and j.jobCompleted" +
					" BETWEEN (current_date - " + noofDays + ") and current_date"
					+"  order by j.jobCompleted desc")
				.getResultList();
		}else{
			jobs = getEntityManager().createQuery("Select j from Job j" +
					" where j.jobCompleted is not null " +
					"  order by j.jobCompleted desc")
				.getResultList();	
		}
			
		return jobs;
	}
	
	@SuppressWarnings("unchecked")
	public List<Job> getClosedJobsForMiscUser(User objUser,int noofDays) {
		List<Job> jobs=null;
		//head warden
		/*if(noofDays!=0){
			jobs = getEntityManager().createQuery("Select j from Job j, JobUser ju where j.jobid=ju.job.jobid " +
					"and ju.user_email=:useremail and j.jobCompleted is not null and j.jobCompleted" +
					" BETWEEN (current_date - " + noofDays + ") and current_date"
					+"  order by j.jobCompleted desc")
					.setParameter("useremail", objUser.getEmail())
					.getResultList();
		}else{
			jobs = getEntityManager().createQuery("Select j from Job j, JobUser ju where j.jobid=ju.job.jobid " +
					"and ju.user_email=:useremail and j.jobCompleted is not null "
					+"  order by j.jobCompleted desc")
					.setParameter("useremail", objUser.getEmail())
					.getResultList();
		}*/
		if(noofDays!=0){
			jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
					" Select  j.jobid from Job j, Issue i  " +
					" where j.issueGid = i.gid " +
					" and i.assignedTo =:useremail ) "+
				" And j1.jobCompleted is not null and j1.jobCompleted BETWEEN (current_date - " + noofDays + ") and current_date " +
				" order by j1.jobCompleted desc")
				.setParameter("useremail", objUser.getEmail())				
				.getResultList();
		}else{
			jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
					" Select  j.jobid from Job j, Issue i  " +
					" where j.issueGid = i.gid " +
					" and i.assignedTo =:useremail ) "+
				" And j1.jobCompleted is not null " +
				" order by j1.jobCompleted desc")
				.setParameter("useremail", objUser.getEmail())				
				.getResultList();			
			
		}
		
		return jobs;
	}
	
	@SuppressWarnings("unchecked")
	public List<Job> getClosedJobsForWardenUser(User objUser,int noofDays) {
		List<Job> jobs=null;
		System.out.println("########### inside getClosedJobsForWardenUser- Fun. Role: "+objUser.getFunctionalRole() );
		/*if(noofDays!=0){
			jobs = getEntityManager().createQuery("Select j from Job j, JobUser ju where j.jobid=ju.job.jobid " +
					"and ju.user_email=:useremail or ju.user_email in (SELECT email from User where managerid =:userid)  and j.jobCompleted is not null and j.jobCompleted" +
					" BETWEEN (current_date - " + noofDays + ") and current_date"
					+"  order by j.jobCompleted desc")
					.setParameter("useremail", objUser.getEmail())
					.setParameter("userid", objUser.getId())
					.getResultList();
		}else{
			jobs = getEntityManager().createQuery("Select j from Job j, JobUser ju where j.jobid=ju.job.jobid " +
					"and ju.user_email=:useremail or ju.user_email in (SELECT email from User where managerid =:userid)  and j.jobCompleted is not null " +
					"  order by j.jobCompleted desc")
					.setParameter("useremail", objUser.getEmail())
					.setParameter("userid", objUser.getId())
					.getResultList();
		}*/
		int seasonalWrdenId=Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.seasonalWardenId"));
		int wrdenId=Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"));		
		
		if(noofDays!=0){
			if(objUser.getFunctionalRole()==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"))){
				jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
						" Select  j.jobid from Job j, Issue i  " +
						" where j.issueGid = i.gid " +
						" and (i.assignedTo =:useremail " +
							" OR i.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole=:seasonalWrdenId ))) "+
					" And j1.jobCompleted is not null and j1.jobCompleted BETWEEN (current_date - " + noofDays + ") and current_date " +
					" order by j1.jobCompleted desc")
					.setParameter("useremail", objUser.getEmail())
					.setParameter("managerid", objUser.getManagerid())
					.setParameter("seasonalWrdenId", seasonalWrdenId)
					.getResultList();
			}
			else if(objUser.getFunctionalRole()==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.headwardenUserRole"))){
				jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
						" Select  j.jobid from Job j, Issue i  " +
						" where j.issueGid = i.gid " +
						" and (i.assignedTo =:useremail " +
							" OR i.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole in(:seasonalWrdenId, :wrdenId ) ))) "+
					" And j1.jobCompleted is not null and j1.jobCompleted BETWEEN (current_date - " + noofDays + ") and current_date " +
					" order by j1.jobCompleted desc")
					.setParameter("useremail", objUser.getEmail())
					.setParameter("managerid", objUser.getId())
					.setParameter("seasonalWrdenId", seasonalWrdenId)
					.setParameter("wrdenId", wrdenId)
					.getResultList();
			}
			else{
				
			}
		}else{
			
			if(objUser.getFunctionalRole()==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"))){
				jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
						" Select  j.jobid from Job j, Issue i  " +
						" where j.issueGid = i.gid " +
						" and (i.assignedTo =:useremail " +
							" OR i.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole=:seasonalWrdenId ))) "+
					" And j1.jobCompleted is not null " +
					" order by j1.jobCompleted desc")
					.setParameter("useremail", objUser.getEmail())
					.setParameter("managerid", objUser.getId())
					.setParameter("seasonalWrdenId", seasonalWrdenId)
					.getResultList();
			}
			else if(objUser.getFunctionalRole()==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.headwardenUserRole"))){
				jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
						" Select  j.jobid from Job j, Issue i  " +
						" where j.issueGid = i.gid " +
						" and (i.assignedTo =:useremail " +
							" OR i.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole in(:seasonalWrdenId, :wrdenId ) ))) "+
					" And j1.jobCompleted is not null " +
					" order by j1.jobCompleted desc")
					.setParameter("useremail", objUser.getEmail())
					.setParameter("managerid", objUser.getId())
					.setParameter("seasonalWrdenId", seasonalWrdenId)
					.setParameter("wrdenId", wrdenId)
					.getResultList();
			}
			else{
				
			}
			
			
			
		}
		
		return jobs;
	}

	@SuppressWarnings("unchecked")
	public List<Job> getAllJobsForWorderUser(User objUser,int promptDays,int strAcessTeamId,int strSeasonalWardenId,int wardenId) {
		/*List<Job> jobs = getEntityManager().createQuery("Select j from Job j where" +" j.jobid in " +
				"(select job.jobid from JobUser ju where " +
				"ju.user_email=:useremail OR ju.user_email in (SELECT email from User where managerid =:managerid and functionalRole  =:seasonalWardenrole)" +
				" OR ju.user_email in (SELECT email from User where functionalRole  =:accessTeamRoleId))"+
				" AND j.jobCompleted is null ")
				.setParameter("useremail", objUser.getEmail()).setParameter("managerid", objUser.getManagerid())
				.setParameter("accessTeamRoleId", strAcessTeamId)
				.setParameter("seasonalWardenrole", strSeasonalWardenId).getResultList();	*/
		System.out.println("######## Inside getAllJobsForWorderUser");
		List<Job> jobs=null;
		
		if(objUser.getFunctionalRole()==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"))){
			System.out.println("######## Worder User");
			jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
					" Select  j.jobid from Job j, Issue i  " +
					" where j.issueGid = i.gid " +
					" and (i.assignedTo =:useremail " +
						" OR i.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole  =:seasonalWardenrole) " +
						" OR i.assignedTo in (SELECT  u.email from User u where u.functionalRole  = :accessTeamRoleId))) " +
				" And j1.jobCompleted is null ")
				.setParameter("useremail", objUser.getEmail())
				.setParameter("managerid", objUser.getManagerid())
				.setParameter("accessTeamRoleId", strAcessTeamId)
				.setParameter("seasonalWardenrole", strSeasonalWardenId).getResultList();
		}
		else if(objUser.getFunctionalRole()==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.headwardenUserRole"))) {
			System.out.println("######## Head Worder User");
			jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
					" Select  j.jobid from Job j, Issue i  " +
					" where j.issueGid = i.gid " +
					" and (i.assignedTo =:useremail " +
						" OR i.assignedTo in (SELECT  u.email from User u where u.managerid = :managerid and u.functionalRole in(:seasonalWardenrole, :wardenId)) " +
						" OR i.assignedTo in (SELECT  u.email from User u where u.functionalRole  = :accessTeamRoleId))) " +
				" And j1.jobCompleted is null ")
				.setParameter("useremail", objUser.getEmail())
				.setParameter("managerid", objUser.getId())
				.setParameter("accessTeamRoleId", strAcessTeamId)
				.setParameter("seasonalWardenrole", strSeasonalWardenId)
				.setParameter("wardenId", wardenId)
				.getResultList();
		}
		else{
			
		}
		
		
		return jobs;
	}
	
	@SuppressWarnings("unchecked")
	public List<Job> getAllJobsForMiscUser(User objUser, int promptDays) {
		/*List<Job> jobs = getEntityManager().createQuery("Select j from Job j where" +" j.jobid in " +
				"(select job.jobid from JobUser ju where " +
				"ju.user_email=:useremail OR ju.user_email in (SELECT email from User where managerid =:userid))"+
				" AND j.jobCompleted is null ")
				.setParameter("useremail", objUser.getEmail()).setParameter("userid", objUser.getId()).getResultList();*/
		List<Job> jobs = getEntityManager().createQuery("select j1 from Job j1 where j1.jobid in (" +
				" Select  j.jobid from Job j, Issue i  " +
				" where j.issueGid = i.gid " +
				" and i.assignedTo =:useremail ) "+
			" And j1.jobCompleted is null ")
			.setParameter("useremail", objUser.getEmail())
			.getResultList();
		return jobs;
	}
	
}
