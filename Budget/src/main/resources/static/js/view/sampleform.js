$(document).ready(function() {
  
 
  new AjaxObject('.form-frm', {
    confirmText: "Are you sure you want to submit your Vehicle Registration(s)",
    validationCallback: function (data) {
        $("html,body").animate({ scrollTop: 0}, 500);
    },
    callback: function(data) {
      $('input[name="attachments"]').remove();
      $('.div-attach span').remove();
      userFeedbackMessage(data.messages[0],{type:'success'}); 
      $("html,body").animate({ scrollTop: 0}, 500);
    }
  });
  
  
  $('.div-vehicles').append($('fieldset').not(':visible').clone().toggle());
  
  $('body').on('click', '.btn-add', function(e) {
    var cloned = $('fieldset').not(':visible').clone().toggle();
    $(this).before(cloned);
    cloned.find('.btn-delete').parent().toggle();
    var index = $('fieldset:visible').length - 1;
    $('fieldset:visible:last').find('input,select').each(function() {
      var name = $(this).attr('name');
      $(this).attr("name", name.replace(/(\[\d*\])(?![\s\S]*\[\d*\])/, '[' + index + ']'));  
    });
    $('fieldset:visible:last').find('.span-num').text(index+1);
    e.preventDefault();
  });
   
  $('body').on('click', '.btn-delete', function(e) {
    $(this).closest('fieldset').remove();
    
    $('fieldset:visible').each(function(index) {
      $(this).find('.span-num').text(index+1);
      $(this).find('input,select').each(function() {
        var name = $(this).attr('name');
        $(this).attr("name", name.replace(/(\[\d*\])(?![\s\S]*\[\d*\])/, '[' + index + ']')); 
      });
    });
    e.preventDefault();
  });
  
  $('.bs-example-modal-sm').on('show.bs.modal', function (e) {
	  //alert('duded');
	})
});