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

import com.rmsi.spatialvue.studio.domain.IssueAction;
import com.rmsi.spatialvue.studio.domain.Surface;
import com.rmsi.spatialvue.studio.domain.SurfaceConditionLkp;
import com.rmsi.spatialvue.studio.domain.SurfaceTypeLkp;
import com.rmsi.spatialvue.studio.domain.Issue;
import com.rmsi.spatialvue.studio.domain.RoW_Path;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.service.SurfaceService;
import com.rmsi.spatialvue.studio.service.IssueService;
import com.rmsi.spatialvue.studio.service.PathService;

/**
 * @author Alok Sen
 *
 */
@Controller
public class SurfaceController {
	
	@Autowired
	SurfaceService surfaceService;
	
	@Autowired
	IssueService issueService;
	
	@Autowired
	PathService pathService;
	
	
	@RequestMapping(value = "/studio/rowpath/surface/{rowid}", method = RequestMethod.GET)
	@ResponseBody
    public List<Surface> getSurfaceByROWID(@PathVariable String rowid){
		
		List<Surface> surface=surfaceService.getSurfaceByRowid(rowid);
		return 	surface;	
	}
	
	//Added By Alok
	@RequestMapping(value = "/studio/surface/{gid}", method = RequestMethod.GET)
	@ResponseBody
    public Surface surface(@PathVariable String gid){		
		Surface surface=surfaceService.getSurfaceByGid(Integer.parseInt(gid));
		return 	surface;	
	}
	
	@RequestMapping(value = "/studio/surface/type", method = RequestMethod.GET)
	@ResponseBody
    public List<SurfaceTypeLkp> listSurface(){
		return 	surfaceService.findAllSurface();
	}
	
	@RequestMapping(value = "/studio/surface/surveyor", method = RequestMethod.GET)
	@ResponseBody
    public List<User> listSurveyor(){
		return 	surfaceService.getAllSurveyUsers();
	}
	
	@RequestMapping(value = "/studio/surface/condition", method = RequestMethod.GET)
	@ResponseBody
    public List<SurfaceConditionLkp> listSurfaceCondition(){
		return 	surfaceService.findAllSurfaceCondition();
	}
	/*
	@RequestMapping(value = "/studio/furniture/type/{id}", method = RequestMethod.GET)
	@ResponseBody
    public FurnitureTypeLkp getFurnitureTypeById(@PathVariable String id){		
		FurnitureTypeLkp furnitureTypeLkp=furnitureService.getFurnitureTypeById(Integer.parseInt(id));
		return furnitureTypeLkp;	
	}*/
	
	@RequestMapping(value = "/studio/surface/{surfaceid}/prev/{gid}", method = RequestMethod.GET)
	@ResponseBody
    public Surface getPreviousSurface(@PathVariable String surfaceid,@PathVariable String gid){		
		Surface surface=surfaceService.getPreviousSurface((Integer.parseInt(gid)),surfaceid);
		return 	surface;	
	}
	
	@RequestMapping(value = "/studio/surface/{surfaceid}/next/{gid}", method = RequestMethod.GET)
	@ResponseBody
    public Surface getNextSurface(@PathVariable String surfaceid,@PathVariable String gid){		
		Surface surface=surfaceService.getNextSurface((Integer.parseInt(gid)),surfaceid);
		return 	surface;	
	}
	
	@RequestMapping(value = "/studio/surface/updatehistory/{gid}/{surfaceid}/{fid}", method = RequestMethod.GET)
	@ResponseBody
    public boolean updateSurfaceHistoryById(@PathVariable String gid, @PathVariable String surfaceid, @PathVariable String fid){		
		return 	surfaceService.updateSurfaceHistoryById(Integer.parseInt(gid), surfaceid, Integer.parseInt(fid));	
	}
	
	/*@RequestMapping(value = "/studio/surface/issuelist/{surfaceid}/{status}", method = RequestMethod.GET)
	@ResponseBody
    public List<Issue> getIssueOfPathByRowid(@PathVariable String Rowid,@PathVariable String status){
		List<Issue> issue=issueService.findIssueofSurfaceByRowid(Integer.parseInt(status),Rowid);
		return 	issue;	
	}*/
	
	@RequestMapping(value = "/studio/surface/path/{rowid}", method = RequestMethod.GET)
	@ResponseBody
    public List<RoW_Path> getRow_PathPathByGID(@PathVariable String rowid){
		
    	List<RoW_Path> path=pathService.getSurfacePathByRowId(rowid);
		return 	path;	
	}
    
    @RequestMapping(value = "/studio/surface/issue/{surfaceid}/{status}", method = RequestMethod.GET)
	@ResponseBody
    public List<Issue> getIssueBySurfaceid(@PathVariable String surfaceid,@PathVariable String status){
		
    	//List<Issue> issue=issueService.getIssueBySurfaceid(surfaceid,status);
    	List<Issue> issue=issueService.getIssueofSurfaceBySurfaceid(surfaceid, status);
		return 	issue;	
	}
    
    @RequestMapping(value = "/studio/surface/issueactions/{surfaceid}/{status}", method = RequestMethod.GET)
	@ResponseBody
    public List<IssueAction> getActionsForSurfaceIssues(@PathVariable String surfaceid,@PathVariable String status){
		
    	List<IssueAction> action = issueService.getActionForSurfaceIssues(surfaceid, status);
		return 	action;	
	}
}