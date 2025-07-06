import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

const limit = 10;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (currentPage) => {
    try {
      const res = await axios.get(
        `https://mj-store.onrender.com/api/v1/product/get/product?page=${currentPage}&limit=${limit}`
      );

      const productData = res.data.data.getProduct || [];
      const totalCount = res.data.data.totalCount || productData.length;

      setProducts(productData);
      setTotalProducts(totalCount);
    } catch (err) {
      alert("Failed to load products");
    }
  };

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <Container className="my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h4 className="text-success mb-0">Products</h4>
        <span className="text-muted">Total: {totalProducts}</span>
      </div>

      {/* Product Cards */}
      <Row>
        {products.map((product) => (
          <Col xs={12} sm={6} lg={4} key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {/* Prev / Next Buttons */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button
            variant="outline-primary"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            ⬅️ Previous
          </Button>
          <span className="align-self-center fw-semibold">Page {page} of {totalPages}</span>
          <Button
            variant="outline-primary"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next ➡️
          </Button>
        </div>
      )}
    </Container>
  );
}
