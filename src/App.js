import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RoleList from "./components/roles/RoleList";
import AddRole from "./components/roles/AddRole";
import RoleDetail from "./components/roles/RoleDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/roles/add" element={<AddRole />} />
          <Route path="/roles/:id" element={<RoleDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
