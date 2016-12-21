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

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.UserDAO;
import com.rmsi.spatialvue.studio.domain.Role;
import com.rmsi.spatialvue.studio.domain.Unit;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.domain.SnpaRole;
import com.rmsi.spatialvue.studio.domain.UserOrder;

@Repository
public class UserHibernateDAO extends GenericHibernateDAO<User, Long> implements
		UserDAO {

	@SuppressWarnings("unchecked")
	public User findByName(String name) {
		
		List<User> user =
			getEntityManager().createQuery("Select u from User u where u.name = :name").setParameter("name", name).getResultList();
		
		if(user.size() > 0)
			return user.get(0);
		else
			return null;
	}
	
	@SuppressWarnings("unchecked")
	public boolean deleteUserByName(String user){
		
		try{
			String qry = "Delete from User u where u.email =:name";
			Query query = getEntityManager().createQuery(qry).setParameter("name", user);
			System.out.println("UserHibernateDao: " + qry);
			int count = query.executeUpdate();
			System.out.println("Delete User count: " + count);
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
	
	@SuppressWarnings("unchecked")
	public User findByUniqueName(String emaildId){
		List<User> user =
			getEntityManager().createQuery("Select u from User u where u.active = true and u.email = :name").setParameter("name", emaildId).getResultList();
		
		if(user.size() > 0)
			return user.get(0);
		else
			return null;
	}

	@SuppressWarnings("unchecked")
	public User findByEmail(String email) {
		System.out.println("--Printing DAO Query  --- " + email);
		try{
		List<User> user =
			getEntityManager().createQuery("Select u from User u where u.email = :name").setParameter("name", email).getResultList();
		
		System.out.println("--Query executed  --- ");
		if(user.size() > 0){
			System.out.println("--Query returns a result  --- " + user.get(0).getFunctionalRole());
			return user.get(0);
		}else{
			return null;
		}
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	@SuppressWarnings("unchecked")
	public List<User> getAllSurveyUsers() {
			List<User> user =
			getEntityManager().createQuery("Select u from User u where u.functionalRole in (Select r.id from SnpaRole r where r.description <> :guest) and u.active=true order by u.name").setParameter("guest", "Guest").getResultList();
			System.out.println(">>>>>>>>>>>>>>>>>>getAllSurveyUsers: "+user.size());
			if(user.size() > 0)
			return user;
		else
			return null;
	}
	
	public List<UserOrder> getUserOrderedById(){
		@SuppressWarnings("unchecked")
		List<User> users = 
			getEntityManager().createQuery("Select u from User u order by u.id asc").getResultList();
		
		List<UserOrder> lstUserOrder = new ArrayList<UserOrder>();
		if(users.size() > 0){
			for(User usr: users){
				UserOrder usrOrder = new UserOrder();
				usrOrder.setId(usr.getId());
				usrOrder.setName(usr.getName());
				lstUserOrder.add(usrOrder);
			}
			return lstUserOrder;
		}else{
			return null;
		}
	}
	//Added by PBJ
	public User findUserByUserId(Integer id){
		List<User> user = getEntityManager().createQuery("Select u from User u where u.id = :id order by u.name").setParameter("id", id).getResultList();
		if(user.size() > 0)
			return user.get(0);
		else
			return null;
		
	}
	
	public List<User>getAssignmentUserForHeadWarden(int loggedInUserId, int accessTeamRoleId){
		
		List<User> usersList = getEntityManager().createQuery("Select u from User u where (u.id = :loggedInUserId" +
				" OR" +
				" u.id in(select id from User user where managerid = :loggedInUserId)" +
				" OR" +
				" u.id in (select id from User userss where functionalRole= :accessTeamRoleId)) AND u.active = true order by u.name").
				setParameter("accessTeamRoleId", accessTeamRoleId).setParameter("loggedInUserId", loggedInUserId).getResultList();
		if(usersList.size() > 0){
			return usersList;
		}else{
			return null;
		}
	}
	
	public List<User>getAssignmentUserForHeadWarden(int loggedInUserId){
		
		List<User> usersList = getEntityManager().createQuery("Select u from User u where (u.id = :loggedInUserId" +
				" OR" +
				" u.id in(select id from User user where managerid = :loggedInUserId)) AND u.active = true order by u.name").
				setParameter("loggedInUserId", loggedInUserId).getResultList();
		if(usersList.size() > 0){
			return usersList;
		}else{
			return null;
		}
	}
	
	
	public List<User>getAssignmentUserForWarden(int loggedInUserId,int accessTeamRoleId){
		System.out.println("########Inside getAssignmentUserForWarden");
		List<User> usersList = getEntityManager().createQuery("Select u from User u where (u.id = :loggedInUserId" +
				" OR" +
				" u.id in(select id from User user where managerid = " +
				" (Select managerid from User users where users.id=:loggedInUserId) AND functionalRole= 10)"+
				" OR" +
				" u.id in (select id from User userss where functionalRole= :accessTeamRoleId)) AND u.active = true order by u.name").
				setParameter("accessTeamRoleId", accessTeamRoleId).setParameter("loggedInUserId", loggedInUserId).getResultList();
		if(usersList.size() > 0){
			return usersList;
		}else{
			return null;
		}
	}
	
	public boolean hasUserPublicId(String emailId){
		String roleString = "Guest";
		String queryString = "Select r from SnpaRole r where r.role =:roleId";
		@SuppressWarnings("unchecked")
		List<SnpaRole> role = getEntityManager().createQuery(queryString)
							.setParameter("roleId", roleString).getResultList();
		
		if(role != null && role.size() > 0){
			System.out.println("----Role is: " + role.get(0).getRole());
			System.out.println("--RoleId is: " + role.get(0).getId());
			System.out.println("--Email is: " + emailId);
			queryString = "Select u from User u where u.email=:emailid AND u.functionalRole !=:roleId";
			@SuppressWarnings("unchecked")
			List<User> user = getEntityManager().createQuery(queryString)
								.setParameter("emailid", emailId).setParameter("roleId", role.get(0).getId()).getResultList();
			
			if(user != null && user.size() > 0){
				System.out.println("User is warden");
				
				return true;
			}else{
				System.out.println("User doesn't exists or is not a warden");
				return false;
			}
		}
		return false;
	}
}
