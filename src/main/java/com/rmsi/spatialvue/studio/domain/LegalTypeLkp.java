package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Set;


/**
 * The persistent class for the legal_type_lkp database table.
 * 
 */
@Entity
@Table(name="legal_type_lkp", schema="snpa")
public class LegalTypeLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer legaltypeid;
	private String cyfreithiol;
	private String legalType;
	private Set<Legal> legals;

    public LegalTypeLkp() {
    }


	@Id
	//@SequenceGenerator(name="LEGAL_TYPE_LKP_LEGALTYPEID_GENERATOR", sequenceName="LEGALTYPEID_GID_GENERATOR")
	//@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="LEGAL_TYPE_LKP_LEGALTYPEID_GENERATOR")
	public Integer getLegaltypeid() {
		return this.legaltypeid;
	}

	public void setLegaltypeid(Integer legaltypeid) {
		this.legaltypeid = legaltypeid;
	}


	public String getCyfreithiol() {
		return this.cyfreithiol;
	}

	public void setCyfreithiol(String cyfreithiol) {
		this.cyfreithiol = cyfreithiol;
	}


	@Column(name="legal_type")
	public String getLegalType() {
		return this.legalType;
	}

	public void setLegalType(String legalType) {
		this.legalType = legalType;
	}


	/*//bi-directional many-to-one association to Legal
	@OneToMany(mappedBy="legalTypeLkp", fetch=FetchType.EAGER)
	public Set<Legal> getLegals() {
		return this.legals;
	}

	public void setLegals(Set<Legal> legals) {
		this.legals = legals;
	}*/
	
}