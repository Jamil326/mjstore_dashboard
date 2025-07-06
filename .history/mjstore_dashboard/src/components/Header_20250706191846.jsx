import { Navbar, Container, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";

export default function Header({ setUser, user, toggleSidebar }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Navbar bg="light" className="shadow-sm px-3" expand="lg">
      <Container fluid>
        <Button variant="outline-secondary" className="d-lg-none me-2" onClick={toggleSidebar}>
          <FaBars />
        </Button>
        <Navbar.Brand>MJ Store Admin</Navbar.Brand>
        <Button onClick={handleLogout} className="ms-auto" variant="danger">
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}
