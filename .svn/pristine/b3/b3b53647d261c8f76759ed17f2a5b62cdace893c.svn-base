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
import com.rmsi.spatialvue.studio.dao.RoleDAO;
import com.rmsi.spatialvue.studio.domain.Role;
import com.rmsi.spatialvue.studio.domain.SnpaRole;
import com.rmsi.spatialvue.studio.domain.Unit;

/**
 * @author Aparesh.Chakraborty
 * 
 */

@Repository
public class RoleHibernateDAO extends GenericHibernateDAO<Role, Long> implements
		RoleDAO {

	@SuppressWarnings("unchecked")
	public Role findByName(String name) {

		List<Role> role = getEntityManager()
				.createQuery("Select r from Role r where r.name = :name")
				.setParameter("name", name).getResultList();

		if (role.size() > 0)
			return role.get(0);
		else
			return null;
	}

	@SuppressWarnings("unchecked")
	public boolean deleteRole(String name) {

		try {
			Query query = getEntityManager().createQuery(
					"Delete from Role r where r.name =:name").setParameter(
					"name", name);

			int count = query.executeUpdate();
			System.out.println("Delete count ROLE: " + count);
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

	@SuppressWarnings("unchecked")
	public List<SnpaRole> getSnpaRole() {
		List<SnpaRole> snpaRole = getEntityManager().createQuery("Select sr from SnpaRole sr").getResultList();
		return snpaRole;
	}
}
