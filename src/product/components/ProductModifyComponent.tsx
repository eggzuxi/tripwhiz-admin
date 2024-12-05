import React, { useState, useEffect } from 'react';
import { Category, ProductListDTO, SubCategory } from '../../types/product';
import { fetchCategories, fetchProductById, fetchSubCategories, modifyProduct } from '../../api/productAPI';

const ProductModifyComponent: React.FC<{ productId: number }> = ({ productId }) => {
  const [product, setProduct] = useState<ProductListDTO | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchProductById(productId).then(setProduct);
    fetchCategories().then(setCategories);
  }, [productId]);

  const handleCategoryChange = (cno: number) => {
    if (product) {
      setProduct({ ...product, cno, scno: 0 });
      fetchSubCategories(cno).then(setSubCategories);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (product) {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleModifyProduct = () => {
    if (product) {
      modifyProduct(productId, product, imageFiles).then(() => {
        alert('Product modified successfully');
      });
    }
  };

  return (
    <div>
      {product && (
        <>
          <h1>Modify Product</h1>
          <input
            type="text"
            name="pname"
            placeholder="Product Name"
            value={product.pname}
            onChange={handleInputChange}
          />
          <textarea
            name="pdesc"
            placeholder="Product Description"
            value={product.pdesc}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleInputChange}
          />
          <select onChange={(e) => handleCategoryChange(Number(e.target.value))} value={product.cno}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.cno} value={cat.cno}>
                {cat.cname}
              </option>
            ))}
          </select>
          {subCategories.length > 0 && (
            <select
              onChange={(e) => setProduct({ ...product, scno: Number(e.target.value) })}
              value={product.scno}
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((sub) => (
                <option key={sub.scno} value={sub.scno}>
                  {sub.sname}
                </option>
              ))}
            </select>
          )}
          <input type="file" multiple onChange={handleFileChange} />
          <button onClick={handleModifyProduct}>Modify Product</button>
        </>
      )}
    </div>
  );
};

export default ProductModifyComponent;
