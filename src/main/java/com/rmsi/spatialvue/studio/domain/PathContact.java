package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the path_contacts database table.
 * 
 */
@Entity
@Table(name="path_contacts", schema="snpa")
public class PathContact implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer pathContactsId;
	private RoW_Path rowPath;
	private Contact contact;

    public PathContact() {
    }


	@Id
	@SequenceGenerator(name="PATH_CONTACTS_PATHCONTACTSID_GENERATOR", sequenceName="snpa.path_contacts_path_contacts_id_seq")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PATH_CONTACTS_PATHCONTACTSID_GENERATOR")
	@Column(name="path_contacts_id", unique=true, nullable=false)
	public Integer getPathContactsId() {
		return this.pathContactsId;
	}

	public void setPathContactsId(Integer pathContactsId) {
		this.pathContactsId = pathContactsId;
	}

	@ManyToOne
	@JoinColumn(name="path_gid", nullable=false)
	public RoW_Path getRowPath() {
		return this.rowPath;
	}

	public void setRowPath(RoW_Path rowPath) {
		this.rowPath = rowPath;
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