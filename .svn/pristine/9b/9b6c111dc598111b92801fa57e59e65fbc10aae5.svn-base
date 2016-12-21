package com.rmsi.spatialvue.studio.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.rmsi.spatialvue.studio.domain.User;

public class GenericUtil {

	public static boolean isUserInValidRole (String roleIdToMatch, int roleId){
		List<String> list = new ArrayList<String>(Arrays.asList(roleIdToMatch.split(",")));
		if(list.contains(""+roleId)){
			return true;
		}else{
			return false;
		}
	}
	
	
}
