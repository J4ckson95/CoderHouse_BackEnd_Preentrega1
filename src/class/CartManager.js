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
            const idCart = this.#Carts.findIndex((element) => element.product.id === id)
            if (idCart === -1) return console.log(`No se encontro ningun carrito con el id:${id}`);
            else return [this.#Carts[idCart].product, IdProduct]
        } catch (e) { console.log(`(getCartId)) Error No se puede encontra carrito con el id: ${id}`); }
    }
}