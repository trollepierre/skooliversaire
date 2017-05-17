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
  }

  increaseQuality(item, isConjured) {
    this.incrementQuality(item);
    if (item.owner == 'Wizard'){
      this.incrementQuality(item)
    }
  }

  incrementQuality(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1
    }
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
    if (item.quality >= valueToDecrement) {
      item.quality = item.quality - valueToDecrement
    }
  }

  updateQuality() {
    var pierrePresent = this.isPhilisopherStonePresent(this.items);

    for (var i = 0; i < this.items.length; i++) {
      var isConjured = this.isConjured(this.items[i]);

      if (!pierrePresent) {
        if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.decreaseQuality(this.items[i], isConjured)
          }
        } else {
          this.increaseQuality(this.items[i], isConjured)

          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              this.increaseQuality(this.items[i], isConjured)
            }
            if (this.items[i].sellIn < 6) {
              this.increaseQuality(this.items[i], isConjured)
            }
          }
        }
        if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
          this.items[i].sellIn = this.items[i].sellIn - 1;
        }
        if (this.items[i].sellIn < 0) {
          if (this.items[i].name != 'Aged Brie') {
            if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.decreaseQuality(this.items[i], isConjured)
              }
            } else {
              this.items[i].quality = this.items[i].quality - this.items[i].quality
            }
          } else {
            this.increaseQuality(this.items[i], isConjured)
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
