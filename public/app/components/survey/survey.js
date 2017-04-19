angular.module('App')
.component('surveyComp', {
  templateUrl: 'app/components/survey/survey.html',
  controller: SurveyCompCtrl,
  controllerAs: 'surveyComp'
});

function SurveyCompCtrl($window, DemographicsFactory){
  var surveyComp = this;

  function sumObj(obj) {
    return Object.values(obj).reduce(function(a, b) { return a + b; });
  }

  function minObjValue(obj) { // given an object list of keys with number values, find the min value
    return Object.values(obj).reduce(function(a, b) { return a < b ? a : b; });
  }

  function minObjKeys(obj) { // given an object list of keys with number values, find the min keys
    return Object.keys(obj).filter(function(key) { return obj[key] === minObjValue(obj); });
  }

  function maxObjValue(obj) { // given an object list of keys with number values, find the max value
    return Object.values(obj).reduce(function(a, b) { return a > b ? a : b; });
  }

  function maxObjKeys(obj) { // given an object list of keys with number values, find the max keys
    return Object.keys(obj).filter(function(key) { return obj[key] === maxObjValue(obj); });
  }

  // grab data as-is upon load
  DemographicsFactory.getDemographics('gender').then(function(results) {
    surveyComp.genderRawData = results.types;
    surveyComp.genderPercentages = {};
    console.log(surveyComp.genderRawData);

    // console.log(Object.values(surveyComp.genderRawData).reduce(function(a, b) { return a+b; }))
    var obj = { one: 2, two: 3, three: 1, four: 3, five: 1 };

    console.log(minObjKeys(obj));
    console.log(maxObjKeys(obj));

    surveyComp.vote = function(type) {
      console.log(type);
      DemographicsFactory.tallyDemographics('gender', type);
    }

    // // for IE < 9:
    // function sumObj( obj ) {
    //   var sum = 0;
    //   for( var el in obj ) {
    //     if( obj.hasOwnProperty( el ) ) {
    //       sum += parseFloat( obj[el] );
    //     }
    //   }
    //   return sum;
    // }

    var genderTotal = sumObj(surveyComp.genderRawData);

    if (genderTotal > 0) {
      for (var key in surveyComp.genderRawData) {
        surveyComp.genderPercentages[key] = Math.round(surveyComp.genders[key] / genderTotal) * 100;
      }
    } else { // else we don't want to divide by zero
      for (var key in surveyComp.genderRawData) {
        surveyComp.genderPercentages[key] = 0;
      }
    }
    console.log(surveyComp.genderPercentages)

  });

}

SurveyCompCtrl.$inject = ['$window', 'DemographicsFactory'];
