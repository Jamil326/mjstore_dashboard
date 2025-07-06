import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  Card,
  Button,
  Pagination,
} from "react-bootstrap";
import { BsBoxSeam, BsSearch } from "react-icons/bs";

axios.defaults.baseURL = "https://mj-store.onrender.com/api/v1";

export default function OrdersDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 5;

  const goToSearchPage = () => navigate("/searchpage");

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const fetchOrders = async (page) => {
    try {
      const res = await axios.get(`/admin/orders?page=${page}&limit=${limit}`);
      const { data, totalOrders } = res.data;
      setOrders(data || []);
      setTotalOrders(totalOrders || 0);
    } catch (error) {
      alert("Failed to fetch orders");
    }
  };

  const totalPages = Math.ceil(totalOrders / limit);

  return (
    <Container className="my-4">
      <Card className="p-3 shadow-sm">
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
          <h4 className="text-success m-0">
            <BsBoxSeam className="me-2" />
            Orders Dashboard
          </h4>
          <div className="d-flex flex-column flex-sm-row gap-2 align-items-start align-items-sm-center">
            <span className="text-muted">Total Orders: {totalOrders}</span>
            <Button
              variant="success"
              onClick={goToSearchPage}
              className="d-flex align-items-center"
            >
              <BsSearch className="me-2" /> Find Product by ID
            </Button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="table-responsive">
          <Table bordered hover className="align-middle text-nowrap">
            <thead className="table-success">
              <tr>
                <th>Order ID</th>
                <th>User Details</th>
                <th>Product Details</th>
                <th>Total Amount</th>
                <th>Payment Info</th>
                <th>Status</th>
                <th>Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      <strong>Name:</strong> {order.user.name} <br />
                      <strong>Email:</strong> {order.user.email} <br />
                      <strong>Mobile:</strong> {order.user.mobile}
                    </td>
                    <td>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="mb-2">
                          <strong>ID:</strong> {item.product._id} <br />
                          <strong>Name:</strong> {item.product.name} <br />
                          <strong>Price:</strong> ₹{item.product.price} <br />
                          <strong>Qty:</strong> {item.quantity} <br />
                          <strong>Total:</strong> ₹{item.totalValue}
                        </div>
                      ))}
                    </td>
                    <td>₹{order.totalAmount.toFixed(2)}</td>
                    <td>
                      <strong>Method:</strong> {order.paymentMethod} <br />
                      <strong>Status:</strong> {order.paymentStatus}
                    </td>
                    <td>{order.orderStatus}</td>
                    <td>
                      {order.shippingAddress.street},{" "}
                      {order.shippingAddress.landmark},<br />
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} -{" "}
                      {order.shippingAddress.pin}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="justify-content-center mt-3">
            <Pagination.Prev
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
            <Pagination.Next
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            />
          </Pagination>
        )}
      </Card>
    </Container>
  );
}
