import { Router } from "express";
import CartManager from "../class/CartManager.js";

const router = Router()
const manager = new CartManager("./src/data/Carts.json")

router.post("/", async (req, res) => {
    await manager.newCart()
    res.send({ status: "success", message: "Cart created" })
})
router.get("/:cip", async (req, res) => {
    const id = parseInt(req.params.cip)
    const cart = await manager.getCartById(id)
    if (!cart) return res.status(400).send(`Error no se encontro ningun cart con el id: ${id}`)
    res.send({ status: "success", cart })
})
export default router