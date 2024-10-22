import { BrowserRouter } from "react-router-dom"
import { GlobalProvider } from "./contexts/globalContext"
import { AppRoutes } from "./routes/AppRoutes"

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
