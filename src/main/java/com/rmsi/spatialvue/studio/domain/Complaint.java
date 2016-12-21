package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Date;


/**
 * The persistent class for the Cosmetic_Complaint database table.
 * 
 */
@Entity
@Table(name="\"Cosmetic_Complaint\"", schema="snpa")
public class Complaint implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer gid;
	private Date acknowledgeBy;
	private String acknowledgementLink;
	private String complaintid;	
	private Date acknowledgementSent;
	private String complaintEnquiryLocation;
	private String complaintEnquiryNature;
	private String recommendation;
	private Date reportedOn;
	private Date respondBy;
	private Date responseSent;
	private Date signedoff;
	private Boolean resolveStatus;
	//private Integer contactid;
	private Contact contact;
	private Complaint_Nature_Lkp complaintNatureLkp;
	private PublicUser publicUser;
	private Integer issueid;
	private String assignedTo;
	


	public Complaint() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getGid() {
		return this.gid;
	}

	public void setGid(Integer gid) {
		this.gid = gid;
	}


	@Column(length=15)
	public String getComplaintid() {
		return this.complaintid;
	}

	public void setComplaintid(String complaintid) {
		this.complaintid = complaintid;
	}
	
	
    @Temporal( TemporalType.DATE)
	@Column(name="acknowledge_by")
	public Date getAcknowledgeBy() {
		return this.acknowledgeBy;
	}

	public void setAcknowledgeBy(Date acknowledgeBy) {
		this.acknowledgeBy = acknowledgeBy;
	}


	@Column(name="acknowledgement_link", length=2147483647)
	public String getAcknowledgementLink() {
		return this.acknowledgementLink;
	}

	public void setAcknowledgementLink(String acknowledgementLink) {
		this.acknowledgementLink = acknowledgementLink;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="acknowledgement_sent")
	public Date getAcknowledgementSent() {
		return this.acknowledgementSent;
	}

	public void setAcknowledgementSent(Date acknowledgementSent) {
		this.acknowledgementSent = acknowledgementSent;
	}


	@Column(name="complaint_enquiry_location", length=2147483647)
	public String getComplaintEnquiryLocation() {
		return this.complaintEnquiryLocation;
	}

	public void setComplaintEnquiryLocation(String complaintEnquiryLocation) {
		this.complaintEnquiryLocation = complaintEnquiryLocation;
	}


	@Column(name="complaint_enquiry_nature", length=2147483647)
	public String getComplaintEnquiryNature() {
		return this.complaintEnquiryNature;
	}

	public void setComplaintEnquiryNature(String complaintEnquiryNature) {
		this.complaintEnquiryNature = complaintEnquiryNature;
	}

	@Column(length=2147483647)
	public String getRecommendation() {
		return this.recommendation;
	}

	public void setRecommendation(String recommendation) {
		this.recommendation = recommendation;
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
	@Column(name="respond_by")
	public Date getRespondBy() {
		return this.respondBy;
	}

	public void setRespondBy(Date respondBy) {
		this.respondBy = respondBy;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="response_sent")
	public Date getResponseSent() {
		return this.responseSent;
	}

	public void setResponseSent(Date responseSent) {
		this.responseSent = responseSent;
	}
	
	@Temporal( TemporalType.DATE)
	@Column(name="signed_off")
	public Date getSignedoff() {
		return this.signedoff;
	}

	public void setSignedoff(Date signedoff) {
		this.signedoff = signedoff;
	}

	/*@Column(name="contactid")
	public Integer getContactid() {
		return contactid;
	}


	public void setContactid(Integer contactid) {
		this.contactid = contactid;
	}*/
	
	//bi-directional many-to-one association to Complaint_Nature_Lkp
    @ManyToOne
	@JoinColumn(name="enquiry_type")
	public Complaint_Nature_Lkp getComplaintNatureLkp() {
		return this.complaintNatureLkp;
	}

	public void setComplaintNatureLkp(Complaint_Nature_Lkp complaintNatureLkp) {
		this.complaintNatureLkp = complaintNatureLkp;
	}
	

	//bi-directional many-to-one association to PublicUser
    @ManyToOne
	@JoinColumn(name="complainantid")
	public PublicUser getPublicUser() {
		return this.publicUser;
	}

	public void setPublicUser(PublicUser publicUser) {
		this.publicUser = publicUser;
	}
	
	@Column(name="resolve_status")
	public Boolean getResolveStatus() {
		return this.resolveStatus;
	}

	public void setResolveStatus(Boolean resolveStatus) {
		this.resolveStatus = resolveStatus;
	}
	
	@Column(name="issueid")
    public Integer getIssueid() {
		return issueid;
	}
	public void setIssueid(Integer issueid) {
		this.issueid = issueid;
	}

	//bi-directional many-to-one association to PublicUser
    @ManyToOne
    @JoinColumn(name="contactid", referencedColumnName="contactid")
    public Contact getContact() {
		return contact;
	}
    
    public void setContact(Contact contact) {
		this.contact = contact;
	}

    @Column(name="assigned_to")
	public String getAssignedTo() {
		return this.assignedTo;
	}

	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}
	
	
}