app.controller('profileController', function ($scope, challengesService, usersService, $location, $routeParams) {
    
    function init() {
        
    }
    
    $scope.getUserProfile = function(username) {
        return usersService.getUserProfile(username);
    }
    
    $scope.getCurrUserProfile = function() {
        return usersService.getUserProfile(usersService.getCurrUser());
    }
    
    $scope.getUserProfileOfUser = function(username) { 
        console.log("OF CALLED")
        return usersService.getUserProfile(username);
    }
    
       $scope.getUsernameFromURL = function() { 
        return $routeParams.username;
    }
    
    $scope.getChallengesForUser = function() {
        console.log(challengesService.getChallengesForUser($scope.getUsernameFromURL()));
        return challengesService.getChallengesForUser($scope.getUsernameFromURL());    
    }
    
    
   $scope.withdrawFromChallenge = function(challengeName, username) {
       console.log("withdrawing from challenge: " + challengeName + "  " + username);
        console.log("1");
       if (challengesService.isEnrolled(challengeName, username)) { 
           console.log("2");
           challengesService.withdraw(challengeName, username);
       }
       if (challengesService.getEnrolledCount(challengeName) == 0) { 
            console.log("3");
            console.log("this challenge has: " + challengesService.getEnrolledCount(challengeName));
            challengesService.deleteChallenge(challengeName) ;
       }
    }
   
    $scope.deleteChallenge = function(challengeName){
        challengesService.deleteChallenge(challengeName, $scope.getChallengesForUser);
    }
   
    $scope.goToProfile = function(username) { 
        $scope.changeView("/profile/"+username)
    
    }
    $scope.getCurrentUser = function() {
        return usersService.getCurrUser();
    }
       

    $scope.changeView = function(view){
        $location.path(view);
    }
    
    $scope.usersMatch = function(user1, user2) { 
        if ((user1.localeCompare(user2)) == 0) { 
            return true;
        }
        return false;
    }
    
    init();
});