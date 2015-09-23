/**
 * Created by User on 9/13/2015.
 */

QUnit.test("test helper function findItemInCart", function(assert){
    var nonEmpty_cart =[
        { id: 'id1', name: 'name1', quantity: 1, price: 8 }
    ];
    var empty_cart = [];
    var findItemInCart = window.pos.helper.cart.findItemInCart;

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

QUnit.test("test helper function updateTotalAmount", function(assert){
    var nonEmpty_cart =[
        { id: 'id1', name: 'name1', quantity: 1, price: 8 },
        { id: 'id2', name: 'name2', quantity: 2, price: 10 }
    ];
    var empty_cart = [];
    var totalAmount = window.pos.helper.cart.updateTotalAmount;

    assert.equal(totalAmount(undefined), 0, "Undefined cart : Should return 0");
    assert.equal(totalAmount(empty_cart), 0, "Empty cart : Should return 0");
    assert.equal(totalAmount(nonEmpty_cart), 18, "Non empty cart : Should return total amount as 18");
});