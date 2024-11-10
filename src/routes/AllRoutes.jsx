import {  Route, Routes } from "react-router-dom"
import PublicRoutes from "./PublicRoutes"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import PrivateRoutes from "./PrivateRoutes"
import Home from "../components/Home"

const AllRoutes = () => {
  return (
      <Routes>

        <Route element={<PublicRoutes />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>

      </Routes>
  )
}

export default AllRoutes