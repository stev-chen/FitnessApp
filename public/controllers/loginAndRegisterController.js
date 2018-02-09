app.controller('loginAndRegisterController', function ($scope, usersService, $location, $interval, $timeout) {
    function init() {
        $scope.loginErrorMessage = "";
    }
    $scope.loggedIn = usersService.isLoggedIn();
    $scope.message = "";

    $scope.currentUser = usersService.getCurrUser();
    
    $scope.login = function(username, passwrd) {
        var result = usersService.checkLogin(username, passwrd); 
        if (result == 0) { 
            usersService.setCurrUser(username);
            $scope.loggedIn = usersService.isLoggedIn();
            $scope.changeView("profile/"+username); //redirects to profile on successful login
            //$scope.loginErrorMessage = "Successful login.";
            
        } else if (result == 1) { 
            $scope.loginErrorMessage = "Incorrect password.";
        } else { 
            $scope.loginErrorMessage = "User does not exist."
        }
        console.log($scope.loginErrorMessage);
        console.log(usersService.getCurrUser());
        updateCurrentUser();
        console.log($scope.currentUser);
    } 
    
    $scope.register = function(username, passwrd, about, hobbies) {
        var exists = usersService.checkUserExistence(username);
        console.log(exists)
        if (exists == 0) { 
            $scope.loginErrorMessage = "This username is already taken, please try again";
        } else {
            usersService.add({'username': username, 'passwrd': passwrd, 'about': about, 'hobbies': hobbies}, 
                            $scope.login);
            //$scope.login(username, passwrd);
            //$scope.loginErrorMessage = "Successfully registered!";
        }
    } 
    
    $scope.logout = function() { 
        usersService.setCurrUser("");  
        updateCurrentUser();
        $scope.loggedIn = usersService.isLoggedIn();
         $scope.changeView(""); //redirects to profile on successful login
    }
    
    function resetLoginErrorMessage() {
        $scope.loginErrorMessage = "";
    }
    
    $scope.getCurrentUser = function() {
        return usersService.getCurrUser();
    }
    	
    function updateCurrentUser() {
        $scope.currentUser = usersService.getCurrUser(); 
    }
    
    $scope.changeView = function(view){
		
        $location.path(view);
    }
    $scope.deleteUser = function(){
        usersService.remove($scope.currentUser, $scope.logout);
    }
    $scope.getMessages = function(){
        $scope.message =  usersService.getMessages($scope.getCurrentUser());
    }
	
	$scope.getMessagesInterval = function() {
		$timeout(function() {
			$scope.getMessages();
			$scope.getMessagesInterval();
		}, 5000)
	}
    init();
    var pull = $scope.getMessagesInterval();
	$scope.$on('$destroy', function(){
		$timeout.cancel(pull);
	});
});