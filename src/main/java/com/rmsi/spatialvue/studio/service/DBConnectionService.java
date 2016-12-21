package com.rmsi.spatialvue.studio.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.rmsi.spatialvue.studio.domain.DbConnection;

public interface DBConnectionService {
	
	@Transactional(readOnly=true)
	List<DbConnection> findAllConnections();
	
	@Transactional
	boolean deleteConnectionByName(String name);
	
	@Transactional(readOnly=true)
	DbConnection findConnectionByName(String name);

	@Transactional
	DbConnection saveConnection(DbConnection connection);
}
