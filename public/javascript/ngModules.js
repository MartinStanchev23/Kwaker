// var UserConstructor = require('UserService');
//module definition
var appNG = angular.module('mainContent', ['ngRoute']);

appNG.config(function ($routeProvider) {
    $routeProvider
        // .when('/', {
        //     templateUrl: 'index.html'
        // })
        .when('/', {
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
    // $http({
    //     method: "GET",
    //     url: "htm/register.htm"
    // }).then(function mySuccess(response) {
    //     console.log(response);
    //     // $scope.myusers = response.data;
    // }, function myError(response) {
    //     // $scope.myhotel = response.statusText;
    //     console.log('mne')
    // });

})

appNG.controller('register', function ($http, $scope) {
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

            if (response.data.success) {
                $location.path('/');
            } else {
                $location.path('/login');
                alert('Ivalid name or password')
            }
        });
    }
})

appNG.controller('instantSearchCtrl', function ($scope, $http) {
    $http.get('/api').then(function (data, status, headers, config) {
        $scope.items = data.data;
    },(function (data, status, headers, config) {
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

