package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the Community_Councils database table.
 * 
 */
@Entity
@Table(name="\"Community_Councils\"", schema="snpa")
public class Community_Council implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer gid;
	private String communityi;
	private String name;
	//private Set<RoW_Path> roWPaths;

    public Community_Council() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getGid() {
		return this.gid;
	}

	public void setGid(Integer gid) {
		this.gid = gid;
	}


	@Column(name="communityid", length=4)
	public String getCommunityi() {
		return this.communityi;
	}

	public void setCommunityi(String communityi) {
		this.communityi = communityi;
	}
	
	@Column(name="_name", length=75)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/*//bi-directional many-to-one association to RoW_Path
	@JsonIgnore
	@OneToMany(mappedBy="communityCouncil", fetch=FetchType.EAGER)
	public Set<RoW_Path> getRoWPaths() {
		return this.roWPaths;
	}

	public void setRoWPaths(Set<RoW_Path> roWPaths) {
		this.roWPaths = roWPaths;
	}*/
	
}