$("#numberOfCatClicksCat1").prop('disabled', true);

$( function() {
  var cat1Name = 'Kuddlez';
  var catCounter1 = $( '#numberOfCatClicksCat1' );

  $('#cat1Name').text(cat1Name);
  console.log($('#cat1Name'));

  $( '#cat1' ).on( 'click', function() {
    catCounter1.val(parseInt(catCounter1.val()) + 1);
  });
});
