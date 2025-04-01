import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { API_URL } from '../config/config'; // Import API_URL_FINAL
import '../assets/ProductList.css';

const ProductList = ({ selectedCategory = "homeopathy", selectedSubcategory = "adel tinctures" }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [hoveredTooltip, setHoveredTooltip] = useState(false);

  // Debug: Log initial props
  console.log(`Initial props - Category: ${selectedCategory}, Subcategory: ${selectedSubcategory}`);

  // Reset page to 1 when category or subcategory changes
  useEffect(() => {
    console.log(`Category/Subcategory changed. Resetting page to 1.`);
    setPage(1);
    setProducts([]);
    setTotalPages(1);
    setError(null);
  }, [selectedCategory, selectedSubcategory]);

  // Fetch products when page or category/subcategory changes
  useEffect(() => {
    const fetchProducts = async () => {
      console.log(`Fetching products for page: ${page}, category: ${selectedCategory}, subcategory: ${selectedSubcategory}`);
      setLoading(true);
      setError(null);

      try {
        // Log API_URL_FINAL to verify its value
        console.log('API_URL:', API_URL);

        const response = await axios.get(`${API_URL}/products`, {  // Use API_URL_FINAL
          params: {
            page,
            limit: 100,
            category: selectedCategory,
            subcategory: selectedSubcategory,
          },
        });

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { products: newProducts, totalPages: newTotalPages } = response.data;

        console.log(`Fetched ${newProducts.length} products for page ${page}. Total pages: ${newTotalPages}`);
        setProducts(newProducts);
        setTotalPages(newTotalPages);
      } catch (error) {
        console.error('Error loading products:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, selectedCategory, selectedSubcategory]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      console.log(`Changing page from ${page} to ${newPage}`);
      setPage(newPage);
    } else {
      console.log(`Invalid page change requested: ${newPage}`);
    }
  };

  return (
    <div className="product-list-container">
      {/* Page Information at the Top */}
      <div className="page-info-top">
        <h2>Product List</h2>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}

      {totalPages > 1 && <br />} {/* Line break after the div */}

      {/* Product Grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card"
            onMouseEnter={() => setHoveredTooltip(true)}
            onMouseLeave={() => setHoveredTooltip(false)}
          >
            {/* Tooltip for complete title */}
            {hoveredTooltip && (
              <div className="tooltip">
                {product.Title}
              </div>
            )}

            <Link to={`/product/${product._id}`} className="product-link">
              <div className="product-image">
                <img src={product.Images} alt={product.Title} />
              </div>
              <div className="product-details">
                <h3>{product.Title}</h3>
                <p className="price">${product.Price}</p>
              </div>
            </Link>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Loading and Error Messages */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && products.length === 0 && (
        <p>No products found for the selected category/subcategory.</p>
      )}

      {/* Pagination Controls at the Bottom */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
