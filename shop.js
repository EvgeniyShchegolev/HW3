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
        this.#filter();
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
        this.#sortPrice();
    }

    get list() {
        return this.#goods;
    }

    #filter() {
        if (this.filter) {
            this.#goods = this.#goods.filter(good => this.filter.test(good.name));
        }
    }

    #sortPrice() {
        if (this.sortPrice && this.sortDir) {
            this.#goods.sort((goodPrev, goodNext) => goodPrev.price - goodNext.price);
        } else if (this.sortPrice) {
            this.#goods.sort((goodPrev, goodNext) => goodNext.price - goodPrev.price);
        }
    }

    add(good) {
        this.#goods.push(good);
    }

    remove(id) {
        this.#goods.splice(this.#goods.findIndex(good => good.id === id), 1);
    }
}


class BasketGood extends Good {
    constructor (
        good,
        amount,
    ) {
        super(
            id,
            name,
            description,
            sizes,
            price,
            available,
        );
        this.id = good.id;
        this.name = good.name;
        this.description = good.description;
        this.sizes = good.sizes;
        this.price = good.price;
        this.available = good.available;

        this.amount = Number(amount);
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
        // let goods_ = this.goods.map(good => ({amount: good.amount, price: good.price}));
        // goods_.forEach((good) => {good.amount = good.amount * good.price});
        // return goods_.reduce((good, next) => ({amount: good.amount + next.amount})).amount;
        
        return this.goods
        .map(good => ({sum: good.amount * good.price}))
        .reduce((good, next) => ({sum: good.sum + next.sum})).sum;
    }

    add(good, amount) {
        if (!this.goods.find(good_ => (good_.id === good.id) ? good_.amount += amount : false)) {
            this.goods.push(new BasketGood(good, amount));
        }
    }

    remove(good, amount) {
        let indexRemove = this.goods.findIndex(good_ => (good_.id === good.id));
        if (this.goods[indexRemove].amount > amount) {
            this.goods[indexRemove].amount -= amount;
        } else {
            this.goods.splice(indexRemove, 1);
        }
    }

    clear() {
        this.goods = [];
    }

    removeUnavailable() {
        this.goods.forEach((good, index) => {
            (good.available === false) ? this.goods.splice(index, 1) : false
        });
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


good1.setAvailable(false);

list1.add(good5);
list3.remove(5);

console.log(list2.list);

basket1.add(good1, 10);
basket1.add(good3, 15);
basket1.add(good4, 20);

basket1.remove(good1, 5);

basket1.removeUnavailable();

basket1.clear();

basket1.add(good2, 5);

basket1.add(good3, 30);

console.log(basket1.goods);

console.log(`Общее количество: ${basket1.totalAmount}.\nСумма всего: ${basket1.totalSum}.`);
