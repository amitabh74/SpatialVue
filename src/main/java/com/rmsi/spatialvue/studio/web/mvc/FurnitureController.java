/* ----------------------------------------------------------------------
 * Copyright (c) 2011 by RMSI.
 * All Rights Reserved
 *
 * Permission to use this program and its related files is at the
 * discretion of RMSI Pvt Ltd.
 *
 * The licensee of RMSI Software agrees that:
 *    - Redistribution in whole or in part is not permitted.
 *    - Modification of source is not permitted.
 *    - Use of the source in whole or in part outside of RMSI is not
 *      permitted.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL RMSI OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * ----------------------------------------------------------------------
 */

package com.rmsi.spatialvue.studio.web.mvc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.domain.Furniture;
import com.rmsi.spatialvue.studio.domain.FurnitureConditionLkp;
import com.rmsi.spatialvue.studio.domain.FurnitureTypeLkp;
import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.IssueAction;
import com.rmsi.spatialvue.studio.domain.RoW_Path;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.service.FurnitureService;
import com.rmsi.spatialvue.studio.service.IssueService;
import com.rmsi.spatialvue.studio.service.JobService;
import com.rmsi.spatialvue.studio.service.PathService;
import com.rmsi.spatialvue.studio.service.UserService;

/**
 * @author Saurabh.mehta
 *
 */
@Controller
public class FurnitureController {
	
	@Autowired
	FurnitureService furnitureService;
	
	@Autowired
	IssueService issueService;
	
	@Autowired
	PathService pathService;
	
	@Autowired
	JobService jobService;
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value = "/studio/rowpath/furniture/{rowid}", method = RequestMethod.GET)
	@ResponseBody
    public List<Furniture> geFurnitureByROWID(@PathVariable String rowid){
		
		List<Furniture> furniture=furnitureService.getFurnitureByRowid(rowid);
		return 	furniture;	
	}
	
	//Added By Alok
	@RequestMapping(value = "/studio/furniture/{gid}", method = RequestMethod.GET)
	@ResponseBody
    public Furniture furniture(@PathVariable String gid){		
		Furniture furniture=furnitureService.getFurnitureByGid(Integer.parseInt(gid));
		String surveyorName="";
		if(furniture.getSurveyor()!=null){
		surveyorName=userService.findUserByUserId(furniture.getSurveyor()).getName();		
		System.out.println("########### Surveyor name set to : "+surveyorName );
		}
		furniture.setSurveyorName(surveyorName);
		return 	furniture;	
	}
	
	@RequestMapping(value = "/studio/furniture/type/{lang}", method = RequestMethod.GET)
	@ResponseBody
    public List<FurnitureTypeLkp> listFurniture(@PathVariable String lang){
		return 	furnitureService.findAllFurniture(lang);
	}
	
	@RequestMapping(value = "/studio/furniture/surveyor", method = RequestMethod.GET)
	@ResponseBody
    public List<User> listSurveyor(){
		return 	furnitureService.getAllSurveyUsers();
	}
	
	@RequestMapping(value = "/studio/furniture/condition", method = RequestMethod.GET)
	@ResponseBody
    public List<FurnitureConditionLkp> listFurnitureCondition(){
		return 	furnitureService.findAllFurnitureCondition();
	}
	/*
	@RequestMapping(value = "/studio/furniture/type/{id}", method = RequestMethod.GET)
	@ResponseBody
    public FurnitureTypeLkp getFurnitureTypeById(@PathVariable String id){		
		FurnitureTypeLkp furnitureTypeLkp=furnitureService.getFurnitureTypeById(Integer.parseInt(id));
		return furnitureTypeLkp;	
	}*/
	
	@RequestMapping(value = "/studio/furniture/{rowid}/prev/{gid}", method = RequestMethod.GET)
	@ResponseBody
    public Furniture getPreviousFurniture(@PathVariable String rowid,@PathVariable String gid){		
		Furniture furniture=furnitureService.getPreviousFurniture((Integer.parseInt(gid)),rowid);
		String surveyorName="";
		if(furniture.getSurveyor()!=null){
		surveyorName=userService.findUserByUserId(furniture.getSurveyor()).getName();		
		System.out.println("########### Surveyor name set to : "+surveyorName );
		}
		furniture.setSurveyorName(surveyorName);
		
		return 	furniture;	
	}
	
	@RequestMapping(value = "/studio/furniture/{rowid}/next/{gid}", method = RequestMethod.GET)
	@ResponseBody
    public Furniture getNextFurniture(@PathVariable String rowid,@PathVariable String gid){		
		Furniture furniture=furnitureService.getNextFurniture((Integer.parseInt(gid)),rowid);
		String surveyorName="";
		if(furniture.getSurveyor()!=null){
		surveyorName=userService.findUserByUserId(furniture.getSurveyor()).getName();		
		System.out.println("########### Surveyor name set to : "+surveyorName );
		}
		furniture.setSurveyorName(surveyorName);
		return 	furniture;	
	}
	
	@RequestMapping(value = "/studio/furniture/updatehistory/{gid}/{furnitureid}/{fid}", method = RequestMethod.GET)
	@ResponseBody
    public boolean updateFurnitureHistoryById(@PathVariable String gid,@PathVariable String furnitureid,@PathVariable String fid){		
		return 	furnitureService.updateFurnitureHistoryById(Integer.parseInt(gid), furnitureid,Integer.parseInt(fid));	
	}
	
	@RequestMapping(value = "/studio/furniture/issuelist/{furnitureid}/{status}", method = RequestMethod.GET)
	@ResponseBody
    public List<Issue> getIssueOfPathByRowid(@PathVariable String furnitureid,@PathVariable String status){
		List<Issue> issue=issueService.findIssueofFurnitureByFurnitureid(status,furnitureid);
		return 	issue;	
	}
	
	@RequestMapping(value = "/studio/furniture/path/{rowid}", method = RequestMethod.GET)
	@ResponseBody
    public List<RoW_Path> getRow_PathPathByGID(@PathVariable String rowid){
		
    	List<RoW_Path> path=pathService.getFurniturePathByRowId(rowid);
		return 	path;	
	}
    
    @RequestMapping(value = "/studio/furniture/issueactions/{furnitureid}/{status}", method = RequestMethod.GET)
	@ResponseBody
    public List<IssueAction> getActionsForFurnitureIssues(@PathVariable String furnitureid,@PathVariable String status){
		
    	List<IssueAction> actions = issueService.getActionForFurnitureIssues(status,furnitureid);
		return 	actions;	
	}
}


