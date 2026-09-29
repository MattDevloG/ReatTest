import { Home } from "./Home"
import { Register } from "./Register"
import { Login } from "./Login"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from "axios"

function App() {
  axios.defaults.withCredentials = true
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <Login /> }></Route>
          <Route path="/" element={ <Home /> }></Route>
          <Route path="/register" element={ <Register /> }></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
