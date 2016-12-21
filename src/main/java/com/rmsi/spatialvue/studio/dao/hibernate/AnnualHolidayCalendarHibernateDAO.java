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

import com.rmsi.spatialvue.studio.dao.AnnualHolidayCalendarDAO;
import com.rmsi.spatialvue.studio.domain.AnnualHolidayCalendar;

@Repository
public class AnnualHolidayCalendarHibernateDAO extends GenericHibernateDAO<AnnualHolidayCalendar, Long> implements
AnnualHolidayCalendarDAO {

	

	
	@SuppressWarnings("unchecked")
	public AnnualHolidayCalendar getAnnualHolidayById(Integer id) {
		
		List<AnnualHolidayCalendar> annualHolidayCalendar =
			getEntityManager().createQuery("Select ahc from AnnualHolidayCalendar ahc where ahc.id = :id").setParameter("id", id).getResultList();
		
		if(annualHolidayCalendar.size() > 0)
			return annualHolidayCalendar.get(0);
		else
			return null;
	}
	/*
	 
	@SuppressWarnings("unchecked")
	public boolean deleteUserByName(String user){
		
		try{
			Query query = getEntityManager().createQuery(
					"Delete from User u where u.name =:name")
					.setParameter("name", user);
			
			int count = query.executeUpdate();
			System.out.println("Delete User count: " + count);
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
*/

	@Override
	public void updateAnnualHoliday(Integer id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean deleteAnnualHolidayById(Integer id) {
		
		try{
			Query query = getEntityManager().createQuery(
					"Delete from AnnualHolidayCalendar hc where hc.id =:id")
					.setParameter("id", id);
			
			int count = query.executeUpdate();
			System.out.println("Delete Holiday count: " + count);
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
