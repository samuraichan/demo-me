$(document).ready(function() {
  
  new AjaxObject('.form', {
    preProcess : function() {
      var form = $(this)[0].element;
      var value = $('.entry-dialog').find('#visa').val().length > 0 ? $('.entry-dialog').find('#visa').asNumber() : $('.entry-dialog').find('#bank').asNumber();
      form.find('#amount').val(value);
    },
    callback : function(data) {
      $('.modal-dialog .btn-close').trigger('click');
    }
  });
  
  $('.entry-row').on('click', function() {
    $(this).addClass('clicked');
  });
  
  $('.entry-dialog').on('show.bs.modal', function (e) {
    var form = $('.form');
    var row = $('tr.clicked');
    form.find('#type').val(row.find('td:eq(1)').text());
    form.find('#recipient').val(row.find('td:eq(2)').text());
    form.find('#id').val(row.closest('tr').data('id'));
    form.find('#authorizationDate').val(row.closest('.table').find('tbody tr:first td:first').text());
    if (row.find('td:eq(3) .currency-field').text().length == 0) {
      form.find('div.bank').hide();   
      form.find('#visa').val(row.find('td:eq(4) .currency-field').text());
    }
    else {
      form.find('div.visa').hide();   
      form.find('#bank').val(row.find('td:eq(3) .currency-field').text());
    }
  })
  
  $('.entry-dialog').on('hidden.bs.modal', function (e) {
    $('.entry-row').removeClass('clicked');
    $('.entry-dialog').find('div.bank, div.visa').show();
  })
});