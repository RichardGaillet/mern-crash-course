import { Route, Routes } from "react-router-dom"
import { Box, Container } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import { useColorModeValue } from "./components/ui/color-mode"
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"

const App = () => (
  <Box
    minH={"100vh"}
    bg={useColorModeValue("gray.100", "gray.900")}
  >
    <Navbar />
    <Container
      maxW={"4xl"}
      py={12}
    >
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/create"
          element={<CreatePage />}
        />
      </Routes>
    </Container>
  </Box>
)

export default App
