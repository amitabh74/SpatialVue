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
import com.rmsi.spatialvue.studio.dao.FurnitureDAO;
import com.rmsi.spatialvue.studio.domain.Access_Land_polygon;
import com.rmsi.spatialvue.studio.domain.Furniture;


@Repository
public class FurnitureHibernateDAO extends GenericHibernateDAO<Furniture, Long> implements
FurnitureDAO {

	@SuppressWarnings("unchecked")
	public Furniture getFurnitureByGid(Integer gid) {
		List<Furniture> furniturePoint =
			getEntityManager().createQuery("Select frn from Furniture frn where frn.gid = :gid").setParameter("gid", gid).getResultList();		
		if(furniturePoint.size() > 0)
		{			
			return furniturePoint.get(0);
		}
		else
			return null;
	}

	@SuppressWarnings("unchecked")
	public Furniture getPreviousFurniture(Integer gid, String furnitureid) {
		
		Furniture furniturePoint= new Furniture();
		try{
			furniturePoint =
			(Furniture) getEntityManager().createQuery("Select frn from Furniture frn where frn.furnitureid = :furnitureid and frn.ishistory = true and frn.gid < :gid ORDER BY gid DESC").setParameter("furnitureid", furnitureid).setParameter("gid", gid).setMaxResults(1).getSingleResult();
		}
		catch(Exception e){
			
		}
		
			return furniturePoint;
			
	}
											
	@SuppressWarnings("unchecked")
	public Furniture getNextFurniture(Integer gid, String furnitureid) {
		
		Furniture furniturePoint= new Furniture();
		try{
		furniturePoint =
			(Furniture) getEntityManager().createQuery("Select frn from Furniture frn where frn.furnitureid = :furnitureid and frn.ishistory = true and frn.gid > :gid ORDER BY gid ASC").setParameter("furnitureid", furnitureid).setParameter("gid", gid).setMaxResults(1).getSingleResult();
		}
		catch(Exception e){
			
		}
			return furniturePoint;
	}

	@Override
	public boolean updateFurnitureHistoryById(Integer gid, String furnitureid, Integer fid) {
		try{

			Query query = getEntityManager().createQuery("update Furniture frn set frn.ishistory = true where frn.gid = :gid");			
			query.setParameter("gid", gid);
									
			int count = query.executeUpdate();
			
			Query furnitureid_query = getEntityManager().createQuery("update Furniture frn set frn.furnitureid = :furnitureid where frn.gid = :fid");			
			furnitureid_query.setParameter("fid", fid);
			furnitureid_query.setParameter("furnitureid", furnitureid);
									
			int count1 = furnitureid_query.executeUpdate();	
			
			
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
	public boolean updateFurnitureUnresolved(String furnitureid, boolean issueExists) {
		try{
			Query query = null;
			if(!issueExists){
				query = getEntityManager().createQuery("update Furniture frn set frn.unresolvedIssues = false where frn.furnitureid = :furnitureid and frn.ishistory = false");
			}else{
				query = getEntityManager().createQuery("update Furniture frn set frn.unresolvedIssues = true where frn.furnitureid = :furnitureid and frn.ishistory = false");
			}
			query.setParameter("furnitureid", furnitureid);
									
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
	
	@Override
	public List<Furniture> getFurnitureByRowID(String rowid) {
		List<Furniture> listfurniture =
			getEntityManager().createQuery("Select f from Furniture f where f.rowId = :rid and f.ishistory= false order by gid desc").setParameter("rid", rowid).getResultList();		
		return listfurniture;
	}
	
	@Override
	public List<Furniture> getFurnitureByFurnitureID(String furnitureid) {
		List<Furniture> listfurniture =
			getEntityManager().createQuery("Select f from Furniture f where f.furnitureid = :furnitureid and f.ishistory= false").setParameter("furnitureid", furnitureid).getResultList();		
		return listfurniture;
	}
}

