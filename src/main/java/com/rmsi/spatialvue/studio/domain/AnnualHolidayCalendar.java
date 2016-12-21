package com.rmsi.spatialvue.studio.domain;
import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the annual_holiday_calendar database table.
 * 
 */
@Entity
@Table(name="annual_holiday_calendar")
public class AnnualHolidayCalendar implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	private Date holidayDate;
	private String holidayOccassion;
	private String holidayType;

    public AnnualHolidayCalendar() {
    }


	@Id
	@SequenceGenerator(name="ANNUAL_HOLIDAY_CALENDAR_ID_GENERATOR", sequenceName="ANNUAL_HOLIDAY_CALENDAR_ID")
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ANNUAL_HOLIDAY_CALENDAR_ID_GENERATOR")
	@Column(name="id", unique=true, nullable=false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


    @Temporal( TemporalType.DATE)
	@Column(name="holiday_date", nullable=false)
	public Date getHolidayDate() {
		return this.holidayDate;
	}

	public void setHolidayDate(Date holidayDate) {
		this.holidayDate = holidayDate;
	}


	@Column(name="holiday_occassion", length=100)
	public String getHolidayOccassion() {
		return this.holidayOccassion;
	}

	public void setHolidayOccassion(String holidayOccassion) {
		this.holidayOccassion = holidayOccassion;
	}


	@Column(name="holiday_type", length=50)
	public String getHolidayType() {
		return this.holidayType;
	}

	public void setHolidayType(String holidayType) {
		this.holidayType = holidayType;
	}

}