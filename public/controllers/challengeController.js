app.controller('challengeController', function ($scope, challengesService, usersService, $routeParams, $location) {
        
    function init() {
        $scope.myChallenges = [];
        $scope.progressBarStyle = {};
    }
    
    $scope.getChallenges = function() {
      return  challengesService.getChallenges();      
    }
    
    $scope.addChallenge = function(newChallengeId, newChallengeName, newChallengeDescription, newChallengeStartDate, newChallengeEndDate, goal, type, newChallengeHost) {
            
            var newChallenge = {'id': newChallengeId, 'name': newChallengeName, 'description': newChallengeDescription, 'startDate': newChallengeStartDate, 'endDate': newChallengeEndDate, 'goal': goal, 'type': type, 'host': newChallengeHost, 'enrolled': [{'username': newChallengeHost, 'progress': 0}]};
            
            console.log(newChallenge);
            challengesService.add(newChallenge, function(){
                $scope.getChallenges();
                $location.path("/successPage");
            });
    } 
    
   
    $scope.enrollInChallenge = function(challengeName, username) {
        console.log("running enrollInChallenge");
        if (challengesService.isEnrolled(challengeName, username) == false) {
             console.log("joining challenge: " + challengeName + "   " + username);
            challengesService.enroll(challengeName, username, $scope.getChallenges);   
        }
    }
    
   $scope.withdrawFromChallenge = function(challengeName, username) {
       console.log("withdrawing from challenge: " + challengeName + "  " + username);
        console.log("1");
       if (challengesService.isEnrolled(challengeName, username)) { 
           console.log("2");
           challengesService.withdraw(challengeName, username, $scope.getChallenges);
       }
       if (challengesService.getEnrolledCount(challengeName) == 0) { 
            console.log("3");
            console.log("this challenge has: " + challengesService.getEnrolledCount(challengeName));
            challengesService.deleteChallenge(challengeName,$scope.getChallenges) ;
       }
    }
     
    function updateMyChallenges(){
        $scope.myChallenges = challengesService.getChallengesForUser($scope.currUser);
    }
    
    function remove(array, index) {    
        array.splice(index, 1);
    }
    
    $scope.getCurrentUser = function() {
        return usersService.getCurrUser();
    }
    
    $scope.getChallengeIdFromURL = function() { 
        return $routeParams.challengeId;
    }
    
    $scope.getChallengeDetails = function(id) { 
        console.log(id)
        var index = challengesService.findChallenge(id);
        return challengesService.getChallenges()[index];
    }
    
    $scope.setProgressBarStyle = function(value) { 
        $scope.progressBarStyle = {width: value + '%'};
    } 
     
    $scope.updateProgress = function(username, challengeName, amount) { 
        console.log(challengeName);
        console.log(username);
        console.log(amount);
        var details = $scope.getChallengeDetails(challengeName);
        var progressAddition = (Math.round(amount/details.goal * 100)/100)*100;
        console.log(progressAddition)
        
        for (i = 0; i < details.enrolled.length; i++) { 
            if (details.enrolled[i].username == username) { 
                var progress = Math.min(details.enrolled[i].progress + progressAddition, 100);
                console.log("calling updateProgress!");
                challengesService.updateChallenge(challengeName, username, progress, $scope.changeView)//redirects on successful update);
                break;
            }
        }
        //$scope.changeView("/challenge/"+challengeId); //redirects on successful update
        
    }
    
    $scope.changeView = function(view){
        $location.path(view);
    }
    
    init();
});