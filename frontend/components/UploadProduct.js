import React, { useState } from 'react';
import { API_BASE_URL } from '../config/config.js';
import axios from 'axios';

const UploadProduct = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [tags, setTags] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('tags', tags);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/products/upload`, formData);
      console.log(response.data);
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Products CSV</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="file" onChange={handleFileChange} className="form-control-file" />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" value={category} onChange={handleCategoryChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="subcategory">Subcategory:</label>
          <input type="text" id="subcategory" value={subcategory} onChange={handleSubcategoryChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags:</label>
          <input type="text" id="tags" value={tags} onChange={handleTagsChange} className="form-control" />
          <small className="form-text text-muted">Enter tags separated by commas.</small>
        </div>
        <button type="submit" className="btn btn-primary mt-2">Upload</button>
      </form>
    </div>
  );
};

export default UploadProduct;
