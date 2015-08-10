package com.budget.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.budget.data.jpa.domain.DailyTotal;

@Repository
public interface DailyTotalRepository extends CrudRepository<DailyTotal, Long>{

  @Override
  @Transactional
  public List<DailyTotal> findAll();
}
