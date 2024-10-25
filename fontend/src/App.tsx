import { HashRouter } from "react-router-dom"
import { GlobalProvider } from "./contexts/globalContext"
import { AppRoutes } from "./routes/AppRoutes"

function App() {
  return (
    <>
      <GlobalProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </GlobalProvider>
    </>
  )
}

export default App
