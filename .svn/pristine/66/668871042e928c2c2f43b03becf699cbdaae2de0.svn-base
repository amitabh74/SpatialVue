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

package com.rmsi.spatialvue.studio.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.BatchSize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.googlecode.ehcache.annotations.Cacheable;
import com.googlecode.ehcache.annotations.TriggersRemove;
import com.rmsi.spatialvue.studio.dao.BookmarkDAO;
import com.rmsi.spatialvue.studio.dao.LayerGroupDAO;
import com.rmsi.spatialvue.studio.dao.MaptipDAO;
import com.rmsi.spatialvue.studio.dao.ProjectBaselayerDAO;
import com.rmsi.spatialvue.studio.dao.ProjectDAO;
import com.rmsi.spatialvue.studio.dao.ProjectLayergroupDAO;
import com.rmsi.spatialvue.studio.dao.UserProjectDAO;
import com.rmsi.spatialvue.studio.domain.Bookmark;
import com.rmsi.spatialvue.studio.domain.Layergroup;
import com.rmsi.spatialvue.studio.domain.Maptip;
import com.rmsi.spatialvue.studio.domain.MaptipPK;
import com.rmsi.spatialvue.studio.domain.Project;
import com.rmsi.spatialvue.studio.domain.ProjectLayergroup;
import com.rmsi.spatialvue.studio.domain.Savedquery;
import com.rmsi.spatialvue.studio.domain.UserProject;
import com.rmsi.spatialvue.studio.service.MaptipService;
import com.rmsi.spatialvue.studio.service.ProjectService;

/**
 * @author Aparesh.Chakraborty
 * 
 */
@Service
public class ProjectServiceImpl implements ProjectService {

	@Autowired
	private ProjectDAO projectDAO;
	@Autowired
	private BookmarkDAO bookmarkDAO;
	@Autowired
	private ProjectLayergroupDAO projectLayergroupDAO;
	@Autowired
	private UserProjectDAO userProjectDAO;
	@Autowired
	private ProjectBaselayerDAO projectbaselayerDAO;

	@Autowired
	private MaptipDAO maptipDAO;
	@Autowired
	private LayerGroupDAO layerGroupDAO;

	@Autowired
	private MaptipService maptipService;

	@Override
	@TriggersRemove(cacheName = { "projectFBNCache", "userFBNCache" }, removeAll = true)
	@BatchSize(size = 20)
	// @TriggersRemove(cacheName ="projectFBNCache", removeAll = true)
	public void addSaveProject(Project project, Set<Layergroup> layergroups,
			List<Bookmark> bookmarks, String projectName) {
		System.out.println("--------projectIMPL" + project.getName());
		Iterator<Layergroup> lgitr = layergroups.iterator();
		for (; lgitr.hasNext();) {

			Layergroup layergroup = lgitr.next();
			layergroup.setProjectLayergroups(new HashSet<ProjectLayergroup>());
			layerGroupDAO.makePersistent(layergroup);
			System.out.println("---------------------" + layergroup.getName()
					+ "-" + layergroup.getLayerLayergroups().size());

		}

		projectDAO.makePersistent(project);
		/************ save bookmark **********/

		if (bookmarks != null) {
			Iterator<Bookmark> bkitr = bookmarks.iterator();
			for (; bkitr.hasNext();) {

				Bookmark bookmark = bkitr.next();

				bookmark.setName(project.getName() + "_" + bookmark.getName());
				bookmark.setName(project.getName() + "_"
						+ bookmark.getDescription());
				bookmark.setProjectBean(project);
				bookmarkDAO.makePersistent(bookmark);

			}
		}
		/********* Save Maptip ******************/
		List<Maptip> maptips = maptipDAO.getMaptipsByProject(projectName);
		Project proj = project;
		proj.setProjectLayergroups(new HashSet<ProjectLayergroup>());
		proj.setUserProjects(new HashSet<UserProject>());
		if (maptips != null) {
			Iterator<Maptip> mitr = maptips.iterator();
			for (; mitr.hasNext();) {

				Maptip newMaptip = new Maptip();
				MaptipPK newMPK = new MaptipPK();

				Maptip maptip = mitr.next();
				MaptipPK mpk = maptip.getId();

				newMPK.setProject(proj.getName());
				newMPK.setLayer(mpk.getLayer());

				newMaptip.setId(newMPK);
				newMaptip.setField(maptip.getField());
				newMaptip.setLayerBean(maptip.getLayerBean());
				newMaptip.setName(proj.getName() + "_" + maptip.getName());
				newMaptip.setProjectBean(proj);
				newMaptip.setQueryexpression(maptip.getQueryexpression());

				/*
				 * System.out.println("-----------------------------------");
				 * System.out.println("-----getName"+newMaptip.getName());
				 * System.out.println("-----getField"+newMaptip.getField());
				 * System
				 * .out.println("-----getId().getLayer"+newMaptip.getId().
				 * getLayer ());
				 * System.out.println("-----getProject()"+newMaptip.getId().
				 * getProject());
				 * System.out.println("-----getLayerBean().getName"
				 * +newMaptip.getLayerBean().getName());
				 * System.out.println("-----getProjectBean().getName"
				 * +newMaptip.getProjectBean().getName());
				 * System.out.println("-----------------------------------");
				 */

				maptipDAO.makePersistent(newMaptip);

			}
		}

	}

