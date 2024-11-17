import { useEffect, useState } from 'react';
import axios from 'axios';


const StockCheckComponent = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // API를 호출하여 재고 목록 조회
    axios.get('/api/stock/list')
      .then((response) => {
        setStocks(response.data);
      })
      .catch((error) => {
        console.error('재고 목록을 불러오는 데 실패했습니다:', error);
      });
  }, []);

  return (
    <div>
      <h1>재고 목록</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            {stock.name} - 수량: {stock.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockCheckComponent