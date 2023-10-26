import fs from "fs"
export default class CartManager {
    #Carts
    constructor(path) {
        this.path = path;
        this.#Carts = []
    }
    async #getCarts() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            if (data.trim() === 0) this.#Carts = []
            else this.#Carts = [...JSON.parse(data)]
            return this.#Carts
        } catch (e) { console.log(`(getCart)) Error obteniendo los datos de la ruta : ${this.path} - ${e.message}`); }
    }
    async getCartById(id) {
        try {
            await this.#getCarts()
            const idCart = this.#Carts.findIndex((element) => element.id === id)
            if (idCart === -1) return console.log(`No se encontro ningun carrito con el id:${id}`);
            else return [this.#Carts[idCart].products, idCart]
        } catch (e) { console.log(`(getCartId)) Error No se puede encontra carrito con el id: ${id}`); }
    }
    async newCart() {
        try {
            await this.#getCarts()
            const newCart = { products: [] }
            if (this.#Carts.length === 0) newCart.id = 1
            else newCart.id = this.#Carts[this.#Carts.length - 1].id + 1
            this.#Carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.#Carts, null, "\t"), "utf-8")
            return true
        } catch (e) { console.log(`(createCart)) Error no se pudo crear el nuevo carro, error: ${e.message}`); }
    }
    async addProductsToTheCart(idCart, idProduct, quantity) {
        try {
            const [product, id] = await this.getCartById(idCart)
            const indexProduct = this.#Carts[id].products.findIndex(element => element.id === idProduct)
            if (indexProduct === -1) this.#Carts[id].products.push({ id: idProduct, quantity: quantity })
            else this.#Carts[id].products[indexProduct].quantity += quantity
            fs.promises.writeFile(this.path, JSON.stringify(this.#Carts, null, "\t"), "utf-8")
            return true
        } catch (e) { console.log(`(addProduct/cart)) Error no se pudo agregar los productos al carro, error: ${e.message}`); }
    }
}