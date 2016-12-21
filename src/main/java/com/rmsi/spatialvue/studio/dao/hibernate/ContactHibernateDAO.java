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

import com.rmsi.spatialvue.studio.dao.ContactDAO;
import com.rmsi.spatialvue.studio.domain.Contact;

/**
 * @author Saurabh.mehta
 * 
 */

@Repository
public class ContactHibernateDAO extends GenericHibernateDAO<Contact, Long> implements
ContactDAO {

	@Override
	@SuppressWarnings("unchecked")
	public List<Contact> getAllContact() {
		// TODO Auto-generated method stub
		
		List<Contact> listContact= getEntityManager().createQuery("Select al from Contact al").getResultList();
		return listContact;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<Contact> getContactByRowID(String row_id) {
	
		List<Contact> listContact =getEntityManager().createQuery("Select c from Contact c, AccessLandContact alc,Access_Land_polygon alp where alc.accessLandPolygon.rowid=:rowid and alc.contact.contactid=c.contactid").setParameter("rowid", row_id).getResultList();
		return listContact;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<Contact> getContactListInOrder(){
		List<Contact> listContact= getEntityManager().createQuery("Select c from Contact c where c.active=true order by c.firstName").getResultList();
		return listContact;
	}

	@Override
	public Contact getContactByContactID(Integer id) {
		List<Contact> listContact =
			getEntityManager().createQuery("Select c from Contact c where c.contactid = :id ").setParameter("id", id).getResultList();
		if(listContact.size() > 0)
			return listContact.get(0);
		else
			return null;
	}
	
	@SuppressWarnings("unchecked")
	public boolean deleteContactByName(String id){
		
		/*try{
			Query query = getEntityManager().createQuery(
					"Delete from Contact c where c.contactid =:id")
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
		}*/
		return false;
		
	}
	@SuppressWarnings("unchecked")
	@Override
	public Contact findContactByEmail(String email) {
		List<Contact> listContact =
			getEntityManager().createQuery("Select c from Contact c where c.email = :email ").setParameter("email", email).getResultList();
		
		if(listContact.size() > 0)
			return listContact.get(0);
		else
			return null;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<String> getContactCompaniesByType(int typeId){
		List<String> companies =
			getEntityManager().createQuery(
			"Select distinct(c.company) from Contact c where c.contactTypeLkp.contacttypeid = :id and c.active = true order by company")
			.setParameter("id", typeId).getResultList();
		
		return companies;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Contact> findContactByCompany(String company, int typeid){
		List<Contact> companies = null;
		//System.out.println("----Company Name: " + company + "  typeId: " + typeid);
		if(company.equalsIgnoreCase("_blank")){
			//System.out.println("----executing query--------");
			 companies =
				getEntityManager().createQuery(
				"Select c from Contact c where (c.company IS NULL or c.company='') and " +
				"c.contactTypeLkp.contacttypeid = :id and c.active = true")
				.setParameter("id", typeid)
				.getResultList();
		}else{
			companies =
				getEntityManager().createQuery(
				"Select c from Contact c where c.active = true and c.company = :companyName and " +
				"c.contactTypeLkp.contacttypeid = :id")
				.setParameter("companyName", company)
				.setParameter("id", typeid)
				.getResultList();
		}
		return companies;
	}
	
	public boolean blockContactById(int contactId){
		Query query = getEntityManager().createQuery("Update Contact c set c.active = false where " +
				"c.contactid = :contactid").setParameter("contactid", contactId);
		
		int value = query.executeUpdate();
		if(value > 0){
			return true;
		}else{
			return false;
		}
		
	}
}
