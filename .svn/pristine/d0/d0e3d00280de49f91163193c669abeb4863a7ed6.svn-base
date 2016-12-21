package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;


/**
 * The persistent class for the furniture_contacts database table.
 * 
 */
@Entity
@Table(name="furniture_contacts",schema="snpa")
public class FurnitureContact implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer furnitureContactsId;
	private Furniture furniture;
	private Contact contact;

    public FurnitureContact() {
    }


	@Id
	@SequenceGenerator(name="FURNITURE_CONTACTS_FURNITURECONTACTSID_GENERATOR", sequenceName="snpa.\"furniture_contacts_furniture_contacts_id_seq\"")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="FURNITURE_CONTACTS_FURNITURECONTACTSID_GENERATOR")
	@Column(name="furniture_contacts_id", unique=true, nullable=false)
	public Integer getFurnitureContactsId() {
		return this.furnitureContactsId;
	}

	public void setFurnitureContactsId(Integer furnitureContactsId) {
		this.furnitureContactsId = furnitureContactsId;
	}


	//bi-directional many-to-one association to Furniture
    @ManyToOne
    //@JsonIgnore
	@JoinColumn(name="furniture_gid")
	public Furniture getFurniture() {
		return this.furniture;
	}

	public void setFurniture(Furniture furniture) {
		this.furniture = furniture;
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