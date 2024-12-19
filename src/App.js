import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";

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
import JobList from './components/JobList';
import SearchJobs from './components/SearchJobs';
import EditJob from './components/EditJob';
import JobDetails from './components/JobDetails';
import CreateApplication from './components/CreateApplication';

function App() {
  return (
    <Router>
      <div className="App">
        {/* The Header component is inside the Router context */}
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
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
          <Route path="/add-list" element={<JobList />} />
          <Route path="/search" element={<SearchJobs />} />
          <Route path="/edit-job/:id" element={<EditJob />} />
          <Route path="/job-details/:id" element={<JobDetails />} />
          <Route path="/apply/:id" element={<CreateApplication />} />
        </Routes>

        {/* The Footer is inside the Router context */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
