package com.rmsi.spatialvue.studio.dao;

import java.util.List;

import com.rmsi.spatialvue.studio.domain.Task;
import com.rmsi.spatialvue.studio.domain.TaskScheduler;

public interface TaskDao  extends GenericDAO<TaskScheduler, Long> {

	public List<Task> findAllTask();
	public List<TaskScheduler> findByTaskSchedularByName(String task);
	public TaskScheduler findTaskSchedularById(Integer taskid);
	public boolean updateTaskScheduler(Integer taskId,Integer targetDays);
	List<Task> getTaskByTaskName(String task);
	
}
