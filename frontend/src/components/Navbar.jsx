import { Link } from "react-router-dom"
import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react"
import { FaRegMoon, FaRegSquarePlus, FaSun } from "react-icons/fa6"
import { useColorMode } from "../components/ui/color-mode"

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container
      maxW={"1140px"}
      px={4}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
          textAlign={"center"}
        >
          <Link to={"/"}>Product store 🛒</Link>
        </Text>
        <HStack
          gap={4}
          alignItems={"center"}
        >
          <Button asChild={true}>
            <Link to={"/create"}>
              <FaRegSquarePlus />
            </Link>
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <FaRegMoon /> : <FaSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
