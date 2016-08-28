$("#numberOfCatClicks").prop('disabled', true);
//localStorage.clear(); // Remove this line when testing is done so it keeps the click counter

$( function() {

  /******* START: MODEL *******
  ****************************/

  var model = {
    init: function() {
      var settings = [
        {
          firstRun: true,
          lastCatByArrayId: null
        }
      ];

      var cats = [
        {
          name: 'Kuddlez',
          img: 'img/kuddlez.jpg',
          alt: 'A cuddly cat.',
          clicks: '0',
          id: 1
        },
        {
          name: 'Scaredz',
          img: 'img/scaredz.jpg',
          alt: 'Scared looking cat.',
          clicks: '0',
          id: 2
        },
        {
          name: 'Napzer',
          img: 'img/napzer.jpg',
          alt: 'A napping cat.',
          clicks: '0',
          id: 3
        },
        {
          name: 'Momzy',
          img: 'img/momzy.jpg',
          alt: 'A cat mommy.',
          clicks: '0',
          id: 4
        },
        {
          name: 'Ninjaz',
          img: 'img/ninjaz.jpg',
          alt: 'A ninja kat.',
          clicks: '0',
          id: 5
        }
      ];

      // Adds the cats to local storage so clicks will be remembered
      if (!localStorage.cats) {
        localStorage.cats = JSON.stringify([]);
        for (var i = 0; i< cats.length; i++) {
          var data = JSON.parse(localStorage.cats);
          data.push(cats[i]);
          localStorage.cats = JSON.stringify(data);
        }
      }
      // Creates the local storage for the settings
      if (!localStorage.settings) {
        localStorage.settings = JSON.stringify([]);
        for (var i = 0; i< settings.length; i++) {
          var data = JSON.parse(localStorage.settings);
          data.push(settings[i]);
          localStorage.settings = JSON.stringify(data);
        }
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

    getSettings: function() {
      var settings = {};
      var data = JSON.parse(localStorage.settings);
      for (var i = 0; i < data.length; i++) {
        $.each(data[i], function(key, value) {
          settings[key] = value;
        });
      }
      console.log(settings);
      return settings;
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
      var cats = octopus.getCats();
      //console.log(cats); //This works
      // Iterate over the cats so that they all get an on-click property to load the cat that was clicked
      for (var i = 0; i < cats.length; i++) {
        $('#cats').append('<li><h3  id="' + 'cat-' + cats[i].id + '">' + cats[i].name + '</h3></li>');
        $('#cat-' + cats[i].id).on('click', (function(cat) {
          return function(){
            octopus.showCat(cat);
          };
        })(cats[i]));
      }
    }
  };

  /******* END: VIEW - MENU *******
  ********************************/

  /******* START: VIEW - CAT VIEWER *******
  ****************************************/
  var viewCatViewer = {
    initFirstRun: function () {
      var cat = octopus.getRandomCat();
      //console.log(cat); //This works
      viewCatViewer.render(cat);
    },

    init: function() {
      var cat = octopus.getLastCatViewed();
      viewCatViewer.render(cat);
    },

    // Adds onClick functions to all cat images - when in shouldn't!
    bootstrap: function() {
      var cats = octopus.getCats();
      for (var i = 0; i < cats.length; i++) {
        $('#catImage-' + cats[i].id).on('click', (function(cat) {
          return function() {
            octopus.updateClickCount(cat);
          };
        })(cats[i]));
      }
    },

    render: function(cat) {
      var catImage = $('.catImage');
      $('#catName').text(cat.name);
      catImage.attr('src', cat.img);
      catImage.attr('alt', cat.alt);
      catImage.attr('id', 'catImage-' + cat.id);
      viewCatViewer.bootstrap();
      octopus.updateLastCatViewed(cat);
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
      var settings = octopus.getSettings();
      if (settings.firstRun) {
        // Load this as the first run to get a random cat
        viewCatViewer.initFirstRun();
        // Update the settings to indicate the aplication has been run before
        settings.firstRun = false;
        localStorage.settings = JSON.stringify(settings);
      } else {
        var catId = settings.lastCatByArrayId;
        var cat = this.getCatById(catId);
        // Load the regular init so that the last cat viewed shows up
        viewCatViewer.init();
      }
    },

    getRandomNumber: function(min, max) {
       return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getCats: function() {
      return model.getCats();
    },

    getCatById: function(catId) {
      var cats = this.getCats();
      return cats[catId-1];
    },

    getRandomCat: function() {
      var cats = octopus.getCats();
      var catId = octopus.getRandomNumber(0, cats.length -1);
      var randomCat = cats[catId];
      return randomCat;
    },

    getLastCatViewed: function() {
      var settings = JSON.parse(localStorage.settings);
      var catId = settings.lastCatByArrayId
      var cat = this.getCatById(catId);
      localStorage.settings = JSON.stringify(settings);
      return cat;
    },

    getSettings: function() {
      return model.getSettings();
    },

    showCat: function(cat) {
      viewCatViewer.render(cat);
    },

    updateClickCount: function(cat) {
      // do stuff to update the click count
      alert(cat.name);
    },

    updateLastCatViewed: function(cat) {
      var settings = octopus.getSettings();
      settings.lastCatByArrayId = cat.id;
      settings.firstRun = false;
      localStorage.settings = JSON.stringify(settings);
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
