appNG.controller('profilPage', function ($scope, $http, $location) {
    if (user == null) {
        user = JSON.parse(sessionStorage.getItem('user'))
        console.log(user);
    }
    if (user != null) {
        $scope.profilePicture = user.url;
        $scope.firstname = user.firstname;
        $scope.lastname = user.lastname;        
        $scope.kwaks = user.posts.length;
        $scope.numberOfFollowing = user.following.length
        $scope.numberOfFollowers = user.followers.length;
        $scope.likes = user.likes.length;
    }
    var userPosts = JSON.parse(sessionStorage.getItem('user')).posts;
    console.log(userPosts);
    $scope.posts = userPosts;
});