package com.rmsi.spatialvue.studio.domain;
import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the public_user database table.
 * 
 */
@Entity
@Table(name="public_user",schema="snpa")
public class PublicUser implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer complainantid;
	private String address;
	private String languagePreference;
	private String mobile;
	private String name;
	private String phone;
	private String email;
	private Set<Complaint> complaints;
	private boolean isWardenUser;
    public PublicUser() {
    }


	@Id
	@SequenceGenerator(name="puc_sequence",sequenceName="snpa.public_user_complainantid_seq", allocationSize=1) 
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator="puc_sequence") 
	@Column(unique=true, nullable=false)
	public Integer getComplainantid() {
		return this.complainantid;
	}

	public void setComplainantid(Integer complainantid) {
		this.complainantid = complainantid;
	}


	@Column(length=2147483647)
	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}


	@Column(name="language_preference", nullable=false, length=10)
	public String getLanguagePreference() {
		return this.languagePreference;
	}

	public void setLanguagePreference(String languagePreference) {
		this.languagePreference = languagePreference;
	}


	@Column(length=20)
	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}


	@Column(nullable=false, length=50)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}


	@Column(length=20)
	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}


	//bi-directional many-to-one association to Cosmetic_Complaint
	@JsonIgnore
	@OneToMany(mappedBy="publicUser", fetch=FetchType.EAGER)
	public Set<Complaint> getComplaints() {
		return this.complaints;
	}

	
	public void setComplaints(Set<Complaint> complaints) {
		this.complaints = complaints;
	}
	
	@Column(length=100)
	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name="isWardenUser")
	public void setIsWardenUser(boolean isWardenUser) {
		this.isWardenUser = isWardenUser;
	}


	public boolean getIsWardenUser() {
		return isWardenUser;
	}
	
}