appNG.controller('message', function ($scope, $http, $location) {
    $scope.viewMessages = function () {
        var activeUserName = JSON.parse(sessionStorage.getItem('user')).username;
        
        $http.get('/api/messages').then(function (data, status, headers, config) {
            var arr = data.data;
            console.log(arr);
            var result = arr.filter(function(x){
                if(x.usernameR == activeUserName){
                    return x;
                }
            })
            console.log(result);
            $scope.result = result;
        })
        $scope.sendReply = function(usernameS){
            console.log(usernameS);
        }
    }
});