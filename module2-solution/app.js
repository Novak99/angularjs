(function () {
  'use strict';

  angular
    .module('ShoppingListCheckOff', [])

    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
    var buyItem = this;
    buyItem.boughtItemCount = 0;

    buyItem.itemName = '';
    buyItem.itemQuantity = '';

    buyItem.addItem = function () {
      ShoppingListCheckOffService.addItem(
        buyItem.itemName,
        buyItem.itemQuantity
      );
    };

    buyItem.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeItem(itemIndex);
    };

    buyItem.boughtItem = function (itemIndex) {
      buyItem.boughtItemCount++;
      ShoppingListCheckOffService.boughtItem(itemIndex);
    };

    buyItem.items = ShoppingListCheckOffService.getItemsToBuy();
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', '$timeout'];

  function AlreadyBoughtController(ShoppingListCheckOffService, $timeout) {
    var boughtItem = this;
    $timeout(function () {
      boughtItem.items = ShoppingListCheckOffService.getItemsBought();
    });
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [
      { name: 'cookies', quantity: 8 },
      { name: 'bread', quantity: 3 },
      { name: 'milk', quantity: 2 },
      { name: 'sugar', quantity: 6 },
      { name: 'juice', quantity: 10 },
    ];
    var itemsBought = [];

    service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity,
      };
      itemsToBuy.push(item);
    };

    service.removeItem = function (itemIndex) {
      itemsToBuy.splice(itemIndex, 1);
    };

    service.getItemsToBuy = function () {
      return itemsToBuy;
    };

    service.boughtItem = function (itemIndex) {
      var item = itemsToBuy.splice(itemIndex, 1);
      itemsBought.push(item[0]);
    };

    service.getItemsBought = function () {
      return itemsBought;
    };
  }
})();
