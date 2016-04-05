slackclone.controller('primarycontroller', function ($rootScope, $scope, $state, $ionicPlatform, $cordovaContacts) {
  $rootScope.navState = {
    groups : "active",
    lists : null,
    search : null
  };

  $rootScope.favoriteList = [];

  $scope.changeState = function() {
    var currentState = event.currentTarget.className.split(" ");
    if(!currentState[2] !== 'active') {
      var curKey = currentState[1];
      for(var key in $scope.navState) {
        if(key === curKey) {
          $rootScope.navState[curKey] = 'active';
          
        }
        else{
          $rootScope.navState[key] = null;
        }
      }
    }
  };
});