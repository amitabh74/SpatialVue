package com.rmsi.spatialvue.studio.dao.hibernate;

import java.util.List;

import org.springframework.stereotype.Repository;
import com.rmsi.spatialvue.studio.dao.LegalDAO;
import com.rmsi.spatialvue.studio.domain.Legal;

@Repository
public class LegalHibernateDAO extends GenericHibernateDAO<Legal, Integer> implements
LegalDAO{

	
	@Override
	public Object getLookupDetail(String tableName,String idField,String idValue) {
		// TODO Auto-generated method stub
		int id=-1;
		try{
		  id=Integer.parseInt(idValue);
		}catch(Exception e){}
		List<Object> lookUpDetail =
			getEntityManager().createQuery("Select t from "+tableName+" t where t."+idField+" = :id").setParameter("id",id).getResultList();
		    if(lookUpDetail.size() > 0)
			return lookUpDetail.get(0);
		else
			return null;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Object> getAllLookupDetail(String tableName, String lang) {
		// TODO Auto-generated method stub
		List<Object> lookUpDetail = null;
		String qryString = null;
		
		if(tableName.equalsIgnoreCase("LegalTypeLkp")){
			if(lang.equalsIgnoreCase("en")){
				qryString = "Select t from "+tableName+" t order by t.legalType";
			}else{
				qryString = "Select t from "+tableName+" t order by t.cyfreithiol";
			}
			lookUpDetail =
				getEntityManager().createQuery(qryString).getResultList();
		}else if(tableName.equalsIgnoreCase("LegalStatusLkp")){
			if(lang.equalsIgnoreCase("en")){
				qryString = "Select t from "+tableName+" t order by t.legalStatus";
			}else{
				qryString = "Select t from "+tableName+" t order by t.statwsCyfreithiol";
			}
			lookUpDetail =
				getEntityManager().createQuery(qryString).getResultList();
		}else if(tableName.equalsIgnoreCase("LegalEventModificationOrder")){
			if(lang.equalsIgnoreCase("en")){
				qryString = "Select t from "+tableName+" t order by t.legalEventModificationOrder";
			}else{
				qryString = "Select t from "+tableName+" t order by t.addasuDigwyddiadCyfreithiol";
			}
			lookUpDetail =
				getEntityManager().createQuery(qryString).getResultList();
		}else{
			lookUpDetail =
				getEntityManager().createQuery("Select t from "+tableName+" t ").getResultList();
		}
		return lookUpDetail;
		    
	}

	@Override
	public Legal getLegalDetailsByIssueId(int issueGid) {
		// TODO Auto-generated method stub
		List<Legal> listLegals =
			getEntityManager().createQuery("Select l from Legal l where l.issueGid = :issueGid").setParameter("issueGid", issueGid).getResultList();
		    if(listLegals.size() > 0)
			return listLegals.get(0);
		else
			return null;
	}

	@Override
	public List<Legal> getLegalByRowID(String rowid) {
		List<Legal> listLegals =
			getEntityManager().createQuery("Select l from Legal l where l.rowId = :rowid").setParameter("rowid", rowid).getResultList();
		 if(listLegals.size() > 0)
			return listLegals;
		else
			return null;
	}
	
	
}
