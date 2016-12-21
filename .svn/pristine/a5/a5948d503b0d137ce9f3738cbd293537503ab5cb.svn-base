
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

import com.rmsi.spatialvue.studio.dao.NonspatialAttachmentDAO;
import com.rmsi.spatialvue.studio.domain.NonspatialAttachment;
import com.rmsi.spatialvue.studio.service.NonspatialAttachmentService;

/**
 */
@Service
public class NonspatialAttachmentServiceImpl  implements NonspatialAttachmentService {

	@Autowired
	private NonspatialAttachmentDAO nonspatialAttachmentDAO;

	@Override
	public void addNonspatialAttachment(NonspatialAttachment nonspatialattachment) {
				
		
		try{
			nonspatialattachment.setTenantid("5");
		
			nonspatialAttachmentDAO.makePersistent(nonspatialattachment);
		//attachmentDAO.saveAttacment(attachment);
		
		
		}
		catch(Exception e){
			
			e.printStackTrace();
		}
	}

		@Override
	public List<NonspatialAttachment> findnonspatialAttachmentByLayer(String layer,String associationIds) {
		
		return nonspatialAttachmentDAO.findnonspatialAttachmentByLayer(layer, associationIds);
		
	}

		@Override
	public String deletenonspatialAttachmentBYAssociateId(Integer associateId) {
		return nonspatialAttachmentDAO.deleteNonspatialAttachmentBYAssociateId(associateId);
	}

	@Override
	public List<NonspatialAttachment> findnonspatialAttachmentByGid(String layer,Integer gid) {
		// TODO Auto-generated method stub
		return nonspatialAttachmentDAO.findNonspatialAttachmentByGid(layer, gid);
	}

	@Override
	public List<NonspatialAttachment> findRiskassesmentAttachmentByGid(String layer,Integer gid) {
		// TODO Auto-generated method stub
		return nonspatialAttachmentDAO.findRiskassesmentAttachmentByGid(layer, gid);
	}
	
	
}
