package com.rmsi.spatialvue.studio.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rmsi.spatialvue.studio.dao.SnpaRoleDao;
import com.rmsi.spatialvue.studio.service.SnpaRoleService;

@Service
public class SnpaRoleServiceImpl implements SnpaRoleService {
	@Autowired SnpaRoleDao snpaRoleDao;
	
	@Override
	public String getRoleNameByRoleId(int roleid) {
		String role = snpaRoleDao.getRoleName(roleid);
		System.out.println("-----Snpa Role: " + role);
		return role;
	}

}
