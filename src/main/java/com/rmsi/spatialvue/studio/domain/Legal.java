package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;


/**
 * The persistent class for the legal database table.
 * 
 */
@Entity
@Table(name="\"legal\"", schema="snpa")
public class Legal implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer legalid;
	private Date effectiveDate;
	private Date estimatedClosureDate;
	private String furnitureid;
	private Boolean isPathPassable;
	private Integer issueGid;
	private LegalAuthorityLkp legalAuthorityLkp;
	private String notes;
	private String rowId;
	private LegalEffectsLkp legalEffectsLkp;
	private LegalEventModificationOrder legalEventModificationOrderBean;
	private LegalStatusLkp legalStatusLkp;
	private LegalTypeLkp legalTypeLkp;
	@Transient
	private Set<NonspatialAttachment> attachments;
	
	
    public Legal() {
    }


	@Id
	@SequenceGenerator(name="LEGAL_LEGALID_GENERATOR", sequenceName="snpa.legal_gid_seq")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="LEGAL_LEGALID_GENERATOR")
	public Integer getLegalid() {
		return this.legalid;
	}

	public void setLegalid(Integer legalid) {
		this.legalid = legalid;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="effective_date")
	public Date getEffectiveDate() {
		return this.effectiveDate;
	}

	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="estimated_closure_date")
	public Date getEstimatedClosureDate() {
		return this.estimatedClosureDate;
	}

	public void setEstimatedClosureDate(Date estimatedClosureDate) {
		this.estimatedClosureDate = estimatedClosureDate;
	}


	public String getFurnitureid() {
		return this.furnitureid;
	}

	public void setFurnitureid(String furnitureid) {
		this.furnitureid = furnitureid;
	}


	@Column(name="is_path_passable")
	public Boolean getIsPathPassable() {
		return this.isPathPassable;
	}

	public void setIsPathPassable(Boolean isPathPassable) {
		this.isPathPassable = isPathPassable;
	}


	@Column(name="issue_gid")
	public Integer getIssueGid() {
		return this.issueGid;
	}

	public void setIssueGid(Integer issueGid) {
		this.issueGid = issueGid;
	}


	/*@Column(name="legal_authority")
	public Integer getLegalAuthority() {
		return this.legalAuthority;
	}

	public void setLegalAuthority(Integer legalAuthority) {
		this.legalAuthority = legalAuthority;
	}*/


	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}


	@Column(name="row_id")
	public String getRowId() {
		return this.rowId;
	}

	public void setRowId(String rowId) {
		this.rowId = rowId;
	}


	//bi-directional many-to-one association to LegalEffectsLkp
    @ManyToOne
	@JoinColumn(name="legal_effect")
	public LegalEffectsLkp getLegalEffectsLkp() {
		return this.legalEffectsLkp;
	}

	public void setLegalEffectsLkp(LegalEffectsLkp legalEffectsLkp) {
		this.legalEffectsLkp = legalEffectsLkp;
	}
	

	//bi-directional many-to-one association to LegalEventModificationOrder
    @ManyToOne
	@JoinColumn(name="legal_event_modification_order")
	public LegalEventModificationOrder getLegalEventModificationOrderBean() {
		return this.legalEventModificationOrderBean;
	}

	public void setLegalEventModificationOrderBean(LegalEventModificationOrder legalEventModificationOrderBean) {
		this.legalEventModificationOrderBean = legalEventModificationOrderBean;
	}
	

	//bi-directional many-to-one association to LegalStatusLkp
    @ManyToOne
	@JoinColumn(name="legal_status")
	public LegalStatusLkp getLegalStatusLkp() {
		return this.legalStatusLkp;
	}

	public void setLegalStatusLkp(LegalStatusLkp legalStatusLkp) {
		this.legalStatusLkp = legalStatusLkp;
	}
	

	//bi-directional many-to-one association to LegalTypeLkp
    @ManyToOne
	@JoinColumn(name="type")
	public LegalTypeLkp getLegalTypeLkp() {
		return this.legalTypeLkp;
	}

	public void setLegalTypeLkp(LegalTypeLkp legalTypeLkp) {
		this.legalTypeLkp = legalTypeLkp;
	}
	
	@ManyToOne
	@JoinColumn(name="legal_authority")
	public LegalAuthorityLkp getLegalAuthorityLkp() {
		return this.legalAuthorityLkp;
	}

	public void setLegalAuthorityLkp(LegalAuthorityLkp legalAuthorityLkp) {
		this.legalAuthorityLkp = legalAuthorityLkp;
	}
	
	@Transient
	public Set<NonspatialAttachment> getAttachments() {
		return attachments;
	}

	@Transient
	public void setAttachments(Set<NonspatialAttachment> attachments) {
		this.attachments = attachments;
	}
	
	
}