package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the issue_urgency_lkp database table.
 * 
 */
@Entity
@Table(name="issue_urgency_lkp", schema="snpa")
public class IssueUrgencyLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer urgencyid;
	private String urgencyType;
	private String brys;
	private Set<Issue> issues;

    public IssueUrgencyLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getUrgencyid() {
		return this.urgencyid;
	}

	public void setUrgencyid(Integer urgencyid) {
		this.urgencyid = urgencyid;
	}


	@Column(name="urgency_type", length=255)
	public String getUrgencyType() {
		return this.urgencyType;
	}

	public void setUrgencyType(String urgencyType) {
		this.urgencyType = urgencyType;
	}
	
	@Column(length=255)
	public String getBrys() {
		return this.brys;
	}

	public void setBrys(String brys) {
		this.brys = brys;
	}


	//bi-directional many-to-one association to Issue
	@JsonIgnore
	@OneToMany(mappedBy="issueUrgencyLkp", fetch=FetchType.EAGER)
	public Set<Issue> getIssues() {
		return this.issues;
	}

	public void setIssues(Set<Issue> issues) {
		this.issues = issues;
	}
	
}