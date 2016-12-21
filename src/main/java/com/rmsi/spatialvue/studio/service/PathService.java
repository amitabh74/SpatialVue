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

package com.rmsi.spatialvue.studio.service;


import java.util.Date;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.rmsi.spatialvue.studio.domain.ClassLkp;
import com.rmsi.spatialvue.studio.domain.Community_Council;
import com.rmsi.spatialvue.studio.domain.PathConditionLkp;
import com.rmsi.spatialvue.studio.domain.PathLegalstatusLkp;
import com.rmsi.spatialvue.studio.domain.PathTypeLkp;
import com.rmsi.spatialvue.studio.domain.ResponsibleDepartmentLkp;
import com.rmsi.spatialvue.studio.domain.RoW_Path;
import com.rmsi.spatialvue.studio.domain.Warden_Area;



/**
 * @author Aparesh.Chakraborty
 *
 */
public interface PathService {

	
	RoW_Path getPathByGid(int gid);
	
	List<PathTypeLkp> findPathTypeLkpDAO();

	List<ClassLkp> findAllClassLkp();

	List<Warden_Area> findAllWarden_Area();
	
	List<Community_Council> findCommunity_Council();
	
	List<ResponsibleDepartmentLkp> findPathResponsibleDepartmentLkp();
	
	List<PathConditionLkp> findPathConditionLkp();
	
	RoW_Path getPreviousPath(Integer gid, String rowid);
	
	RoW_Path getNextPath(Integer gid, String rowid);
	
	@Transactional
	boolean updateRowPathHistoryById(Integer gid);

	List<PathLegalstatusLkp> findPathLegalstatusLkp();
	
	List<RoW_Path> getPathByRowId(String RowID);
	List<RoW_Path> getFurniturePathByRowId(String rowID);
	List<RoW_Path> getSurfacePathByRowId(String rowID);
	List<RoW_Path> getIssuePathByRowId(String rowID);
	
	//Added by PBJ
	List<RoW_Path> getPathByUid(Integer uid);
	List<RoW_Path> getPathByUidAndStatus(Integer uid, String status);
	List<RoW_Path> getPathByUidAndStatus(Integer uid, String status,int loggedInUserRole);
	@Transactional
	boolean updatePathSurveyor(Integer gid, String email,Date dateofnextsurvey);
	
	@Transactional
	boolean updateRowPathOpenIssueByRowID(String rowid,Integer issueCount,Integer pathcondition);
	
	int getPathTypeId(String pathType);

}
