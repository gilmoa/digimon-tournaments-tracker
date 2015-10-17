var main = function() {
  $('.tournaments-list li').click(function() {
    $(this).toggleClass('list-group-item-success');
    $(this).children('h2').children('span').toggleClass('glyphicon-star-empty');
    $(this).children('h2').children('span').toggleClass('glyphicon-star');

    updateBar();
  });

  $('.btn').click(function() {
    var datas = {};
    $('.tournaments-list li').each(function(index) {
      datas[$(this).children('h2').children('p').text()] = $(this).hasClass('list-group-item-success');
    });

    $.get("api.php?datas=" + JSON.stringify(datas), function(data) {
      alert(data);
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
  setTimeout(function() {
      $('.progress-bar').removeClass('active');
  }, 1000);

}

$(document).ready(main);
