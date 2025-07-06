import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

export default function Header({ setUser, user }) {
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom shadow-sm">
      <Container fluid>
        <Navbar.Brand className="fw-bold d-flex align-items-center text-success">
          <FaTachometerAlt className="me-2" />
          MJ Store Admin
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {user?.name && (
              <Nav.Link disabled className="text-dark fw-semibold me-3">
                <FaUserCircle className="me-1" />
                {user.name}
              </Nav.Link>
            )}
            <Button variant="outline-danger" size="sm" onClick={logout}>
              <FaSignOutAlt className="me-1" />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
