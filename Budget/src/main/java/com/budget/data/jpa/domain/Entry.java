package com.budget.data.jpa.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Entry implements Serializable {
 
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue
  private Long id;
  
  @Column(nullable = false, name="authorization_date")
  @Temporal(TemporalType.DATE) // allows insert statements to simply have a value of '2010-12-26' instead of doing a to_date for example
  private Date authorizationDate;
  
  @Column(nullable=false)
  private String recipient;
  
  @Column(nullable=false,precision=10, scale=2)
  private Double amount;
  
  @Column(nullable=false, name="entry_type")
  private String type;
  
  @Column(nullable=false, name="account_name")
  private String accountName;
  
  public Entry() {}
  
  public Entry(Date authorizationDate, String payee, Double amount, String type, String accountName) {
    super();
    this.authorizationDate = authorizationDate;
    this.recipient = payee;
    this.amount = amount;
    this.accountName = accountName;
  }

  public Date getAuthorizationDate() {
    return authorizationDate;
  }

  public void setAuthorizationDate(Date authorizationDate) {
    this.authorizationDate = authorizationDate;
  }

  public String getRecipient() {
    return recipient;
  }

  public void setRecipient(String recipient) {
    this.recipient = recipient;
  }

  public Double getAmount() {
    return amount;
  }

  public void setAmount(Double amount) {
    this.amount = amount;
  }
  

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }
  
  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }
  
  public String getAccountName() {
    return accountName;
  }

  public void setAccountName(String accountName) {
    this.accountName = accountName;
  }

  @Override
  public String toString() {
    return "Entry [id=" + id + ", authorizationDate=" + authorizationDate
        + ", recipient=" + recipient + ", amount=" + amount + ", type=" + type
        + ", accountName=" + accountName + "]";
  }
}
