package com.rmsi.spatialvue.studio.dao.hibernate;

import java.util.List;

import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.stereotype.Repository;

import com.rmsi.spatialvue.studio.dao.TaskDao;
import com.rmsi.spatialvue.studio.domain.Task;
import com.rmsi.spatialvue.studio.domain.TaskScheduler;

@Repository
public class TaskHibernateDao extends GenericHibernateDAO<TaskScheduler, Long> implements TaskDao{
	
	@Autowired
	private JpaTransactionManager tm=null;
	
	@SuppressWarnings("unchecked")
	public List<TaskScheduler> findByTaskSchedularByName(String task) {
		
		List<TaskScheduler> taskSchedularList =
			getEntityManager().createQuery("Select ts.task.surveyType,ts.priority,ts.targetDays,ts.taskid from TaskScheduler ts,Task t where t.task = :task and t.tasktypeid=ts.task.tasktypeid order by ts.task.surveyType,ts.priority").setParameter("task", task).getResultList();		
		return taskSchedularList;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<Task> findAllTask() {
		// TODO Auto-generated method stub		
		List<Task> taskList =
			getEntityManager().createQuery("Select u from Task u").getResultList();
		
		return taskList;
	}
	
	@SuppressWarnings("unchecked")
	public TaskScheduler findTaskSchedularById(Integer taskid) {
		
		List<TaskScheduler> taskScheduler =
			getEntityManager().createQuery("Select ts from TaskScheduler ts where ts.taskid = :taskid").setParameter("taskid", taskid ).getResultList();
		
		if(taskScheduler.size() > 0)
			return taskScheduler.get(0);
		else
			return null;
	}
	
	@SuppressWarnings("unchecked")
	public boolean updateTaskScheduler(Integer taskId,Integer targetDays){
		
		try{
			
			System.out.println(targetDays+"**********************************" + taskId);
			
			Query query = getEntityManager().createQuery("update TaskScheduler ts set ts.targetDays = :targetDays" +
			            " where ts.taskid = :taskid");			
			
			query.setParameter("targetDays", targetDays);
			query.setParameter("taskid", taskId);
				
			
			System.out.println(targetDays+"**********************************" + taskId);
			
			int count = query.executeUpdate();
			System.out.println("Update TaskScheduler count: " + count);
			if(count > 0){
				return true;
			}else{
				return false;
			}
		}catch(Exception e){
			e.printStackTrace();
			return false;
	    }
	}
	
	public List<Task> getTaskByTaskName(String task){
		@SuppressWarnings("unchecked")
		List<Task> tasks = getEntityManager().createQuery("Select t from Task t where t.task = :task").setParameter("task", task).getResultList();
		
		return tasks;
	}
}
