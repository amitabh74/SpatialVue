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

import com.rmsi.spatialvue.studio.dao.FurnitureContactDAO;
import com.rmsi.spatialvue.studio.dao.IssueContactDAO;
import com.rmsi.spatialvue.studio.domain.FurnitureContact;
import com.rmsi.spatialvue.studio.domain.IssueContact;

@Repository
public class IssueContactHibernateDAO  extends GenericHibernateDAO<IssueContact, Long> implements
IssueContactDAO{

	@Override
	public boolean deleteIssueContactByIDAndGID(Integer id, Integer gid) {
		try{
			Query query = getEntityManager().createQuery(
					"Delete from IssueContact ic where ic.issueGid =:gid and ic.contact.contactid=:id")
					.setParameter("id", id).setParameter("gid", gid);		
			
			int count = query.executeUpdate();
			System.out.println("Delete Contact count: " + count);
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
	public boolean deleteIssueContactByID(Integer id) {
		
		try{
			Query query = getEntityManager().createQuery(
					"Delete from IssueContact ic where ic.issueContactsId =:id")
					.setParameter("id", id);
			
			int count = query.executeUpdate();
			System.out.println("Delete Contact count: " + count);
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
	public IssueContact getIssueContactByContactID(Integer contactid) {
		
		List<IssueContact> issueContact =
			getEntityManager().createQuery("Select ic from IssueContact ic where ic.contact.contactid = :id").setParameter("id", contactid).getResultList();		
		if(issueContact.size() > 0)
		{			
			return issueContact.get(0);
		}
		else
			return null;
	}

	@SuppressWarnings("unchecked")
	public IssueContact getIssueContactByContactIDAndGID(Integer contactid,
			Integer gid) {
		List<IssueContact> issueContact =
			getEntityManager().createQuery("Select ic from IssueContact ic where ic.contact.contactid = :id and ic.issueGid=:gid").setParameter("id", contactid).setParameter("gid", gid).getResultList();		
		if(issueContact.size() > 0)
		{			
			return issueContact.get(0);
		}
		else
			return null;
	}

	

	
}
