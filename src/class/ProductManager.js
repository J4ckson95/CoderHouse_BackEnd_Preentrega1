import fs from "fs"
export default class ProductManager {
    #Products
    constructor(path) {
        this.path = path;
        this.#Products = []
    }
    async #validateProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) throw new Error("Error, debe ingresar todos los datos del producto")
        await this.getProducts()
        if (this.#Products.some((element) => element.code === code)) throw new Error(`Error, no se puede agregar 2 productos con el mismo code. Ya existe un producto con el code:${code}`)
        return { title, description, price, thumbnail, code, stock }
    }
    async #validateId(Id) {
        await this.getProducts()
        if (this.#Products.some((element) => element.id === Id)) return Id
        else throw new Error(`Error, no se pudo encontrar ningun producto con el id: ${Id}`)
    }
    async addProduct(product) {
        let newProduct = {}
        const validation = await this.#validateProduct(product)
        newProduct = { ...validation }
        if (this.#Products.length === 0) newProduct.id = 1
        else newProduct.id = this.#Products[this.#Products.length - 1].id + 1
        this.#Products.push(newProduct)
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.#Products, null, "\t"), "utf-8")
            return console.log(`(add)) Producto agregado correctamente con el id: ${newProduct.id}`);
        } catch (e) { console.log(`(add)) Error agregando el producto con codigo:${newProduct.code} `); }
    }
    async getProducts() {
        try {
            const dataFile = await fs.promises.readFile(this.path, "utf-8")
            if (dataFile.trim() === 0) this.#Products = []
            else this.#Products = [...JSON.parse(dataFile)]
            return this.#Products
        } catch (e) { console.log(`(get)) Error obteniendo los datos de la ruta : ${this.path} - ${e.message}`); }
    }
    async getProductById(Id) {
        try {
            await this.#validateId(Id)
            const IdProduct = this.#Products.findIndex((element) => element.id === Id)
            if (IdProduct === -1) return console.log(`No se encontro ningun producto con el id:${Id}`);
            else return [this.#Products[IdProduct], IdProduct]
        } catch (e) { console.log(`(getId)) Error No se puede encontra producto con el id: ${Id}`); }
    }
    async updateProduct(Id, data) {
        try {
            await this.#validateId(Id)
            const index = this.#Products.findIndex((element) => element.id == Id)
            this.#Products[index] = { ...this.#Products[index], ...data }
            await fs.promises.writeFile(this.path, JSON.stringify(this.#Products, null, "\t"), "utf-8")
            return this.#Products[index]
        } catch (e) { console.log(`(update)) Error e:${e}`); }
    }
    async delateProduct(Id) {
        try {
            await this.#validateId(Id)
            const productDelate = this.#Products.filter((element) => element.id !== Id)
            console.log(productDelate);
            await fs.promises.writeFile(this.path, JSON.stringify(productDelate, null, "\t"), "utf-8")
            return productDelate
        } catch (e) { console.log(`(delate)) Error e: ${e}`); }
    }
}
