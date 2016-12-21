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

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.ContactTypeDAO;
import com.rmsi.spatialvue.studio.domain.ContactTypeLkp;

/**
 * @author Saurabh.mehta
 * 
 */

@Repository
public class ContactTypeHibernateDAO extends GenericHibernateDAO<ContactTypeLkp, Long> implements
ContactTypeDAO {

	@Override
	@SuppressWarnings("unchecked")
	public List<ContactTypeLkp> getAllContactType() {
		// TODO Auto-generated method stub
		
		List<ContactTypeLkp> listContactTypeLkp= getEntityManager().createQuery("Select al from ContactTypeLkp al order by al.contactType").getResultList();
		return listContactTypeLkp;
	}
	
	public ContactTypeLkp getContactTypeByID(Integer id){
		List<ContactTypeLkp> listContactTypeLkp= getEntityManager().createQuery("Select al from ContactTypeLkp al where al.contacttypeid = :id").setParameter("id", id).getResultList();
		if (listContactTypeLkp.size() > 0) {
			return listContactTypeLkp.get(0);
		} else
			return null;
	}
}
