import { Outlet } from 'react-router-dom';

function OrderIndex() {
  return (
    <div>
      Order Index
      <Outlet></Outlet>
    </div>
  );
}

export default OrderIndex;