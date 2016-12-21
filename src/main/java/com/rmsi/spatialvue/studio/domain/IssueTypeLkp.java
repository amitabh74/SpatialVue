package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the issue_type_lkp database table.
 * 
 */
@Entity
@Table(name="issue_type_lkp",schema="snpa")
public class IssueTypeLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer issuetypeid;
	private String type;
	private String math;
	private Set<Issue> issues;

    public IssueTypeLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getIssuetypeid() {
		return this.issuetypeid;
	}

	public void setIssuetypeid(Integer issuetypeid) {
		this.issuetypeid = issuetypeid;
	}


	@Column(length=255)
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	@Column(length=255)
	public String getMath() {
		return this.math;
	}

	public void setMath(String math) {
		this.math = math;
	}


	//bi-directional many-to-one association to Issue
	@JsonIgnore
	@OneToMany(mappedBy="issueTypeLkp", fetch=FetchType.EAGER)
	public Set<Issue> getIssues() {
		return this.issues;
	}

	public void setIssues(Set<Issue> issues) {
		this.issues = issues;
	}
	
}