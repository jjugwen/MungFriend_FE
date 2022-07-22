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
    <div>
      <a
        href="https://protective-iodine-bc7.notion.site/1e0b7cd43c3d4f9fa50498074088e09a"
        style={{ textDecoration: "none" }}
        target="blank"
      >
        <CautionBtn {...styles} disabled={_disabled} onClick={_onClick}>
          <img src={noticeIcon} alt="noticeIcon" />
          유의사항
        </CautionBtn>
      </a>
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
  cursor: pointer;
  margin: ${(props) => props.margin};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4%;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  :hover {
    color: #fa5a30;
  }
`;

export default CautionButton;
