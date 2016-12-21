package com.rmsi.spatialvue.studio.domain;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


/**
 * The persistent class for the task_scheduler database table.
 * 
 */
@Entity
@Table(name="task_scheduler")
public class TaskScheduler implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer taskid;
	private Integer priority;
	private Integer targetDays;
	private Integer taskPrompt;
	private Task task;

    public TaskScheduler() {
    }


	@Id
	@SequenceGenerator(name="TASK_SCHEDULER_TASKID_GENERATOR", sequenceName="TASK_SCHEDULER_TASKID")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="TASK_SCHEDULER_TASKID_GENERATOR")
	@Column(unique=true, nullable=false)
	public Integer getTaskid() {
		return this.taskid;
	}

	public void setTaskid(Integer taskid) {
		this.taskid = taskid;
	}


	public Integer getPriority() {
		return this.priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}


	@Column(name="target_days", nullable=false)
	public Integer getTargetDays() {
		return this.targetDays;
	}

	public void setTargetDays(Integer targetDays) {
		this.targetDays = targetDays;
	}

	@Column(name="task_prompt")
	public Integer getTaskPrompt() {
		return this.taskPrompt;
	}

	public void setTaskPrompt(Integer taskPrompt) {
		this.taskPrompt = taskPrompt;
	}


	//bi-directional many-to-one association to Task

	@ManyToOne
	@JoinColumn(name="tasktype")
	public Task getTask() {
		return this.task;
	}

	public void setTask(Task task) {
		this.task = task;
	}
	
}