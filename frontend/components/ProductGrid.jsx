import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../config/config'; // Import API_URL_FINAL
import '../assets/ProductGrid.css';

const ProductGrid = ({ selectedCategory, selectedSubcategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Fetching products with category:', selectedCategory, 'and subcategory:', selectedSubcategory);
    const fetchProducts = async () => {
      try {
        console.log('Fetching from:', `${API_URL}/products`); // Debugging
        const response = await axios.get(`${API_URL}/products`, {
          params: {
            category: selectedCategory,
            subcategory: selectedSubcategory,
          },
        });
        console.log('Fetched products:', response.data.products);  // Log products
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [selectedCategory, selectedSubcategory]);

  return (
    <div className="container mt-4 product-grid-container">
      {products.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`} className="grid-item-link">
          <div className="grid-item">
            <img src={product.Images} alt={product.Title} />
            <h3>{product.Title}</h3>
            <p>${product.Price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
