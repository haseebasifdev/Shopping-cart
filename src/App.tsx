//Components
import { Drawer, Grid, LinearProgress } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useState } from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";

import Cart from "./cart/Cart";
import Item from "./item/item";

const getProducts = async (): Promise<CartItemType[] | undefined> =>
  await fetch("https://fakestoreapi.com/products").then((data) => data.json());

//types
export type CartItemType = {
  id: number;
  category: string;
  desription: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};
function App() {
  const { data, isLoading, error } = useQuery("products", getProducts);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[] | undefined>(
    [] as CartItemType[]
  );

  const getTotalItems = (items: CartItemType[] | undefined) => {
    return items?.reduce((ack: number, item) => ack + item.amount, 0);
  };
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev?.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        const newItem = prev?.map((item) => {
          return item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
        return newItem;
      }
      return typeof prev === "undefined"
        ? undefined
        : [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    const items = cartItems?.reduce((ack, item) => {
      if (item.id === id) {
        if (item.amount === 1) {
          return ack;
        } else {
          return [...ack, { ...item, amount: item.amount - 1 }];
        }
      } else {
        return [...ack, { ...item }];
      }
    }, [] as CartItemType[]);
    setCartItems(items);
  };
  console.log(cartItems);
  if (isLoading) return <LinearProgress  />;
  if (error) return <h1 className="text-center text-warning">Something went wrong</h1>;
  const myStyle = {
    cursor: "pointer",
  } as React.CSSProperties;
  return (
    <>
      <div className="float-right">
        <Button style={myStyle} onClick={() => setCartOpen(true)}>
          <Badge bg="secondary" className="me-2" color="danger">
            {getTotalItems(cartItems)}
          </Badge>
          <AddShoppingCart />
        </Button>
      </div>
      <div>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            addToCart={handleAddToCart}
            removeFromCard={handleRemoveFromCart}
            cartItems={cartItems}
          />
        </Drawer>
        <Grid container spacing={3}>
          <Row className="mx-2 my-4">
            {data?.map((item) => (
              <Col sm={4} md={3} lg={3} className="p-2" key={item.id}>
                <Item item={item} handleAddToCart={handleAddToCart} />
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    </>
  );
}

export default App;
