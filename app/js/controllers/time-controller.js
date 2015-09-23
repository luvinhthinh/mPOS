/**
 * Created by User on 8/27/2015.
 */
(function(mainApp){
    mainApp.controller('timeCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.clock = "loading clock..."; // initialise the time variable
        $scope.tickInterval = 1000; //ms

        var tick = function () {
            $scope.clock = Date.now(); // get the current time
            $timeout(tick, $scope.tickInterval); // reset the timer
        };

        $timeout(tick, $scope.tickInterval);
    }]);
})(window.pos.app.mainApp);