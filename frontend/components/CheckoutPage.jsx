import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { Container, Row, Col, Form, Button, Card, Table, Alert } from 'react-bootstrap';
import '../assets/CheckoutPage.css';

const CheckoutPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [discountCode, setDiscountCode] = useState('');
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [error, setError] = useState(null);

  const subtotal = cart.reduce((total, item) => total + item.Price * item.quantity, 0);
  console.log('Subtotal:', subtotal);

  // Calculate shipping
  let shipping = 0.00;
  if (subtotal > 0 && subtotal <= 20) {
    shipping = 2.80;
  } else if (subtotal > 20 && subtotal <= 49.99) {
    shipping = 1.99;
  } else if (subtotal >= 50) {
    shipping = 0.00;
  }
  console.log('Shipping:', shipping);

  // Calculate total
  const total = subtotal + shipping;
  console.log('Total:', total);

  // Load PayPal SDK
  useEffect(() => {
    if (document.querySelector('script[src*="paypal.com/sdk/js"]')) {
      setPaypalLoaded(true); // Script already loaded
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=Adpwj-385ZlnmOJBEz5Nwr2Ki50ahiuNAWlQ7c62zSSMig-ASIVwmKvAcDptlnfSYp5ecAW-CjBIeDEE&currency=USD`;
    script.onload = () => setPaypalLoaded(true);
    script.onerror = () => setError('Failed to load PayPal SDK. Please try again later.');
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      setPaypalLoaded(false);
    };
  }, []);

  // Render PayPal button
  useEffect(() => {
    if (paypalLoaded && window.paypal) {
      try {
        window.paypal
          .Buttons({
            style: {
              size: 'responsive',
              shape: 'rect',
              color: 'gold',
              layout: 'vertical',
              label: 'paypal',
            },
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: total.toFixed(2),
                      currency_code: 'USD',
                    },
                    description: `Purchase of ${cart.length} items`,
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                alert(`Payment completed by ${details.payer.name.given_name}`);
                clearCart();
              });
            },
            onError: (err) => {
              console.error('PayPal error:', err);
              setError('Payment failed. Please try again.');
            },
          })
          .render('#paypal-button-container');
      } catch (err) {
        console.error('Error rendering PayPal button:', err);
        setError('Failed to initialize PayPal. Please try again.');
      }
    }

    return () => {
      const paypalButtonContainer = document.getElementById('paypal-button-container');
      if (paypalButtonContainer) {
        paypalButtonContainer.innerHTML = ''; // Cleanup
      }
    };
  }, [paypalLoaded, cart, total, clearCart]);

  return (
    <Container className="mt-4">
      <h2>Checkout</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={7}>
          <Card className="mb-3 customer-details-card">
            <Card.Body>
              <h5>Contact</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Email me with news and offers"
                  className="mb-3"
                />
              </Form>
              <h5>Shipping Address</h5>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter first name" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter last name" required />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Company (optional)</Form.Label>
                  <Form.Control type="text" placeholder="Enter company" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter address" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Apartment, suite, etc. (optional)</Form.Label>
                  <Form.Control type="text" placeholder="Enter apartment or suite" />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" placeholder="Enter city" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Postal Code (optional)</Form.Label>
                      <Form.Control type="text" placeholder="Enter postal code" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="tel" placeholder="Enter phone number" required />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Text me with news and offers"
                  className="mb-3"
                />
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="mb-3 order-summary-card">
            <Card.Body>
              <h5>Order Summary</h5>
              {cart.map((item, index) => (
                <div key={index} className="mb-3 d-flex justify-content-between align-items-center">
                  <p className="mb-0">
                    <strong>{item.Title}</strong> - ${item.Price.toFixed(2)} x {item.quantity}
                  </p>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    &times;
                  </Button>
                </div>
              ))}
              <Form.Group className="mb-3">
                <Form.Label>Discount Code or Gift Card</Form.Label>
                <Row>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="Enter discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Button variant="outline-secondary" className="w-100">
                      Apply
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
              <Table borderless>
                <tbody>
                  <tr>
                    <td>Subtotal - {cart.length} items</td>
                    <td className="text-end">${subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td className="text-end">${shipping.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td><strong>Total</strong></td>
                    <td className="text-end"><strong>USD ${total.toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </Table>

              <div id="paypal-button-container"></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;