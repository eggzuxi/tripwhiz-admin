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

  // Log function for debugging
  const logState = () => {
    console.log('Product State:', product);
    console.log('Image Files:', imageFiles);
    console.log('Categories:', categories);
    console.log('SubCategories:', subCategories);
    console.log('Theme Categories:', themeCategories);
  };

  useEffect(() => {
    // Load categories
    const loadCategories = async () => {
      try {
        console.log('Fetching categories...');
        const categoryData = await fetchCategories();
        setCategories(categoryData);
        console.log('Fetched Categories:', categoryData);
      } catch (err) {
        console.error('Failed to load categories', err);
        setError('Failed to load categories.');
      }
    };

    // Load theme categories
    const loadThemeCategories = async () => {
      try {
        console.log('Fetching theme categories...');
        const themeData = await fetchThemeCategories();
        setThemeCategories(themeData);
        console.log('Fetched Theme Categories:', themeData);
      } catch (err) {
        console.error('Failed to load theme categories', err);
        setError('Failed to load theme categories.');
      }
    };

    loadCategories();
    loadThemeCategories();
  }, []);

  const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories.find(
      (category) => category.cno === parseInt(e.target.value, 10)
    );

    console.log('Selected Category:', selectedCategory);

    setProduct({ ...product, category: selectedCategory || ({} as Category), subCategory: {} as SubCategory });
    setSubCategories([]);

    if (selectedCategory) {
      try {
        console.log(`Fetching subcategories for category ID: ${selectedCategory.cno}`);
        const subCategoryData = await fetchSubCategories(selectedCategory.cno);
        setSubCategories(subCategoryData);
        console.log('Fetched SubCategories:', subCategoryData);
      } catch (err) {
        console.error('Failed to load subcategories', err);
        setError('Failed to load subcategories.');
      }
    }
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubCategory = subCategories.find(
      (subCategory) => subCategory.scno === parseInt(e.target.value, 10)
    );
    console.log('Selected SubCategory:', selectedSubCategory);

    setProduct({ ...product, subCategory: selectedSubCategory || ({} as SubCategory) });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Input Changed - ${name}:`, value);
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      console.log('Files Selected:', files);
      setImageFiles(files);
    }
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedThemes = Array.from(e.target.selectedOptions).map((option) => parseInt(option.value, 10));
    console.log('Selected Themes:', selectedThemes);
    setProduct({ ...product, tnos: selectedThemes });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting Form with Product:', product);
    console.log('Image Files:', imageFiles);
    logState();

    try {
      const response = await createProduct(product, imageFiles);
      console.log('Product Created with ID:', response);
      alert(`Product created successfully with ID: ${response}`);
    } catch (err) {
      console.error('Error creating product:', err);
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
