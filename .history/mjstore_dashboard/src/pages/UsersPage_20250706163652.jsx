import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Table,
  Spinner,
  Alert,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import {
  FiUsers,
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiMapPin,
  FiHome,
} from "react-icons/fi";

axios.defaults.baseURL = "https://mj-store.onrender.com/api/v1";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/user/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container className="my-5">
      <Card className="shadow border-0">
        <Card.Body>
          <Row className="mb-4">
            <Col>
              <h3 className="text-success d-flex align-items-center gap-2">
                <FiUsers /> All Registered Users
              </h3>
            </Col>
          </Row>

          {loading && (
            <div className="text-center py-4">
              <Spinner animation="border" variant="success" />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && users.length > 0 && (
            <Table striped bordered hover responsive className="align-middle">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th><FiUser className="me-1" /> Name</th>
                  <th><FiMail className="me-1" /> Email</th>
                  <th><FiPhone className="me-1" /> Mobile</th>
                  <th><FiShield className="me-1" /> Role</th>
                  <th><FiHome className="me-1" /> Address</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  const address = user.address || {};
                  return (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>
                        <Badge bg={user.role === "admin" ? "danger" : "secondary"}>
                          {user.role}
                        </Badge>
                      </td>
                      <td>
                        {address.street && <div><strong>Street:</strong> {address.street}</div>}
                        {address.landmark && <div><strong>Landmark:</strong> {address.landmark}</div>}
                        {address.city && <div><strong>City:</strong> {address.city}</div>}
                        {address.state && <div><strong>State:</strong> {address.state}</div>}
                        {address.pin && (
                          <div>
                            <FiMapPin className="me-1" />
                            <strong>PIN:</strong> {address.pin}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}

          {!loading && users.length === 0 && !error && (
            <div className="text-center text-muted">No users found.</div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
