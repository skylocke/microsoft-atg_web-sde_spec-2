angular.module('App')
  .component('surveyComp', {
    templateUrl: 'app/components/survey/survey.html',
    controller: SurveyCompCtrl,
    controllerAs: 'surveyComp'
  });

function SurveyCompCtrl($window, DemographicsFactory) {
  var surveyComp = this;
  surveyComp.updateInterval; // in case I use an interval to periodically update data from the database
  // I can then clear the interval on the $onDestroy hook of this component's lifecycle

  surveyComp.$onInit = function() {
    // function declarations to deal with calculating stuff when given objects with key: number pairs
    function sumObj(obj) {
      return Object.values(obj).reduce(function(a, b) {
        return a + b;
      });
      // // for IE < 9:
      // var sum = 0;
      // for( var el in obj ) {
      //   if( obj.hasOwnProperty( el ) ) {
      //     sum += parseFloat( obj[el] );
      //   }
      // }
      // return sum;
    }

    function minObjValue(obj) { // given an object list of keys with number values, find the min value
      return Object.values(obj).reduce(function(a, b) {
        return a < b ? a : b;
      });
    }

    function minObjKeys(obj) { // given an object list of keys with number values, find the min keys
      return Object.keys(obj).filter(function(key) {
        return obj[key] === minObjValue(obj);
      });
    }

    function maxObjValue(obj) { // given an object list of keys with number values, find the max value
      return Object.values(obj).reduce(function(a, b) {
        return a > b ? a : b;
      });
    }

    function maxObjKeys(obj) { // given an object list of keys with number values, find the max keys
      return Object.keys(obj).filter(function(key) {
        return obj[key] === maxObjValue(obj);
      });
    }

    function percentagesFromObj(obj) { // given an object list of keys with number values, return object with values in percent
      var total = sumObj(obj);
      var percentages = {}
      for (var key in obj) {
        percentages[key] = Math.round(obj[key] / total * 100) || 0; // the '|| 0' handles NaNs/Infinities that come from dividing by zero
      }
      return percentages;
    }

    // function expressions that are specific to this component
    surveyComp.updateGenders = function() {
      DemographicsFactory.getDemographics('gender').then(function(results) {
        surveyComp.genders = {
          counts: {},
          percentages: {},
          maxClass: {},
          minClass: {},
          fontAwesomeClass: { male: 'fa-mars', female: 'fa-venus', other: 'fa-transgender-alt' }
        };

        // parse data into slightly more digestable content
        results.forEach(function(gender) {
          surveyComp.genders.counts[gender.label] = gender.count;
        });

        // fill out the rest of the surveyComp.genders data
        for (var key in surveyComp.genders.counts) {
          // fill in maxClass
          if (maxObjKeys(surveyComp.genders.counts).indexOf(key) > -1) {
            surveyComp.genders.maxClass[key] = true;
          } else {
            surveyComp.genders.maxClass[key] = false;
          }
          // fill in minClass
          if (minObjKeys(surveyComp.genders.counts).indexOf(key) > -1) {
            surveyComp.genders.minClass[key] = true;
          } else {
            surveyComp.genders.minClass[key] = false;
          }
        }


        // convert count data into percent of total counts
        surveyComp.genders.percentages = percentagesFromObj(surveyComp.genders.counts);

        // create ng-class conditions for max and min values based on count
        // (or percentage? count is more precise than a rounded percentage, though.)

        surveyComp.maxGenders = maxObjKeys(surveyComp.genders.counts);
        surveyComp.minGenders = minObjKeys(surveyComp.genders.counts);



      });
    }

    surveyComp.vote = function(label) {
      DemographicsFactory.tallyDemographics('gender', label);
      surveyComp.updateGenders(); // update data with every vote click
    }

    // upon load, initialize by grabbing data as-is from back-end
    surveyComp.updateGenders();

    // // consider interval updating with the following:
    // surveyComp.updateInterval = setInterval(function() {
    //   surveyComp.updateGenders();
    // }, 1000);

  }

  surveyComp.$onDestroy = function() {
    clearInterval(surveyComp.updateInterval);
  }

}

SurveyCompCtrl.$inject = ['$window', 'DemographicsFactory'];
