package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the RoW_Paths database table.
 * 
 */
@Entity
@Table(name="\"RoW_Paths\"", schema="snpa")
public class RoW_Path implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer gid;
	private Date agreementEndDate;
	private String agreementRef;
	private Date dateofnextsurvey;
	private String description;
	private Date lastsurvey;
	private double lengthKm;
	private String notes;
	private Boolean promotedRoute;
	private String rowId;
	private String startfrom;
	
	private String to;
	private Integer unresolvedIssues;
	//private Warden_Area wardenArea;
	private PathConditionLkp pathConditionLkp;
	private PathLegalstatusLkp pathLegalstatusLkp;
	private PathTypeLkp pathTypeLkp;
	private ResponsibleDepartmentLkp responsibleDepartmentLkp;
	private ClassLkp classLkp;
	//private Community_Council communityCouncil;
	//changed by Saurabh
	/*commented by PBJ
	 * private Integer assignedTo;*/
	
	//commented by Saurabh
	//private User assignedTo;
	//private Integer surveyedBy;
	private String assignedTo;
	private String surveyedBy;
	
	private Set<Contact> contacts;
	private Boolean ishistory;
	
	//added by saurabh
	private String wardenarea;
	private String community;
    public RoW_Path() {
    }


	@Id
	@SequenceGenerator(name="ROW_PATHS_GID_GENERATOR", sequenceName="ROW_PATHS_GID")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ROW_PATHS_GID_GENERATOR")
	@Column(unique=true, nullable=false)
	public Integer getGid() {
		return this.gid;
	}

	public void setGid(Integer gid) {
		this.gid = gid;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="agreement_end_date")
	public Date getAgreementEndDate() {
		return this.agreementEndDate;
	}

	public void setAgreementEndDate(Date agreementEndDate) {
		this.agreementEndDate = agreementEndDate;
	}


	@Column(name="agreement_ref", length=50)
	public String getAgreementRef() {
		return this.agreementRef;
	}

	public void setAgreementRef(String agreementRef) {
		this.agreementRef = agreementRef;
	}


	/*// Added by PBJ
	@ManyToOne
	@JoinColumn(name="assigned_to", referencedColumnName="id")
	public User getAssignedTo() {
		return this.assignedTo;
	}

	public void setAssignedTo(User assignedTo) {
		this.assignedTo = assignedTo;
	}*/

	

