import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductListDTO, ProductReadDTO, Category, SubCategory, ThemeCategory } from '../../types/product';
import { fetchProductById, updateProduct, fetchCategories, fetchSubCategories, fetchThemeCategories } from '../../api/productAPI';

const ProductModifyComponent: React.FC = () => {
  const { pno } = useParams<{ pno: string }>(); // URL에서 pno를 받음
  const navigate = useNavigate();

  // 상태 관리
  const [product, setProduct] = useState<ProductReadDTO | null>(null);
  const [productListDTO, setProductListDTO] = useState<ProductListDTO | null>(null);
  const [imageFiles, setImageFiles] = useState<File[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]); // 카테고리 목록
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]); // 서브카테고리 목록
  const [themeCategories, setThemeCategories] = useState<ThemeCategory[]>([]); // 테마 카테고리 목록
  const [loading, setLoading] = useState<boolean>(true);

  // 카테고리 목록을 로드하는 함수
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    loadCategories();
  }, []);

  // 테마 카테고리 목록을 로드하는 함수
  useEffect(() => {
    const loadThemeCategories = async () => {
      try {
        const themeCategoryData = await fetchThemeCategories();
        setThemeCategories(themeCategoryData);
      } catch (error) {
        console.error('Error fetching theme categories:', error);
      }
    };

    loadThemeCategories();
  }, []);

  // 카테고리 변경 시 서브카테고리 목록 로드
  useEffect(() => {
    if (productListDTO?.category?.cno) {
      const loadSubCategories = async () => {
        try {
          const subCategoryData = await fetchSubCategories(productListDTO.category.cno);
          setSubCategories(subCategoryData);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      };

      loadSubCategories();
    }
  }, [productListDTO?.category?.cno]);

  // pno가 없거나 유효하지 않으면 종료
  useEffect(() => {
    if (!pno || isNaN(Number(pno))) {
      console.error('Invalid product ID:', pno);
      setLoading(false);
      return;
    }

    const loadProduct = async (pno: number) => {
      try {
        const productData = await fetchProductById(pno);
        setProduct(productData);

        // pno 포함하여 DTO 구성
        setProductListDTO({
          pno: Number(pno), // pno 추가
          pname: productData.pname,
          pdesc: productData.pdesc,
          price: productData.price,
          category: productData.category || { cno: 0, cname: '' },
          subCategory: productData.subCategory || { scno: 0, sname: '' },
          tnos: productData.tnos || [],
          attachFiles: productData.attachFiles || [],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    loadProduct(Number(pno)); // pno를 숫자로 변환하여 전달
  }, [pno]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFiles(Array.from(event.target.files));
    }
  };

  const handleUpdateProduct = async () => {
    if (productListDTO && pno) {
      try {
        console.log('Sending product update request with the following data:');
        console.log('Product List DTO:', productListDTO); // pno가 포함되었는지 확인
        console.log('Image Files:', imageFiles);

        const updatedProductPno = await updateProduct(Number(pno), productListDTO, imageFiles);
        console.log('Product updated:', updatedProductPno);
        navigate('/product/list');
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>Modify Product</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            value={productListDTO?.pname || ''}
            onChange={(e) => setProductListDTO({ ...productListDTO!, pname: e.target.value })}
          />
        </div>
        <div>
          <label>Product Description</label>
          <textarea
            value={productListDTO?.pdesc || ''}
            onChange={(e) => setProductListDTO({ ...productListDTO!, pdesc: e.target.value })}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={productListDTO?.price || ''}
            onChange={(e) => setProductListDTO({ ...productListDTO!, price: +e.target.value })}
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={productListDTO?.category?.cno || ''}
            onChange={(e) =>
              setProductListDTO({
                ...productListDTO!,
                category: categories.find((category) => category.cno === +e.target.value) || { cno: 0, cname: '' },
              })
            }
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.cno} value={category.cno}>
                {category.cname}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>SubCategory</label>
          <select
            value={productListDTO?.subCategory?.scno || ''}
            onChange={(e) =>
              setProductListDTO({
                ...productListDTO!,
                subCategory: subCategories.find((subCategory) => subCategory.scno === +e.target.value) || { scno: 0, sname: '' },
              })
            }
          >
            <option value="">Select a subcategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.scno} value={subCategory.scno}>
                {subCategory.sname}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Theme Categories</label>
          <select
            value={(productListDTO?.tnos || []).map(String)}
            onChange={(e) =>
              setProductListDTO({
                ...productListDTO!,
                tnos: Array.from(e.target.selectedOptions, (option) => +option.value),
              })
            }
            multiple
          >
            {themeCategories.map((themeCategory) => (
              <option key={themeCategory.tno} value={themeCategory.tno}>
                {themeCategory.tname}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Images</label>
          <input type="file" multiple onChange={handleImageChange} />
        </div>
        <div>
          <button type="button" onClick={handleUpdateProduct}>
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductModifyComponent;
