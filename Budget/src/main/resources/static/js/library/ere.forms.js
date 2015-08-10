(function( $ ) {
  $.fn.ereFormatDate = function() {
    var mm_entered = "";
    var dd_entered = "";
    var yyyy_entered = "";
    var currentInt = "";
    var fieldCharCount;
    var temp;
    var valueCharIndex = 0;
    var datePartIndex = 0;
    var value = this.val();
    var format = this.data("format");
    
    // If there's nothing to format, leave it alone
    value = value.replace(/^\s*/, "").replace(/\s*$/,"");
    if (value == "")
    {
      this.val('');
      return true;
    }

    // loop 3 times to verify month, date, and year.
    // We call this date part, 'cause we're either on the month part, date part, or year part... get it?
    for (datePartIndex = 0; datePartIndex < 3; datePartIndex++)
    {
      fieldCharCount = 0;
      temp = "";

      while (valueCharIndex < value.length && (fieldCharCount < 2 || (datePartIndex == 2 && fieldCharCount < 4) ) )
      {
        currentInt = parseInt(value.charAt(valueCharIndex));
        valueCharIndex++;

        // check if the char read is a integer between 0 and 9, inclusively.
        if (!isNaN(currentInt) && currentInt > -1 && currentInt < 10)
        {
          // Add this numeric value to the value we have
          temp += value.charAt(valueCharIndex - 1);
          // increment the counter for the number of characters this value has (mo, date, or year)
          fieldCharCount++;

          // If this is the first "part", and there have been 2 characters added to the value, set it to the month
          if (datePartIndex == 0 && fieldCharCount == 2)
          {
            mm_entered = temp;
          }
          // If this is the second "part", and there have been 2 characters added to the value, set it to the date
          else if (datePartIndex == 1 && fieldCharCount == 2)
          {
            dd_entered = temp;
          }
          // If this is the third "part", and there have been 4 characters added to the value (or we've added all that's
          // in the value), set it to the year
          else if (datePartIndex == 2 && (valueCharIndex == value.length || fieldCharCount == 4) )
          {
            yyyy_entered = temp;
          }
        }
        // We've come across a character that's not a numeric.  Must mean spacer
        else
        {
          // We have added to the part-holder (the var that holds the month characters one by one when we're on the month
          // index, etc) some value.  Meaning, if this is the first time through and we're parsing through '2 3 2003', we
          // added the first 2 and then came to a space
          if (temp.length > 0)
          {
            // We're on the first iteration, so we're working on the month
            if (datePartIndex == 0)
            {
              mm_entered = temp;
            }
            // We're on the second iteration, so we're working on the date
            else if (datePartIndex == 1)
            {
              dd_entered = temp;
            }
            // We're on some other iteration, must be the year
            else
            {
              yyyy_entered = temp;
            }
            break;
          }
        }
      } // end of while loop
    }  // end of for loop

    // alert and return if any one of the 3 values is empty.
    if (mm_entered == "" || dd_entered == "" || yyyy_entered == "")
    {
      return false;
    }

    // swap "mm_entered" and "dd_entered" if date format is not default date(U.S. date)
    if (format != "MM/dd/yyyy" &&  format != "mm/dd/yyyy")
    {
      temp = dd_entered;
      dd_entered = mm_entered;
      mm_entered = temp;
    }

    // verify year
    temp = parseInt(yyyy_entered,10);
    if (temp < 10)
    {
      yyyy_entered = "200" + temp;
    }
    else if (temp >= 10 && temp < 50)
    {
      yyyy_entered = "20" + temp;
    }
    else if (temp >= 50 && temp < 100)
    {
      yyyy_entered = "19" + temp;
    }
    else if (temp >= 1900 && temp <= 2200)
    {
      yyyy_entered = temp;
    }
    else
    {
      return false;
    }

    // verify month
    temp = parseInt(mm_entered, 10);
    if (temp < 1 || temp > 12)
    {
      return false;
    }
    if (mm_entered.length < 2)
    {
      mm_entered = "0" + mm_entered;
    }

    // verify day
    currentInt = parseInt(dd_entered, 10);
    if (  currentInt < 1 || currentInt > 31 ||
         ( (temp == 4 || temp == 6 || temp == 9 || temp == 11) && currentInt > 30) ||
         (temp == 2 && parseInt(yyyy_entered,10) % 4 == 0 && currentInt > 29) ||
         (temp == 2 && parseInt(yyyy_entered,10) % 4 != 0 && currentInt > 28) )
    {
      return false;
    }

    if (dd_entered.length < 2)
    {
      dd_entered = "0" + dd_entered;
    }

    if (format != "MM/dd/yyyy" &&  format != "mm/dd/yyyy")
    {
      this.val(dd_entered + "/" + mm_entered + "/" + yyyy_entered);
    }
    else
    {
      this.val(mm_entered + "/" + dd_entered + "/" + yyyy_entered);
    }
    return true;
  }
})( jQuery );


$(document).ready(function() {
  $("form.ajax-handled").each(function() {
    new AjaxObject(this);
  });
  
  $("a.ajax-handled").each(function() {
    new AjaxObject(this, {
      data: formData
    });
  });
   
  var currencyFormatter = {
    symbol: '',
    negativeFormat: '-%s%n'
  };
  
  $('input.currency-field, span.currency-field').formatCurrency(currencyFormatter);
  
  $('.currency-field').each(function() {
    var field = $(this);
    var fieldValue = field[field.is('input, select, textarea') ? 'val' : 'html']();
    field[field.is('input, select, textarea') ? 'val' : 'html'](fieldValue);    
  });
  
  $('body').delegate('input.currency-field', 'change', function(e) {
    var field = $(this);
    if($.trim(field.val()).length > 0) {     
      if (field.asNumber({parse: false}) === '') {
        field.next('img.modified-image').remove(); 
        field.removeClass("modified-field");
        field.ereDisplayFieldError({errorMsg: 'Please enter a valid currency amount'});
        e.stopPropagation();
      }  
      else {
        field.ereRemoveFieldError();
        field.formatCurrency(currencyFormatter);
      }
    }
    else {
      field.ereRemoveFieldError(); 
    }
  });
  
  $('input.date-field').change(function(e){
    var field = $(this);
    if(field.ereFormatDate()){
      field.ereRemoveFieldError();
    }
    else{
      field.next('img.modified-image').remove(); 
      field.removeClass("modified-field");
      field.ereDisplayFieldError({errorMsg: 'Please enter a valid date'});
      e.stopPropagation();
    }
  });
 
});