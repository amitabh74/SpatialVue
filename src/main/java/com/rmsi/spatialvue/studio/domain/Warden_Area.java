package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the Warden_Area database table.
 * 
 */
@Entity
@Table(name="\"Warden_Area\"", schema="snpa")
public class Warden_Area implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer gid;
	private String wardenArea;
	private String position;
	private String warden;
	//private Set<RoW_Path> roWPaths;

    public Warden_Area() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getGid() {
		return this.gid;
	}

	public void setGid(Integer gid) {
		this.gid = gid;
	}


	@Column(length=75)
	public String getPosition() {
		return this.position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	@Column(length=100)
	public String getWarden() {
		return this.warden;
	}

	
	public void setWarden(String warden) {
		this.warden = warden;
	}
	
	@Column(length=75, name="warden_are")
	public String getWardenArea() {
		return wardenArea;
	}


	public void setWardenArea(String wardenArea) {
		this.wardenArea = wardenArea;
	}


	//bi-directional many-to-one association to RoW_Path
	/*@JsonIgnore
	@OneToMany(mappedBy="wardenArea", fetch=FetchType.EAGER)
	public Set<RoW_Path> getRoWPaths() {
		return this.roWPaths;
	}

	public void setRoWPaths(Set<RoW_Path> roWPaths) {
		this.roWPaths = roWPaths;
	}*/
	
}