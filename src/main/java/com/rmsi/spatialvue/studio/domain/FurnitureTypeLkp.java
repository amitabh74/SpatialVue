package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the furniture_type_lkp database table.
 * 
 */
@Entity
@Table(name="furniture_type_lkp", schema ="snpa")
public class FurnitureTypeLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer typeid;
	private String type;
	private String math;
	//private Set<Furniture> furnitures;

    public FurnitureTypeLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getTypeid() {
		return this.typeid;
	}

	public void setTypeid(Integer typeid) {
		this.typeid = typeid;
	}


	@Column(name="type",length=150)
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


/*
	//bi-directional many-to-one association to Furniture
	@JsonIgnore
	@OneToMany(mappedBy="furnitureTypeLkp", fetch=FetchType.EAGER)
	public Set<Furniture> getFurnitures() {
		return this.furnitures;
	}

	public void setFurnitures(Set<Furniture> furnitures) {
		this.furnitures = furnitures;
	} */
	
}