import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { order } from "../../services/Api";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, deleteItemCart } from "../../redux-setup/reducers/cart";
import { getImageProduct } from "../../shared/ultils";
import Input from "../../shared/components/input/Input";
import { formatPrice } from "../../shared/ultils";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import Button from "../../shared/components/button";


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logged = useSelector(({ Auth }) => Auth.login.logged)
  const items = useSelector(({ Cart }) => Cart.items);
  const currentCustomer = useSelector(({ Auth }) => Auth.login.currentCustomer)
  const newItems = items.map((item) => ({
    prd_id: item._id,
    price: item.price,
    qty: item.qty,
  }));

  const clickOrder = (e) => {
    e.preventDefault();
    order({
      fullName: currentCustomer.fullName,
      email: currentCustomer.email,
      phone: currentCustomer.phone,
      address: currentCustomer.address,
      customer_id: currentCustomer._id,
      items: newItems,
    }).then(({ data }) => {
      if (data.status === "success") {
        navigate("/Success");
      }
    });
  }


  const changeQty = (e, id) => {
    const { value } = e.target;
    if (value <= 0) {
      toast.error("Số lượng sản phẩm đã giảm đến mức tối thiểu")
      return
    } else if (value > 5) {
      toast.error("Số lượng sản phẩm đã đến mức tối đa!")
      return
    }
    return dispatch(updateCart({
      _id: id,
      qty: value,
    }));
  }

  const clickDeleteProduct = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa không?",
      text: "Sau khi xóa bạn sẽ không thẻ hoàn tác lại!!!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: 'Hủy',
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteItemCart({ _id: id }))
        Swal.fire({
          title: "Xóa sản phẩm thành công!",
          icon: "success",
        });
      }
    });

  }

  useEffect(() => {
    document.title = "MobileShop - Giỏ hàng"
  }, [])

  return (
    <div className="order-form">
      {/*	Cart	*/}
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-6 col-md-6 col-sm-12">
            Thông tin sản phẩm
          </div>
          <div className="cart-nav-item  text-center col-lg-2 col-md-2 col-sm-12">
            Tùy chọn
          </div>
          <div className="cart-nav-item  text-center col-lg-3 col-md-3 col-sm-12">
            Giá
          </div>
          <div className="col-lg-1 col-md-1 col-sm-12"></div>
        </div>
        <form method="post">
          {
            items?.map((item, index) =>
              <div key={index} className="cart-item row">
                <div className="cart-thumb__product col-lg-6 col-md-6 col-sm-12">
                  <img alt="" src={getImageProduct(item.image)} />
                  <h4>{item.name}</h4>
                </div>
                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                  <Input
                    onChange={(e) => changeQty(e, item._id)}
                    value={item.qty}
                    type="number"
                    className="form-blue quantity "
                    required>
                  </Input>
                </div>
                <div className="cart-price cart-price_1 col-lg-3 col-md-3 col-sm-12">
                  <b>{formatPrice(item.qty * item.price)}đ</b>
                </div>
                <Button
                  onClick={() => clickDeleteProduct(item._id)}
                  className="btn-delete col-lg-1 col-md-1 col-sm-12"
                >
                  Xóa
                </Button>
              </div>
            )
          }
          <div className="cart-total">
            <div className="cart-total__title col-lg-2 col-md-2 col-sm-12">
              <b>Tổng cộng:</b>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
              <b className="cart-total__price">{formatPrice(items.reduce((total, item) => total + item.qty * item.price, 0))}đ</b>
            </div>
          </div>
        </form>
      </div>
      {/*	End Cart	*/}
      {/*	Customer Info	*/}
      <div id="customer">
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            {logged ?
              <a onClick={clickOrder} href="/">
                <b>Mua ngay</b>
              </a>
              :
              <a href='/Login'>
                <b>Đăng nhập để mua hàng</b>
              </a>
            }
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="/">
              <b>Quay về trang chủ</b>
            </a>
          </div>
        </div>
      </div>
      {/*	End Customer Info	*/}
    </div>
  );
};
export default Cart;
