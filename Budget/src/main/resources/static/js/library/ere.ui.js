;(function($) {
    $.fn.popUp = function(target,options) {

    var target = $("#"+target);
    options = $.extend({}, {      
      alignment: "bottom"
    }, options);
    
    $(this).click(function(e){
      $("body").append(target);
      switch(options.alignment){
        case "bottom":
          target.css({"position":"absolute", "top":$(this).offset().top+$(this).innerHeight(),"left":$(this).offset().left});
          break;
        case "right":
          target.css({"position":"absolute", "top":$(this).offset().top,"left":$(this).offset().left + $(this).innerWidth()});
          break;
      }
      target.show('blind',200);
      e.stopPropagation();
    });
    $("body").click(function(){
      if(target.css("display") == "block"){
       target.fadeOut(200);
      }
    });
  }
    
  $.fn.ereDisplayFieldError = function(options) {
    
    options = $.extend({}, {      
      errorMsg: null
    }, options);
    
    return this.each(function() {
      var field = $(this);
      field.addClass('frm-error');
      if (field.next('img.error-image').length == 0) {
        field.after('<img class="error-image" src="/images/ico-alert-sm.gif"/>');
      }
    });
  }
  
  $.fn.ereRemoveFieldError = function() {
    return this.each(function(){
      var field = $(this);
      field.removeClass('frm-error');
      field.next('img.error-image').remove();
    });
  }
  
  $.fn.ereDisplayFieldWarning = function(options) {
    
    options = $.extend({}, {      
      errorMsg: null
    }, options);
    
    return this.each(function() {
      var field = $(this);
      field.addClass('frm-warning');
      if (field.next('img.warning-image').length == 0) {
        field.after('<img class="warning-image" src="/images/ico-warn-sm.png"/>');
      }
    });
  }
  
  $.fn.ereRemoveFieldWarning = function() {
    return this.each(function(){
      var field = $(this);
      field.removeClass('frm-warning');
      field.next('img.warning-image').remove(); 
    });
  }
})(jQuery);

//The message parameter can either be a single string or 
//an array.
function userFeedbackMessage(message, options){
  options = $.extend({},{      
    type: "notify",
    'message': message,
    title: null,
    target: null
  }, options);

  var className;
  switch(options.type){
    case 'notify': 
      className = 'fb-notify';
      break;
    case 'error':
      className = 'fb-alert';
      break;
    case 'success':
      className = 'fb-success';
      break;
    case 'warning':
      className = 'fb-warning';
      break;
  }

  var messageBox = $("<div class='feedback-box' />").addClass(className);
  var messageContent = $("<div class='fb-content' />").appendTo(messageBox);
  //if(options.type=='error'){
  //  $(messageContent).append("xxxxxRequest could not be performed due to incomplete/invalid form entries");
  //}
  if(options.title!=null) $(messageContent).append(options.title);
  $(messageContent).append("<ul />");


  if(typeof message == 'string') message = [message];
  $.each(message, function(index, msgtxt){
    $(messageContent).find("ul").append("<li><span>"+msgtxt+"</span></li>");
  });

  var target = options.target;

  if(options.target == null){
    target = ($('#content').size() > 0) ? $('#content') : $('body');

    $(".ui-dialog").each(function(){ 
      if($(this).css("display") == 'block')
        target = $(this).find('.ui-dialog-content');
    });
  }
  $(target).find('.feedback-box').remove();
  $(target).prepend(messageBox);
}

function userWarning(warnings, options){
  clearUserWarnings();
  $.each(warnings, function(field, msgtxt){
    var field = $(field);
    if($(field).is("input")){ //logic for field specific warnings, goes here.
    }
    
    var submit = $(field).closest("form").find("input[type='submit']");
    var warningContainer = null;
    if(!submit.parent().hasClass('warning-container')){
      var container = $("<span class='warning-container' />");
      submit.before(container);
      container.prepend("<div class='warning-message'><h3>Warnings to Review</h3><ul></ul><img src='/images/bg-warning-bottom.gif' /></div><img class='warning-icon' src='/images/error.gif' />");
      var warningIcon = container.find('img.warning-icon');
      var warningMessage = container.find('div.warning-message');
      submit.css({"margin-left":"32px"});
      warningIcon.css({position: "absolute", left: submit.offset().left - 22, "margin-top": "3px"});
      warningIcon.mouseover(warningHover);
    }
    var warningContainer = submit.parent();
    var item = $("<li>"+msgtxt+"</li>");
    item.append("<a href='#'>Click Here</a>").click(function(e){
      $("html,body").animate({ scrollTop: $(field).offset().top-50}, 500 );
      $(field).effect("highlight", {}, 3000);
      userWarning({});
      e.preventDefault();
    });
    warningContainer.find("ul").append(item);
  });
}

var warningHover = function(){
  var message = $(this).parent().find("div.warning-message");
  var submit = $(this).closest("form").find("input[type='submit']");
  message.show().css({position: "absolute", left: submit.offset().left - 326, "margin-top": "-"+(message.outerHeight()+(submit.outerHeight()/2))+"px" });
  message.mouseleave(function(){
    $(this).hide();
  });
};

function clearUserWarnings(){
  $('span.warning-container').each(function(){
    $(this).closest("form").find("input[type='submit']").css("margin-left","");
    $(this).remove();
  });
}

ere.optionsFromUrl = function(selector, url) {
  var selectBox = $(selector);
  new AjaxObject(url, {
    callback: function(data){
      var options = '';
      $.each(data, function(key, value) {
        options += "<option value='"+key+"'>"+value+"</option>";   
      });
      selectBox.html(options);
    }
  }).execute();
};

$(function(){
  // Tipped tooltips
  // Tip info
//  Tipped.create('.info-tooltip', {skin: 'eretip'});
//  // Tip help
//  Tipped.create('.help-tooltip', {skin: 'erehelp'});
});