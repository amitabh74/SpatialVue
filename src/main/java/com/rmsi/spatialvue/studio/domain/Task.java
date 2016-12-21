package com.rmsi.spatialvue.studio.domain;
import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the task database table.
 * 
 */
@Entity
@Table(name="task")
public class Task implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer tasktypeid;
	private String surveyType;
	private String task;
	private Set<TaskScheduler> taskSchedulers;

    public Task() {
    }


	@Id
	@SequenceGenerator(name="TASK_TASKTYPEID_GENERATOR", sequenceName="TASK_TASKTYPEID")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="TASK_TASKTYPEID_GENERATOR")
	@Column(unique=true, nullable=false)
	public Integer getTasktypeid() {
		return this.tasktypeid;
	}

	public void setTasktypeid(Integer tasktypeid) {
		this.tasktypeid = tasktypeid;
	}


	@Column(name="survey_type", length=50)
	public String getSurveyType() {
		return this.surveyType;
	}

	public void setSurveyType(String surveyType) {
		this.surveyType = surveyType;
	}


	@Column(length=50)
	public String getTask() {
		return this.task;
	}

	public void setTask(String task) {
		this.task = task;
	}


	//bi-directional many-to-one association to TaskScheduler
	@OneToMany(mappedBy="task", fetch=FetchType.EAGER)
	public Set<TaskScheduler> getTaskSchedulers() {
		return this.taskSchedulers;
	}

	public void setTaskSchedulers(Set<TaskScheduler> taskSchedulers) {
		this.taskSchedulers = taskSchedulers;
	}
	
}