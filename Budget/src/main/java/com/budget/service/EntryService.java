package com.budget.service;

import java.util.List;

import com.budget.data.jpa.domain.DailyTotal;
import com.budget.data.jpa.domain.Entry;
import com.budget.data.model.DailyDetail;

public interface EntryService {

  public List<Entry> findAllEntries();
  
  public List<DailyTotal> findAllDailyTotals();
  
  public List<DailyTotal> findAllDailyTotalsByRange(Integer days);
  
  public void saveEntry(Entry entry);
  
  public List<Entry> findAllEntriesByRange(Integer days);
  
  public DailyDetail findEntyDetailByRange(Integer days);
}
