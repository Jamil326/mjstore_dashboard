import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard"; // adjust path if needed

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
      const allProducts = res.data.data.getProduct || [];
      const total = res.data.data.totalCount || allProducts.length;

      setProducts(allProducts);
      setTotalProducts(total);
    } catch (err) {
      alert("Failed to load products");
    }
  };

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h4 className="text-success mb-0">Products</h4>
        <span className="text-muted">Total: {totalProducts}</span>
      </div>

      <Row>
        {products.map((product) => (
          <Col xs={12} md={6} lg={4} key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-4">
          <Button
            variant="outline-success"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <Button
            variant="outline-success"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </div>
      )}
    </Container>
  );
}
