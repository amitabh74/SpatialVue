package com.rmsi.spatialvue.studio.web.mvc;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.domain.PublicUser;
import com.rmsi.spatialvue.studio.service.PublicUserService;


@Controller
public class PublicUserController {
	
	@Autowired
	PublicUserService publicUserService;
	
	@RequestMapping(value = "/studio/publicuser/email/", method = RequestMethod.POST)
	@ResponseBody
	 public PublicUser getPublicUserByEmail(HttpServletRequest request, HttpServletResponse response){		
		String email=request.getParameter("email");
		System.out.println("------------EMAIL:"+ email);
		PublicUser usr = publicUserService.getPublicUserByEmail(email);
		
		return 	usr;	
	}
}
