import { BrowserRouter, Route, Routes } from "react-router-dom"
import { GlobalProvider } from "./contexts/globalContext"
import { Campanias, Login, LoginAdmin, Register, RegisterAdmin } from "./pages"
import { CandidatosPorCampania } from "./pages/CandidatosPorCampania"

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Admin/" element={<LoginAdmin />} />
            <Route path="/Admin/login" element={<LoginAdmin />} />
            <Route path="/Admin/register" element={<RegisterAdmin />} />
            <Route path="/Campanias" element={<Campanias />} />
            <Route path="/Campanias/:idCampania" element={<CandidatosPorCampania />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
