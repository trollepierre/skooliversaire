class Item {
  constructor(name, sellIn, quality, owner) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.owner = owner;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
    this.MAX_QUALITY = 50;
    this.MIN_QUALITY = 0;
  }

  increaseQuality(item, isConjured) {
    let valueToIncrement = 1;
    if (item.owner == 'Wizard'){
      valueToIncrement = valueToIncrement * 2;
    }
    this.incrementQuality(item, valueToIncrement)
  }

  incrementQuality(item, valueToIncrement) {
    item.quality = Math.min(this.MAX_QUALITY, item.quality + valueToIncrement)
  }

  decreaseQuality(item, isConjured) {
    let valueToDecrement = 1
    if (item.owner == 'Barbarian'){
      valueToDecrement = valueToDecrement * 2
    }
    if (isConjured) {
      valueToDecrement = valueToDecrement * 2
    }
    this.decrementQuality(item, valueToDecrement);
  }

  decrementQuality(item, valueToDecrement) {
    item.quality = Math.max(this.MIN_QUALITY, item.quality - valueToDecrement)
  }

  updateQuality() {
    var pierrePresent = this.isPhilisopherStonePresent(this.items);

    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      var isConjured = this.isConjured(item);

      if (!pierrePresent) {
        if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            this.decreaseQuality(item, isConjured)
          }
        } else {
          this.increaseQuality(item, isConjured)

          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              this.increaseQuality(item, isConjured)
            }
            if (item.sellIn < 6) {
              this.increaseQuality(item, isConjured)
            }
          }
        }
        if (item.name != 'Sulfuras, Hand of Ragnaros') {
          item.sellIn = item.sellIn - 1;
        }

        if (item.sellIn < 0) {
          if (item.name != 'Aged Brie') {
            if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
              if (item.name != 'Sulfuras, Hand of Ragnaros') {
                this.decreaseQuality(item, isConjured)
              }
            } else {
              item.quality = item.quality - item.quality
            }
          } else {
            this.increaseQuality(item, isConjured)
          }
        }
      }
    }

    return this.items;
  }

  isConjured(item) {
    return item.name.includes("Conjured");
  }

  isPhilisopherStonePresent(items) {
    let stonePresent = false
    for (var i = 0; i < items.length; i++) {
      if (items[i].name == "Philosopher's stone") {
        stonePresent = true;
      }
    }
    return stonePresent;
  }
}

module.exports = Shop;
