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

package com.rmsi.spatialvue.studio.dao.hibernate;

import java.io.File;
import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.AttachmentDAO;
import com.rmsi.spatialvue.studio.dao.BookmarkDAO;
import com.rmsi.spatialvue.studio.dao.NonspatialAttachmentDAO;
import com.rmsi.spatialvue.studio.domain.Attachment;
import com.rmsi.spatialvue.studio.domain.NonspatialAttachment;
import com.rmsi.spatialvue.studio.domain.Bookmark;
import com.rmsi.spatialvue.studio.domain.Maptip;
import com.rmsi.spatialvue.studio.domain.Unit;
import com.rmsi.spatialvue.studio.domain.User;

/**
 * @author Aparesh.Chakraborty
 * 
 */
@Repository
public class NonspatialAttachmentHibernateDAO extends
		GenericHibernateDAO<NonspatialAttachment, Long> implements NonspatialAttachmentDAO {

	@SuppressWarnings("unchecked")
	public List<NonspatialAttachment> findnonspatialAttachmentByLayer(String layer,
			String associationIds) {
		String queryString = "Select a from NonspatialAttachment a where a.layername = :name and aassociationid in (";
		queryString = queryString + associationIds + ")";

				List<NonspatialAttachment> nonspatialattachment = getEntityManager()
				.createQuery(queryString).setParameter("name", layer)
				.getResultList();

		return nonspatialattachment;
	}

	
	public boolean deleteFileFromDisk(String filename) {
	
		File file = new File(filename);
		return file.delete();
	}

	public boolean deleteFileFromDB(Integer associationid) {
	
		try {
			Query query = getEntityManager()
					.createQuery(
							"Delete from NonspatialAttachment a where associationid=:associationid")
					
					.setParameter("associationid",associationid);

			int count = query.executeUpdate();
			System.out.println("Delete count: " + count);
			if (count > 0) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	
	public boolean checkIfKeyExists(Integer associationid, String layername) {

		NonspatialAttachment nonspatialattachment = getNonspatialAttachmentByPK(associationid, layername);
		if (nonspatialattachment == null) {
			return false;
		} else {
			return true;
		}

	}

	private NonspatialAttachment getNonspatialAttachmentByPK(Integer associationid, String layername) {

		Query query = getEntityManager()
				.createQuery(
						"Select a from NonspatialAttachment a where a.aassociationid =:associationid "
								+ "and a.layername =:layername")
				.setParameter("associationid", associationid)
				.setParameter("layername", layername);

		@SuppressWarnings("unchecked")
		List<NonspatialAttachment> lstnonspatialAttachment = query.getResultList();
		if (lstnonspatialAttachment.size() > 0) {
			return lstnonspatialAttachment.get(0);
		} else {
			return null;
		}

	}


	
	
	@SuppressWarnings("unchecked")
	public NonspatialAttachment findNonspatialAttachmentByAssociateId(Integer associateId) {
		
		String queryString = "Select a from NonspatialAttachment a where a.associationid = :associateId";		
		List<NonspatialAttachment> nonspatialattachment = getEntityManager()
				.createQuery(queryString).setParameter("associateId", associateId)
				.getResultList();
		
		if(nonspatialattachment.size() > 0)
		{			
			return nonspatialattachment.get(0);
		}
		else
			return null;
		}

	
	

	@Override
	public String deleteNonspatialAttachmentBYAssociateId(Integer associateId) {
		NonspatialAttachment attachment = findNonspatialAttachmentByAssociateId(associateId);

		String msg = "";
		String filename = attachment.getFilepath() + "/" + attachment.getFilename();

		// DELETE FILE FROM DISK

		if (deleteFileFromDisk(filename)) {
			// DELETE FROM DB
			if (deleteFileFromDB(associateId)) {

				msg = "File Deleted successfully";

			} else {

				msg = "ERROR";
			}

		} else {
			msg = "ERROR";

		}

		return msg;
	}

	@SuppressWarnings("unchecked")
	public List<NonspatialAttachment> findNonspatialAttachmentByGid(String layer,Integer gid) {
		
		String queryString = "Select a from NonspatialAttachment a where a.layername=:layer and a.gid=:gid and a.keyfield <> 'RA Ref'";		
		

		List<NonspatialAttachment> nonspatialattachments = getEntityManager().createQuery(queryString).setParameter("layer", layer).setParameter("gid", gid).getResultList();
		
		String url = "resources/temp/uploads/";
		
		//String user=verifyUserToken(request,response);
		String user="user";
		
		String attachmentUrl = url + user;
		System.out.println("---------AccURL: attachmentUrl-----------------------------------");
		
		for(int x=0 ; x< nonspatialattachments.size() ; x++){
					
			nonspatialattachments.get(x).setFilepath(attachmentUrl +"/"+ nonspatialattachments.get(x).getFilename());			
		}
		
		
		
		return nonspatialattachments;
	}
	
	@SuppressWarnings("unchecked")
	public List<NonspatialAttachment> findRiskassesmentAttachmentByGid(String layer,Integer gid) {
		
		String queryString = "Select a from NonspatialAttachment a where a.layername=:layer and a.gid=:gid and a.keyfield = 'RA Ref'";		
		

		List<NonspatialAttachment> riskassessmentattachment = getEntityManager().createQuery(queryString).setParameter("layer", layer).setParameter("gid", gid).getResultList();
		
		String url = "resources/temp/uploads/";
		
		//String user=verifyUserToken(request,response);
		String user="user";
		
		String attachmentUrl = url + user;
		System.out.println("---------AccURL: attachmentUrl-----------------------------------");
		
		for(int x=0 ; x< riskassessmentattachment.size() ; x++){
					
			riskassessmentattachment.get(x).setFilepath(attachmentUrl +"/"+ riskassessmentattachment.get(x).getFilename());			
		}
		
		
		
		return riskassessmentattachment;
	}
}
