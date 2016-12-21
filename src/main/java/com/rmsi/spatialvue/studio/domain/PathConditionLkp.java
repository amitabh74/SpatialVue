package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the path_condition_lkp database table.
 * 
 */
@Entity
@Table(name="path_condition_lkp", schema="snpa")
public class PathConditionLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer conditionid;
	private String condition;
	private String urgency;
	private String cyflwr;
	private Set<RoW_Path> roWPaths;

    public PathConditionLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getConditionid() {
		return this.conditionid;
	}

	public void setConditionid(Integer conditionid) {
		this.conditionid = conditionid;
	}


	@Column(nullable=false, length=70)
	public String getCondition() {
		return this.condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}


	@Column(nullable=false, length=70)
	public String getUrgency() {
		return this.urgency;
	}

	public void setUrgency(String urgency) {
		this.urgency = urgency;
	}


	//bi-directional many-to-one association to RoW_Path
	@JsonIgnore
	@OneToMany(mappedBy="pathConditionLkp", fetch=FetchType.EAGER)
	public Set<RoW_Path> getRoWPaths() {
		return this.roWPaths;
	}

	public void setRoWPaths(Set<RoW_Path> roWPaths) {
		this.roWPaths = roWPaths;
	}
	
	@Column(length=255)
	public String getCyflwr() {
		return cyflwr;
	}

	public void setCyflwr(String cyflwr) {
		this.cyflwr = cyflwr;
	}

	
}