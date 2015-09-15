/**
 * Created by User on 9/13/2015.
 */
(function(definition){
    var storageKey = 'allTrans';

    definition.getCurrentDate = function(){
        var date = new Date();
        return date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear();
    };

    definition.saveTransaction = function(cart, totalAmount, payMode){
        var allTransactions = window.localStorage.getItem(storageKey) || '';
        var trans = {
            date: definition.getCurrentDate(),
            time: Date.now(),
            order: cart,
            total: totalAmount,
            payMode: payMode
        };
        allTransactions += (allTransactions=='' ? '' : ',') + JSON.stringify(trans);
        window.localStorage.setItem(storageKey, allTransactions);
        return 'success';
    };

    definition.getTransactionByDate = function(date){
        return _.filter(
            definition.getAllTransactions(),
            function(trans){ return trans.date == date }
        );

//        var transactionToday = _.filter(allTransactions, function(trans){ return trans.date == date });
//        return _.reduce(transactionToday, function(memo, trans){ return memo + trans.total; }, 0);
    };

    definition.getAllTransactions = function(){
        return JSON.parse('['+ (window.localStorage.getItem(storageKey) || '') +']');
    }

})(window.pos.helper.transaction);
