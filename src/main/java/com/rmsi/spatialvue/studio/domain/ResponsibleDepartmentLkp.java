package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the responsible_department_lkp database table.
 * 
 */
@Entity
@Table(name="responsible_department_lkp", schema="snpa")
public class ResponsibleDepartmentLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer departmentid;
	private String department;
	private String adran;
	private Set<Issue> issues;

    public ResponsibleDepartmentLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getDepartmentid() {
		return this.departmentid;
	}

	public void setDepartmentid(Integer departmentid) {
		this.departmentid = departmentid;
	}


	@Column(nullable=false, length=100)
	public String getDepartment() {
		return this.department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}
	
	@Column(length=255)
	public String getAdran() {
		return this.adran;
	}

	public void setAdran(String adran) {
		this.adran = adran;
	}


	//bi-directional many-to-one association to Issue
	@JsonIgnore
	@OneToMany(mappedBy="responsibleDepartmentLkp", fetch=FetchType.EAGER)
	public Set<Issue> getIssues() {
		return this.issues;
	}

	public void setIssues(Set<Issue> issues) {
		this.issues = issues;
	}
	
}