/**
 * Created by User on 9/13/2015.
 */

QUnit.test("test function findItemInCart", function(assert){
    var nonEmpty_cart =[
        { id: 'id1', name: 'name1', quantity: 1, price: 8 }
    ] ;

    var empty_cart = [];

    assert.deepEqual(
        findItemInCart(undefined, 'id0'),
        undefined,
        "Empty cart : Should return undefined when ID is any string"
    );

    assert.deepEqual(
        findItemInCart(undefined, undefined),
        undefined,
        "Undefined cart : Should return undefined when ID is undefined"
    );

    assert.deepEqual(
        findItemInCart(empty_cart, 'id0'),
        undefined,
        "Empty cart : Should return undefined when ID is any string"
    );

    assert.deepEqual(
        findItemInCart(empty_cart, undefined),
        undefined,
        "Empty cart : Should return undefined when ID is undefined"
    );

    assert.deepEqual(
        findItemInCart(nonEmpty_cart, undefined),
        undefined,
        "Non empty cart : Should return undefined when ID is undefined"
    );

    assert.deepEqual(
        findItemInCart(nonEmpty_cart, 'id0'),
        undefined,
        "Non empty cart : Should return undefined when ID is not found in cart"
    );

    assert.deepEqual(
        findItemInCart(nonEmpty_cart, 'id1'),
        { id: 'id1', name: 'name1', quantity: 1, price: 8 },
        "Non empty cart : Should return object when ID is found in cart"
    );


});