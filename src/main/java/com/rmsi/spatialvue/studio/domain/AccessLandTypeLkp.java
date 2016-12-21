package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Set;


/**
 * The persistent class for the access_land_type_lkp database table.
 * 
 */
@Entity
@Table(name="access_land_type_lkp", schema="snpa")
public class AccessLandTypeLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer typeid;
	private String type;
	private String math;
	//private Set<Access_Land_polygon> accessLandPolygons;

    public AccessLandTypeLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getTypeid() {
		return this.typeid;
	}

	public void setTypeid(Integer typeid) {
		this.typeid = typeid;
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


	/*//bi-directional many-to-one association to Access_Land_polygon
	@OneToMany(mappedBy="accessLandTypeLkp", fetch=FetchType.EAGER)
	public Set<Access_Land_polygon> getAccessLandPolygons() {
		return this.accessLandPolygons;
	}

	public void setAccessLandPolygons(Set<Access_Land_polygon> accessLandPolygons) {
		this.accessLandPolygons = accessLandPolygons;
	}*/
	
}