	@Override
	@TriggersRemove(cacheName = "projectFBNCache", removeAll = true)
	public void addProject(Project project) {
		// delete existing projectlayergroup
		projectLayergroupDAO.deleteProjectLayergroupByProjectName(project
				.getName());

		// delete existing project's baselayer
		projectbaselayerDAO.deleteProjectBaselayer(project.getName());
		
		Set<UserProject> usrProject = project.getUserProjects();

		projectDAO.makePersistent(project);

		// add userproject
		userProjectDAO.addUserProject(project.getUserProjects(),
				project.getName());

		// add project's baselayer

		// projectbaselayerDAO.addProjectBaselayer(project.getProjectBaselayers(),project.getName());

	}

	@Override
	public void deleteProject() {
		// TODO Auto-generated method stub

	}

	@Override
	@TriggersRemove(cacheName = "projectFBNCache", removeAll = true)
	public void deleteProjectById(String name) {
		// delete uder project name
		userProjectDAO.deleteUserProjectByProject(name);

		// delete user layergroup by project name
		projectLayergroupDAO.deleteProjectLayergroupByProjectName(name);

		// delete maptip by project name

		maptipDAO.deleteMaptipByProject(name);

		// delete project's baselayer
		projectbaselayerDAO.deleteProjectBaselayer(name);
		
		// delete project's bookmark
		
		bookmarkDAO.deleteByProjectName(name);
		

		// delete project by project name
		projectDAO.deleteProject(name);

	}

	@Override
	public void updateProject(Project project) {
		// TODO Auto-generated method stub

	}

	@Override
	@Cacheable(cacheName = "projectFBNCache")
	public Project findProjectById(Long id) {
		return projectDAO.findById(id, false);

	}

	@Override
	@Cacheable(cacheName = "projectFBNCache")
	public List<Project> findAllProjects() {
		// return projectDAO.findAll();
		return projectDAO.findAllProjects();
	}

	@Override
	@Cacheable(cacheName = "projectFBNCache")
	public Project findProjectByName(String name) {
		return projectDAO.findByName(name);
	}

	@Cacheable(cacheName = "projectFBNCache")
	public List<Bookmark> getBookmarksByProject(String projectname) {

		/*
		 * Project project = projectDAO.findByName(projectname); List<Bookmark>
		 * bookmarklist = new ArrayList<Bookmark>(project.getBookmarks());
		 * return bookmarklist;
		 */

		return bookmarkDAO.getBookmarksByProject(projectname);

	}

	@Cacheable(cacheName = "projectFBNCache")
	public List<Savedquery> getSavedqueryByProject(String projectname) {

		Project project = projectDAO.findByName(projectname);
		List<Savedquery> savedquerylist = new ArrayList<Savedquery>(
				project.getSavedqueries());

		return savedquerylist;
	}

	@Cacheable(cacheName = "projectFBNCache")
	public List<String> getAllProjectNames() {
		return projectDAO.getProjectNames();
	}

	@Override
	@Cacheable(cacheName = "projectFBNCache")
	public List<String> getUsersByProject(String name) {
		// TODO Auto-generated method stub
		// return userProjectDAO.findAllUserProject(name);

		return userProjectDAO.getUsersByProject(name);
	}
	
	@Override
	@Cacheable(cacheName = "projectFBNCache")
	public List<String> getUserEmailByProject(String project) {
		// TODO Auto-generated method stub
		// return userProjectDAO.findAllUserProject(name);

		return userProjectDAO.getUserEmailByProject(project);

	}

	@Override
	@Cacheable(cacheName = "projectFBNCache")
	public List<Project> getAllUserProjects() {
		return projectDAO.getAllUserProjects();

	}

	@Override
	@Cacheable(cacheName = "projectFBNCache")
	public List<Project> getProjectsByOwner(String email) {
		
		return projectDAO.getProjectsByOwner(email);
	}

}
