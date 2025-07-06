// src/components/Header.jsx
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export default function Header({ setUser }) {
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom shadow-sm">
      <Container fluid>
        <Navbar.Brand className="fw-bold d-flex align-items-center">
          <i className="bi bi-speedometer2 me-2"></i>
          Admin Dashboard
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Link disabled className="d-none d-lg-inline me-3">
              <i className="bi bi-person-circle me-1"></i> Admin
            </Nav.Link>
            <Button variant="outline-danger" size="sm" onClick={logout}>
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
