/**
 * Created by User on 8/27/2015.
 */
(function(mainApp, data, views, helper){
    var catList = data.catList;
    var itemList = data.itemList;
    var storageKey = 'allTrans';
    var cartHelper = helper.cart;
    var tranHelper = helper.transaction;

    function getCurrentDate(){
        var date = new Date();
        return date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear();
    }

    mainApp.controller('myCtrl', function($scope, $modal) {
        $scope.catList = catList;
        $scope.cart = [];
        $scope.totalAmount = 0;

        var stack = [];
        var payMode = '';

        function saveTransaction(){
            var allTransactions = window.localStorage.getItem(storageKey) || '';
            var trans = {
                date: getCurrentDate(),
                time: Date.now(),
                order: $scope.cart,
                total: $scope.totalAmount,
                payMode: payMode
            };
            allTransactions += (allTransactions=='' ? '' : ',') + JSON.stringify(trans);
            window.localStorage.setItem(storageKey, allTransactions);
        }

        function report(){
            var allTransactions = JSON.parse('['+ (window.localStorage.getItem(storageKey) || '') +']') ;
            var transactionToday = _.filter(allTransactions, function(trans){ return trans.date == getCurrentDate() });
            var totalAmountUpToDate = _.reduce(transactionToday, function(memo, trans){ return memo + trans.total; }, 0);
            console.log(totalAmountUpToDate);
        }

        function undo(){
            var selectedItem = stack.pop();
            $scope.cart = selectedItem ? cartHelper.removeFromCart($scope.cart, selectedItem) : $scope.cart;
            cartHelper.updateTotalAmount($scope.cart);
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
                cartHelper.updateTotalAmount($scope.cart);
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
                saveTransaction();
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