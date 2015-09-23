/**
 * Created by User on 8/27/2015.
 */
(function(mainApp){
    var MODE = {
        CASH: 'cash',
        EFTPOS : 'eftpos'
    };

    mainApp.controller('payCtrl', ['$scope', '$modalInstance', 'amount', function($scope, $modalInstance, amount) {
        $scope.amount = amount;
        $scope.received = '';
        $scope.mode = '-';

        $scope.payBy = function(mode){
            $scope.mode = (mode==MODE.EFTPOS && !window.confirm("Are you sure to pay by EFTPOS ?")) ? '-' : mode;
        };

        $scope.complete = function(received){
            if(($scope.mode == MODE.CASH && received >= amount) ||
                $scope.mode == MODE.EFTPOS){
                $modalInstance.close([$scope.mode, received]);
            }
        };
    }]);
})(window.pos.app.mainApp);