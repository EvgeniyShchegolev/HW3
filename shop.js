class Good {
    constructor (
        id,
        name,
        description,
        sizes,
        price,
        available, 
     ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable (available) {
        this.available = available;
    }
}


class GoodsList {
    #goods = [];
    constructor (
        goods,
        filter,
        sortPrice,
        sortDir,
    ) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        this.#filter();
        this.#sortPrice();
        return this.goods;
    }

    #filter() {
        if (this.filter) {
            this.goods = this.#goods.filter(good => this.filter.test(good.name));
        } else {
            this.goods = Array.from(this.#goods);
        }
    }

    #sortPrice() {
        if (this.sortPrice && this.sortDir) {
            this.goods.sort((goodPrev, goodNext) => goodPrev.price - goodNext.price);
        } else if (this.sortPrice) {
            this.goods.sort((goodPrev, goodNext) => goodNext.price - goodPrev.price);
        }
    }

    add(good) {
        this.#goods.push(good);
    }

    remove(id) {
        let index = this.#goods.findIndex(good => good.id === id);
        if (index > 0) {
            this.#goods.splice(index, 1);
        } else {
            return "not found";
        }
        
    }
}


class BasketGood extends Good {
    constructor (
        good,
        amount,
    ) {
        super(
            good.id,
            good.name,
            good.description,
            good.sizes,
            good.price,
            good.available,
        );
        this.amount = amount;
    }
}


class Basket {
    constructor (
        goods,
    ) {
        this.goods = goods;
    }

    get totalAmount() {
        return this.goods.reduce((good, next) => ({amount: good.amount + next.amount})).amount;
    }

    get totalSum() {
        return this.goods
        .map(good => ({sum: good.amount * good.price}))
        .reduce((good, next) => ({sum: good.sum + next.sum})).sum;
    }

    add(good, amount) {
        let index = this.goods.findIndex(good_ => (good_.id === good.id));
        if (index > 0) {
            this.goods[index].amount += amount;
        } else {
            this.goods.push(new BasketGood(good, amount));
        }
    }

    remove(good, amount) {
        let index = this.goods.findIndex(good_ => (good_.id === good.id));
        if (index < 0) {
            return "not found";
        }
        if (this.goods[index].amount > amount) {
            this.goods[index].amount -= amount;
        } else {
            this.goods.splice(index, 1);
        }
    }

    clear() {
        this.goods = [];
    }

    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available);
    }
}


let good1 = new Good(
    id = 1,
    name = "apple",
    description = "d1",
    sizes = "s1",
    price = 100,
    available = true,
)

let good2 = new Good(
    id = 2,
    name = "orange",
    description = "d2",
    sizes = "s2",
    price = 600,
    available = true,
)

let good3 = new Good(
    id = 3,
    name = "watermellow",
    description = "d3",
    sizes = "s3",
    price = 400,
    available = true,
)

let good4 = new Good(
    id = 4,
    name = "limon",
    description = "d4",
    sizes = "s4",
    price = 700,
    available = false,
)

let good5 = new Good(
    id = 5,
    name = "blueberry",
    description = "d5",
    sizes = "s5",
    price = 150,
    available = true,
)

let list1 = new GoodsList(
    goods = [
        good1, 
        good2, 
        good3, 
        good4,
    ],
    filter = "",
    sortPrice = true,
    sortDir = true,
)

let list2 = new GoodsList(
    goods = [
        good1, 
        good2, 
        good3, 
        good4,
        good5,
    ],
    filter = /a/i,
    sortPrice = true,
    sortDir = false,
)

let list3 = new GoodsList(
    goods = [
        good1, 
        good2, 
        good4,
        good5,
    ],
    filter = /m/i,
    sortPrice = false,
    sortDir = true,
)

let basket1 = new Basket(goods = []);


// good1.setAvailable(false);

// list1.add(good5);
list3.remove(6);

// console.log(list1.list);

// basket1.add(good1, 10);
// basket1.add(good3, 15);
// basket1.add(good4, 20);

// basket1.remove(good1, 15);

// basket1.removeUnavailable();

// basket1.clear();

// basket1.add(good2, 5);

// basket1.add(good3, 30);

// console.log(basket1.goods);

// console.log(`Общее количество: ${basket1.totalAmount}.\nСумма всего: ${basket1.totalSum}.`);
