import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

const limit = 10;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          products.length < totalProducts
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, products, totalProducts]
  );

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (currentPage) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://mj-store.onrender.com/api/v1/product/get/product?page=${currentPage}&limit=${limit}`
      );

      const productData = res.data.data.getProduct || [];
      const totalCount = res.data.data.totalCount || productData.length;

      setProducts((prev) => [...prev, ...productData]);
      setTotalProducts(totalCount);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Failed to load products");
    }
  };

  return (
    <Container className="my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h4 className="text-success mb-0">Products</h4>
        <span className="text-muted">Total: {totalProducts}</span>
      </div>

      {/* Product Cards */}
      <Row>
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          return (
            <Col xs={12} sm={6} lg={4} key={product._id} ref={isLast ? lastProductRef : null}>
              <ProductCard product={product} />
            </Col>
          );
        })}
      </Row>

      {/* Loader */}
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </Container>
  );
}
