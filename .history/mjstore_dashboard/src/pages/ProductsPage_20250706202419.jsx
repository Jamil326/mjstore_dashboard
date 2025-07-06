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
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
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
      const totalCount = res.data.data.totalCount || 0;

      setProducts((prev) => [...prev, ...productData]); // ✅ FIXED
      setTotalProducts(totalCount);
      setHasMore((prev) => products.length + productData.length < totalCount);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load products:", err);
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h4 className="text-success mb-0">Products</h4>
        <span className="text-muted">Total: {totalProducts}</span>
      </div>

      {/* Product Grid */}
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

      {/* No More Products */}
      {!hasMore && !loading && products.length > 0 && (
        <div className="text-center text-muted my-3">No more products to load</div>
      )}
    </Container>
  );
}
