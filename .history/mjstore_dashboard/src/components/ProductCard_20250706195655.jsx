import { Card, Button } from "react-bootstrap";

export default function ProductCard({ product }) {
  return (
    <Card className="mb-3 shadow-sm">
      {product.image && (
        <Card.Img
          variant="top"
          src={product.image[0].url}
          alt={product.name}
          style={{ objectFit: "cover", height: "200px" }}
        />
      )}
      <Card.Body>
        <Card.Title className="text-primary">{product.name}</Card.Title>
        <Card.Text className="mb-2">
          <strong>ID:</strong> {product._id}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Category:</strong> {product.category || "N/A"}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Price:</strong> ₹{product.price}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Stock:</strong> {product.countInStock}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Description:</strong> {product.description}
        </Card.Text>

        <div className="d-flex gap-2">
          <Button variant="primary" size="sm">Edit</Button>
          <Button variant="danger" size="sm">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
