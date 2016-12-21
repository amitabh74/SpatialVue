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

import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.PathDAO;
import com.rmsi.spatialvue.studio.domain.PathTypeLkp;
import com.rmsi.spatialvue.studio.domain.RoW_Path;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;

@Repository
public class PathHibernateDAO extends GenericHibernateDAO<RoW_Path, Long> implements
PathDAO {

	private final String  status_pending = "pending";
	private final String  status_backlog = "backlog";
	private final String  status_all = "all";
	
	@SuppressWarnings("unchecked")
	public RoW_Path getPathByGid(Integer gid) {
		List<RoW_Path> listPath =
			getEntityManager().createQuery("Select rp from RoW_Path rp where rp.gid = :gid").setParameter("gid", gid).getResultList();		
		if(listPath.size() > 0)
		{			
			return listPath.get(0);
		}
		else
			return null;
	}

	@Override
	public RoW_Path getPreviousPath(Integer gid, String rowid) {
		/*RoW_Path rowpath =
			(RoW_Path) getEntityManager().createQuery("Select rp from RoW_Path rp where rp.rowId = :rowid and rp.isHistory = true and rp.gid < :gid ORDER BY gid DESC").setParameter("rowid", rowid).setParameter("gid", gid).setMaxResults(1).getSingleResult();
		if(rowpath!=null)
			return rowpath;
			else
				return null;*/
		
		RoW_Path rowpath = new RoW_Path();
		try{
			rowpath =
				(RoW_Path) getEntityManager().createQuery("Select rp from RoW_Path rp where rp.rowId = :rowid and rp.isHistory = true and rp.gid < :gid ORDER BY gid DESC").setParameter("rowid", rowid).setParameter("gid", gid).setMaxResults(1).getSingleResult();	}
		catch(Exception e){
			
		}
		
			return rowpath;
	}

	@Override
	public RoW_Path getNextPath(Integer gid, String rowid) {
		/*RoW_Path rowpath =
			(RoW_Path) getEntityManager().createQuery("Select rp from RoW_Path rp where rp.rowId = :rowid and rp.isHistory = true and rp.gid > :gid ORDER BY gid ASC").setParameter("rowid", rowid).setParameter("gid", gid).setMaxResults(1).getSingleResult();
		if(rowpath!=null)
		return rowpath;
		else
			return null;*/
		RoW_Path rowpath = new RoW_Path();
		try{
			rowpath =
				(RoW_Path) getEntityManager().createQuery("Select rp from RoW_Path rp where rp.rowId = :rowid and rp.isHistory = true and rp.gid > :gid ORDER BY gid ASC").setParameter("rowid", rowid).setParameter("gid", gid).setMaxResults(1).getSingleResult();
		}
		catch(Exception e){
			
		}
		
			return rowpath;
	}
	
	@Override
	public boolean updateRowPathHistoryById(Integer gid) {
		try {

			Query query = getEntityManager()
					.createQuery(
							"update RoW_Path rp set rp.isHistory = true where rp.gid = :gid");
			query.setParameter("gid", gid);
			int count = query.executeUpdate();
			if (count > 0) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<RoW_Path> getPathByGid(String rowid) {
		List<RoW_Path> listPath =
			getEntityManager().createQuery("Select rp from RoW_Path rp where rp.rowId = :rowid").setParameter("rowid", rowid).getResultList();		
		if(listPath.size() > 0)
		{			
			return listPath;
		}
		else
			return null;
	}
	@Override
	public List<RoW_Path> getFurniturePathByGid(String rowid) {
		List<RoW_Path> listPath =
			getEntityManager().createQuery("Select rp from RoW_Path rp where rp.rowId = :rowid and rp.isHistory = false").setParameter("rowid", rowid).getResultList();		
		if(listPath.size() > 0)
		{			
			return listPath;
		}
		else
			return null;
	}
	@Override
	public List<RoW_Path> getSurfacePathByGid(String rowid) {
		List<RoW_Path> listPath =
			getEntityManager().createQuery("Select rp from RoW_Path rp where rp.rowId = :rowid and rp.isHistory = false").setParameter("rowid", rowid).getResultList();		
		if(listPath.size() > 0)
		{			
			return listPath;
		}
		else
			return null;
	}

	@SuppressWarnings("unchecked")
	public List<RoW_Path> getIssuePathByRowId(String rowid) {
		
		List<RoW_Path> listPath =
			getEntityManager().createQuery("Select rp from RoW_Path rp where rp.rowId = :rowid and rp.isHistory = false").setParameter("rowid", rowid).getResultList();		
		if(listPath.size() > 0)
		{			
			return listPath;
		}
		else
			return null;
	}
	//Added By PBJ
	@Override
	public List<RoW_Path> getPathByUid(Integer uid) {
		List<RoW_Path> listPath = null;
			
			/*getEntityManager().createQuery("Select rp from RoW_Path rp, User u  where rp.isHistory=false AND rp.assignedTo.id = u.id " +
				"AND (rp.assignedTo.id=:uid OR rp.assignedTo.id in " +
				"(SELECT id from User users where manager_id = :uid) ) " +
				"ORDER BY rp.dateofnextsurvey DESC").setParameter("uid", uid).getResultList();*/		
		
			return listPath;
		
	}

	@SuppressWarnings("unchecked")
	public List<RoW_Path> getPendingSurveyTaskForSuperUser(String email, int promptDays) {
		List<RoW_Path> listPath = null;
			
		listPath = getEntityManager().createQuery("Select rp from RoW_Path rp  " +
				"where rp.isHistory=false " +
			"AND rp.dateofnextsurvey BETWEEN  current_date AND" +
			" (current_date +"+ promptDays +") ORDER BY rp.dateofnextsurvey DESC").getResultList();		
			if(listPath.size() > 0)
			{			
				return listPath;
			}else{
				return null;
			}
	}
	
	@SuppressWarnings("unchecked")
	public List<RoW_Path> getBacklogSurveyTasksForSuperUser(String email, int promptDays) {
		//List<RoW_Path> listPath = null;
		
		List<RoW_Path> listPath = getEntityManager().createQuery("Select rp from RoW_Path rp where rp.isHistory=false  " +
				"AND rp.dateofnextsurvey < current_date ORDER BY rp.dateofnextsurvey DESC").getResultList();
			if(listPath.size() > 0)
			{			
				return listPath;
			}else{
				return null;
			}
	}
	
	@SuppressWarnings("unchecked")
	public List<RoW_Path> getAllSurveyTasks() {
		
			List<RoW_Path> listPath = getEntityManager().createQuery("Select rp from RoW_Path rp where rp.isHistory=false ORDER BY rp.dateofnextsurvey DESC").getResultList(); 
			if(listPath.size() > 0)
			{			
				return listPath;
			}else{
				return null;
			}
	}
	
	
	
	
	@SuppressWarnings("unchecked")
	public List<RoW_Path> getPendingSurveyTasksForMiscUser(String email, int promptDays) {
		List<RoW_Path> listPath = null;
			
		listPath = getEntityManager().createQuery("Select rp from RoW_Path rp " +
				" where rp.isHistory=false " +
			"AND (rp.assignedTo=:email OR rp.assignedTo in " +
			"(SELECT email from User users where managerid = ( SELECT id from User users where email=:email))) AND rp.dateofnextsurvey BETWEEN  current_date AND" +
			" (current_date +"+ promptDays +") ORDER BY rp.dateofnextsurvey DESC").setParameter("email", email).getResultList();		
			if(listPath.size() > 0)
			{			
				return listPath;
			}else{
				return null;
			}
	}
	
	@SuppressWarnings("unchecked")
	public List<RoW_Path> getBacklogSurveyTasksForMiscUser(String email, int promptDays) {
		
		List<RoW_Path> 	listPath = getEntityManager().createQuery("Select rp from RoW_Path rp " +
				"where rp.isHistory=false " +
			"AND (rp.assignedTo=:email OR rp.assignedTo in " +
			"(SELECT email from User users where managerid = ( SELECT id from User users where email=:email)))" +
			"AND rp.dateofnextsurvey < current_date ORDER BY rp.dateofnextsurvey DESC").setParameter("email", email).getResultList();		
			if(listPath.size() > 0)
			{			
				return listPath;
			}else{
				return null;
			}
		
	}	
	@SuppressWarnings("unchecked")
	public List<RoW_Path> getPendingSurveyTasksForWardenUser(String email, int loggedInUserRole, int promptDays,Integer accessTeamRoleId) {
		List<RoW_Path> listPath = null;
		System.out.println(">>>>>>>Pending>>>>>>>>>>>EMAIL: "+email+"------Fun Role"+  loggedInUserRole );	
		
		int seasonalWrdenId=Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.seasonalWardenId"));
		int wrdenId=Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"));		
		
		if(loggedInUserRole==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"))){
			System.out.println("######## Pending-->Warden User");
		listPath = getEntityManager().createQuery("Select rp from RoW_Path rp " +
				"where rp.isHistory=false  " +
				"AND (rp.assignedTo=:email " +
				"OR rp.assignedTo in (SELECT email from User users where email in " +
				"(SELECT email from User userss where managerid in" +
				"(select managerid from User user where email = :email)AND users.functionalRole in (:seasonalWrdenId)))" +
				"OR" +
				" rp.assignedTo in (select email from User user where functionalRole  =:accessTeamRoleId)) "+ 
				" AND rp.dateofnextsurvey BETWEEN  current_date AND" +
				" (current_date +"+ promptDays +") ORDER BY rp.dateofnextsurvey DESC")
				.setParameter("email", email)
				.setParameter("accessTeamRoleId", accessTeamRoleId)
				.setParameter("seasonalWrdenId", seasonalWrdenId)				
				.getResultList();
		
		}
		else if(loggedInUserRole==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.headwardenUserRole"))) {
			System.out.println("######## Pending--> Head Worder User");
			listPath = getEntityManager().createQuery("Select rp from RoW_Path rp " +
					"where rp.isHistory=false  " +
					"AND (rp.assignedTo=:email " +
					"OR rp.assignedTo in (SELECT email from User users where email in " +
					"(SELECT email from User userss where managerid in" +
					"(select id from User user where email = :email)AND users.functionalRole in (:seasonalWrdenId, :wrdenId)))" +
					"OR" +
					" rp.assignedTo in (select email from User user where functionalRole  =:accessTeamRoleId)) "+ 
					" AND rp.dateofnextsurvey BETWEEN  current_date AND" +
					" (current_date +"+ promptDays +") ORDER BY rp.dateofnextsurvey DESC")
					.setParameter("email", email)
					.setParameter("accessTeamRoleId", accessTeamRoleId)
					.setParameter("seasonalWrdenId", seasonalWrdenId)
					.setParameter("wrdenId", wrdenId)
					.getResultList();
			
		}
		if(listPath.size() > 0)
		{			
			return listPath;
		}else{
			return null;
		}
		
	}
	@SuppressWarnings("unchecked")
public List<RoW_Path> getBacklogSurveyTasksForWardenUser(String email, int loggedInUserRole,int promptDays,Integer accessTeamRoleId) {
		
	System.out.println(">>>>>>>Backlog>>>>>>>>>>>EMAIL: "+email+"------Fun Role"+  loggedInUserRole );
	List<RoW_Path> 	listPath=null;
	int seasonalWrdenId=Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.seasonalWardenId"));
	int wrdenId=Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"));		
	if(loggedInUserRole==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"))){
		System.out.println("######## Backlog--> Warden User");
	
		listPath = getEntityManager().createQuery("Select rp from RoW_Path rp  " +
				"where rp.isHistory=false  " +
				"AND (rp.assignedTo=:email " +
				"OR rp.assignedTo in (SELECT email from User users where id in " +
				"(SELECT id from User userss where managerid in" +
				"(select managerid from User user where email = :email)AND users.functionalRole in (:seasonalWrdenId)))" +
				" OR " +
				" rp.assignedTo in (select email from User user where functionalRole  =:accessTeamRoleId)) "+ 
				" AND rp.dateofnextsurvey <  current_date ORDER BY rp.dateofnextsurvey DESC")
				.setParameter("email", email)
				.setParameter("accessTeamRoleId", accessTeamRoleId)
				.setParameter("seasonalWrdenId", seasonalWrdenId)
				.getResultList();
		
	}

	else if(loggedInUserRole==Integer.parseInt(ConfigurationUtil.getProperty("workcommitment.headwardenUserRole"))) {
		System.out.println("######## Backlog-->Head Worder User");
		listPath = getEntityManager().createQuery("Select rp from RoW_Path rp  " +
				"where rp.isHistory=false  " +
				"AND (rp.assignedTo=:email " +
				"OR rp.assignedTo in (SELECT email from User users where id in " +
				"(SELECT id from User userss where managerid in" +
				"(select id from User user where email = :email)AND users.functionalRole in (:seasonalWrdenId, :wrdenId)))" +
				" OR " +
				" rp.assignedTo in (select email from User user where functionalRole  =:accessTeamRoleId)) "+ 
				" AND rp.dateofnextsurvey <  current_date ORDER BY rp.dateofnextsurvey DESC")
				.setParameter("email", email)
				.setParameter("accessTeamRoleId", accessTeamRoleId)
				.setParameter("seasonalWrdenId", seasonalWrdenId)
				.setParameter("wrdenId", wrdenId)
				.getResultList();
		
	
	}
		if(listPath.size() > 0)
		{			
			return listPath;
		}else{
			return null;
		}
		
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<RoW_Path> getPathByUidAndStatus(Integer uid, String status, int promptTask,boolean superUserFlag ){
		List<RoW_Path> listPath = null;
		if(status_pending.equalsIgnoreCase(status)  && !superUserFlag){
			listPath = getEntityManager().createQuery("Select rp from RoW_Path rp, User u  " +
					"where rp.isHistory=false  AND rp.assignedTo.id = u.id " +
				"AND (rp.assignedTo.id=:uid OR rp.assignedTo.id in " +
				"(SELECT id from User users where manager_id = :uid)) AND rp.dateofnextsurvey BETWEEN  current_date AND (current_date + "+ promptTask + ") " +
				"ORDER BY rp.dateofnextsurvey DESC").setParameter("uid", uid).getResultList();	
			
		}else if(status_pending.equalsIgnoreCase(status)&& superUserFlag){
			listPath = getEntityManager().createQuery("Select rp from RoW_Path rp  where rp.isHistory=false" +					
					" AND rp.dateofnextsurvey BETWEEN  current_date AND (current_date + "+ promptTask + ") " +
					"ORDER BY rp.dateofnextsurvey DESC").getResultList();	
			
		}else if((status_backlog.equalsIgnoreCase(status) && !superUserFlag)){
			listPath = getEntityManager().createQuery("Select rp from RoW_Path rp, User u  where rp.isHistory=false  AND  rp.assignedTo.id = u.id " +
					" AND (rp.assignedTo.id=:uid OR rp.assignedTo.id in " +
					"(SELECT id from User users where manager_id = :uid)) AND rp.dateofnextsurvey < current_date " +
					"ORDER BY rp.dateofnextsurvey DESC").setParameter("uid", uid).getResultList();
			
		}else if(status_backlog.equalsIgnoreCase(status) && superUserFlag){
			listPath = getEntityManager().createQuery("Select rp from RoW_Path rp  where rp.isHistory=false AND rp.dateofnextsurvey < current_date " +
					"ORDER BY rp.dateofnextsurvey DESC").getResultList();
		}else if(status_all.equalsIgnoreCase(status) && !superUserFlag){
			listPath = getEntityManager().createQuery("Select rp from RoW_Path rp, User u  where rp.isHistory=false  AND rp.assignedTo.id = u.id " +
					"AND (rp.assignedTo.id=:uid OR rp.assignedTo.id in " +
					"(SELECT id from User users where manager_id = :uid)) " +
					"ORDER BY rp.dateofnextsurvey DESC").setParameter("uid", uid).getResultList();
		}else{
			listPath = getEntityManager().createQuery("Select rp from RoW_Path rp  where rp.isHistory=false ORDER BY " +
					"rp.dateofnextsurvey DESC").getResultList();
		}
		return listPath;
	}
	@Override
	public boolean updatePathSurveyor(Integer gid, String email,Date dateofnextsurvey){
		try {
			
			Query query = getEntityManager().createQuery("update RoW_Path rp set rp.assignedTo = :surveyor, rp.dateofnextsurvey = :dateofnextsurvey where rp.gid = :gid AND ishistory=false");
			query.setParameter("surveyor", email);
			query.setParameter("gid", gid);
			query.setParameter("dateofnextsurvey", dateofnextsurvey);
			int count = query.executeUpdate();
			if (count > 0) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean updatePathOpenIssueByRowID(String rowid,Integer issuecount,Integer pathcondition) {
		try {
			
			Query query = getEntityManager().createQuery("update RoW_Path rp set rp.unresolvedIssues = :issuecount, rp.pathConditionLkp.conditionid=:pathcondition where rp.rowId = :rowid AND ishistory=false");
			query.setParameter("issuecount", issuecount);
			query.setParameter("pathcondition", pathcondition);
			query.setParameter("rowid", rowid);
			int count = query.executeUpdate();
			if (count > 0) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public int getPathTypeId(String type){
		
		Query query = getEntityManager().createQuery("Select p from PathTypeLkp p where UPPER(p.type) = :type or UPPER(p.math) = :math");
		query.setParameter("type", type.toUpperCase());
		query.setParameter("math", type.toUpperCase());
		@SuppressWarnings("unchecked")
		List<PathTypeLkp> lstPathLkp = query.getResultList();
		
		if(lstPathLkp.size() > 0){
			PathTypeLkp pathLkp = lstPathLkp.get(0);
			return pathLkp.getPathTypeId();
		}else{
			return 0;
		}
	
	}
	
	
}
