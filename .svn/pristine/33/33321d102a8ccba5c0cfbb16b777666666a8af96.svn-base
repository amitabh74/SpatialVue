package com.rmsi.spatialvue.studio.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rmsi.spatialvue.studio.util.ConfigurationUtil;
import com.rmsi.spatialvue.studio.util.GenericUtil;

@Service
public class RoleFactory {
	
	//@Autowired
	//IRole SuperUserRole;
	
	@Autowired
	Warden warden;
	
	@Autowired
	SuperUserRole superUserRole;
	
	@Autowired
	MiscUserRole miscUserRole;
	
	public IRole CreateRoleObject(int userRole)
	{
		IRole roleObj =null;
		
		
		if(GenericUtil.isUserInValidRole (ConfigurationUtil.getProperty("workcommitment.superUsersRole"),userRole)){			
			roleObj = superUserRole;
			System.out.println("Role is superuser ---- ");
		}else if(GenericUtil.isUserInValidRole (ConfigurationUtil.getProperty("workcommitment.wardenUsersRole"),userRole)){
			roleObj = warden;//new Warden();	
			System.out.println("Role is warden ---- ");
		}
		else if(GenericUtil.isUserInValidRole (ConfigurationUtil.getProperty("workcommitment.headwardenUserRole"),userRole)){
			roleObj = warden;//new Warden();	
			System.out.println("Role is head warden ---- ");
		}
			else{
				System.out.println("Role is miscUserRole ---- ");
				//return issueDAO.getOpenIssuesByUserID(userId);
				return miscUserRole;
			}		
		//return roleObj;
		return roleObj;
	}
}


