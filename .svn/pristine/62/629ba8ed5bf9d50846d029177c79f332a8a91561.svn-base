package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the access_land_contacts database table.
 * 
 */
@Entity
@Table(name="access_land_contacts", schema="snpa")
public class AccessLandContact implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer accesslandContactId;
	private Access_Land_polygon accessLandPolygon;
	private Contact contact;

    public AccessLandContact() {
    }


	@Id
	@SequenceGenerator(name="ACCESS_LAND_CONTACTS_ACCESSLANDCONTACTID_GENERATOR", sequenceName="snpa.access_land_contacts_accessland_contact_id_seq")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACCESS_LAND_CONTACTS_ACCESSLANDCONTACTID_GENERATOR")
	@Column(name="accessland_contact_id", unique=true, nullable=false)
	public Integer getAccesslandContactId() {
		return this.accesslandContactId;
	}

	public void setAccesslandContactId(Integer accesslandContactId) {
		this.accesslandContactId = accesslandContactId;
	}


	//bi-directional many-to-one association to Access_Land_polygon
    @ManyToOne
	@JoinColumn(name="gid", nullable=false)
	public Access_Land_polygon getAccessLandPolygon() {
		return this.accessLandPolygon;
	}

	public void setAccessLandPolygon(Access_Land_polygon accessLandPolygon) {
		this.accessLandPolygon = accessLandPolygon;
	}
	

	//bi-directional many-to-one association to Contact
    @ManyToOne
	@JoinColumn(name="contactid", nullable=false)
	public Contact getContact() {
		return this.contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}
	
}