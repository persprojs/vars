import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const subtotal = cart.reduce((total, item) => total + item.Price * item.quantity, 0);
  let shipping = 0;
  if (subtotal <= 20){
    shipping = 2.80;
  } else if (subtotal >= 20 && subtotal <= 49.99){
    shipping = 1.99;
  }
  else if (subtotal >= 50){
    shipping = 0.00;
  }
  const total = subtotal + shipping;

  return (
    <Container className="mt-4" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th style={{ width: '40%' }}>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td style={{ width: '40%' }}>{item.Title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.Price.toFixed(2)}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row className="mt-4">
            <Col className="text-end">
              <p style={{ fontSize: '14px', fontWeight: 'bolder' }}>Subtotal - {cart.length} items: ${subtotal.toFixed(2)}</p>
              <p style={{ fontSize: '14px', fontWeight: 'bolder' }}>Shipping: ${shipping.toFixed(2)}</p>
              <p style={{ fontSize: '14px', fontWeight: 'bolder' }}>Total: USD ${total.toFixed(2)}</p>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col className="text-end">
              <Button variant="primary" onClick={() => window.location.href = '/checkout'}>
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default CartPage;
