var app = angular.module('my-company', []);
app.controller('companyCtrl', function($scope){
  $scope.submit = function(){
    var data = $.param({
      company: JSON.stringify({
        name: $scope.name,
        vat: $scope.vat,
        address: $scope.address
      })
    });


  }
});
