
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.googlecode.ehcache.annotations.Cacheable;
import com.googlecode.ehcache.annotations.TriggersRemove;
import com.rmsi.spatialvue.studio.dao.PublicUserDAO;
import com.rmsi.spatialvue.studio.dao.UserDAO;
import com.rmsi.spatialvue.studio.dao.UserProjectDAO;
import com.rmsi.spatialvue.studio.dao.UserRoleDAO;
import com.rmsi.spatialvue.studio.domain.Project;
import com.rmsi.spatialvue.studio.domain.PublicUser;
import com.rmsi.spatialvue.studio.domain.Role;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.domain.UserOrder;
import com.rmsi.spatialvue.studio.service.UserService;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;
import com.rmsi.spatialvue.studio.util.GenericUtil;

/**
 * @author Aparesh.Chakraborty
 *
 */
@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private UserRoleDAO userRoleDAO;
	
	@Autowired
	private UserProjectDAO userProjectDAO;
	
	@Autowired
	private PublicUserDAO publicUserDAO;
	
	@Override
	@TriggersRemove(cacheName="userFBNCache", removeAll=true)	 
	public User addUser(User user) {
		//final String ENCRYPT_KEY = "HG58YZ3CR9";
		Set<Role> roleList = new HashSet<Role> ();
		roleList=user.getRoles();
		
		user.setRoles(new HashSet<Role> ());
		
		userDAO.makePersistent(user);
		userRoleDAO.addUserRoles(roleList, user);
		return null;
	}
	
	@Override
	@TriggersRemove(cacheName="userFBNCache", removeAll=true)
	public boolean addPublicUser(User user,PublicUser publicUser) {
		
		boolean result=false;
		try{
			Set<Role> roleList = new HashSet<Role> ();
			roleList=user.getRoles();
			user.setRoles(new HashSet<Role> ());
			
			userDAO.makePersistent(user);
			
			publicUserDAO.makePersistent(publicUser);
			userRoleDAO.addUserRoles(roleList, user);
			result=true;
		}
		catch(Exception ex){
			result=false;
		}
		return result;
	}
	
	@Override
	@TriggersRemove(cacheName="userFBNCache", removeAll=true)
	public PublicUser addPublicUser(PublicUser publicUser) {
		
		PublicUser objpublicUser=null;
		try{
			objpublicUser=publicUserDAO.makePersistent(publicUser);
		}
		catch(Exception ex){
			objpublicUser=null;
		}
		return objpublicUser;
	}

	@Override
	public void deleteUser() {
		// TODO Auto-generated method stub

	}

	@Override
	@TriggersRemove(cacheName="userFBNCache", removeAll=true)	    
	public boolean deleteUserById(String id) {

		//userRoleDAO.deleteUserRole(id);
		
		//delete userrole
		userRoleDAO.deleteUserRoleByUser(id);
		
		//delete project
		userProjectDAO.deleteUserProjectByUser(id);
		
		//deleting from public user
		publicUserDAO.deletePublic_UserByName(id);
		
		//delete user
		return userDAO.deleteUserByName(id);
		
	}

	@Override
	public void updateUser(User user) {
		
	}

	@Override
	@Cacheable(cacheName="userFBNCache")
	public User findUserById(Long id) {
		return userDAO.findById(id, false);

	}

	@Override
	@Cacheable(cacheName="userFBNCache")
	public List<User> findAllUser() {
		return userDAO.findAll();
	}

	@Override
	@Cacheable(cacheName="userFBNCache")
	public User findUserByName(String name) {
		return userDAO.findByName(name);
	}

	@Override
	@Cacheable(cacheName="userFBNCache")
	public List<Project> getProjectsByUser(String userName) {
		
		User user = userDAO.findByName(userName);			
		
		List<Project> projectlist = new ArrayList<Project>(user.getProjects());
				
		return  projectlist;
	}

	@Override
	//@Cacheable(cacheName="userFBNCache")
	public User findByEmail(String email) {
		return userDAO.findByEmail(email);
	}
	
	@Override
	@Cacheable(cacheName="userFBNCache")
	public List<UserOrder> getUserOrderedById(){
		return userDAO.getUserOrderedById();
	}
	
	//added By PBJ
	public User findUserByUserId(Integer id){
		return userDAO.findUserByUserId(id);
	}

	@Override
	public List<User> getAllSurveyUsers() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<User> getUserForAssignment(String loggedInRoleid, String loggedInUserId) {
		String headwardenRoleId = ConfigurationUtil.getProperty("workcommitment.headwardenUserRole");
		String accessTeamRoleId = ConfigurationUtil.getProperty("workcommitment.accessTeamRoleId");
		String wardenRoleId = ConfigurationUtil.getProperty("workcommitment.wardenUsersRole");
		boolean ifHeadWarden = GenericUtil.isUserInValidRole(headwardenRoleId, Integer.parseInt(loggedInRoleid));
		boolean ifWarden = GenericUtil.isUserInValidRole(wardenRoleId, Integer.parseInt(loggedInRoleid));
		if(ifHeadWarden){
			return userDAO.getAssignmentUserForHeadWarden(Integer.parseInt(loggedInUserId),Integer.parseInt(accessTeamRoleId));
		}else if (ifWarden){
			return userDAO.getAssignmentUserForWarden(Integer.parseInt(loggedInUserId),Integer.parseInt(accessTeamRoleId));
			//return userDAO.getAssignmentUserForWarden(loggedInUserId,accessTeamRoleId);
		}else{
			return userDAO.getAllSurveyUsers();
		}
	}
	
	
	@Override
	public List<User> getUserForAssignment(int loggedInUserId) {
		return userDAO.getAssignmentUserForHeadWarden(loggedInUserId);
	}
	
	@Override
	public boolean isPublicUserId(String emailId){
		return userDAO.hasUserPublicId(emailId);
	}
	
	

}
