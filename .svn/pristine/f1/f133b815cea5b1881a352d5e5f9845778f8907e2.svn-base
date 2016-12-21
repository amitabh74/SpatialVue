package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the Access_Land_polygon database table.
 * 
 */
@Entity
@Table(name="\"Access_Land_polygon\"", schema="snpa")
public class Access_Land_polygon implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer gid;
	private String rowid;
	private Date agreementDate;
	private Date agreementEndDate;
	private String agreementReference;
	private double area;
	private String areaName;
	private String notes;
	private Boolean unresolvedStatus;
	private AccessLandTypeLkp accessLandTypeLkp;
	private Boolean isHistory;
	//private String geom;
	//private Set<AccessLandContact> accessLandContacts;
	private Set<Contact> contacts;
	@Transient
	private Set<Attachment> attachments;
	
	
    public Access_Land_polygon() {
    }


	@Transient
	public Set<Attachment> getAttachments() {
		return attachments;
	}

	@Transient
	public void setAttachments(Set<Attachment> attachments) {
		this.attachments = attachments;
	}


	@Id
	@SequenceGenerator(name="ACCESS_LAND_POLYGON_GID_GENERATOR", sequenceName="snpa.\"Access_Land_polygon_gid_seq\"")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACCESS_LAND_POLYGON_GID_GENERATOR")
	@Column(name="gid",  nullable=false)
	public Integer getGid() {
		return this.gid;
	}

	public void setGid(Integer gid) {
		this.gid = gid;
	}

	@Column(unique=true, name = "row_id", nullable=false)
	public String getRowid() {
		return this.rowid;
	}

	public void setRowid(String rowid) {
		this.rowid = rowid;
	}

    @Temporal( TemporalType.DATE)
	@Column(name="agreement_date")
	public Date getAgreementDate() {
		return this.agreementDate;
	}

	public void setAgreementDate(Date agreementDate) {
		this.agreementDate = agreementDate;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="agreement_end_date")
	public Date getAgreementEndDate() {
		return this.agreementEndDate;
	}

	public void setAgreementEndDate(Date agreementEndDate) {
		this.agreementEndDate = agreementEndDate;
	}


	@Column(name="agreement_reference", length=100)
	public String getAgreementReference() {
		return this.agreementReference;
	}

	public void setAgreementReference(String agreementReference) {
		this.agreementReference = agreementReference;
	}


	public double getArea() {
		return this.area;
	}

	public void setArea(double area) {
		this.area = area;
	}


	@Column(name="area_name", length=100)
	public String getAreaName() {
		return this.areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}


	@Column(length=2147483647)
	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	@Column(name="unresolved_status")
	public Boolean getUnresolvedStatus() {
		return this.unresolvedStatus;
	}

	public void setUnresolvedStatus(Boolean unresolvedStatus) {
		this.unresolvedStatus = unresolvedStatus;
	}
	
	@Column(name="ishistory")
	public Boolean getIsHistory() {
		return isHistory;
	}

	public void setIsHistory(Boolean isHistory) {
		this.isHistory = isHistory;
	}



	//bi-directional many-to-one association to AccessLandTypeLkp
    @ManyToOne
	@JoinColumn(name="type")
	public AccessLandTypeLkp getAccessLandTypeLkp() {
		return this.accessLandTypeLkp;
	}

	public void setAccessLandTypeLkp(AccessLandTypeLkp accessLandTypeLkp) {
		this.accessLandTypeLkp = accessLandTypeLkp;
	}
	
	
	//bi-directional many-to-one association to AccessLandContact
	//@OneToMany(mappedBy="accessLandPolygon", fetch=FetchType.EAGER)
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "access_land_contacts", schema="snpa", joinColumns = { @JoinColumn(name = "gid") }, inverseJoinColumns = { @JoinColumn(name = "contactid") })
	public Set<Contact> getContacts() {
		return this.contacts;
	}

	public void setContacts(Set<Contact> contacts) {
		this.contacts = contacts;
	}
	
	//bi-directional many-to-one association to TaskScheduler
	/*@OneToMany(mappedBy="accessLandPolygon", fetch=FetchType.EAGER)
	@JoinTable(name = "access_land_contacts", schema="snpa", joinColumns = { @JoinColumn(name = "row_id") }, inverseJoinColumns = { @JoinColumn(name = "row_id") })
	public Set<AccessLandContact> getAccessLandContact() {
		return this.accessLandContacts;
	}

	public void setAccessLandContact(Set<AccessLandContact> accessLandContact) {
		this.accessLandContacts = accessLandContact;
	}*/
	
}