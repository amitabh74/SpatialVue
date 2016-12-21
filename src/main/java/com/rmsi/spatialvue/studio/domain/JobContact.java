package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the job_contacts database table.
 * 
 */
@Entity
@Table(name="job_contacts", schema="snpa")
public class JobContact implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer jobContactId;
	//private Integer contactid;
	private Job job;
	private Contact contact;
	
    public JobContact() {
    }


	@Id
	@SequenceGenerator(name="JOB_CONTACTS_JOBCONTACTID_GENERATOR", sequenceName="snpa.job_contacts_job_contacts_id_seq")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="JOB_CONTACTS_JOBCONTACTID_GENERATOR")
	@Column(name="job_contact_id")
	public Integer getJobContactId() {
		return this.jobContactId;
	}

	public void setJobContactId(Integer jobContactId) {
		this.jobContactId = jobContactId;
	}


	/*public Integer getContactid() {
		return this.contactid;
	}

	public void setContactid(Integer contactid) {
		this.contactid = contactid;
	}*/


	//bi-directional many-to-one association to Job
    @ManyToOne
	@JoinColumn(name="jobid")
	public Job getJob() {
		return this.job;
	}

	public void setJob(Job job) {
		this.job = job;
	}
	//bi-directional many-to-one association to Contact
    @ManyToOne
	@JoinColumn(name="contactid")
	public Contact getContact() {
		return this.contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}
}