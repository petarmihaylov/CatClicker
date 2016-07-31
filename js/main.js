$("#numberOfCatClicksCat1").prop('disabled', true);

$( function() {

  var cats = {
    kuddlez: {
      name: 'Kuddlez',
      img: 'img/kuddlez.jpg',
      alt: 'A cuddly cat.'
    },
    scaredz: {
      name: 'Scaredz',
      img: 'img/scaredz.jpg',
      alt: 'Scared looking cat.'
    },
    napzer: {
      name: 'Napzer',
      img: 'img/napzer.jpg',
      alt: 'A napping cat.'
    },
    momzy: {
      name: 'Momzy',
      img: 'img/momzy.jpg',
      alt: 'A cat mommy.'
    },
    ninjaz: {
      name: 'Ninjaz',
      img: 'img/ninjaz.jpg',
      alt: 'A ninja kat.'
    }
  }

  // Iterate over all the cats so that I can refer to them as numbers
  var catsArray = [];
  for (var property in cats) {
    if (cats.hasOwnProperty(property)) {
      catsArray.push(property);
    }
  }

  // Random integer generator
  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Pick a random currentCat
  var randomCat = catsArray[getRandomIntInclusive(0,catsArray.length-1)];
  var currentCat = cats[randomCat];

  $('#catName').text(currentCat.name);
  $('#catImage').attr('src', currentCat.img);
  $('#catImage').attr('alt', currentCat.alt);

  var catCounter = $( '#numberOfCatClicksCat' );

  $( '#catImage' ).on( 'click', function() {
    catCounter.val(parseInt(catCounter.val()) + 1);
  });
});
