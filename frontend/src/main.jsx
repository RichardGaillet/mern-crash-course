import { Provider as ChakraUiProvider } from "./components/ui/provider.jsx"
import { BrowserRouter } from "react-router-dom"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraUiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraUiProvider>
  </StrictMode>
)
