import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    children,
    width,
    bg,
    margin,
    padding,
    position,
    bottom,
    font_size,
    _disabled,
    _onClick,
    is_circle,
    orange_small,
    orange_medium,
    orange_large,
    white_small,
    white_medium,
    white_large,
    grey_small,
    MatchingBtn,
  } = props;

  const styles = {
    width,
    bg,
    margin,
    padding,
    font_size,
    position,
    bottom,
  };

  if (is_circle) {
    return (
      <PlusBtn {...styles} onClick={_onClick}>
        {children}
      </PlusBtn>
    );
  }

  if (orange_small) {
    return (
      <OrangeBtn180 {...styles} disabled={_disabled} onClick={_onClick}>
        {children}
      </OrangeBtn180>
    );
  }

  if (orange_medium) {
    return (
      <OrangeBtn194 {...styles} disabled={_disabled} onClick={_onClick}>
        {children}
      </OrangeBtn194>
    );
  }

  if (orange_large) {
    return (
      <OrangeBtn214 {...styles} disabled={_disabled} onClick={_onClick}>
        {children}
      </OrangeBtn214>
    );
  }

  if (white_small) {
    return (
      <WhiteBtn180 {...styles} disabled={_disabled} onClick={_onClick}>
        {children}
      </WhiteBtn180>
    );
  }

  if (white_medium) {
    return (
      <WhiteBtn194 {...styles} disabled={_disabled} onClick={_onClick}>
        {children}
      </WhiteBtn194>
    );
  }

  if (white_large) {
    return (
      <WhiteBtn214 {...styles} disabled={_disabled} onClick={_onClick}>
        {children}
      </WhiteBtn214>
    );
  }

  if (grey_small) {
    return (
      <GreyBtn180 {...styles} disabled={_disabled} onClick={_onClick}>
        {children}
      </GreyBtn180>
    );
  }
  if (MatchingBtn) {
    return (
      <BlueBtn65 {...styles} disabled={_disabled} onClick={_onClick}>
        {children}
      </BlueBtn65>
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
  position: "relative",
  bottom: false,
  _disabled: false,
  is_circle: false,
  orange_small: false,
  orange_medium: false,
  orange_large: false,
  white_small: false,
  white_medium: false,
  white_large: false,
  grey_small: false,
  MatchingBtn: false,
  onClick: () => {},
};

const OrangeBtn = styled.button`
  font-family: "Pretendard";
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

const WhiteBtn180 = styled.button`
  font-family: "Pretendard";
  box-sizing: border-box;
  min-width: 180px;
  height: 3em;
  background-color: ${(props) => (props.disabled ? "#FFFFFF" : "#FFFFFF")};
  border: 1px solid #e3e5e9;
  border-radius: 4px;
  color: black;
  font-weight: 500;
  font-size: 16px;

  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.font_size ? `font-size: ${props.font_size};` : "")};

  @media (max-width: 280px) {
    font-size: 11px;
  }
`;
const WhiteBtn194 = styled.button`
  font-family: "Pretendard";
  box-sizing: border-box;
  min-width: 194px;
  height: 3em;
  background-color: ${(props) => (props.disabled ? "#FFFFFF" : "#FFFFFF")};
  border: 1px solid #e3e5e9;
  border-radius: 4px;
  color: black;
  font-weight: 500;
  font-size: 16px;

  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.font_size ? `font-size: ${props.font_size};` : "")};

  @media (max-width: 280px) {
    font-size: 11px;
  }
`;
const WhiteBtn214 = styled.button`
  font-family: "Pretendard";
  box-sizing: border-box;
  min-width: 214px;
  height: 3em;
  background-color: ${(props) => (props.disabled ? "#FFFFFF" : "#FFFFFF")};
  border: 1px solid #e3e5e9;
  border-radius: 4px;
  color: black;
  font-weight: 500;
  font-size: 16px;

  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.font_size ? `font-size: ${props.font_size};` : "")};

  @media ${({ theme }) => theme.device.mobile} {
    min-width: 144px;
    height: 44px;
    font-size: 14px;
  }
`;

const OrangeBtn180 = styled.button`
  font-family: "Pretendard";
  box-sizing: border-box;
  min-width: 180px;
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
const OrangeBtn194 = styled.button`
  font-family: "Pretendard";
  box-sizing: border-box;
  width: ${(props) => props.width};
  min-width: 100px;
  max-width: 194px;
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
const OrangeBtn214 = styled.button`
  font-family: "Pretendard";
  box-sizing: border-box;
  width: ${(props) => props.width};
  min-width: 214px;
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
  ${(props) => (props.position ? `position: ${props.position};` : "")};
  ${(props) => (props.bottom ? `bottom: ${props.bottom};` : "")};

  @media ${({ theme }) => theme.device.mobile} {
    min-width: 144px;
    height: 44px;
    font-size: 14px;
  }
`;

const GreyBtn180 = styled.button`
  font-family: "Pretendard";
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  box-sizing: border-box;
  min-width: 180px;
  height: 3em;
  background-color: ${(props) => (props.disabled ? "white" : "#B8BBC0")};
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

const BlueBtn65 = styled.button`
  font-family: "Pretendard";
  box-sizing: border-box;
  min-width: 70px;
  height: 30px;
  background-color: ${(props) => (props.disabled ? "#FFFFFF" : "#4F65FF")};
  border: ${(props) => (props.disabled ? "1px solid #E3E5E9" : "none")};
  border-radius: 4px;
  color: ${(props) => (props.disabled ? "#B8BBC0" : "#FFFFFF")};
  font-weight: 500;
  font-size: 14px;

  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.font_size ? `font-size: ${props.font_size};` : "")};

  @media (max-width: 280px) {
    font-size: 11px;
  }
`;
const PlusBtn = styled.button`
  position: fixed;
  /* bottom: 20%; */
  /* right: 3%; */
  z-index: 2;
  box-sizing: border-box;
  /* width: ${(props) => props.width}; */
  width: 80px;
  height: 80px;
  background-color: ${(props) => (props.disabled ? "#B8BBC0" : "#4F65FF")};
  border: none;
  border-radius: 50%;
  color: white;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.font_size ? `font-size: ${props.font_size};` : "")};

  transform: translateY(30%);
  transition: 0.5s;
  :hover {
    transform: translateY(0);
  }
  .hover {
    position: absolute;
    right: 27%;
    opacity: 0;
  }
  :hover .hover {
    opacity: 1;
    /* transition: opacity 0.5s linear; */
  }

  :hover .origin {
    opacity: 0;
  }
`;

export default Button;
