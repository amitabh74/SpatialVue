
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.googlecode.ehcache.annotations.Cacheable;
import com.rmsi.spatialvue.studio.dao.ClassLkpDAO;
import com.rmsi.spatialvue.studio.dao.Community_CouncilDAO;
import com.rmsi.spatialvue.studio.dao.PathConditionLkpDAO;
import com.rmsi.spatialvue.studio.dao.PathDAO;
import com.rmsi.spatialvue.studio.dao.PathLegalstatusLkpDAO;
import com.rmsi.spatialvue.studio.dao.PathTypeLkpDAO;
import com.rmsi.spatialvue.studio.dao.ResponsibleDepartmentLkpDAO;
import com.rmsi.spatialvue.studio.dao.UserDAO;
import com.rmsi.spatialvue.studio.dao.Warden_AreaDAO;
import com.rmsi.spatialvue.studio.domain.ClassLkp;
import com.rmsi.spatialvue.studio.domain.Community_Council;
import com.rmsi.spatialvue.studio.domain.PathConditionLkp;
import com.rmsi.spatialvue.studio.domain.PathLegalstatusLkp;
import com.rmsi.spatialvue.studio.domain.PathTypeLkp;
import com.rmsi.spatialvue.studio.domain.ResponsibleDepartmentLkp;
import com.rmsi.spatialvue.studio.domain.RoW_Path;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.domain.Warden_Area;
import com.rmsi.spatialvue.studio.service.PathService;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;
import com.rmsi.spatialvue.studio.util.GenericUtil;

/**
 * @author Aparesh.Chakraborty
 *
 */
@Service
public class PathServiceImpl implements PathService{

	@Autowired
	private PathDAO pathDAO;
	
	@Autowired
	private ClassLkpDAO classLkpDAO;
	
	@Autowired
	private Warden_AreaDAO warden_AreaDAO;
	
	@Autowired
	private PathTypeLkpDAO pathTypeLkpDAO;
	
	@Autowired
	private Community_CouncilDAO community_CouncilDAO;	
	
	@Autowired
	private ResponsibleDepartmentLkpDAO responsibleDepartmentLkpDAO;
	
	@Autowired
	private PathConditionLkpDAO pathConditionLkpDAO;
	
	@Autowired
	private PathLegalstatusLkpDAO pathLegalstatusLkpDAO;
	
	@Autowired
	private UserDAO userDAO;
	/*	@Autowired
	private PathTypeLkpDAO pathTypeLkpDAO;
		
	*/
	
	@Override
	public RoW_Path getPathByGid(int gid) {
	   return pathDAO.getPathByGid(new Integer(gid));
	}
	
	@Override
	@Cacheable(cacheName="pathlkpFBNCache")
	public List<PathTypeLkp> findPathTypeLkpDAO() {
		//return pathTypeLkpDAO.findAll();
		return pathTypeLkpDAO.getAllPathType();
	}

	
	@Override
	@Cacheable(cacheName="pathlkpFBNCache")
	public List<ClassLkp> findAllClassLkp() {
		return classLkpDAO.findAll();
	}

	@Override
	@Cacheable(cacheName="pathlkpFBNCache")
	public List<Warden_Area> findAllWarden_Area() {
		//return warden_AreaDAO.findAll();
		return warden_AreaDAO.getAllWardenArea();
	}

	@Override
	@Cacheable(cacheName="pathlkpFBNCache")
	public List<Community_Council> findCommunity_Council() {
		//return community_CouncilDAO.findAll();
		//By Aparesh, for community_Council alphabetical order
		return community_CouncilDAO.getAllCommunity_Council();
	}
	
	@Override
	@Cacheable(cacheName="pathlkpFBNCache")
	public List<PathConditionLkp> findPathConditionLkp() {
		return pathConditionLkpDAO.findAll();
	}
	
	@Override
	@Cacheable(cacheName="pathlkpFBNCache")
	public List<ResponsibleDepartmentLkp> findPathResponsibleDepartmentLkp() {
		//return responsibleDepartmentLkpDAO.findAll();
		return responsibleDepartmentLkpDAO.getAllResponsibleDepartment();
	}

	@Override
	public RoW_Path getPreviousPath(Integer gid, String rowid) {
		return pathDAO.getPreviousPath(gid, rowid);
	}

	@Override
	public RoW_Path getNextPath(Integer gid, String rowid) {
		return pathDAO.getNextPath(gid, rowid);
	}

