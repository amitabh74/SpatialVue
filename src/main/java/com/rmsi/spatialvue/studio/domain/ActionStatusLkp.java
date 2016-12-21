package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the action_status_lkp database table.
 * 
 */
@Entity
@Table(name="action_status_lkp", schema="snpa")
public class ActionStatusLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer actionstatusid;
	private String actionStatus;
	private String statws;
	private Set<Issue> issues;

    public ActionStatusLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getActionstatusid() {
		return this.actionstatusid;
	}

	public void setActionstatusid(Integer actionstatusid) {
		this.actionstatusid = actionstatusid;
	}


	@Column(name="action_status", length=255)
	public String getActionStatus() {
		return this.actionStatus;
	}

	public void setActionStatus(String actionStatus) {
		this.actionStatus = actionStatus;
	}
	
	@Column(length=255)
	public String getStatws() {
		return this.statws;
	}

	public void setStatws(String statws) {
		this.statws = statws;
	}


	//bi-directional many-to-one association to Issue
	@JsonIgnore
	@OneToMany(mappedBy="actionStatusLkp", fetch=FetchType.EAGER)
	public Set<Issue> getIssues() {
		return this.issues;
	}

	public void setIssues(Set<Issue> issues) {
		this.issues = issues;
	}
	
}