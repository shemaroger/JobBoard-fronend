import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import RoleList from "./components/roles/RoleList";
import AddRole from "./components/roles/AddRole";
import RoleDetail from "./components/roles/RoleDetail";
import AdminDashboard from "./components/AdminDashboard";
import TwoFactor from './components/TwoFactor';
import RoleManagement from './components/RoleManagement';
import ManageUsers from './components/ManageUsers';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/roles/add" element={<AddRole />} />
          <Route path="/roles/:id" element={<RoleDetail />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/two-factor" element={<TwoFactor />} />
          <Route path="/admin/roles" element={<RoleManagement />} />
          <Route path="/admin/user" element={<ManageUsers />} />
          <Route path="/admin/user/create" element={<CreateUser />} /> {/* Corrected JSX syntax */}
          <Route path="/admin/user/edit/:id" element={<EditUser />} />  {/* Corrected JSX syntax */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
