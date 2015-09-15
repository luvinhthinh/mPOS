(function(mainApp, helper){
    var transHelper = helper.transaction;
    mainApp.controller('reportCtrl', function($scope, $modalInstance) {
        var transactions = helper.transaction.getAllTransactions();
        var displayTrans = [];

        _.each(transactions, function(trans){
            var date = trans.date;
            if(!_.find(displayTrans, function(dtrans){ return dtrans.date == date})){
                displayTrans.push({
                    date : date,
                    total : transHelper.getTotalAmount(transHelper.getTransactionByDate(date)),
                    cash : transHelper.getTotalAmount(transHelper.getTransactionByDateAndMode(date, 'cash')),
                    eftpos : transHelper.getTotalAmount(transHelper.getTransactionByDateAndMode(date, 'eftpos'))
                });
            }
        });
        $scope.displayTrans = displayTrans;

        $scope.ok = function(){
            $modalInstance.close();
        }
    });
})(window.pos.app.mainApp, window.pos.helper);