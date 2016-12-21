package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the furniture_condition_lkp database table.
 * 
 */
@Entity
@Table(name="furniture_condition_lkp", schema="snpa")
public class FurnitureConditionLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer conditionid;
	private String condition;
	private String cyflwr;
	private Set<Furniture> furnitures;

    public FurnitureConditionLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getConditionid() {
		return this.conditionid;
	}

	public void setConditionid(Integer conditionid) {
		this.conditionid = conditionid;
	}


	@Column(length=2147483647)
	public String getCondition() {
		return this.condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getCyflwr() {
		return cyflwr;
	}

	public void setCyflwr(String cyflwr) {
		this.cyflwr = cyflwr;
	}


	//bi-directional many-to-one association to Furniture
	@JsonIgnore
	@OneToMany(mappedBy="furnitureConditionLkp", fetch=FetchType.EAGER)
	public Set<Furniture> getFurnitures() {
		return this.furnitures;
	}

	public void setFurnitures(Set<Furniture> furnitures) {
		this.furnitures = furnitures;
	}
	
}