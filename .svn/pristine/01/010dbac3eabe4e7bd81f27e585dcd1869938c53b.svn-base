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

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.security.PermitAll;
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

import com.rmsi.spatialvue.studio.domain.Project;
import com.rmsi.spatialvue.studio.domain.PublicUser;
import com.rmsi.spatialvue.studio.domain.Role;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.domain.UserOrder;
import com.rmsi.spatialvue.studio.service.UserService;
import com.rmsi.spatialvue.studio.util.ConfigurationUtil;
import com.rmsi.spatialvue.studio.util.SMTPMailServiceUtil;

/**
 * @author Aparesh.Chakraborty
 *
 */
@Controller
public class UserController {

	@Autowired
	UserService userService;
	
	@RequestMapping(value = "/studio/user/", method = RequestMethod.GET)
	@ResponseBody
    public List<User> list(){
		return 	userService.findAllUser();	
	}
	
	@RequestMapping(value = "/studio/user/order", method = RequestMethod.GET)
	@ResponseBody
    public List<String> listByOrder(){
		List<UserOrder> users = userService.getUserOrderedById();
		List<String> ls = new ArrayList<String>();
	
			int j = 1;
			for(int i=0; i<users.size();){
				if(users.get(i).getId().intValue() == j){
					ls.add(users.get(i).getName());
					j++;
					i++;
				}else{
					ls.add(" ");
					j++;
				}
			}
			
			
		return ls;
	}
	
	
	@RequestMapping(value = "/studio/user/{id}", method = RequestMethod.GET)
	@ResponseBody
    public User getUserById(@PathVariable String id){		
		System.out.println("------------userid:"+ id);
		User usr=userService.findUserByName(id);
		
		//if(usr != null){
			//usr.setPassword(decryptPassword(usr.getPassword()));
			
		//}
		return 	usr;	
	}
	
