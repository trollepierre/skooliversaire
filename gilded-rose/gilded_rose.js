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
    if (item.quality > 0) {
      if (isConjured) {
        item.quality = item.quality - 1
      }
      if (item.quality > 0) {
        item.quality = item.quality - 1
      }
    }
    if (item.owner == 'Barbarian'){
      if (item.quality > 0) {
        if (isConjured) {
          item.quality = item.quality - 1
        }
        if (item.quality > 0) {
          item.quality = item.quality - 1
        }
      }
    }
  }

  updateQuality() {
    var pierrePresent = false;


    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name == "Philosopher's stone") {
        pierrePresent = true;
      }
    }
    for (var i = 0; i < this.items.length; i++) {
      var isConjured = this.items[i].name.includes("Conjured");

      if (pierrePresent) {

      } else {
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
}

module.exports = Shop;
