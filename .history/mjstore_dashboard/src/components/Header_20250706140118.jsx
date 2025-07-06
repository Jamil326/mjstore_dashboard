// src/components/Header.jsx
import { Navbar, Container, Button } from 'react-bootstrap';

export default function Header({ setUser }) {
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Navbar bg="white" expand="lg" className="border-bottom shadow-sm">
      <Container fluid>
        <Navbar.Brand className="fw-bold">Dashboard</Navbar.Brand>
        <Button variant="danger" onClick={logout}>Logout</Button>
      </Container>
    </Navbar>
  );
}
