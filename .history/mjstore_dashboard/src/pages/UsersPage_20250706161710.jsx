import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Table, Spinner, Alert } from "react-bootstrap";

axios.defaults.baseURL = "https://mj-store.onrender.com/api/v1";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
          const token = localStorage.
        const res = await axios.get("/user/users");
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
      <Card className="shadow">
        <Card.Body>
          <h2 className="text-success mb-4">All Users</h2>

          {loading && <Spinner animation="border" variant="success" />}
          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && users.length > 0 && (
            <Table striped bordered hover responsive>
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {!loading && users.length === 0 && !error && (
            <p>No users found.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
