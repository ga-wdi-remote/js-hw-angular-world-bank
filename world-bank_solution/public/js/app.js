(function(){
  var app = angular.module('worldbank', [])
  .controller('mainController', ['$http', function($http) {
    // freeze the scope: self now refers to this level of scope
    var self = this;

    var initialize = function() {
      this.formdata = {};

      // http/ajax call to get number of records in db
      $http({ method: 'GET', url: '/wbinfo/count'}).then(function(response) {
        // set up number of records
        self.numberOfRecords = response.data;
      });

      // http/ajax call to get unique regions for click-display
      $http({ method: 'GET', url: '/wbinfo/uniqueRegions'}).then(function(response) {
        // set up array of unique regions
        self.regionList = response.data;
      });
    }

    initialize();

    // function activated by click event
    // retrieve all records by region
    this.getByRegion = function(region) {

      $http({
        method: 'GET',
        url: '/wbinfo/byName/' + region
      }).then(function(response) {

        // set up array of regions with data
        self.infoList = response.data;

      }); // end http
    }; // end getByRegion


    this.processForm = function() {
      $http({
        method  : 'POST',
        url     : '/wbinfo',
        data    : this.formdata
     }).then(function(data) {

        initialize();

     });
    }; // end processForm

  }]); // end mainController
})();
