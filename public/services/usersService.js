app.service('usersService', function($http){
    
    var self = this;
    users = []; 
    var newMessage = {};

    currUser = "";
    
    //CHANGE TO POST
    self.add = function(user, callback) { 
        //users.push(user);
        var url = "http://localhost:8080/api/users";
        $http.post(url, user)
        .then(
        function(response){
         // success callback
            console.log("Success")
            callback(user.username, user.passwrd)
        }, 
        function(response){
         // failure callback
            console.log("Failure")
        }
        );
    }
    //CHANGE TO DELETE
    self.remove = function(user, callback) { 
        var url = "http://localhost:8080/api/users/"+user;
        console.log(url)
        $http.delete(url)
            .then(
                function(response){
                    // success callback
                    console.log("DELETED CHALLENGE");
                    //UPDATE CHALLENGES ARRAY
                    ////////////////////////////////////////////
                    //Synchronous Get request to server
                    var url = "http://localhost:8080/api/users";
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, false);
                    xhr.send(null)
                    users = JSON.parse(xhr.responseText);
                    ////////////////////////////////////////////
                    callback()
                }, 
                function(response){
                    // failure call back
                }
        );
    }
    
    self.checkLogin = function(username, passwrd) { 
        ////////////////////////////////////////////
        //Synchronous Get request to server
        var url = "http://localhost:8080/api/users";
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null)
        console.log("HTTP GET CHECK USERS EXISTENCE")
        users = JSON.parse(xhr.responseText);
        //////////////////////////////////////////////
        console.log(users)
         for (i = 0; i < users.length; i++) { 
            console.log(i)
            if (users[i].username.localeCompare(username) == 0) { 
                if (users[i].passwrd.localeCompare(passwrd) == 0) { 
                    return 0;
                } else {
                    return 1;
                }
            }
        } 
        return -1;
    }
    
    self.checkUserExistence = function(username) { 
        ////////////////////////////////////////////
        //Synchronous Get request to server
        var url = "http://localhost:8080/api/users";
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null)
        console.log("HTTP GET CHECK USERS EXISTENCE")
        users = JSON.parse(xhr.responseText);
        //////////////////////////////////////////////
        for (i = 0; i < users.length; i++) { 
            if (users[i].username.localeCompare(username) == 0) { 
               return 0;
            }
        } 
        return -1;
    }
    
    self.getCurrUser = function() { 
        return currUser;
    }

    self.isLoggedIn = function() {
        if (currUser == ""){
            return false;
        }
        else{
            return true;
        }
    }
    
    self.setCurrUser = function(username) {
          currUser = username; 
    }
    
     self.getUserProfile = function(username) { 
        ////////////////////////////////////////////
        //Synchronous Get request to server
        var url = "http://localhost:8080/api/users";
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null)
        console.log("HTTP GET CHECK USERS PROFILE")
        users = JSON.parse(xhr.responseText);
        //////////////////////////////////////////////
        for (i = 0; i < users.length; i++) {
            if (users[i].username.localeCompare(username) == 0) {
                return users[i];
            }
        }
    }
     self.getMessages = function(user){
        ////////////////////////////////////////////
        //Synchronous Get request to server
        var url = "http://localhost:8080/api/messages";
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null)
        console.log("HTTP GET MESSAGES ")
        messages = JSON.parse(xhr.responseText);
        console.log(messages)
        //////////////////////////////////////////////
        if (messages.length > 0){
            newMessage = messages[messages.length-1];
            return newMessage
        }
     }
     
});

