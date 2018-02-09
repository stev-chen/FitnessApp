var app = angular.module("FitnessApp", ['ngRoute'])

app.config(function ($routeProvider) {

    $routeProvider
        .when('/explore', {
            controller: 'challengeController',
            templateUrl: './partials/explore.html'
        })
        .when('/profile/:username', {
            controller: 'profileController',
            templateUrl: './partials/profile.html'
        })
        .when('/about', {
            templateUrl: './partials/about.html'
        })
        .when('/login', {
            controller: 'loginAndRegisterController',
            templateUrl: './partials/login.html'
        })
        .when('/register', {
            controller: 'loginAndRegisterController',
            templateUrl: './partials/register.html'
        })
        .when('/challenge/:challengeId', {
            controller: 'challengeController',
            templateUrl: './partials/challengeDescription.html'
        })
        .when('/newChallenge', {
            controller: 'challengeController',
            templateUrl: './partials/newChallenge.html'
        })
        .when('/successPage', {
            templateUrl: './partials/successPage.html'
        })
    
        .when('/updateProgress/:challengeId', {
            controller: 'challengeController',
            templateUrl: './partials/updateProgress.html'
        })
        .when('/calorieCalculator', {
            controller: 'calCalculatorController',
            templateUrl: './partials/calorieCalculator.html'
        })
        .when('/message', {
            controller: 'loginAndRegisterController',
            templateUrl: './partials/message.html'
        })
        .otherwise({redirectTo: '/about'});
});

