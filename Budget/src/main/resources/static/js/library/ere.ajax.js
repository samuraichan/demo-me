function AjaxObject(selector, options){
  var ajaxUrl;
  var element;
  try {
    element = $(selector);
  } catch(error) {
    element = $();
  }
  var url = null;
  var object = this;
	var blocked = false;

  options = $.extend({},{      
    type: "POST",
    data: {},
    callback: null,
    validationCallback: null,
    confirmText: null,
    bindClick: true,
    bindSubmit: true,
    target: null,
    fieldLevelErrors: false
  }, options);
  
  if(typeof element == 'undefined' || element.length <= 0){
    element = $("<a />").attr("href",selector);
  }  

  if (element.prop("href") != null && options.bindClick){
    $(element).click(function(e){
      object.execute();
      e.preventDefault();
    });
  }
  
  if (element.prop("action") != null && options.bindSubmit){
    $(element).submit(function(e){
      object.execute();
      e.preventDefault();
    });
  }

  this.execute = function(){
    if(options.confirmText != null)
    {
      if(!confirm(options.confirmText))
      { 
        return false;
      }
    }
    if(blocked) return false;
    blocked = true;
    if (element.prop("href") != null) {
      ajaxUrl = element.attr("href");
      $.each(element.data(), function(key, val){
    	  options.data[key] = val;
      });
      var formData = $.param(options.data);
    } else if(element.prop("action") != null) {
      ajaxUrl = element.attr("action");  
      var formData = $(element).serialize()+"&"+$.param(options.data);
    }
    $.ajax({
      type: options.type,
      url: ajaxUrl,
      data: formData,
      dataType: 'json',
      success: object.callback,
      statusCode: {
        401: function(data) {
          window.location.href="/logout";
        },
        403: function(data) {
          window.location.href="/error/403";
        },
        404: function(data) {
          window.location.href="/error/404";
        },
        405: function(data) {
          window.location.href="/error/405";
        },
        500: function(data) { 
          window.location.href="/error/500";
        },
        409: function(data) { 
          window.location.href="/Error409.html";
        }
      }
    });
  }

  this.callback = function(data){
    if (data.url)
    {
      window.location.href=data.url;
    }
    if (data.errors)
    {
      var errorList = [];
      $.each(data.errors, function(key,value){
        $.each(value, function(index,msg) {
          errorList.push(msg);
          if(options.fieldLevelErrors){
            $(':input[name="'+ere.makeNameSelectorSafe(key)+'"]:not([type=hidden])').ereDisplayFieldError({errorMsg: msg});
          }
        });
      });
      userFeedbackMessage(errorList, {type: 'error', target: options.target});
      if(options.validationCallback != null) options.validationCallback(data);
    }
    else if (data.warnings)
    {
      var warningList = [];
      $.each(data.warnings, function(key,value){
        $.each(value, function(index,msg) {
          warningList.push(msg);
        });
      });
      userFeedbackMessage(warningList, {type: 'warning', target: options.target});
      if(options.validationCallback != null) options.validationCallback(data);
    }
    else
    {
      if(options.callback != null) options.callback(data);
    }
    blocked = false;
  }
	
};
