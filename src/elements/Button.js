import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    children,
    width,
    bg,
    margin,
    padding,
    font_size,
    _disabled,
    _onClick,
    is_circle,
  } = props;

  const styles = {
    width,
    bg,
    margin,
    padding,
    font_size,
  };

  if (is_circle) {
    return (
      <PlusBtn {...styles} onClick={_onClick}>
        {children}
      </PlusBtn>
    );
  }

  return (
    <OrangeBtn {...styles} disabled={_disabled} onClick={_onClick}>
      {children}
    </OrangeBtn>
  );
};

Button.defaultProps = {
  children: null,
  width: "100%",
  margin: false,
  padding: false,
  _disabled: false,
  is_circle: false,
  _onClick: () => {},
};

const OrangeBtn = styled.button`
  font-family: "SunPretendard";
  cursor: pointer;
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: 3em;
  background-color: ${(props) => (props.disabled ? "#FFFFFF" : "#FA5A30")};
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  font-size: 16px;

  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.font_size ? `font-size: ${props.font_size};` : "")};

  @media (max-width: 280px) {
    font-size: 11px;
  }
`;

const PlusBtn = styled.button`
  /* position: fixed; */
  bottom: 20px;
  right: 30px;
  cursor: pointer;
  box-sizing: border-box;
  /* width: ${(props) => props.width}; */
  width: 48px;
  height: 48px;
  background-color: ${(props) => (props.disabled ? "#1b9cfc8c" : "#1B9CFC")};
  border: none;
  border-radius: 50%;
  color: white;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.font_size ? `font-size: ${props.font_size};` : "")};
`;

export default Button;
