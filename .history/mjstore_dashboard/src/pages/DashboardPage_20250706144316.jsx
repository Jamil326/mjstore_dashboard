import { useState } from "react";
import axios from "axios";
import { Row, Col, Card, Form, Button, Table } from "react-bootstrap";

axios.defaults.baseURL = "https://mj-store.onrender.com/api/v1";

export default function DashboardPage() {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [productResult, setProductResult] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const uploadProduct = async () => {
    const formData = new FormData();
    formData.append("file", productImage);
    formData.append("name", productName);

    try {
      await axios.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Product uploaded successfully");
    } catch (err) {
      alert("Upload failed");
    }
  };

  const fetchOrders = async () => {
    const res = await axios.get("/admin/orders");
    setOrders(res.data.orders || []);
  };

  const fetchUsers = async () => {
    const res = await axios.get("/user/users");
    setUsers(res.data.users || []);
  };

  const searchProductById = async () => {
    try {
      const res = await axios.get(`/product/get/product/${searchId}`);
      setProductResult(res.data.product);
    } catch {
      setProductResult(null);
      alert("Product not found");
    }
  };

  return (
    <div>
      <h2 className="mb-4">Quick Dashboard</h2>

      <Card className="mb-4 p-3">
        <h5>Upload Product</h5>
        <Form className="row g-2">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              type="file"
              onChange={(e) => setProductImage(e.target.files[0])}
            />
          </Col>
          <Col md={4}>
            <Button onClick={uploadProduct} variant="primary">
              Upload
            </Button>
          </Col>
        </Form>
      </Card>

      <Card className="mb-4 p-3">
        <h5>Search Product by ID</h5>
        <Form className="row g-2">
          <Col md={9}>
            <Form.Control
              type="text"
              placeholder="Enter Product ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Button onClick={searchProductById} variant="info">
              Search
            </Button>
          </Col>
        </Form>
        {productResult && (
          <div className="mt-3">
            <strong>Name:</strong> {productResult.name}<br />
            <img src={productResult.image} alt="Product" height={100} />
          </div>
        )}
      </Card>

      <Row>
        <Col md={6}>
          <Card className="p-3 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>Orders</h5>
              <Button size="sm" onClick={fetchOrders}>Fetch</Button>
            </div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td>{o._id}</td>
                    <td>{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>Users</h5>
              <Button size="sm" onClick={fetchUsers}>Fetch</Button>
            </div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
