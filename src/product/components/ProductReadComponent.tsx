import React, { useState } from 'react';
import { ProductReadDTO } from '../../types/product';
import { fetchProductById } from '../../api/productAPI';


const ProductReadComponent: React.FC = () => {
  const [productId, setProductId] = useState<number>(0);
  const [product, setProduct] = useState<ProductReadDTO | null>(null);

  const handleFetchProduct = () => {
    fetchProductById(productId).then(setProduct);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter Product ID"
        onChange={(e) => setProductId(Number(e.target.value))}
      />
      <button onClick={handleFetchProduct}>Fetch Product</button>
      {product && (
        <div>
          <h2>{product.pname}</h2>
          <p>{product.pdesc}</p>
          <p>Price: {product.price}₩</p>
        </div>
      )}
    </div>
  );
};

export default ProductReadComponent;
