package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the issue_contacts database table.
 * 
 */
@Entity
@Table(name="issue_contacts", schema="snpa")
public class IssueContact implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer issueContactsId;
	private Integer issueGid;
	private Contact contact;

    public IssueContact() {
    }


	@Id
	@SequenceGenerator(name="ISSUE_CONTACTS_ISSUECONTACTSID_GENERATOR", sequenceName="snpa.issue_contacts_issue_contacts_id_seq")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ISSUE_CONTACTS_ISSUECONTACTSID_GENERATOR")
	@Column(name="issue_contacts_id", unique=true, nullable=false)
	public Integer getIssueContactsId() {
		return this.issueContactsId;
	}

	public void setIssueContactsId(Integer issueContactsId) {
		this.issueContactsId = issueContactsId;
	}


	@Column(name="issue_gid")
	public Integer getIssueGid() {
		return this.issueGid;
	}

	public void setIssueGid(Integer issueGid) {
		this.issueGid = issueGid;
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