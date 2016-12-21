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
package com.rmsi.spatialvue.viewer.web.mvc;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import gistoolkit.display.Converter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.eclipse.birt.report.engine.api.HTMLRenderOption;
import org.eclipse.birt.report.engine.api.HTMLServerImageHandler;
import org.eclipse.birt.report.engine.api.IReportEngine;
import org.eclipse.birt.report.engine.api.IReportRunnable;
import org.eclipse.birt.report.engine.api.IRunAndRenderTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.rmsi.spatialvue.report.BirtEngine;
import com.rmsi.spatialvue.studio.service.ReportService;

@Controller
public class ReportGenerator {
	
	@Autowired
	ReportService reportService;
	
	private static final long serialVersionUID = 1L;
	private IReportEngine birtReportEngine = null;
	protected static Logger logger = Logger.getLogger(ReportGenerator.class);	
	private String rptFilePath = null;
	String pdfpath = null;		

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ReportGenerator() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	@RequestMapping(value = "/viewer/report/pathcondition/", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView ExportToXLS(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate=null;
		Date endDate=null;
		
		logger.debug("========================================");

		String reportFile = request.getParameter("hid-reportFile");
		logger.debug("reportFile: " + reportFile);

		String areaName = request.getParameter("hid-areaName");
		logger.debug("areaName: " + areaName);
		
		String startDateStr = request.getParameter("hid-startDate");
		
		logger.debug("startDate: " + startDateStr);
		startDate= df.parse(startDateStr); 
		
		
		String endDateStr = request.getParameter("hid-endDate");
		logger.debug("endDate: " + endDateStr);
		endDate= df.parse(endDateStr); 
		
		String dateLabel = request.getParameter("hid-dateLabel");
		logger.debug("dateLabel: " + dateLabel);
		
		String lang = request.getParameter("hid-lang");
		logger.debug("Lang: " + lang);
		
		logger.debug("=============================================");
		
		
		
		
		


		ServletContext sc = request.getSession().getServletContext();
		this.birtReportEngine = BirtEngine.getBirtEngine(sc);

		IReportRunnable designfile;
		//FileOutputStream fos = null;
		
		
		try {
			
			rptFilePath = request.getRealPath("/") + "reports\\";
			if(lang.equalsIgnoreCase("cy")){
				rptFilePath += "cy\\";
			}
			System.out.println("---- " + rptFilePath + " ----");
			designfile = birtReportEngine.openReportDesign(rptFilePath
					+ reportFile + ".rptdesign");

			

			// create task to run and render report
			IRunAndRenderTask task = birtReportEngine
					.createRunAndRenderTask(designfile);
			
			

			// set output options
			HTMLRenderOption options = new HTMLRenderOption();
			// set the image handler to a HTMLServerImageHandler if you plan on
			// using the base image url.
			options.setImageHandler(new HTMLServerImageHandler());

			options.setOutputFormat(HTMLRenderOption.OUTPUT_FORMAT_PDF);

			options.setOutputStream(response.getOutputStream());
			
			//if(reportFile!="report_pathcondition_snp"){
			
			if(!reportFile.toLowerCase().contains("_snp".toLowerCase())){
				task.setParameterValue("area", areaName);
			}			
			task.setParameterValue("startdate", startDateStr);
			task.setParameterValue("enddate", endDateStr);
			task.setParameterValue("dateLabel", dateLabel);
			
			task.setParameterValue("lang", lang);
			
			task.setRenderOption(options);

			logger.debug("Generating pdf......");

			// run report
			task.run();
			task.close();

			logger.debug("Generating pdf complete......");

			

		} catch (Exception e) {

			
			e.printStackTrace();

		} finally {

			//fos.flush();
			//fos.close();

		}
		
		return null;

	}

	

	@RequestMapping(value = "/viewer/report/getyear", method = RequestMethod.GET)
	@ResponseBody
    public List<String> getReportYear(HttpServletRequest request, HttpServletResponse response){
	
		return reportService.getReportYear();
	
	}
	
	


}