import React, { useEffect, useState } from 'react';
import { ProductListDTO } from '../../types/product';
import { fetchProducts } from '../../api/productAPI';
import { useNavigate } from 'react-router-dom';

const ProductListComponent: React.FC = () => {
  const [products, setProducts] = useState<ProductListDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchProducts();
        setProducts(response);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleProductClick = (pno: number) => {
    navigate(`/app/product/read/native/${pno}`);
  };

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.pno}>
              <button onClick={() => handleProductClick(product.pno)}>
                {product.pname} - {product.price}원
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductListComponent;
