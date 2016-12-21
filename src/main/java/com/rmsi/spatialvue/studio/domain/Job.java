package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the job database table.
 * 
 */
@Entity
@Table(name="job", schema="snpa")
public class Job implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer jobid;
	private BigDecimal contractorCost;
	//private Integer feature;
	private Integer issueGid;
	private Date jobCompleted;
	private BigDecimal materialCost;
	private String notes;
	private Integer numUnits;
	private boolean riskAssesmentCompletion;
	private String riskAssesmentRef;
	private boolean riskAssesmentReq;
	private BigDecimal snpaHrs;
	private Date targetDate;
	private BigDecimal totalCost;
	private JobTypeLkp jobTypeLkp;
	//private FurnitureTypeLkp furnitureTypeLkp;
	private JobFeatureLkp jobFeatureLkp;
	private Set<Contact> contacts;
	private Set<JobUser> jobUser;
	//private Set<User> user;
	
	private Issue issue;
	
	@Transient
	private Set<NonspatialAttachment> nonspatialattachments;
	@Transient
	private Set<NonspatialAttachment> riskassesmentattachment;
	
    public Job() {
    }

    @Transient
	public Set<NonspatialAttachment> getNonspatialAttachments() {
		return nonspatialattachments;
	}

	@Transient
	public void setAttachments(Set<NonspatialAttachment> nonspatialattachments) {
		this.nonspatialattachments = nonspatialattachments;
	}
	
	@Transient
	public Set<NonspatialAttachment> getRiskassesmentattachment() {
		return riskassesmentattachment;
	}

	@Transient
	public void setRiskassesmentattachment(Set<NonspatialAttachment> riskassesmentattachment) {
		this.riskassesmentattachment = riskassesmentattachment;
	}
	
	@Id
	@SequenceGenerator(name="JOB_JOBID_GENERATOR", sequenceName="snpa.job_gid_seq")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="JOB_JOBID_GENERATOR")
	public Integer getJobid() {
		return this.jobid;
	}

	public void setJobid(Integer jobid) {
		this.jobid = jobid;
	}


	@Column(name="contractor_cost")
	public BigDecimal getContractorCost() {
		return this.contractorCost;
	}

	public void setContractorCost(BigDecimal contractorCost) {
		this.contractorCost = contractorCost;
	}


	/*public Integer getFeature() {
		return this.feature;
	}

	public void setFeature(Integer feature) {
		this.feature = feature;
	}*/


	@Column(name="issue_gid")
	public Integer getIssueGid() {
		return this.issueGid;
	}

	public void setIssueGid(Integer issueGid) {
		this.issueGid = issueGid;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="job_completed")
	public Date getJobCompleted() {
		return this.jobCompleted;
	}

	public void setJobCompleted(Date jobCompleted) {
		this.jobCompleted = jobCompleted;
	}


	@Column(name="material_cost")
	public BigDecimal getMaterialCost() {
		return this.materialCost;
	}

	public void setMaterialCost(BigDecimal materialCost) {
		this.materialCost = materialCost;
	}


	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}


	@Column(name="num_units")
	public Integer getNumUnits() {
		return this.numUnits;
	}

	public void setNumUnits(Integer numUnits) {
		this.numUnits = numUnits;
	}


    @Column(name="risk_assesment_completion")
	public boolean getRiskAssesmentCompletion() {
		return this.riskAssesmentCompletion;
	}

	public void setRiskAssesmentCompletion(boolean riskAssesmentCompletion) {
		this.riskAssesmentCompletion = riskAssesmentCompletion;
	}


	@Column(name="risk_assesment_ref")
	public String getRiskAssesmentRef() {
		return this.riskAssesmentRef;
	}

	public void setRiskAssesmentRef(String riskAssesmentRef) {
		this.riskAssesmentRef = riskAssesmentRef;
	}


	@Column(name="risk_assesment_req")
	public boolean getRiskAssesmentReq() {
		return this.riskAssesmentReq;
	}

	public void setRiskAssesmentReq(boolean riskAssesmentReq) {
		this.riskAssesmentReq = riskAssesmentReq;
	}


	@Column(name="snpa_hrs")
	public BigDecimal getSnpaHrs() {
		return this.snpaHrs;
	}

	public void setSnpaHrs(BigDecimal snpaHrs) {
		this.snpaHrs = snpaHrs;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="target_date")
	public Date getTargetDate() {
		return this.targetDate;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}


	@Column(name="total_cost")
	public BigDecimal getTotalCost() {
		return this.totalCost;
	}

	public void setTotalCost(BigDecimal totalCost) {
		this.totalCost = totalCost;
	}


	//bi-directional many-to-one association to JobTypeLkp
    @ManyToOne
	@JoinColumn(name="job_type")
	public JobTypeLkp getJobTypeLkp() {
		return this.jobTypeLkp;
	}

	public void setJobTypeLkp(JobTypeLkp jobTypeLkp) {
		this.jobTypeLkp = jobTypeLkp;
	}
	
	//bi-directional many-to-one association to FurnitureTypeLkp
    @ManyToOne
	@JoinColumn(name="feature")
	public JobFeatureLkp getJobFeatureLkp() {
		return this.jobFeatureLkp;
	}

	public void setJobFeatureLkp(JobFeatureLkp jobFeatureLkp) {
		this.jobFeatureLkp = jobFeatureLkp;
	}
	
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "job_contacts", schema="snpa", joinColumns = { @JoinColumn(name = "jobid") }, inverseJoinColumns = { @JoinColumn(name = "contactid") })
	public Set<Contact> getContacts() {
		return this.contacts;
	}

	public void setContacts(Set<Contact> contacts) {
		this.contacts = contacts;
	}
	@OneToMany(mappedBy="job", fetch=FetchType.EAGER)
	public Set<JobUser> getJobUser() {
		return jobUser;
	}

	public void setJobUser(Set<JobUser> jobUser) {
		this.jobUser = jobUser;
	}

	@OneToOne
	@JoinColumn(name = "issue_gid", nullable = false, insertable = false, updatable = false)
	public Issue getIssue() {
		return issue;
	}

	public void setIssue(Issue issue) {
		this.issue = issue;
	}

	
	/*@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "job_user", schema="snpa", joinColumns = { @JoinColumn(name = "jobid") }, inverseJoinColumns = { @JoinColumn(name = "userId") })
	public Set<User> getUser() {
		return this.user;
	}

	public void setUser(Set<User> user) {
		this.user = user;
	}*/
}