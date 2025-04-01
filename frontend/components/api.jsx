// api.js
import React from 'react'; // Add this line
import axios from 'axios';
import { API_BASE_URL } from '../config/config';

export const fetchProducts = async (page, category = '', subcategory = '', limit = 20) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products`, {
      params: { page, category, subcategory, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
