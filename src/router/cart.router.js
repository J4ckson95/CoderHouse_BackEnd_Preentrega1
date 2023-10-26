import { Router } from "express";
import CartManager from "../class/CartManager.js";

const router = Router()
const manager = new CartManager("./src/data/Carts.json")

router.post("/", async (req, res) => {
    const newCart = await manager.newCart()
    if (!newCart) return res.status(400).send({ message: "Error no se pudo crear un carro nuevo" })
    else return res.send({ status: "success", message: "Cart created" })
})
router.get("/:cip", async (req, res) => {
    const id = parseInt(req.params.cip)
    const [cart, indexCart] = await manager.getCartById(id)
    if (!cart) return res.status(400).send(`Error no se encontro ningun cart con el id: ${id}`)
    res.send({ status: "success", cart })
})
router.post("/:cid/product/:pid", async (req, res) => {
    const idCart = parseInt(req.params.cid)
    const idProduct = parseInt(req.params.pid)
    const { quantity } = req.body
    const addProduct = manager.addProductsToTheCart(idCart, idProduct, quantity)
    if (!addProduct) return res.status(400).send({ message: "Error no se pudo agregar el producto al carrito" })
    else return res.send({ status: "success", message: `Producto con el id:${idProduct} agregado correctamente al carro: ${idCart}` })
})
export default router