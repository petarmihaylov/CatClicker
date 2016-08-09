$("#numberOfCatClicks").prop('disabled', true);

$( function() {

  /******* START: MODEL *******
  ****************************/

  var model = {
    init: function() {
      var settings = {
        firstRun: true,
        lastCatByArrayId: null
      };

      var cats = [
        {
          name: 'Kuddlez',
          img: 'img/kuddlez.jpg',
          alt: 'A cuddly cat.',
          clicks: '0',
          key: 1
        },
        {
          name: 'Scaredz',
          img: 'img/scaredz.jpg',
          alt: 'Scared looking cat.',
          clicks: '0',
          key: 2
        },
        {
          name: 'Napzer',
          img: 'img/napzer.jpg',
          alt: 'A napping cat.',
          clicks: '0',
          key: 3
        },
        {
          name: 'Momzy',
          img: 'img/momzy.jpg',
          alt: 'A cat mommy.',
          clicks: '0',
          key: 4
        },
        {
          name: 'Ninjaz',
          img: 'img/ninjaz.jpg',
          alt: 'A ninja kat.',
          clicks: '0',
          key: 5
        }
      ];

      // Adds the cats to local storage so clicks will be remembered
      //localStorage.clear(); // Remove this line when testing is done so it keeps the click counter
      if (!localStorage.cats) {
        localStorage.cats = JSON.stringify([]);
        for (var i = 0; i< cats.length; i++) {
          var data = JSON.parse(localStorage.cats);
          data.push(cats[i]);
          localStorage.cats = JSON.stringify(data);
        }
        console.log('localStorage.cats:')
        console.log(localStorage.cats);
      }
      if (!localStorage.settings) {
        localStorage.settings = JSON.stringify([]);
        var data = JSON.parse(localStorage.settings);
        data.push(settings);
        localStorage.settings = JSON.stringify(data);
        console.log('localStorage.settings:');
        console.log(localStorage.settings);
      }
    }, // END: init

    getCats: function() {
      var cats = [];
      var data = JSON.parse(localStorage.cats);
      for (var i = 0; i < data.length; i++) {
        cats.push(data[i]);
      }
      return cats;
    },

    getCatNames: function() {
      var catNames = [];
      var data = JSON.parse(localStorage.cats);
      for (var i = 0; i < data.length; i++) {
        catNames.push(data[i].name);
      }
      return catNames;
    }
  } // END: model

  /******* END: MODEL *******
  **************************/

  /******* START: VIEW - MENU *******
  **********************************/
  var viewMenu = {
    init: function() {
      this.cats = $('#cats');
      viewMenu.render();
    },

    render: function() {
      var catNames = octopus.getCatNames();
      for (var i = 0; i < catNames.length; i++) {
        $('#cats').append('<li><h3  id="' + catNames[i] + '">' + catNames[i] + '</h3></li>');
      }
    }
  };

  /******* END: VIEW - MENU *******
  ********************************/

  /******* START: VIEW - CAT VIEWER *******
  ****************************************/
  var viewCatViewer = {
    init: function(cat) {
      viewCatViewer.render(cat);
    },
    render: function(cat) {
      $('#catName').text(cat.name);
      $('#catImage').attr('src', cat.img);
      $('#catImage').attr('alt', cat.alt);
    }
  };

  /******* END: VIEW - CAT VIEWER *******
  **************************************/



  /******* START: OCTOPUS *******
  ******************************/

  var octopus = {
    init: function() {
      model.init();
      viewMenu.init();
      var settings = JSON.parse(localStorage.settings);
      console.log(settings);
      if (settings[0].firstRun) {
        var catData = this.getRandomCat();
        var cat = catData[0];
        viewCatViewer.init(cat);
        // Update the settings
        settings[0].firstRun = false;
        settings[0].lastCatByArrayId = catData[1];
        localStorage.settings = JSON.stringify(settings);
        console.log('After updating the settings:');
        console.log(localStorage.settings);
      } else {
        console.log('settings[0].firstRun:');
        console.log(settings[0].firstRun);
        var catId = settings[0].lastCatByArrayId
        var cat = this.getCatById(catId);
        console.log(cat);
        viewCatViewer.init(cat);
      }
    },

    getCatNames: function() {
      return model.getCatNames();
    },

    getRandomNumber: function(min, max) {
       return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getCats: function() {
      return model.getCats();
    },

    getCatById: function(catId) {
      var cats = this.getCats();
      return cats[catId]
    },

    getRandomCat: function() {
      var cats = octopus.getCats();
      var catId = octopus.getRandomNumber(0, cats.length -1);
      var randomCat = cats[catId];
      return [randomCat, catId]
    }
  };

  /******* END: OCTOPUS *******
  ****************************/

  octopus.init();





  // // Pick a random currentCat to display at program start
  //
  //
  // // Add the cat names to the page
  // for (var i = 0, name, firstLetter, capitalized, arraylength = cats.length; i < arraylength; i++) {
  //       name = cats[i].name;
  //
  //       $('#' + name).on('click', (function(currentCat) {
  //         return function() {
  //           $('#catName').text(currentCat.name);
  //           $('#catImage').attr('src', currentCat.img);
  //           $('#catImage').attr('alt', currentCat.alt);
  //           catCounter.val(parseInt(currentCat.clicks));
  //         };
  //       })(cats[i]));
  // };






});
