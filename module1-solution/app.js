(function(){
    'use strict';

    angular.module('LunchCheck', [])

    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope){
        $scope.lunchMenu = '';
        $scope.message = '';

        $scope.checkMenu = function() {
            var menuItems = $scope.lunchMenu
            .split(',')
            .filter(function(item){
                return item != "" && item != " "
            });
            console.log(menuItems);

            if (!$scope.lunchMenu) {
                $scope.message = "Please enter data first";
            }
            else if (menuItems.length <= 3) {
                $scope.message = "Enjoy!";
            } 
            else {
                $scope.message = "Too much!";
            }
        }
    }
})();