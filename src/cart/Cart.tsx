import React from "react";
import { Button } from "react-bootstrap";
import { CartItemType } from "../App";
type Props = {
  cartItems: CartItemType[] | undefined;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCard: (id: number) => void;
};
const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCard }) => {
  const total = () => {
    return cartItems
      ?.reduce((ack: number, item) => ack + item.amount * item.price, 0)
      .toFixed(2);
  };
  return (
    <div className="px-4">
      <h2 className="text-secondary">Your Shopping Cart</h2>
      {cartItems?.length === 0 ? "No Items in the Cart" : null}
      {cartItems?.map((item) => (
        <div key={item.id} className="py-3">
          <span>
            <h3>
              Price:{" "}
              <span className="text-info">
                {(item.amount * item.price).toFixed(2)}
              </span>
              $
            </h3>
            <Button variant="dark" onClick={() => removeFromCard(item.id)}>
              -
            </Button>
            <span className="px-2 text-info">{item.amount}</span>
            <Button variant="dark" onClick={() => addToCart(item)}>
              +
            </Button>
          </span>
          <span className="mx-4">
            <img src={item.image} width={50} height={60} />
          </span>
        </div>
      ))}
      <h2>
        Total: <span className="text-info">{total()}</span> $
      </h2>
    </div>
  );
};
export default Cart;
