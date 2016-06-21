'use strict';

$(document).ready(function() {
  $('.choice .choice-item').click(function() {
    $('.choice .choice-item').removeClass("disabled").not(this).addClass("disabled");

    var choicename = $(this).parent().data('choicename');
    var index = $(this).index();

    var result = $('.choice-result[data-choicename="' + choicename + '"]');

    result.find('.choice-result-item').hide().eq(index).show();

    $('.choice-result').slice($(result).index()).find('.choice-result-item').hide();

    return false;
  });

  $('.choice-result .choice-result-item').hide();
});