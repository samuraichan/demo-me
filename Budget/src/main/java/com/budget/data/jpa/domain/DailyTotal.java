package com.budget.data.jpa.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity(name="daily_total")
public class DailyTotal implements Serializable {
 
  private static final long serialVersionUID = 1L;
  
  @Id
  @GeneratedValue
  private Long id;
  
  @Column(nullable = false, name="total_date")
  @Temporal(TemporalType.DATE) // allows insert statements to simply have a value of '2010-12-26' instead of doing a to_date for example
  private Date totalDate;
  
  @Column(precision=10, scale=2)
  private Double bank;
  
  @Column(precision=10, scale=2)
  private Double visa;
  
  @Column(precision=10, scale=2)
  private Double budget;
  
  @Column(precision=10, scale=2)
  private Double running;
  
  public DailyTotal() {}
  
  public DailyTotal(Date totalDate, Double bank, Double visa, Double budget, Double running) {
    this.totalDate = totalDate;
    this.bank = bank;
    this.visa = visa;
    this.running = running;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Date getTotalDate() {
    return totalDate;
  }

  public void setTotalDate(Date totalDate) {
    this.totalDate = totalDate;
  }

  public Double getBank() {
    return bank;
  }

  public void setBank(Double bank) {
    this.bank = bank;
  }

  public Double getVisa() {
    return visa;
  }

  public void setVisa(Double visa) {
    this.visa = visa;
  }

  public Double getBudget() {
    return budget;
  }

  public void setBudget(Double budget) {
    this.budget = budget;
  }

  public Double getRunning() {
    return running;
  }

  public void setRunning(Double running) {
    this.running = running;
  }

  @Override
  public String toString() {
    return "DailyTotal [id=" + id + ", totalDate=" + totalDate + ", bank="
        + bank + ", visa=" + visa + ", budget=" + budget + ", running="
        + running + "]";
  }
}
