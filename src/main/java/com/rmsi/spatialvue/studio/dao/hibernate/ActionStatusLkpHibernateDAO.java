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
import com.rmsi.spatialvue.studio.dao.ActionStatusLkpDAO;
import com.rmsi.spatialvue.studio.dao.AnnualHolidayCalendarDAO;
import com.rmsi.spatialvue.studio.dao.IssueTypeLkpDAO;
import com.rmsi.spatialvue.studio.dao.IssueUrgencyLkpDAO;
import com.rmsi.spatialvue.studio.domain.AccessLandTypeLkp;
import com.rmsi.spatialvue.studio.domain.Access_Land_polygon;
import com.rmsi.spatialvue.studio.domain.ActionStatusLkp;
import com.rmsi.spatialvue.studio.domain.AnnualHolidayCalendar;
import com.rmsi.spatialvue.studio.domain.IssueTypeLkp;
import com.rmsi.spatialvue.studio.domain.IssueUrgencyLkp;

@Repository
public class ActionStatusLkpHibernateDAO extends GenericHibernateDAO<ActionStatusLkp, Long> implements
ActionStatusLkpDAO {

	@SuppressWarnings("unchecked")
	public List<ActionStatusLkp> getAllActionStatusLkp() {
		List<ActionStatusLkp> actionStatusLkp = getEntityManager().createQuery("Select ac from ActionStatusLkp ac").getResultList();
		return actionStatusLkp;
	}

	@SuppressWarnings("unchecked")
	public ActionStatusLkp getActionStatusLkpById(Integer id) {
		List<ActionStatusLkp> actionStatusLkp =
			getEntityManager().createQuery("Select ac from ActionStatusLkp ac where ac.actionstatusid = :id").setParameter("id", id).getResultList();		
		if(actionStatusLkp.size() > 0)
		{			
			return actionStatusLkp.get(0);
		}
		else
			return null;
	}

	
	
	

}

	

	
	
	

