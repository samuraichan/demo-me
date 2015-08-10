package com.budget.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.budget.data.jpa.domain.DailyTotal;
import com.budget.data.jpa.domain.Entry;
import com.budget.service.EntryService;

@Controller
public class WebController {

  @Autowired
  private EntryService entryService;

  @RequestMapping("/")
  @ResponseBody
  public String helloWorld() {

    for (Entry entry : entryService.findAllEntries()) {
      System.out.println(entry);
    }
    
    for (DailyTotal dailyTotal : entryService.findAllDailyTotals()) {
      System.out.println(dailyTotal);
    }

    return "so what is for ";
  }

  @RequestMapping(value = "/sample", method = RequestMethod.GET)
  public String get(Object model) {
    return "sample-form";
  }
  
  @RequestMapping(value = "/daily", method = RequestMethod.GET)
  public String getDaily(Model model) {
    model.addAttribute("dailySummary", entryService.findEntyDetailByRange(11));
    return "daily";
  }
}
