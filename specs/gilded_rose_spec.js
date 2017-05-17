var gilded_rose = require('../gilded-rose/gilded_rose')
// var shop = require('../gilded-rose/gilded_rose').Shop

describe('gilded_rose_specs', function () {


  it('should be defined', function () {
    var shop = new gilded_rose()
    var items = shop.items;
    expect(gilded_rose).toBeDefined()
    expect(items).toBeDefined()
    console.log("items", items)
  });

  it('should not change quality when pierre philosophal is present', function () {
    let items = [
      {
        name: "Philosopher's stone",
        sellIn: 8,
        quality: 10
      }, {
        name: "Aged Brie",
        sellIn: 8,
        quality: 10
      }
    ]
    var shop = new gilded_rose(items)
    var itemShop = shop.items;

    // When
    shop.updateQuality()

    // Then
    expect(itemShop[1].quality).toEqual(10)
    expect(itemShop[1].sellIn).toEqual(8)
  });

  it('should change quality when pierre philosophal not present', function () {
    let items = [{
      name: "Aged Brie",
      sellIn: 8,
      quality: 10
    }]
    var shop = new gilded_rose(items)
    var itemShop = shop.items;

    // When
    shop.updateQuality()

    // Then
    expect(itemShop[0].quality).toEqual(11)
    expect(itemShop[0].sellIn).toEqual(7)
  });

  it('should decrease quality when Conjured object is present', function () {
    let items = [{
      name: "Conjured Toto",
      sellIn: 8,
      quality: 10
    }
    ]
    var shop = new gilded_rose(items)
    var itemShop = shop.items;

    // When
    shop.updateQuality()

    // Then
    expect(itemShop[0].quality).toEqual(8)
    expect(itemShop[0].sellIn).toEqual(7)
  });

  it('should not increase more than 50', function () {
    let items = [{
      name: "Aged Brie",
      sellIn: 0,
      quality: 49
    }
    ]
    var shop = new gilded_rose(items)
    var itemShop = shop.items;

    // When
    shop.updateQuality()

    // Then
    expect(itemShop[0].quality).toEqual(50)
    expect(itemShop[0].sellIn).toEqual(-1)
  });

  it('should not decrease less than 0', function () {
    let items = [{
      name: "TOTO",
      sellIn: 0,
      quality: 0
    }
    ]
    var shop = new gilded_rose(items)
    var itemShop = shop.items;

    // When
    shop.updateQuality()

    // Then
    expect(itemShop[0].quality).toEqual(0)
    expect(itemShop[0].sellIn).toEqual(-1)
  });

  it('should decrease twice when owner item is Barbarian', function () {
    let items = [{
      name: "TOTO",
      sellIn: 0,
      quality: 20,
      owner: 'Barbarian'
    }
    ]
    var shop = new gilded_rose(items)
    var itemShop = shop.items;

    // When
    shop.updateQuality()

    // Then
    expect(itemShop[0].quality).toEqual(16)
    expect(itemShop[0].sellIn).toEqual(-1)
  });

  it('should increase twice when owner item is Wizard', function () {
    let items = [{
      name: "Aged Brie",
      sellIn: 0,
      quality: 20,
      owner: 'Wizard'
    }
    ]
    var shop = new gilded_rose(items)
    var itemShop = shop.items;

    // When
    shop.updateQuality()

    // Then
    expect(itemShop[0].quality).toEqual(24)
    expect(itemShop[0].sellIn).toEqual(-1)
  });
})