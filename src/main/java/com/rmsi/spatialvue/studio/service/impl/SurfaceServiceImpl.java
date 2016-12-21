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

import java.util.Set;
import java.util.List;
import java.util.HashSet;

import javax.persistence.Transient;

import com.rmsi.spatialvue.studio.dao.AttachmentDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.rmsi.spatialvue.studio.domain.Attachment;
import com.rmsi.spatialvue.studio.dao.SurfaceConditionLkpDAO;
import com.rmsi.spatialvue.studio.dao.SurfaceDAO;
import com.rmsi.spatialvue.studio.dao.SurfaceTypeLkpDAO;
import com.rmsi.spatialvue.studio.dao.UserDAO;
import com.rmsi.spatialvue.studio.domain.Surface;
import com.rmsi.spatialvue.studio.domain.SurfaceConditionLkp;
import com.rmsi.spatialvue.studio.domain.SurfaceTypeLkp;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.service.SurfaceService;

/**
 * @author Alok.Sen
 * 
 */
@Service
public class SurfaceServiceImpl implements SurfaceService {

	@Autowired
	private SurfaceDAO surfaceDAO;
	@Autowired
	private SurfaceTypeLkpDAO surfaceTypeLkpDAO;
	@Autowired
	private UserDAO userDao;
	@Autowired
	private SurfaceConditionLkpDAO surfaceConditionLkpDAO;
	@Autowired
	private AttachmentDAO attachmentDAO;

	@Override
	public Surface createSurface(Surface surfaceMiltiline, Integer gid) {

		Surface historySurface = surfaceDAO.getSurfaceByGid(gid);
		historySurface.setIshistory(true);
		surfaceDAO.makePersistent(surfaceMiltiline);
		// update ishistory field
		surfaceDAO.makePersistent(surfaceMiltiline);

		return surfaceMiltiline;
	}

	@Override
	public Surface EditSurface(Surface surfaceMiltiline) {
		return null;
	}

	@Override
	public Surface getSurfaceByGid(int gid) {

		Surface surfaceMiltiline = new Surface();
		surfaceMiltiline = surfaceDAO.getSurfaceByGid(gid);
		Set<Attachment> attachments = new HashSet<Attachment>(
				attachmentDAO.findAttachmentByGid("Surface", new Integer(gid)));
		surfaceMiltiline.setAttachments(attachments);
		return surfaceMiltiline;
	}

	@Override
	public List<SurfaceTypeLkp> findAllSurface() {
		// return furnitureTypeLkpDAO.getAllFurnitureType();
		return surfaceTypeLkpDAO.findAll();
	}

	@Override
	public List<User> getAllSurveyUsers() {
		return userDao.getAllSurveyUsers();
	}

	@Override
	public List<SurfaceConditionLkp> findAllSurfaceCondition() {

		return surfaceConditionLkpDAO.findAll();
	}

	/*
	 * @Override public FurnitureTypeLkp getFurnitureTypeById(int id) { return
	 * furnitureTypeLkpDAO.getFurnitureTypeById(id); }
	 */

	@Override
	public Surface getPreviousSurface(Integer gid, String surfaceid) {
		Surface surface = new Surface();
		surface = surfaceDAO.getPreviousSurface(gid, surfaceid);
		// System.out.println("#########"+gid+'-'+rowid);
		Set<Attachment> attachments = new HashSet<Attachment>(
				attachmentDAO.findAttachmentByGid("Surface",
						surface.getGid()));
		// System.out.println("#########LEN: "+attachments.size());
		surface.setAttachments(attachments);
		return surface;
	}

	@Override
	public Surface getNextSurface(Integer gid, String surfaceid) {

		Surface surface = new Surface();
		surface = surfaceDAO.getNextSurface(gid, surfaceid);
		Set<Attachment> attachments = new HashSet<Attachment>(
				attachmentDAO.findAttachmentByGid("Surface",
						surface.getGid()));
		surface.setAttachments(attachments);
		return surface;
	}

	@Override
	public boolean updateSurfaceHistoryById(Integer gid, String surfaceid, Integer fid) {
		// Access_Land_polygon historyAccessLand
		// =accessLandDAO.getAccessLandByGid(gid);
		// historyAccessLand.setIsHistory(true);
		return surfaceDAO.updateSurfaceHistoryById(gid, surfaceid, fid);
	}

	@Override
	public List<Surface> getSurfaceByRowid(String rowid) {
		return surfaceDAO.getSurfaceByRowID(rowid);
	}

	@Override
	public boolean updateSurfaceUnresolved(String surfaceid, boolean issueStatus) {
		return surfaceDAO.updateSurfaceUnresolved(surfaceid, issueStatus);
		
	}

}
