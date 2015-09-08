/**
 * Created by User on 8/27/2015.
 */
(function(definition){
    var catList = [
        {cat: 'cat1', name: 'Special'},
        {cat: 'cat2', name: 'Skewer'},
        {cat: 'cat3', name: '$5'},
        {cat: 'cat4', name: 'Drink'}
    ];

    var itemList = [
        {id: 'cat1_1', cat:'cat1', name: 'Special 1', price: 8},
        {id: 'cat1_2', cat:'cat1', name: 'Special 2', price: 9},
        {id: 'cat1_3', cat:'cat1', name: 'Special 3', price: 10},

        {id: 'cat2_1', cat:'cat2', name: 'skewer 1', price: 7},
        {id: 'cat2_2', cat:'cat2', name: 'skewer 2', price: 7.5},
        {id: 'cat2_3', cat:'cat2', name: 'skewer 3', price: 6.5},

        {id: 'cat3_1', cat:'cat3', name: 'Five 1', price: 5},
        {id: 'cat3_2', cat:'cat3', name: 'Five 2', price: 5},
        {id: 'cat3_3', cat:'cat3', name: 'Five 3', price: 5},

        {id: 'cat4_1', cat:'cat4', name: 'Drink 1', price: 4},
        {id: 'cat4_2', cat:'cat4', name: 'Drink 2', price: 4.5},
        {id: 'cat4_3', cat:'cat4', name: 'Drink 3', price: 5},
        {id: 'cat4_4', cat:'cat4', name: 'Drink 4', price: 4.5}
    ];

    definition.data = {
        catList : catList,
        itemList : itemList
    };
})(window.pos);
