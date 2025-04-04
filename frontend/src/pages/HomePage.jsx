import { useEffect } from "react"
import { Link } from "react-router-dom"
import { SimpleGrid, Text, VStack } from "@chakra-ui/react"
import PageTitle from "../components/PageTitle"
import ProductCard from "../components/ProductCard"
import { useProductStore } from "../store/product"

const HomePage = () => {
  const { fetchProducts, products } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <VStack gap={8}>
      <PageTitle>Current products 🚀</PageTitle>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        gap={10}
        w={"full"}
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </SimpleGrid>
      {!products.length && (
        <Text
          fontSize={"xl"}
          textAlign={"center"}
          fontWeight={"bold"}
          color={"gray.500"}
        >
          No products found 😢{" "}
          <Link to={"/create"}>
            <Text
              as={"span"}
              color={"blue.500"}
              _hover={{ textDecoration: "underline" }}
            >
              Create a product
            </Text>
          </Link>
        </Text>
      )}
    </VStack>
  )
}

export default HomePage
