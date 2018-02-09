

app.service('nutritionService', function($http) {
   var self = this; 
   var result = 0;
   var foodSearch = []; 
   
   self.getNumFromItemName = function(name, amount, nextFunction) {    
        $http.get('https://api.nal.usda.gov/ndb/search/?format=json&q='+ name + '&sort=n&max=25&offset=0&api_key=EtPcD8FpwhTwQhiDI4nesleOxgjfey2KC6PHbRBn').success(function(response) {     
        var ndbno = response.list.item[0].ndbno;
        nextFunction(ndbno, name, amount);
        }); 
	};
  
    self.getCaloriesFromItemNum = function(ndbno, name, amount) {

		 $http.get('https://api.nal.usda.gov/ndb/reports/?ndbno=' + ndbno + '&type=b&format=json&api_key=EtPcD8FpwhTwQhiDI4nesleOxgjfey2KC6PHbRBn').success(function(response) { 
            for (i = 0; i < response.report.food.nutrients.length; i++) { 
                if (response.report.food.nutrients[i].name.localeCompare("Energy") == 0) {
                    //console.log(response.report.food.nutrients[i].value)
                    result = response.report.food.nutrients[i].value;
                    self.addFood({'name': name, 'amount': amount, 'calories': result*amount});
                    break;
                }
            }
         });
    };

    self.addFood = function(obj) {
        foodSearch.push(obj);
    }
    
    
    self.resetFoodSearch = function() {
        foodSearch = [];
    }
    
    self.getFoodSearch = function() {
        return foodSearch;
    }
    
    self.getCaloriesFromItemName = function(name, amount) {
        self.getNumFromItemName(name, amount, self.getCaloriesFromItemNum);
        
    }
    
    self.getTotalCalories = function() { 
        var total = 0;
        for (i = 0; i < foodSearch.length; i++) { 
            total += foodSearch[i].calories;
        }
        
        return total;
    }
});
