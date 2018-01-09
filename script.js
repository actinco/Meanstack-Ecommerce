// Code goes here

var app = angular.module("shoppingCart" , ["ngRoute",'ui.bootstrap','ngFileUpload','ngCookies'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/main' , {
    templateUrl : 'main.html',
    controller: 'MainCtrl'
  })
  .when('/services' , {
    templateUrl : 'services.html',
    controller: 'ServicesCtrl'
  })
  .when('/about' , {
    templateUrl : 'about.html',
    controller: 'AboutCtrl'
  })
  .when('/contact' , {
    templateUrl : 'contact.html',
    controller: 'ContactCtrl'
  })
  .otherwise({redirectTo : '/main'})
}])

.controller('ServicesCtrl', ['$scope', '$http','CommonProp', '$uibModal' , function($scope , $http, CommonProp, $uibModal){
  var vm = this;




  // $http.get('list.json').then(function(response){
  //   // $scope.services = response.data;
  //   $scope.shopData=response.data;
  // });
  // $scope.total= function(){
  //   var t=0;
  //
  //   for (var k in $scope.shopData) {
  //     t += parseInt($scope.shopData[k].selected);
  //   }
  //   CommonProp.setTotal(t);
  //   return t;
  // }
  // $scope.$watch('shopData', function(){
  //   CommonProp.setItems($scope.shopData);
  // })
  $http.get('/services').then(function(response) {
      $scope.products = response.data;
});
}])

.controller('AboutCtrl', ['$scope', 'CommonProp', function($scope, CommonProp){
  console.log('This is the about ctrl');
  $scope.selectedItems = CommonProp.getItems();
  $scope.checkoutTotal = CommonProp.getTotal();
}])

.controller('MainCtrl', ['$scope', function($scope){
  console.log('This is the main ctrl');
}])
.controller('ContactCtrl', ['$scope','$timeout','$http','Upload', function($scope,$timeout,$http,Upload){
  console.log('This is the File Uploading ctrl');
    var vm = this;
    $scope.showProd = function () {
      console.log($scope.product);
    };
  $scope.upload = function (dataUrl) {

      Upload.upload({
        url: '/profile',
        data: {
          newProfilePicture: dataUrl,
          name: $scope.product.name,
          price: $scope.product.price
        }
      }).then(function (response) {
        $timeout(function () {
          onSuccessItem(response.data);
        });
      }, function (response) {
        if (response.status > 0) onErrorItem(response.data);
      }, function (evt) {
        vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
      });
    };

    function onSuccessItem(response) {
      // Show success message
      // a.success({ message: '<i class="glyphicon glyphicon-ok"></i> Successfully changed profile picture' });
      $scope.ShowAlert = function () {
               // if (typeof ($scope.Name) == "undefined" || $scope.Name == "") {
                    $window.alert("Successfully added picture");
               //     return;
               }
      // Populate user object
      // vm.user = Authentication.user = response;

      // Reset form
      // vm.fileSelected = false;
      // vm.progress = 0;
    }
    function onErrorItem(response) {
      $scope.ShowAlert = function () {
               // if (typeof ($scope.Name) == "undefined" || $scope.Name == "") {
                    $window.alert("Error");
               //     return;
               }
    }


  $scope.save = function () {

    $http.post('/profile', $scope.product)
    .then(function(response) {
      if(response.err){
                  console.log('Error: ' + response.err);
                } else {
                  console.log('Saved '+response);
                }
      $scope.product = response.data;
    })
  };



}])

// .controller('AddCtrl', ['$scope','$http','Upload', function($scope, $http, Upload){
//   console.log('This is the Add Button ctrl');
//   var vm = this;
//   //
//   //
//   //  vm.user = Authentication.user;
//     vm.progress = 0;
//   //
//    vm.upload = function (dataUrl) {
//   //
//       Upload.upload({
//        url: '/api/users/picture',
//         data: {
//           newProfilePicture: dataUrl
//         }
//       }).then(function (response) {
//         $timeout(function () {
//           onSuccessItem(response.data);
//         });
//       }, function (response) {
//         if (response.status > 0) onErrorItem(response.data);
//       }, function (evt) {
//         vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
//       });
//     };
//   //
//   //  // Called after the user has successfully uploaded a new picture
//     function onSuccessItem(response) {
//      // Show success message
//      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Successfully changed profile picture' });
//   //
//   //    // Populate user object
//       vm.user = Authentication.user = response;
//   //
//   //    // Reset form
//       vm.fileSelected = false;
//      vm.progress = 0;
//     }
//   //
//   //  // Called after the user has failed to upload a new picture
//   function onErrorItem(response) {
//      vm.fileSelected = false;
//       vm.progress = 0;
//   //
//   //    // Show error message
//       Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> Failed to change profile picture' });
//     }
// }])

.directive('checkList', function(){
  return{
    resrtict:'E',
    scope:{
      option: '=',
      name:'=',
      selected:'='
    },
    template:function(elem, attr){
      return'<div class="panel-body">\
                <div class="radio" ng-repeat="i in option">\
                    <label><input type="radio" name="{{name}}" ng-value="{{i.price}}" ng-model="$parent.selected">{{i.price}}</label>\
                </div>\
             </div>'
    }
  };
})
.service('CommonProp', function(){
  var items='';
  var Total=0;
  return{
    getItems: function(){
      return items;
    },
    setItems: function(value){
      items= value;
    },
    getTotal: function(){
      return Total;
    },
    setTotal: function(value){
      Total= value;
    }
  }
})
