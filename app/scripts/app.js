angular.module('socialfight', ['angular-gestures', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ngStorage']).config(['$locationProvider', '$stateProvider', '$urlRouterProvider'].concat(function($locationProvider, $stateProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  $urlRouterProvider.otherwise('/index');
  $stateProvider.state('index', {
    url: '/index',
    templateUrl: '/views/index.html',
    controller: 'mainCtrl'
  });
}));