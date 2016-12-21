package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;

public class IssueAction implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5617022758107198684L;
	private String issueId;
	public String getIssueId() {
		return issueId;
	}
	public void setIssueId(String issueId) {
		this.issueId = issueId;
	}
	public String getActionType() {
		return actionType;
	}
	public void setActionType(String actionType) {
		this.actionType = actionType;
	}
	private String actionType;
}
