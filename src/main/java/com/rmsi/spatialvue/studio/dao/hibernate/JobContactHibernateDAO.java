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

import com.rmsi.spatialvue.studio.dao.JobContactDAO;
import com.rmsi.spatialvue.studio.domain.JobContact;

@Repository
public class JobContactHibernateDAO  extends GenericHibernateDAO<JobContact, Long> implements
JobContactDAO{

	@Override
	public JobContact getJobContactByContactID(Integer contactid) {
		List<JobContact> listcontact =
			getEntityManager().createQuery("Select jc from JobContact jc where jc.contact.contactid = :id").setParameter("id", contactid).getResultList();		
		if(listcontact.size() > 0)
		{			
			return listcontact.get(0);
		}
		else
			return null;
	}
	
	@Override
	public JobContact getJobContactByContactIDAndjobid(Integer contactid,Integer jobid) {
		List<JobContact> listcontact =
			getEntityManager().createQuery("Select jc from JobContact jc where jc.contact.contactid = :id and jc.job.jobid=:gid").setParameter("id", contactid).setParameter("gid", jobid).getResultList();		
		if(listcontact.size() > 0)
		{			
			return listcontact.get(0);
		}
		else
			return null;
	}
	@Override
	public boolean deleteJobContactByID(Integer id) {
	try{
				Query query = getEntityManager().createQuery(
						"Delete from JobContact jc where jc.jobContactId =:id")
						.setParameter("id", id);
				
				int count = query.executeUpdate();
				//System.out.println("Delete Contact count: " + count);
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
	public boolean deleteJobContactByIDAndjobid(Integer id, Integer jobid) {
		try{
			Query query = getEntityManager().createQuery(
					"Delete from JobContact jc where jc.job.jobid =:jobid and jc.contact.contactid=:id")
					.setParameter("id", id).setParameter("jobid", jobid);		
			
			int count = query.executeUpdate();
			//System.out.println("Delete Contact count: " + count);
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
	
}
