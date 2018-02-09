app.controller('exploreController', function ($scope, $routeParams) {
    $scope.currUser = "stevie"
    
    $scope.newChallengeId = "3"
    $scope.newChallengeName = "Ath's challenge"
    $scope.newChallengeDescription = "test challenge"
    $scope.newChallengeStartDate = "01/01/2019"
    $scope.newChallengeEndDate = "01/01/2020"
    
    $scope.myChallenges = []

    $scope.viewChallengeId = $routeParams.challengeId
    
    $scope.explore = [{'id': 1, 'name': 'Ahmed\'s Challenge', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id nibh eget erat accumsan ullamcorper. Integer fringilla sem diam, et tristique elit pulvinar nec. Quisque ut pharetra velit, et tempus nulla. Nam gravida facilisis dolor non sollicitudin. Vestibulum consectetur libero sit amet dui tempus facilisis.', 'startDate': '01/11/2017', 'endDate': '01/01/2018', 'host': "moha1103"}, {'id': 2, 'name': 'Steven\'s Challenge', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id nibh eget erat accumsan ullamcorper. Integer fringilla sem diam, et tristique elit pulvinar nec. Quisque ut pharetra velit, et tempus nulla. Nam gravida facilisis dolor non sollicitudin. Vestibulum consectetur libero sit amet dui tempus facilisis.', 'startDate': '01/11/2017', 'endDate': '01/01/2018', 'host': "stevie"}]

    $scope.addChallenge = function(newChallengeId, newChallengeName, newChallengeDescription, newChallengeStartDate, newChallengeEndDate) {
        
        var newChallenge = {'id': newChallengeId, 'name': newChallengeName, 'description': newChallengeDescription, 'startDate': newChallengeStartDate, 'endDate': newChallengeEndDate, 'host': currUser}
        
        $scope.explore.push(newChallenge);
    } 
    
    $scope.getMyChallenges = function() {
        
        
    }
    
    $scope.enrollInChallenge = function(challengeId) {
        //for angular.forEach($scope.explore, function())
        
    }
    
});