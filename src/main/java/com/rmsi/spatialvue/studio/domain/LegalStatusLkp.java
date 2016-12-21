package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.Set;


/**
 * The persistent class for the legal_status_lkp database table.
 * 
 */
@Entity
@Table(name="legal_status_lkp", schema="snpa")
public class LegalStatusLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer legalstatusid;
	private String legalStatus;
	private String statwsCyfreithiol;
	private Set<Legal> legals;

    public LegalStatusLkp() {
    }


	@Id
	@SequenceGenerator(name="LEGAL_STATUS_LKP_LEGALSTATUSID_GENERATOR", sequenceName="snpa.LEGALSTATUSID_GID_GENERATOR")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="LEGAL_STATUS_LKP_LEGALSTATUSID_GENERATOR")
	public Integer getLegalstatusid() {
		return this.legalstatusid;
	}

	public void setLegalstatusid(Integer legalstatusid) {
		this.legalstatusid = legalstatusid;
	}


	@Column(name="legal_status")
	public String getLegalStatus() {
		return this.legalStatus;
	}

	public void setLegalStatus(String legalStatus) {
		this.legalStatus = legalStatus;
	}


	@Column(name="statws_cyfreithiol")
	public String getStatwsCyfreithiol() {
		return this.statwsCyfreithiol;
	}

	public void setStatwsCyfreithiol(String statwsCyfreithiol) {
		this.statwsCyfreithiol = statwsCyfreithiol;
	}


	//bi-directional many-to-one association to Legal
	@JsonIgnore
	@OneToMany(mappedBy="legalStatusLkp", fetch=FetchType.EAGER)
	public Set<Legal> getLegals() {
		return this.legals;
	}

	public void setLegals(Set<Legal> legals) {
		this.legals = legals;
	}
	
}