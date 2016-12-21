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

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rmsi.spatialvue.studio.dao.AttachmentDAO;
import com.rmsi.spatialvue.studio.domain.Attachment;
import com.rmsi.spatialvue.studio.service.AttachmentService;

/**
 * @author Aparesh.Chakraborty
 *
 */
@Service
public class AttachmentServiceImpl  implements AttachmentService {

	@Autowired
	private AttachmentDAO attachmentDAO;

	@Override
	public void addAttachment(Attachment attachment) {
				
		
		try{
		attachment.setTenantid("5");
		
		System.out.println("---------------------AttachmentServiceImpl-------------------------");
		//System.out.println("associationid: "+attachment.getAttachmentId().getAssociationid());
		System.out.println("associationid: "+attachment.getAssociationid());
		System.out.println("layername: "+attachment.getLayer().getAlias());	
		System.out.println("keyfield: "+attachment.getKeyfield());	
		System.out.println("Filename: "+attachment.getFilename());	
		System.out.println("description: "+attachment.getDescription());			
		System.out.println("extension: "+attachment.getExtension());	
		System.out.println("tenantid: "+attachment.getTenantid());	
		System.out.println("filepath: "+attachment.getFilepath());
		System.out.println("----------------------------------------------");
		
		/*if (!attachmentDAO.checkIfKeyExists(attachment.getAttachmentId().getAssociationid(),
				attachment.getAttachmentId().getLayername())) {
			 attachmentDAO.makePersistent(attachment);
		} else {
			
		}*/
		
		attachmentDAO.makePersistent(attachment);
		//attachmentDAO.saveAttacment(attachment);
		
		
		}
		catch(Exception e){
			
			e.printStackTrace();
		}
	}

	/*@Override
	public String deleteAttachment(String  layername,String associationIds) {
		
		
		return attachmentDAO.deleteAttachment(layername,associationIds);
		
	}*/

	@Override
	public List<Attachment> findAttachmentByLayer(String layer,String associationIds) {
		
		return attachmentDAO.findAttachmentByLayer(layer,associationIds);
		
	}

	@Override
	public List<Attachment> findAttachmentByRowId(String rowId) {
		return attachmentDAO.findAttachmentByRowId(rowId);
	}

	@Override
	public String deleteAttachmentBYAssociateId(Integer associateId) {
		return attachmentDAO.deleteAttachmentBYAssociateId(associateId);
	}

	@Override
	public List<Attachment> findAttachmentByGid(String layer,Integer gid) {
		// TODO Auto-generated method stub
		return attachmentDAO.findAttachmentByGid(layer,gid);
	}

	
	
}
