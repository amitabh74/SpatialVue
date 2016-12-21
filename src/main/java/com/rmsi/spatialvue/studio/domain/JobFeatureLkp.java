package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the furniture_type_lkp database table.
 * 
 */
@Entity
@Table(name="job_feature_lkp", schema ="snpa")
public class JobFeatureLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer typeid;
	private String type;
	private String math;


    public JobFeatureLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getTypeid() {
		return this.typeid;
	}

	public void setTypeid(Integer typeid) {
		this.typeid = typeid;
	}


	@Column(name="type",length=150)
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	@Column(name="math", length=100)
	public String getMath() {
		return this.math;
	}

	public void setMath(String math) {
		this.math = math;
	}
}