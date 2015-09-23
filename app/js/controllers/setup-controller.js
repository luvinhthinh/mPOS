/**
 * Created by User on 9/21/2015.
 */
(function(mainApp, views){
    mainApp.controller('dropdownCtrl', ['$scope', '$modal', function($scope, $modal) {
        $scope.status = {
            isopen: false
        };

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

        function report(){
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: views.getHtmls().report,
                controller: 'reportCtrl',
                resolve: {

                }
            });

            modalInstance.result.then(function (selectedItem) {

            }, function () { // if error
            });
        }

        $scope.report = report;
    }]);
})(window.pos.app.mainApp, window.pos.view);