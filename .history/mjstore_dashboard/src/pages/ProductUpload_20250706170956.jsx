import { useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  BsUpload,
  BsCheckCircleFill,
  BsXCircleFill,
  BsImages,
} from "react-icons/bs";
import { MdCategory, MdInventory } from "react-icons/md";
import { FaRulerCombined, FaTags } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

axios.defaults.baseURL = "https://mj-store.onrender.com/api/v1";

export default function ProductUpload() {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );
    images.forEach((file) => data.append("images", file));

    try {
      await axios.post("/product/product", data);
      setSuccessMsg("Product uploaded successfully!");
      setFormData({});
      setImages([]);
    } catch (err) {
      setErrorMsg("Failed to upload product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow">
        <h3 className="mb-3 text-success d-flex align-items-center">
          <BsUpload className="me-2" /> Upload Product
        </h3>

        {successMsg && (
          <Alert variant="success" className="d-flex align-items-center">
            <BsCheckCircleFill className="me-2" size={20} />
            {successMsg}
          </Alert>
        )}
        {errorMsg && (
          <Alert variant="danger" className="d-flex align-items-center">
            <BsXCircleFill className="me-2" size={20} />
            {errorMsg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <MdInventory className="me-1" />
                  Name
                </Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FaTags className="me-1" />
                  Price
                </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <AiOutlineInfoCircle className="me-1" />
                  Title
                </Form.Label>
                <Form.Control
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <MdCategory className="me-1" />
                  Category
                </Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="hardware">Hardware</option>
                  <option value="tools">Tools</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Control
                  type="text"
                  name="category"
                  placeholder="Or type your own"
                  className="mt-2"
                  value={formData.category || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FaRulerCombined className="me-1" />
                  Dimensions
                </Form.Label>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      name="height"
                      placeholder="Height"
                      value={formData.height || ""}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      name="width"
                      placeholder="Width"
                      value={formData.width || ""}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      name="length"
                      placeholder="Length"
                      value={formData.length || ""}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <BsImages className="me-1" />
                  Images
                </Form.Label>
                <Form.Control type="file" multiple onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  name="color"
                  value={formData.color || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Power</Form.Label>
                <Form.Control
                  name="power"
                  value={formData.power || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Power Supply</Form.Label>
                <Form.Control
                  name="power_supply"
                  value={formData.power_supply || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Material</Form.Label>
                <Form.Control
                  name="material"
                  value={formData.material || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Select
                  name="brand"
                  value={formData.brand || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Brand</option>
                  <option value="Generic">Generic</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Bosch">Bosch</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control
                  type="text"
                  name="brand"
                  placeholder="Or type your own"
                  className="mt-2"
                  value={formData.brand || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Warranty</Form.Label>
                <Form.Control
                  name="warranty"
                  value={formData.warranty || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Usage</Form.Label>
                <Form.Control
                  name="usage"
                  value={formData.usage || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-end">
            <Button
              type="submit"
              variant="success"
              disabled={loading}
              className="px-4"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Uploading...
                </>
              ) : (
                <>
                  <BsUpload className="me-2" />
                  Upload Product
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
