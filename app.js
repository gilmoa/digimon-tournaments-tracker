var main = function() {
  var pwd;

  $('.tournaments-list li').click(function() {
    $(this).toggleClass('list-group-item-success');
    $(this).children('h2').children('span').toggleClass('glyphicon-star-empty');
    $(this).children('h2').children('span').toggleClass('glyphicon-star');

    updateBar();
  });

  $('.footerbar button').click(function() {
    $('.tournaments-list').slideUp();
    $('.second').slideUp;
  });

  $('.footerbar .pull-left').click(function() {
    $('.calendar').slideDown();
  });

  $('.footerbar .pull-right').click(function() {
    $('.tournaments-list').slideUp();
    $('.calendar').slideUp();
    $('.infos').slideDown();
  });

  $('.shade .container .glyphicon-remove').click(function() {
    $(this).parent().parent('.shade').hide();
  });

  $('.second .btn').click(function() {
    $('.tournaments-list').slideDown();
    $(this).parent('.second').slideUp();
  });

  $('.result .container').click(function() {
    $(this).parent('.shade').hide();
  });

  $('.save').click(function() {
    pwd = "";
    $('.code').show();
  });

  $('.code .btn-group').children('.btn').click(function() {
    pwd += $(this).text();
  });

  $('.confirm').click(function() {
    $('.code').hide();
    var datas = {};
    $('.tournaments-list li').each(function(index) {
      datas[$(this).children('h2').children('p').text()] = $(this).hasClass('list-group-item-success');
    });

    $.get("api.php?pwd=" + pwd + "&datas=" + JSON.stringify(datas), function(data) {
      $('.result .container .alert h2').text(data);
      if(data == "Saved.") {
        $('.result .container .alert').addClass("alert-success");
        $('.result .container .alert').removeClass("alert-danger");
      } else {
        $('.result .container .alert').addClass("alert-danger");
        $('.result .container .alert').removeClass("alert-success");
      }
      $('.result').show();
    });
  });

  $.getJSON("api.json", function(data) {
    $('.tournaments-list li').each(function(index) {
      if(data[$(this).children('h2').children('p').text()]) {
        $(this).addClass('list-group-item-success');
        $(this).children('h2').children('span').removeClass('glyphicon-star-empty');
        $(this).children('h2').children('span').addClass('glyphicon-star');
      }
    })
    updateBar();
  });
}

var updateBar = function() {
  var count = 0;
  $('.tournaments-list li').each(function(index) {
    if($(this).hasClass('list-group-item-success')) {
      count++;
    }
  });
  var width = count * (100 / 21);
  $('.progress-bar').addClass('active');
  $('.progress-bar').attr('style', "width: " + width.toFixed(0) + "%;");
  $('.progress-bar').text(width.toFixed(0) + "%");
  setTimeout(function() {
      $('.progress-bar').removeClass('active');
  }, 1000);


  // $('.tournaments-list').hide();
}

$(document).ready(main);
