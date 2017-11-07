appNG.controller('message', function ($scope, $http, $location) {
    $scope.viewMessages = function () {
        var activeUserName = JSON.parse(sessionStorage.getItem('user')).username;

        $http.get('/api/messages').then(function (data, status, headers, config) {
            var arr = data.data;
            console.log(arr);
            var result = arr.filter(function (x) {
                if (x.usernameR == activeUserName) {
                    return x;
                }
            })
            console.log(result);
            $scope.result = result;
        })
        $scope.showReplyForm = false;
        $scope.sendReply = function (user, index) {

        }
        var la;
        $scope.showReply = function (index) {
            la = index;
            $scope.showReplyForm = false;
        }
        
        $scope.hideReply = function (index) {
            la = index;
            $scope.showReplyForm = true;
        }
    }
    $scope.submitMessageReply = function(r){
        console.log(r);
        var activeUserName = JSON.parse(sessionStorage.getItem('user')).username;        
        $http.post('/messages', JSON.stringify({
            usernameR: r.usernameS, usernameS: activeUserName,
            text: $scope.messageReply
        })).then(function (response) {
            console.log(response.data)
        });
    }
});