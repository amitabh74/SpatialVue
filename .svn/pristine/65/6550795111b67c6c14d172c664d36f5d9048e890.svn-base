package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the Complaint_Nature_Lkp database table.
 * 
 */
@Entity
@Table(name="\"Complaint_Nature_Lkp\"", schema="snpa")
public class Complaint_Nature_Lkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer enquiryid;
	private String enquiryType;
	private String enquiryTypeWelsh;
	private Set<Complaint> complaints;

    public Complaint_Nature_Lkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getEnquiryid() {
		return this.enquiryid;
	}

	public void setEnquiryid(Integer enquiryid) {
		this.enquiryid = enquiryid;
	}


	@Column(name="enquiry_type", nullable=false, length=100)
	public String getEnquiryType() {
		return this.enquiryType;
	}

	public void setEnquiryType(String enquiryType) {
		this.enquiryType = enquiryType;
	}
	
	@Column(name="enquiry_type_welsh", nullable=false, length=100)
	public String getEnquiryTypeWelsh() {
		return this.enquiryTypeWelsh;
	}

	public void setEnquiryTypeWelsh(String enquiryTypeWelsh) {
		this.enquiryTypeWelsh = enquiryTypeWelsh;
	}

    @JsonIgnore
	//bi-directional many-to-one association to Cosmetic_Complaint
	@OneToMany(mappedBy="complaintNatureLkp", fetch=FetchType.EAGER)
	public Set<Complaint> getComplaints() {
		return this.complaints;
	}

	public void setComplaints(Set<Complaint> complaints) {
		this.complaints = complaints;
	}
	
}
