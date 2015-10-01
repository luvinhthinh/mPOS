/**
 * Created by User on 8/27/2015.
 */
(function(definition){
    var catList = [
        {cat: 'cat1', name: 'Food'},
        {cat: 'cat2', name: 'Drink'},
        {cat: 'cat3', name: 'Special'}
    ];

    var itemList = [
        {id: 'cat1_1', cat:'cat1', name: 'Roll', price: 6},
        {id: 'cat1_2', cat:'cat1', name: 'Banana', price: 6},
        {id: 'cat1_3', cat:'cat1', name: 'Pork', price: 6},
        {id: 'cat1_4', cat:'cat1', name: 'Soup', price: 6},
        {id: 'cat1_5', cat:'cat1', name: 'Bun', price: 6},

        {id: 'cat2_1', cat:'cat2', name: 'Sugar Cane', price: 5},
        {id: 'cat2_2', cat:'cat2', name: 'Coconut', price: 4},
        {id: 'cat2_3', cat:'cat2', name: 'Coffee', price: 4},
        {id: 'cat2_4', cat:'cat2', name: 'Lemon Tea', price: 2},
        {id: 'cat2_5', cat:'cat2', name: 'Water', price: 4},
        {id: 'cat2_6', cat:'cat2', name: 'Soft Drink', price: 4},

        {id: 'cat3_1', cat:'cat3', name: 'Spring Roll', price: 3},
        {id: 'cat3_2', cat:'cat3', name: 'Skewer', price: 4},
        {id: 'cat3_3', cat:'cat3', name: '2 for 7', price: 7}
    ];

    definition.data = {
        catList : catList,
        itemList : itemList,
        getItemById : function(selectedItem){return _.find(itemList, function(item){ return item.id == selectedItem; })}
    };
})(window.pos);
