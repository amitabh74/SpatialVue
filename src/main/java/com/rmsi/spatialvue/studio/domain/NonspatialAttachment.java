package com.rmsi.spatialvue.studio.domain;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the nonspatial_attachment database table.
 * 
 */
@Entity
@Table(name="nonspatial_attachment")
public class NonspatialAttachment implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer associationid;
	private String description;
	private String extension;
	private String filename;
	private String filepath;
	private Integer gid;
	private String keyfield;
	private String layername;
	private String tenantid;

    public NonspatialAttachment() {
    }

	public Integer getGid() {
		return gid;
	}

	public void setGid(Integer gid) {
		this.gid = gid;
	}	

	@Id
	@SequenceGenerator(name="NONSPATIAL_ATTACHMENT_ASSOCIATIONID_GENERATOR", sequenceName="nonspatial_attachments_id_seq")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="NONSPATIAL_ATTACHMENT_ASSOCIATIONID_GENERATOR")
@Column(name="associationid", unique=true, nullable=false)
	
public Integer getAssociationid() {
		return this.associationid;
	}

	public void setAssociationid(Integer associationid) {
		this.associationid = associationid;
	}


	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public String getExtension() {
		return this.extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}


public String getFilepath() {
		return this.filepath;
	}

	public void setFilepath(String filepath) {
		this.filepath = filepath;
	}

public String getKeyfield() {
		return this.keyfield;
	}

	public void setKeyfield(String keyfield) {
		this.keyfield = keyfield;
	}
		  

 public String getTenantid() {
		return this.tenantid;
	}

	public void setTenantid(String tenantid) {
		this.tenantid = tenantid;
	}


public String getFilename() {
		return this.filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

		public String getLayername() {
		return this.layername;
	}

	public void setLayername(String layername) {
		this.layername = layername;
	}

}