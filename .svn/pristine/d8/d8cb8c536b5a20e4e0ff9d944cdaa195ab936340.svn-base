package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the path_type_lkp database table.
 * 
 */
@Entity
@Table(name="path_type_lkp", schema="snpa")
public class PathTypeLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer pathTypeId;
	private String type;
	private Set<RoW_Path> roWPaths;
	private String math;

    public PathTypeLkp() {
    }


	@Id
	@Column(name="path_type_id", unique=true, nullable=false)
	public Integer getPathTypeId() {
		return this.pathTypeId;
	}

	public void setPathTypeId(Integer pathTypeId) {
		this.pathTypeId = pathTypeId;
	}


	@Column(nullable=false, length=70)
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}


	//bi-directional many-to-one association to RoW_Path
	@JsonIgnore
	@OneToMany(mappedBy="pathTypeLkp", fetch=FetchType.EAGER)
	public Set<RoW_Path> getRoWPaths() {
		return this.roWPaths;
	}

	public void setRoWPaths(Set<RoW_Path> roWPaths) {
		this.roWPaths = roWPaths;
	}
	
	@Column(length=255)
	public String getMath() {
		return this.math;
	}

	public void setMath(String math) {
		this.math = math;
	}
	
}