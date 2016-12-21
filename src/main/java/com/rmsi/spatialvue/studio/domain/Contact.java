package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the contact database table.
 * 
 */
@Entity
@Table(name="contact", schema="snpa")
public class Contact implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer contactid;
	private String address;
	private String company;
	private String county;
	private String email;
	private String fax;
	private String firstName;
	private String initials;
	private String mobile;
	private String position;
	private String postcode;
	private String _primary_phone_;
	private String _secondary_phone_;
	private String surname;
	private String title;
	private String town;
	private Boolean active;
	private Set<AccessLandContact> accessLandContacts;
	private ContactTypeLkp contactTypeLkp;
	private Set<PathContact> pathContacts;
	private Set<FurnitureContact> furnitureContacts;
	private Set<Issue> issues;
	private Set<SurfaceContact> surfaceContacts;
	private Set<JobContact> jobContacts;
	
	//added by saurabh
	private Set<Complaint> complaints;
	
    public Contact() {
    }


    @Id
	@SequenceGenerator(name="CONTACT_ID_GENERATOR", sequenceName="snpa.contact_contactid_seq")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="CONTACT_ID_GENERATOR")
	@Column(name="contactid", unique=true, nullable=false)
	public Integer getContactid() {
		return this.contactid;
	}

	public void setContactid(Integer contactid) {
		this.contactid = contactid;
	}


	@Column(length=2147483647)
	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}


	@Column(length=255)
	public String getCompany() {
		return this.company;
	}

	public void setCompany(String company) {
		this.company = company;
	}


	@Column(length=50)
	public String getCounty() {
		return this.county;
	}

	public void setCounty(String county) {
		this.county = county;
	}


	@Column(length=100)
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	@Column(length=20)
	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}


	@Column(name="first_name", length=50)
	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	@Column(length=50)
	public String getInitials() {
		return this.initials;
	}

	public void setInitials(String initials) {
		this.initials = initials;
	}


	@Column(length=20)
	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}


	@Column(length=50)
	public String getPosition() {
		return this.position;
	}

	public void setPosition(String position) {
		this.position = position;
	}


	@Column(length=20)
	public String getPostcode() {
		return this.postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}


	@Column(name="primary_phone", length=20)
	public String get_primary_phone_() {
		return this._primary_phone_;
	}

	public void set_primary_phone_(String _primary_phone_) {
		this._primary_phone_ = _primary_phone_;
	}


	@Column(name="secondary_phone", length=20)
	public String get_secondary_phone_() {
		return this._secondary_phone_;
	}

	public void set_secondary_phone_(String _secondary_phone_) {
		this._secondary_phone_ = _secondary_phone_;
	}


	@Column(length=50)
	public String getSurname() {
		return this.surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}


	@Column(length=10)
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}


	@Column(length=50)
	public String getTown() {
		return this.town;
	}

	public void setTown(String town) {
		this.town = town;
	}


	//bi-directional many-to-one association to AccessLandContact
	@JsonIgnore
	@OneToMany(mappedBy="contact", fetch=FetchType.EAGER)
	public Set<AccessLandContact> getAccessLandContacts() {
		return this.accessLandContacts;
	}

	public void setAccessLandContacts(Set<AccessLandContact> accessLandContacts) {
		this.accessLandContacts = accessLandContacts;
	}
	

	//bi-directional many-to-one association to ContactTypeLkp
    @ManyToOne
	@JoinColumn(name="contact_type")
	public ContactTypeLkp getContactTypeLkp() {
		return this.contactTypeLkp;
	}

	public void setContactTypeLkp(ContactTypeLkp contactTypeLkp) {
		this.contactTypeLkp = contactTypeLkp;
	}
	
	//bi-directional many-to-one association to PathContact
	@JsonIgnore
	@OneToMany(mappedBy="contact", fetch=FetchType.EAGER)
	public Set<PathContact> getPathContacts() {
		return this.pathContacts;
	}

	public void setPathContacts(Set<PathContact> pathContacts) {
		this.pathContacts = pathContacts;
	}
	
	
	//bi-directional many-to-one association to FurnitureContact
	@JsonIgnore
	@OneToMany(mappedBy="contact", fetch=FetchType.EAGER)
	public Set<FurnitureContact> getFurnitureContacts() {
		return this.furnitureContacts;
	}

	public void setFurnitureContacts(Set<FurnitureContact> furnitureContacts) {
		this.furnitureContacts = furnitureContacts;
	}
	
	//bi-directional many-to-many association to Issue
	@JsonIgnore
	@ManyToMany(mappedBy="contacts", fetch=FetchType.EAGER)
	public Set<Issue> getIssues() {
		return this.issues;
	}

	public void setIssues(Set<Issue> issues) {
		this.issues = issues;
	}
	
	//bi-directional many-to-one association to SurfaceContact
	@JsonIgnore
	@OneToMany(mappedBy="contact", fetch=FetchType.EAGER)
	public Set<SurfaceContact> getSurfaceContacts() {
		return this.surfaceContacts;
	}

	public void setSurfaceContacts(Set<SurfaceContact> surfaceContacts) {
		this.surfaceContacts = surfaceContacts;
	}
	@JsonIgnore
	@OneToMany(mappedBy="job", fetch=FetchType.EAGER)
	public Set<JobContact> getJobContacts() {
		return this.jobContacts;
	}

	public void setJobContacts(Set<JobContact> jobContacts) {
		this.jobContacts = jobContacts;
	}

	@JsonIgnore
	@OneToMany(mappedBy="contact", fetch=FetchType.EAGER)
	public Set<Complaint> getComplaints() {
		return complaints;
	}
	
	public void setComplaints(Set<Complaint> complaints) {
		this.complaints = complaints;
	}


	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
}