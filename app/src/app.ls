angular.module \socialfight, <[angular-gestures ngCookies ngResource ngSanitize ui.router ngStorage]>  
.config <[$locationProvider $stateProvider $urlRouterProvider]> ++ ($locationProvider, $stateProvider, $urlRouterProvider) !->
  $locationProvider.html5Mode true
  $locationProvider.hashPrefix \!
  
  $urlRouterProvider.otherwise \/index
  $stateProvider
    .state \index ,
      url: \/index
      templateUrl: \/views/index.html
      controller: \mainCtrl
      # resolve: 
      #   pdata: ($http) ->
      #     $http.get 'http://localhost:3000/irc/news'

    # .state \mainMap,
    #   url: \/mainMap
    #   templateUrl: \/views/main/index.html
    #   controller: \mainMapCtrl
    # .state \regist_lawer, 
    #   url: \/regist/lawer
    #   templateUrl: \/views/regist/law.html
    #   controller: \lawerRegistCtrl
    # .state \regist_user, 
    #   url: \/regist/user
    #   templateUrl: \/views/regist/law.html
    #   controller: \userRegistCtrl
    # .state \grade_lawer, 
    #   url: \/grade/user
    #   templateUrl: \/views/grade/lawer.html
    #   controller: \lawerGradeCtrl
    