app.controller('calCalculatorController', function ($scope, nutritionService, $location) { 
    
    $scope.addFood = function(foodName, amount) {
        nutritionService.getCaloriesFromItemName(foodName, amount); 
    }
    
    $scope.resetFoodSearch = function() {
        nutritionService.resetFoodSearch();
    }
    
    $scope.getFoodSearch = function() {
        return nutritionService.getFoodSearch()
    }
    
    $scope.getCalories = function(name) { 
        nutritionService.getCaloriesFromItemName(name);
    
    } 
    
    $scope.reset = function() { 
         $scope.resetFoodSearch();
         $location.url('#/explore');
    }
    
    $scope.getTotalCalories = function() { 
        return nutritionService.getTotalCalories();
    }
});