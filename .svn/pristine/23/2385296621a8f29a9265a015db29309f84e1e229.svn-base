package com.rmsi.spatialvue.studio.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.rmsi.spatialvue.studio.domain.Task;
import com.rmsi.spatialvue.studio.domain.TaskScheduler;

public interface TaskService {

	List<Task> findAllTask();
	List<TaskScheduler> findAllTaskScheduler(String task);
	List<Task> getTaskByTaskName(String task);
	public TaskScheduler findTaskSchedularById(Integer taskid);
	
	public void updateTaskScheduler(TaskScheduler taskScheduler);
	
	@Transactional
	public boolean updateTaskScheduler(Integer taskId,Integer targetDays);
}
