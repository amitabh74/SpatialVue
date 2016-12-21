package com.rmsi.spatialvue.viewer.web.mvc;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mvc.extensions.ajax.AjaxUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

import com.rmsi.spatialvue.studio.service.ImportGPSJobService;
import com.rmsi.spatialvue.studio.service.ImportTabService;

@Controller
public class ImportTabGpsController {
	
	@Autowired
	private ImportTabService importTabService;
	
	@Autowired
	private ImportGPSJobService importGPSJobService;
	
	@RequestMapping(method=RequestMethod.GET)
	public void fileUploadForm(WebRequest webRequest, Model model) {
		model.addAttribute("ajaxRequest", AjaxUtils.isAjaxRequest(webRequest));	
	}
	
	@RequestMapping(value="/viewer/tabfileupload", method=RequestMethod.POST)
	@ResponseBody
	public String tabFileUpload(@RequestParam MultipartFile file, HttpServletRequest request, HttpServletResponse response, Model model){
		String result="";
		try {
			String layerName=ServletRequestUtils.getRequiredStringParameter(request, "layername");
			String mode="Update";//ServletRequestUtils.getRequiredStringParameter(request, "SelectMode");
			//request.getAttributeNames();
			//request.getAttribute("layername");
			String filename=file.getOriginalFilename();
			if(layerName.equalsIgnoreCase("") || layerName==null || mode.equalsIgnoreCase("") || mode==null){
				result="Please select layer and type of mode";
			}
			if(filename.equalsIgnoreCase("") || filename==null){
				return "Please Select a zip file.";
			}
			String fileExtension=filename.substring(filename.lastIndexOf("."));
			if(fileExtension.contains("zip")){
				result=importTabService.importTabFile(layerName, file.getInputStream(),mode);
				/*if(importTabService.importTabFile(layerName, file.getInputStream(),mode)){
					result="Data imported successfully";
				}else{
					result="Probleam on uploading data.";
				}*/
			}
			else{
				result="Please Select zip files only";
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			result="Please try again";
			e.printStackTrace();
		}
		return result;
	}
	
	
	@RequestMapping(value="/viewer/gpsfileupload", method=RequestMethod.POST)
	@ResponseBody
	public String gpsFileUpload(@RequestParam MultipartFile gpsfile, HttpServletRequest request, HttpServletResponse response, Model model){
		String result="";
		try {
			System.out.println("GPS file upload  ");
			String filename=gpsfile.getOriginalFilename();
			if(filename.equalsIgnoreCase("") || filename==null){
				return "Please Select a zip file.";
			}
			String fileExtension=filename.substring(filename.lastIndexOf("."));
			if(fileExtension.contains("zip")){
				result= importGPSJobService.importGPSJobFile(gpsfile.getInputStream());
			}
			else{
				result="Please Select zip files only";
			}
			
		} catch (Exception e) {
			result="Please try again.";
			e.printStackTrace();
		}
		return result;
	}

}
