import { Routes, Route } from "react-router-dom"
import './App.scss'
import Home from "./pages/home"
import Login from "./pages/login"
import CreatePost from "./pages/createPost"
import NavBar from "./components/NavBar"
import User from "./pages/user"
import UpdatePost from "./pages/updatePost"
import AuthProvider from "./context/Auth"

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/update/:id" element={<UpdatePost />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </AuthProvider>

  )
}

export default App
