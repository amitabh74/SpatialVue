package com.rmsi.spatialvue.studio.dao;

import com.rmsi.spatialvue.studio.domain.SnpaRole;

public interface SnpaRoleDao extends GenericDAO<SnpaRole, Integer> {
	
	String getRoleName(int roleId);

}
