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

import com.rmsi.spatialvue.studio.dao.PathContactDAO;
import com.rmsi.spatialvue.studio.domain.PathContact;

@Repository
public class PathContactHibernateDAO extends GenericHibernateDAO<PathContact, Long> implements
PathContactDAO {

	@Override
	public PathContact getPathContactByContactID(Integer contactid) {
		List<PathContact> listcontact =
			getEntityManager().createQuery("Select pc from PathContact pc where pc.contact.contactid = :id").setParameter("id", contactid).getResultList();		
		if(listcontact.size() > 0)
		{			
			return listcontact.get(0);
		}
		else
			return null;
	}
	
	@Override
	public PathContact getPathContactByContactIDAndGID(Integer contactid,Integer gid) {
		List<PathContact> listcontact =
			getEntityManager().createQuery("Select pc from PathContact pc where pc.contact.contactid = :id and pc.rowPath.gid=:gid").setParameter("id", contactid).setParameter("gid", gid).getResultList();		
		if(listcontact.size() > 0)
		{			
			return listcontact.get(0);
		}
		else
			return null;
	}

	@Override
	public boolean deletePathContactByID(Integer id) {
	try{
				Query query = getEntityManager().createQuery(
						"Delete from PathContact pc where pc.pathContactsId =:id")
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

	@Override
	public boolean deletePathContactByIDAndGID(Integer id, Integer gid) {
		try{
			Query query = getEntityManager().createQuery(
					"Delete from PathContact pc where pc.rowPath.gid =:gid and pc.contact.contactid=:id")
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

}