	@Override
	public boolean updateRowPathHistoryById(Integer gid) {
		return pathDAO.updateRowPathHistoryById(gid);
	}
	
	@Override
	@Cacheable(cacheName="pathlkpFBNCache")
	public List<PathLegalstatusLkp> findPathLegalstatusLkp() {
		return pathLegalstatusLkpDAO.findAll();
	}
	/*@Override
	 * @Cacheable(cacheName="pathlkpFBNCache")
	public List<PathTypeLkp> findPathTypeLkpDAO() {
		return pathTypeLkpDAO.findAll();
	}

	

	*/

	@Override
	public List<RoW_Path> getPathByRowId(String rowID) {
		return pathDAO.getPathByGid(rowID);
	}
	@Override
	public List<RoW_Path> getFurniturePathByRowId(String rowID) {
		return pathDAO.getFurniturePathByGid(rowID);
	}
	@Override
	public List<RoW_Path> getSurfacePathByRowId(String rowID) {
		return pathDAO.getSurfacePathByGid(rowID);
	}

	@Override
	public List<RoW_Path> getIssuePathByRowId(String rowID) {
		return pathDAO.getIssuePathByRowId(rowID);
		
	}
	
	//Added By PBJ
	@Override
	public List<RoW_Path> getPathByUid(Integer uid){
		return pathDAO.getPathByUid(uid);
	}
	@Override
	public List<RoW_Path> getPathByUidAndStatus(Integer uid, String status){
		
		String str = ConfigurationUtil.getProperty("workcommitment.surveytask.prompt");
		
		boolean superUserFlag = isSuperUserRole(uid);
		
		if(str!=null){
			int promptTask = Integer.parseInt(str);
			return pathDAO.getPathByUidAndStatus(uid,status,promptTask,superUserFlag );
		}else{
			return null;
		}
	
	}
	
	
	@Override
	public List<RoW_Path> getPathByUidAndStatus(Integer uid, String status, int loggedInUserRole){
		
		String str = ConfigurationUtil.getProperty("workcommitment.surveytask.prompt");
		String strSuperUser =  ConfigurationUtil.getProperty("workcommitment.superUsersRole");
		String strWardenUser =  ConfigurationUtil.getProperty("workcommitment.wardenUsersRole");
		String strAcessTeamId = ConfigurationUtil.getProperty("workcommitment.accessTeamRoleId");
		
		if(GenericUtil.isUserInValidRole (strSuperUser,loggedInUserRole)){	
				if(status==null || status.equalsIgnoreCase("pending")){
					//call a method from the PATHDAO which will get all the pending survey tasks
					return null;
				}else if(status.equalsIgnoreCase("backlog")){
					//call a method from the PATHDAO which will get all the backlog survey tasks
					return null;
				}else{
					//call a method from the PATHDAO which will get all the survey tasks
					return null;
				}
		}else if(GenericUtil.isUserInValidRole (strWardenUser,loggedInUserRole)){
			//call a method from the PATHDAO which will get all the pending survey tasks
			return null;
			}
		else{
				//call a method from the PATHDAO which will get all the pending survey tasks
				return null;
			}
		
		
		
		
		
		
		
		/*if(str!=null){
			int promptTask = Integer.parseInt(str);
			return pathDAO.getPathByUidAndStatus(uid,status,promptTask,superUserFlag );
		}else{
			return null;
		}*/
	
	}
	
	
	private boolean isSuperUserRole (Integer uid){
		User objUser = userDAO.findUserByUserId(uid) ;
		String roleId = String.valueOf(objUser.getFunctionalRole());
		String superUserRoleIds = ConfigurationUtil.getProperty("workcommitment.surveytask.superUserRoleIds");
		List<String> list = new ArrayList<String>(Arrays.asList(superUserRoleIds.split(",")));
		if(list.contains(roleId)){
			return true;
		}else{
			return false;
		}
	}
	
	
	@Override
	public boolean updatePathSurveyor(Integer gid, String email,Date dateofnextsurvey){
		return pathDAO.updatePathSurveyor(gid,email,dateofnextsurvey);
	}

	@Override
	public boolean updateRowPathOpenIssueByRowID(String rowid, Integer issueCount,Integer pathcondition) {
		return pathDAO.updatePathOpenIssueByRowID(rowid,issueCount,pathcondition);
	}
	
	@Override
	public int getPathTypeId(String pathType){
		return pathDAO.getPathTypeId(pathType);
	}
}


