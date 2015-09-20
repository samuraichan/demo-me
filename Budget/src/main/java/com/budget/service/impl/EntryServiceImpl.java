package com.budget.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

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
  @Transactional
  public Entry updateEntry(Entry entry) {
    Entry updateEntry = entryRepository.findOne(entry.getId());
    updateEntry.setAmount(entry.getAmount());
    updateEntry.setRecipient(entry.getRecipient());
    updateEntry.setType(entry.getType());
    
    return entryRepository.save(updateEntry);
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

  @Override
  public DailyDetail findMonthToDateEntryDetails() {
    return findEntyDetailByRange(Calendar.getInstance().get(Calendar.DAY_OF_MONTH));
  }
}
