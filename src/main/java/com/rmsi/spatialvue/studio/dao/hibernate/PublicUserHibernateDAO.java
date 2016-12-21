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

import com.rmsi.spatialvue.studio.dao.PublicUserDAO;
import com.rmsi.spatialvue.studio.domain.Complaint_Nature_Lkp;
import com.rmsi.spatialvue.studio.domain.PublicUser;


@Repository
public class PublicUserHibernateDAO extends GenericHibernateDAO<PublicUser, Long>
		implements PublicUserDAO {

	@SuppressWarnings("unchecked")
	@Override
	public PublicUser findByName(String name) {
		
		List<PublicUser> publicuser =
			getEntityManager().createQuery("Select u from PublicUser u where u.name = :name").setParameter("name", name).getResultList();
		
		if(publicuser.size() > 0)
			return publicuser.get(0);
		else
			return null;
		
	}

	@Override
	public boolean deletePublic_UserByName(String email) {
		try {
			String qry = "Delete from PublicUser pc where pc.email =:name";
			Query query = getEntityManager().createQuery(qry)
					.setParameter("name", email);
			System.out.println("PublicUserHibernateDao: " + qry);
			int count = query.executeUpdate();
			System.out.println("Delete PublicUser count: " + count);
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
	public void addPublicUser(PublicUser user) {
		// TODO Auto-generated method stub
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Complaint_Nature_Lkp> findAllComplaintEnqueries() {
		// TODO Auto-generated method stub
		return (List<Complaint_Nature_Lkp>)getEntityManager().createQuery("Select ce from Complaint_Nature_Lkp ce").getResultList();
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public PublicUser findPublicUserbyID(Integer complainantId) {
		
		List<PublicUser> publicuser =
			getEntityManager().createQuery("Select u from PublicUser u where u.complainantid = :complainantid").setParameter("complainantid", complainantId).getResultList();
		
		if(publicuser.size() > 0)
			return publicuser.get(0);
		else
			return null;
		
	}
	@SuppressWarnings("unchecked")
	public List<PublicUser> getAllPublicUsers(){
		return getEntityManager().createQuery("Select u from PublicUser u order by u.name").getResultList();
	}
	

	@SuppressWarnings("unchecked")
	@Override
	public PublicUser findByEmail(String email) {
		
		List<PublicUser> publicuser =
			getEntityManager().createQuery("Select u from PublicUser u where u.email = :email").setParameter("email", email).getResultList();
		
		if(publicuser.size() > 0)
			return publicuser.get(0);
		else
			return null;
		
	}

}
