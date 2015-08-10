package com.budget.data.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.util.CollectionUtils;

import com.budget.data.jpa.domain.DailyTotal;
import com.budget.data.jpa.domain.Entry;

public class DailyEntry implements Serializable {

  private static final long serialVersionUID = 1L;
  
  private List<Entry> entries;
  
  private DailyTotal total;
  
  public DailyEntry(Entry entry) {
    this.addEntry(entry);  
  }

  public List<Entry> getEntries() {
    return entries;
  }

  public void setEntries(List<Entry> entries) {
    this.entries = entries;
  }

  public DailyTotal getTotal() {
    return total;
  }

  public void setTotal(DailyTotal total) {
    this.total = total;
  }
  
  public void addEntry(Entry entry) {
    if (CollectionUtils.isEmpty(entries)) {
      entries = new ArrayList<Entry>();
    }
    
    entries.add(entry);
  }

}
