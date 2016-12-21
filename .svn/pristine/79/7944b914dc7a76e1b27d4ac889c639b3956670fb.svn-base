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
import java.util.Set;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.AccessLandDAO;
import com.rmsi.spatialvue.studio.dao.AccessLandTypeLkpDAO;
import com.rmsi.spatialvue.studio.dao.AnnualHolidayCalendarDAO;
import com.rmsi.spatialvue.studio.dao.SurfaceConditionLkpDAO;
import com.rmsi.spatialvue.studio.dao.SurfaceTypeLkpDAO;
import com.rmsi.spatialvue.studio.domain.AccessLandTypeLkp;
import com.rmsi.spatialvue.studio.domain.Access_Land_polygon;
import com.rmsi.spatialvue.studio.domain.AnnualHolidayCalendar;
import com.rmsi.spatialvue.studio.domain.SurfaceConditionLkp;
import com.rmsi.spatialvue.studio.domain.SurfaceTypeLkp;

@Repository
public class SurfaceConditionLkpHibernateDAO extends GenericHibernateDAO<SurfaceConditionLkp, Long> implements
SurfaceConditionLkpDAO{

	@Override
	@SuppressWarnings("unchecked")
	public List<SurfaceConditionLkp> getAllSurfaceConditionType() {
		// TODO Auto-generated method stub
		
		List<SurfaceConditionLkp> listsurfaceConditionLkp = getEntityManager().createQuery("Select scl from SurfaceConditionLkp scl").getResultList();
		return listsurfaceConditionLkp;
	}

	@SuppressWarnings("unchecked")
	public SurfaceConditionLkp getSurfaceConditionById(Integer id) {
		List<SurfaceConditionLkp> surfaceConditionLkp =
			getEntityManager().createQuery("Select scl from SurfaceConditionLkp scl where scl.conditionid = :id").setParameter("id", id).getResultList();		
		if(surfaceConditionLkp.size() > 0)
		{			
			return surfaceConditionLkp.get(0);
		}
		else
			return null;
	}
	
}
