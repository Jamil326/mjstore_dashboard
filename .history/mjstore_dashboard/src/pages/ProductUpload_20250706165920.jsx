import { useState, useEffect } from "react";
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
  Image,
} from "react-bootstrap";
import {
  BsUpload,
  BsImage,
  BsBoxSeam,
  BsCurrencyRupee,
  BsTags,
  BsBookmark,
} from "react-icons/bs";

axios.defaults.baseURL = "https://mj-store.onrender.com/api/v1";

export default function ProductUpload() {
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const [catRes, brandRes] = await Promise.all([
        axios.get("/product/categories"),
        axios.get("/product/brands"),
      ]);
      setCategories(catRes.data.data || []);
      setBrands(brandRes.data.data || []);
    } catch {
      setCategories([]);
      setBrands([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setImages([...files]);
      const filePreviews = [...files].map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(filePreviews);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({});

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );
    images.forEach((file) => data.append("images", file));

    try {
      const token = localStorage.getItem("token");
      await axios.post("/product/product", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "Product uploaded successfully!" });
      setFormData({});
      setImages([]);
      setPreviews([]);
      e.target.reset();
    } catch (err) {
      setAlert({ type: "danger", message: "Upload failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow">
        <h2 className="mb-4 text-success">
          <BsUpload className="me-2" />
          Upload Product
        </h2>

        {alert.message && (
          <Alert variant={alert.type} onClose={() => setAlert({})} dismissible>
            {alert.message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <BsBoxSeam className="me-2" /> Name
                </Form.Label>
                <Form.Control name="name" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <BsCurrencyRupee className="me-2" /> Price
                </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <BsTags className="me-2" /> Category
                </Form.Label>
                <Form.Select
                  name="category"
                  onChange={handleChange}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Dimensions</Form.Label>
                <Form.Control
                  type="number"
                  name="height"
                  placeholder="Height"
                  onChange={handleChange}
                  className="mb-2"
                />
                <Form.Control
                  type="number"
                  name="width"
                  placeholder="Width"
                  onChange={handleChange}
                  className="mb-2"
                />
                <Form.Control
                  type="number"
                  name="length"
                  placeholder="Length"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <BsImage className="me-2" /> Images
                </Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
                <Row className="mt-3">
                  {previews.map((src, i) => (
                    <Col xs={6} md={4} key={i} className="mb-2">
                      <Image src={src} fluid rounded />
                    </Col>
                  ))}
                </Row>
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
                <Form.Label>
                  <BsBookmark className="me-2" /> Brand
                </Form.Label>
                <Form.Select
                  name="brand"
                  onChange={handleChange}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select brand
                  </option>
                  {brands.map((brand, i) => (
                    <option key={i} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Form.Select>
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

          <div className="text-end">
            <Button type="submit" variant="success" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
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
