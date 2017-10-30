
//module definition
var appNG = angular.module('mainContent', ['ngRoute']);


appNG.config(function ($routeProvider) {
    $routeProvider
        // .when('/', {
        //     templateUrl: 'index.html'
        // })
        .when('/home', {
            templateUrl: 'htm/home.htm',
            // controller: 'home'
        })
        .when('/login', {
            templateUrl: 'htm/login.htm'
        })
        .when('/register', {
            templateUrl: 'htm/register.htm'
        })
})
appNG.controller('home', function ($scope, $http) {
    console.log('zaredi homeController')
    $scope.profilePicture = 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-camera-128.png'
    $scope.username = 'Zarina'
    $scope.numberOfKwaks = 0
    $scope.numberOfFollowing = 92
    $scope.numberOfFollowers = 5

    $scope.group1 = '#group'
    $scope.group2 = '#group'
    $scope.group3 = '#group'
    $scope.group4 = '#group'
    $scope.group5 = '#group'

    $http({
        method: "GET",
        url: "htm/home.htm"
    }).then(function mySuccess(response) {
        console.log(response);
        // $scope.myusers = response.data;
    }, function myError(response) {
        // $scope.myhotel = response.statusText;
        console.log('mne')
    });
    $http({
        method: "GET",
        url: "htm/register.htm"
    }).then(function mySuccess(response) {
        console.log(response);
        // $scope.myusers = response.data;
    }, function myError(response) {
        // $scope.myhotel = response.statusText;
        console.log('mne')
    });

})

appNG.controller('register', function ($http, $scope) {
    $('#firstName').value;
    $('#lastName').value;
    $('#username').value;
    $('#email').value;
    $('#phone').value;
    $('#password').value;

    $http({
        method: "POST",
        url: "htm/register.htm"
    }).then(function mySuccess(response) {
        console.log(response);
        // $scope.myusers = response.data;
    }, function myError(response) {
        // $scope.myhotel = response.statusText;
        console.log('mne')
    });
})

