import React from 'react';

const OrderTrigger = ({ order, onAccept }) => {
  return (
    <div className="order-trigger">
      <p>Новый заказ: {order.id}</p>
      <button onClick={() => onAccept(order.id)}>Принять</button>
    </div>
  );
};
export default OrderTrigger;