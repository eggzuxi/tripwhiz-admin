import React, { useEffect, useState } from 'react';
import { Category, ProductListDTO, SubCategory, ThemeCategory } from '../../types/product';
import {
  createProduct,
  fetchCategories,
  fetchSubCategories,
  fetchThemeCategories,
} from '../../api/productAPI';

const AddComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [themeCategories, setThemeCategories] = useState<ThemeCategory[]>([]);
  const [product, setProduct] = useState<ProductListDTO>({
    pname: '',
    price: 0,
    pdesc: '',
    category: {} as Category,
    subCategory: {} as SubCategory,
    tnos: [],
    attachFiles: [],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load categories and theme categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
      } catch (err) {
        setError('Failed to load categories.');
      }
    };

    const loadThemeCategories = async () => {
      try {
        const themeData = await fetchThemeCategories();
        setThemeCategories(themeData);
      } catch (err) {
        setError('Failed to load theme categories.');
      }
    };

    loadCategories();
    loadThemeCategories();
  }, []);

  // Handle category change
  const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories.find(
      (category) => category.cno === parseInt(e.target.value, 10)
    );
    setProduct({ ...product, category: selectedCategory || ({} as Category), subCategory: {} as SubCategory });
    setSubCategories([]);

    if (selectedCategory) {
      try {
        const subCategoryData = await fetchSubCategories(selectedCategory.cno);
        setSubCategories(subCategoryData);
      } catch (err) {
        setError('Failed to load subcategories.');
      }
    }
  };

  // Handle sub-category change
  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubCategory = subCategories.find(
      (subCategory) => subCategory.scno === parseInt(e.target.value, 10)
    );
    setProduct({ ...product, subCategory: selectedSubCategory || ({} as SubCategory) });
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle file changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(files);
    }
  };

  // Handle theme selection
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedThemes = Array.from(e.target.selectedOptions).map((option) => parseInt(option.value, 10));
    setProduct({ ...product, tnos: selectedThemes });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Extract necessary fields for submission
    const formattedProduct = {
      ...product,
      cno: product.category?.cno || null,
      scno: product.subCategory?.scno || null,
      category: undefined,
      subCategory: undefined,
    };

    try {
      const response = await createProduct(formattedProduct, imageFiles);
      alert(`Product created successfully with ID: ${response}`);
    } catch (err) {
      setError('Failed to create product.');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="pname"
          placeholder="Product Name"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleInputChange}
        />
        <textarea
          name="pdesc"
          placeholder="Description"
          onChange={handleInputChange}
        />
        <select name="category" onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.cno} value={category.cno}>
              {category.cname}
            </option>
          ))}
        </select>
        <select
          name="subCategory"
          onChange={handleSubCategoryChange}
          disabled={!subCategories.length}
        >
          <option value="">Select SubCategory</option>
          {subCategories.map((subCategory) => (
            <option key={subCategory.scno} value={subCategory.scno}>
              {subCategory.sname}
            </option>
          ))}
        </select>
        <select multiple onChange={handleThemeChange}>
          {themeCategories.map((theme) => (
            <option key={theme.tno} value={theme.tno}>
              {theme.tname}
            </option>
          ))}
        </select>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddComponent;
