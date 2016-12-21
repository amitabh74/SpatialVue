package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the surface_contacts database table.
 * 
 */
@Entity
@Table(name="surface_contacts", schema="snpa")
public class SurfaceContact implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer surfaceContactsId;
	private Surface surface;
	private Contact contact;

    public SurfaceContact() {
    }


	@Id
	@SequenceGenerator(name="SURFACE_CONTACTS_SURFACECONTACTSID_GENERATOR", sequenceName="snpa.\"surface_contacts_surface_contacts_id_seq\"")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SURFACE_CONTACTS_SURFACECONTACTSID_GENERATOR")
	@Column(name="surface_contacts_id", unique=true, nullable=false)
	public Integer getSurfaceContactsId() {
		return this.surfaceContactsId;
	}

	public void setSurfaceContactsId(Integer surfaceContactsId) {
		this.surfaceContactsId = surfaceContactsId;
	}


	//bi-directional many-to-one association to Surface
    @ManyToOne
	@JoinColumn(name="surface_gid")
	public Surface getSurface() {
		return this.surface;
	}

	public void setSurface(Surface surface) {
		this.surface = surface;
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