import React, { useState, useEffect } from 'react';
import { ProductListDTO } from '../../types/product';
import { deleteProduct, fetchProductList } from '../../api/productAPI';


const ProductListComponent: React.FC = () => {
  const [products, setProducts] = useState<ProductListDTO[]>([]);

  useEffect(() => {
    fetchProductList().then(setProducts);
  }, []);

  const handleDelete = (pno: number) => {
    deleteProduct(pno).then(() => {
      setProducts(products.filter((product) => product.pno !== pno));
    });
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.pno}>
            {product.pname} - {product.price}₩
            <button onClick={() => handleDelete(product.pno)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListComponent;
