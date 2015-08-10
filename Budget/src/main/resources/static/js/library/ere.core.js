var ere = {};
ere._errors = null;
ere.showErrors = function () {
  userFeedbackMessage(ere._errors, {type: 'error'});
  ere._errors = null;
};
ere.errors = function (errors) {
  ere._errors = errors;
};
ere.openBareWindow = function (title, url) {
    var w = "toolbar=0," +
    "location=0," +
    "directories=0," +
    "status=1," +
    "menubar=0," +
    "scrollbars=1," +
    "resizable=1," +
    "copyhistory=0," +
    "width=750," +
    "height=550,";
    window.open(url, title, w);
};

//Used to parse string and make them selector safe
ere.makeNameSelectorSafe = function(unsafe){
  unsafe = unsafe.replace(/\./g, "\\.");
  unsafe = unsafe.replace(/\[/g, "\\[");
  unsafe = unsafe.replace(/\]/g, "\\]");
  unsafe = unsafe.replace(/\'/g, "\\'");
  return unsafe;
}

$(document).ready(function() {
  if(ere._errors != null) ere.showErrors();
});