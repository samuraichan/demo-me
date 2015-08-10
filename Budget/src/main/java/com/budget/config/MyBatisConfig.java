package com.budget.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

@Configuration
@MapperScan(basePackages="com.budget.data.mapper")
public class MyBatisConfig {
  
  @Bean
  public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
      final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
      sessionFactory.setDataSource(dataSource);
      PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
      sessionFactory.setMapperLocations(resolver.getResources("classpath:com/budget/data/mybatis/*.xml"));
      return sessionFactory.getObject();
  }
}
