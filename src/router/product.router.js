import { Router } from "express";
import ProductManager from "../class/ProductManager.js"

const router = Router()
const manager = new ProductManager("./src/data/DB.json")

router.get("/", async (req, res) => {
    const data = await manager.getProducts()
    res.send({ status: "successful", data })
})
router.get("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const product = await manager.getProductById(id)
    if (!product) return res.status(400).send({ status: `Error no se encontro el producto con id: ${id} ` })
    res.send({ status: "successful", product })
})
router.post("/", async (req, res) => {
    const newProduct = req.body
    await manager.addProduct(newProduct)
    res.send({ status: "success", message: "added product" })
})
router.put("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const newData = req.body
    const productChange = await manager.updateProduct(id, newData)
    if (!productChange) return res.status(400).send({ status: `Error, no se puedo actualizar el producto con id ${id}` })
    res.send({ status: "success", message: `Producto con id ${id} actualizado correctamente` })
})
router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const newProducts = await manager.delateProduct(id)
    if (!newProducts) res.status(400).send({ status: `Error, no se puedo eliminar el producto con id ${id}` })
    res.send({ status: "success", message: `Producto con el id ${id} fue eliminado correctamente` })
})
export default router