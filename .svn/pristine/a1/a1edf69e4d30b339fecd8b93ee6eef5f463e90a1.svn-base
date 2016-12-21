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

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.ProjectDAO;
import com.rmsi.spatialvue.studio.dao.ProjectLayergroupDAO;
import com.rmsi.spatialvue.studio.dao.UserRoleDAO;
import com.rmsi.spatialvue.studio.domain.Bookmark;
import com.rmsi.spatialvue.studio.domain.LayerField;
import com.rmsi.spatialvue.studio.domain.Project;
import com.rmsi.spatialvue.studio.domain.ProjectBaselayer;
import com.rmsi.spatialvue.studio.domain.ProjectLayergroup;
import com.rmsi.spatialvue.studio.domain.Role;
import com.rmsi.spatialvue.studio.domain.Unit;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.domain.UserRole;


@Repository
public class UserRoleHibernateDAO extends GenericHibernateDAO<UserRole, Long>
		implements UserRoleDAO {

	
	@SuppressWarnings("unchecked")
	public boolean deleteUserRoleByRole(String role) {
		
		System.out.println(">>>>>>Deleteed from user_role: " + role);
		try{
			Query query = getEntityManager().createQuery(
					"Delete from UserRole ur where ur.roleBean.name =:name")
					.setParameter("name", role);
			
			int count = query.executeUpdate();
			System.out.println("Delete UserRole count: " + count);
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
	public boolean deleteUserRoleByUser(String user) {
		try{
			String qry = "Delete from UserRole ur where ur.user.email =:name";
			Query query = getEntityManager().createQuery(qry).setParameter("name", user);
			System.out.println("UserRoleHibernateDao: " + qry + " " + user);
			
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
	public void addUserRoles(Set<Role> roles, User user) {
				
		deleteUserRoleByUser(user.getName());	 
		
		//inser new record
	    Iterator iter1 = roles.iterator();
	    while (iter1.hasNext()) {
	      
	    	Role role=new Role();	    	
	    	role=(Role) iter1.next();	    	
	    	UserRole userrole=new UserRole();	    	
	    	
	    	userrole.setUser(user);
	    	userrole.setRoleBean(role);
	    	
	    	makePersistent(userrole);	
	    	System.out.println("######## USER role INSERT: " +user.getName()+"-"+role.getName());
	    	
	    }
		
	}
	
	/*
	@SuppressWarnings("unchecked")
	public List<UserRole> findAllUserRole(String name) {
		
		List<UserRole> userRole =
			getEntityManager().createQuery("Select ur from UserRole ur where ur.user.name = :name").setParameter("name", name).getResultList();
		
			return userRole;		
	}	

	*/
	
	
}
