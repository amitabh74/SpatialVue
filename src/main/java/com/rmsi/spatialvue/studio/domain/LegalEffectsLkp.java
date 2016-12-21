package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Set;


/**
 * The persistent class for the legal_effects_lkp database table.
 * 
 */
@Entity
@Table(name="legal_effects_lkp", schema="snpa")
public class LegalEffectsLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer legaleffectid;
	private String effaithGyfreithiol;
	private String legalEffect;
	private Set<Legal> legals;

    public LegalEffectsLkp() {
    }


	@Id
	//@SequenceGenerator(name="LEGAL_EFFECTS_LKP_LEGALEFFECTID_GENERATOR", sequenceName="LEGALEFFECTID_GID_GENERATOR")
	//@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="LEGAL_EFFECTS_LKP_LEGALEFFECTID_GENERATOR")
	public Integer getLegaleffectid() {
		return this.legaleffectid;
	}

	public void setLegaleffectid(Integer legaleffectid) {
		this.legaleffectid = legaleffectid;
	}


	@Column(name="effaith_gyfreithiol")
	public String getEffaithGyfreithiol() {
		return this.effaithGyfreithiol;
	}

	public void setEffaithGyfreithiol(String effaithGyfreithiol) {
		this.effaithGyfreithiol = effaithGyfreithiol;
	}


	@Column(name="legal_effect")
	public String getLegalEffect() {
		return this.legalEffect;
	}

	public void setLegalEffect(String legalEffect) {
		this.legalEffect = legalEffect;
	}


	/*//bi-directional many-to-one association to Legal
	@OneToMany(mappedBy="legalEffectsLkp", fetch=FetchType.EAGER)
	public Set<Legal> getLegals() {
		return this.legals;
	}

	public void setLegals(Set<Legal> legals) {
		this.legals = legals;
	}*/
	
}