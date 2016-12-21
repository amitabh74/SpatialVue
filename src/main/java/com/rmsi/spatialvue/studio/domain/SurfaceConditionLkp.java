package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the surface_condition_lkp database table.
 * 
 */
@Entity
@Table(name="surface_condition_lkp", schema="snpa")
public class SurfaceConditionLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer conditionid;
	private String condition;
	private String cyflwr;
	private Set<Surface> surfaces;

    public SurfaceConditionLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getConditionid() {
		return this.conditionid;
	}

	public void setConditionid(Integer conditionid) {
		this.conditionid = conditionid;
	}


	@Column(length=2147483647)
	public String getCondition() {
		return this.condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	@Column(length=2147483647)
	public String getCyflwr() {
		return this.cyflwr;
	}

	public void setCyflwr(String cyflwr) {
		this.cyflwr = cyflwr;
	}


	//bi-directional many-to-one association to Surface
	@JsonIgnore
	@OneToMany(mappedBy="surfaceConditionLkp", fetch=FetchType.EAGER)
	public Set<Surface> getSurfaces() {
		return this.surfaces;
	}

	public void setSurfaces(Set<Surface> surfaces) {
		this.surfaces = surfaces;
	}
	
}