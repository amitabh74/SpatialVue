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

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.rmsi.spatialvue.studio.domain.AccessLandContact;
import com.rmsi.spatialvue.studio.domain.Contact;
import com.rmsi.spatialvue.studio.domain.ContactTypeLkp;
import com.rmsi.spatialvue.studio.domain.FurnitureContact;
import com.rmsi.spatialvue.studio.domain.JobContact;
import com.rmsi.spatialvue.studio.domain.SurfaceContact;
import com.rmsi.spatialvue.studio.domain.IssueContact;
import com.rmsi.spatialvue.studio.domain.PathContact;

/**
 * @author Saurabh.Mehta
 *
 */
public interface ContactService {

	List<Contact> findAllContact();
	List<Contact> getAllContactInOrder(); 
	List<ContactTypeLkp> getContactTypeByOrder();
	List<ContactTypeLkp> findAllContactType();
	List<Contact> findContactByRowIDForAccessLand(String id);	
	@Transactional
	Contact addContact(Contact contact);
	
	Contact findContactByID(Integer id);	
	
	@Transactional
	boolean deleteContactById(String id);
	
	Contact findContactByEmail(String email);
	
	ContactTypeLkp getContactTypeByID(Integer id);
	
	@Transactional
	boolean addAccessLandContact(AccessLandContact contact);
	
	AccessLandContact findAccessLandContactByID(Integer contactid);
	
	@Transactional
	boolean deleteAccessLandContactById(Integer id);
	
	public AccessLandContact findAccessLandContactByIDAndGID(Integer contactid,Integer gid);
	
	public FurnitureContact findFurnitureContactByIDAndGID(Integer contactid,Integer gid);
	
	public SurfaceContact findSurfaceContactByIDAndGID(Integer contactid,Integer gid);
	
	@Transactional
	boolean deleteAccessLandContactByCIdAndGID(Integer contactid,Integer gid);
	
	public PathContact findPathContactByIDAndGID(Integer contactid,Integer gid);
	
	@Transactional
	boolean addPathContact(PathContact contact);
	
	@Transactional
	boolean deletePathContactByCIdAndGID(Integer contactid,Integer gid);
	
	@Transactional
	boolean addFurnitureContact(FurnitureContact contact);
	
	@Transactional
	boolean addSurfaceContact(SurfaceContact contact);
	
	@Transactional
	boolean deleteFurnitureContactByIdAndGID(Integer contactid,Integer gid);
	
	@Transactional
	boolean deleteSurfaceContactByIdAndGID(Integer contactid,Integer gid);
	
	@Transactional
	boolean addIssueContact(IssueContact contact);
	
	@Transactional
	boolean deleteIssueContactByIdAndGID(Integer contactid,Integer gid);
	
	public IssueContact findIssueContactByIDAndGID(Integer contactid,Integer gid);
	@Transactional
	boolean deleteJobContactByIdAndjobid(Integer contactid, Integer jobid);
	@Transactional
	boolean addJobContact(JobContact contact);
	JobContact findJobContactByIDAndjobid(Integer contactid, Integer jobid);
	
	List<String> findContactCompanyByType(int typeid);
	List<Contact> getContactByCompany(String company, int typeid);
	
	@Transactional
	boolean blockContact(int contactId);
}
