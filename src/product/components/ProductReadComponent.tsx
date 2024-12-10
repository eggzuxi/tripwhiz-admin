import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api/productAPI';

const ProductReadComponent: React.FC = () => {
  const { pno } = useParams<{ pno: string }>(); // URL에서 pno 값을 가져옵니다.
  const [product, setProduct] = useState<any>(null); // 초기값은 null로 설정
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!pno) {
        setError('Product ID is required');
        return;
      }

      try {
        const productData = await fetchProductById(parseInt(pno)); // pno를 숫자로 변환
        console.log('Fetched Product Data:', productData); // 로그 추가: 제품 데이터 확인
        if (productData) {
          productData.attachFiles = productData.attachFiles || [];
          setProduct(productData);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError('Error fetching product');
        console.error('Error fetching product:', err); // 에러 로그 추가
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [pno]);

  // 로딩 중일 때
  if (isLoading) {
    return <div>Loading product...</div>;
  }

  // 에러가 있을 때
  if (error) {
    return <div>{error}</div>;
  }

  // 상품이 없을 때
  if (!product) {
    return <div>No product found</div>;
  }

  // 로그 추가: 카테고리와 테마 데이터 확인
  console.log('Product Category:', product.category);
  console.log('Product SubCategory:', product.subCategory);
  console.log('Product Theme Categories:', product.tnos);

  return (
    <div>
      <h2>{product.pname}</h2>
      <p>{product.pdesc}</p>
      <p>Price: {product.price}</p>

      {/* 카테고리 값이 있는 경우에만 출력 */}
      {product.category && (
        <div>
          <strong>Category:</strong> {product.category.cname}
        </div>
      )}

      {/* 서브카테고리 값이 있는 경우에만 출력 */}
      {product.subCategory && (
        <div>
          <strong>SubCategory:</strong> {product.subCategory.sname}
        </div>
      )}

      {/* 테마 카테고리 출력 */}
      {product.tnos && product.tnos.length > 0 && (
        <div>
          <strong>Theme Categories:</strong>
          <ul>
            {product.tnos.map((themeId: number, index: number) => (
              <li key={index}>Theme Category ID: {themeId}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 첨부 파일들 출력 */}
      {product.attachFiles && product.attachFiles.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <ul>
            {product.attachFiles.map((file: any, index: number) => (
              <li key={index}>
                {/* 이미지가 있을 경우 이미지를 서빙하는 URL을 통해 보여줌 */}
                <img
                  src={`http://localhost:8082/api/upload/product/${file.fileName}`}
                  alt={file.fileName}
                  width="100"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductReadComponent;
