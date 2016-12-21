package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the job_type_lkp database table.
 * 
 */
@Entity
@Table(name="job_type_lkp", schema ="snpa")
public class JobTypeLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer typeid;
	private String math;
	private String type;
	//private Set<Job> jobs;

    public JobTypeLkp() {
    }


	@Id
	//@SequenceGenerator(name="JOB_TYPE_LKP_TYPEID_GENERATOR", sequenceName="TYPEID_GID_GENERATOR")
	//@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="JOB_TYPE_LKP_TYPEID_GENERATOR")
	@Column(name="typeid",unique=true, nullable=false)
	public Integer getTypeid() {
		return this.typeid;
	}

	public void setTypeid(Integer typeid) {
		this.typeid = typeid;
	}

	public String getMath() {
		return this.math;
	}

	public void setMath(String math) {
		this.math = math;
	}

	@Column(name="type")
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}


	/*//bi-directional many-to-one association to Job
	@JsonIgnore
	@OneToMany(mappedBy="jobTypeLkp", fetch=FetchType.EAGER)
	public Set<Job> getJobs() {
		return this.jobs;
	}

	public void setJobs(Set<Job> jobs) {
		this.jobs = jobs;
	}*/
	
}