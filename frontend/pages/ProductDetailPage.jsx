// src/pages/ProductDetailPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

const product = {
  id: 1,
  name: 'Product 1',
  image: 'https://via.placeholder.com/275x275',
  description: 'This is a great product.',
  dosage: 'One tablet daily',
};

const ProductDetailPage = () => {
  const { id } = useParams();

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
