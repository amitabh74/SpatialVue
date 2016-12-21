package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.Set;


/**
 * The persistent class for the Issues database table.
 * 
 */
@Entity
@Table(name="\"Issues\"", schema="snpa")
public class Issue implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer gid;
	//private Integer assignedTo;
	private String furnitureid;
	private Date inspectedOn;
	private Date inspectBy;
	private Boolean ishistory;
	private String notes;
	private String problem;
	private Date reportedOn;
	private Date resolveBy;
	private String rowId;
	private Date signoff;
	//private Object theGeom;
	private ActionStatusLkp actionStatusLkp;
	private IssueReasonLkp issueReasonLkp;
	private IssueTypeLkp issueTypeLkp;
	private IssueUrgencyLkp issueUrgencyLkp;
	private ResponsibleDepartmentLkp responsibleDepartmentLkp;
	private Set<Contact> contacts;
	private String assignedTo;
	private String surfaceid;
	
	@Transient
	private List<Attachment> attachments;
	
	
    
	@Transient
	public List<Attachment> getAttachments() {
		return attachments;
	}

	@Transient
	public void setAttachments(List<Attachment> attachments) {
		this.attachments = attachments;
	}
	

    public Issue() {
    }


	@Id
	@SequenceGenerator(name="ISSUES_GID_GENERATOR", sequenceName="snpa.\"Issues_gid_seq\"")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ISSUES_GID_GENERATOR")
	@Column(unique=true, nullable=false)
	public Integer getGid() {
		return this.gid;
	}

	public void setGid(Integer gid) {
		this.gid = gid;
	}

	//commented by Saurabh
	/*@Column(name="assigned_to")
	public Integer getAssignedTo() {
		return this.assignedTo;
	}

	public void setAssignedTo(Integer assignedTo) {
		this.assignedTo = assignedTo;
	}*/

	@Column(name="assigned_to")
	public String getAssignedTo() {
		return this.assignedTo;
	}

	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}

	@Column(length=12)
	public String getFurnitureid() {
		return this.furnitureid;
	}

	public void setFurnitureid(String furnitureid) {
		this.furnitureid = furnitureid;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="inspect_by")
	public Date getInspectBy() {
		return this.inspectBy;
	}

	public void setInspectBy(Date inspectBy) {
		this.inspectBy = inspectBy;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="inspected_on")
	public Date getInspectedOn() {
		return this.inspectedOn;
	}

	public void setInspectedOn(Date inspectedOn) {
		this.inspectedOn = inspectedOn;
	}


	public Boolean getIshistory() {
		return this.ishistory;
	}

	public void setIshistory(Boolean ishistory) {
		this.ishistory = ishistory;
	}


	@Column(length=2147483647)
	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}


	@Column(length=2147483647)
	public String getProblem() {
		return this.problem;
	}

	public void setProblem(String problem) {
		this.problem = problem;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="reported_on")
	public Date getReportedOn() {
		return this.reportedOn;
	}

	public void setReportedOn(Date reportedOn) {
		this.reportedOn = reportedOn;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="resolve_by")
	public Date getResolveBy() {
		return this.resolveBy;
	}

	public void setResolveBy(Date resolveBy) {
		this.resolveBy = resolveBy;
	}


	@Column(name="row_id", length=10)
	public String getRowId() {
		return this.rowId;
	}

	public void setRowId(String rowId) {
		this.rowId = rowId;
	}


    @Temporal( TemporalType.DATE)
	public Date getSignoff() {
		return this.signoff;
	}

	public void setSignoff(Date signoff) {
		this.signoff = signoff;
	}


/*	@Column(name="the_geom")
	public Object getTheGeom() {
		return this.theGeom;
	}

	public void setTheGeom(Object theGeom) {
		this.theGeom = theGeom;
	}*/


	//bi-directional many-to-one association to ActionStatusLkp
    @ManyToOne
	@JoinColumn(name="actionstatus")
	public ActionStatusLkp getActionStatusLkp() {
		return this.actionStatusLkp;
	}

	public void setActionStatusLkp(ActionStatusLkp actionStatusLkp) {
		this.actionStatusLkp = actionStatusLkp;
	}
	

	//bi-directional many-to-one association to IssueReasonLkp
    @ManyToOne
	@JoinColumn(name="why")
	public IssueReasonLkp getIssueReasonLkp() {
		return this.issueReasonLkp;
	}

	public void setIssueReasonLkp(IssueReasonLkp issueReasonLkp) {
		this.issueReasonLkp = issueReasonLkp;
	}
	

	//bi-directional many-to-one association to IssueTypeLkp
    @ManyToOne
	@JoinColumn(name="issuetype")
	public IssueTypeLkp getIssueTypeLkp() {
		return this.issueTypeLkp;
	}

	public void setIssueTypeLkp(IssueTypeLkp issueTypeLkp) {
		this.issueTypeLkp = issueTypeLkp;
	}
	

	//bi-directional many-to-one association to IssueUrgencyLkp
    @ManyToOne
	@JoinColumn(name="urgency")
	public IssueUrgencyLkp getIssueUrgencyLkp() {
		return this.issueUrgencyLkp;
	}

	public void setIssueUrgencyLkp(IssueUrgencyLkp issueUrgencyLkp) {
		this.issueUrgencyLkp = issueUrgencyLkp;
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
	

	//bi-directional many-to-many association to Contact
	@ManyToMany(fetch=FetchType.EAGER)
	@JoinTable(
		name="issue_contacts", schema="snpa"
		, joinColumns={
			@JoinColumn(name="issue_gid")
			}
		, inverseJoinColumns={
			@JoinColumn(name="contactid")
			}
		)
	public Set<Contact> getContacts() {
		return this.contacts;
	}

	public void setContacts(Set<Contact> contacts) {
		this.contacts = contacts;
	}

	public void setSurfaceid(String surfaceid) {
		this.surfaceid = surfaceid;
	}

	public String getSurfaceid() {
		return surfaceid;
	}
	
}