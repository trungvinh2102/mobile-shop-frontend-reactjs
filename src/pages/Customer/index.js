import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../shared/components/input/Input'
import Heading from '../../shared/components/common/Heading'
import Label from '../../shared/components/label/Label'
import IconEyeToggle from '../../shared/components/icon/IconEyeToggle'
import useToggleValue from '../../hooks/useToggleValue'
import { updateCustomer } from '../../services/Api'
import { updateSuccess } from '../../redux-setup/reducers/auth'
import { toast } from 'react-toastify'


const Customer = () => {

  const dispatch = useDispatch()
  const customer = useSelector(({ Auth }) => Auth.login.currentCustomer)
  const [inputsCustomer, setInputsCustomer] = useState(customer)

  const handleChaneInputCustomer = (e) => {
    const { name, value } = e.target
    return setInputsCustomer({ ...inputsCustomer, [name]: value })
  }

  const clickUpdate = (e) => {
    e.preventDefault()
    updateCustomer(inputsCustomer)
      .then(({ data }) => {
        dispatch(updateSuccess(inputsCustomer))
        toast.success("Cập nhật thông tin thành công!", {
          autoClose: 1500
        })
      })
      .catch(({ response }) => {
        if (response.data === "Customer phone exists!") {
          toast.error("Cập nhật thông tin thất bại!", {
            autoClose: 1500
          })
        }
      })
  }

  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();


  useEffect(() => {
    document.title = "MobileShop - Thông tin khách hàng"
  }, [])

  return (
    <div id="customer" className='customer-form'>
      <Heading className='text-center text-red'>Hồ sơ</Heading>
      <form method="post" autoComplete='off' className='form'>
        <div className="field">
          <Label htmlFor="fullName">Họ và tên (bắt buộc)</Label>
          <Input
            onChange={handleChaneInputCustomer}
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
            value={inputsCustomer.email || ""}
            placeholder="Nhập email"
            type="email"
            name="email"
            required>
          </Input>
        </div>
        <div className="field">
          <Label htmlFor="phone">Số điện thoại (bắt buộc)</Label>
          <Input
            onChange={handleChaneInputCustomer}
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
            onChange={handleChaneInputCustomer}
            value={inputsCustomer.address || ""}
            placeholder="Nhập địa chỉ"
            type="text"
            name="address"
            required>
          </Input>
        </div>
        <div className="field">
          <Label htmlFor="password">Mật khẩu (bắt buộc)</Label>
          <Input
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
        <a href='/' className="btn btn-auth" onClick={clickUpdate}>
          Chỉnh sửa
        </a>

      </form>
    </div>
  )
}

export default Customer