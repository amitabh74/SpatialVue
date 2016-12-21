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

import com.rmsi.spatialvue.studio.dao.ProjectBaselayerDAO;
import com.rmsi.spatialvue.studio.dao.ProjectDAO;
import com.rmsi.spatialvue.studio.dao.ProjectLayergroupDAO;
import com.rmsi.spatialvue.studio.dao.UserProjectDAO;
import com.rmsi.spatialvue.studio.dao.UserRoleDAO;
import com.rmsi.spatialvue.studio.domain.Bookmark;
import com.rmsi.spatialvue.studio.domain.LayerField;
import com.rmsi.spatialvue.studio.domain.Project;
import com.rmsi.spatialvue.studio.domain.ProjectBaselayer;
import com.rmsi.spatialvue.studio.domain.ProjectLayergroup;
import com.rmsi.spatialvue.studio.domain.Unit;
import com.rmsi.spatialvue.studio.domain.UserProject;
import com.rmsi.spatialvue.studio.domain.UserRole;


@Repository
public class ProjectBaselayerHibernateDAO extends GenericHibernateDAO<ProjectBaselayer, Long>
		implements ProjectBaselayerDAO {

	@Override
	public void deleteProjectBaselayer(String name) {
		
		try{
			Query query = getEntityManager().createQuery(
					"Delete from ProjectBaselayer pbl where pbl.projectBean.name =:name")
					.setParameter("name", name);
			
			int count = query.executeUpdate();
			System.out.println("Deleted count: " + count+"-"+name);
			
		}catch(Exception e){
			e.printStackTrace();
			
		}
		
		
		
	}

	@Override
	public void addProjectBaselayer(Set<ProjectBaselayer> projectBaselayer,String projectname) {
		
		
		//Delete the existing record
		/*Iterator iter = projectBaselayer.iterator();
	    while (iter.hasNext()) {
	      
	    	ProjectBaselayer pbl=new ProjectBaselayer();
	    	pbl=(ProjectBaselayer) iter.next();
	    	deleteProjectBaselayer(pbl.getProjectBean().getName());	    	
	    }
		*/
		
		deleteProjectBaselayer(projectname);	 
		
		//inser new record
	    Iterator iter1 = projectBaselayer.iterator();
	    while (iter1.hasNext()) {
	      
	    	ProjectBaselayer pbl=new ProjectBaselayer();
	    	pbl=(ProjectBaselayer) iter1.next();	    	
	    	makePersistent(pbl);
	    	//System.out.println(iter.next());
	    }
		
		
		
	}


		
	
}
