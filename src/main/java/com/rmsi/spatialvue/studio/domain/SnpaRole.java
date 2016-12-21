package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the snpa_roles database table.
 * 
 */
@Entity
@Table(name="snpa_roles",schema="snpa")
public class SnpaRole implements Serializable {
	private static final long serialVersionUID = 1L;
	private String role;
	private String description;
	private Integer id;
	private String math;

    public SnpaRole() {
    }


	@Id
	@Column(unique=true, nullable=false, length=50)
	public String getRole() {
		return this.role;
	}

	public void setRole(String role) {
		this.role = role;
	}


	@Column(length=100)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	@Column(nullable=false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(length=255)
	public String getMath() {
		return this.math;
	}

	public void setMath(String math) {
		this.math = math;
	}
}