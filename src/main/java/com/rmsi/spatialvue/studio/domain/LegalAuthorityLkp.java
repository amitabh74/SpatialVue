package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the legal_authority_lkp database table.
 * 
 */
@Entity
@Table(name="legal_authority_lkp", schema="snpa")
public class LegalAuthorityLkp implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer legalauthorityid;
	private String legalAuthority;
	private String awdurdodCyfrithiol;
    public LegalAuthorityLkp() {
    }


	@Id
	//@SequenceGenerator(name="LEGAL_AUTHORITY_LKP_LEGALAUTHORITYID_GENERATOR", sequenceName="LEGALAUTHORITYID_GID_GENERATOR")
	//@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="LEGAL_AUTHORITY_LKP_LEGALAUTHORITYID_GENERATOR")
	public Integer getLegalauthorityid() {
		return this.legalauthorityid;
	}

	public void setLegalauthorityid(Integer legalauthorityid) {
		this.legalauthorityid = legalauthorityid;
	}


	@Column(name="legal_authority")
	public String getLegalAuthority() {
		return this.legalAuthority;
	}

	public void setLegalAuthority(String legalAuthority) {
		this.legalAuthority = legalAuthority;
	}

	@Column(name="awdurdod_cyfrithiol")
	public String getAwdurdodCyfrithiol() {
		return awdurdodCyfrithiol;
	}


	public void setAwdurdodCyfrithiol(String awdurdodCyfrithiol) {
		this.awdurdodCyfrithiol = awdurdodCyfrithiol;
	}
	
}