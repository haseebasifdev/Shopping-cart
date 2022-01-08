//types
import { CartItemType } from "../App";
import React from "react";
import { Button, Card } from "react-bootstrap";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};
const myStyle = {
  dispaly: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  width: "100%",
  border: "1px solid lightblue",
  borderRadius: "20px",
  height: "100%",
} as React.CSSProperties;
const item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <>
    <Card key={item.id}>
      <Card.Img
        variant="top"
        
        width={50}
        height={400}
        src={item.image}
        alt="product-Image"
      />
      <Card.Body>
        <p>
          {item.title.length > 10 ? item.title.substring(0, 15) : item.title}...
        </p>
        <Card.Text>${item.price}</Card.Text>
      </Card.Body>
      <Button
        className="text-center"
        onClick={() => handleAddToCart(item)}
      >
        <strong className="cursor-pointer">Add to Cart</strong>
      </Button>
    </Card>
  </>
);

export default item;
