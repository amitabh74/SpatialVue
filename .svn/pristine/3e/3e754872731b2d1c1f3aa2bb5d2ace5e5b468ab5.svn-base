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
import com.rmsi.spatialvue.studio.dao.SurfaceDAO;
import com.rmsi.spatialvue.studio.domain.Surface;


@Repository
public class SurfaceHibernateDAO extends GenericHibernateDAO<Surface, Long> implements
SurfaceDAO {

	@SuppressWarnings("unchecked")
	public Surface getSurfaceByGid(Integer gid) {
		List<Surface> SurfaceMultline =
			getEntityManager().createQuery("Select srf from Surface srf where srf.gid = :gid").setParameter("gid", gid).getResultList();		
		if(SurfaceMultline.size() > 0)
		{			
			return SurfaceMultline.get(0);
		}
		else
			return null;
	}

	@SuppressWarnings("unchecked")
	public Surface getPreviousSurface(Integer gid, String surfaceid) {
		
		Surface SurfaceMultline= new Surface();
		try{
			SurfaceMultline =
			(Surface) getEntityManager().createQuery("Select srf from Surface srf where srf.surfaceid = :surfaceid and srf.ishistory = true and srf.gid < :gid ORDER BY gid DESC").setParameter("surfaceid", surfaceid).setParameter("gid", gid).setMaxResults(1).getSingleResult();
		}
		catch(Exception e){
			
		}
		
			return SurfaceMultline;
			
	}
											
	@SuppressWarnings("unchecked")
	public Surface getNextSurface(Integer gid, String surfaceid) {
		
		Surface SurfaceMultline= new Surface();
		try{
			SurfaceMultline =
			(Surface) getEntityManager().createQuery("Select srf from Surface srf where surfaceid = :surfaceid and srf.ishistory = true and srf.gid > :gid ORDER BY gid ASC").setParameter("surfaceid", surfaceid).setParameter("gid", gid).setMaxResults(1).getSingleResult();
		}
		catch(Exception e){
			
		}
			return SurfaceMultline;
	}

	@Override
	public boolean updateSurfaceHistoryById(Integer gid, String surfaceid, Integer fid) {
		try{

			//updating histiry field for old record
			Query query = getEntityManager().createQuery("update Surface srf set srf.ishistory = true where srf.gid = :gid");			
			query.setParameter("gid", gid);
									
			int count = query.executeUpdate();
			
			Query surfaceid_query = getEntityManager().createQuery("update Surface srf set srf.surfaceid = :surfaceid where srf.gid = :fid");			
			surfaceid_query.setParameter("fid", fid);
			surfaceid_query.setParameter("surfaceid", surfaceid);
									
			int count1 = surfaceid_query.executeUpdate();			

			if(count > 0 && count1 > 0){
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
	public List<Surface> getSurfaceByRowID(String rowid) {
		List<Surface> listSurface =
			getEntityManager().createQuery("Select srf from Surface srf where srf.rowId = :rid and srf.ishistory= false").setParameter("rid", rowid).getResultList();		
		return listSurface;
	}
	
	@Override
	public boolean updateSurfaceUnresolved(String surfaceid, boolean issueStatus) {
		try{
			Query query = null;
			if(! issueStatus){
				query = getEntityManager().createQuery("update Surface srf set srf.unresolvedStatus = false where srf.surfaceid = :surfaceid and srf.ishistory = false");
			}else{
				query = getEntityManager().createQuery("update Surface srf set srf.unresolvedStatus = true where srf.surfaceid = :surfaceid and srf.ishistory = false");
			}
			query.setParameter("surfaceid", surfaceid);
									
			int count = query.executeUpdate();
			
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
