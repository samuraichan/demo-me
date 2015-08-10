package com.budget.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.budget.data.jpa.domain.DailyTotal;
import com.budget.data.jpa.domain.Entry;
import com.budget.data.mapper.EntryMapper;
import com.budget.data.model.DailyDetail;
import com.budget.repository.DailyTotalRepository;
import com.budget.repository.EntryRepository;
import com.budget.service.EntryService;

@Service
public class EntryServiceImpl implements EntryService {

  @Autowired
  private EntryRepository entryRepository;
  
  @Autowired
  private DailyTotalRepository dailyTotalRepository;
  
  @Autowired
  private EntryMapper entryDAO;
  
  @Override
  public List<Entry> findAllEntries() {
    return entryRepository.findAll();
  }

  @Override
  public void saveEntry(Entry entry) {
    entryRepository.save(entry);
  }

  @Override
  public List<DailyTotal> findAllDailyTotals() {
    return dailyTotalRepository.findAll();
  }

  @Override
  public List<Entry> findAllEntriesByRange(Integer days) {
    return entryDAO.findAllEntriesByRange(days);
  }

  @Override
  public DailyDetail findEntyDetailByRange(Integer days) {
    DailyDetail dailyDetail = new DailyDetail(this.findAllEntriesByRange(days),
        this.findAllDailyTotalsByRange(days));
  
    return dailyDetail;
  }

  @Override
  public List<DailyTotal> findAllDailyTotalsByRange(Integer days) {
    return entryDAO.findAllDailyTotalsByRange(days);
  }
}
