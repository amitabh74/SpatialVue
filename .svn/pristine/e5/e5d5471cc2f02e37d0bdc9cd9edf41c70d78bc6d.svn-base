package com.rmsi.spatialvue.studio.web.mvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.service.SnpaRoleService;

@Controller
public class SnpaRolesController {
	@Autowired SnpaRoleService snpaRole;
	
	@RequestMapping(value = "/studio/snparoles/{id}", method = RequestMethod.GET)
	@ResponseBody
	public String getRoleByID(@PathVariable int id){
		System.out.println("-------- Role Id: " + id);
		return snpaRole.getRoleNameByRoleId(id);
	}
}
