import React, { useState, useContext, useEffect, useRef } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { CartContext } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/Header.css';

const Header = () => {
  const { cart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);
  const inactivityTimerRef = useRef(null); // Ref for the inactivity timer

  // Debounced search API call
  const handleSearchChange = (e) => {
    const query = e.target.value; // Allow spaces
    setSearchQuery(query);

    if (timeoutId) clearTimeout(timeoutId);

    setTimeoutId(setTimeout(async () => {
      if (!query) {
        setSearchResults([]);
        return;
      }

      try {
        // Hardcoded API endpoint for predictive search
        const response = await axios.get(`http://localhost:3003/api/products/search`, {
          params: { q: query }
        });
        setSearchResults(response.data.products);
        startInactivityTimer(); // Start the inactivity timer when results are displayed
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      }
    }, 300));
  };

  // Start the inactivity timer
  const startInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current); // Clear existing timer

    inactivityTimerRef.current = setTimeout(() => {
      setSearchResults([]); // Clear search results
      setSearchQuery(''); // Clear search query
    }, 10000); // 10 seconds
  };

  // Reset the inactivity timer on activity
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current); // Clear existing timer
    startInactivityTimer(); // Restart the timer
  };

  // Clear search results when a product is selected
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchResults([]); // Clear search results
    setSearchQuery(''); // Clear search query
  };

  // Clear the inactivity timer when the component unmounts
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Calculate cart totals
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.Price || 0) * item.quantity, 0);

  return (
    <Navbar expand="lg" className="header custom-bg-bluish-green">
      <Navbar.Brand href="/">Dr. Reckeweg</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        {/* Cart Section */}
        <Link to="/cart" className="d-flex align-items-center me-3 text-decoration-none">
          <div id="cart-icon">
            <i className="fa fa-shopping-cart me-2"></i>
            <span id="cart-count" className="me-2">{totalItems}</span>
            <span id="cart-total">${totalPrice.toFixed(2)}</span>
          </div>
        </Link>
        
        {/* Checkout Button */}
        <Link to="/checkout" className="me-3">
          <Button variant="primary">Checkout</Button>
        </Link>

        {/* Search Bar */}
        <Form className="d-flex position-relative">
          <FormControl
            type="text"
            placeholder="Search products..."
            className="custom-search mr-2"
            value={searchQuery}
            onChange={(e) => {
              handleSearchChange(e);
              resetInactivityTimer(); // Reset the inactivity timer on typing
            }}
            onFocus={resetInactivityTimer} // Reset the inactivity timer on focus
          />
          <Button variant="outline-success">Search</Button>

          {/* Predictive Results */}
          {searchQuery && (
            <div className="predictive-search-results">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <div
                    key={product._id}
                    className="search-result-item"
                    onClick={() => {
                      handleProductClick(product._id); // Handle product click
                      resetInactivityTimer(); // Reset the inactivity timer
                    }}
                  >
                    <div className="search-result-title">
                      {product.Title.split(new RegExp(`(${searchQuery})`, 'gi')).map((part, i) =>
                        part.toLowerCase() === searchQuery.toLowerCase() ? 
                        <mark key={i}>{part}</mark> : 
                        part
                      )}
                    </div>
                    <div className="search-result-description">
                      {product.Description?.substring(0, 100)}...
                    </div>
                  </div>
                ))
              ) : (
                <div className="search-result-item">No results found</div>
              )}
            </div>
          )}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;