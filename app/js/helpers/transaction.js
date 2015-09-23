/**
 * Created by User on 9/13/2015.
 */
(function(definition){
    var storageKey = 'allTrans';
    var trans = definition.transaction;

    trans.saveTransaction = function(cart, totalAmount, payMode){
        var allTransactions = window.localStorage.getItem(storageKey) || '';
        var trans = {
            date: definition.utility.getCurrentDate(),
            time: Date.now(),
            order: cart,
            total: totalAmount,
            payMode: payMode
        };
        allTransactions = JSON.stringify(trans) + (allTransactions=='' ? '' : ',') + allTransactions;
        window.localStorage.setItem(storageKey, allTransactions);
        return 'success';
    };

    trans.getTransactionByDate = function(date){
        return _.filter(
            trans.getAllTransactions(),
            function(trans){ return trans.date == date }
        );
    };

    trans.getTransactionByDateAndMode = function(date, mode){
        return _.filter(
            trans.getAllTransactions(),
            function(trans){ return trans.date == date  && trans.payMode == mode}
        );
    };

    trans.getTotalAmount = function(transactions){
        return _.reduce(transactions, function(memo, trans) { return memo + trans.total}, 0)
    };

    trans.getAllTransactions = function(){
        return JSON.parse('['+ (window.localStorage.getItem(storageKey) || '') +']');
    }

})(window.pos.helper);
