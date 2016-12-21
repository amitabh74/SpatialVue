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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.exceptions.EncryptionOperationNotPossibleException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.dao.NonspatialAttachmentDAO;
import com.rmsi.spatialvue.studio.domain.AttachmentPK;
import com.rmsi.spatialvue.studio.domain.Job;
import com.rmsi.spatialvue.studio.domain.Layer;
import com.rmsi.spatialvue.studio.domain.NonspatialAttachment;
import com.rmsi.spatialvue.studio.service.JobService;
import com.rmsi.spatialvue.studio.service.NonspatialAttachmentService;


/**
 */


@Controller
public class NonspatialAttachmentController {
	
	@Autowired
	private NonspatialAttachmentDAO nonspatialattachmentDAO;
	
	@Autowired
	JobService jobService;
	
	@Autowired
	NonspatialAttachmentService nonspatialattachmentService;
	
	@RequestMapping(value = "/studio/nonspatialattachment/create", method = RequestMethod.POST)
	@ResponseBody
    public String createAttachment(HttpServletRequest request, HttpServletResponse response){
		NonspatialAttachment nonspatialattachment=new NonspatialAttachment();
		int gid=0;
		String layername="";
		String keyfield="";
		String filename="";
		String filepath="";
		String extension="";
		String description="";
		String url = "resources/temp/uploads/";		
		String user="user";
		String nonspatialattachmentUrl = url + user;
		
		try {
			gid=Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "associationid"));
			
			layername = ServletRequestUtils.getRequiredStringParameter(request, "layername");
			keyfield=ServletRequestUtils.getRequiredStringParameter(request, "keyfield");		
			filename=ServletRequestUtils.getRequiredStringParameter(request, "filename");
			filepath=ServletRequestUtils.getRequiredStringParameter(request, "filepath");
			extension=ServletRequestUtils.getRequiredStringParameter(request, "extension");	
			
				
			description=ServletRequestUtils.getRequiredStringParameter(request, "fileDesc");
			
			nonspatialattachment.setLayername(layername);
			nonspatialattachment.setGid(gid);
			nonspatialattachment.setKeyfield(keyfield);
			nonspatialattachment.setFilename(filename);
			nonspatialattachment.setFilepath(filepath);
			nonspatialattachment.setExtension(extension);					
			nonspatialattachment.setDescription(description);
			nonspatialattachmentService.addNonspatialAttachment(nonspatialattachment);
			
