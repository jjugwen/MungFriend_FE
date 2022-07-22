import styled from "styled-components";
import noticeIcon from "../assets/images/Chatting/noticeIcon.svg";

const CautionButton = (props) => {
  const {
    width,
    bg,
    margin,
    padding,
    position,
    bottom,
    font_size,
    _disabled,
    _onClick,
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
  return (
    <div style={{ margin: "8px 0 40px 0" }}>
      <CautionBtn {...styles} disabled={_disabled} onClick={_onClick}>
        <img src={noticeIcon} alt="noticeIcon" />
        유의사항
      </CautionBtn>
    </div>
  );
};

CautionButton.defaultProps = {
  width: "100%",
  margin: false,
  padding: false,
  position: "relative",
  bottom: false,
  _disabled: false,
  onClick: () => {},
};

const CautionBtn = styled.button`
  width: 104px;
  height: 40px;
  border: 1px solid #e3e5e9;
  border-radius: 4px;
  background: none;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4%;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
`;

export default CautionButton;
