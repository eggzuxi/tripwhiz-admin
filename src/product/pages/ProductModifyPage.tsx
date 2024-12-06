import React from 'react';
import ProductModifyComponent from '../components/ProductModifyComponent';
import { number } from 'prop-types';

function ProductModifyPage() {
  return (
    <div>
      <ProductModifyComponent productId={1}/>
    </div>
  );
}

export default ProductModifyPage;