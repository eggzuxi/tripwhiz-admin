import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductReadDTO } from '../../types/product';
import { fetchProductById } from '../../api/productAPI';

const ProductReadComponent: React.FC = () => {
  const { pno } = useParams<{ pno: string }>(); // URL에서 pno 추출
  const [product, setProduct] = useState<ProductReadDTO | null>(null);

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
    </div>
  );
};

export default ProductReadComponent;
