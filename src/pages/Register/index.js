import React, { useEffect, useState } from 'react'
import { registerCustomer } from "../../services/Api"
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../shared/components/input/Input'
import Heading from '../../shared/components/common/Heading'
import Label from '../../shared/components/label/Label'
import IconEyeToggle from '../../shared/components/icon/IconEyeToggle'
import useToggleValue from '../../hooks/useToggleValue'
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate()
  const [inputsCustomer, setInputCustomer] = useState({})
  const [errorRegister, setErrorRegister] = useState(false)


  const handleChaneInput = (e) => {
    const { name, value } = e.target
    return setInputCustomer({ ...inputsCustomer, [name]: value })
  }

  const clickRegister = (e) => {
    e.preventDefault()
    registerCustomer(inputsCustomer)
      .then(() => {
        toast.success('Đăng kí tài khoản thành công!', {
          autoClose: 1500
        })
        navigate('/Login')
      })
      .catch(({ response }) => {
        if (response.data === 'Customer email exists!') return setErrorRegister('Email đã tồn tại!')
        if (response.data === 'Customer phone exists!') return setErrorRegister('Số điện thoại đã tồn tại!')
      })

  }
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  useEffect(() => {
    document.title = "MobileShop - Đăng ký tài khoản"
  }, [])
  return (
    <>
      <div id="customer" className='customer-form'>
        {
          errorRegister &&
          (
            <div className="text-center alert alert-danger">{errorRegister}</div>
          )
        }
        <Heading className='text-center text-red'>Đăng kí</Heading>
        <form method="post" autoComplete='off' className='form'>
          <div className="field">
            <Label htmlFor="email">Họ và tên (bắt buộc)</Label>
            <Input
              onChange={handleChaneInput}
              value={inputsCustomer.fullName || ""}
              placeholder="Nhập họ và tên"
              type="text"
              name="fullName"
              required>
            </Input>
          </div>
          <div className="field">
            <Label htmlFor="email">Email (bắt buộc)</Label>
            <Input
              onChange={handleChaneInput}
              value={inputsCustomer.email || ""}
              placeholder="Nhập email"
              type="email"
              name="email"
              required>
            </Input>
          </div>
          <div className="field">
            <Label htmlFor="password">Mật khẩu (bắt buộc)</Label>
            <Input
              onChange={handleChaneInput}
              value={inputsCustomer.password || ""}
              placeholder='Nhập mật khẩu'
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              required>
              <IconEyeToggle
                open={showPassword}
                onClick={handleTogglePassword}
              ></IconEyeToggle>
            </Input>
          </div>
          <div className="field">
            <Label htmlFor="phone">Số điện thoại (bắt buộc)</Label>
            <Input
              onChange={handleChaneInput}
              value={inputsCustomer.phone || ""}
              placeholder="Nhập số điện thoại"
              type="text"
              name="phone"
              required>
            </Input>
          </div>
          <div className="field">
            <Label htmlFor="address">Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)</Label>
            <Input
              onChange={handleChaneInput}
              value={inputsCustomer.address || ""}
              placeholder="Nhập địa chỉ"
              type="text"
              name="address"
              required>
            </Input>
          </div>

          <a href="/Login" className="btn btn-auth" onClick={clickRegister}>
            Đăng ký ngay
          </a>
          <div className="text-center">
            <span>Bạn đã có tài khoản? </span>
            <Link className="ml-2 mr-2" to="/Login">Đăng nhập</Link>
          </div>
        </form>
      </div>

    </>
  )
}

export default Register