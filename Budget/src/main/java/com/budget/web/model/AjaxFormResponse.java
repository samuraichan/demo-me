package com.budget.web.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AjaxFormResponse {

  private String url;
  private Map<String, List<String>> errors;
  private Map<String, List<String>> warnings;
  private Map<String, List<Object>> property;
  private List<String> messages;

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public Map<String, List<String>> getErrors() {
    return errors;
  }

  public Map<String, List<Object>> getProperty() {
    return property;
  }

  public Map<String, List<String>> getWarnings() {
    return warnings;
  }

  public void addError(String field, String message) {
    if (errors == null)
      errors = new HashMap<String, List<String>>();
    if (errors.get(field) == null)
      errors.put(field, new ArrayList<String>());
    errors.get(field).add(message);
  }

  public void addWarning(String field, String message) {
    if (warnings == null)
      warnings = new HashMap<String, List<String>>();
    if (warnings.get(field) == null)
      warnings.put(field, new ArrayList<String>());
    warnings.get(field).add(message);
  }
  
  public void addProperty(String propertyName, Object object) {
    if (property == null)
      property = new HashMap<String, List<Object>>();
    if (property.get(propertyName) == null)
      property.put(propertyName, new ArrayList<Object>());
    property.get(propertyName).add(object);
    
  }

  public List<String> getMessages() {
    return messages;
  }

  public void addMessage(String message) {
    if (messages == null)
      messages = new ArrayList<String>();
    messages.add(message);
  }
}
