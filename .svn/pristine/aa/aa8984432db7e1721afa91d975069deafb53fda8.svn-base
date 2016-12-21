package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Set;


/**
 * The persistent class for the legal_event_modification_order database table.
 * 
 */
@Entity
@Table(name="legal_event_modification_order", schema="snpa")
public class LegalEventModificationOrder implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String addasuDigwyddiadCyfreithiol;
	private String legalEventModificationOrder;
	private Set<Legal> legals;

    public LegalEventModificationOrder() {
    }


	@Id
	//@SequenceGenerator(name="LEGAL_EVENT_MODIFICATION_ORDER_ID_GENERATOR", sequenceName="ID_GID_GENERATOR")
	//@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="LEGAL_EVENT_MODIFICATION_ORDER_ID_GENERATOR")
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	@Column(name="addasu_digwyddiad_cyfreithiol")
	public String getAddasuDigwyddiadCyfreithiol() {
		return this.addasuDigwyddiadCyfreithiol;
	}

	public void setAddasuDigwyddiadCyfreithiol(String addasuDigwyddiadCyfreithiol) {
		this.addasuDigwyddiadCyfreithiol = addasuDigwyddiadCyfreithiol;
	}


	@Column(name="legal_event_modification_order")
	public String getLegalEventModificationOrder() {
		return this.legalEventModificationOrder;
	}

	public void setLegalEventModificationOrder(String legalEventModificationOrder) {
		this.legalEventModificationOrder = legalEventModificationOrder;
	}


	/*//bi-directional many-to-one association to Legal
	@OneToMany(mappedBy="legalEventModificationOrderBean", fetch=FetchType.EAGER)
	public Set<Legal> getLegals() {
		return this.legals;
	}

	public void setLegals(Set<Legal> legals) {
		this.legals = legals;
	}*/
	
}