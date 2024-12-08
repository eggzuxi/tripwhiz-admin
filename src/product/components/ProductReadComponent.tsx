import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가

import { ProductReadDTO } from '../../types/product';
import { fetchProductById } from '../../api/productAPI';

const ProductReadComponent: React.FC = () => {
  const { pno } = useParams<{ pno: string }>(); // URL에서 pno 추출
  const [product, setProduct] = useState<ProductReadDTO | null>(null);
  const navigate = useNavigate(); // useNavigate 추가

  const loadProduct = async () => {
    if (!pno) {
      console.error('pno is undefined');
      return;
    }

    try {
      const productData = await fetchProductById(Number(pno));
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleEditClick = () => {
    // 수정 화면으로 이동
    if (pno) {
      navigate(`/product/update/${pno}`);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [pno]);

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div>
      <h1>{product.pname}</h1>
      <p>{product.pdesc}</p>
      <p>Price: {product.price}</p>
      <button onClick={handleEditClick}>Edit Product</button> {/* 수정 버튼 추가 */}
    </div>
  );
};

export default ProductReadComponent;
