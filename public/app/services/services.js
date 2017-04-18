angular.module('App')
.factory('DemographicsFactory', ['$http', function($http){
  return {
    getGenders: function() {
      var req = {
        url: '/api/genders',
        method: 'GET'
      }

      return $http(req);
    },

    tallyGender: function(gender) {
      var req = {
        url: '/api/genders',
        method: 'PUT'
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
