package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Set;


/**
 * The persistent class for the contact_type_lkp database table.
 * 
 */
@Entity
@Table(name="contact_type_lkp", schema="SNPA")
public class ContactTypeLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer contacttypeid;
	private String contactType;
//	private Set<Contact> contacts;

    public ContactTypeLkp() {
    }


	@Id
	@Column(unique=true, nullable=false)
	public Integer getContacttypeid() {
		return this.contacttypeid;
	}

	public void setContacttypeid(Integer contacttypeid) {
		this.contacttypeid = contacttypeid;
	}


	@Column(name="contact_type", length=100)
	public String getContactType() {
		return this.contactType;
	}

	public void setContactType(String contactType) {
		this.contactType = contactType;
	}


	/*//bi-directional many-to-one association to Contact
	@OneToMany(mappedBy="contactTypeLkp", fetch=FetchType.EAGER)
	public Set<Contact> getContacts() {
		return this.contacts;
	}

	public void setContacts(Set<Contact> contacts) {
		this.contacts = contacts;
	}*/
	
}