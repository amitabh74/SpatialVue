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

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.JobUserDAO;
import com.rmsi.spatialvue.studio.domain.JobUser;

@Repository
public class JobUserHibernateDAO  extends GenericHibernateDAO<JobUser, Long> implements
JobUserDAO{

	@Override
	public JobUser getJobUserByUserID(Integer userid) {
		List<JobUser> listuser =
			getEntityManager().createQuery("Select ju from JobUser ju where ju.user.id = :id").setParameter("id", userid).getResultList();		
		if(listuser.size() > 0)
		{			
			return listuser.get(0);
		}
		else
			return null;
	}
	
	@Override
	public JobUser getJobUserByjobID(Integer jobid) {
		List<JobUser> listuser =
			getEntityManager().createQuery("Select ju from JobUser ju where ju.job.jobid = :jobid").setParameter("jobid", jobid).getResultList();		
		if(listuser.size() > 0)
		{			
			return listuser.get(0);
		}
		else
			return null;
	}
	@Override
	public JobUser getJobUserByUserIDAndGID(Integer userid,Integer jobid) {
		List<JobUser> listuser =
			getEntityManager().createQuery("Select ju from JobUser ju where ju.user.id = :id and ju.job.jobid=:jobid").setParameter("id", userid).setParameter("jobid", jobid).getResultList();		
		if(listuser.size() > 0)
		{			
			return listuser.get(0);
		}
		else
			return null;
	}
	

	@Override
	public boolean deleteJobUserByjobID(Integer jobid) {
		try{
			Query query = getEntityManager().createQuery(
					"Delete from JobUser ju where ju.job.jobid =:jobid")
					.setParameter("jobid", jobid);		
			
			int count = query.executeUpdate();
			//System.out.println("Delete Contact count: " + count);
			//if(count > 0){
				return true;
			//}else{
				//return false;
			//}
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
}
