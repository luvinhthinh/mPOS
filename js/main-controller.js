/**
 * Created by User on 8/27/2015.
 */
(function(mainApp, data){
    var catList = data.catList;
    var itemList = data.itemList;

    mainApp.controller('myCtrl', function($scope, $modal) {
        $scope.catList = catList;
        $scope.cart = [];
        $scope.totalAmount = 0;

        var stack = [];
        var payMode = '';

        function updateTotalAmount(){
            $scope.totalAmount = _.reduce($scope.cart, function(memo, item){ return memo + item.price}, 0);
        }

        function removeFromCart(itemId){
            return _.reject($scope.cart, function(item){return item.id == itemId; });
        }

        function saveTransaction(){
            var allTransactions = window.localStorage.getItem("trans") || [];
            var trans = {
                time: Date.now(),
                order: $scope.cart,
                total: $scope.totalAmount,
                payMode: payMode
            };

            allTransactions.push(trans);
            window.localStorage.setItem("allTransactions", JSON.stringify(allTransactions));
        }

        $scope.report = function(){
            var allTransactions = JSON.parse(window.localStorage.getItem("allTransactions") || '[]');
            console.log(window.localStorage);
        };

        $scope.undo = function(){
            var selectedItem = stack.pop();
            if(selectedItem != undefined){
                var itemAttr = _.find(itemList, function(item){ return item.id == selectedItem; });
                var itemInCart = _.find($scope.cart, function(item){return item.id == selectedItem; });

                itemInCart.quantity -= 1;
                itemInCart.price = itemAttr.price * itemInCart.quantity;
                updateTotalAmount();
                $scope.cart = (itemInCart.quantity==0) ? removeFromCart(selectedItem) : $scope.cart;
            }
        };

        $scope.clearAll = function(){
            $scope.cart = [];
            stack = [];
            $scope.totalAmount = 0;
            payMode = '';
        };

        $scope.open = function(cat){
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'menu.html',
                controller: 'menuCtrl',
                resolve: {
                    items: function(){ return _.filter(itemList, function(item){ return item.cat == cat;});   }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                var itemAttr = _.find(itemList, function(item){ return item.id == selectedItem; });
                var itemInCart = _.find($scope.cart, function(item){return item.id == selectedItem; });

                if(itemInCart == undefined){
                    $scope.cart.push({
                        id: itemAttr.id,
                        name: itemAttr.name,
                        quantity: 1,
                        price: itemAttr.price
                    });
                }else{
                    itemInCart.quantity += 1;
                    itemInCart.price = itemAttr.price * itemInCart.quantity
                }

                updateTotalAmount();
                stack.push(selectedItem);
            }, function () { // if error
            });
        };

        $scope.pay = function(){
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'pay.html',
                controller: 'payCtrl',
                resolve: {
                    amount: function(){ return $scope.totalAmount;   }
                }
            });
            modalInstance.result.then(function (ret) { // if no error
                payMode = ret[0];
                saveTransaction();
                $scope.clearAll();
            }, function () { // if error
            });
        }
    });
})(window.pos.app.mainApp, window.pos.data);