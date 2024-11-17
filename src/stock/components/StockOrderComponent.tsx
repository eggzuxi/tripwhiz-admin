import { useEffect, useState } from 'react';
import axios from 'axios';

const StockOrderComponent = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // API를 호출하여 발주 목록 조회
    axios.get('/api/stock/order')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('발주 목록을 불러오는 데 실패했습니다:', error);
      });
  }, []);

  return (
    <div>
      <h1>발주 목록</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.name} - 수량: {order.quantity} (발주됨)
          </li>
        ))}
      </ul>
    </div>
  );
};


export default StockOrderComponent;