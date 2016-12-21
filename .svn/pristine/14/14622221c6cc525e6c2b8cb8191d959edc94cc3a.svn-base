package com.rmsi.spatialvue.studio.web.mvc;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.service.IssueService;
import com.rmsi.spatialvue.studio.service.PathService;
import com.rmsi.spatialvue.studio.service.UserService;


@Controller
public class WorkcommitmentController {
	
	@Autowired
	UserService userService;
	@Autowired
	PathService pathService;
	@Autowired
	IssueService issueService;
	
	
	@RequestMapping(value = "/studio/rowpath/reassignUser", method = RequestMethod.POST)
	@ResponseBody
    public boolean updateSurveyor(HttpServletRequest request, HttpServletResponse response){
		boolean status = false;
		try {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			
			int gId = Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "pathId"));
			String surveyorEmail = ServletRequestUtils.getRequiredStringParameter(request, "surveyor");
			String dateofnextsurvey = ServletRequestUtils.getRequiredStringParameter(request, "dateofnextsurvey");
			Date nextSurveyDate=df.parse(dateofnextsurvey);
			//User objUser = userService.findUserByUserId(surveyorId);
			status = pathService.updatePathSurveyor(gId,surveyorEmail,nextSurveyDate);
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ServletRequestBindingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return status;
	}
	
	@RequestMapping(value = "/studio/issue/reassignUser", method = RequestMethod.POST)
	@ResponseBody
    public boolean updateIssueSurveyor(HttpServletRequest request, HttpServletResponse response){
		boolean status = false;
		try {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			int gId = Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "issueId"));
			//int surveyorID = Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "surveyor"));
			String surveyor = ServletRequestUtils.getRequiredStringParameter(request, "surveyor");
			String resolveByDate = ServletRequestUtils.getRequiredStringParameter(request, "resolvebydate");
			Date objResolveByDate=df.parse(resolveByDate);
			//User objUser = userService.findUserByUserId(surveyorId);
			status = issueService.updateIssueSurveyor(gId,surveyor,objResolveByDate);
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ServletRequestBindingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return status;
	}
	
}