	@RequestMapping(value = "/studio/_user/", method = RequestMethod.POST)
	@ResponseBody
    //public boolean deleteUserById(@PathVariable String id){
	public User getUserById(HttpServletRequest request, HttpServletResponse response){
		String data = request.getParameter("data");
		try{
			String email = URLDecoder.decode(data, "UTF-8");
			//System.out.println("---- deleteUserById: " + id);
			User usr = userService.findByEmail(email);
			return usr;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
		
	}
    
	@RequestMapping(value = "/studio/user/email/", method = RequestMethod.POST)
	@ResponseBody
    public User getUserByEmail(HttpServletRequest request, HttpServletResponse response){		
		String email=request.getParameter("email");
		System.out.println("------------EMAIL:"+ email);
		User usr=userService.findByEmail(email);
		
		return 	usr;	
	}
	
	
	@RequestMapping(value = "/studio/user/delete/", method = RequestMethod.GET)
	@ResponseBody
    public void deleteUser(){
		userService.deleteUser();
	}
	
	
	@RequestMapping(value = "/studio/user/_delete/", method = RequestMethod.POST)
	@ResponseBody
    //public boolean deleteUserById(@PathVariable String id){
	public boolean deleteUserById(HttpServletRequest request, HttpServletResponse response){
		String data = request.getParameter("data");
		try{
			String id = URLDecoder.decode(data, "UTF-8");
			//System.out.println("---- deleteUserById: " + id);
			return userService.deleteUserById(id);
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
		
	}
	
	@RequestMapping(value = "/studio/user/create", method = RequestMethod.POST)
	@ResponseBody
    public void createUser(HttpServletRequest request, HttpServletResponse response){
		
		//DateFormat df = new SimpleDateFormat("dd/mm/yyyy");
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date expDate=null;
		Set<Role> roleList = new HashSet<Role> ();
		
		String userName="";
		String emailId = "";
		User user = null;
		
		try{		
		
			userName = ServletRequestUtils.getRequiredStringParameter(request, "name");
			emailId = ServletRequestUtils.getRequiredStringParameter(request, "email");
			System.out.println("-------------new user-------------"+ userName);
			//user = getUserById(userName);
			user = getUserByEmail(request, response);
			
			if(user==null){
				System.out.println("-------------new user-------------");
				user=new User();				
			}
			
			user.setName(userName);
//			user.setName(ServletRequestUtils
//					.getRequiredStringParameter(request, "name"));
			
			
			user.setEmail(ServletRequestUtils
					.getRequiredStringParameter(request, "email"));
			
			String pass=ServletRequestUtils.getRequiredStringParameter(request, "password");
			System.out.println("--------------------PASS: "+pass);
			if(pass.equals(user.getPassword())){
				user.setPassword(pass);
			}
			else{
				
				//encripted pass
				final String ENCRYPT_KEY = "HG58YZ3CR9";
				StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
				encryptor.setPassword(ENCRYPT_KEY);                  
				encryptor.setAlgorithm("PBEWithMD5AndTripleDES");   		
				String encryptedText = encryptor.encrypt(pass);
						
				if(encryptedText != null){
					user.setPassword(encryptedText);
				}
				
			}
			System.out.println("--------------------After PASS: "+user.getPassword());
			
			user.setDefaultproject(ServletRequestUtils
					.getRequiredStringParameter(request, "defaultproject"));
			
			user.setActive(Boolean.parseBoolean(ServletRequestUtils
					.getRequiredStringParameter(request, "active")));
			
			String expDateStr=ServletRequestUtils
					.getRequiredStringParameter(request, "passwordexpires");							
			expDate= df.parse(expDateStr); 
			
			System.out.println("FORM:"+expDateStr);
			System.out.println("befobe save:"+expDate);
		
			user.setPasswordexpires(expDate);
			
			user.setLastactivitydate(new Date());
			
			String functionalRole=ServletRequestUtils
			.getRequiredStringParameter(request, "functionalRole");	
			
			user.setFunctionalRole(Integer.parseInt(functionalRole));
						
			String roles[]=request.getParameterValues("user_roles");
						
			
			for(int i = 0; i < roles.length; i++){
	            Role userrole=new Role();
	            userrole.setName(roles[i]);
	            roleList.add(userrole);	           
	        }
			user.setRoles(roleList);
			
			
			String authkey=generateAuthKey(user.getEmail(), user.getPassword());
			user.setAuthkey(authkey);
			
			String managerName=ServletRequestUtils
			.getRequiredStringParameter(request, "managerName");
			
			System.out.println("Manager Name: " + managerName);
			if(managerName != null && managerName.trim().length() > 0){
				user.setManagerid(Integer.parseInt(managerName));
			}else{
				user.setManagerid(null);
			}
			
			System.out.println("-----------------"+userName+"-----------------------------");		
			System.out.println("uid: "+ user.getEmail());
			System.out.println("Pass: "+ user.getPassword());
			System.out.println("authkey: "+ user.getAuthkey());
			System.out.println("managerName: "+ managerName);
			System.out.println("managerName: "+ user.getManagerid());
			System.out.println("----------------------------------------------");
			
			userService.addUser(user);
			
			
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		
	}
	
	@RequestMapping(value = "/studio/user/edit", method = RequestMethod.POST)
	@ResponseBody
    public void editUser(User user){
		userService.updateUser(user);	
	}
	
	@RequestMapping(value = "/studio/user/{id}/project/", method = RequestMethod.GET)
	@ResponseBody
	public List<Project> getProjectsByUser(@PathVariable String id){
		
		return userService.getProjectsByUser(id);
	}
	
	
	//@RequestMapping(value="/studio/user/auth", method = RequestMethod.POST)
	//@ResponseBody
	private String generateAuthKey(String userid, String password){
		String _token = null;
		final String ENCRYPT_KEY = "HG58YZ3CR9";
		try{
			
			//String userid = request.getParameter("userid");
			//String password = request.getParameter("password");
			
			StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
			encryptor.setPassword(ENCRYPT_KEY);
			encryptor.setAlgorithm("PBEWithMD5AndTripleDES");

			String tokenText = userid + "|" + password;  
			_token = encryptor.encrypt(tokenText);
			_token = URLEncoder.encode(_token, "UTF-8");
		}catch(UsernameNotFoundException ex){
			//User not authenticated to access application
			_token = "403(Forbidden)��Authentication failed.";
			ex.printStackTrace();
		}catch(DataAccessException dataAccessEx){
			_token = "500��Server error.";
			dataAccessEx.printStackTrace();
		}catch(Exception e){
			_token = "500��Server error.";
			e.printStackTrace();
		}
		return _token;
	}
	
	

private String decryptPassword(String encPassword){
	final String ENCRYPT_KEY = "HG58YZ3CR9";
	StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
	encryptor.setPassword(ENCRYPT_KEY);
	encryptor.setAlgorithm("PBEWithMD5AndTripleDES");
	String storedPwd = encryptor.decrypt(encPassword);  
	return storedPwd;
}

@RequestMapping(value = "/user/forgotpassword", method = RequestMethod.POST)
@ResponseBody
public boolean forgotPassword(HttpServletRequest request, HttpServletResponse response){
	String userName = null;
	String email = null;
	String lang = null;
	String message = null;
	String subject = null;
	
	
	try{
		/*userName = ServletRequestUtils.getRequiredStringParameter(request,
		"usrname");*/
		email = ServletRequestUtils.getRequiredStringParameter(request,
		"usrMail");
		lang = ServletRequestUtils.getRequiredStringParameter(request,
				"hidLang");
		
		User usr = userService.findByEmail(email);
		if(usr == null){
			return false;
		}else{
			String password = decryptPassword(usr.getPassword());
			//System.out.println("----Decrypted Password: " + password);
			
			/* Write code to mail the password */
			// TODO Auto-generated method stub	
			try {	
				String adminEmailAdd=ConfigurationUtil.getProperty("admin.email.address");
				if(lang.equalsIgnoreCase("en")){
					System.out.println("Forget Password en -------");
					message=ConfigurationUtil.getProperty("forgetpassword.mail");
					subject = ConfigurationUtil.getProperty("forgetpassword.subject");
				}else{
					System.out.println("Forget Password cy -------");
					message=ConfigurationUtil.getProperty("forgetpassword.mail.welsh");
					subject = ConfigurationUtil.getProperty("forgetpassword.subject.welsh");
				}
				message=message.replace("<1>", usr.getName());
				message=message.replace("<2>", password);
				SMTPMailServiceUtil.sendMail(adminEmailAdd, email, subject, message);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			}
			return true;
		}
	}catch(Exception e){
		e.printStackTrace();
	}
	return false;
	
}


@RequestMapping(value = "/publicuser/register", method = RequestMethod.POST)
@ResponseBody
public int createPublicUser(HttpServletRequest request, HttpServletResponse response){
	
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date expDate = null;
		Set<Role> roleList = new HashSet<Role>();
		String userName = "";
		String email = "";
		User user = null;
		PublicUser publicUser = null;
		int result = 0;
		try {

			userName = ServletRequestUtils.getRequiredStringParameter(request,
					"name");
			email = ServletRequestUtils.getRequiredStringParameter(request,
					"email");
			System.out.println("-------------new user-------------" + userName);
			// user = getUserById(userName);
			user = getUserByEmail(request, response);
			if (user == null) {
				System.out.println("-------------new user-------------");
				user = new User();

				user.setName(userName);

				user.setEmail(email);

				String pass = ServletRequestUtils.getRequiredStringParameter(
						request, "password");
				System.out.println("--------------------PASS: " + pass);
				if (pass.equals(user.getPassword())) {
					user.setPassword(pass);
				} else {

					// encripted pass
					final String ENCRYPT_KEY = "HG58YZ3CR9";
					StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
					encryptor.setPassword(ENCRYPT_KEY);
					encryptor.setAlgorithm("PBEWithMD5AndTripleDES");
					String encryptedText = encryptor.encrypt(pass);

					if (encryptedText != null) {
						user.setPassword(encryptedText);
					}

				}
				System.out.println("--------------------After PASS: "
						+ user.getPassword());

				// System.out.println("--------------------Testing util project:----"+ConfigurationUtil.getProperty("publiuser.defaultproject"));
				// System.out.println("--------------------Testing util role name:---- "+ConfigurationUtil.getProperty("publiuser.roleName"));
				// for public user
				//String defaultproject = "Public-RoW";
				//String userroleName = "ROLE_PUBLICUSER";
				String defaultproject = ConfigurationUtil.getProperty("publicuser.defaultproject");
				String userroleName = ConfigurationUtil.getProperty("publicuser.userroleName");
				String noofdays = ConfigurationUtil.getProperty("publicuser.noofdays.passwordexp");
				
				user.setDefaultproject(defaultproject);
				user.setActive(true);

				Calendar objcal = Calendar.getInstance();
				// add 60 days to the current date
				objcal.add(Calendar.DATE, Integer.parseInt(noofdays));
				String expDateStr = df.format(objcal.getTime());
				expDate = df.parse(expDateStr);
				System.out.println("FORM:" + expDateStr);
				System.out.println("befobe save:" + expDate);

				user.setPasswordexpires(expDate);
				user.setLastactivitydate(new Date());
				user.setFunctionalRole(11);

				Role userrole = new Role();
				userrole.setName(userroleName);
				roleList.add(userrole);
				user.setRoles(roleList);

				String authkey = generateAuthKey(user.getEmail(),
						user.getPassword());
				user.setAuthkey(authkey);

				String publicUserMobile = ServletRequestUtils
						.getRequiredStringParameter(request, "mobile");
				String publicUserAddress = ServletRequestUtils
						.getRequiredStringParameter(request, "address");
				String publicUserPhone = ServletRequestUtils
						.getRequiredStringParameter(request, "phone");
				String langPref = ServletRequestUtils
						.getRequiredStringParameter(request, "langpref");

				PublicUser objPublicUser = new PublicUser();
				objPublicUser.setName(userName);
				objPublicUser.setAddress(publicUserAddress);
				
				if(publicUserMobile!=null)
				objPublicUser.setMobile(publicUserMobile);
				
				objPublicUser.setPhone(publicUserPhone);
				objPublicUser.setLanguagePreference(langPref);
				objPublicUser.setEmail(email);
				objPublicUser.setIsWardenUser(false);

				System.out.println("-------------new user-------------"
						+ userName);
				System.out.println("-----------------" + userName
						+ "-----------------------------");
				System.out.println("uid: " + user.getEmail());
				System.out.println("Pass: " + user.getPassword());
				System.out.println("publicUserMobile: "
						+ objPublicUser.getMobile());
				System.out.println("publicUserPhone: "
						+ objPublicUser.getPhone());
				System.out.println("public email: " + objPublicUser.getEmail());
				System.out
						.println("----------------------------------------------");
				if (userService.addPublicUser(user, objPublicUser)) {
					result = 1;
				} else {
					result = 2;
				}
			} else {
				result = 3;
			}
		} catch (Exception e) {
			e.printStackTrace();
			result = 2;
		}

		return result;
	
}

	// Added By PBJ
	@RequestMapping(value = "/studio/rowpath/reassign", method = RequestMethod.GET)
	@ResponseBody
	public List<User> getSurveyors() {
		return userService.getAllSurveyUsers();
	}
	
	@RequestMapping(value = "/studio/workcommitment/reassign/{loggedInRoleid}/{loggedInUserid}", method = RequestMethod.GET)
	@ResponseBody
	public List<User> getUserForAssignment(@PathVariable String loggedInRoleid,@PathVariable String loggedInUserid) {
		return userService.getUserForAssignment(loggedInRoleid,loggedInUserid);
	}
	
	@RequestMapping(value = "/studio/user/reportees/{loggedInUserid}", method = RequestMethod.GET)
	@ResponseBody
	public List<User> getReportees(@PathVariable String loggedInUserid)throws Exception {
		int userId = Integer.parseInt(loggedInUserid);
		System.out.println("----- User id logged in: " + userId);
		return userService.getUserForAssignment(userId);
	}
	
	@RequestMapping(value = "/viewer/publicuser/warden/register", method = RequestMethod.POST)
	@ResponseBody
	public PublicUser addPublicUser(HttpServletRequest request, HttpServletResponse response){
		
			String userName="";
			String email = "";
			PublicUser publicUser = null;
			boolean isWardenUser=true;
			
			try {
					email = ServletRequestUtils.getRequiredStringParameter(request,
						"email");
					userName=ServletRequestUtils
					.getRequiredStringParameter(request, "name");
					String publicUserMobile = ServletRequestUtils
							.getRequiredStringParameter(request, "mobile");
					String publicUserAddress = ServletRequestUtils
							.getRequiredStringParameter(request, "address");
					String publicUserPhone = ServletRequestUtils
							.getRequiredStringParameter(request, "phone");
					String langPref = ServletRequestUtils
							.getRequiredStringParameter(request, "langpref");
					
					//First Check if emailid is valid
					if(! userService.isPublicUserId(email))
						return new PublicUser();

					PublicUser objPublicUser = new PublicUser();
					objPublicUser.setName(userName);
					objPublicUser.setAddress(publicUserAddress);
					
					if(publicUserMobile!=null)
					objPublicUser.setMobile(publicUserMobile);
					
					objPublicUser.setPhone(publicUserPhone);
					objPublicUser.setLanguagePreference(langPref);
					objPublicUser.setEmail(email);
					objPublicUser.setIsWardenUser(isWardenUser);
					return userService.addPublicUser(objPublicUser);
					
				
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
	
	}


}