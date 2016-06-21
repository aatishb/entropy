$(function() {

  $( "#slider1" ).slider({
    value:6,
    min: 1,
    max: 50,
    step: 1,
    slide: function( event, ui ) {
      $( "#amount1" ).val( ui.value );
      updateSlider();
    },
    change: updateSlider
  });

  $( "#amount1" ).val( $( "#slider1" ).slider( "value" ) );

  $( "#slider2" ).slider({
    value:3,
    min: 1,
    max: 50,
    step: 1,
    slide: function( event, ui ) {
      $( "#amount2" ).val( ui.value );
      updateSlider();
    },
    change: updateSlider
  });

  $( "#amount2" ).val( $( "#slider2" ).slider( "value" ) );

});
