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
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

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

import com.rmsi.spatialvue.studio.domain.AccessLandTypeLkp;
import com.rmsi.spatialvue.studio.domain.Access_Land_polygon;
import com.rmsi.spatialvue.studio.domain.AnnualHolidayCalendar;
import com.rmsi.spatialvue.studio.domain.Contact;
import com.rmsi.spatialvue.studio.domain.Project;
import com.rmsi.spatialvue.studio.domain.Role;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.service.AccessLandService;
import com.rmsi.spatialvue.studio.service.AnnualHolidayCalendarService;
import com.rmsi.spatialvue.studio.service.UserService;

/**
 * @author Aparesh.Chakraborty
 *
 */
@Controller
public class AccessLandController {

	@Autowired
	AccessLandService accessLandService;

	
	
	@RequestMapping(value = "/studio/accessland/edit", method = RequestMethod.POST)
	@ResponseBody
    public void editAccessLand(HttpServletRequest request, HttpServletResponse response){
		String gid="";
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date agreementDate=null;
		Date agreementEndDate=null;
		try{	
		gid=ServletRequestUtils.getRequiredStringParameter(request, "hid-accessandGid");
		System.out.println("Controller*******************"+ gid);
		//Access_Land_polygon accessLand=accessLandService.getAccessLandByGid((Integer.parseInt(gid)));
		Access_Land_polygon accessLand=new Access_Land_polygon();
				
		String agreementDateStr=ServletRequestUtils
		.getRequiredStringParameter(request, "agreement_date");							
		
		agreementDate= df.parse(agreementDateStr); 
		
		String agreementEndDateStr=ServletRequestUtils
		.getRequiredStringParameter(request, "agreement_end_date");							
		
		agreementEndDate= df.parse(agreementEndDateStr);
		
		accessLand.setRowid(ServletRequestUtils.getRequiredStringParameter(request, "row_id"));		
			
		accessLand.setAgreementDate(agreementDate);
		accessLand.setAgreementEndDate(agreementEndDate);
		accessLand.setAgreementReference(ServletRequestUtils.getRequiredStringParameter(request, "agreement_reference"));
		accessLand.setArea(Double.parseDouble(ServletRequestUtils.getRequiredStringParameter(request, "area")));
		accessLand.setAreaName(ServletRequestUtils.getRequiredStringParameter(request, "area_name"));
		accessLand.setNotes(ServletRequestUtils.getRequiredStringParameter(request, "notes"));		
		accessLand.setUnresolvedStatus(Boolean.parseBoolean(ServletRequestUtils.getRequiredStringParameter(request, "unresolved_status")));
		
		//accessLand.setGeom(accessLandService.getAccessLandByGid(Integer.parseInt(gid)).getGeom());
		
		accessLand.setAccessLandTypeLkp(accessLandService.getAccessLandTypeById(Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "type"))));
		accessLand.setContacts(accessLandService.getAccessLandByGid(Integer.parseInt(gid)).getContacts());
		
		accessLand.setIsHistory(false);
			
		/*System.out.println("********"+accessLand.getGid() );
		System.out.println("********"+accessLand.getRowid());
		System.out.println("********"+accessLand.getArea());
		System.out.println("********"+accessLand.getAreaName());
		System.out.println("********"+accessLand.getAgreementReference());
		System.out.println("********"+accessLand.getNotes());
		System.out.println("********"+accessLand.getAgreementDate());
		System.out.println("********"+accessLand.getAgreementEndDate());
		System.out.println("*********************************");
		System.out.println("********"+accessLand.getAccessLandTypeLkp().getTypeid());
		System.out.println("********"+accessLand.getAccessLandTypeLkp().getType());
		System.out.println("********"+accessLand.getIsHistory());*/
		
		
		accessLandService.createAccessLand(accessLand,new Integer(gid));
		
		
		}
		catch(Exception e){
			e.printStackTrace();
		}

	}
	
		@RequestMapping(value = "/studio/accessland/{gid}", method = RequestMethod.GET)
		@ResponseBody
	    public Access_Land_polygon accessLand(@PathVariable String gid){		
			Access_Land_polygon accessLand=accessLandService.getAccessLandByGid((Integer.parseInt(gid)));
			return 	accessLand;	
		}
		
		
		@RequestMapping(value = "/studio/accessland/type", method = RequestMethod.GET)
		@ResponseBody
	    public List<AccessLandTypeLkp> listAccessLand(){
			return 	accessLandService.findAllAccessLand();
		}
		
		@RequestMapping(value = "/studio/accessland/type/{id}", method = RequestMethod.GET)
		@ResponseBody
	    public AccessLandTypeLkp getAccessLandTypeById(@PathVariable String id){		
			AccessLandTypeLkp accessLandTypeLkp=accessLandService.getAccessLandTypeById((Integer.parseInt(id)));
			return 	accessLandTypeLkp;	
		}
		
		@RequestMapping(value = "/studio/accessland/{rowid}/prev/{gid}", method = RequestMethod.GET)
		@ResponseBody
	    public Access_Land_polygon getPreviousAccessLand(@PathVariable String rowid,@PathVariable String gid){		
			Access_Land_polygon accessLand=accessLandService.getPreviousAccessLand((Integer.parseInt(gid)),rowid);
			return 	accessLand;	
		}
		
		@RequestMapping(value = "/studio/accessland/{rowid}/next/{gid}", method = RequestMethod.GET)
		@ResponseBody
	    public Access_Land_polygon getNextAccessLand(@PathVariable String rowid,@PathVariable String gid){		
			Access_Land_polygon accessLand=accessLandService.getNextAccessLand((Integer.parseInt(gid)),rowid);
			return 	accessLand;	
		}
		
		@RequestMapping(value = "/studio/accessland/updatehistory/{gid}", method = RequestMethod.GET)
		@ResponseBody
	    public boolean updateAccessLandHistoryById(@PathVariable String gid){		
			//AccessLandTypeLkp accessLandTypeLkp=accessLandService.getAccessLandTypeById((Integer.parseInt(gid)));
			return 	accessLandService.updateAccessLandHistoryById(Integer.parseInt(gid));	
		}
		
		@RequestMapping(value = "/studio/updateunresovledstatus/{layer}/{gid}", method = RequestMethod.GET)
		@ResponseBody
	    public boolean updateUnresovledIssue(@PathVariable String layer,@PathVariable String gid){		
			
			return 	accessLandService.updateUnresovledStatus(layer,Integer.parseInt(gid));	
		}
}


