import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { CartContext } from './CartContext';

const CustomCheckoutForm = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('creditCard'); // Default to credit card
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    // Implement payment processing logic here
    // Send cardNumber, expirationDate, and cvc to your server endpoint
    // After successful payment, clear the cart
    clearCart();
  };

  return (
    <Form onSubmit={handlePayment}>
      <Form.Group>
        <Form.Check 
          type="radio" 
          label="Pay with Credit Card" 
          name="paymentMethod" 
          value="creditCard" 
          checked={paymentMethod === 'creditCard'} 
          onChange={() => setPaymentMethod('creditCard')} 
        />
        <Form.Check 
          type="radio" 
          label="Pay with PayPal" 
          name="paymentMethod" 
          value="paypal" 
          checked={paymentMethod === 'paypal'} 
          onChange={() => setPaymentMethod('paypal')} 
        />
      </Form.Group>

      {paymentMethod === 'creditCard' ? (
        <div>
          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter card number" 
              value={cardNumber} 
              onChange={(e) => setCardNumber(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="MM/YY" 
              value={expirationDate} 
              onChange={(e) => setExpirationDate(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>CVC</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter CVC" 
              value={cvc} 
              onChange={(e) => setCvc(e.target.value)} 
              required 
            />
          </Form.Group>
        </div>
      ) : (
        <div id="paypal-button-container"></div>
      )}

      <Button variant="primary" type="submit">
        Submit Payment
      </Button>
    </Form>
  );
};

export default CustomCheckoutForm;
