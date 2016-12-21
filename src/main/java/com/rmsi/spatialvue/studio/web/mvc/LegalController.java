package com.rmsi.spatialvue.studio.web.mvc;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.Legal;
import com.rmsi.spatialvue.studio.domain.LegalAuthorityLkp;
import com.rmsi.spatialvue.studio.domain.LegalEffectsLkp;
import com.rmsi.spatialvue.studio.domain.LegalEventModificationOrder;
import com.rmsi.spatialvue.studio.domain.LegalStatusLkp;
import com.rmsi.spatialvue.studio.domain.LegalTypeLkp;
import com.rmsi.spatialvue.studio.service.IssueService;
import com.rmsi.spatialvue.studio.service.LegalService;



@Controller
public class LegalController {

	@Autowired
	private LegalService legalService;
	
	@Autowired
	private IssueService issueService;
	
	@RequestMapping(value = "/viewer/legalDetails/{issueGid}", method = RequestMethod.GET)
	@ResponseBody
	public Legal getLegalDetails(@PathVariable String issueGid){
		return legalService.getLegalDetailsByIssueId(Integer.parseInt(issueGid));
	}
	
	@RequestMapping(value = "/viewer/legal/create", method = RequestMethod.POST)
	@ResponseBody
    public int createLegal(HttpServletRequest request, HttpServletResponse response){
		int legalAction = 0;
		try{
			
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			int issueGid=Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "issueGid"));		 
			Issue issue=issueService.getIssueByGid(issueGid);
			String rowId=issue.getRowId();
			String furnitureId=issue.getFurnitureid();
			
			Legal legal=legalService.getLegalDetailsByIssueId(issueGid);
			if(legal==null){
				legal=new Legal();
				legalAction = 1; //Created
			}else{
				legalAction = 2; //Updated
			}
			legal.setIssueGid(issueGid);
			
			try{			
			legal.setEffectiveDate(dateFormat.parse(ServletRequestUtils.getRequiredStringParameter(request, "legalEffectiveDate")));
			}catch(Exception e){}
			try{
			legal.setEstimatedClosureDate(dateFormat.parse(ServletRequestUtils.getRequiredStringParameter(request, "legalEstimatedDate")));
		    }catch(Exception e){}
			legal.setFurnitureid(furnitureId);
			try{
			legal.setIsPathPassable(Boolean.parseBoolean(ServletRequestUtils.getRequiredStringParameter(request, "isPathPass")));
			}catch(Exception e){}
			legal.setLegalAuthorityLkp((LegalAuthorityLkp)legalService.getLookupDetail("LegalAuthorityLkp", "legalauthorityid", ServletRequestUtils.getRequiredStringParameter(request, "legalAuth")));
			legal.setLegalEffectsLkp((LegalEffectsLkp)legalService.getLookupDetail("LegalEffectsLkp", "legaleffectid", ServletRequestUtils.getRequiredStringParameter(request, "legalEffects")));
			legal.setLegalEventModificationOrderBean((LegalEventModificationOrder)legalService.getLookupDetail("LegalEventModificationOrder", "id", ServletRequestUtils.getRequiredStringParameter(request, "legalLegalEventorder")));
			legal.setLegalStatusLkp((LegalStatusLkp)legalService.getLookupDetail("LegalStatusLkp", "legalstatusid", ServletRequestUtils.getRequiredStringParameter(request, "legalStatus")));
			legal.setLegalTypeLkp((LegalTypeLkp)legalService.getLookupDetail("LegalTypeLkp", "legaltypeid", ServletRequestUtils.getRequiredStringParameter(request, "legalType")));
			legal.setNotes(ServletRequestUtils.getRequiredStringParameter(request, "legalNotes"));
			legal.setRowId(rowId);
			
			legalService.createLegal(legal);
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return legalAction;
	}
	
	@RequestMapping(value = "/viewer/legal/authorityLkp", method = RequestMethod.GET)
	@ResponseBody
    public List<LegalAuthorityLkp> getLookupInfoLegalAuthorityLkp(){
		List<LegalAuthorityLkp> listLegalAuthorityLkp=new ArrayList<LegalAuthorityLkp>();;
		try{			
			List<Object> allLookupDetail=legalService.getAllLookupDetail("LegalAuthorityLkp", null);		 
		    for(Object lookupDetail:allLookupDetail)
		    	listLegalAuthorityLkp.add((LegalAuthorityLkp)lookupDetail);
		}catch(Exception e){
			e.printStackTrace();
		}
		return listLegalAuthorityLkp;
	}
	
	@RequestMapping(value = "/viewer/legal/effectsLkp", method = RequestMethod.GET)
	@ResponseBody
    public List<LegalEffectsLkp> getLookupInfoLegalEffectsLkp(){
		List<LegalEffectsLkp> listLegalLegalEffectsLkp=new ArrayList<LegalEffectsLkp>();;
		try{			
			List<Object> allLookupDetail=legalService.getAllLookupDetail("LegalEffectsLkp", null);		 
		    for(Object lookupDetail:allLookupDetail)
		    	listLegalLegalEffectsLkp.add((LegalEffectsLkp)lookupDetail);
		}catch(Exception e){
			e.printStackTrace();
		}
		return listLegalLegalEffectsLkp;
	}
	
	@RequestMapping(value = "/viewer/legal/modOrder/{lang}", method = RequestMethod.GET)
	@ResponseBody
    public List<LegalEventModificationOrder> getLookupInfoLegalModOrder(@PathVariable String lang){
		List<LegalEventModificationOrder> listLegalModOrder=new ArrayList<LegalEventModificationOrder>();;
		try{			
			List<Object> allLookupDetail=legalService.getAllLookupDetail("LegalEventModificationOrder", lang);		 
		    for(Object lookupDetail:allLookupDetail)
		    	listLegalModOrder.add((LegalEventModificationOrder)lookupDetail);
		}catch(Exception e){
			e.printStackTrace();
		}
		return listLegalModOrder;
	}
	
	@RequestMapping(value = "/viewer/legal/statusLkp/{lang}", method = RequestMethod.GET)
	@ResponseBody
    public List<LegalStatusLkp> getLookupInfoLegalStatusLkp(@PathVariable String lang){
		List<LegalStatusLkp> listLegalStatusLkp=new ArrayList<LegalStatusLkp>();;
		try{			
			List<Object> allLookupDetail=legalService.getAllLookupDetail("LegalStatusLkp", lang);		 
		    for(Object lookupDetail:allLookupDetail)
		    	listLegalStatusLkp.add((LegalStatusLkp)lookupDetail);
		}catch(Exception e){
			e.printStackTrace();
		}
		return listLegalStatusLkp;
	}
	
	@RequestMapping(value = "/viewer/legal/legalTypeLkp/{lang}", method = RequestMethod.GET)
	@ResponseBody
    public List<LegalTypeLkp> getLookupInfoLegalTypeLkp(@PathVariable String lang){
		List<LegalTypeLkp> listLegalTypeLkp=new ArrayList<LegalTypeLkp>();
		try{			
			List<Object> allLookupDetail=legalService.getAllLookupDetail("LegalTypeLkp", lang);		 
		    for(Object lookupDetail:allLookupDetail)
		    	listLegalTypeLkp.add((LegalTypeLkp)lookupDetail);
		}catch(Exception e){
			e.printStackTrace();
		}
		return listLegalTypeLkp;
	}
	
	
}
