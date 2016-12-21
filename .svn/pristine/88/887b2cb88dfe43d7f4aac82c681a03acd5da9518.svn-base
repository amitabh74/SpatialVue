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

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.dao.ProjectLayergroupDAO;
import com.rmsi.spatialvue.studio.domain.Baselayer;
import com.rmsi.spatialvue.studio.domain.Bookmark;
import com.rmsi.spatialvue.studio.domain.LayerLayergroup;
import com.rmsi.spatialvue.studio.domain.Layergroup;
import com.rmsi.spatialvue.studio.domain.Project;
import com.rmsi.spatialvue.studio.domain.ProjectBaselayer;
import com.rmsi.spatialvue.studio.domain.ProjectLayergroup;
import com.rmsi.spatialvue.studio.domain.Role;
import com.rmsi.spatialvue.studio.domain.Savedquery;
import com.rmsi.spatialvue.studio.domain.User;
import com.rmsi.spatialvue.studio.domain.UserProject;
import com.rmsi.spatialvue.studio.service.BookmarkService;
import com.rmsi.spatialvue.studio.service.OutputformatService;
import com.rmsi.spatialvue.studio.service.ProjectLayerGroupService;
import com.rmsi.spatialvue.studio.service.ProjectService;
import com.rmsi.spatialvue.studio.service.ProjectionService;
import com.rmsi.spatialvue.studio.service.UnitService;
import com.rmsi.spatialvue.studio.service.impl.ProjectLayerGroupServiceImpl;
import com.rmsi.spatialvue.studio.util.SaveProject;

/**
 * @author Aparesh.Chakraborty
 * 
 */
@Controller
public class ProjectController {

	@Autowired
	ProjectService projectService;

	@Autowired
	private ProjectionService projectionService;

	@Autowired
	private UnitService unitService;
	@Autowired
	private OutputformatService outputformatService;
	
	@Autowired
	private BookmarkService bookmarkService;
	
	@PreAuthorize("permitAll")
	@RequestMapping(value = "/studio/userproject/", method = RequestMethod.GET)
	@ResponseBody
	public List<Project> getAllUserProjects() {
		return projectService.getAllUserProjects();
	}
	
	@PreAuthorize("permitAll")
	@RequestMapping(value = "/studio/ownerproject/", method = RequestMethod.POST)
	@ResponseBody
	public List<Project> getProjectsByOwner(HttpServletRequest request,
			HttpServletResponse response) {
		String emailid = request.getParameter("email");
		return projectService.getProjectsByOwner(emailid);
		
	}
	
	
	@PreAuthorize("permitAll")
	@RequestMapping(value = "/studio/project/", method = RequestMethod.GET)
	@ResponseBody
	public List<Project> list() {
		return projectService.findAllProjects();
	}
	
