import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductListDTO, ProductReadDTO, Category, SubCategory } from '../../types/product';
import { fetchProductById, updateProduct, fetchCategories, fetchSubCategories } from '../../api/productAPI';

const ProductModifyComponent: React.FC = () => {
  const { pno } = useParams<{ pno: string }>();
  const navigate = useNavigate();

  // 상태 관리
  const [product, setProduct] = useState<ProductReadDTO | null>(null);
  const [productListDTO, setProductListDTO] = useState<ProductListDTO | null>(null);
  const [imageFiles, setImageFiles] = useState<File[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]); // 카테고리 목록
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]); // 서브카테고리 목록
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

  useEffect(() => {
    let isMounted = true; // 컴포넌트가 마운트 되어 있는지 확인하는 변수

    if (!pno) return;

    const loadProduct = async (pno: number) => {
      try {
        const productData = await fetchProductById(pno);
        if (isMounted) {
          setProduct(productData);
          setProductListDTO({
            pname: productData.pname,
            pdesc: productData.pdesc,
            price: productData.price,
            category: productData.category || { cno: 0, cname: '' }, // 초기값 설정
            subCategory: productData.subCategory || { scno: 0, sname: '' }, // 초기값 설정
            tnos: [], // 테마 카테고리는 필요시 수정
          });
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        if (isMounted) setLoading(false);
      }
    };

    loadProduct(Number(pno));

    return () => {
      isMounted = false;
    };
  }, [pno]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFiles(Array.from(event.target.files));
    }
  };

  const handleUpdateProduct = async () => {
    if (productListDTO) {
      try {
        const updatedProductPno = await updateProduct(Number(pno), productListDTO, imageFiles);
        console.log('Product updated:', updatedProductPno);
        // 수정된 후 상품 목록 페이지로 리디렉션
        navigate('/product/list'); // 상품 목록 페이지로 이동
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
