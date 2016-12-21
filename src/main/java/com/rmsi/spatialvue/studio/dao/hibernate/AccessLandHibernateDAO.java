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
import com.rmsi.spatialvue.studio.dao.AnnualHolidayCalendarDAO;
import com.rmsi.spatialvue.studio.domain.Access_Land_polygon;
import com.rmsi.spatialvue.studio.domain.AnnualHolidayCalendar;

@Repository
public class AccessLandHibernateDAO extends GenericHibernateDAO<Access_Land_polygon, Long> implements
AccessLandDAO {

	
	@SuppressWarnings("unchecked")
	public Access_Land_polygon getAccessLandByGid(Integer gid) {
		List<Access_Land_polygon> accessLandpolygon =
			getEntityManager().createQuery("Select alp from Access_Land_polygon alp where alp.gid = :gid").setParameter("gid", gid).getResultList();		
		if(accessLandpolygon.size() > 0)
		{			
			return accessLandpolygon.get(0);
		}
		else
			return new Access_Land_polygon();
	}

	@SuppressWarnings("unchecked")
	public Access_Land_polygon getPreviousAccessLand(Integer gid, String rowid) {
		
		Access_Land_polygon accessLandpolygon= new Access_Land_polygon();
		try{
		accessLandpolygon =
			(Access_Land_polygon) getEntityManager().createQuery("Select alp from Access_Land_polygon alp where alp.rowid = :rowid and alp.isHistory = true and alp.gid < :gid ORDER BY gid DESC").setParameter("rowid", rowid).setParameter("gid", gid).setMaxResults(1).getSingleResult();
		}
		catch(Exception e){
			
		}
		
			return accessLandpolygon;
			
	}
											
	@SuppressWarnings("unchecked")
	public Access_Land_polygon getNextAccessLand(Integer gid, String rowid) {
		
		Access_Land_polygon accessLandpolygon= new Access_Land_polygon();
		try{
		accessLandpolygon =
			(Access_Land_polygon) getEntityManager().createQuery("Select alp from Access_Land_polygon alp where alp.rowid = :rowid and alp.isHistory = true and alp.gid > :gid ORDER BY gid ASC").setParameter("rowid", rowid).setParameter("gid", gid).setMaxResults(1).getSingleResult();
		}
		catch(Exception e){
			
		}
		
			return accessLandpolygon;
		
		
		
	}

	@Override
	public boolean updateAccessLandHistoryById(Integer gid) {
		try{
			
			
			
			Query query = getEntityManager().createQuery("update Access_Land_polygon alp set alp.isHistory = true where alp.gid = :gid");			
			
			query.setParameter("gid", gid);
									
			int count = query.executeUpdate();
			System.out.println("Update TaskScheduler count: " + count);
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
	public boolean updateUnresovledStatus(String layer, Integer gid) {
		
		String qryString="";
		
		if(layer.equalsIgnoreCase("Access_Land")){
			qryString="update Access_Land_polygon alp set alp.unresolvedStatus = true where alp.gid = :gid";
		}
		
		else if(layer.equalsIgnoreCase("Furniture")){	
			qryString="update Furniture fur set fur.unresolvedIssues = true where fur.gid = :gid";
			
		}
		else if(layer.equalsIgnoreCase("Surface")){
		
			qryString="update Surface s set s.unresolvedStatus = true where s.gid = :gid";
		}
		
		
		try{
						
			Query query = getEntityManager().createQuery(qryString);			
			
			query.setParameter("gid", gid);
									
			int count = query.executeUpdate();
			System.out.println("Update  count: " + count);
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
