import React, { useEffect, useState } from 'react'
import { getOrderDetails } from "../../services/Api"
import { useParams } from 'react-router-dom'
import { formatPrice, getImageProduct } from '../../shared/ultils'

const OrderDetails = () => {

  const { id } = useParams()

  const [order, setOrder] = useState([])
  console.log("OrderDetails ~ order:", order);

  useEffect(() => {
    getOrderDetails(id)
      .then(({ data }) => {
        setOrder(data.newItems)
      })
      .catch((err) => console.log(err))
  }, [id])

  const getTotalPrice = () => {
    return order.reduce((total, item) => total + item.price * item.qty, 0)
  }

  return (
    <>
      {/*	Order Details	*/}
      <div id="my-cart" className="order-form">
        <div className="row">
          <div className="cart-nav-item col-lg-6 col-md-7 col-sm-12">
            Thông tin sản phẩm
          </div>
          <div className="cart-nav-item col-lg-3 col-md-2 col-sm-12 text-center">Số lượng</div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Đơn giá</div>
        </div>
        <form method="post">
          {
            order.map((item, index) =>
              <div key={index} className="cart-item row">
                <div className="cart-thumb__product col-lg-6 col-md-7 col-sm-12">
                  <img src={getImageProduct(item?.image)} alt='img-product' />
                  <h4>{item?.name}</h4>
                </div>
                <div className="cart-quantity col-lg-3 col-md-2 col-sm-12">
                  <p className='text-center order-qty'>{item?.qty}</p>
                </div>
                <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{formatPrice(item?.price)} đ</b></div>
              </div>
            )
          }
          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
            </div>
            <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b><b>{formatPrice(getTotalPrice())}đ</b></b></div>
          </div>

        </form>
      </div>
      {/*	End Order Details	*/}

    </>
  )
}

export default OrderDetails