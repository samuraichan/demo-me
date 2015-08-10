package com.budget.data.mapper;

import java.util.List;

import org.springframework.stereotype.Service;

import com.budget.data.jpa.domain.DailyTotal;
import com.budget.data.jpa.domain.Entry;

@Service
public interface EntryMapper {
  
  public List<Entry> findAllEntriesByRange(Integer days);
  
  public List<DailyTotal> findAllDailyTotalsByRange(Integer days);
}
