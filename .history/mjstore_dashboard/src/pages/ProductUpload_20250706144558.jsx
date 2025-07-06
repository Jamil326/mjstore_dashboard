import { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

axios.defaults.baseURL = "https://mj-store.onrender.com/api/v1";

export default function ProductUpload() {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setImages([...files]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    images.forEach((file) => data.append("images", file));

    try {
      await axios.post("/product/product", data);
      alert("Product uploaded successfully");
    } catch (err) {
      alert("Failed to upload product");
    }
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow">
        <h2 className="mb-4">Upload Product</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control name="category" onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Dimensions</Form.Label>
                <Form.Control type="number" name="height" placeholder="Height" onChange={handleChange} className="mb-2" />
                <Form.Control type="number" name="width" placeholder="Width" onChange={handleChange} className="mb-2" />
                <Form.Control type="number" name="length" placeholder="Length" onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Images</Form.Label>
                <Form.Control type="file" multiple onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control name="color" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Power</Form.Label>
                <Form.Control name="power" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Power Supply</Form.Label>
                <Form.Control name="power_supply" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Material</Form.Label>
                <Form.Control name="material" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control name="brand" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Warranty</Form.Label>
                <Form.Control name="warranty" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Usage</Form.Label>
                <Form.Control name="usage" onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="success">Upload Product</Button>
        </Form>
      </Card>
    </Container>
  );
}
