import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Row } from 'react-bootstrap';
import './AdminDashboard.css'; // Add custom styles if needed

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-dark text-white vh-100 p-3">
          <h3 className="text-center">Admin Dashboard</h3>
          <ul className="list-unstyled">
            <li><Link to="/dashboard" className="text-white">Dashboard</Link></li>
            <li><Link to="/manage-users" className="text-white">Manage Users</Link></li>
            <li><Link to="/manage-books" className="text-white">Manage Books</Link></li>
            <li><Link to="/settings" className="text-white">Settings</Link></li>
            <li><Link to="/logout" className="text-white">Logout</Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <h2>Welcome to the Admin Dashboard</h2>
          <Row className="my-4">
            {/* Cards for Stats */}
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">150</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="card-title">Total Books</h5>
                  <p className="card-text">200</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="card-title">Pending Requests</h5>
                  <p className="card-text">5</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            {/* Action Cards */}
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="card-title">Add New Book</h5>
                  <p className="card-text">Click to add a new book to the inventory.</p>
                  <Link to="/add-book" className="btn btn-primary">Add Book</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="card-title">View All Users</h5>
                  <p className="card-text">Manage users registered on the platform.</p>
                  <Link to="/manage-users" className="btn btn-primary">View Users</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="card-title">System Settings</h5>
                  <p className="card-text">Manage platform settings.</p>
                  <Link to="/settings" className="btn btn-primary">Go to Settings</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
