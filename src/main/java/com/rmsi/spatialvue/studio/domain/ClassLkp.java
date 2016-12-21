package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnore;


/**
 * The persistent class for the class_lkp database table.
 * 
 */
@Entity
@Table(name="class_lkp", schema="snpa")
public class ClassLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String priority;
	private Set<RoW_Path> roWPaths;

    public ClassLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	@Column(length=15)
	public String getPriority() {
		return this.priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	//bi-directional many-to-one association to RoW_Path
	@JsonIgnore
	@OneToMany(mappedBy="classLkp", fetch=FetchType.EAGER)
	public Set<RoW_Path> getRoWPaths() {
		return this.roWPaths;
	}

	public void setRoWPaths(Set<RoW_Path> roWPaths) {
		this.roWPaths = roWPaths;
	}
	
}