/*	commented by PBJ
 * @Column(name="assigned_to")
	public Integer getAssignedTo() {
		return this.assignedTo;
	}

	public void setAssignedTo(Integer assignedTo) {
		this.assignedTo = assignedTo;
	}
*/
	//added by saurabh 
	@Column(name="assigned_to")
		public String getAssignedTo() {
			return this.assignedTo;
		}

		public void setAssignedTo(String assignedTo) {
			this.assignedTo = assignedTo;
		}

    @Temporal( TemporalType.DATE)
	public Date getDateofnextsurvey() {
		return this.dateofnextsurvey;
	}

	public void setDateofnextsurvey(Date dateofnextsurvey) {
		this.dateofnextsurvey = dateofnextsurvey;
	}


	@Column(length=2147483647)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


    @Temporal( TemporalType.DATE)
	public Date getLastsurvey() {
		return this.lastsurvey;
	}

	public void setLastsurvey(Date lastsurvey) {
		this.lastsurvey = lastsurvey;
	}


	@Column(name="length_km")
	public double getLengthKm() {
		return this.lengthKm;
	}

	public void setLengthKm(double lengthKm) {
		this.lengthKm = lengthKm;
	}


	@Column(length=150)
	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}


	@Column(name="promoted_route", nullable=false)
	public Boolean getPromotedRoute() {
		return this.promotedRoute;
	}

	public void setPromotedRoute(Boolean promotedRoute) {
		this.promotedRoute = promotedRoute;
	}


	@Column(name="row_id", length=25)
	public String getRowId() {
		return this.rowId;
	}

	public void setRowId(String rowId) {
		this.rowId = rowId;
	}


	@Column(length=125)
	public String getStartfrom() {
		return this.startfrom;
	}

	public void setStartfrom(String startfrom) {
		this.startfrom = startfrom;
	}


	/*@Column(name="surveyed_by")
	public Integer getSurveyedBy() {
		return this.surveyedBy;
	}

	public void setSurveyedBy(Integer surveyedBy) {
		this.surveyedBy = surveyedBy;
	}*/
	
	@Column(name="surveyed_by")
	public String getSurveyedBy() {
		return this.surveyedBy;
	}

	public void setSurveyedBy(String surveyedBy) {
		this.surveyedBy = surveyedBy;
	}

	@Column(length=125)
	public String getTo() {
		return this.to;
	}

	public void setTo(String to) {
		this.to = to;
	}


	@Column(name="unresolved_issues")
	public Integer getUnresolvedIssues() {
		return this.unresolvedIssues;
	}

	public void setUnresolvedIssues(Integer unresolvedIssues) {
		this.unresolvedIssues = unresolvedIssues;
	}


	/*//bi-directional many-to-one association to Warden_Area
    @ManyToOne
	@JoinColumn(name="wardenarea", referencedColumnName="warden_are")
	public Warden_Area getWardenArea() {
		return this.wardenArea;
	}

	public void setWardenArea(Warden_Area wardenArea) {
		this.wardenArea = wardenArea;
	}*/
	

	//bi-directional many-to-one association to PathConditionLkp
    @ManyToOne
	@JoinColumn(name="condition")
	public PathConditionLkp getPathConditionLkp() {
		return this.pathConditionLkp;
	}

	public void setPathConditionLkp(PathConditionLkp pathConditionLkp) {
		this.pathConditionLkp = pathConditionLkp;
	}
	

	//bi-directional many-to-one association to PathLegalstatusLkp
    @ManyToOne
	@JoinColumn(name="legalstatus")
	public PathLegalstatusLkp getPathLegalstatusLkp() {
		return this.pathLegalstatusLkp;
	}

	public void setPathLegalstatusLkp(PathLegalstatusLkp pathLegalstatusLkp) {
		this.pathLegalstatusLkp = pathLegalstatusLkp;
	}
	

	//bi-directional many-to-one association to PathTypeLkp
    @ManyToOne
	@JoinColumn(name="type")
	public PathTypeLkp getPathTypeLkp() {
		return this.pathTypeLkp;
	}

	public void setPathTypeLkp(PathTypeLkp pathTypeLkp) {
		this.pathTypeLkp = pathTypeLkp;
	}
	

	//bi-directional many-to-one association to ResponsibleDepartmentLkp
    @ManyToOne
	@JoinColumn(name="responsibility")
	public ResponsibleDepartmentLkp getResponsibleDepartmentLkp() {
		return this.responsibleDepartmentLkp;
	}

	public void setResponsibleDepartmentLkp(ResponsibleDepartmentLkp responsibleDepartmentLkp) {
		this.responsibleDepartmentLkp = responsibleDepartmentLkp;
	}
	

	//bi-directional many-to-one association to ClassLkp
    @ManyToOne
	@JoinColumn(name="_class", referencedColumnName="id")
	public ClassLkp getClassLkp() {
		return this.classLkp;
	}

	public void setClassLkp(ClassLkp classLkp) {
		this.classLkp = classLkp;
	}
	
	/*//bi-directional many-to-one association to Community_Council
    @ManyToOne
	@JoinColumn(name="community", referencedColumnName="name")
	public Community_Council getCommunityCouncil() {
		return this.communityCouncil;
	}

	public void setCommunityCouncil(Community_Council communityCouncil) {
		this.communityCouncil = communityCouncil;
	}*/
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "path_contacts", schema="snpa", joinColumns = { @JoinColumn(name = "path_gid") }, inverseJoinColumns = { @JoinColumn(name = "contactid") })
	public Set<Contact> getContacts() {
		return this.contacts;
	}

	public void setContacts(Set<Contact> contacts) {
		this.contacts = contacts;
	}
	@Column(name="ishistory")
	public Boolean getIsHistory() {
		return ishistory;
	}

	public void setIsHistory(Boolean isHistory) {
		this.ishistory = isHistory;
	}

	@Column(name="wardenarea")
	public String getWardenarea() {
		return wardenarea;
	}
	
	public void setWardenarea(String wardenarea) {
		this.wardenarea = wardenarea;
	}


	@Column(name="community")
	public String getCommunity() {
		return community;
	}

	public void setCommunity(String community) {
		this.community = community;
	}


	
	
}