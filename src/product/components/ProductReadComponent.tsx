import React, { useEffect, useState } from "react";
import { ProductReadDTO } from '../../types/product';
import { getOne } from '../../api/productAPI';


interface ProductDetailsProps {
  pno: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ pno }) => {
  const [product, setProduct] = useState<ProductReadDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getOne(pno);
        if (data) setProduct(data);
        else setError("Product not found.");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [pno]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{product?.pname}</h1>
      <p>{product?.pdesc}</p>
      <p>Price: ${product?.price}</p>
      <div>
        {product?.images.map((image, index) => (
          <img
            key={index}
            src={image} // Spring Boot에서 생성한 URL 그대로 사용
            alt={`Product Image ${index + 1}`}
            style={{ width: "200px", height: "auto" }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
