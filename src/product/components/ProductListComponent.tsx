import React, { useEffect, useState } from 'react';
import { PageRequestDTO, ProductListDTO } from '../../types/product';
import { fetchProducts } from '../../api/productAPI';


const ProductListComponent: React.FC = () => {
  const [products, setProducts] = useState<ProductListDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageRequest, setPageRequest] = useState<PageRequestDTO>({ page: 1, size: 10 });

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchProducts(pageRequest);
        console.log('API Response:', response); // 응답 데이터 확인
        setProducts(response.dtoList || []); // dtoList를 상태에 설정
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [pageRequest]);

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
              {product.pname} - {product.price}원
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductListComponent;
