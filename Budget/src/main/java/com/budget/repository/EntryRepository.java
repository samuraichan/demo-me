package com.budget.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.budget.data.jpa.domain.Entry;

@Repository
public interface EntryRepository extends CrudRepository<Entry, Long>{

  @Override
  @Transactional
  public List<Entry> findAll();
}
