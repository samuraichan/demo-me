package com.budget.web;

import java.text.NumberFormat;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomNumberEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.budget.data.jpa.domain.DailyTotal;
import com.budget.data.jpa.domain.Entry;
import com.budget.service.EntryService;
import com.budget.web.model.AjaxFormResponse;

@Controller
public class WebController {

  @Autowired
  private EntryService entryService;
  
  @InitBinder
  public void initBinder(WebDataBinder binder) {  
    NumberFormat numberFormat = NumberFormat.getCurrencyInstance();
    binder.registerCustomEditor(Double.class, new CustomNumberEditor(Double.class, numberFormat, false));
  }

  @RequestMapping("/")
  @ResponseBody
  public String helloWorld() {

    for (Entry entry : entryService.findAllEntries()) {
      System.out.println(entry);
    }
    
    for (DailyTotal dailyTotal : entryService.findAllDailyTotals()) {
      System.out.println(dailyTotal);
    }

    return "so what is for nothing";
  }

  @RequestMapping(value = "/sample", method = RequestMethod.GET)
  public String get(Object model) {
    return "sample-form";
  }
  
  @RequestMapping(value = "/daily", method = RequestMethod.GET)
  public String getDaily(Model model) {
    model.addAttribute("dailySummary", entryService.findMonthToDateEntryDetails());
    return "daily";
  }
  
  @RequestMapping(value = "/entry/update", method = RequestMethod.POST, headers="Accept=application/json")
  @ResponseBody public AjaxFormResponse updateEntry(@Valid Entry entry, BindingResult result, Model model) {
    AjaxFormResponse formResponse = new AjaxFormResponse();
    
//    if(result.hasErrors())
//    {
//      for(FieldError error: result.getFieldErrors())
//      {
//        formResponse.addError(error.getField(), messageSource.getMessage(error, Locale.US));
//      }
//      return formResponse;
//    }
//    
//    model.addAttribute("uuid", transactionService.create(transactionForm.getTransactions()));
    entryService.updateEntry(entry);
    //formResponse.addProperty("entry", );
    formResponse.setUrl("/daily");
    return formResponse;
  }
}
