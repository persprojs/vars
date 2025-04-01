import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from './CartContext';
import { Button } from 'react-bootstrap';
import { API_URL} from '../config/config'; // Import API_URL_FINAL
import '../assets/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 150);
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Fetching product from:', `${API_URL_FINAL}/products/${id}`); // Debugging
        console.log('Product ID:', id);
        const response = await axios.get(`${API_URL_FINAL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error.response ? error.response.data : error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (variant, variantPrice) => {
    if (!product) return;
    const variantProduct = {
      ...product,
      id: `${product.id}-${variant}`,
      Title: `${product.Title} - ${variant}`,
      Price: variantPrice,
      quantity: quantity,
    };
    addToCart(variantProduct);
  };

  const handleAddToCartWithoutVariant = () => {
    if (!product) return;
    const productWithoutVariant = {
      ...product,
      Price: product.Price || 0,
      quantity: quantity,
    };
    addToCart(productWithoutVariant);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4 product-detail-container">
      <h2>{product.Title}</h2>
      <div className="text-center">
        <img src={product.Images} alt={product.Title} className="img-fluid" loading="lazy" />
      </div>
      <p>{product.Description}</p>

      {!product.Variant1 && !product.Variant2 && !product.Variant3 && (
        <div className="text-center">
          <p><strong>Price:</strong> ${product.Price}</p>
        </div>
      )}

      {!product.Variant1 && !product.Variant2 && !product.Variant3 && (
        <div className="mb-3 text-center">
          <label htmlFor="quantity">Quantity:</label>
          <div className="d-flex justify-content-center align-items-center">
            <Button variant="outline-secondary" onClick={decrementQuantity} className="me-2">-</Button>
            <span className="mx-2">{quantity}</span>
            <Button variant="outline-secondary" onClick={incrementQuantity} className="me-2">+</Button>
          </div>
        </div>
      )}

      {!product.Variant1 && !product.Variant2 && !product.Variant3 && (
        <div className="text-center">
          <Button variant="success" onClick={handleAddToCartWithoutVariant} className="mb-3">Add to Cart</Button>
        </div>
      )}

      {(product.Variant1 || product.Variant2 || product.Variant3) && (
        <>
          <h3 className="text-center">Variants</h3>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <ul className="list-unstyled">
                {product.Price && (
                  <li className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Single Item - ${product.Price}</span>
                      <Button variant="success" onClick={() => handleAddToCart('Single Item', product.Price)}>Add to Cart</Button>
                    </div>
                  </li>
                )}
                {['Variant1', 'Variant2', 'Variant3'].map((variantKey) => (
                  product[variantKey] && (
                    <li key={variantKey} className="mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{product[variantKey].split(' $')[0]} - ${parseFloat(product[variantKey].split('$')[1])}</span>
                        <Button variant="success" onClick={() => handleAddToCart(product[variantKey], parseFloat(product[variantKey].split('$')[1]))}>Add to Cart</Button>
                      </div>
                    </li>
                  )
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      <div className="text-right">
        <p><strong>Category:</strong>{"\t"}{product.Category}</p>
        <p><strong>Subcategory:</strong>{"\t"}{product.SubCategory}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
