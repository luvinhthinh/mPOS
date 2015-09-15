/**
 * Created by User on 9/15/2015.
 */
(function(definition){
    definition.getCurrentDate = function(){
        var date = new Date();
        return date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear();
    };

})(window.pos.helper.utility);