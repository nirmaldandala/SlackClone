// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var slackclone = angular.module('slackclone', ['ionic', 'firebase', 'ui.router', 'ngCordova', 'ngStorage', 'angular-md5']);

slackclone.constant('FirebaseUrl', 'https://torrid-fire-916.firebaseio.com/users');

slackclone.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
      url: '/',
      controller: 'AuthCtrl as authCtrl',
      templateUrl: 'views/login.html',
      resolve: {
        requireNoAuth: function($state, Auth){
          return Auth.$requireAuth().then(function(auth){
            $state.go('home');
          }, function(error){
            return;
          });
        }
      }
    })
    $stateProvider.state('register', {
      url: '/register',
      controller: 'AuthCtrl as authCtrl',
      templateUrl: 'views/register.html',
      resolve: {
        requireNoAuth: function($state, Auth){
          return Auth.$requireAuth().then(function(auth){
            $state.go('profile');
          }, function(error){
            return;
          });
        }
      }
    })
    $stateProvider.state('profile', {
      url: '/profile',
      controller: 'ProfileCtrl as profileCtrl',
      templateUrl: 'views/profile.html',
      resolve: {
        auth: function($state, Users, Auth){
          return Auth.$requireAuth().catch(function(){
            $state.go('profile');
          });
        },
        profile: function(Users, Auth){
          return Auth.$requireAuth().then(function(auth){
            return Users.getProfile(auth.uid).$loaded();
          });
        }
      }
    })
     $stateProvider.state('search', {
      url: '/search',
      controller: 'SearchCtrl as searchCtrl',
      templateUrl: 'views/search.html',
    })
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
    })
    $stateProvider.state('moviecard', {
      url: '/moviecard',
      controller: 'SearchCtrl as searchCtrl',
      templateUrl: 'views/moviecard.html',
    })
    $stateProvider.state('lists', {
      url: '/lists',
      controller: 'ListCtrl as listCtrl',
      templateUrl: 'views/lists.html',
    })
    $urlRouterProvider.otherwise('/');
});