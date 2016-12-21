package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the issue_reason_lkp database table.
 * 
 */
@Entity
@Table(name="issue_reason_lkp", schema="snpa")
public class IssueReasonLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer reasonid;
	private String reason;
	private String math;
	private Set<Issue> issues;

    public IssueReasonLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getReasonid() {
		return this.reasonid;
	}

	public void setReasonid(Integer reasonid) {
		this.reasonid = reasonid;
	}


	@Column(length=255)
	public String getReason() {
		return this.reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
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
	@OneToMany(mappedBy="issueReasonLkp", fetch=FetchType.EAGER)
	public Set<Issue> getIssues() {
		return this.issues;
	}

	public void setIssues(Set<Issue> issues) {
		this.issues = issues;
	}
	
}