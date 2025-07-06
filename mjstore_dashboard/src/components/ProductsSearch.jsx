import { useState } from "react";
import axios from "axios";
import { Container, Card, Button, Form, Row, Col, Alert, Image } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

axios.defaults.baseURL = "https://mj-store.onrender.com/api/v1";

export default function ProductSearch() {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!productId.trim()) {
      alert("Please enter a Product ID.");
      return;
    }

    try {
      const res = await axios.get(`/product/get/product/${productId.trim()}`);
      const response = res.data;

      if (response.status !== "successful" || !response.data) {
        throw new Error(response.message || "Product not found");
      }

      setProduct(response.data);
      setError(null);
    } catch (err) {
      setProduct(null);
      setError(err.message);
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow">
        <Card.Body>
          <h2 className="text-center text-success mb-4">Product Search</h2>
          <Form.Group className="input-group mb-4">
            <Form.Control
              type="text"
              placeholder="Enter Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <Button variant="success" onClick={handleSearch}>
              <BsSearch className="me-2" />Search
            </Button>
          </Form.Group>

          {error && <Alert variant="danger">{error}</Alert>}

          {product && (
            <Card className="mt-4">
              <Card.Body>
                <h3 className="text-success">{product.name} ({product.title})</h3>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Color:</strong> {product.color}</p>
                <p><strong>Material:</strong> {product.material}</p>
                <p><strong>Power:</strong> {product.power}</p>
                <p><strong>Power Supply:</strong> {product.power_supply}</p>
                <p><strong>Usage:</strong> {product.usage}</p>
                <p><strong>Description:</strong> {product.description}</p>

                <div className="mt-4">
                  <h5 className="text-success">Images</h5>
                  <Row>
                    {product.image?.map((img, i) => (
                      <Col key={i} xs={6} md={4} className="mb-3">
                        <Image src={img.url} fluid rounded className="shadow-sm" />
                      </Col>
                    ))}
                  </Row>
                </div>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
