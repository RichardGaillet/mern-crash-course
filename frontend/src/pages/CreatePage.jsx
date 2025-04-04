import { useState } from "react"
import { Box, Button, Input, VStack } from "@chakra-ui/react"
import PageTitle from "../components/PageTitle.jsx"
import { useColorModeValue } from "../components/ui/color-mode"
import { toaster, Toaster } from "../components/ui/toaster"
import { useProductStore } from "../store/product.js"

const CreatePage = () => {
  const newProductInitialState = Object.freeze({
    name: "",
    price: "",
    image: "",
  })

  const [newProduct, setNewProduct] = useState(newProductInitialState)

  const { createProduct } = useProductStore()

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct)
    if (success) setNewProduct(newProductInitialState)
    toaster.create({
      description: message,
      type: success ? "success" : "error",
    })
  }

  return (
    <VStack gap={8}>
      <Toaster />
      <PageTitle>Create New Product ➕</PageTitle>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        p={6}
        rounded={"lg"}
        shadow={"md"}
      >
        <VStack gap={4}>
          <Input
            placeholder="Product name"
            name="name"
            value={newProduct.name}
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value })
            }}
          />
          <Input
            placeholder="Price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={(e) => {
              setNewProduct({ ...newProduct, price: e.target.value })
            }}
          />
          <Input
            placeholder="Image URL"
            name="image"
            value={newProduct.image}
            onChange={(e) => {
              setNewProduct({ ...newProduct, image: e.target.value })
            }}
          />
          <Button
            onClick={handleAddProduct}
            w={"full"}
          >
            Add Product
          </Button>
        </VStack>
      </Box>
    </VStack>
  )
}

export default CreatePage
