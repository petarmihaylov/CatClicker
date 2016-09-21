$("#numberOfCatClicks").prop('disabled', true);
//localStorage.clear(); // Remove this line when testing is done so it keeps the click counter

$( function() {

  /******* START: MODEL *******
  ****************************/

  var model = {
    init: function() {
      var settings = {
          lastCatByArrayId: null,
          // It will be changed to false later
          // Setting initially to true for testing
          inAdminMode: true
        }

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
        localStorage.setItem('settings', JSON.stringify(settings));
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
      var settings = JSON.parse(localStorage.getItem('settings'));
      return settings;
    }
  } // END: model

  /******* END: MODEL *******
  **************************/

  /******* START: VIEW - MENU *******
  **********************************/
  var viewMenu = {
    init: function() {
      viewMenu.render();
    },

    render: function() {
      var cats = octopus.getCats();
      // Iterate over the cats so that they all get an on-click property to load the cat that was clicked
      for (var i = 0; i < cats.length; i++) {
        $('#cats').append('<li><h2  id="' + 'cat-' + cats[i].id + '">' + cats[i].name + '</h2></li>');
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
      viewCatViewer.render(cat);
      viewCatViewer.bootstrap();
    },

    init: function() {
      var cat = octopus.getLastCatViewed();
      viewCatViewer.render(cat);
      viewCatViewer.bootstrap();
    },

    // Adds onClick functions to all cat images!
    bootstrap: function() {
      var cats = octopus.getCats();
      for (var cat = 0; cat < cats.length; cat++) {
        var catID = '#catImage-' + cats[cat].id;
        $(catID).on('click', (function() {
          return function(){
            octopus.updateClickCount();
          };
        })(cats[cat]));
      }
    },

    render: function(cat) {
      var catImage = $('.catImage');
      var catName = $('#catName');

      // Udpate Cat Name
      catName.fadeOut(200, function() {
        catName.text(cat.name);
      });
      catName.fadeIn(200);

      // Update Cat Image
      catImage.fadeOut(200, function(){
        catImage.attr('src', cat.img);
      });
      catImage.fadeIn(200);

      //catImage.attr('src', cat.img);
      catImage.attr('alt', cat.alt);
      catImage.attr('id', 'catImage-' + cat.id);

      // Update Clicks
      viewCatViewer.renderClicks($('#numberOfCatClicks'), cat.clicks);
      octopus.updateSettingsLastCatViewed(cat);

      // Render the info in the admin section - if the setting is currnety true
      var settings = octopus.getSettings();
      //console.log(settings);
      if (settings.inAdminMode === true) {
        $('admin-cat-name').val(cat.name);
      }
    },

    // Renders the name an/or clicks for a cat on update
    renderClicks: function(element, clicks) {
      element.css({ color: '#eee' });
      element.animate({ color: '#555' }, 200);
      element.val(clicks);
      // element.css({ color: '#eee' });
      // element.animate({ color: '#555' }, 200);
      // element.val(clicks);
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
      if (settings.lastCatByArrayId === null) {
        viewCatViewer.initFirstRun();
      } else {
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
      var currCat = octopus.getCatById(cat.id);
      viewCatViewer.render(currCat);
    },

    updateClickCount: function() {
      var clickedCat = octopus.getLastCatViewed();
      var cats = octopus.getCats();
      var catsLength = cats.length;
      for (var i=0; i < catsLength; i++) {
        if (cats[i].id == clickedCat.id) {
          // ++ in front of the variable means that the addition will be
          // performed first and the resulting value will be assinged to clicks
          // ++ after the variable mens the CURRENT value of the variable will
          // be assigned to clicks and then 1 will be added to the variable
          var clicks = ++cats[i].clicks;
          viewCatViewer.renderClicks($('#numberOfCatClicks'), clicks);

          localStorage.cats = JSON.stringify(cats);
        }
      }
    },

    updateSettingsLastCatViewed: function(cat) {
      var settings = octopus.getSettings();
      settings.lastCatByArrayId = cat.id;
      localStorage.settings = JSON.stringify(settings);
    },

    // Takes a bookean for the value
    updateSettingsInAdminMode: function(bool) {
      var settings = octopus.getSettings();
      settings.inAdminMode = bool;
      localStorage.settings = JSON.stringify(settings)
    }
  };

  /******* END: OCTOPUS *******
  ****************************/
  // Make everything go
  octopus.init();

});
