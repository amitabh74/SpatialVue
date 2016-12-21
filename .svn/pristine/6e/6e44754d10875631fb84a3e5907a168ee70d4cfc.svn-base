package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the Furniture database table.
 * 
 */
@Entity
@Table(name="\"Furniture\"", schema="snpa")
public class Furniture implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer gid;
	private String furnitureid;
	private Date installedDate;
	private Boolean ishistory;
	private Date lastInspected;
	private Date nextPathsurvey;
	private String notes;
	private String rowId;
	private Integer surveyor;
	private Boolean unresolvedIssues;
	private FurnitureConditionLkp furnitureConditionLkp;
	private FurnitureTypeLkp furnitureTypeLkp;
	//private User user;
	private Set<Contact> contacts;
	@Transient
	private Set<Attachment> attachments;
	
	@Transient
	private String surveyorName;
	
	@Transient
    public String getSurveyorName() {
		return surveyorName;
	}
	@Transient
	public void setSurveyorName(String surveyorName) {
		this.surveyorName = surveyorName;
	}

	public Furniture() {
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
	@SequenceGenerator(name="FURNITURE_GID_GENERATOR", sequenceName="snpa.\"Furniture_gid_seq\"")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="FURNITURE_GID_GENERATOR")
	@Column(unique=true, nullable=false)
	public Integer getGid() {
		return this.gid;
	}

	public void setGid(Integer gid) {
		this.gid = gid;
	}


	@Column(length=12)
	public String getFurnitureid() {
		return this.furnitureid;
	}

	public void setFurnitureid(String furnitureid) {
		this.furnitureid = furnitureid;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="installed_date")
	public Date getInstalledDate() {
		return this.installedDate;
	}

	public void setInstalledDate(Date installedDate) {
		this.installedDate = installedDate;
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
	@Column(name="next_pathsurvey")
	public Date getNextPathsurvey() {
		return this.nextPathsurvey;
	}

	public void setNextPathsurvey(Date nextPathsurvey) {
		this.nextPathsurvey = nextPathsurvey;
	}


	@Column(length=150)
	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
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


	@Column(name="unresolved_issues")
	public Boolean getUnresolvedIssues() {
		return this.unresolvedIssues;
	}

	public void setUnresolvedIssues(Boolean unresolvedIssues) {
		this.unresolvedIssues = unresolvedIssues;
	}


	//bi-directional many-to-one association to FurnitureConditionLkp
    @ManyToOne
	@JoinColumn(name="condition")
	public FurnitureConditionLkp getFurnitureConditionLkp() {
		return this.furnitureConditionLkp;
	}

    public void setFurnitureConditionLkp(FurnitureConditionLkp furnitureConditionLkp) {
		this.furnitureConditionLkp = furnitureConditionLkp;
	}
    
  /*
    //bi-directional many-to-one association to User
    @ManyToOne
	@JoinColumn(name="email")
	public User getUser() {
		return this.user;
	}
    public void setUser(User user) {
		this.user = user;
	}
*/
	//bi-directional many-to-one association to FurnitureTypeLkp
    @ManyToOne
	@JoinColumn(name="type")
	public FurnitureTypeLkp getFurnitureTypeLkp() {
		return this.furnitureTypeLkp;
	}

	public void setFurnitureTypeLkp(FurnitureTypeLkp furnitureTypeLkp) {
		this.furnitureTypeLkp = furnitureTypeLkp;
	}
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "furniture_contacts", schema="snpa", joinColumns = { @JoinColumn(name = "furniture_gid") }, inverseJoinColumns = { @JoinColumn(name = "contactid") })
	public Set<Contact> getContacts() {
		return this.contacts;
	}

	public void setContacts(Set<Contact> contacts) {
		this.contacts = contacts;
	}
	
}