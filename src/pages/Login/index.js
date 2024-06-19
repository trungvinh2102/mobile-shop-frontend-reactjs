import React, { useEffect, useState } from "react";
import { loginCustomer } from "../../services/Api"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux-setup/reducers/auth"
import Input from "../../shared/components/input/Input";
import Heading from "../../shared/components/common/Heading";
import Label from "../../shared/components/label/Label";
import useToggleValue from './../../hooks/useToggleValue';
import IconEyeToggle from './../../shared/components/icon/IconEyeToggle';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputCustomer, setInputCustomer] = useState({});
  const [errorLogin, setErrorLogin] = useState(false)
  const handleChangeInput = (e) => {
    const { name, value } = e.target
    return setInputCustomer({
      ...inputCustomer,
      [name]: value
    })
  }


  const clickLogin = (e) => {
    e.preventDefault()
    loginCustomer(inputCustomer)
      .then(({ data }) => {
        dispatch(loginSuccess(data))
        toast.success("Đăng nhập thành công!", {
          autoClose: 1500
        })
        return navigate('/Cart')
      })
      .catch((error) => setErrorLogin(true))
  }

  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();


  useEffect(() => {
    document.title = "MobileShop - Đăng nhập"
  }, [])

  return (
    <>
      <div id="customer" className="customer-form">
        {
          errorLogin &&
          (
            <div className="text-center alert alert-danger">Thông tin Email hoặc Password không hợp lệ!</div>
          )
        }
        <Heading className='text-center text-red'>Đăng nhập</Heading>
        <form method="post" className="form">
          <div className="field">
            <Label htmlFor="email">Email (bắt buộc)</Label>
            <Input
              onChange={handleChangeInput}
              value={inputCustomer.email || ""}
              placeholder="Nhập email"
              type="text"
              name="email">
            </Input>
          </div>

          <div className="field">
            <Label htmlFor="password">Mật khẩu (bắt buộc)</Label>
            <Input
              onChange={handleChangeInput}
              value={inputCustomer.password || ""}
              placeholder="Nhập mật khẩu"
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              required
            >
              <IconEyeToggle
                open={showPassword}
                onClick={handleTogglePassword}
              ></IconEyeToggle>
            </Input>
          </div>
          <button className="btn btn-auth" onClick={clickLogin}>
            Đăng nhập ngay
          </button>
          <div className="text-center">
            <span>Bạn chưa có tài khoản? </span>
            <Link className="ml-2 mr-2" to="/Register">Đăng kí</Link>
          </div>
        </form>

      </div>

    </>
  )
}

export default Login