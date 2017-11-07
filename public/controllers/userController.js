appNG.controller('userPage', function ($scope, $http, $location) {
    person = JSON.parse(sessionStorage.getItem('person'))

    $scope.profilePicture = person.url;
    $scope.firstname = person.firstname;
    $scope.lastname = person.lastname;
    $scope.kwaks = person.posts.length;
    $scope.numberOfFollowing = person.following.length
    $scope.numberOfFollowers = person.followers.length;
    $scope.likes = person.likes.length;

    var userPosts = JSON.parse(sessionStorage.getItem('person')).posts;
    console.log(userPosts);
    $scope.posts = userPosts;
});