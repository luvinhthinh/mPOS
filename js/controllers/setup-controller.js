/**
 * Created by User on 9/21/2015.
 */
(function(mainApp){
    mainApp.controller('dropdownCtrl', function($scope) {
        $scope.status = {
            isopen: false
        };

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
    });
})(window.pos.app.mainApp);