import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import SidePanel from './components/SidePanel';
import Navbar from './components/Navbar.jsx';
import { CartProvider } from './components/CartContext';
import LoadingSpinner from './components/LoadingSpinner'; // Add a loading spinner component
import './App.css';

// Lazy load components
const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const ProductManager = lazy(() => import('./Admin/ProductManager'));
const CartPage = lazy(() => import('./components/CartPage'));
const CheckoutPage = lazy(() => import('./components/CheckoutPage'));

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleCategorySelect = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Navbar />
          <Header />
          <Banner />
          <div className="d-flex">
            <SidePanel onCategorySelect={handleCategorySelect} />
            <div className="content flex-grow-1">
              {/* Wrap Routes in Suspense for lazy loading */}
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProductList
                        selectedCategory={selectedCategory}
                        selectedSubcategory={selectedSubcategory}
                      />
                    }
                  />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/admin" element={<ProductManager />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route
                    path="/category/:category"
                    element={
                      <ProductList
                        selectedCategory={selectedCategory}
                        selectedSubcategory={selectedSubcategory}
                      />
                    }
                  />
                </Routes>
              </Suspense>
            </div>
          </div>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;