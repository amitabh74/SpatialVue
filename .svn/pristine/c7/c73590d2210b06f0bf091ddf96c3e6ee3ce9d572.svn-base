package com.rmsi.spatialvue.studio.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rmsi.spatialvue.studio.dao.PublicUserDAO;
import com.rmsi.spatialvue.studio.domain.PublicUser;
import com.rmsi.spatialvue.studio.service.PublicUserService;

@Service
public class PublicUserServiceImpl implements PublicUserService {
	
	@Autowired
	PublicUserDAO publicUserDAO;
	
	public PublicUser getPublicUserByEmail(String emailId){
		return publicUserDAO.findByEmail(emailId);
	}

}
