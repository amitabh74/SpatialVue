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

import com.rmsi.spatialvue.studio.dao.Warden_AreaDAO;
import com.rmsi.spatialvue.studio.domain.ResponsibleDepartmentLkp;
import com.rmsi.spatialvue.studio.domain.Warden_Area;

@Repository
public class Warden_AreaHibernateDAO extends GenericHibernateDAO<Warden_Area, Long> implements
Warden_AreaDAO {

	@Override
	public List<Warden_Area> getAllWardenArea() {
		@SuppressWarnings("unchecked")
		List<Warden_Area> wardenArea = getEntityManager().createQuery("Select wa from Warden_Area wa order by wa.wardenArea").getResultList();
		return wardenArea;
	}

	
	/*@SuppressWarnings("unchecked")
	public ClassLkp getClassLkpByGid(Integer gid) {
		List<ClassLkp> listPath =
			getEntityManager().createQuery("Select distinct rp from RoW_Path rp where rp.gid = :gid").setParameter("gid", gid).getResultList();		
		if(listPath.size() > 0)
		{			
			return listPath.get(0);
		}
		else
			return null;
	}*/
}
