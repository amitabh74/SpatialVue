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

import com.rmsi.spatialvue.studio.dao.FurnitureTypeLkpDAO;
import com.rmsi.spatialvue.studio.domain.FurnitureTypeLkp;

@Repository
public class FurnitureTypeLkpHibernateDAO extends GenericHibernateDAO<FurnitureTypeLkp, Long> implements
FurnitureTypeLkpDAO{

	@Override
	@SuppressWarnings("unchecked")
	public List<FurnitureTypeLkp> getAllFurnitureType() {
		// TODO Auto-generated method stub
		
		List<FurnitureTypeLkp> listFurnitureTypeLkp = getEntityManager().createQuery("Select frt from FurnitureTypeLkp frt").getResultList();
		return listFurnitureTypeLkp;
	}

	@SuppressWarnings("unchecked")
	public FurnitureTypeLkp getFurnitureTypeById(Integer id) {
		List<FurnitureTypeLkp> furnitureTypeLkp =
			getEntityManager().createQuery("Select frt from FurnitureTypeLkp frt where frt.typeid = :id").setParameter("id", id).getResultList();		
		if(furnitureTypeLkp.size() > 0)
		{			
			return furnitureTypeLkp.get(0);
		}
		else
			return null;
	}
	
	@SuppressWarnings("unchecked")
	public List<FurnitureTypeLkp> getFurnitureTypeByOrder(String lang){
		List<FurnitureTypeLkp> listFurnitureTypeLkp = null;
		if(lang.equalsIgnoreCase("en")){
			listFurnitureTypeLkp = getEntityManager().createQuery("Select t from FurnitureTypeLkp t order by t.type").getResultList();
			return listFurnitureTypeLkp;
		}else{
			listFurnitureTypeLkp = getEntityManager().createQuery("Select t from FurnitureTypeLkp t order by t.math").getResultList();
			return listFurnitureTypeLkp;
		}
	}
	
}
