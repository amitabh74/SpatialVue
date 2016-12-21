package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the surface_type_lkp database table.
 * 
 */
@Entity
@Table(name="surface_type_lkp", schema="snpa")
public class SurfaceTypeLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer typeid;
	private String type;
	private String math;
	private Set<Surface> surfaces;

    public SurfaceTypeLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getTypeid() {
		return this.typeid;
	}

	public void setTypeid(Integer typeid) {
		this.typeid = typeid;
	}


	@Column(length=2147483647)
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	@Column(length=2147483647)
	public String getMath() {
		return this.math;
	}

	public void setMath(String math) {
		this.math = math;
	}



	//bi-directional many-to-one association to Surface
	@JsonIgnore
	@OneToMany(mappedBy="surfaceTypeLkp", fetch=FetchType.EAGER)
	public Set<Surface> getSurfaces() {
		return this.surfaces;
	}

	public void setSurfaces(Set<Surface> surfaces) {
		this.surfaces = surfaces;
	}
	
}