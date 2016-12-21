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
import com.rmsi.spatialvue.studio.dao.AttachmentDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rmsi.spatialvue.studio.domain.Attachment;
import com.rmsi.spatialvue.studio.dao.FurnitureConditionLkpDAO;
import com.rmsi.spatialvue.studio.dao.FurnitureDAO;
import com.rmsi.spatialvue.studio.dao.FurnitureTypeLkpDAO;
import com.rmsi.spatialvue.studio.dao.UserDAO;
import com.rmsi.spatialvue.studio.domain.Furniture;
import com.rmsi.spatialvue.studio.domain.FurnitureConditionLkp;
import com.rmsi.spatialvue.studio.domain.Access_Land_polygon;
import com.rmsi.spatialvue.studio.domain.FurnitureTypeLkp;
import com.rmsi.spatialvue.studio.domain.Job;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.service.FurnitureService;
/**
 * @author Alok.Sen
 *
 */
@Service
public class FurnitureServiceImpl implements FurnitureService{

	@Autowired
	private FurnitureDAO furnitureDAO;
	@Autowired
	private FurnitureTypeLkpDAO furnitureTypeLkpDAO;
	@Autowired
	private UserDAO userDao;
	@Autowired
	private FurnitureConditionLkpDAO furnitureConditionLkpDAO;
	@Autowired
	private AttachmentDAO attachmentDAO;
	@Override
	public Furniture createFurniture(Furniture furniturePoint,Integer gid) {
		
		Furniture historyFurniture =furnitureDAO.getFurnitureByGid(gid);
		historyFurniture.setIshistory(true);
		furnitureDAO.makePersistent(furniturePoint);		
		//update ishistory field
		furnitureDAO.makePersistent(furniturePoint);
		
		return furniturePoint;
	}

	@Override
	public Furniture EditFurniture(
			Furniture furniturePoint) {
		return null;
	}

	@Override
	public Furniture getFurnitureByGid(int gid) {
		
		Furniture furniture= new Furniture();
		furniture= furnitureDAO.getFurnitureByGid(gid);
		Set<Attachment> attachments = new HashSet<Attachment>(attachmentDAO.findAttachmentByGid("Furniture",new Integer(gid)));			
		furniture.setAttachments(attachments);
		return furniture; 
	}

	@Override
	
	public List<FurnitureTypeLkp> findAllFurniture(String lang) {
		//return furnitureTypeLkpDAO.getAllFurnitureType();
		//return furnitureTypeLkpDAO.findAll();
		return furnitureTypeLkpDAO.getFurnitureTypeByOrder(lang);
	}
	
	@Override
	public List<User> getAllSurveyUsers() {
		return userDao.getAllSurveyUsers();
	}
	
	@Override
	public List<FurnitureConditionLkp> findAllFurnitureCondition(){
		
	return furnitureConditionLkpDAO.findAll();
	}
	
	
	/*
	@Override
	public FurnitureTypeLkp getFurnitureTypeById(int id) {
		return furnitureTypeLkpDAO.getFurnitureTypeById(id);
	}*/

	@Override
	public Furniture getPreviousFurniture(Integer gid, String rowid) {
		Furniture furniture= new Furniture();
		furniture= furnitureDAO.getPreviousFurniture(gid, rowid);
		//System.out.println("#########"+gid+'-'+rowid);
		Set<Attachment> attachments = new HashSet<Attachment>(attachmentDAO.findAttachmentByGid("Furniture",furniture.getGid()));	
		//System.out.println("#########LEN: "+attachments.size());
		furniture.setAttachments(attachments);
		return furniture; 
	}

	@Override
	public Furniture getNextFurniture(Integer gid, String rowid) {
		
		Furniture furniture= new Furniture();
		furniture= furnitureDAO.getNextFurniture(gid, rowid);
		Set<Attachment> attachments = new HashSet<Attachment>(attachmentDAO.findAttachmentByGid("Furniture",furniture.getGid()));		
		furniture.setAttachments(attachments);
		return furniture; 
	}

	@Override
	public boolean updateFurnitureHistoryById(Integer gid, String furnitureid, Integer fid) {
		//Access_Land_polygon historyAccessLand =accessLandDAO.getAccessLandByGid(gid);
		//historyAccessLand.setIsHistory(true);		
		return furnitureDAO.updateFurnitureHistoryById(gid,furnitureid,fid);
	}

	@Override
	public List<Furniture> getFurnitureByRowid(String rowid) {
		return furnitureDAO.getFurnitureByRowID(rowid);
	}
	
	@Override
	public List<Furniture> getFurnitureByFurnitureid(String furnitureid) {
		return furnitureDAO.getFurnitureByFurnitureID(furnitureid);
	}
	@Override
	
	public boolean updateFurnitureUnresolved(String furnitureid, boolean issueExists) {
		return furnitureDAO.updateFurnitureUnresolved(furnitureid, issueExists);
		
	}
}