	@PreAuthorize("permitAll")
	@RequestMapping(value = "/studio/project/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Project getProjectById(@PathVariable String id) {
		return projectService.findProjectByName(id);
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@RequestMapping(value = "/studio/project/delete/", method = RequestMethod.GET)
	@ResponseBody
	public void deleteProject() {
		projectService.deleteProject();
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@RequestMapping(value = "/studio/project/delete/{id}", method = RequestMethod.GET)
	@ResponseBody
	public void deleteProjectById(@PathVariable String id) {
		projectService.deleteProjectById(id);
	}

	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	@RequestMapping(value = "/studio/project/create", method = RequestMethod.POST)
	@ResponseBody
	public void createProject(HttpServletRequest request,
			HttpServletResponse response) {
		String projectName;
		Project project;
		try {
			projectName = ServletRequestUtils.getRequiredStringParameter(
					request, "name");
			
			project = getProjectById(projectName);
			
			if(project==null){
				project=new Project();				
			}
			System.out.println("-----------------"+ request.getParameter("emailid"));
			project.setName(projectName);
			project.setActive(Boolean.parseBoolean(ServletRequestUtils
					.getRequiredStringParameter(request, "active")));
			project.setActivelayer(ServletRequestUtils
					.getRequiredStringParameter(request, "activelayer"));
			project.setCopyright(ServletRequestUtils
					.getRequiredStringParameter(request, "copyright"));
			project.setCosmetic(Boolean.parseBoolean(ServletRequestUtils
					.getRequiredStringParameter(request, "cosmetic")));
			project.setDescription(ServletRequestUtils
					.getRequiredStringParameter(request, "description"));
			project.setDisclaimer(ServletRequestUtils
					.getRequiredStringParameter(request, "disclaimer"));

			// project.setWidth(Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request,"width")));
			// project.setHeight(Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request,"height")));
			project.setMinextent(ServletRequestUtils
					.getRequiredStringParameter(request, "minextent"));
			project.setMaxextent(ServletRequestUtils
					.getRequiredStringParameter(request, "maxextent"));
			// project.setMaxresolutions(Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request,"maxresolutions")));
			// project.setMinresolutions(Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request,"minresolutions")));
			project.setNumzoomlevels(Integer.parseInt(ServletRequestUtils
					.getRequiredStringParameter(request, "numzoomlevels")));

			project.setOverlaymap(ServletRequestUtils
					.getRequiredStringParameter(request, "overlaymap"));
			project.setRestrictedextent(ServletRequestUtils
					.getRequiredStringParameter(request, "restrictedextent"));
			// project.setThumbnail(ServletRequestUtils.getRequiredStringParameter(request,"thumbnail"));
			project.setWatermask(ServletRequestUtils
					.getRequiredStringParameter(request, "watermask"));

			project.setUnit(unitService.findUnitByName(ServletRequestUtils
					.getRequiredStringParameter(request, "unit.name")));
			project.setProjection(projectionService
					.findProjectionByName(ServletRequestUtils
							.getRequiredStringParameter(request,
									"projection.code")));
			project.setDisplayProjection(projectionService
					.findProjectionByName(ServletRequestUtils
							.getRequiredStringParameter(request,
									"displayProjection.code")));
			project.setOutputformat(outputformatService
					.findOutputformatByName(ServletRequestUtils
							.getRequiredStringParameter(request,
									"outputFormat.name")));
			//by Aparesh
			project.setAdmincreated(true);
			project.setOwner(request.getParameter("emailid"));

			String layerGroup[] = request
					.getParameterValues("selectedLayergroups");

		
			String users[]=request.getParameterValues("project_user");
			
			String baselayers[]=null;
			
			try{
				baselayers = request.getParameterValues("selectedBaselayer");
				}catch(Exception e){}
			
			
			Set<UserProject> userProjectList = new HashSet<UserProject> ();			
			
			Set<ProjectBaselayer> projectBaselayerList = new HashSet<ProjectBaselayer> ();	
			//SET user
			for(int i = 0; i < users.length; i++){
	            UserProject userProject=new UserProject();
	            User usr=new User();
	            //usr.setName(users[i]);
	            usr.setEmail(users[i]);
	            userProject.setUser(usr);
	            userProject.setProjectBean(project);
	            System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+ usr.getEmail());
	            userProjectList.add(userProject);	           
	        }
			
			//SET Baselayer
			if(baselayers!=null){
				for(int j = 0; j < baselayers.length; j++){
					ProjectBaselayer projectBaselayer=new ProjectBaselayer();
		            Baselayer baselayer=new Baselayer();
		            baselayer.setName(baselayers[j]);
		            
		            projectBaselayer.setBaselayerBean(baselayer);
		            projectBaselayer.setProjectBean(project);
		            projectBaselayer.setBaselayerorder(j+1);
		            
					System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+ baselayer.getName());
					projectBaselayerList.add(projectBaselayer);	           
		        }
			}
			
			Set<ProjectLayergroup> plgList = new HashSet<ProjectLayergroup>();
			//Set<ProjectLayergroup> plgList = project.getProjectLayergroups();
			
			for (int i = 0; i < layerGroup.length; i++) {
				ProjectLayergroup plg = new ProjectLayergroup();
				Layergroup lg = new Layergroup();
				//Project proj = new Project();

				lg.setName(layerGroup[i]);
				//proj.setName(projName);

				plg.setLayergroupBean(lg);
				plg.setProjectBean(project);
				plg.setGrouporder(i + 1);
				plgList.add(plg);
			}

			project.setProjectLayergroups(plgList);
			project.setUserProjects(userProjectList);
			project.setProjectBaselayers(projectBaselayerList);
			
						
			projectService.addProject(project);
		} catch (ServletRequestBindingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@PreAuthorize("permitAll")
	@RequestMapping(value = "/studio/project/{id}/bookmark/", method = RequestMethod.GET)
	@ResponseBody
	public List<Bookmark> getBookmarksByProject(@PathVariable String id) {

		return projectService.getBookmarksByProject(id);
	}

	@PreAuthorize("permitAll")
	@RequestMapping(value = "/studio/project/{id}/savedquery/", method = RequestMethod.GET)
	@ResponseBody
	public List<Savedquery> getSavedqueryByProject(@PathVariable String id) {

		return projectService.getSavedqueryByProject(id);
	}
	
	@PreAuthorize("permitAll")
	@RequestMapping(value = "/studio/project/names", method = RequestMethod.GET)
	@ResponseBody
	public List<String> getAllProjectNames(){
		List<String> results = projectService.getAllProjectNames();
		
		return results;
	}
	
	@PreAuthorize("permitAll")
	@RequestMapping(value = "/studio/project/{id}/user", method = RequestMethod.GET)
	@ResponseBody
	public List<String> getUsersByProject(@PathVariable String id){
		
		//List<String> results = projectService.getUsersByProject(id);		
		List<String> results = projectService.getUserEmailByProject(id);
		return results;
	}
	
	@RequestMapping(value = "/studio/project/save", method = RequestMethod.POST)
	@ResponseBody
	//public boolean saveProject(HttpServletRequest request){
	public boolean saveProject(@RequestBody SaveProject saveProject){
		
		System.out.println("---Into Save Project ------");
		System.out.println("Extents: " + saveProject.getExtent());
		System.out.println("Name: " + saveProject.getActualProjectName());
		System.out.println("Name: " + saveProject.getNewProjectName());
		
		String[][] layerVis = saveProject.getLayerVisibility();
		
		String[] users = saveProject.getUsers();
		
		System.out.println("------------USERS----------");
		for(int i=0;i<users.length;i++){
			System.out.println(users[i]);
		}
		System.out.println("----------------------");
		
		Project project = getProjectById(saveProject.getActualProjectName());
		try{
			Project newProject = (Project)project.clone();
			newProject.setMinextent(saveProject.getExtent());
			newProject.setName(saveProject.getNewProjectName());
			newProject.setDescription(saveProject.getNewProjectDescription());
			newProject.setAdmincreated(false);
			newProject.setActivelayer(saveProject.getActivelayer());
			newProject.setOwner(saveProject.getOwner());
			
			System.out.println("-------------------Printing project details ------------");
			System.out.println("ActiveLayer: " + newProject.getActivelayer());
			System.out.println("Description: " + newProject.getDescription());
			System.out.println("Max Extent: " + newProject.getMaxextent());
			System.out.println("Min Extent: " + newProject.getMinextent());
			System.out.println("Projection Description: " + newProject.getDisplayProjection().getDescription());
			
			//Get the layergroup records from projectlayergroups and create new instance of layergroup
			Set<ProjectLayergroup> projectLayergroups = newProject.getProjectLayergroups();
			Iterator<ProjectLayergroup> itr = projectLayergroups.iterator();
			Set<Layergroup> layerGroups = new HashSet<Layergroup>();
			Set<ProjectLayergroup> projLayerGroups = new HashSet<ProjectLayergroup>();
			
			for(;itr.hasNext();){
				 ProjectLayergroup projectLayerGroup = itr.next();
				 Layergroup lyrGroupBean = projectLayerGroup.getLayergroupBean();
				 Layergroup lyrGroup = new Layergroup();
				 lyrGroup.setName(newProject.getName()+"_" + lyrGroupBean.getName());
				 lyrGroup.setAlias(newProject.getName()+"_" +lyrGroupBean.getAlias());
				 lyrGroup.setTenantid(lyrGroupBean.getTenantid());
				 
				 //Add layer_layergroup collection
				  Set<LayerLayergroup> lyrLayerGroups = lyrGroupBean.getLayerLayergroups();
				  Iterator<LayerLayergroup> itrLyrGrp = lyrLayerGroups.iterator();
				  HashSet<LayerLayergroup> setLyrLayerGroups = new HashSet<LayerLayergroup>();
				  for(;itrLyrGrp.hasNext();){
					  LayerLayergroup lyrLayerGroup = itrLyrGrp.next();
					  LayerLayergroup newLayerLayerGroup = new LayerLayergroup();
					  newLayerLayerGroup.setLayer(lyrLayerGroup.getLayer());
					  newLayerLayerGroup.setLayerorder(lyrLayerGroup.getLayerorder());
					  newLayerLayerGroup.setTenantid(lyrLayerGroup.getTenantid());
					  newLayerLayerGroup.setLayervisibility(getLayerVisibilityState(lyrLayerGroup.getLayer(), layerVis));
					  newLayerLayerGroup.setLayergroupBean(lyrGroup);
					  setLyrLayerGroups.add(newLayerLayerGroup);
				  }
				  lyrGroup.setLayerLayergroups(setLyrLayerGroups);
				  
				  ProjectLayergroup newProjLayerGroup = new ProjectLayergroup();
				  newProjLayerGroup.setGrouporder(projectLayerGroup.getGrouporder());
				  newProjLayerGroup.setLayergroupBean(lyrGroup);
				  newProjLayerGroup.setTenantid(projectLayerGroup.getTenantid());
				  newProjLayerGroup.setProjectBean(newProject);
				  projLayerGroups.add(newProjLayerGroup);
				  
				  lyrGroup.setProjectLayergroups(projLayerGroups);
				  layerGroups.add(lyrGroup);
			}
			newProject.setProjectLayergroups(projLayerGroups);
			
			/**************	set project's base layer **********************/
			
			Set<ProjectBaselayer> projectBaselayerList = newProject.getProjectBaselayers();
			Iterator<ProjectBaselayer> baselyritr = projectBaselayerList.iterator();
			HashSet<ProjectBaselayer> newProjectBaselayerList = new HashSet<ProjectBaselayer>();
			Project baseLyrProj=new Project();
			baseLyrProj.setName(newProject.getName());
			
			for(;baselyritr.hasNext();){
				
				ProjectBaselayer newProjectBaselayer = baselyritr.next();
				
				newProjectBaselayer.setProjectBean(newProject);
				newProjectBaselayer.setId(null);
				
				newProjectBaselayerList.add(newProjectBaselayer);
			}			 						
			
			newProject.setProjectBaselayers(newProjectBaselayerList);

			/**************	set Associated users **********************/
			
			Set<UserProject> userProjecs = new HashSet<UserProject> ();
			for(int i = 0; i < users.length; i++){
	            UserProject userProject=new UserProject();
	            User usr=new User();
	            //usr.setName(users[i]);
	            usr.setEmail(users[i]);
	            userProject.setUser(usr);
	            userProject.setProjectBean(newProject);
	            System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+ usr.getEmail());
	            userProjecs.add(userProject);	           
	        }
			newProject.setUserProjects(userProjecs);
			
			
			
			//Verify by Iterating layer groups
			Iterator<Layergroup> itrLg = layerGroups.iterator();
			Layergroup lg = null;
			for(;itrLg.hasNext();){
				lg = itrLg.next();
				System.out.println("----------Printing new Layergroup-------------");
				System.out.println("name: " + lg.getName());
				System.out.println("alias: " + lg.getAlias());
				System.out.println("tenantid: " + lg.getTenantid());
				Set<LayerLayergroup> setLLg = lg.getLayerLayergroups();
				Iterator<LayerLayergroup> itrLLg = setLLg.iterator();
				System.out.println("----------Printing Associated LayerLayergroup-------------");
				for(; itrLLg.hasNext();){
					LayerLayergroup _llg = itrLLg.next();
					System.out.println("Layer: " + _llg.getLayer());
					System.out.println("Tenant Id: " + _llg.getTenantid());
					System.out.println("Layer Order: " + _llg.getLayerorder());
					System.out.println("Layer Visibility: " + _llg.getLayervisibility());
					System.out.println("layer group: " + _llg.getLayergroupBean().getName());
				}
			}
			
			System.out.println("---------Printing Associated ProjectLayerGroup---------------");
			Set<ProjectLayergroup> setPLg = lg.getProjectLayergroups();
			Iterator<ProjectLayergroup> itrPlg = setPLg.iterator();
			for(;itrPlg.hasNext();){
				ProjectLayergroup plg = itrPlg.next();
				System.out.println("Project Name: " + plg.getProjectBean().getName());
				System.out.println("Layergroup name: " + plg.getLayergroupBean().getName());
				System.out.println("Group order: " + plg.getGrouporder());
				System.out.println("Tenant id: " + plg.getTenantid());
			}
			
			System.out.println("---------Printing Associated Baselayer---------------");
			Set<ProjectBaselayer> setBlyr = newProject.getProjectBaselayers();
			Iterator<ProjectBaselayer> itrBlyr = setBlyr.iterator();
			for(;itrBlyr.hasNext();){
				ProjectBaselayer blyr = itrBlyr.next();
				System.out.println("Project Name: " + blyr.getProjectBean().getName());
				System.out.println("Baselayer name: " + blyr.getBaselayerBean().getName());
				System.out.println("Lyr order: " + blyr.getBaselayerorder());
				System.out.println("id: " + blyr.getId());
			}
			
			System.out.println("---------Printing Associated user---------------");
			Set<UserProject> setusrproj = newProject.getUserProjects();
			Iterator<UserProject> itrusrprojr = setusrproj.iterator();
			for(;itrusrprojr.hasNext();){
				UserProject up = itrusrprojr.next();
				System.out.println("user Name: " + up.getUser().getName());
				System.out.println("project name: " + up.getProjectBean().getName());				
			}
			
			System.out.println("layergrp: " + layerGroups.size());	
			System.out.println("project layergrp: " + projLayerGroups.size());
			System.out.println("newproj : "+newProject.getProjectLayergroups().size());
			//get project's bookmark
			List<Bookmark> bookmarks=bookmarkService.getBookmarksByProject(saveProject.getActualProjectName());
			
			
			
			projectService.addSaveProject(newProject,layerGroups,bookmarks,saveProject.getActualProjectName());
			
		}catch(CloneNotSupportedException e){
			e.printStackTrace();
		}
		return true;
	}
	
	private boolean getLayerVisibilityState(String layer, String[][] lyrVisibility){
		boolean bVisState = false;
		for(int i=0; i<lyrVisibility.length; i++){
			if(layer.equals(lyrVisibility[i][0])){
				bVisState = Boolean.parseBoolean(lyrVisibility[i][1]);
				break;
			}
		}
		return bVisState;
	}
	
}
