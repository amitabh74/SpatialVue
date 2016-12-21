package com.rmsi.spatialvue.studio.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rmsi.spatialvue.studio.dao.TaskDao;
import com.rmsi.spatialvue.studio.domain.Task;
import com.rmsi.spatialvue.studio.domain.TaskScheduler;
import com.rmsi.spatialvue.studio.service.TaskService;
@Service
public class TaskServiceImpl implements TaskService{

	@Autowired
	private TaskDao taskDao;
	
	@Override
	//@Cacheable(cacheName="taskFBNCache")
	public List<Task> findAllTask(){
		return taskDao.findAllTask();
		
	}
	@Override
	//@Cacheable(cacheName="taskFBNCache")
	public List<TaskScheduler> findAllTaskScheduler(String task){
		return taskDao.findByTaskSchedularByName(task);
		
	}
	@Override
	//@Cacheable(cacheName="taskFBNCache")
	public TaskScheduler findTaskSchedularById(Integer taskid) {
		// TODO Auto-generated method stub
		return taskDao.findTaskSchedularById(taskid);
	}
	
	@Override
	//@Cacheable(cacheName="taskFBNCache")
	public void updateTaskScheduler(TaskScheduler taskScheduler){
		// TODO Auto-generated method stub
		taskDao.makePersistent(taskScheduler);
	}
	@Override
	public boolean updateTaskScheduler(Integer taskId, Integer targetDays) {
		// TODO Auto-generated method stub
		return taskDao.updateTaskScheduler(taskId, targetDays);
	}
	
	@Override
	public List<Task> getTaskByTaskName(String task){
		return taskDao.getTaskByTaskName(task);
	}
}
