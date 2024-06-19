import React from "react";
import Input from "./Input";
import useToggleValue from "../../../hooks/useToggleValue";
import IconEyeToggle from './../icon/IconEyeToggle';

const TogglePassword = ({
  error,
  control,
  name = "password",
  placeholder = "Create a password",
}) => {
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  return (
    <Input
      control={control}
      name={name}
      type={`${showPassword ? "text" : "password"}`}
      placeholder={placeholder}
      error={error}
    >
      <IconEyeToggle
        open={showPassword}
        onClick={handleTogglePassword}
      ></IconEyeToggle>
    </Input>
  );
};

export default TogglePassword;
