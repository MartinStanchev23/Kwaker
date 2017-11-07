// var UserConstructor = require('UserService');
//module definition
var appNG = angular.module('mainContent', ['ngRoute']);
var user = null;
appNG.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'htm/home.htm',
            // controller: 'homeController'
        })
        .when('/login', {
            templateUrl: 'htm/login.htm'
        })
        .when('/register', {
            templateUrl: 'htm/register.htm'
        })
        .when('/profile', {
            templateUrl: 'htm/profile.htm'
        })
        .when('/user', {
            templateUrl: 'htm/user.htm'
        })
})


appNG.controller('register', function ($http, $scope, $location) {
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.username = '';
    $scope.phone = '';
    $scope.email = '';
    $scope.password = '';


    $scope.submitReg = function () {
        $http.post('/users', JSON.stringify({
            firstname: $scope.firstname, lastname: $scope.lastname,
            username: $scope.username, phone: $scope.phone, email: $scope.email, password: $scope.password,
        })).then(function (response) {
            console.log(response.data)
            $location.path('/login')
        });
    }
  
});

appNG.controller('login', function ($http, $scope, $location) {
    $scope.email = '';
    $scope.password = '';

    $scope.submitLogin = function () {

        // validation email and passs
        $http.post('/login', JSON.stringify({
            email: $scope.email, password: $scope.password
        })).then(function (response) {

            if (response.data.success == false) {
                $location.path('/login');
                alert('Ivalid name or password')
            } else {
                user = response.data;
                $location.path('/');
                sessionStorage.setItem('user', JSON.stringify(user));
            }
        });
    }
})


appNG.controller('instantSearchCtrl', function ($scope, $http) {
    $http.get('/api').then(function (data, status, headers, config) {
        $scope.items = data.data;
    }, (function (data, status, headers, config) {
        console.log("No data found..");
    }));
});


appNG.filter('searchFor', function () {
    return function (arr, searchString) {
        if (!searchString) {
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        console.log(arr);
        angular.forEach(arr, function (item) {
            if (item.username.toLowerCase().indexOf(searchString) !== -1) {
                result.push(item);
            }
        });
        return result;
    };
});

appNG.controller('newKwak', function ($scope, $http) {
    var usernameReq = JSON.parse(sessionStorage.getItem('user')).username;
    var usernameId = JSON.parse(sessionStorage.getItem('user'))._id;
    var url = JSON.parse(sessionStorage.getItem('user')).url;

    $scope.text = '';
    $scope.image = '';
    $scope.video = '';
    $scope.submitKwak = function () {
        $http.post('/posts', JSON.stringify({
            text: $scope.text, image: $scope.image,
            video: $scope.video, data: $scope.data, username: usernameReq, usernameId: usernameId, url: url
        })).then(function (response) {
            console.log(response.data);
            (function () {
                location.reload();
            })();
        });

    }
})

appNG.controller('homeButtons', function($scope, $location){
    $scope.homeBtn = function(){
        $location.path('/');
        sessionStorage.removeItem('person');
    }
})