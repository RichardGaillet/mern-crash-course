import { useState } from "react"
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  Button,
  CloseButton,
  Dialog,
  Portal,
  VStack,
  Input,
} from "@chakra-ui/react"
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6"
import { useProductStore } from "../store/product"
import { useColorModeValue } from "./ui/color-mode"
import { toaster, Toaster } from "./ui/toaster"

const ProductCard = ({ product }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [updatedProduct, setUpdatedProduct] = useState(product)

  const { _id, name, price, image } = product
  const textColor = useColorModeValue("gray.600", "gray.200")
  const bg = useColorModeValue("white", "gray.800")

  const { deleteProduct, updateProduct } = useProductStore()

  const handleDeleteProduct = async () => {
    toaster.create({
      description: "Are you sure?",
      type: "error",
      action: {
        label: `Yes, I want to delete ${name}!!!`,
        type: "error",
        onClick: async () => {
          const { success, message } = await deleteProduct(_id)
          if (success)
            toaster.create({
              description: message,
              type: success ? "success" : "error",
            })
        },
      },
    })
  }

  const handleUpdateProduct = async (id, updatedProduct) => {
    const { success, message } = await updateProduct(id, updatedProduct)
    if (success) {
      toaster.create({
        description: message,
        type: success ? "success" : "error",
      })
      setDialogOpen(false)
    }
  }

  return (
    <>
      <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
      >
        <Image
          src={image}
          alt={name}
          h={48}
          w={"full"}
          objectFit={"cover"}
        />
        <Box p={4}>
          <Heading
            as="h3"
            size="md"
            mb={2}
          >
            {name}
          </Heading>
          <Text
            fontWeight={"bold"}
            fontSize={"xl"}
            color={textColor}
            mb={4}
          >
            ${price}
          </Text>
          <HStack gap={2}>
            <IconButton
              onClick={() => setDialogOpen(true)}
              colorPalette="blue"
            >
              <FaRegPenToSquare />
            </IconButton>
            <IconButton
              onClick={handleDeleteProduct}
              colorPalette="red"
            >
              <FaRegTrashCan />
            </IconButton>
          </HStack>
        </Box>
      </Box>
      <Dialog.Root
        modal
        open={dialogOpen}
        onOpenChange={(e) => setDialogOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Update Product</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <VStack gap={4}>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() =>
                    handleUpdateProduct(product._id, updatedProduct)
                  }
                >
                  Update
                </Button>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="ghost"
                    // onClick={onClose}
                  >
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <Toaster />
    </>
  )
}

export default ProductCard
