/**
 * Created by User on 9/13/2015.
 */
(function(definition, data){
    definition.findItemInCart = function(cart, itemId){
        return _.find(cart, function(item){return item.id == itemId; });
    };

    definition.updateTotalAmount = function(cart){
        return _.reduce(cart, function(memo, item){ return memo + item.price}, 0);
    };

    definition.removeFromCart = function(cart, itemId){
        var itemInCart = definition.findItemInCart(cart, itemId);
        var itemAttr = data.getItemById(itemId);

        if(itemInCart){
            itemInCart.quantity--;
            itemInCart.price = itemAttr.price * itemInCart.quantity;
            return (itemInCart.quantity==0) ? _.reject(cart, function(item){return item.id == itemId; }) : cart;
        }
        return cart;
    };

    definition.addItemToCart = function(cart, itemId){
        var itemInCart = definition.findItemInCart(cart, itemId);
        var itemAttr = data.getItemById(itemId);

        if(itemInCart == undefined){
            cart.push({
                id: itemAttr.id,
                name: itemAttr.name,
                quantity: 1,
                price: itemAttr.price
            });
        }else{
            itemInCart.quantity++;
            itemInCart.price = itemAttr.price * itemInCart.quantity
        }
        return cart;
    };
})(window.pos.helper.cart, window.pos.data);
