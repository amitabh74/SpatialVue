package com.rmsi.spatialvue.studio.service;

import com.rmsi.spatialvue.studio.domain.PublicUser;

public interface PublicUserService {

	PublicUser getPublicUserByEmail(String emailId);
}
