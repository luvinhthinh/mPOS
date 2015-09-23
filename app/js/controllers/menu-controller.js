/**
 * Created by User on 8/27/2015.
 */
(function(mainApp){
    mainApp.controller('menuCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
        $scope.items = items;
        $scope.addToCart = function(item){
            $modalInstance.close(item);
        };
    }]);
})(window.pos.app.mainApp);