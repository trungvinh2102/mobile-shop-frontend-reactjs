import React, { useEffect, useState } from 'react';
import { getOrdersByCustomer, cancalOrderByCustomer } from '../../services/Api';
import { Link, useParams } from 'react-router-dom';
import { formatPrice } from '../../shared/ultils';
import { format } from 'date-fns';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getOrdersByCustomer(id)
      .then(({ data }) => {
        setOrders(data.data.docs);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const clickCancelOrder = async (orderId) => {
    console.log("clickCancelOrder ~ orderId:", orderId);
    try {
      const result = await cancalOrderByCustomer(orderId);
      console.log("clickCancelOrder ~ result:", result);
      // Cập nhật trạng thái đơn hàng trong state
      setOrders((prevOrders) =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: 0, is_delete: true } : order
        )
      );
      console.log('Đơn hàng đã bị hủy:', result);
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error);
    }
  };

  return (
    <>
      {/* Cart */}
      <div id="my-cart" className="order-form">
        <div className="row">
          <div className="cart-nav-item col-lg-6 col-md-7 col-sm-12">Đơn hàng của bạn</div>
          <div className="cart-nav-item col-lg-6 col-md-5 col-sm-12">Tổng tiền</div>
        </div>
        <form method="post">
          {
            orders.map((order, index) => (
              <div key={index} className="cart-item row">
                <div className="cart-thumb col-lg-6 col-md-7 col-sm-12">
                  Đơn hàng đã mua vào ngày: <span className="text-secondary">{formatDate(order.createdAt)}</span>
                  <p>Mã Đơn (MĐ): {order._id}</p>
                </div>
                <div className="cart-price col-lg-3 col-md-2 col-sm-12">
                  <b>{formatPrice(order?.totalPrice)} đ</b>
                </div>
                <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
                  <Link to={`/OrderDetails-${order._id}`} type="button" className="mb-1 btn btn-outline-dark">
                    Chi tiết đơn hàng
                  </Link>
                  {order.status === 1 && <button type="button" className="mb-1 btn btn-success">Đơn đã giao</button>}
                  {order.status === 2 && (
                    <>
                      <button type='button' onClick={() => clickCancelOrder(order._id)} className='btn btn-online-danger'>
                        Huỷ đơn
                      </button>
                      <button type="button" className="btn btn-warning">Đơn đang giao</button>
                    </>
                  )}
                  {order.status === 0 && <button type="button" className="mb-1 btn btn-danger">Đơn đã hủy</button>}
                </div>
              </div>
            ))
          }
          <div className="order-footer">
            <div className='order-footer__pagination'>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <ul className="mt-4 pagination">
                  <li className="page-item disabled">
                    <span className="page-link">Trang trước</span>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item active" aria-current="page">
                    <span className="page-link">2</span>
                  </li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item">
                    <a className="page-link" href="#">Trang sau</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='order-footer__btn'>
              <div className="cart-thumb col-lg-12 col-md-12 col-sm-12">
                <Link to={'/'} id="update-cart" className="btn btn-success" type="submit" name="sbm">
                  Quay về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* End Cart */}
    </>
  );
};

export default Order;
