$(document).ready(function() {
  
  var uploader = new plupload.Uploader({
    runtimes : 'html5,,html4',
    browse_button : 'pickfiles', // you can pass in id...
    container: document.getElementById('container'), // ... or DOM Element itself
    url : "/uploadFile",
    multipart_params : {
      "_csrf" : $("meta[name='_csrf']").attr("content")
    }, 
    filters : {
        max_file_size : '10mb'
    },
 
    init: {
      PostInit: function() {
        $('#uploadfiles').on('click', function() {
          uploader.start();
          return false;
        });
      },
 
      FilesAdded: function(up, files) {
        plupload.each(files, function(file) {
          $('#filelist').append('<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>');
        });
      },
 
      UploadProgress: function(up, file) {
        $('#' + file.id).find('b').append('<span>' + file.percent + '%</span>');
      },
 
      Error: function(up, err) {
        $('#console').append("\nError #" + err.code + ": " + err.message);
      },
      
      FileUploaded: function(up, file, response) {
        $('form').append('<input type="hidden" name="attachments" value="'+response.response+'"/>');
        $('.div-attach').show().append('<span>'+file.name+'</span><br/>');
      },
      
      UploadComplete: function (up, files) {
        up.splice();
        up.refresh();
      }
    }
  });
 
  uploader.init();
});