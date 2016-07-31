//$("#numberOfCatClicks").prop('disabled', true);

$( function() {
  var cat1Name = 'Kuddlez';
  var cat2Name = 'Scaredz';
  var catCounter1 = $( '#numberOfCatClicksCat1' );
  var catCounter2 = $( '#numberOfCatClicksCat2' );

  $('#cat1Name').text(cat1Name);
  console.log($('#cat1Name'));
  $('#cat2Name').text(cat2Name);

  $( '#cat1' ).on( 'click', function() {
    catCounter1.val(parseInt(catCounter1.val()) + 1);
  });
  $( '#cat2' ).on( 'click', function() {
    catCounter2.val(parseInt(catCounter2.val()) + 1);
  });
});
