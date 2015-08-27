var app = angular.module('myApp', ['ui.bootstrap']);

var catList = [
    {cat: 'cat1', name: 'Special'},
    {cat: 'cat2', name: 'Skewer'},
    {cat: 'cat3', name: '$5'},
    {cat: 'cat4', name: 'Drink'}
];

var itemList = [
    {id: 'cat1_1', cat:'cat1', name: 'Special 1', price: 8},
    {id: 'cat1_2', cat:'cat1', name: 'Special 2', price: 9},
    {id: 'cat1_3', cat:'cat1', name: 'Special 3', price: 10},

    {id: 'cat2_1', cat:'cat2', name: 'skewer 1', price: 7},
    {id: 'cat2_2', cat:'cat2', name: 'skewer 2', price: 7.5},
    {id: 'cat2_3', cat:'cat2', name: 'skewer 3', price: 6.5},

    {id: 'cat3_1', cat:'cat3', name: 'Five 1', price: 5},
    {id: 'cat3_2', cat:'cat3', name: 'Five 2', price: 5},
    {id: 'cat3_3', cat:'cat3', name: 'Five 3', price: 5},

    {id: 'cat4_1', cat:'cat4', name: 'Drink 1', price: 4},
    {id: 'cat4_2', cat:'cat4', name: 'Drink 2', price: 4.5},
    {id: 'cat4_3', cat:'cat4', name: 'Drink 3', price: 5},
    {id: 'cat4_4', cat:'cat4', name: 'Drink 4', price: 4.5}
];

app.controller('timeCtrl', function ($scope, $timeout) {
    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000; //ms

    var tick = function () {
        $scope.clock = Date.now(); // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    };

    $timeout(tick, $scope.tickInterval);
});

app.controller('myCtrl', function($scope, $modal) {
    $scope.catList = catList;
    $scope.cart = [];
    $scope.totalAmount = 0;

    var stack = [];
    var payMode = '';


    function updateTotalAmount(){
        $scope.totalAmount = _.reduce($scope.cart, function(memo, item){ return memo + item.price}, 0);
    }

    function saveTransaction(){
        var trans = {order: $scope.cart, total: $scope.totalAmount, payMode: payMode};
        window.localStorage.setItem(JSON.toString(Date.now()), trans);
    }

    $scope.report = function(){

    };

    $scope.undo = function(){
        var selectedItem = stack.pop();
        if(selectedItem != undefined){
            var itemAttr = _.find(itemList, function(item){ return item.id == selectedItem; });
            var itemInCart = _.find($scope.cart, function(item){return item.id == selectedItem; });

            itemInCart.quantity -= 1;
            itemInCart.price = itemAttr.price * itemInCart.quantity;
            updateTotalAmount();

            if(itemInCart.quantity == 0){
                $scope.cart = _.reject($scope.cart, function(item){return item.id == selectedItem; });
            }
        }
    };

    $scope.clearAll = function(){
        $scope.cart = [];
        stack = [];
        $scope.totalAmount = 0;
        payMode = '';
    };

    $scope.open = function(cat){
        var items = _.filter(itemList, function(item){ return item.cat == cat;});

        var modalInstance = $modal.open({
            animation: false,
            templateUrl: 'menu.html',
            controller: 'menuCtrl',
            resolve: {
                items: function(){ return items;   }
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

        }, function () {
            console.log('Modal dismissed at 2: ' + new Date());
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
        modalInstance.result.then(function (ret) {
            console.log('transaction completed by ' + ret[0] +' amount ' + ret[1]);
            payMode = ret[0];
            saveTransaction();
            $scope.clearAll();
        }, function () {
            console.log('Modal dismissed at 2: ' + new Date());
        });
    }
});

app.controller('payCtrl', function($scope, $modalInstance, amount) {
    $scope.amount = amount;
    $scope.received = '';
    $scope.mode = '-';

    $scope.payBy = function(mode){
        $scope.mode = mode;

        if(mode=='eftpos'){
            if(!window.confirm("Are you sure to pay by EFTPOS ?")){
                $scope.mode = '-';
            }
        }
    };

    $scope.complete = function(received){
        if(( $scope.mode == 'cash' && received >= amount) || $scope.mode == 'eftpos'){
            $modalInstance.close([$scope.mode, received]);
        }
    };
});

app.controller('menuCtrl', function($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.addToCart = function(item){
        $modalInstance.close(item);
    };
});