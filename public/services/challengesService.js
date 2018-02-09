app.service('challengesService', function($http){
    
    var self = this;
    ////////////////////////////////////////////
    //Synchronous Get request to server
    var url = "http://localhost:8080/api/challenges";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null)
    console.log("HTTP GET CHALLENGES")
    var challenges = JSON.parse(xhr.responseText);
    ////////////////////////////////////////////
      
    
    
    self.getChallenges = function() {
        return challenges;
    }
    //POST
    self.add = function(challenge, callback) { 
        //challenges.push(challenge);
        var url = "http://localhost:8080/api/challenges";
        $http.post(url, challenge)
        .then(
        function(response){
         // success callback
            console.log("Success")
            //UPDATE CHALLENGES ARRAY
            ////////////////////////////////////////////
            //Synchronous Get request to server
            var url = "http://localhost:8080/api/challenges";
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send(null)
            console.log("HTTP GET CHALLENGES")
            challenges = JSON.parse(xhr.responseText);
            ////////////////////////////////////////////
            callback()
        }, 
        function(response){
         // failure callback
            console.log("Failure")
        }
        );
    }
    
    self.findChallenge = function(challengeName) {
        challenges = self.getChallenges()
        for (i = 0; i < challenges.length; i++) { 
            if (challenges[i].name == challengeName) { 
                return i;
            }
        }
        return -1;
    }
    //DELETE
    self.remove = function(index) { 
        challenges.splice(index, 1);
    }
    //DELETE
    self.removeChallenge = function(challengeId) {
       var index = self.findChallenge(challengeId);
       if (index >= 0) { 
           self.remove(index);
       }
    }
    //DELETE
    self.removeUser = function(userList, index) { 
        userList.splice(index,1);
    }
    //UPDATE
    self.enroll = function(challengeName, username, callback) {
        /*var challengeIndex = self.findChallenge(challengeName);
        
        if(challengeIndex >= 0) {
            challenges[challengeIndex].enrolled.push({'name': username, 'progress': 0});
        }*/
        var url = "http://localhost:8080/api/joinChallenge";
        var data = {'name': challengeName, 'username': username };
        $http.put(url, data)
            .success(function (data, status, headers, config) {
                console.log("PUT SUCCESS")
                //UPDATE CHALLENGES ARRAY
                ////////////////////////////////////////////
                //Synchronous Get request to server
                var url = "http://localhost:8080/api/challenges";
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                xhr.send(null)
                console.log("HTTP GET CHALLENGES")
                challenges = JSON.parse(xhr.responseText);
                ////////////////////////////////////////////
                callback()
            })
            .error(function (data, status, header, config) {
            });
    }
    //DELETE
    self.withdraw = function(challengeName, username) {
        console.log("Hello")
        var url = "http://localhost:8080/api/withdrawFromChallenge";
        var data = {'name': challengeName, 'username': username };
        $http.put(url, data)
            .success(function (data, status, headers, config) {
                console.log("WITHDRAW SUCCESS")
                //UPDATE CHALLENGES ARRAY
                ////////////////////////////////////////////
                //Synchronous Get request to server
                var url = "http://localhost:8080/api/challenges";
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                xhr.send(null)
                console.log("HTTP GET CHALLENGES")
                challenges = JSON.parse(xhr.responseText);
                ////////////////////////////////////////////
            })
            .error(function (data, status, header, config) {
            });
        
    }
    self.deleteChallenge = function(challengeName, callback){
        var url = "http://localhost:8080/api/challenges/"+challengeName;
        $http.delete(url)
            .then(
                function(response){
                    // success callback
                    console.log("JOINED CHALLENGE");
                    //UPDATE CHALLENGES ARRAY
                    ////////////////////////////////////////////
                    //Synchronous Get request to server
                    var url = "http://localhost:8080/api/challenges";
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, false);
                    xhr.send(null)
                    console.log("HTTP GET CHALLENGES")
                    challenges = JSON.parse(xhr.responseText);
                    ////////////////////////////////////////////
                    callback()
                }, 
                function(response){
                    // failure call back
                }
        );
    }

    self.isEnrolled = function(challengeName, username) { 
        var index = self.findChallenge(challengeName);
        challenges = self.getChallenges()
        if (index >= 0) {
            for (i = 0; i < challenges[index].enrolled.length; i++) {
                console.log(challenges[index])
                if (challenges[index].enrolled[i].username == username) {
                    console.log("T")
                    return true;
                }
            }
        }
        console.log("F")
        return false;
    }
    
    self.getChallengesForUser = function(username) { 
        var returnChallenges = [];
        challenges = self.getChallenges()
        console.log("user to get challenges for: " + username);
        for (i = 0; i < challenges.length; i++) {
            for (j = 0; j < challenges[i].enrolled.length; j++) {
                if (challenges[i].enrolled[j].username == username) { 
                    returnChallenges.push(challenges[i]);
                    break;
                }
            }
        }
        
        return returnChallenges;
    }
    
    self.getEnrolledCount = function(challengeId) { 
        challenges = self.getChallenges()
        var challengeIndex = self.findChallenge(challengeId);
        console.log("getting enrolledCount");
        return challenges[challengeIndex].enrolled.length;
    }
    
    self.updateChallenge = function(challengeName, user, progress, callback){
        var url = "http://localhost:8080/api/updateChallenge";
        var data = {'name': challengeName, 'username': user , 'progress': progress};
        $http.put(url, data)
            .success(function (data, status, headers, config) {
                console.log("UPDATE SUCCESS")
                //UPDATE CHALLENGES ARRAY
                ////////////////////////////////////////////
                //Synchronous Get request to server
                var url = "http://localhost:8080/api/challenges";
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                xhr.send(null)
                console.log("HTTP GET CHALLENGES")
                challenges = JSON.parse(xhr.responseText);
                ////////////////////////////////////////////
                callback("/challenge/"+challengeName); //redirects on successful update)
            })
            .error(function (data, status, header, config) {
            });
        
    }
});

