import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loggedOut } from "../../../redux-setup/reducers/auth";
import { IconSearch, IconUser, IconBag } from './../icon';
const Header = () => {


  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const changeKeyword = (e) => setKeyword(e.target.value);
  const clickSearch = (e) => {
    e.preventDefault();
    return navigate(`/Search?keyword=${keyword}`);
  }
  const totalCart = useSelector(({ Cart }) => Cart.items.reduce((total, item) => total + item.qty, 0));

  const logged = useSelector(({ Auth }) => Auth.login.logged)
  const customer = useSelector(({ Auth }) => Auth.login.currentCustomer)


  const clickLoggedOut = (e) => {
    e.preventDefault()
    dispatch(loggedOut())
    return navigate('/Login')
  }

  return (
    <>
      <div id="header">
        <div className="container">
          <div className="row">
            <div id="logo" className="col-lg-3 col-md-12 col-sm-12">
              <h1>
                <Link to="/" className="a-focus">
                  <img alt="img" className="img-fluid" src="images/logo-header.jpg" />
                </Link>
              </h1>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
              <form className="search-form">
                <input
                  onChange={changeKeyword}
                  className="mt-3 searh-input"
                  type="search"
                  placeholder="Bạn cần tìm gì?..."
                  aria-label="Search"
                />
                <IconSearch className="search-icon" onClick={clickSearch}></IconSearch>
              </form>
            </div>
            <div id="cart" className="col-lg-5 col-md-12 col-sm-12">
              {
                logged
                  ? (
                    <>
                      <Link className="mr-2 text-lowercase a-focus" to="/Customer">
                        <IconUser className="icon-user"></IconUser>{" "}
                        {customer?.email}
                      </Link>|
                      <Link onClick={clickLoggedOut} className="ml-2 mr-2 a-focus" to="#">đăng xuất</Link>|{" "}
                    </>
                  )
                  : (
                    <>
                      <Link className="mr-2 a-focus" to="/Login">đăng nhập</Link>|{" "}
                    </>
                  )
              }

              <a className="mr-2 cart a-focus" href="/Cart">
                <IconBag className="cart-icon"></IconBag>
                <span className="cart-num">
                  {totalCart}
                </span>
                {" "}
                Giỏ hàng
                <ul>
                  <li><Link to="/Cart"><i className="fas fa-shopping-cart a-focus"></i> Giỏ hàng của bạn</Link></li>
                  <li><Link to={`/Order-${customer?._id}`}><i className="fas fa-file-alt a-focus"></i> Đơn hàng đã mua</Link></li>
                </ul>
              </a>
            </div>
          </div>
        </div>
        <button
          className="navbar-toggler navbar-light"
          type="button"
          data-toggle="collapse"
          data-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </>
  );
};
export default Header;
