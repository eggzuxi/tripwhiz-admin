import React, { useState, useEffect } from 'react';
import { Category, ProductListDTO, SubCategory } from '../../types/product';
import { addProduct, fetchCategories, fetchSubCategories } from '../../api/productAPI';


const ProductAddComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [newProduct, setNewProduct] = useState<ProductListDTO>({
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    cno: 0,
    scno: 0,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleCategoryChange = (cno: number) => {
    setNewProduct({ ...newProduct, cno, scno: 0 });
    fetchSubCategories(cno).then(setSubCategories);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleAddProduct = () => {
    addProduct(newProduct, imageFiles).then(() => {
      alert('Product added successfully');
    });
  };

  return (
    <div>
      <h1>Add Product</h1>
      <input
        type="text"
        name="pname"
        placeholder="Product Name"
        onChange={handleInputChange}
      />
      <textarea
        name="pdesc"
        placeholder="Product Description"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleInputChange}
      />
      <select onChange={(e) => handleCategoryChange(Number(e.target.value))}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.cno} value={cat.cno}>
            {cat.cname}
          </option>
        ))}
      </select>
      {subCategories.length > 0 && (
        <select onChange={(e) => setNewProduct({ ...newProduct, scno: Number(e.target.value) })}>
          <option value="">Select Subcategory</option>
          {subCategories.map((sub) => (
            <option key={sub.scno} value={sub.scno}>
              {sub.sname}
            </option>
          ))}
        </select>
      )}
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default ProductAddComponent;
