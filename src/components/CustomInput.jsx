import React from "react";

const CustomInput = ({
  item,
  focusedId,
  focusedValue,
  blurredValue,
  handleOnFocus,
  handleOnChange,
  handleOnClick,
  handleOnBlur,
  className,
  ...props
}) => {
  return (
    <input
      className={className}
      value={item.id === focusedId ? focusedValue : blurredValue}
      onFocus={handleOnFocus}
      onChange={handleOnChange}
      onBlurCapture={handleOnBlur}
      onClick={handleOnClick}
      {...props}
    />
  );
};

export default CustomInput;
