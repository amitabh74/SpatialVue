package com.rmsi.spatialvue.studio.dao.hibernate;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.DBConnectionDAO;
import com.rmsi.spatialvue.studio.domain.DbConnection;
import com.rmsi.spatialvue.studio.domain.Maptip;

@Repository
public class DBConnectionHibernateDAO extends GenericHibernateDAO<DbConnection, Long> 
	implements DBConnectionDAO {

	public boolean deleteConnectionByName(String name){
		try{
			Query query = getEntityManager().createQuery(
					"Delete from DbConnection db where db.connectionName =:name")
					.setParameter("name", name);
			
			int count = query.executeUpdate();
			System.out.println("Delete count: " + count);
			if(count > 0){
				return true;
			}else{
				return false;
			}
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
	
public DbConnection findByName(String name) {
		
		@SuppressWarnings("unchecked")
		List<DbConnection> connections =
			getEntityManager().createQuery("Select c from DbConnection c where c.connectionName = :name")
			.setParameter("name", name).getResultList();
		
		if(connections.size() > 0)
			return connections.get(0);
		else
			return null;
	}
}
