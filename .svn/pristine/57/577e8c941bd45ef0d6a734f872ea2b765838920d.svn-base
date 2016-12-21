package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;


/**
 * The persistent class for the job_user database table.
 * 
 */
@Entity
@Table(name="job_user", schema="snpa")
public class JobUser implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer jobUserId;
	//private String jobid;
	//private Integer userId;
	//private User user;
	private Job job;
	private String user_email;
	
    

	public JobUser() {
    }


	@Id
	@SequenceGenerator(name="JOB_USER_JOBUSERID_GENERATOR", sequenceName="snpa.job_user_job_user_id_seq1")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="JOB_USER_JOBUSERID_GENERATOR")
	@Column(name="job_user_id")
	public Integer getJobUserId() {
		return this.jobUserId;
	}

	public void setJobUserId(Integer jobUserId) {
		this.jobUserId = jobUserId;
	}


	/*public String getJobid() {
		return this.jobid;
	}

	public void setJobid(String jobid) {
		this.jobid = jobid;
	}


	@Column(name="user_id")
	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}*/
	
	//bi-directional many-to-one association to User
    /*@ManyToOne
	@JoinColumn(name="user_id")
	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}*/

	@JsonIgnore
    @ManyToOne
	@JoinColumn(name="jobid")
	public Job getJob() {
		return this.job;
	}

	public void setJob(Job job) {
		this.job = job;
	}	
	
	@Column(name="user_email", length=100)
	public String getUser_email() {
		return user_email;
	}

	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}

}