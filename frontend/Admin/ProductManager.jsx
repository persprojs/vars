import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/config';

const ProductManager = () => {
  const [searchQuery, setSearchQuery] = useState({
    title: '',
    category: '',
    subCategory: '',
  });
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Convert wildcard pattern to regex
  const wildcardToRegex = (pattern) => {
    const regexPattern = pattern.replace(/\*|%/g, '.*');
    return new RegExp(`^${regexPattern}$`, 'i');
  };

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('[ProductManager] Fetching products with query:', searchQuery);
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        params: {
          title: searchQuery.title,
          category: searchQuery.category,
          subCategory: searchQuery.subCategory,
        },
      });
      console.log('[ProductManager] API Response:', response.data);

      let filteredProducts = response.data;
      if (searchQuery.title) {
        const regex = wildcardToRegex(searchQuery.title);
        filteredProducts = filteredProducts.filter((product) =>
          regex.test(product.Title)
        );
      } else {
        if (searchQuery.category) {
          filteredProducts = filteredProducts.filter(
            (product) => product.Category.toLowerCase() === searchQuery.category.toLowerCase()
          );
        }
        if (searchQuery.subCategory) {
          filteredProducts = filteredProducts.filter(
            (product) => product.SubCategory.toLowerCase() === searchQuery.subCategory.toLowerCase()
          );
        }
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error('[ProductManager] Error fetching products:', error.response || error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change for search form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
    console.log('[ProductManager] Updated search query:', searchQuery);
  };

  // Handle input change for product fields
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
    console.log(`[ProductManager] Updated product at index ${index}:`, updatedProducts[index]);
  };

  // Update a single product
  const handleUpdate = async (id, updatedProduct) => {
    try {
      console.log(`[ProductManager] Updating product with ID ${id}:`, updatedProduct);
      const response = await axios.put(`${API_BASE_URL}/api/products/${id}`, updatedProduct);
      console.log('[ProductManager] Product updated:', response.data);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('[ProductManager] Error updating product:', error);
      alert('Failed to update product. Please try again.');
    }
  };

  // Update all products
  const handleUpdateAll = async () => {
    try {
      console.log('[ProductManager] Updating all products:', products);
      const response = await axios.put(`${API_BASE_URL}/api/products`, products);
      console.log('[ProductManager] All products updated:', response.data);
      alert('All products updated successfully!');
    } catch (error) {
      console.error('[ProductManager] Error updating products:', error);
      alert('Failed to update products. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2>Product Manager</h2>
      <form onSubmit={handleSearch}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title</label>
          <input
            type="text"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            id="title"
            name="title"
            value={searchQuery.title}
            onChange={handleInputChange}
            placeholder="Search by title (e.g., R* drops or R% drops)"
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '5px' }}>Category</label>
          <input
            type="text"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            id="category"
            name="category"
            value={searchQuery.category}
            onChange={handleInputChange}
            placeholder="Search by category"
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="subCategory" style={{ display: 'block', marginBottom: '5px' }}>SubCategory</label>
          <input
            type="text"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            id="subCategory"
            name="subCategory"
            value={searchQuery.subCategory}
            onChange={handleInputChange}
            placeholder="Search by subcategory"
          />
        </div>
        <button
          type="submit"
          style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {products.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Search Results</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ width: '20%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Title</th>
                <th style={{ width: '15%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Description</th>
                <th style={{ width: '15%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Short Description</th>
                <th style={{ width: '8%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Price</th>
                <th style={{ width: '10%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Images</th>
                <th style={{ width: '8%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Variant1</th>
                <th style={{ width: '8%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Variant2</th>
                <th style={{ width: '8%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Variant3</th>
                <th style={{ width: '10%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Category</th>
                <th style={{ width: '10%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>SubCategory</th>
                <th style={{ width: '10%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Tags</th>
                <th style={{ width: '8%', padding: '10px', border: '1px solid #ddd', backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }} title={product.Title}>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      value={product.Title || ''}
                      onChange={(e) => handleProductChange(index, 'Title', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }} title={product.Description}>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      value={product.Description || ''}
                      onChange={(e) => handleProductChange(index, 'Description', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }} title={product.ShortDescription}>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      value={product.ShortDescription || ''}
                      onChange={(e) => handleProductChange(index, 'ShortDescription', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      value={product.Price || ''}
                      onChange={(e) => handleProductChange(index, 'Price', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }} title={product.Images}>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      value={product.Images || ''}
                      onChange={(e) => handleProductChange(index, 'Images', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }} title={product.Variant1}>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      value={product.Variant1 || ''}
                      onChange={(e) => handleProductChange(index, 'Variant1', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }} title={product.Variant2}>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      value={product.Variant2 || ''}
                      onChange={(e) => handleProductChange(index, 'Variant2', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }} title={product.Variant3}>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      value={product.Variant3 || ''}
                      onChange={(e) => handleProductChange(index, 'Variant3', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }} title={product.Category}>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      value={product.Category || ''}
                      onChange={(e) => handleProductChange(index, 'Category', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }} title={product.SubCategory}>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      value={product.SubCategory || ''}
                      onChange={(e) => handleProductChange(index, 'SubCategory', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }} title={product.Tags}>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      value={product.Tags || ''}
                      onChange={(e) => handleProductChange(index, 'Tags', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }} title="Update Product">
                    <button
                      style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}
                      onClick={() => handleUpdate(product._id, product)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer', marginTop: '20px' }}
            onClick={handleUpdateAll}
          >
            Update All
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductManager;