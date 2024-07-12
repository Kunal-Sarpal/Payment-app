import { Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import SendMoney from "./pages/SendMoney"

function App() {

  return (
    <div className=""  >
        
        <Routes>
          <Route path={"/signup"} element={<Signup></Signup>}></Route>
          <Route path={"/signin"} element={<Signin></Signin>}></Route>
          <Route path={"/dashboard"} element={<Dashboard></Dashboard>}></Route>
          <Route path={"/send"} element={<SendMoney></SendMoney>}></Route>
          <Route path={"/"} element={<Signup></Signup>}></Route>
        </Routes>
    </div>
  )
}

export default App
