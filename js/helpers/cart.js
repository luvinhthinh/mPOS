/**
 * Created by User on 9/13/2015.
 */

function findItemInCart(cart, selectedItem){
    return _.find(cart, function(item){return item.id == selectedItem; });
}