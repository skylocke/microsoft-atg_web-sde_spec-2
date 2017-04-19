angular.module('App')
.factory('DemographicsFactory', ['$http', '$window', function($http, $window){
  return {
    getDemographics: function(category) {
      if (!category) {
        category = '';
      }

      var req = {
        url: '/api/demographics/' + category,
        method: 'GET'
      }

      return $http(req).then(function success(res) {
        if(res.status !== 200) {
          console.log('didnt work', res.data.message);
          return false;
        }
        return res.data;
      }, function error(res) {
        console.log('error response:', res);
      });;
    },

    tallyDemographics: function(category, label) {
      var req = {
        url: '/api/demographics/' + category,
        method: 'PUT',
        data: { label: label }
      }

      return $http(req).then(function success(res) {
        if(res.status !== 200) {
          console.log('didnt work', res.data.message);
          return false;
        }
        return res.data;
      }, function error(res) {
        console.log('error response:', res);
      });
    }

  }
}]);
