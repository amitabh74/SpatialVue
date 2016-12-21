package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the Surface database table.
 * 
 */
@Entity
@Table(name="\"Surface\"", schema="snpa")
public class Surface implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer gid;
	private double averageWidth;
	private Boolean ishistory;
	private Date lastInspected;
	private Date lastsurfacedate;
	private double length;
	private String notes;
	private String surfaceid;
	private String rowId;
	private Integer surveyor;
	//private Object theGeom;
	private Boolean unresolvedStatus;
	private SurfaceConditionLkp surfaceConditionLkp;
	private SurfaceTypeLkp surfaceTypeLkp;
	private Set<Contact> contacts;
	@Transient
	private Set<Attachment> attachments;
    public Surface() {
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
	@SequenceGenerator(name="SURFACE_GID_GENERATOR", sequenceName="snpa.\"SURFACE_GID\"")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SURFACE_GID_GENERATOR")
	@Column(unique=true, nullable=false)
	public Integer getGid() {
		return this.gid;
	}

	public void setGid(Integer gid) {
		this.gid = gid;
	}


	@Column(name="average_width")
	public double getAverageWidth() {
		return this.averageWidth;
	}

	public void setAverageWidth(double averageWidth) {
		this.averageWidth = averageWidth;
	}


	public Boolean getIshistory() {
		return this.ishistory;
	}

	public void setIshistory(Boolean ishistory) {
		this.ishistory = ishistory;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="last_inspected")
	public Date getLastInspected() {
		return this.lastInspected;
	}

	public void setLastInspected(Date lastInspected) {
		this.lastInspected = lastInspected;
	}


    @Temporal( TemporalType.DATE)
	public Date getLastsurfacedate() {
		return this.lastsurfacedate;
	}

	public void setLastsurfacedate(Date lastsurfacedate) {
		this.lastsurfacedate = lastsurfacedate;
	}


	public double getLength() {
		return this.length;
	}

	public void setLength(double length) {
		this.length = length;
	}


	@Column(length=2147483647)
	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	@Column(name="surface_id", length=20)
	public String getsurfaceid() {
		return this.surfaceid;
	}

	public void setsurfaceid(String surfaceid) {
		this.surfaceid = surfaceid;
	}
	
	@Column(name="row_id", length=10)
	public String getRowId() {
		return this.rowId;
	}

	public void setRowId(String rowId) {
		this.rowId = rowId;
	}


	public Integer getSurveyor() {
		return this.surveyor;
	}

	public void setSurveyor(Integer surveyor) {
		this.surveyor = surveyor;
	}


	/*@Column(name="the_geom")
	public Object getTheGeom() {
		return this.theGeom;
	}

	public void setTheGeom(Object theGeom) {
		this.theGeom = theGeom;
	}*/


	@Column(name="unresolved_status")
	public Boolean getUnresolvedStatus() {
		return this.unresolvedStatus;
	}

	public void setUnresolvedStatus(Boolean unresolvedStatus) {
		this.unresolvedStatus = unresolvedStatus;
	}


	//bi-directional many-to-one association to SurfaceConditionLkp
    @ManyToOne
	@JoinColumn(name="condition")
	public SurfaceConditionLkp getSurfaceConditionLkp() {
		return this.surfaceConditionLkp;
	}

	public void setSurfaceConditionLkp(SurfaceConditionLkp surfaceConditionLkp) {
		this.surfaceConditionLkp = surfaceConditionLkp;
	}
	

	//bi-directional many-to-one association to SurfaceTypeLkp
    @ManyToOne
	@JoinColumn(name="type")
	public SurfaceTypeLkp getSurfaceTypeLkp() {
		return this.surfaceTypeLkp;
	}

	public void setSurfaceTypeLkp(SurfaceTypeLkp surfaceTypeLkp) {
		this.surfaceTypeLkp = surfaceTypeLkp;
	}
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "surface_contacts", schema="snpa", joinColumns = { @JoinColumn(name = "surface_gid") }, inverseJoinColumns = { @JoinColumn(name = "contactid") })
	public Set<Contact> getContacts() {
		return this.contacts;
	}

	public void setContacts(Set<Contact> contacts) {
		this.contacts = contacts;
	}
	
	//bi-directional many-to-one association to SurfaceContact
	/*@OneToMany(mappedBy="surface", fetch=FetchType.EAGER)
	public Set<SurfaceContact> getSurfaceContacts() {
		return this.surfaceContacts;
	}*/

	/*public void setSurfaceContacts(Set<SurfaceContact> surfaceContacts) {
		this.surfaceContacts = surfaceContacts;
	}*/
	
}