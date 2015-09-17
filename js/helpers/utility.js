/**
 * Created by User on 9/15/2015.
 */
(function(definition){
    definition.getCurrentDate = function(){
        var date = new Date();
        return date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear();
    };

    definition.sendMessage = function(number, message){
        //CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };

        var success = function () { alert('Message sent successfully'); };
        var error = function (e) { alert('Message Failed:' + e); };
        sms.send(number, message, options, success, error);
    }

})(window.pos.helper.utility);