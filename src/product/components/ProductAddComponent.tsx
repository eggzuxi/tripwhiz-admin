import React, { useState, useEffect } from 'react';
import { Category, SubCategory, ProductListDTO, ThemeCategory } from '../../types/product';
import { fetchCategories, fetchSubCategories, fetchThemes, addProduct } from '../../api/productAPI';

const ProductAddComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [themes, setThemes] = useState<ThemeCategory[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<number[]>([]); // 테마 ID 저장
  const [newProduct, setNewProduct] = useState<ProductListDTO>({
    pno: 0,
    pname: '',
    pdesc: '',
    price: 0,
    cno: 0,
    scno: 0,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // 카테고리 데이터 가져오기
  useEffect(() => {
    fetchCategories().then(setCategories);
    fetchThemes().then(setThemes); // 테마 데이터 가져오기
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

  const handleThemeToggle = (tno: number) => {
    if (selectedThemes.includes(tno)) {
      setSelectedThemes(selectedThemes.filter((id) => id !== tno));
    } else {
      setSelectedThemes([...selectedThemes, tno]);
    }
  };

  const handleAddProduct = () => {
    const productData = {
      ...newProduct,
      themes: selectedThemes, // 선택한 테마 ID 리스트 추가
    };

    addProduct(productData, imageFiles).then(() => {
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

      {/* 테마 선택 */}
      <h3>Select Themes</h3>
      {themes.length > 0 ? (
        themes.map((theme) => (
          <label key={theme.tno} style={{ display: 'block', margin: '5px 0' }}>
            <input
              type="checkbox"
              value={theme.tno}
              checked={selectedThemes.includes(theme.tno)}
              onChange={() => handleThemeToggle(theme.tno)}
            />
            {theme.tname}
          </label>
        ))
      ) : (
        <p>No themes available</p>
      )}

      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default ProductAddComponent;
