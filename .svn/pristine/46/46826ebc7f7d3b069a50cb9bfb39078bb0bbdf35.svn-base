package com.rmsi.spatialvue.studio.dao.hibernate;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.SnpaRoleDao;
import com.rmsi.spatialvue.studio.domain.SnpaRole;

@Repository
public class SnpaRoleHibernateDao extends GenericHibernateDAO<SnpaRole, Integer>
		implements SnpaRoleDao {

	public String getRoleName(int roleId){
		@SuppressWarnings("unchecked")
		List<SnpaRole> snpaRole =
			getEntityManager().createQuery("Select r from SnpaRole r where r.id = :id").setParameter("id", roleId).getResultList();
		
		if(snpaRole.size() > 0){
			return snpaRole.get(0).getRole();
		}else{
			return null;
		}
	}
}
