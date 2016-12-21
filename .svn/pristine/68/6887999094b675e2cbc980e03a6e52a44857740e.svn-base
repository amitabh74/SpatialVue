
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

package com.rmsi.spatialvue.studio.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rmsi.spatialvue.studio.dao.AccessLandDAO;
import com.rmsi.spatialvue.studio.dao.AccessLandTypeLkpDAO;
import com.rmsi.spatialvue.studio.dao.AnnualHolidayCalendarDAO;
import com.rmsi.spatialvue.studio.dao.AttachmentDAO;
import com.rmsi.spatialvue.studio.domain.AccessLandTypeLkp;
import com.rmsi.spatialvue.studio.domain.Access_Land_polygon;
import com.rmsi.spatialvue.studio.domain.AnnualHolidayCalendar;
import com.rmsi.spatialvue.studio.domain.Attachment;
import com.rmsi.spatialvue.studio.service.AccessLandService;
import com.rmsi.spatialvue.studio.service.AnnualHolidayCalendarService;

/**
 * @author Aparesh.Chakraborty
 *
 */
@Service
public class AccessLandServiceImpl implements AccessLandService{

	@Autowired
	private AccessLandDAO accessLandDAO;
	@Autowired
	private AccessLandTypeLkpDAO accessLandTypeLkpDAO;
	@Autowired
	private AttachmentDAO attachmentDAO;
	@Override
	public Access_Land_polygon createAccessLand(Access_Land_polygon accessLandpolygon,Integer gid) {
		
		Access_Land_polygon historyAccessLand =accessLandDAO.getAccessLandByGid(gid);
		historyAccessLand.setIsHistory(true);
		accessLandDAO.makePersistent(accessLandpolygon);		
		//update ishistory field
		accessLandDAO.makePersistent(historyAccessLand);
		
		return accessLandpolygon;
	}

	@Override
	public Access_Land_polygon EditAccessLand(
			Access_Land_polygon accessLandpolygon) {
		//annualHolidayCalendarDAO.makePersistent(annualHolidayCalendar);
		return null;
	}


	@Override
	public Access_Land_polygon getAccessLandByGid(int gid) {
		
		Access_Land_polygon accessLand= new Access_Land_polygon();
		accessLand= accessLandDAO.getAccessLandByGid(new Integer(gid));
		Set<Attachment> attachments = new HashSet<Attachment>(attachmentDAO.findAttachmentByGid("Access_Land",new Integer(gid)));			
		accessLand.setAttachments(attachments);
		
		return accessLand; 
	}
			

	@Override
	
	public List<AccessLandTypeLkp> findAllAccessLand() {
		//return accessLandTypeLkpDAO.findAll();
		return accessLandTypeLkpDAO.getAllAccessLandType();
	}

	@Override
	public AccessLandTypeLkp getAccessLandTypeById(int id) {
		return accessLandTypeLkpDAO.getAccessLandTypeById(new Integer(id));
	}

	@Override
	public Access_Land_polygon getPreviousAccessLand(Integer gid, String rowid) {
		
		Access_Land_polygon accessLand= new Access_Land_polygon();
		accessLand= accessLandDAO.getPreviousAccessLand(gid, rowid);
		System.out.println("#########"+gid+'-'+rowid);
		Set<Attachment> attachments = new HashSet<Attachment>(attachmentDAO.findAttachmentByGid("Access_Land",accessLand.getGid()));	
		
		System.out.println("#########LEN: "+attachments.size());
		
		accessLand.setAttachments(attachments);
		return accessLand; 
		
		 
	}

	@Override
	public Access_Land_polygon getNextAccessLand(Integer gid, String rowid) {
		
		Access_Land_polygon accessLand= new Access_Land_polygon();
		accessLand= accessLandDAO.getNextAccessLand(gid, rowid);
		Set<Attachment> attachments = new HashSet<Attachment>(attachmentDAO.findAttachmentByGid("Access_Land",accessLand.getGid()));		
		accessLand.setAttachments(attachments);
		return accessLand; 
		
		
	}

	@Override
	public boolean updateAccessLandHistoryById(Integer gid) {
		//Access_Land_polygon historyAccessLand =accessLandDAO.getAccessLandByGid(gid);
		//historyAccessLand.setIsHistory(true);		
		return accessLandDAO.updateAccessLandHistoryById(gid);
	}

	@Override
	public boolean updateUnresovledStatus(String layer,Integer gid) {
		return accessLandDAO.updateUnresovledStatus(layer,gid);
	}

	

}


