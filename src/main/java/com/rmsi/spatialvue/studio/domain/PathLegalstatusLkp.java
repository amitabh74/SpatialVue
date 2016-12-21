package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the path_legalstatus_lkp database table.
 * 
 */
@Entity
@Table(name="path_legalstatus_lkp", schema="snpa")
public class PathLegalstatusLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer legalstatusid;
	private String status;
	private Set<RoW_Path> roWPaths;
	private String statws;


	public PathLegalstatusLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getLegalstatusid() {
		return this.legalstatusid;
	}

	public void setLegalstatusid(Integer legalstatusid) {
		this.legalstatusid = legalstatusid;
	}


	@Column(nullable=false, length=50)
	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}


	//bi-directional many-to-one association to RoW_Path
	@JsonIgnore
	@OneToMany(mappedBy="pathLegalstatusLkp", fetch=FetchType.EAGER)
	public Set<RoW_Path> getRoWPaths() {
		return this.roWPaths;
	}

	public void setRoWPaths(Set<RoW_Path> roWPaths) {
		this.roWPaths = roWPaths;
	}
	
	@Column(length=255)
	public String getStatws() {
		return statws;
	}

	public void setStatws(String statws) {
		this.statws = statws;
	}
}