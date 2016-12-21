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
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.ProjectDAO;
import com.rmsi.spatialvue.studio.dao.ProjectLayergroupDAO;
import com.rmsi.spatialvue.studio.dao.UserProjectDAO;
import com.rmsi.spatialvue.studio.dao.UserRoleDAO;
import com.rmsi.spatialvue.studio.domain.Bookmark;
import com.rmsi.spatialvue.studio.domain.LayerField;
import com.rmsi.spatialvue.studio.domain.Project;
import com.rmsi.spatialvue.studio.domain.ProjectLayergroup;
import com.rmsi.spatialvue.studio.domain.Unit;
import com.rmsi.spatialvue.studio.domain.UserProject;
import com.rmsi.spatialvue.studio.domain.UserRole;


@Repository
public class UserProjectHibernateDAO extends GenericHibernateDAO<UserProject, Long>
		implements UserProjectDAO {

	@SuppressWarnings("unchecked")
	public void addUserProject(Set<UserProject> userProjectList,String projectname) {
		
		//Delete the existing record
		deleteUserProjectByProject(projectname);
		
		/*Iterator iter = userProjectList.iterator();
	    while (iter.hasNext()) {
	      
	    	UserProject up=new UserProject();
	    	up=(UserProject) iter.next();
	    	deleteUserProject(up.getProjectBean().getName());	    	
	    }
		*/
		
		//inser new record
	    Iterator iter1 = userProjectList.iterator();
	    while (iter1.hasNext()) {
	      
	    	UserProject up=new UserProject();
	    	up=(UserProject) iter1.next();	    	
	    	makePersistent(up);
	    	//System.out.println(iter.next());
	    }

	}

	
public List<String> getUsersByProject(String name){
		
		TypedQuery<String> query = 
			getEntityManager().createQuery("Select up.user.name from UserProject up where up.projectBean.name = :name", String.class).setParameter("name", name);
		
		return query.getResultList();
	}

public List<String> getUserEmailByProject(String project){
	
	TypedQuery<String> query = 
		getEntityManager().createQuery("Select up.user.email from UserProject up where up.projectBean.name = :name", String.class).setParameter("name", project);
	
	return query.getResultList();
}

@SuppressWarnings("unchecked")
public void deleteUserProjectByProject(String project) {
	
	try{
		Query query = getEntityManager().createQuery(
				"Delete from UserProject up where up.projectBean.name =:name")
				.setParameter("name", project);
		
		int count = query.executeUpdate();
		System.out.println("Delete UserProject count: " + count);
		
	}catch(Exception e){
		e.printStackTrace();
		
}
	
}

@SuppressWarnings("unchecked")
public void deleteUserProjectByUser(String user) {
	
	try{
		String qry = "Delete from UserProject up where up.user.email =:name";
		Query query = getEntityManager().createQuery(qry).setParameter("name", user);
		System.out.println("UserProjectHibernateDao: " + qry);
		
		int count = query.executeUpdate();
		System.out.println("Delete UserProject count: " + count);
		
	}catch(Exception e){
		e.printStackTrace();
		
}
	
}
	
	
	
	/*@SuppressWarnings("unchecked")
	public List<UserProject> findAllUserProject(String name) {
		
		List<UserProject> userProject =
			getEntityManager().createQuery("Select up from UserProject up where up.projectBean.name = :name").setParameter("name", name).getResultList();
		
			return userProject;		
	}	

	@SuppressWarnings("unchecked")
	public void deleteUserProject(String name) {
		System.out.println("HDAO DELETE >>>>>>>"+ name);
		List<UserProject> userProjectList=findAllUserProject(name);
		if(userProjectList.size() > 0){
				for(int i=0;i<userProjectList.size();i++){			
					UserProject up=new UserProject();
					up=userProjectList.get(i);
					System.out.println("DELETEING ID >>>>>>>"+ Long.parseLong(up.getId().toString()));				
					//makeTransientByID(long (plg.getId());			
					makeTransientByID(Long.parseLong(up.getId().toString()));
				}
		}
	}
	*/
	

	
	
}
