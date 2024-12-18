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
import JobseekerDashboard from './components/JobseekerDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import JobCategoryForm from './components/JobCategoryForm';
import JobCategoryManagement from './components/JobCategoryManagement';
import JobManagement from './components/JobManagement';
import JobDetails from './components/JobDetails';
import JobList from './components/JobList';
import SearchJobs from './components/SearchJobs';
import EditJob from './components/EditJob';
 


function App() {
  return (
    <Router>
      <div className="App">
        {/* The Header component is now inside the Router context */}
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
          <Route path="/admin/user/create" element={<CreateUser />} />
          <Route path="/admin/user/edit/:id" element={<EditUser />} />
          <Route path="/user-dashboard" element={<JobseekerDashboard />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/admin/job-category-form" element={<JobCategoryForm />} />
          <Route path="/admin/job-category" element={<JobCategoryManagement />} />
          <Route path="/job/add" element={<JobManagement />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/add-list" element={<JobList />} />
          <Route path="/search" element={<SearchJobs />} />
          <Route path="/edit-job/:id" element={<EditJob/>}/>
        </Routes>
        
        {/* The Footer is inside the Router context */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