			return nonspatialattachmentUrl+"/"+ nonspatialattachment.getFilename();
			
			
		} catch (ServletRequestBindingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
			
	}
	
	@RequestMapping(value = "/studio/riskattachment/create", method = RequestMethod.POST)
	@ResponseBody
    public String createriskAttachment(HttpServletRequest request, HttpServletResponse response){
		NonspatialAttachment nonspatialattachment=new NonspatialAttachment();
		int gid=0;
		String layername="";
		String keyfield="";
		String filename="";
		String filepath="";
		String extension="";
		String description="";
		String url = "resources/temp/uploads/";		
		String user="user";
		boolean riskassRequired= false;
		String nonspatialattachmentUrl = url + user;
		
		try {
			gid=Integer.parseInt(ServletRequestUtils.getRequiredStringParameter(request, "associationid1"));
			
			layername = ServletRequestUtils.getRequiredStringParameter(request, "layername1");
			keyfield=ServletRequestUtils.getRequiredStringParameter(request, "keyfield1");		
			filename=ServletRequestUtils.getRequiredStringParameter(request, "filename1");
			filepath=ServletRequestUtils.getRequiredStringParameter(request, "filepath1");
			extension=ServletRequestUtils.getRequiredStringParameter(request, "extension1");	
			
			String riskassreq = ServletRequestUtils.getRequiredStringParameter(request, "riskAssRequired");
			
			riskassRequired = riskassreq.equalsIgnoreCase("y");
			
			description=ServletRequestUtils.getRequiredStringParameter(request, "riskassref");
			
			nonspatialattachment.setLayername(layername);
			nonspatialattachment.setGid(gid);
			nonspatialattachment.setKeyfield(keyfield);
			nonspatialattachment.setFilename(filename);
			nonspatialattachment.setFilepath(filepath);
			nonspatialattachment.setExtension(extension);					
			nonspatialattachment.setDescription(description);
			nonspatialattachmentService.addNonspatialAttachment(nonspatialattachment);
			
			//updating for Risk assessment attachment
			Job job =jobService.getJobByJobID(gid); 
			job.setRiskAssesmentRef(description);
			job.setRiskAssesmentReq(riskassRequired);
			Job temp=jobService.addJob(job);
		
			
			return nonspatialattachmentUrl+"/"+ nonspatialattachment.getFilename();
			
			
		} catch (ServletRequestBindingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
			
	}
	
	@RequestMapping(value = "/studio/nonspatialattachment/layer/{id}", method = RequestMethod.POST)
	@ResponseBody
	public List<NonspatialAttachment> findNonspatialAttachmentByLayer(@PathVariable String id,HttpServletRequest request, HttpServletResponse response){
		
		String associationIds = request.getParameter("ids");
		
		List<NonspatialAttachment> nonspatialattachments = 	nonspatialattachmentService.findnonspatialAttachmentByLayer(id,associationIds)	;

		
		for(int x=0 ; x< nonspatialattachments.size() ; x++){
			NonspatialAttachment nonspatialattachment = nonspatialattachments.get(x);
			nonspatialattachment.setFilepath(nonspatialattachments +"/"+ nonspatialattachment.getFilename());
		}
		return nonspatialattachments;
	}
	
	
	
	private String verifyUserToken(HttpServletRequest request, HttpServletResponse response){
		 String token = request.getParameter("_token");
		 final String ENCRYPT_KEY = "HG58YZ3CR9";
		 String principal = "";
		  //System.out.println("-------Encrypted Token: " + token);
		  StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
		  encryptor.setPassword(ENCRYPT_KEY);
		  encryptor.setAlgorithm("PBEWithMD5AndTripleDES");
		  try{
			  token = encryptor.decrypt(token);
			  //System.out.println("--------Decrypted token: " + token);
			  String[] tokens = token.split("\\|");
			  principal = tokens[0];
		  }catch(EncryptionOperationNotPossibleException e){
			  e.printStackTrace();
			  try{
				  response.sendError(403);
			  }catch(Exception ex){
				  ex.printStackTrace();
			  }
		  }
		  
		  return principal;
	}
	
	@RequestMapping(value = "/studio/nonspatialattachment/delete/{associateId}", method = RequestMethod.POST)
	@ResponseBody
    public String deletenonspatialAttachment(@PathVariable String associateId){		
		return nonspatialattachmentService.deletenonspatialAttachmentBYAssociateId(new Integer(associateId));		
	}
	
	
	@RequestMapping(value = "/studio/nonspatialattachment/{layer}/gid/{gid}", method = RequestMethod.GET)
	@ResponseBody
	public List<NonspatialAttachment> findNonspatialAttachmentByGid(@PathVariable String layer,@PathVariable String gid,HttpServletRequest request, HttpServletResponse response){
		List<NonspatialAttachment> nonspatialattachments = 	nonspatialattachmentService.findnonspatialAttachmentByGid(layer,new Integer(gid));
		return nonspatialattachments;
	}
	
	@RequestMapping(value = "/studio/riskattachment/{layer}/gid/{gid}", method = RequestMethod.GET)
	@ResponseBody
	public List<NonspatialAttachment> findRiskassesmentAttachmentByGid(@PathVariable String layer,@PathVariable String gid,HttpServletRequest request, HttpServletResponse response){
		List<NonspatialAttachment> nonspatialattachments = 	nonspatialattachmentService.findRiskassesmentAttachmentByGid(layer,new Integer(gid));
		return nonspatialattachments;
	}
	@RequestMapping(value = "/studio/riskassesment/complete/gid/{gid}", method = RequestMethod.GET)
	@ResponseBody
	public Job updateRiskassesmentCompletion(@PathVariable String gid){
		
		Job job =jobService.getJobByJobID(Integer.parseInt(gid)); 
		job.setRiskAssesmentCompletion(true);
		Job temp=jobService.addJob(job);	
		return temp;
	}
	
}
