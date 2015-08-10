package com.budget.data.model;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.util.CollectionUtils;

import com.budget.data.jpa.domain.DailyTotal;
import com.budget.data.jpa.domain.Entry;

public class DailyDetail implements Serializable {

  private static final long serialVersionUID = 1L;
  
  private final Map<String, DailyEntry> dailyMap;
  
  
  public DailyDetail(List<Entry> entries, List<DailyTotal> dailyTotals) {
    dailyMap = new HashMap<String, DailyEntry>(); 
    
    if (!CollectionUtils.isEmpty(entries)) {
      this.addEntries(entries);
    }
    
    if (!CollectionUtils.isEmpty(dailyTotals)) {
      this.addTotal(dailyTotals);
    }
  }
  
  private void addEntries(List<Entry> entries) {
    for (Entry entry : entries) {
      String key = entry.getAuthorizationDate().toString();
      if (dailyMap.containsKey(key)) {
        dailyMap.get(key).addEntry(entry);
      }
      else {
        dailyMap.put(key, new DailyEntry(entry));
      }
    }
  }
  
  
  private void addTotal(List<DailyTotal> dailyTotals) {
    for (DailyTotal dailyTotal : dailyTotals) {
      DailyEntry entry = dailyMap.get(dailyTotal.getTotalDate().toString()); 
      entry.setTotal(dailyTotal);
    }
  }

  public Map<String, DailyEntry> getDailyMap() {
    return dailyMap;
  }
  
  // now add total iformatio
  
  

}
