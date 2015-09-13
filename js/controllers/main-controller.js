/**
 * Created by User on 8/27/2015.
 */
(function(mainApp, data, views){
    var catList = data.catList;
    var itemList = data.itemList;
    var storageKey = 'allTrans';

    function getCurrentDate(){
        var date = new Date();
        return date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear();
    }

    var cartHelpers = function(cart){
        return{
            calculateTotal : function(){return _.reduce(cart, function(memo, item){ return memo + item.price}, 0); },
            findItemById : function(id){return _.find(cart, function(item){return item.id == id; }); },
            removeItemById : function(id){ return _.reject(cart, function(item){return item.id == id; }) }
        }
    };

    function findItemInCart(cart, selectedItem){
        return _.find(cart, function(item){return item.id == selectedItem; });
    }

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
            if(selectedItem != undefined){
                var itemAttr = data.getItemById(selectedItem);
                var itemInCart = findItemInCart($scope.cart, selectedItem);

                itemInCart.quantity--;
                itemInCart.price = itemAttr.price * itemInCart.quantity;
                updateTotalAmount();
                $scope.cart = (itemInCart.quantity==0) ? removeFromCart(selectedItem) : $scope.cart;
            }
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
                var itemAttr = data.getItemById(selectedItem);
                var itemInCart = findItemInCart($scope.cart, selectedItem);

                if(itemInCart == undefined){
                    $scope.cart.push({
                        id: itemAttr.id,
                        name: itemAttr.name,
                        quantity: 1,
                        price: itemAttr.price
                    });
                }else{
                    itemInCart.quantity++;
                    itemInCart.price = itemAttr.price * itemInCart.quantity
                }

                updateTotalAmount();
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
})(window.pos.app.mainApp, window.pos.data, window.pos.view);