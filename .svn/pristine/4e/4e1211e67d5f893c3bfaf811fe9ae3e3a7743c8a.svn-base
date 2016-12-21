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

package com.rmsi.spatialvue.studio.web.mvc;

import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.domain.AnnualHolidayCalendar;
import com.rmsi.spatialvue.studio.domain.Project;
import com.rmsi.spatialvue.studio.domain.Role;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.service.AnnualHolidayCalendarService;
import com.rmsi.spatialvue.studio.service.UserService;

/**
 * @author Aparesh.Chakraborty
 *
 */
@Controller
public class AnnualHolidayCalendarController {

	@Autowired
	AnnualHolidayCalendarService annualHolidayCalendarService;
	
	@RequestMapping(value = "/studio/annualholiday/", method = RequestMethod.GET)
	@ResponseBody
    public List<AnnualHolidayCalendar> getAnnualHolidays(){
		return 	annualHolidayCalendarService.getAnnualHolidays();	
		//return null;
	}
	
	
	@RequestMapping(value = "/studio/annualholiday/{id}", method = RequestMethod.GET)
	@ResponseBody
    public AnnualHolidayCalendar getAnnualHolidayById(@PathVariable String id){		
		System.out.println("------------annualholiday:"+ id);
		AnnualHolidayCalendar annualHoliday=annualHolidayCalendarService.getAnnualHolidayById(Integer.parseInt(id));
		
		return 	annualHoliday;	
		
	}    
	
	@RequestMapping(value = "/studio/annualholiday/delete/{id}", method = RequestMethod.GET)
	@ResponseBody
    public boolean deleteAnnualHolidayById(@PathVariable String id){
		return annualHolidayCalendarService.deleteAnnualHolidayById(Integer.parseInt(id));
		
		//AnnualHolidayCalendar annualHolidayCalendar=annualHolidayCalendarService.getAnnualHolidayById(Integer.parseInt(id));
		//annualHolidayCalendarService.deleteAnnualHoliday(annualHolidayCalendar);
		
	}
	
	@RequestMapping(value = "/studio/annualholiday/create", method = RequestMethod.POST)
	@ResponseBody
    public void createAnnualHoliday(HttpServletRequest request, HttpServletResponse response){
		AnnualHolidayCalendar annualHolidayCalendar = new AnnualHolidayCalendar();
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date holidayDate=null;
		try{		

			
			//annualHolidayCalendar.setId(new Integer(ServletRequestUtils
			//		.getRequiredStringParameter(request, "Id")));
			
			String expDateStr=ServletRequestUtils
			.getRequiredStringParameter(request, "holidayDate");							
			
			holidayDate= df.parse(expDateStr); 
			
			annualHolidayCalendar.setHolidayDate(holidayDate);
			
			annualHolidayCalendar.setHolidayOccassion(ServletRequestUtils
					.getRequiredStringParameter(request, "holidayOccassion"));
			
			annualHolidayCalendar.setHolidayType(ServletRequestUtils
					.getRequiredStringParameter(request, "holidayType"));
			
			annualHolidayCalendarService.createAnnualHoliday(annualHolidayCalendar);
			
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		
		
		
	}
	
	@RequestMapping(value = "/studio/annualholiday/edit", method = RequestMethod.POST)
	@ResponseBody
    public void editannualholiday(HttpServletRequest request, HttpServletResponse response){
		String id="";
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date holidayDate=null;
		try{	
		id=ServletRequestUtils.getRequiredStringParameter(request, "hid-id");
		
		AnnualHolidayCalendar annualHolidayCalendar=annualHolidayCalendarService.getAnnualHolidayById(Integer.parseInt(id));
		
		String expDateStr=ServletRequestUtils
		.getRequiredStringParameter(request, "holidayDate");							
		
		holidayDate= df.parse(expDateStr); 
		
		annualHolidayCalendar.setHolidayDate(holidayDate);
		
		annualHolidayCalendar.setHolidayOccassion(ServletRequestUtils
				.getRequiredStringParameter(request, "holidayOccassion"));
		
		annualHolidayCalendar.setHolidayType(ServletRequestUtils
				.getRequiredStringParameter(request, "holidayType"));
		
		System.out.println("********"+annualHolidayCalendar.getId() );
		System.out.println("********"+annualHolidayCalendar.getHolidayOccassion());
		System.out.println("********"+annualHolidayCalendar.getHolidayType());
		System.out.println("********"+annualHolidayCalendar.getHolidayDate());
		
		annualHolidayCalendarService.createAnnualHoliday(annualHolidayCalendar);
		
		
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		
		//annualHolidayCalendarService.updateUser(user);	
	}
	
	

}