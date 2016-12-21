package com.rmsi.spatialvue.studio.web.mvc;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rmsi.spatialvue.studio.domain.Task;
import com.rmsi.spatialvue.studio.domain.TaskScheduler;
import com.rmsi.spatialvue.studio.service.TaskService;


@Controller
public class TaskController {

	@Autowired
	TaskService taskService;
	
	@RequestMapping(value = "/studio/tasks/", method = RequestMethod.GET)
	@ResponseBody
    public List<Task> listTasks(){
		return 	taskService.findAllTask();	
	}
	
	@RequestMapping(value = "/studio/tasksScheduler/", method = RequestMethod.POST)
	@ResponseBody
    public List<TaskScheduler> listTasksScheduler(HttpServletRequest request, HttpServletResponse response){
		
		System.out.println("*********************"+ request.getParameter("taskName"));	
		return 	taskService.findAllTaskScheduler(request.getParameter("taskName"));	
	}
	
	@RequestMapping(value = "/studio/tasksScheduler/save/", method = RequestMethod.POST)
	@ResponseBody
    public void updateTaskSchedulerData(HttpServletRequest request, HttpServletResponse response){

		String targetDays=request.getParameter("duration");
		String taskId=request.getParameter("taskId");
		taskService.updateTaskScheduler(Integer.parseInt(taskId), Integer.parseInt(targetDays));
		/*TaskScheduler taskScheduler=taskService.findTaskSchedularById(Integer.parseInt(taskId));
		taskScheduler.setTargetDays(Integer.parseInt(targetDays));
		taskService.updateTaskScheduler(taskScheduler);*/
	}
}
