import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard"; // adjust path if needed

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://mj-store.onrender.com/api/v1/product/products");
      setProducts(res.data || []);
    } catch (err) {
      alert("Failed to load products");
    }
  };

  return (
    <Container className="my-4">
      <h4 className="text-success mb-4">Products</h4>
      <Row>
        {products.map(product => (
          <Col xs={12} md={6} lg={4} key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
