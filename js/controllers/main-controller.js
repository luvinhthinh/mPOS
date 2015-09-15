/**
 * Created by User on 8/27/2015.
 */
(function(mainApp, data, views, helper){
    var catList = data.catList;
    var itemList = data.itemList;
    var cartHelper = helper.cart;
    var tranHelper = helper.transaction;

    mainApp.controller('myCtrl', function($scope, $modal) {
        $scope.catList = catList;
        $scope.cart = [];
        $scope.totalAmount = 0;

        var stack = [];
        var payMode = '';

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

        function undo(){
            var selectedItem = stack.pop();
            $scope.cart = selectedItem ? cartHelper.removeFromCart($scope.cart, selectedItem) : $scope.cart;
            $scope.totalAmount = cartHelper.updateTotalAmount($scope.cart);
        }

        function clearAll(){
            $scope.cart = [];
            stack = [];
            $scope.totalAmount = 0;
            payMode = '';
        }

        function open(cat){
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: views.getHtmls().menu,
                controller: 'menuCtrl',
                resolve: {
                    items: function(){ return _.filter(itemList, function(item){ return item.cat == cat;});   }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.cart = cartHelper.addItemToCart($scope.cart, selectedItem);
                $scope.totalAmount = cartHelper.updateTotalAmount($scope.cart);
                stack.push(selectedItem);
            }, function () { // if error
            });
        }

        function pay(){
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: views.getHtmls().payment,
                controller: 'payCtrl',
                resolve: {
                    amount: function(){ return $scope.totalAmount;   }
                }
            });
            modalInstance.result.then(function (ret) {          // if no error
                payMode = ret[0];                               // user payment mode
                tranHelper.saveTransaction($scope.cart, $scope.totalAmount, payMode);
                clearAll();
            }, function () { // if error
            });
        }

        $scope.report = report;
        $scope.undo = undo;
        $scope.clearAll = clearAll;
        $scope.open = open;
        $scope.pay = pay;
    });
})(window.pos.app.mainApp, window.pos.data, window.pos.view, window.pos.helper);